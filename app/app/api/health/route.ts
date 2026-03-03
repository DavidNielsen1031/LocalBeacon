import { NextResponse } from "next/server";
import { getAnthropicStatus } from "@/lib/anthropic-client";

export async function GET() {
  const anthropic = getAnthropicStatus();

  return NextResponse.json({
    status: anthropic.isDegraded ? "degraded" : "ok",
    timestamp: Date.now(),
    anthropic,
  });
}
