import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { upsertSetting } from "@/lib/queries/settings";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { key, value } = await req.json();
    if (!key) return NextResponse.json({ error: "key required" }, { status: 400 });

    await upsertSetting(key, value);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Settings save error:", err);
    return NextResponse.json({ error: "Failed to save setting" }, { status: 500 });
  }
}
