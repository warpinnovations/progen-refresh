import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const id = params.id;

    if (!id) {
      return NextResponse.json({ exists: false, error: "Mission ID not provided" }, { status: 400 });
    }

    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    auth.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const drive = google.drive({ version: "v3", auth });
    const folderId = process.env.GOOGLE_DRIVE_TROOPER_FOLDER_ID;

    const query = `
      name contains '${id}_' 
      and '${folderId}' in parents 
      and trashed = false
    `;

    const result = await drive.files.list({
      q: query,
      fields: "files(id, name)",
      pageSize: 10,
    });

    const found = result.data.files?.some(file =>
      (file.name?.startsWith(`${id}_`)) ?? false
    );

    return NextResponse.json({ exists: found });
  } catch (err) {
    console.error("Drive check error:", err);
    return NextResponse.json({ exists: false, error: "Failed to check" });
  }
}
