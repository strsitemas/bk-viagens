import Image from "next/image";
import Link from "next/link";

export function TravelAdvisor() {
  return (
    <section className="px-6 py-12 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-[2.5rem] bg-[#f2f7f6] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[520px] sm:min-h-[620px] lg:min-h-[680px]">
          <Image
            src="/images/suelen-buckart.jpg"
            alt="Suelen, responsável pela Buckart Viagens"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover object-top"
          />
        </div>

        <div className="flex items-center px-7 py-12 sm:px-12 lg:px-16 lg:py-16 xl:px-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#087d7a]">
              Quem cuida da sua viagem
            </p>

            <h2 className="mt-5 text-4xl font-medium leading-[1.08] tracking-[-0.045em] text-[#073f3f] sm:text-5xl lg:text-6xl">
              10 anos realizando
              <span className="block text-[#0b8f8b]">
                sonhos pelo mundo.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-base leading-8 text-[#536866]">
              À frente da Buckart Viagens, Suelen transforma ideias em viagens
              planejadas com cuidado e atendimento próximo. Cruzeiros, roteiros
              personalizados e viagens nacionais e internacionais pensados de
              acordo com cada viajante.
            </p>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#315957]">
              Buckart Viagens · Salto/SP
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sobre"
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#064f4e] px-7 text-sm font-semibold !text-white transition hover:bg-[#08716e] hover:!text-white"
              >
                Conheça a Buckart
                <span className="ml-3" aria-hidden="true">
                  →
                </span>
              </Link>

              <a
                href="https://wa.me/5511953797214?text=Ol%C3%A1%21%20Conheci%20a%20Buckart%20pelo%20site%20e%20gostaria%20de%20conversar%20sobre%20uma%20viagem."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#0b8f8b]/30 bg-white px-7 text-sm font-semibold !text-[#064f4e] transition hover:bg-[#e2f6f3] hover:!text-[#064f4e]"
              >
                Falar com a Buckart
                <span className="ml-3" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}