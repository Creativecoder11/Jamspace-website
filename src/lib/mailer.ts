import nodemailer from "nodemailer";

/** Nodemailer SMTP transporter, or null when SMTP isn't configured in .env. */
export function getMailTransporter() {
  const host = process.env.SMTP_HOST || process.env.NEXT_SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || process.env.NEXT_SMTP_PORT || "465", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER || process.env.NEXT_SMTP_USER;
  const pass = process.env.SMTP_PASS || process.env.NEXT_SMTP_PASSWORD;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

/** Sender / admin addresses shared by every outgoing email. */
export function getMailAddresses() {
  const smtpUser = process.env.SMTP_USER || process.env.NEXT_SMTP_USER || "info@jamroll.space";
  return {
    adminEmail: process.env.ADMIN_NOTIFICATION_EMAIL || smtpUser,
    fromAddress: process.env.SMTP_FROM || `"Jam Space" <${smtpUser}>`,
  };
}

/** Escapes user-supplied text before it is placed in an HTML email. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
