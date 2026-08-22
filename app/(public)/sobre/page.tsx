import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function SobrePage() {
  return (
    <>
      <Header variant="light" />

      <main className="bg-[#f6fbfa]">
        <section className="px-6 pb-20 pt-40 lg:px-10 lg:pb-28 lg:pt-48">
          <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#078b87]">
                Sobre a Buckart
              </p>

              <h1 className="mt-6 text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-[#173f3e] sm:text-6xl lg:text-7xl">
                Viajar começa muito
                <span className="block text-[#078b87]">
                  antes do embarque.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#526966]">
                A Buckart Viagens nasceu para transformar o planejamento de uma
                viagem em uma experiência mais simples, próxima e personalizada.
                Cada viajante tem expectativas, prioridades e histórias
                diferentes — e acreditamos que cada viagem também deve ser única.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#e6f3f1] shadow-[0_24px_70px_rgba(6,79,78,0.12)]">
              <div className="relative aspect-[2/3]">
                <Image
                  src="/images/reserva de imagens/passaport1.jpg"
                  alt="Atendimento e cuidado com a documentação da viagem"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 lg:px-10 lg:pb-32">
          <div className="mx-auto grid max-w-[1240px] gap-6 lg:grid-cols-3">
            <article className="rounded-[2rem] border border-[#dcebe8] bg-white p-8">
              <p className="text-sm font-bold text-[#078b87]">01</p>

              <h2 className="mt-8 text-2xl font-semibold tracking-[-0.03em] text-[#173f3e]">
                Escutamos primeiro
              </h2>

              <p className="mt-4 leading-7 text-[#60716f]">
                Antes de indicar destinos ou roteiros, queremos entender o que
                você espera viver, quanto tempo possui e qual estilo de viagem
                combina com você.
              </p>
            </article>

            <article className="rounded-[2rem] border border-[#dcebe8] bg-white p-8">
              <p className="text-sm font-bold text-[#078b87]">02</p>

              <h2 className="mt-8 text-2xl font-semibold tracking-[-0.03em] text-[#173f3e]">
                Fazemos a curadoria
              </h2>

              <p className="mt-4 leading-7 text-[#60716f]">
                Selecionamos possibilidades de acordo com o perfil da viagem,
                ajudando você a comparar caminhos e tomar decisões com mais
                segurança.
              </p>
            </article>

            <article className="rounded-[2rem] border border-[#dcebe8] bg-white p-8">
              <p className="text-sm font-bold text-[#078b87]">03</p>

              <h2 className="mt-8 text-2xl font-semibold tracking-[-0.03em] text-[#173f3e]">
                Cuidamos do caminho
              </h2>

              <p className="mt-4 leading-7 text-[#60716f]">
                Da primeira ideia aos detalhes da viagem, nosso objetivo é
                tornar o planejamento mais organizado para que você aproveite
                melhor a experiência.
              </p>
            </article>
          </div>

          <div className="mx-auto mt-20 max-w-[1240px] rounded-[2.5rem] bg-[#064f4e] px-8 py-12 text-white sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16 lg:py-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#82f1eb]">
                Sua próxima história
              </p>

              <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                Conte para a Buckart como você gostaria de viajar.
              </h2>
            </div>

            <Link
              href="/planeje-sua-viagem"
              className="mt-8 inline-flex min-h-14 items-center rounded-full bg-white px-7 font-semibold !text-[#064f4e] transition hover:bg-[#dffaf7] lg:mt-0"
            >
              Planeje sua viagem
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}