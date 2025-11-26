import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, context: { params: Promise<{ name: string }> }
) {
  try {
    const params = await context.params;
    const folderName = params.name;

    if (!folderName) {
      return NextResponse.json({ error: "Subfolder name not provided" }, { status: 400 });
    }

    if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || !process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || !process.env.NEXT_PUBLIC_GOOGLE_REFRESH_TOKEN) {
      return NextResponse.json({ error: "Server not configured properly" }, { status: 500 });
    }

    if (!process.env.NEXT_PUBLIC_GOOGLE_DRIVE_GUEST_FOLDER_ID) {
      return NextResponse.json({ error: "Drive folder ID not set" }, { status: 500 });
    }

    const oauth2 = new google.auth.OAuth2(
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
    );

    oauth2.setCredentials({ refresh_token: process.env.NEXT_PUBLIC_GOOGLE_REFRESH_TOKEN });

    const drive = google.drive({ version: "v3", auth: oauth2 });

    const folderSearch = await drive.files.list({
      q: `'${process.env.NEXT_PUBLIC_GOOGLE_DRIVE_GUEST_FOLDER_ID}' in parents and name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: "files(id, name)",
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

    const subfolders = folderSearch.data.files || [];
    if (subfolders.length === 0) {
      return NextResponse.json({ success: true, data: [], message: "Subfolder not found" });
    }

    const subfolderId = subfolders[0].id;

    const filesRes = await drive.files.list({
      q: `'${subfolderId}' in parents and trashed = false`,
      fields: "files(id, name, mimeType, webViewLink, webContentLink)",
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

    return NextResponse.json({
      success: true,
      folderName: subfolders[0].name,
      files: filesRes.data.files || [],
    });

  } catch (err: unknown) {
    console.error("GDrive error:", err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
