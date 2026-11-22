/**
 * Minimal SSLCommerz (v4) client: create a payment session, validate a
 * completed payment, and look up a transaction by tran_id.
 *
 * Env:
 *   SSLCOMMERZ_STORE_ID, SSLCOMMERZ_STORE_PASSWORD — from your SSLCommerz merchant panel
 *   SSLCOMMERZ_IS_LIVE=true                         — use the live gateway (sandbox otherwise)
 */

export interface SslcommerzTransaction {
  status: string; // VALID | VALIDATED | FAILED | CANCELLED | ...
  tran_id: string;
  val_id: string;
  amount: string;
  currency: string;
  currency_type?: string;
  currency_amount?: string;
  bank_tran_id?: string;
  card_type?: string;
  tran_date?: string;
  value_a?: string;
  value_b?: string;
  value_c?: string;
  value_d?: string;
}

function getConfig() {
  const storeId = process.env.SSLCOMMERZ_STORE_ID;
  const storePassword = process.env.SSLCOMMERZ_STORE_PASSWORD;
  const isLive = process.env.SSLCOMMERZ_IS_LIVE === "true";
  if (!storeId || !storePassword) return null;
  return {
    storeId,
    storePassword,
    baseUrl: isLive ? "https://securepay.sslcommerz.com" : "https://sandbox.sslcommerz.com",
  };
}

export function isSslcommerzConfigured(): boolean {
  return getConfig() !== null;
}

export interface CreateSessionInput {
  tranId: string;
  amount: number;
  productName: string;
  customer: { name: string; email: string; phone: string; location: string };
  urls: { success: string; fail: string; cancel: string; ipn: string };
}

/** Starts a payment session and returns the hosted gateway URL to redirect to. */
export async function createPaymentSession(input: CreateSessionInput): Promise<string> {
  const config = getConfig();
  if (!config) throw new Error("SSLCommerz is not configured");

  const body = new URLSearchParams({
    store_id: config.storeId,
    store_passwd: config.storePassword,
    total_amount: input.amount.toFixed(2),
    currency: "BDT",
    tran_id: input.tranId,
    success_url: input.urls.success,
    fail_url: input.urls.fail,
    cancel_url: input.urls.cancel,
    ipn_url: input.urls.ipn,
    shipping_method: "NO",
    num_of_item: "1",
    product_name: input.productName,
    product_category: "Service",
    product_profile: "non-physical-goods",
    cus_name: input.customer.name,
    cus_email: input.customer.email,
    cus_phone: input.customer.phone,
    cus_add1: input.customer.location,
    cus_city: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    // Echoed back by SSLCommerz — lets us rebuild the invoice if the DB is unavailable.
    value_a: input.customer.name,
    value_b: input.customer.email,
    value_c: input.customer.phone,
    value_d: input.customer.location,
  });

  const res = await fetch(`${config.baseUrl}/gwprocess/v4/api.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });
  const data = await res.json();

  if (data?.status !== "SUCCESS" || !data?.GatewayPageURL) {
    throw new Error(`SSLCommerz session failed: ${data?.failedreason || res.status}`);
  }
  return data.GatewayPageURL as string;
}

/** Server-to-server validation of a payment using the val_id SSLCommerz posted back. */
export async function validatePayment(valId: string): Promise<SslcommerzTransaction | null> {
  const config = getConfig();
  if (!config) return null;

  const params = new URLSearchParams({
    val_id: valId,
    store_id: config.storeId,
    store_passwd: config.storePassword,
    v: "1",
    format: "json",
  });
  const res = await fetch(
    `${config.baseUrl}/validator/api/validationserverAPI.php?${params}`,
    { cache: "no-store" },
  );
  if (!res.ok) return null;
  return (await res.json()) as SslcommerzTransaction;
}

/** Looks up the validated transaction for a tran_id (used as an invoice fallback). */
export async function findValidTransaction(tranId: string): Promise<SslcommerzTransaction | null> {
  const config = getConfig();
  if (!config) return null;

  const params = new URLSearchParams({
    tran_id: tranId,
    store_id: config.storeId,
    store_passwd: config.storePassword,
    format: "json",
  });
  const res = await fetch(
    `${config.baseUrl}/validator/api/merchantTransIDvalidationAPI.php?${params}`,
    { cache: "no-store" },
  );
  if (!res.ok) return null;
  const data = await res.json();
  const elements: SslcommerzTransaction[] = Array.isArray(data?.element) ? data.element : [];
  return elements.find((t) => isPaid(t)) ?? null;
}

export function isPaid(t: SslcommerzTransaction | null): t is SslcommerzTransaction {
  return !!t && (t.status === "VALID" || t.status === "VALIDATED");
}

/** True when the validated transaction matches the amount we charged, in BDT. */
export function matchesAmount(t: SslcommerzTransaction, expected: number): boolean {
  const currency = t.currency_type || t.currency;
  const amount = parseFloat(t.currency_amount || t.amount);
  return currency === "BDT" && Math.abs(amount - expected) < 0.01;
}
