import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { fileName, mimeType } = await req.json();

    if (!fileName || !mimeType) {
      return NextResponse.json({ error: "Missing fileName or mimeType" }, { status: 400 });
    }

    if (
      !process.env.GOOGLE_CLIENT_ID ||
      !process.env.GOOGLE_CLIENT_SECRET ||
      !process.env.GOOGLE_REFRESH_TOKEN ||
      !process.env.GOOGLE_DRIVE_TROOPER_FOLDER_ID
    ) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }

    const oauth2 = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    oauth2.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

    const accessToken = (await oauth2.getAccessToken()).token;
    if (!accessToken) throw new Error("Failed to get access token");

    // Initiate a resumable upload session
    const driveUrl = `https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable`;

    const initRes = await fetch(driveUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json; charset=UTF-8",
        "X-Upload-Content-Type": mimeType,
      },
      body: JSON.stringify({
        name: fileName,
        parents: [process.env.GOOGLE_DRIVE_TROOPER_FOLDER_ID],
      }),
    });

    const uploadUrl = initRes.headers.get("location");
    if (!uploadUrl) throw new Error("No upload URL returned");

    return NextResponse.json({ uploadUrl });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

