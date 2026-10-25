import path from "path";
import fs from "fs";

interface ClientEmailData {
  name: string;
  submissionId: string;
  projectType: string;
  location: string;
}

/**
 * Returns the exact HTML template matching the client's PDF design specification.
 */
export function getClientConfirmationEmailHtml(data: ClientEmailData): string {
  const { name, submissionId, projectType, location } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jam Space — Enquiry Confirmation</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, h1, p, a { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 24px 0; background-color: #f7f6f1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased;">

  <!-- Outer Centered Card (max 600px) -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f7f6f1;">
    <tr>
      <td align="center">
        
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border: 1px solid #e7e5dc; box-shadow: 0 4px 16px rgba(0,0,0,0.03); overflow: hidden;">
          
          <!-- Top Magenta Banner -->
          <tr>
            <td style="background-color: #E92A7B; text-align: center; padding: 12px 16px;">
              <span style="color: #ffffff; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: inline-block;">
                DESIGNED AROUND THE WAY YOU LIVE
              </span>
            </td>
          </tr>

          <!-- Header Section: Logo + Website Link -->
          <tr>
            <td style="padding: 22px 32px 18px 32px; background-color: #ffffff;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" valign="middle">
                    <a href="https://jamroll.space" target="_blank" style="text-decoration: none; display: inline-block;">
                      <img src="cid:logo" alt="JAM SPACE" style="height: 32px; width: auto; max-width: 170px; display: block; border: 0;" />
                    </a>
                  </td>
                  <td align="right" valign="middle">
                    <a href="https://jamroll.space" target="_blank" style="font-size: 13px; color: #191919; text-decoration: none; font-weight: 500; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                      <span style="font-size: 14px; vertical-align: middle; margin-right: 4px;">🌐</span>
                      <span style="vertical-align: middle;">Jamroll.space</span>
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Reference & Metadata Ribbon -->
          <tr>
            <td style="border-top: 1px solid #f29bbd; border-bottom: 1px solid #f29bbd; padding: 10px 16px; background-color: #fff9fb; text-align: center;">
              <p style="margin: 0; font-size: 11.5px; font-weight: 600; color: #E92A7B; letter-spacing: 0.2px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <span>Ref ID: ${submissionId}</span>
                <span style="margin: 0 8px; color: #E92A7B; opacity: 0.6;">|</span>
                <span>Project Type: ${projectType}</span>
                <span style="margin: 0 8px; color: #E92A7B; opacity: 0.6;">|</span>
                <span>Location: ${location}</span>
              </p>
            </td>
          </tr>

          <!-- Hero Greeting -->
          <tr>
            <td align="center" style="padding: 40px 32px 24px 32px; background-color: #ffffff;">
              <h1 style="margin: 0; font-size: 38px; line-height: 1.15; font-weight: 500; color: #191919; letter-spacing: -0.5px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                Hello<br/>
                <span style="font-size: 42px; font-weight: 700;">${name},</span>
              </h1>
            </td>
          </tr>

          <!-- Main Body Copy -->
          <tr>
            <td style="padding: 0 36px 8px 36px; background-color: #ffffff;">
              <p style="margin: 0 0 16px; font-size: 14.5px; line-height: 1.6; color: #333333; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                Thank you for reaching out to Jam Space. We have received your project enquiry and our design team is excited to learn more about your vision.
              </p>
              <p style="margin: 0 0 24px; font-size: 14.5px; line-height: 1.6; color: #333333; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                Our coordinator will contact you during business hours (9:00 AM – 7:00 PM) to understand your requirements and discuss the next steps.
              </p>
            </td>
          </tr>

          <!-- Callout Box (Beige background with Magenta left border) -->
          <tr>
            <td style="padding: 0 36px 32px 36px; background-color: #ffffff;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f6f4ee; border-left: 3.5px solid #E92A7B; border-radius: 0 4px 4px 0;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <p style="margin: 0 0 14px; font-size: 13.5px; line-height: 1.5; color: #2e2e2e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                      If you have any immediate questions or floor plans to share, feel free to reply directly to this email or reach us on WhatsApp:
                    </p>
                    <a href="https://wa.me/8801629658114?text=Hello%20Jam%20Space%2C%20referencing%20my%20enquiry%20${submissionId}" target="_blank" style="color: #E92A7B; font-weight: 600; font-size: 14px; text-decoration: underline; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                      Chat on WhatsApp (+880 1629658114)
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 4 Project Gallery Images (Side by Side) -->
          <tr>
            <td style="padding: 0 20px 24px 20px; background-color: #ffffff;">
              <table width="100%" cellpadding="0" cellspacing="4" border="0">
                <tr>
                  <td width="25%" align="center" valign="top">
                    <img src="cid:gallery1" alt="Jam Space Project 1" style="width: 100%; max-width: 135px; height: 115px; object-fit: cover; display: block; border-radius: 2px; border: 0;" />
                  </td>
                  <td width="25%" align="center" valign="top">
                    <img src="cid:gallery2" alt="Jam Space Project 2" style="width: 100%; max-width: 135px; height: 115px; object-fit: cover; display: block; border-radius: 2px; border: 0;" />
                  </td>
                  <td width="25%" align="center" valign="top">
                    <img src="cid:gallery3" alt="Jam Space Project 3" style="width: 100%; max-width: 135px; height: 115px; object-fit: cover; display: block; border-radius: 2px; border: 0;" />
                  </td>
                  <td width="25%" align="center" valign="top">
                    <img src="cid:gallery4" alt="Jam Space Project 4" style="width: 100%; max-width: 135px; height: 115px; object-fit: cover; display: block; border-radius: 2px; border: 0;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Magenta Banner with White Logo and #ThoughtfulSpaces -->
          <tr>
            <td style="background-color: #E92A7B; padding: 18px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" valign="middle">
                    <img src="cid:logowhite" alt="JAM SPACE" style="height: 24px; width: auto; max-width: 150px; display: block; border: 0;" />
                  </td>
                  <td align="right" valign="middle">
                    <span style="color: #ffffff; font-weight: 700; font-size: 15px; letter-spacing: 0.3px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                      #ThoughtfulSpaces
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Deep Maroon / Wine Footer with Socials & Contact -->
          <tr>
            <td style="background-color: #631238; padding: 26px 24px 30px 24px; text-align: center;">
              
              <!-- Social Icons (Rounded Outlined Boxes) -->
              <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 16px auto;">
                <tr>
                  <td style="padding: 0 4px;">
                    <a href="https://www.facebook.com/jamroll.space" target="_blank" style="text-decoration: none;">
                      <span style="display: inline-block; width: 28px; height: 28px; line-height: 25px; text-align: center; border: 1.5px solid #ffffff; border-radius: 6px; color: #ffffff; font-size: 14px; font-weight: bold; font-family: Arial, sans-serif;">f</span>
                    </a>
                  </td>
                  <td style="padding: 0 4px;">
                    <a href="https://www.linkedin.com/company/jamroll-space" target="_blank" style="text-decoration: none;">
                      <span style="display: inline-block; width: 28px; height: 28px; line-height: 25px; text-align: center; border: 1.5px solid #ffffff; border-radius: 6px; color: #ffffff; font-size: 12px; font-weight: bold; font-family: Arial, sans-serif;">in</span>
                    </a>
                  </td>
                  <td style="padding: 0 4px;">
                    <a href="https://www.instagram.com/jamroll.space" target="_blank" style="text-decoration: none;">
                      <span style="display: inline-block; width: 28px; height: 28px; line-height: 24px; text-align: center; border: 1.5px solid #ffffff; border-radius: 6px; color: #ffffff; font-size: 14px; font-family: Arial, sans-serif;">&#9678;</span>
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Studio Address & Info -->
              <p style="margin: 0 0 5px 0; font-size: 13px; font-weight: 600; color: #ffffff; letter-spacing: 0.3px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                Jam Space - Interior Design Studio
              </p>
              <p style="margin: 0 0 6px 0; font-size: 12px; color: #f4d0e1; line-height: 1.4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                House 654, Road 09, Avenue 04, Mirpur DOHS, Dhaka 1216
              </p>
              <p style="margin: 0; font-size: 12px; color: #f4d0e1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                Phone: <a href="tel:+8801629658114" style="color: #ffffff; text-decoration: none;">+880 1629658114</a> &nbsp;|&nbsp; Email: <a href="mailto:space@jamroll.xyz" style="color: #ffffff; text-decoration: none;">space@jamroll.xyz</a>
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();
}

/**
 * Returns the CID attachments so that the logos and project photos
 * load instantly in all email clients without being blocked.
 */
export function getClientConfirmationAttachments() {
  const imagesDir = path.join(process.cwd(), "public", "images", "email");
  const attachments: Array<{ filename: string; path: string; cid: string }> = [];

  const files = [
    { name: "logo.png", cid: "logo" },
    { name: "logo-white.png", cid: "logowhite" },
    { name: "gallery-1.jpg", cid: "gallery1" },
    { name: "gallery-2.jpg", cid: "gallery2" },
    { name: "gallery-3.jpg", cid: "gallery3" },
    { name: "gallery-4.jpg", cid: "gallery4" },
  ];

  for (const item of files) {
    const fullPath = path.join(imagesDir, item.name);
    if (fs.existsSync(fullPath)) {
      attachments.push({
        filename: item.name,
        path: fullPath,
        cid: item.cid,
      });
    }
  }

  return attachments;
}

