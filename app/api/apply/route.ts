import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// File upload via Google Drive — coming soon
export async function POST(_req: NextRequest) {
  return NextResponse.json({ message: "File upload not yet configured." }, { status: 503 });
}
