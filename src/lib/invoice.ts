import fs from "fs";
import path from "path";
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { contactInfo } from "@/lib/data/footer";
import { designSession } from "@/lib/data/packages";

export interface InvoiceData {
  bookingId: string;
  paidAt: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  amount: number;
  cardType?: string;
  bankTranId?: string;
}

const INK = rgb(0x19 / 255, 0x19 / 255, 0x19 / 255);
const MUTED = rgb(0x44 / 255, 0x44 / 255, 0x44 / 255);
const ACCENT = rgb(0xe9 / 255, 0x2a / 255, 0x7b / 255);
const LINE = rgb(0.88, 0.87, 0.84);
const CREAM = rgb(0xf7 / 255, 0xf6 / 255, 0xf1 / 255);

function formatBdt(amount: number): string {
  return `BDT ${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });
}

/** Standard PDF fonts are WinAnsi only — drop anything they can't encode. */
function safe(text: string): string {
  return text.replace(/[^\x20-\x7E -ÿ]/g, "").trim() || "-";
}

/** Word-wraps text to a max width and draws it; returns the y below the last line. */
function drawWrapped(
  page: PDFPage,
  text: string,
  opts: { x: number; y: number; size: number; font: PDFFont; color: ReturnType<typeof rgb>; maxWidth: number; lineHeight?: number },
): number {
  const words = safe(text).split(/\s+/);
  const lineHeight = opts.lineHeight ?? opts.size * 1.4;
  let line = "";
  let y = opts.y;
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (opts.font.widthOfTextAtSize(candidate, opts.size) > opts.maxWidth && line) {
      page.drawText(line, { x: opts.x, y, size: opts.size, font: opts.font, color: opts.color });
      y -= lineHeight;
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) {
    page.drawText(line, { x: opts.x, y, size: opts.size, font: opts.font, color: opts.color });
    y -= lineHeight;
  }
  return y;
}

/** Builds the A4 payment invoice for a paid design session booking. */
export async function generateInvoicePdf(data: InvoiceData): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`Invoice ${data.bookingId} — Jam Space`);
  pdf.setAuthor("Jam Space");

  const page = pdf.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const margin = 50;
  const right = width - margin;

  const text = (value: string, x: number, y: number, size = 10, font = regular, color = INK) =>
    page.drawText(safe(value), { x, y, size, font, color });
  const textRight = (value: string, y: number, size = 10, font = regular, color = INK) =>
    text(value, right - font.widthOfTextAtSize(safe(value), size), y, size, font, color);

  // Header band
  page.drawRectangle({ x: 0, y: height - 6, width, height: 6, color: ACCENT });

  let y = height - 80;
  const logoPath = path.join(process.cwd(), "public", "images", "email", "logo.png");
  if (fs.existsSync(logoPath)) {
    const logo = await pdf.embedPng(fs.readFileSync(logoPath));
    const scaled = logo.scaleToFit(140, 28);
    page.drawImage(logo, { x: margin, y: y - 4, width: scaled.width, height: scaled.height });
  } else {
    text("JAM SPACE", margin, y, 18, bold);
  }
  textRight("INVOICE", y + 4, 22, bold);
  textRight("PAID", y - 16, 10, bold, ACCENT);

  // Studio details
  y -= 50;
  text("Jam Space - Interior Design Studio", margin, y, 9, bold);
  text(contactInfo.address, margin, y - 13, 9, regular, MUTED);
  text(`${contactInfo.phone}  |  ${contactInfo.email}`, margin, y - 26, 9, regular, MUTED);

  // Invoice meta (right column)
  textRight("Invoice No.", y, 9, regular, MUTED);
  textRight(data.bookingId, y - 13, 10, bold);
  textRight("Date Paid", y - 32, 9, regular, MUTED);
  textRight(formatDate(data.paidAt), y - 45, 10, bold);

  // Billed to
  y -= 80;
  page.drawLine({ start: { x: margin, y: y + 20 }, end: { x: right, y: y + 20 }, thickness: 0.75, color: LINE });
  text("BILLED TO", margin, y, 8, bold, MUTED);
  y -= 18;
  text(data.name, margin, y, 12, bold);
  y -= 16;
  text(data.email, margin, y, 10, regular, MUTED);
  y -= 14;
  text(data.phone, margin, y, 10, regular, MUTED);
  y -= 14;
  y = drawWrapped(page, data.location, { x: margin, y, size: 10, font: regular, color: MUTED, maxWidth: 300 });

  // Line items table
  y -= 30;
  page.drawRectangle({ x: margin, y: y - 8, width: right - margin, height: 26, color: CREAM });
  text("DESCRIPTION", margin + 12, y, 8, bold, MUTED);
  text("QTY", right - 190, y, 8, bold, MUTED);
  textRight("AMOUNT", y, 8, bold, MUTED);

  y -= 34;
  text(designSession.productName, margin + 12, y, 11, bold);
  text("1", right - 186, y, 10);
  textRight(formatBdt(data.amount), y, 10);
  y -= 15;
  text("Personalised professional guidance with a written action summary.", margin + 12, y, 9, regular, MUTED);

  y -= 24;
  page.drawLine({ start: { x: margin, y }, end: { x: right, y }, thickness: 0.75, color: LINE });

  // Totals
  y -= 22;
  text("Subtotal", right - 190, y, 10, regular, MUTED);
  textRight(formatBdt(data.amount), y, 10);
  y -= 26;
  page.drawRectangle({ x: right - 200, y: y - 10, width: 200, height: 30, color: ACCENT });
  page.drawText("Total Paid", { x: right - 190, y, size: 11, font: bold, color: rgb(1, 1, 1) });
  const total = formatBdt(data.amount);
  page.drawText(total, {
    x: right - 10 - bold.widthOfTextAtSize(total, 11),
    y,
    size: 11,
    font: bold,
    color: rgb(1, 1, 1),
  });

  // Payment details
  y -= 56;
  text("PAYMENT DETAILS", margin, y, 8, bold, MUTED);
  y -= 18;
  text("Payment Gateway", margin, y, 9, regular, MUTED);
  text("SSLCommerz", margin + 120, y, 9);
  if (data.cardType) {
    y -= 14;
    text("Payment Method", margin, y, 9, regular, MUTED);
    text(data.cardType, margin + 120, y, 9);
  }
  if (data.bankTranId) {
    y -= 14;
    text("Transaction ID", margin, y, 9, regular, MUTED);
    text(data.bankTranId, margin + 120, y, 9);
  }

  // Footer note
  const footerY = 90;
  page.drawLine({ start: { x: margin, y: footerY + 26 }, end: { x: right, y: footerY + 26 }, thickness: 0.75, color: LINE });
  drawWrapped(
    page,
    "Thank you for booking a design session with Jam Space. Our team will contact you to schedule your session. This is a computer-generated invoice and does not require a signature.",
    { x: margin, y: footerY, size: 8.5, font: regular, color: MUTED, maxWidth: right - margin },
  );

  return pdf.save();
}
