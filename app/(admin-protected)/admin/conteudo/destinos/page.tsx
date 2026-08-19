import Link from "next/link";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { obterSessao } from "@/lib/auth-admin";

export const dynamic = "force-dynamic";

export default async function AdminDestinosPage() {
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

  const destinos = await prisma.destino.findMany({
    orderBy: [
      {
        ordem: "asc",
      },
      {
        nome: "asc",
      },
    ],
    select: {
      id: true,
      nome: true,
      pais: true,
      cidade: true,
      tipo: true,
      publicado: true,
      destaque: true,
      ordem: true,
      updatedAt: true,
      _count: {
        select: {
          imagens: true,
          experiencias: true,
        },
      },
    },
  });

  return (
    <main className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10 lg:py-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#078b87]">
            CMS Buckart
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#173f3e] sm:text-5xl">
            Destinos
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-[#60716f]">
            Gerencie os destinos apresentados aos viajantes.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/conteudo"
            className="inline-flex rounded-full border border-[#cbdedb] bg-white px-5 py-3 text-sm font-semibold text-[#173f3e]"
          >
            Voltar
          </Link>

          <Link
            href="/admin/conteudo/destinos/novo"
            className="inline-flex rounded-full bg-[#064f4e] px-6 py-3 text-sm font-semibold text-white"
          >
            Novo destino
          </Link>
        </div>
      </div>

      <section className="mt-10 overflow-hidden rounded-[2rem] border border-[#dce9e7] bg-white shadow-[0_12px_35px_rgba(15,70,68,0.05)]">
        {destinos.length === 0 ? (
          <div className="px-7 py-16 text-center">
            <p className="text-xl font-semibold text-[#173f3e]">
              Nenhum destino cadastrado
            </p>

            <p className="mt-2 text-[#60716f]">
              Cadastre o primeiro destino da Buckart.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="border-b border-[#e2ecea] bg-[#f7faf9]">
                <tr className="text-left text-sm font-semibold text-[#536967]">
                  <th className="px-7 py-5">Destino</th>
                  <th className="px-5 py-5">Tipo</th>
                  <th className="px-5 py-5">Conteúdo</th>
                  <th className="px-5 py-5">Publicação</th>
                  <th className="px-5 py-5">Ordem</th>
                  <th className="px-7 py-5 text-right">
                    Ação
                  </th>
                </tr>
              </thead>

              <tbody>
                {destinos.map((destino) => (
                  <tr
                    key={destino.id}
                    className="border-b border-[#edf2f1] last:border-b-0"
                  >
                    <td className="px-7 py-5">
                      <p className="font-semibold text-[#173f3e]">
                        {destino.nome}
                      </p>

                      <p className="mt-1 text-sm text-[#71817f]">
                        {destino.cidade
                          ? `${destino.cidade}, ${destino.pais}`
                          : destino.pais}
                      </p>
                    </td>

                    <td className="px-5 py-5 text-sm text-[#49605e]">
                      {destino.tipo === "NACIONAL"
                        ? "Nacional"
                        : "Internacional"}
                    </td>

                    <td className="px-5 py-5">
                      <p className="text-sm text-[#49605e]">
                        {destino._count.imagens} imagem(ns)
                      </p>

                      <p className="mt-1 text-xs text-[#82918f]">
                        {destino._count.experiencias} experiência(s)
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={
                            destino.publicado
                              ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800"
                              : "rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                          }
                        >
                          {destino.publicado
                            ? "Publicado"
                            : "Rascunho"}
                        </span>

                        {destino.destaque && (
                          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                            Destaque
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-5 text-sm font-semibold text-[#49605e]">
                      {destino.ordem}
                    </td>

                    <td className="px-7 py-5 text-right">
                      <Link
                        href={`/admin/conteudo/destinos/${destino.id}`}
                        className="inline-flex rounded-full border border-[#bdd7d3] px-4 py-2 text-sm font-semibold text-[#064f4e]"
                      >
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}