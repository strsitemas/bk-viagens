import Link from "next/link";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { obterSessao } from "@/lib/auth-admin";

export const dynamic = "force-dynamic";

export default async function AdminConteudoPage() {
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
    return (
      <main className="mx-auto max-w-[1200px] px-6 py-12 lg:px-10">
        <div className="rounded-3xl border border-red-200 bg-white p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-600">
            Acesso restrito
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-[#173f3e]">
            VocÃª nÃ£o possui permissÃ£o para editar o site.
          </h1>

          <p className="mt-4 text-base leading-7 text-[#60716f]">
            O gerenciamento de conteúdo estÃ¡ disponÃ­vel
            somente para administradores e editores.
          </p>

          <Link
            href="/admin"
            className="mt-7 inline-flex rounded-full bg-[#064f4e] px-6 py-3 font-semibold text-white"
          >
            Voltar ao painel
          </Link>
        </div>
      </main>
    );
  }

  const [
    experiencias,
    destinos,
    experienciasPublicadas,
    destinosPublicados,
    destaques,
  ] = await Promise.all([
    prisma.experiencia.count({
      where: {
        empresaId: session.empresaId,
      },
    }),

    prisma.destino.count(),

    prisma.experiencia.count({
      where: {
        empresaId: session.empresaId,
        publicado: true,
      },
    }),

    prisma.destino.count({
      where: {
        publicado: true,
      },
    }),

    prisma.experiencia.count({
      where: {
        empresaId: session.empresaId,
        destaque: true,
      },
    }),
  ]);

  return (
    <main className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10 lg:py-12">

      <div>
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#078b87]">
          CMS Buckart
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#173f3e] sm:text-5xl">
          ConteÃºdo do site
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-[#60716f]">
          Gerencie destinos, experiências, publicaÃ§Ãµes
          e destaques apresentados aos viajantes.
        </p>
      </div>


      <section className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">

        <Metric
          label="Experiências"
          value={experiencias}
        />

        <Metric
          label="Publicadas"
          value={experienciasPublicadas}
        />

        <Metric
          label="Destaques"
          value={destaques}
        />

        <Metric
          label="Destinos"
          value={destinos}
        />

        <Metric
          label="Destinos publicados"
          value={destinosPublicados}
        />

      </section>


      <section className="mt-10 grid gap-6 lg:grid-cols-2">

        <div className="rounded-[2rem] border border-[#dce9e7] bg-white p-7 shadow-[0_12px_35px_rgba(15,70,68,0.05)] lg:p-8">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e4f3f1] text-2xl">
            âœˆ
          </div>

          <h2 className="mt-6 text-2xl font-semibold tracking-[-0.025em] text-[#173f3e]">
            Experiências
          </h2>

          <p className="mt-3 text-base leading-7 text-[#60716f]">
            Pacotes, roteiros, duraÃ§Ã£o, preÃ§os,
            destaques, publicaÃ§Ã£o e informaÃ§Ãµes
            comerciais.
          </p>

          <div className="mt-7 rounded-2xl bg-[#f5f9f8] px-5 py-4">
            <p className="text-sm font-semibold text-[#49605e]">
              {experiencias} cadastradas Â·{" "}
              {experienciasPublicadas} publicadas
            </p>
          </div>

          <div className="mt-7">
            <span className="inline-flex rounded-full bg-[#dfe9e7] px-5 py-3 text-sm font-semibold text-[#49605e]">
              CRUD serÃ¡ a próxima etapa
            </span>
          </div>

        </div>


        <div className="rounded-[2rem] border border-[#dce9e7] bg-white p-7 shadow-[0_12px_35px_rgba(15,70,68,0.05)] lg:p-8">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e4f3f1] text-2xl">
            â—Ž
          </div>

          <h2 className="mt-6 text-2xl font-semibold tracking-[-0.025em] text-[#173f3e]">
            Destinos
          </h2>

          <p className="mt-3 text-base leading-7 text-[#60716f]">
            PaÃ­ses, cidades, regiÃµes, melhor Ã©poca,
            descriÃ§Ã£o, SEO e conteúdo de inspiraÃ§Ã£o.
          </p>

          <div className="mt-7 rounded-2xl bg-[#f5f9f8] px-5 py-4">
            <p className="text-sm font-semibold text-[#49605e]">
              {destinos} cadastrados Â·{" "}
              {destinosPublicados} publicados
            </p>
          </div>

          <div className="mt-7">
            <Link
              href="/admin/conteudo/destinos"
              className="inline-flex rounded-full bg-[#064f4e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#043f3e]"
            >
              Gerenciar destinos
            </Link>
          </div>

        </div>

      </section>


      <section className="mt-8 rounded-[2rem] border border-[#dce9e7] bg-[#edf7f5] p-7 lg:p-8">

        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#078b87]">
          Arquitetura
        </p>

        <h2 className="mt-3 text-2xl font-semibold text-[#173f3e]">
          CMS conectado ao banco real da Buckart
        </h2>

        <p className="mt-3 max-w-3xl text-base leading-7 text-[#536967]">
          Esta Ã¡rea jÃ¡ consulta os modelos reais do
          Prisma. A próxima etapa habilitarÃ¡ criaÃ§Ã£o,
          ediÃ§Ã£o, publicaÃ§Ã£o e organizaÃ§Ã£o das
          experiências sem necessidade de alterar cÃ³digo.
        </p>

      </section>

    </main>
  );
}


function Metric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-3xl border border-[#dce9e7] bg-white p-6">
      <p className="text-sm font-semibold text-[#71817f]">
        {label}
      </p>

      <p className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#173f3e]">
        {value}
      </p>
    </div>
  );
}
