import { createClient } from "redis";
import { NextResponse } from "next/server";

// Create the Redis client once, reuse across requests
const redis = createClient({ url: process.env.REDIS_URL });

// GET current toggle values
export async function GET() {

  if (!redis.isOpen) await redis.connect();

  try {
    const showPhotos = (await redis.get("toggle:show_photos")) === "on";
    const eventEnabled = (await redis.get("toggle:event_enabled")) === "on";

    return NextResponse.json({
      show_photos: showPhotos,
      event_enabled: eventEnabled,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch toggles" },
      { status: 500 }
    );
  }
}

// POST / update toggle values
export async function POST(req: Request) {

  if (!redis.isOpen) await redis.connect();

  try {
    const { show_photos, event_enabled } = await req.json();

    if (show_photos !== undefined) {
      await redis.set("toggle:show_photos", show_photos ? "on" : "off");
    }
    if (event_enabled !== undefined) {
      await redis.set("toggle:event_enabled", event_enabled ? "on" : "off");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update toggles" },
      { status: 500 }
    );
  }
}
