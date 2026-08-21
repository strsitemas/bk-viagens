import Link from "next/link";

const benefits = [
  {
    number: "01",
    title: "Você conta o que deseja",
    text: "Destino definido ou apenas uma ideia. A conversa começa entendendo como você realmente quer viajar.",
  },
  {
    number: "02",
    title: "A Buckart cuida dos detalhes",
    text: "Roteiro, hospedagem, deslocamentos e experiências são organizados para fazer sentido juntos.",
  },
  {
    number: "03",
    title: "Você aproveita a viagem",
    text: "Menos tempo pesquisando e resolvendo logística. Mais tempo vivendo aquilo que motivou a viagem.",
  },
];

export function BuckartExperience() {
  return (
    <section className="bg-white px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1440px]">

        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">

          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#087d7a]">
              Experiência Buckart
            </p>

            <h2 className="mt-5 max-w-xl text-4xl font-medium leading-[1.05] tracking-[-0.045em] text-[#073f3f] sm:text-5xl lg:text-6xl">
              Viajar é melhor quando alguém cuida dos detalhes.
            </h2>

            <p className="mt-7 max-w-lg text-base leading-7 text-stone-600">
              Você não precisa transformar suas férias em um projeto de
              pesquisa. A Buckart ajuda a organizar as escolhas para que a
              experiência seja simples antes, durante e depois da viagem.
            </p>

            <Link
              href="/planeje-sua-viagem"
              className="mt-8 inline-flex items-center rounded-full bg-[#064f4e] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#08706d]"
            >
              Falar sobre minha viagem
              <span className="ml-3" aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          <div className="border-t border-stone-200">
            {benefits.map((benefit) => (
              <article
                key={benefit.number}
                className="grid gap-5 border-b border-stone-200 py-9 sm:grid-cols-[80px_1fr] sm:py-11"
              >
                <span className="text-sm font-semibold text-[#0b8f8b]">
                  {benefit.number}
                </span>

                <div>
                  <h3 className="text-2xl font-medium tracking-[-0.025em] text-stone-900 sm:text-3xl">
                    {benefit.title}
                  </h3>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-stone-500 sm:text-base">
                    {benefit.text}
                  </p>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
