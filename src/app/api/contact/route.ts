import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { getLeadsCollection } from "@/lib/mongodb";
import {
  getClientConfirmationEmailHtml,
  getClientConfirmationAttachments,
} from "@/lib/emailTemplates";

export const runtime = "nodejs";

const VALID_PROJECT_TYPES = [
  "Residential",
  "Office-commercial",
  "Renovation",
  "Space planning-consultancy",
  "Other",
];

// In-memory set for deduplication / idempotency (within a 60 second window)
const recentSubmissions = new Map<string, number>();

function cleanupRecentSubmissions() {
  const now = Date.now();
  for (const [key, timestamp] of recentSubmissions.entries()) {
    if (now - timestamp > 60_000) {
      recentSubmissions.delete(key);
    }
  }
}

// Nodemailer SMTP Transporter helper
function getMailTransporter() {
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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Anti-spam honeypot check
    if (body.website_fax_field) {
      return NextResponse.json({ accepted: false, error: "Bot detected" }, { status: 400 });
    }

    // 2. Extract and sanitize fields
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const projectType = typeof body.projectType === "string" ? body.projectType.trim() : "";
    const location = typeof body.location === "string" ? body.location.trim() : "";
    const budget = typeof body.budget === "string" ? body.budget.trim() : "not sure";
    const expectedStart = typeof body.expectedStart === "string" ? body.expectedStart.trim() : "not sure";
    const notes = typeof body.notes === "string" ? body.notes.trim() : "";

    const attribution = body.attribution || {
      utm_source: "unattributed / unknown",
      utm_medium: "unattributed / unknown",
      utm_campaign: "unattributed / unknown",
      utm_content: "unattributed / unknown",
      utm_term: "",
      landing_page: "/contact",
      referrer: "direct",
    };

    // 3. Server-side Validation
    if (!name || name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { accepted: false, error: "Valid name (2-100 characters) is required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { accepted: false, error: "Valid email address is required" },
        { status: 400 }
      );
    }

    // Phone validation (Bangladesh local or international standard)
    const cleanPhone = phone.replace(/[\s\-()]/g, "");
    const phoneRegex = /^(\+?8801[3-9]\d{8}|01[3-9]\d{8}|\+?[1-9]\d{7,14})$/;
    if (!phone || !phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { accepted: false, error: "Valid phone number is required (e.g. 017XXXXXXXX or +880 1XXXXXXXXX)" },
        { status: 400 }
      );
    }

    if (!projectType || !VALID_PROJECT_TYPES.includes(projectType)) {
      return NextResponse.json(
        { accepted: false, error: "Please select an approved project type" },
        { status: 400 }
      );
    }

    if (!location || location.length < 2 || location.length > 150) {
      return NextResponse.json(
        { accepted: false, error: "Valid project location is required (e.g. Bashundhara R/A, Dhaka)" },
        { status: 400 }
      );
    }

    // 4. Idempotency / Double submit guard
    cleanupRecentSubmissions();
    const idempotencyKey = `${cleanPhone}_${projectType}_${location.toLowerCase()}`;
    const now = Date.now();
    if (recentSubmissions.has(idempotencyKey)) {
      return NextResponse.json(
        {
          accepted: false,
          error: "A submission with these details was already received recently. Please wait a moment.",
        },
        { status: 429 }
      );
    }
    recentSubmissions.set(idempotencyKey, now);

    // 5. Generate opaque, non-PII submission reference ID
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const submissionId = `JS-${dateStr}-${randomHex}`;

    // 6. Lead Record Object
    const leadRecord = {
      submissionId,
      createdAt: new Date().toISOString(),
      name,
      phone,
      email,
      projectType,
      location,
      budget: budget || "not sure",
      expectedStart: expectedStart || "not sure",
      notes,
      attribution: {
        utm_source: attribution.utm_source || "unattributed / unknown",
        utm_medium: attribution.utm_medium || "unattributed / unknown",
        utm_campaign: attribution.utm_campaign || "unattributed / unknown",
        utm_content: attribution.utm_content || "unattributed / unknown",
        utm_term: attribution.utm_term || "",
        landing_page: attribution.landing_page || "",
        referrer: attribution.referrer || "direct",
      },
      status: "New",
    };

    // 7. Database Persistence (MongoDB Atlas)
    try {
      const collection = await getLeadsCollection();
      if (collection) {
        await collection.insertOne({
          ...leadRecord,
          submittedAt: new Date(),
        });
        console.log(`[MongoDB] Lead ${submissionId} saved to database successfully.`);
      }
    } catch (dbErr) {
      console.error("[MongoDB] Error saving lead to database:", dbErr);
    }

    // 8. Safe Persistence (Local Backup in data/leads.json)
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const leadsFile = path.join(dataDir, "leads.json");
      let leads: Array<typeof leadRecord> = [];
      if (fs.existsSync(leadsFile)) {
        try {
          leads = JSON.parse(fs.readFileSync(leadsFile, "utf-8"));
        } catch {
          leads = [];
        }
      }
      leads.push(leadRecord);
      fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2), "utf-8");
    } catch (saveErr) {
      console.error("Warning: Could not write lead to local disk storage:", saveErr);
    }

    // 8. Auto Google Sheets Integration (via Webhook)
    const googleSheetWebhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (googleSheetWebhookUrl) {
      try {
        await fetch(googleSheetWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadRecord),
        });
        console.log(`[Google Sheet] Synced lead ${submissionId} to Google Sheet successfully.`);
      } catch (sheetErr) {
        console.error("[Google Sheet] Failed to push lead to Google Sheet webhook:", sheetErr);
      }
    }

    // 9. Send Emails (Admin Notification + Client Confirmation)
    const transporter = getMailTransporter();
    const smtpUser = process.env.SMTP_USER || process.env.NEXT_SMTP_USER || "info@jamroll.space";
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || smtpUser;
    const fromAddress = process.env.SMTP_FROM || `"Jam Space" <${smtpUser}>`;

    if (transporter) {
      // 9a. Admin Notification Email
      const adminEmailSubject = `[Jam Space Enquiry] ${projectType} | ${location} | ${submissionId}`;
      const adminEmailHtml = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #111111; color: #ffffff; padding: 24px; text-align: left;">
            <h1 style="margin: 0; font-size: 20px; font-weight: 500; letter-spacing: 0.5px;">Jam Space — New Project Enquiry</h1>
            <p style="margin: 6px 0 0; font-size: 13px; color: #E92A7B; font-weight: 600;">Reference: ${submissionId}</p>
          </div>
          <div style="padding: 24px; background-color: #fafafa;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 8px 0; color: #666; width: 140px;">Client Name:</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Phone:</td><td style="padding: 8px 0; font-weight: 600;"><a href="tel:${cleanPhone}" style="color: #E92A7B; text-decoration: none;">${phone}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Email:</td><td style="padding: 8px 0; font-weight: 600;"><a href="mailto:${email}" style="color: #E92A7B; text-decoration: none;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Project Type:</td><td style="padding: 8px 0; font-weight: 600;">${projectType}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Location:</td><td style="padding: 8px 0; font-weight: 600;">${location}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Budget:</td><td style="padding: 8px 0;">${budget}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Expected Start:</td><td style="padding: 8px 0;">${expectedStart}</td></tr>
              ${notes ? `<tr><td style="padding: 8px 0; color: #666; vertical-align: top;">Notes:</td><td style="padding: 8px 0; white-space: pre-wrap;">${notes}</td></tr>` : ""}
            </table>

            <div style="margin-top: 20px; padding: 12px; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 6px; font-size: 12px; color: #555;">
              <strong style="color: #111;">Attribution &amp; Source:</strong><br/>
              Source: ${leadRecord.attribution.utm_source} | Medium: ${leadRecord.attribution.utm_medium} | Campaign: ${leadRecord.attribution.utm_campaign}<br/>
              Landing Page: ${leadRecord.attribution.landing_page} | Referrer: ${leadRecord.attribution.referrer}
            </div>

            <div style="margin-top: 24px; text-align: center;">
              <a href="https://wa.me/${cleanPhone.replace("+", "")}?text=Hello%20${encodeURIComponent(name)}%2C%20thank%20you%20for%20contacting%20Jam%20Space." style="background-color: #25D366; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600; display: inline-block;">Reply via WhatsApp</a>
            </div>
          </div>
        </div>
      `;

      // 9b. Client Confirmation Email matching the exact PDF specification
      const clientEmailSubject = `We've Received Your Project Enquiry — Jam Space (${submissionId})`;
      const clientEmailHtml = getClientConfirmationEmailHtml({
        name,
        submissionId,
        projectType,
        location,
      });
      const clientAttachments = getClientConfirmationAttachments();

      try {
        await Promise.all([
          transporter.sendMail({
            from: fromAddress,
            to: adminEmail,
            subject: adminEmailSubject,
            html: adminEmailHtml,
          }),
          transporter.sendMail({
            from: fromAddress,
            to: email,
            subject: clientEmailSubject,
            html: clientEmailHtml,
            attachments: clientAttachments,
          }),
        ]);
        console.log(`[Email] Both Admin and Client emails sent successfully for ${submissionId}`);
      } catch (mailErr) {
        console.error("[Email] Error sending emails:", mailErr);
      }
    } else {
      console.log(`[Email] Note: SMTP is not configured in .env. (Logged lead ${submissionId} locally)`);
    }

    return NextResponse.json(
      {
        accepted: true,
        submissionId,
        message: "Your enquiry has been received successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing enquiry submission:", error);
    return NextResponse.json(
      {
        accepted: false,
        error: "Internal server error occurred while processing your enquiry.",
      },
      { status: 500 }
    );
  }
}
