import { SendMailClient } from "zeptomail";

const sendEmail = async ({ to, subject, text, html }) => {
  if (!process.env.ZEPTO_MAIL_TOKEN) {
    throw new Error("ZEPTO_MAIL_TOKEN missing");
  }

  if (!process.env.ZEPTO_MAIL_FROM) {
    throw new Error("ZEPTO_MAIL_FROM missing");
  }

  const client = new SendMailClient({
    url: "https://api.zeptomail.in/v1.1/email",
    token: process.env.ZEPTO_MAIL_TOKEN,
  });

  try {
    await client.sendMail({
      from: {
        address: process.env.ZEPTO_MAIL_FROM,
        name: "Campus Event Hub",
      },
      to: [
        {
          email_address: {
            address: to,
            name: to.split("@")[0],
          },
        },
      ],
      subject,
      htmlbody: html,
      textbody: text,
    });

    return true;
  } catch (error) {
    console.error("ZeptoMail SDK Error:", error);
    throw new Error("Failed to send email");
  }
};

// Send to multiple recipients (one by one to avoid ZeptoMail limits)
export const sendBulkEmail = async ({ recipients, subject, text, html }) => {
  const results = [];
  for (const email of recipients) {
    try {
      await sendEmail({ to: email, subject, text, html });
      results.push({ email, success: true });
    } catch (err) {
      console.error(`Failed to send to ${email}:`, err.message);
      results.push({ email, success: false, error: err.message });
    }
  }
  return results;
};

// Generate HTML template for approval email
export const approvalEmailTemplate = (userName, role) => {
  return {
    subject: `🎉 Account Approved — Campus Event Hub`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 3px solid #000; border-radius: 16px; overflow: hidden;">
        <div style="background: #05FFA1; padding: 30px; border-bottom: 3px solid #000; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 900; text-transform: uppercase; letter-spacing: -1px;">
            Account Approved ✓
          </h1>
        </div>
        <div style="padding: 30px; background: #fff;">
          <p style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">Hello ${userName},</p>
          <p style="font-size: 14px; color: #555; line-height: 1.6;">
            Great news! Your <strong>${role}</strong> account on <strong>Campus Event Hub</strong> has been approved.
            You can now log in and access all features available to your role.
          </p>
          <div style="margin: 24px 0; text-align: center;">
            <span style="display: inline-block; background: #FFD600; color: #000; font-weight: 900; text-transform: uppercase; font-size: 12px; padding: 12px 32px; border: 2px solid #000; border-radius: 8px;">
              Role: ${role.toUpperCase()}
            </span>
          </div>
          <p style="font-size: 13px; color: #888;">
            If you did not create this account, please ignore this email.
          </p>
        </div>
        <div style="background: #1E293B; padding: 16px; text-align: center;">
          <p style="margin: 0; color: #fff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">
            Campus Event Hub — Srinivasa University
          </p>
        </div>
      </div>
    `,
    text: `Hello ${userName}, your ${role} account on Campus Event Hub has been approved. You can now log in.`,
  };
};

// Generate HTML template for custom notification email
export const notificationEmailTemplate = (title, body, senderRole) => {
  return {
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 3px solid #000; border-radius: 16px; overflow: hidden;">
        <div style="background: ${senderRole === "admin" ? "#FFD600" : "#01FFFF"}; padding: 30px; border-bottom: 3px solid #000;">
          <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 3px; opacity: 0.6;">
            ${senderRole === "admin" ? "Admin Notification" : "Faculty Notification"}
          </p>
          <h1 style="margin: 0; font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: -1px;">
            ${title}
          </h1>
        </div>
        <div style="padding: 30px; background: #fff;">
          <div style="font-size: 14px; line-height: 1.8; color: #333; white-space: pre-wrap;">${body}</div>
        </div>
        <div style="background: #1E293B; padding: 16px; text-align: center;">
          <p style="margin: 0; color: #fff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">
            Campus Event Hub — Srinivasa University
          </p>
        </div>
      </div>
    `,
    text: `${title}\n\n${body}\n\n— Campus Event Hub`,
  };
};

export default sendEmail;
