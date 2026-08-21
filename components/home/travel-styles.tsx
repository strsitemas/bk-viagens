import Link from "next/link";

const styles = [
  ["Lua de Mel", "Romance, tempo e lugares especiais.", "/lua-de-mel"],
  ["Família", "Experiências que funcionam para todas as idades.", "/experiencias"],
  ["Praia", "Sol, mar e dias sem pressa.", "/destinos"],
  ["Cruzeiros", "Conforto e novos lugares a cada parada.", "/cruzeiros"],
  ["Gastronomia", "Conheça um destino também pela mesa.", "/experiencias"],
  ["Natureza", "Paisagens que justificam a viagem.", "/destinos"],
];

export function TravelStyles() {
  return (
    <section className="bg-[#f3f8f7] px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#087d7a]">
            Viaje do seu jeito
          </p>

          <h2 className="mt-4 text-4xl font-medium tracking-[-0.04em] text-[#073f3f] sm:text-5xl">
            O destino importa. O jeito de viver a viagem também.
          </h2>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] bg-[#b9d8d5] sm:grid-cols-2 lg:grid-cols-3">
          {styles.map(([title, description, href]) => (
            <Link
              href={href}
              key={title}
              className="group min-h-48 bg-white p-7 transition-colors hover:bg-[#e6f7f5] lg:p-9"
            >
              <div className="flex h-full flex-col justify-between">
                <span className="text-sm font-semibold text-[#0b8f8b]">
                  {title}
                </span>

                <div>
                  <p className="max-w-xs text-sm leading-6 text-stone-500">
                    {description}
                  </p>

                  <span className="mt-5 inline-flex text-xl text-[#087d7a] transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
