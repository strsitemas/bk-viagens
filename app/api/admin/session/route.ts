import { NextResponse } from "next/server";

import { requireAdminApi } from "@/lib/admin-authorization";

export async function GET() {
  const auth = await requireAdminApi();

  if (!auth.ok) {
    return auth.response;
  }

  return NextResponse.json(
    {
      success: true,

      admin: {
        id: auth.admin.id,
        nome: auth.admin.nome,
        email: auth.admin.email,
        papel: auth.admin.papel,
        empresaId: auth.admin.empresaId,
      },
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
