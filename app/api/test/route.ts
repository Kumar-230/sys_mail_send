import { NextResponse } from "next/server";
import { buildDigest, renderHtml } from "@/lib/digest";

export const runtime = "nodejs";

export async function GET() {
  const items = await buildDigest();
  return new NextResponse(renderHtml(items), {
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
}