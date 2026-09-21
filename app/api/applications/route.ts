import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

// Every application lands in the Gmail inbox that sends it (SMTP_USER), with a
// copy cc'd to the relevant prometheus.ph department address.
const CC_BY_MODE: Record<string, string> = {
  career: "admin@prometheus.ph",
  intern: "internships@prometheus.ph",
};

// Guardrails so a bad/malicious upload can't abuse the mailbox.
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB per file
const MAX_TOTAL_BYTES = 20 * 1024 * 1024; // 20MB per submission
const ALLOWED_EXT = /\.(pdf|doc|docx|zip|png|jpe?g)$/i;
const FILE_FIELDS = ["appLetter", "resume", "portfolio"] as const;

export async function POST(req: NextRequest) {
  try {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return NextResponse.json({ error: "Email is not configured on the server." }, { status: 500 });
    }

    const form = await req.formData();

    const mode = String(form.get("mode") || "");
    const cc = CC_BY_MODE[mode];
    if (!cc) {
      return NextResponse.json({ error: "Invalid application type." }, { status: 400 });
    }
    const to = process.env.SMTP_USER; // primary inbox = the Gmail that sends

    // Text fields (already sanitized on the client, kept as plain text here).
    const firstName = String(form.get("firstName") || "").trim();
    const lastName = String(form.get("lastName") || "").trim();
    const email = String(form.get("email") || "").trim();
    const number = String(form.get("number") || "").trim();
    const services = String(form.get("services") || "").trim();

    if (!firstName || !lastName || !email || !number) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Collect + validate attachments.
    const attachments: { filename: string; content: Buffer }[] = [];
    let totalBytes = 0;

    for (const field of FILE_FIELDS) {
      const file = form.get(field);
      if (!file || typeof file === "string") continue;

      if (!ALLOWED_EXT.test(file.name)) {
        return NextResponse.json({ error: `Unsupported file type: ${file.name}` }, { status: 400 });
      }
      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json({ error: `${file.name} is larger than 10MB.` }, { status: 400 });
      }
      totalBytes += file.size;
      if (totalBytes > MAX_TOTAL_BYTES) {
        return NextResponse.json({ error: "Attachments exceed the 20MB total limit." }, { status: 400 });
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({ filename: file.name, content: buffer });
    }

    const isCareer = mode === "career";
    const heading = isCareer ? "💼 CAREER APPLICATION" : "⭐ INTERNSHIP APPLICATION";
    const interestLine = !isCareer && services ? `\nAreas of Interest: ${services}` : "";
    const fileList = attachments.length
      ? attachments.map((a) => `• ${a.filename}`).join("\n")
      : "(no files attached)";

    const text =
      `${heading}\n\n` +
      `Name: ${firstName} ${lastName}\n` +
      `Contact: ${number}\n` +
      `Email: ${email}${interestLine}\n\n` +
      `Attached documents:\n${fileList}\n`;

    const port = Number(process.env.SMTP_PORT) || 465;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465, // 465 = implicit TLS/SSL; 587 = STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Prometheus Applications" <${process.env.SMTP_USER}>`,
      to,
      cc,
      replyTo: `${firstName} ${lastName} <${email}>`,
      subject: `${heading} — ${firstName} ${lastName}`,
      text,
      attachments,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Application send failed:", err);
    return NextResponse.json({ error: "Failed to send application." }, { status: 500 });
  }
}
