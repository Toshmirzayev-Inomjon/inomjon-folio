import nodemailer from "nodemailer";
import { emailContent, siteIdentity } from "@/data/siteData";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildVerificationEmailHtml(verifyUrl: string) {
  const escapedUrl = escapeHtml(verifyUrl);
  const year = new Date().getFullYear();

  return `<!doctype html>
<html lang="uz">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(emailContent.subject)}</title>
  </head>
  <body style="margin:0;background:#050812;font-family:Inter,Arial,sans-serif;color:#f8f1df;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#050812 0%,#0b1020 52%,#111827 100%);padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;border:1px solid rgba(248,241,223,.16);border-radius:24px;background:rgba(6,47,45,.92);box-shadow:0 28px 80px rgba(0,0,0,.32);overflow:hidden;">
            <tr>
              <td style="padding:30px 30px 18px;border-bottom:1px solid rgba(248,241,223,.12);">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <div style="display:inline-block;border-radius:14px;background:linear-gradient(135deg,#2563eb,#4f46e5);padding:10px 13px;color:#ffffff;font-weight:900;letter-spacing:.5px;">IF</div>
                    </td>
                    <td align="right" style="color:#c8d3bf;font-size:13px;font-weight:700;">Secure verification</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:34px 30px 10px;">
                <p style="margin:0 0 12px;color:#d8aa52;font-size:12px;font-weight:900;letter-spacing:2px;text-transform:uppercase;">${escapeHtml(siteIdentity.brandName)}</p>
                <h1 style="margin:0;color:#fff8e8;font-size:30px;line-height:1.2;font-weight:900;">Emailingizni tasdiqlang</h1>
                <p style="margin:18px 0 0;color:#c8d3bf;font-size:16px;line-height:1.8;">${escapeHtml(emailContent.htmlIntro)} Xavfsizlik uchun bu havola cheklangan muddat amal qiladi.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 30px 30px;">
                <a href="${escapedUrl}" style="display:inline-block;border-radius:14px;background:linear-gradient(135deg,#2563eb 0%,#4f46e5 52%,#7c3aed 100%);color:#ffffff;text-decoration:none;font-size:15px;font-weight:900;padding:15px 22px;box-shadow:0 18px 44px rgba(79,70,229,.28);">${escapeHtml(emailContent.verifyLinkLabel)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:0 30px 30px;">
                <div style="border:1px solid rgba(248,241,223,.12);border-radius:16px;background:rgba(248,241,223,.08);padding:16px;">
                  <p style="margin:0 0 8px;color:#f8f1df;font-size:14px;font-weight:800;">Tugma ishlamasa, havolani browserga joylang:</p>
                  <p style="margin:0;word-break:break-all;color:#c8d3bf;font-size:13px;line-height:1.6;">${escapedUrl}</p>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 30px;background:rgba(2,27,27,.34);border-top:1px solid rgba(248,241,223,.10);">
                <p style="margin:0;color:#c8d3bf;font-size:12px;line-height:1.7;">Agar bu so'rovni siz yubormagan bo'lsangiz, emailni e'tiborsiz qoldiring. © ${year} ${escapeHtml(siteIdentity.brandName)}.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildContactNotificationEmailHtml(input: { name: string; email: string; subject: string; body: string }) {
  const year = new Date().getFullYear();
  const message = escapeHtml(input.body).replaceAll("\n", "<br />");

  return `<!doctype html>
<html lang="uz">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Yangi portfolio xabari</title>
  </head>
  <body style="margin:0;background:#050812;font-family:Inter,Arial,sans-serif;color:#f8f1df;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#050812 0%,#0b1020 52%,#111827 100%);padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;border:1px solid rgba(248,241,223,.16);border-radius:24px;background:rgba(6,47,45,.94);box-shadow:0 28px 80px rgba(0,0,0,.32);overflow:hidden;">
            <tr>
              <td style="padding:28px 30px;border-bottom:1px solid rgba(248,241,223,.12);">
                <p style="margin:0;color:#d8aa52;font-size:12px;font-weight:900;letter-spacing:2px;text-transform:uppercase;">${escapeHtml(siteIdentity.brandName)}</p>
                <h1 style="margin:10px 0 0;color:#fff8e8;font-size:28px;line-height:1.25;font-weight:900;">Yangi portfolio xabari</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:26px 30px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:12px 0;color:#c8d3bf;font-size:13px;font-weight:800;width:110px;">Ism</td>
                    <td style="padding:12px 0;color:#f8f1df;font-size:15px;font-weight:900;">${escapeHtml(input.name)}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;color:#c8d3bf;font-size:13px;font-weight:800;">Email</td>
                    <td style="padding:12px 0;color:#f4d68f;font-size:15px;font-weight:900;">${escapeHtml(input.email)}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;color:#c8d3bf;font-size:13px;font-weight:800;">Mavzu</td>
                    <td style="padding:12px 0;color:#f8f1df;font-size:15px;font-weight:900;">${escapeHtml(input.subject)}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 30px 30px;">
                <div style="border:1px solid rgba(248,241,223,.12);border-radius:18px;background:rgba(248,241,223,.08);padding:18px 18px;color:#c8d3bf;font-size:15px;line-height:1.8;">${message}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 30px;background:rgba(2,27,27,.34);border-top:1px solid rgba(248,241,223,.10);">
                <p style="margin:0;color:#c8d3bf;font-size:12px;line-height:1.7;">Bu xabar ${escapeHtml(siteIdentity.brandName)} secure contact formasi orqali yuborildi. © ${year} ${escapeHtml(siteIdentity.brandName)}.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function createTransporter() {
  if (!process.env.SMTP_HOST) return null;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined
  });
}

export async function sendVerificationEmail(email: string, token: string) {
  const appUrl = process.env.APP_URL ?? siteIdentity.siteUrl;
  const verifyUrl = `${appUrl}/verify-email?token=${encodeURIComponent(token)}`;

  if (!process.env.SMTP_HOST) {
    console.info(`Verification link for ${email}: ${verifyUrl}`);
    return;
  }

  const transporter = createTransporter();
  if (!transporter) return;

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? emailContent.from,
    to: email,
    subject: emailContent.subject,
    text: `${emailContent.textPrefix} ${verifyUrl}\n\nAgar bu so'rovni siz yubormagan bo'lsangiz, emailni e'tiborsiz qoldiring.`,
    html: buildVerificationEmailHtml(verifyUrl)
  });
}

export async function sendContactNotificationEmail(input: { name: string; email: string; subject: string; body: string }) {
  const to = process.env.ADMIN_EMAIL;
  const transporter = createTransporter();

  if (!to || !transporter) {
    console.info(`Contact message from ${input.name} <${input.email}>: ${input.subject}`);
    return;
  }

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? emailContent.from,
    to,
    replyTo: input.email,
    subject: `${siteIdentity.brandName}: ${input.subject}`,
    text: `Yangi portfolio xabari\n\nIsm: ${input.name}\nEmail: ${input.email}\nMavzu: ${input.subject}\n\n${input.body}`,
    html: buildContactNotificationEmailHtml(input)
  });
}
