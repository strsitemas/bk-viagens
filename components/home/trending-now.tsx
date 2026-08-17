import Link from "next/link";

const trends = [
  {
    eyebrow: "Família",
    title: "Disney",
    text: "Magia para todas as idades, com planejamento para aproveitar cada dia.",
    href: "/experiencias",
  },
  {
    eyebrow: "Europa",
    title: "Verão europeu",
    text: "Cidades, gastronomia e dias longos para explorar com calma.",
    href: "/destinos",
  },
  {
    eyebrow: "Mar",
    title: "Cruzeiros",
    text: "Vários destinos em uma única viagem, com conforto entre cada parada.",
    href: "/cruzeiros",
  },
];

export function TrendingNow() {
  return (
    <section className="bg-white px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#087d7a]">
              Em alta agora
            </p>

            <h2 className="mt-4 text-4xl font-medium tracking-[-0.04em] text-[#073f3f] sm:text-5xl">
              Talvez sua próxima viagem esteja aqui.
            </h2>

            <p className="mt-6 max-w-lg leading-7 text-stone-600">
              Destinos e experiências escolhidos pelo momento, pela procura e
              pelo que realmente pode valer a viagem.
            </p>
          </div>

          <div className="divide-y divide-stone-200 border-y border-stone-200">
            {trends.map((trend, index) => (
              <Link
                href={trend.href}
                key={trend.title}
                className="group grid gap-3 py-7 sm:grid-cols-[70px_1fr_auto] sm:items-center sm:gap-6"
              >
                <span className="text-sm font-medium text-stone-400">
                  0{index + 1}
                </span>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b8f8b]">
                    {trend.eyebrow}
                  </span>

                  <h3 className="mt-1 text-2xl font-medium text-stone-900">
                    {trend.title}
                  </h3>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-stone-500">
                    {trend.text}
                  </p>
                </div>

                <span className="text-2xl text-[#087d7a] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}