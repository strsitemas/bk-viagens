import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

const experiencias = [
  {
    title: "Família",
    description:
      "Viagens para criar memórias juntos, com conforto e planejamento para todas as idades.",
    image:
      "/images/reserva%20de%20imagens/darren-lawrence-EpeNGhitrlc-unsplash.jpg",
  },
  {
    title: "Praia",
    description:
      "Dias leves, mar e descanso em destinos escolhidos para o seu ritmo.",
    image:
      "/images/reserva%20de%20imagens/fadi-al-shami-jTmbyBnbaIE-unsplash.jpg",
  },
  {
    title: "Neve",
    description:
      "Montanhas, estações de esqui e experiências de inverno para descobrir novos cenários.",
    image:
      "/images/reserva%20de%20imagens/paul-pastourmatzis-8kDOOrs608I-unsplash.jpg",
  },
  {
    title: "Europa",
    description:
      "Cultura, gastronomia e cidades inesquecíveis combinadas em uma viagem com a sua cara.",
    image:
      "/images/reserva%20de%20imagens/quick-ps-pprY3KCsoAg-unsplash.jpg",
  },
  {
    title: "Itália",
    description:
      "História, gastronomia e paisagens para quem quer viver a Europa com mais profundidade.",
    image:
      "/images/reserva%20de%20imagens/marcelo-de-souza-romao-Wh2slczZjn0-unsplash.jpg",
  },
  {
    title: "Cruzeiros",
    description:
      "Descubra vários destinos enquanto aproveita toda a experiência de viajar pelo mar.",
    image:
      "/images/reserva%20de%20imagens/meg-von-haartman-7HKYqlrdKaw-unsplash.jpg",
  },
];

export default function ExperienciasPage() {
  return (
    <>
      <Header />

      <main>
        <section className="relative flex min-h-[720px] items-end overflow-hidden bg-[#063f3f] lg:min-h-[780px] lg:items-center">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=86"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div
            className="absolute inset-0 bg-[#063f3f]/20"
            aria-hidden="true"
          />

          <div
            className="absolute inset-0 bg-gradient-to-r from-[#012f30]/90 via-[#064f4e]/55 to-[#064f4e]/10"
            aria-hidden="true"
          />

          <div
            className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#012f30]/50 to-transparent"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-16 pt-36 lg:px-10 lg:pb-0">
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#82f1eb]">
                Experiências Buckart
              </p>

              <h1 className="mt-6 text-5xl font-semibold leading-[0.97] tracking-[-0.05em] text-white sm:text-6xl lg:text-[5.2rem]">
                Não escolha apenas
                <br />
                um lugar.

                <span className="mt-2 block text-[#8af1eb]">
                  Escolha o que quer viver.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-white">
                Algumas viagens começam pelo destino. Outras começam por uma
                vontade: descansar, celebrar, descobrir, viver algo novo ou
                simplesmente estar junto.
              </p>

              <Link
                href="/planeje-sua-viagem"
                className="mt-9 inline-flex min-h-14 items-center rounded-full bg-white px-7 text-base font-semibold !text-[#064f4e] shadow-xl transition hover:bg-[#dffaf7] hover:!text-[#064f4e]"
              >
                Encontre sua experiência
                <span className="ml-2" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#f6fbfa] px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1240px]">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#078b87]">
                Viaje do seu jeito
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-[#173f3e] sm:text-5xl">
                Que tipo de história você quer trazer de volta?
              </h2>

              <p className="mt-6 text-lg leading-8 text-[#60716f]">
                Escolha uma inspiração. A Buckart cuida dos detalhes para
                transformar a ideia em uma viagem feita para você.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {experiencias.map((experiencia) => (
                <article
                  key={experiencia.title}
                  className="group relative min-h-[430px] overflow-hidden rounded-[2rem] bg-[#064f4e] shadow-[0_16px_45px_rgba(20,80,76,0.12)]"
                >
                  <Image
                    src={experiencia.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#012f30]/95 via-[#012f30]/25 to-transparent"
                    aria-hidden="true"
                  />

                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <h3 className="text-3xl font-semibold tracking-[-0.035em] text-white">
                      {experiencia.title}
                    </h3>

                    <p className="mt-3 leading-7 text-white">
                      {experiencia.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-20 overflow-hidden rounded-[2.5rem] bg-[#064f4e] px-7 py-12 sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16 lg:py-16">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#82f1eb]">
                  Sua próxima história
                </p>

                <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
                  Conte o que você gostaria de viver. A Buckart encontra o caminho.
                </h2>
              </div>

              <Link
                href="/planeje-sua-viagem"
                className="mt-8 inline-flex min-h-14 items-center rounded-full bg-white px-7 font-semibold !text-[#064f4e] transition hover:bg-[#dffaf7] lg:mt-0"
              >
                Planejar minha viagem
                <span className="ml-2" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
