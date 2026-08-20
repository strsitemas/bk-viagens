import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DestinoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const destino = await prisma.destino.findFirst({
    where: {
      slug,
      publicado: true,
    },
    include: {
      imagens: {
        orderBy: {
          ordem: "asc",
        },
      },
    },
  });

  if (!destino) {
    notFound();
  }

  const capa =
    destino.imagens.find((imagem) => imagem.tipo === "CAPA") ??
    destino.imagens[0];

  return (
    <main className="min-h-screen bg-[#f5f9f8]">
      <section className="relative min-h-[72vh] overflow-hidden">
        {capa && (
          <Image
            src={capa.url}
            alt={capa.alt || destino.nome}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative mx-auto flex min-h-[72vh] max-w-[1400px] items-end px-6 pb-16 lg:px-10 lg:pb-20">
          <div className="max-w-4xl text-white">
            <p className="text-sm font-bold uppercase tracking-[0.25em]">
              {destino.tipo === "INTERNACIONAL"
                ? "Destino internacional"
                : "Destino nacional"}
            </p>

            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              {destino.nome}
            </h1>

            <p className="mt-4 text-xl text-white/90">
              {[destino.cidade, destino.estadoRegiao, destino.pais]
                .filter(Boolean)
                .join(" · ")}
            </p>

            {destino.resumo && (
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90">
                {destino.resumo}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-10 px-6 py-16 lg:grid-cols-[1fr_340px] lg:px-10 lg:py-20">
        <article>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#078b87]">
            Descubra
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#173f3e] sm:text-4xl">
            Viva {destino.nome}
          </h2>

          {destino.descricao && (
            <p className="mt-6 whitespace-pre-line text-lg leading-8 text-[#536967]">
              {destino.descricao}
            </p>
          )}
        </article>

        <aside className="h-fit rounded-[2rem] border border-[#dce9e7] bg-white p-7 shadow-sm">
          <h2 className="text-xl font-semibold text-[#173f3e]">
            Informações da viagem
          </h2>

          <div className="mt-6 space-y-6">
            {destino.melhorEpoca && (
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#078b87]">
                  Melhor época
                </p>
                <p className="mt-2 text-[#536967]">
                  {destino.melhorEpoca}
                </p>
              </div>
            )}

            {destino.duracaoSugerida && (
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#078b87]">
                  Duração sugerida
                </p>
                <p className="mt-2 text-[#536967]">
                  {destino.duracaoSugerida}
                </p>
              </div>
            )}
          </div>

          <Link
            href="/planeje-sua-viagem"
            className="mt-8 flex w-full items-center justify-center rounded-full bg-[#065c59] px-6 py-4 font-semibold text-white transition hover:bg-[#044b49]"
          >
            Quero conhecer {destino.nome}
          </Link>
        </aside>
      </section>

      {destino.imagens.length > 1 && (
        <section className="mx-auto max-w-[1400px] px-6 pb-20 lg:px-10">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {destino.imagens.map((imagem) => (
              <div
                key={imagem.id}
                className="relative aspect-[4/3] overflow-hidden rounded-[2rem]"
              >
                <Image
                  src={imagem.url}
                  alt={imagem.alt || destino.nome}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

