import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { buildDigest, renderHtml } from "@/lib/digest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const items = await buildDigest();
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.DIGEST_FROM!,
      to: [process.env.DIGEST_TO!],
      subject: `Learning Digest — ${items.length} new items`,
      html: renderHtml(items),
    });
    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json({ ok: true, sent: items.length });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Digest failed" }, { status: 500 });
  }
}