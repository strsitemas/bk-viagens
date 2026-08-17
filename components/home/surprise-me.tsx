import Link from "next/link";

export function SurpriseMe() {
  return (
    <section className="px-6 py-6 lg:px-10">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] bg-[#063f3f] px-7 py-14 text-white sm:px-10 lg:px-16 lg:py-20">
        <div
          className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[#19b9b0]/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#72e9e2]">
              Me surpreenda
            </p>

            <h2 className="mt-4 text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">
              Ainda não decidiu?
              <span className="block text-[#8cece6]">
                Deixa com a Buckart.
              </span>
            </h2>

            <p className="mt-6 max-w-xl leading-7 text-white/70">
              Conte como você gosta de viajar. Nós mostramos experiências que
              combinam com seu momento — sem você precisar pesquisar por horas.
            </p>
          </div>

          <Link
            href="/me-surpreenda"
            className="inline-flex min-h-14 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-[#064b4b] transition hover:bg-[#c8f6f2]"
          >
            Me surpreenda
            <span className="ml-3" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}