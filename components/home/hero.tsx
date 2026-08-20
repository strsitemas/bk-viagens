import Link from "next/link";
import { HeroSlideshow } from "@/components/home/hero-slideshow";

const categories = [
  ["Disney", "/experiencias"],
  ["Europa", "/destinos"],
  ["Cruzeiros", "/cruzeiros"],
  ["Brasil", "/destinos"],
  ["Praia", "/destinos"],
  ["Neve", "/destinos"],
  ["Lua de Mel", "/lua-de-mel"],
];

export function Hero() {
  return (
    <section className="relative min-h-[780px] overflow-hidden bg-[#063f3f] lg:min-h-[840px]">

      <HeroSlideshow />

      {/*
        CAMADA 1
        Névoa verde Buckart sobre toda a fotografia.
      */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-[#063f3f]/10"
        aria-hidden="true"
      />

      {/*
        CAMADA 2
        Gradiente forte do lado esquerdo para garantir
        contraste do conteúdo principal.
      */}
      <div
        className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-r from-[#012f30]/78 via-[#064f4e]/38 to-transparent"
        aria-hidden="true"
      />

      {/*
        CAMADA 3
        Proteção do Header.
      */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[4] h-44 bg-gradient-to-b from-black/35 via-[#023c3c]/15 to-transparent"
        aria-hidden="true"
      />

      {/*
        CAMADA 4
        Profundidade na parte inferior.
      */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-56 bg-gradient-to-t from-[#012d2e]/35 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[780px] max-w-[1440px] items-end px-6 pb-14 pt-32 lg:min-h-[840px] lg:items-center lg:px-10 lg:pb-0">

        <div className="max-w-4xl text-white">

          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] !text-[#82f1eb]">
            Descubra sua próxima histÃ³ria
          </p>

          <h1 className="max-w-4xl text-5xl font-medium leading-[0.96] tracking-[-0.045em] !text-white sm:text-6xl lg:text-[5.5rem]">
            Viaje melhor.

            <span className="block !text-[#8af1eb]">
              A Buckart cuida do caminho.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base font-medium leading-7 !text-white sm:text-lg">
            Curadoria, planejamento e atendimento próximo para você aproveitar
            a viagem sem perder tempo com a parte complicada.
          </p>

          <form
            action="/destinos"
            className="mt-10 flex max-w-3xl flex-col gap-2 rounded-[1.5rem] bg-white p-2 shadow-2xl sm:flex-row sm:rounded-full"
          >
            <label htmlFor="destino" className="sr-only">
              Para onde você quer viajar?
            </label>

            <div className="flex min-h-14 flex-1 items-center px-4">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="mr-3 h-5 w-5 shrink-0 text-[#087d7a]"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" strokeWidth="1.8" />
                <path
                  d="m20 20-4-4"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>

              <input
                id="destino"
                name="q"
                type="search"
                placeholder="Para onde você quer viajar?"
                className="w-full bg-transparent text-base !text-stone-900 outline-none placeholder:!text-stone-500"
              />

            </div>

            <button
              type="submit"
              className="min-h-14 rounded-2xl !bg-[#064f4e] px-8 text-sm font-semibold !text-white transition hover:!bg-[#08706d] sm:rounded-full"
            >
              Explorar
              <span className="ml-2" aria-hidden="true">
                â†’
              </span>
            </button>
          </form>

          <div className="mt-6 flex max-w-3xl flex-wrap gap-2">

            {categories.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="rounded-full border border-white/45 bg-[#023c3c]/45 px-4 py-2 text-xs font-semibold !text-white shadow-sm backdrop-blur-sm transition hover:!bg-white hover:!text-[#064b4b]"
              >
                {label}
              </Link>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
}
