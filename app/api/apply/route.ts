import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    if (
      !process.env.GOOGLE_CLIENT_ID ||
      !process.env.GOOGLE_CLIENT_SECRET ||
      !process.env.GOOGLE_REFRESH_TOKEN
    ) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }

    const oauth2 = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    oauth2.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

    const drive = google.drive({ version: "v3", auth: oauth2 });
    const folderId = process.env.GOOGLE_DRIVE_APPLICATIONS_FOLDER_ID;

    const uploadedLinks: Record<string, string> = {};

    for (const [key, value] of formData.entries()) {
      if (value instanceof File && value.size > 0) {
        const buffer = Buffer.from(await value.arrayBuffer());
        const stream = Readable.from(buffer);

        const res = await drive.files.create({
          requestBody: {
            name: value.name,
            ...(folderId ? { parents: [folderId] } : {}),
          },
          media: {
            mimeType: value.type || "application/octet-stream",
            body: stream,
          },
          fields: "id,webViewLink",
        });

        // Make file publicly viewable (read-only)
        await drive.permissions.create({
          fileId: res.data.id!,
          requestBody: { role: "reader", type: "anyone" },
        });

        uploadedLinks[key] = res.data.webViewLink || "";
      }
    }

    return NextResponse.json({ links: uploadedLinks });
  } catch (err: any) {
    console.error("[apply/upload]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
