import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";
import sharp from "sharp";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    let buffer: Buffer;
    const arrayBuffer = await file.arrayBuffer();
    buffer = Buffer.from(arrayBuffer);

    if (file.type.startsWith("image/")) {
      if (buffer.length > MAX_IMAGE_SIZE) {
        buffer = await sharp(buffer)
          .resize({ width: 1920 })
          .jpeg({ quality: 80 })
          .toBuffer();
      }
    }

    const stream = Readable.from(buffer);

    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REFRESH_TOKEN) {
      return NextResponse.json({ error: "Server not configured properly" }, { status: 500 });
    }

    if (!process.env.GOOGLE_DRIVE_TROOPER_FOLDER_ID) {
      return NextResponse.json({ error: "Drive folder ID not set" }, { status: 500 });
    }

    const oauth2 = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const drive = google.drive({ version: "v3", auth: oauth2 });

    const response = await drive.files.create({
      requestBody: {
        name: file.name,
        parents: [process.env.GOOGLE_DRIVE_TROOPER_FOLDER_ID],
      },
      media: {
        mimeType: file.type,
        body: stream,
      },
    });

    return NextResponse.json({ fileId: response.data.id });
  } catch (err: unknown) {
    console.error("Upload error:", err);
    const message =
      err instanceof Error ? err.message : typeof err === "string" ? err : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
