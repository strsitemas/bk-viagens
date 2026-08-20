import Image from "next/image";
import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const dynamic = "force-dynamic";

export default async function DestinosPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const busca = q?.trim();

  const destinos = await prisma.destino.findMany({
    where: {
      publicado: true,
      ...(busca
        ? {
            OR: [
              { nome: { contains: busca, mode: "insensitive" } },
              { cidade: { contains: busca, mode: "insensitive" } },
              { pais: { contains: busca, mode: "insensitive" } },
              { estadoRegiao: { contains: busca, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: {
      imagens: {
        orderBy: {
          ordem: "asc",
        },
      },
    },
    orderBy: [
      { destaque: "desc" },
      { ordem: "asc" },
      { nome: "asc" },
    ],
  });

  return (
    <>
      <Header variant="light" />

      <main className="min-h-screen bg-[#f5f9f8]">
        <section className="bg-[#064f4e] px-6 pb-16 pt-36 text-white lg:px-10 lg:pb-20 lg:pt-44">
          <div className="mx-auto max-w-[1400px]">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8af1eb]">
              Inspire-se
            </p>

            <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
              Para onde vamos?
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
              Explore destinos selecionados pela Buckart e encontre
              a próxima experiência que combina com você.
            </p>

            <form
              action="/destinos"
              className="mt-9 flex max-w-2xl rounded-full bg-white p-2"
            >
              <input
                type="search"
                name="q"
                defaultValue={busca}
                placeholder="Busque por destino, cidade ou país"
                className="min-w-0 flex-1 bg-transparent px-5 text-base text-stone-900 outline-none placeholder:text-stone-500"
              />

              <button
                type="submit"
                className="rounded-full bg-[#078b87] px-7 py-3 font-semibold text-white"
              >
                Buscar
              </button>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-20">
          {busca && (
            <div className="mb-9">
              <p className="text-[#60716f]">
                Resultado para{" "}
                <strong className="text-[#173f3e]">
                  “{busca}”
                </strong>
              </p>
            </div>
          )}

          {destinos.length === 0 ? (
            <div className="rounded-[2rem] bg-white p-10 text-center">
              <h2 className="text-2xl font-semibold text-[#173f3e]">
                Nenhum destino encontrado
              </h2>

              <p className="mt-3 text-[#60716f]">
                Experimente outra busca ou fale com a Buckart
                para criarmos uma viagem personalizada.
              </p>

              <Link
                href="/planeje-sua-viagem"
                className="mt-7 inline-flex rounded-full bg-[#064f4e] px-7 py-3 font-semibold text-white"
              >
                Planejar minha viagem
              </Link>
            </div>
          ) : (
            <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {destinos.map((destino) => {
                const capa =
                  destino.imagens.find(
                    (imagem) => imagem.tipo === "CAPA"
                  ) ?? destino.imagens[0];

                return (
                  <Link
                    key={destino.id}
                    href={`/destinos/${destino.slug}`}
                    className="group overflow-hidden rounded-[2rem] bg-white shadow-[0_15px_45px_rgba(15,70,68,0.08)]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#dce9e7]">
                      {capa ? (
                        <Image
                          src={capa.url}
                          alt={capa.alt || destino.nome}
                          fill
                          className="object-cover transition duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[#60716f]">
                          Buckart Viagens
                        </div>
                      )}

                      {destino.destaque && (
                        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#064f4e] backdrop-blur">
                          Destaque
                        </span>
                      )}
                    </div>

                    <div className="p-7">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#078b87]">
                        {destino.tipo === "INTERNACIONAL"
                          ? "Internacional"
                          : "Brasil"}
                      </p>

                      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-[#173f3e]">
                        {destino.nome}
                      </h2>

                      <p className="mt-2 text-sm text-[#71817f]">
                        {[destino.cidade, destino.pais]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>

                      {destino.resumo && (
                        <p className="mt-5 line-clamp-3 leading-7 text-[#60716f]">
                          {destino.resumo}
                        </p>
                      )}

                      <div className="mt-7 font-semibold text-[#067a77]">
                        Descobrir {destino.nome} →
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}


