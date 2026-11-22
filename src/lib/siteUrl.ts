/**
 * Public origin for absolute URLs (payment callbacks, redirects).
 * Set NEXT_PUBLIC_SITE_URL in production — e.g. https://jamroll.space —
 * otherwise it is derived from the incoming request (proxy headers first).
 */
export function getSiteUrl(request: Request): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/+$/, "");

  const url = new URL(request.url);
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || url.host;
  const proto = request.headers.get("x-forwarded-proto") || url.protocol.replace(":", "");
  return `${proto}://${host}`;
}
