import Link from "next/link";

export function FinalCta() {
  return (
    <section className="bg-white px-6 pb-6 lg:px-10 lg:pb-10">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] bg-[#063f3f] px-7 py-16 sm:px-10 lg:px-16 lg:py-24">

        <div
          className="pointer-events-none absolute -right-32 -top-40 h-[32rem] w-[32rem] rounded-full bg-[#1fb8b0]/20 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -bottom-48 -left-40 h-[30rem] w-[30rem] rounded-full bg-[#70eee7]/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">

          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#76eee7]">
              Sua próxima viagem
            </p>

            <h2 className="mt-5 text-4xl font-medium leading-[1.03] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              Conte para a Buckart
              <span className="block text-[#8af1eb]">
                como você quer viajar.
              </span>
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-7 text-white/90">
              Pode ser um destino específico, uma data especial ou simplesmente
              aquela vontade de sair por alguns dias. A partir daí, a Buckart
              ajuda a transformar a ideia em viagem.
            </p>
          </div>

          <Link
            href="/planeje-sua-viagem"
            className="inline-flex min-h-14 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold !text-[#064f4e] shadow-xl transition hover:bg-[#dffaf7] hover:!text-[#064f4e]"
          >
            Planejar minha viagem
            <span className="ml-3 text-[#0b8f8b]" aria-hidden="true">
              →
            </span>
          </Link>

        </div>
      </div>
    </section>
  );
}
