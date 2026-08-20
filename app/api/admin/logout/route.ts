import { NextResponse } from "next/server";

import { destruirSessao } from "@/lib/auth-admin";

export async function POST() {
  await destruirSessao();

  return NextResponse.json({
    success: true,
  });
}
