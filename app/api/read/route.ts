import { NextRequest, NextResponse } from "next/server";
import { markRead } from "@/lib/archive";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id || typeof id !== "string" || id.length > 300) {
      return NextResponse.json({ error: "Invalid article id" }, { status: 400 });
    }
    await markRead(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not mark article as read" }, { status: 500 });
  }
}
