import { NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { contactSchema } from "@/lib/validations";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    // 1. Save to database
    await db.insert(inquiries).values({
      name: data.name,
      email: data.email,
      company: data.company ?? null,
      service: data.service,
      budget: data.budget,
      message: data.message,
    });

    // 2. Send notification email (if Resend key is set)
    if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) {
      await resend.emails.send({
        from: "Portfolio Contact <noreply@yourdomain.com>",
        to: process.env.CONTACT_EMAIL,
        subject: `New inquiry from ${data.name} — ${data.service}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
            <h2 style="margin-bottom: 24px; font-size: 22px; color: #111;">New Project Inquiry</h2>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; font-size: 13px; width: 120px;">Name</td>
                <td style="padding: 8px 0; color: #111; font-size: 13px;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-size: 13px;">Email</td>
                <td style="padding: 8px 0; color: #111; font-size: 13px;">
                  <a href="mailto:${data.email}" style="color: #c8a96e;">${data.email}</a>
                </td>
              </tr>
              ${data.company ? `<tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Company</td><td style="padding: 8px 0; color: #111; font-size: 13px;">${data.company}</td></tr>` : ""}
              <tr>
                <td style="padding: 8px 0; color: #666; font-size: 13px;">Service</td>
                <td style="padding: 8px 0; color: #111; font-size: 13px;">${data.service}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-size: 13px;">Budget</td>
                <td style="padding: 8px 0; color: #111; font-size: 13px;">${data.budget}</td>
              </tr>
            </table>

            <div style="margin-top: 24px; padding: 20px; background: #f5f3ef; border-left: 3px solid #c8a96e;">
              <p style="margin: 0; font-size: 14px; color: #333; line-height: 1.7; white-space: pre-wrap;">${data.message}</p>
            </div>

            <p style="margin-top: 24px; font-size: 12px; color: #999;">
              Reply directly to this email to respond to ${data.name}.
            </p>
          </div>
        `,
        replyTo: data.email,
      });

      // 3. Send confirmation to sender
      await resend.emails.send({
        from: "Mahtamun <noreply@yourdomain.com>",
        to: data.email,
        subject: "Thanks for reaching out — I'll be in touch soon",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
            <h2 style="font-size: 22px; color: #111;">Hi ${data.name},</h2>
            <p style="color: #333; line-height: 1.7; font-size: 14px;">
              Thank you for reaching out. I've received your message and will get back to you within 24–48 hours.
            </p>
            <p style="color: #333; line-height: 1.7; font-size: 14px;">
              In the meantime, feel free to browse my work at the portfolio.
            </p>
            <p style="color: #666; font-size: 13px; margin-top: 32px;">
              — Mahtamun Hoque Fahim
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to process inquiry" },
      { status: 400 }
    );
  }
}
