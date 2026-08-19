import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { obterSessao } from "@/lib/auth-admin";
import DestinoForm from "./destino-form";

export const dynamic = "force-dynamic";

export default async function NovoDestinoPage() {
  const session = await obterSessao();

  if (!session) {
    redirect("/admin/login");
  }

  const usuario = await prisma.usuarioAdmin.findFirst({
    where: {
      id: session.userId,
      empresaId: session.empresaId,
      ativo: true,
      empresa: {
        slug: "buckart-viagens",
        ativo: true,
      },
    },
    select: {
      papel: true,
    },
  });

  if (
    !usuario ||
    !["ADMIN", "EDITOR"].includes(usuario.papel)
  ) {
    redirect("/admin/conteudo");
  }

  return <DestinoForm />;
}