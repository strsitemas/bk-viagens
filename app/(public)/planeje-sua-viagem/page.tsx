import type { Metadata } from "next";
import { TravelPlannerForm } from "@/components/planner/travel-planner-form";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Planeje sua viagem | Buckart Viagens",
  description:
    "Conte para a Buckart como você deseja viajar e receba atendimento para planejar sua próxima experiência.",
};

export default function PlanejeSuaViagemPage() {
  return (
    <>
      <Header variant="light" />

      <main className="bg-[#edf7f5]">

        <section className="px-6 pb-16 pt-36 lg:px-10 lg:pb-24 lg:pt-44">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

            <div className="lg:sticky lg:top-32 lg:self-start">

              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#087d7a]">
                Planeje sua viagem
              </p>

              <h1 className="mt-5 max-w-xl text-5xl font-medium leading-[0.98] tracking-[-0.05em] text-[#063f3f] sm:text-6xl">
                Conte o que você imagina.
                <span className="block text-[#0a8b87]">
                  A Buckart cuida do caminho.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-lg leading-8 text-[#425452]">
                VocÃª nÃ£o precisa chegar com tudo decidido. Conte o que
                jÃ¡ sabe, o que gostaria de viver e quem vai com você.
                A conversa comeÃ§a daÃ­.
              </p>

              <div className="mt-10 space-y-5 border-t border-[#bfdedb] pt-8">

                <div className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#087d7a]">
                    1
                  </span>

                  <p className="pt-1 text-base leading-7 text-[#425452]">
                    Conte como imagina sua viagem.
                  </p>
                </div>

                <div className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#087d7a]">
                    2
                  </span>

                  <p className="pt-1 text-base leading-7 text-[#425452]">
                    A Buckart entende os detalhes e as possibilidades.
                  </p>
                </div>

                <div className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#087d7a]">
                    3
                  </span>

                  <p className="pt-1 text-base leading-7 text-[#425452]">
                    VocÃª recebe atendimento para avanÃ§ar com seguranÃ§a.
                  </p>
                </div>

              </div>
            </div>

            <TravelPlannerForm />

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
