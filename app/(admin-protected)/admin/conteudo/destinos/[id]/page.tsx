import { notFound, redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { obterSessao } from "@/lib/auth-admin";
import DestinoImageManager from "@/components/admin/destino-image-manager";
import DestinoEditForm from "./destino-edit-form";

export const dynamic = "force-dynamic";

export default async function EditarDestinoPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
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

  const { id } = await params;

  const destino = await prisma.destino.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      nome: true,
      slug: true,
      pais: true,
      estadoRegiao: true,
      cidade: true,
      tipo: true,
      resumo: true,
      descricao: true,
      melhorEpoca: true,
      duracaoSugerida: true,
      publicado: true,
      destaque: true,
      ordem: true,
      seoTitle: true,
      seoDescription: true,
    },
  });

  if (!destino) {
    notFound();
  }

  return (
    <>
      <DestinoEditForm destino={destino} />

      <div className="mx-auto max-w-[1100px] px-6 pb-12 lg:px-10">
        <DestinoImageManager
          destinoId={destino.id}
          destinoNome={destino.nome}
        />
      </div>
    </>
  );
}