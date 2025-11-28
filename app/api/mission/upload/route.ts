import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { Readable } from "stream";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    let fileStream: NodeJS.ReadableStream;

    if (file.type.startsWith("image/")) {
      const arrayBuffer = await file.arrayBuffer();
      let buffer = Buffer.from(arrayBuffer);

      if (buffer.length > MAX_IMAGE_SIZE) {
        buffer = await sharp(buffer)
          .resize({ width: 1920 })
          .jpeg({ quality: 80 })
          .toBuffer();
      }

      fileStream = Readable.from(buffer);
    } else {
      const webStream = file.stream();
      fileStream = Readable.fromWeb(webStream as any);
    }

    if (
      !process.env.GOOGLE_CLIENT_ID ||
      !process.env.GOOGLE_CLIENT_SECRET ||
      !process.env.GOOGLE_REFRESH_TOKEN ||
      !process.env.GOOGLE_DRIVE_TROOPER_FOLDER_ID
    ) {
      return NextResponse.json(
        { error: "Server not configured properly" },
        { status: 500 }
      );
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
        body: fileStream,
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
