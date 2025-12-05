import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

async function getDriveClient() {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } = process.env;

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
    throw new Error("Google API credentials not configured.");
  }

  const oauth2 = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
  oauth2.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

  return google.drive({ version: "v3", auth: oauth2 });
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: folderId } = await context.params;

    if (!folderId) {
      return NextResponse.json({ error: "Folder ID is required" }, { status: 400 });
    }

    const drive = await getDriveClient();

    // MIME filter for images
    const imageMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
      "image/gif",
    ];

    const mimeQuery = imageMimeTypes.map(type => `mimeType='${type}'`).join(" or ");

    // Query only image files
    const filesRes = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false and (${mimeQuery})`,
      fields: "files(id, name, mimeType, webViewLink, webContentLink)",
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

    return NextResponse.json({
      success: true,
      folderId,
      images: filesRes.data.files ?? [],
    });

  } catch (err: any) {
    console.error("Google Drive Error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Unexpected error" },
      { status: 500 }
    );
  }
}
