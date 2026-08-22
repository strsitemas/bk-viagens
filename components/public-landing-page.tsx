import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

type PublicLandingPageProps = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  heroImage?: string;
  heroImageAlt?: string;
  items: {
    title: string;
    description: string;
    image?: string;
  }[];
};

export function PublicLandingPage({
  eyebrow,
  title,
  highlight,
  description,
  heroImage,
  heroImageAlt = "",
  items,
}: PublicLandingPageProps) {
  return (
    <>
      <Header variant={heroImage ? "overlay" : "light"} />

      <main className="bg-[#f6fbfa]">
        <section
          className={`relative overflow-hidden px-6 pb-24 pt-40 lg:px-10 lg:pb-32 lg:pt-48 ${
            heroImage ? "min-h-[720px] flex items-end" : ""
          }`}
        >
          {heroImage ? (
            <>
              <Image
                src={heroImage}
                alt={heroImageAlt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />

              <div
                className="absolute inset-0 bg-gradient-to-r from-[#012f30]/90 via-[#064f4e]/60 to-[#064f4e]/10"
                aria-hidden="true"
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-[#012f30]/55 via-transparent to-black/20"
                aria-hidden="true"
              />
            </>
          ) : (
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#e2f5f2] via-[#f8fcfb] to-white"
              aria-hidden="true"
            />
          )}

          <div className="relative mx-auto w-full max-w-[1240px]">
            <p
              className={`text-xs font-bold uppercase tracking-[0.3em] ${
                heroImage ? "text-[#82f1eb]" : "text-[#078b87]"
              }`}
            >
              {eyebrow}
            </p>

            <h1
              className={`mt-6 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-7xl ${
                heroImage ? "text-white" : "text-[#173f3e]"
              }`}
            >
              {title}

              <span
                className={`block ${
                  heroImage ? "text-[#82f1eb]" : "text-[#078b87]"
                }`}
              >
                {highlight}
              </span>
            </h1>

            <p
              className={`mt-8 max-w-2xl text-lg leading-8 ${
                heroImage ? "text-white" : "text-[#526966]"
              }`}
            >
              {description}
            </p>

            <Link
              href="/planeje-sua-viagem"
              className={`mt-9 inline-flex min-h-14 items-center rounded-full px-7 text-base font-semibold shadow-lg transition ${
                heroImage
                  ? "bg-white text-[#064f4e] hover:bg-[#dffaf7]"
                  : "bg-[#064f4e] text-white hover:bg-[#08706d]"
              }`}
            >
              Planeje sua viagem
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1240px]">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item, index) => (
                <article
                  key={item.title}
                  className="group relative min-h-[360px] overflow-hidden rounded-[2rem] border border-[#dcebe8] bg-white shadow-[0_12px_40px_rgba(20,80,76,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(20,80,76,0.14)]"
                >
                  {item.image ? (
                    <>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />

                      <div
                        className="absolute inset-0 bg-gradient-to-t from-[#012f30]/95 via-[#012f30]/25 to-transparent"
                        aria-hidden="true"
                      />

                      <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                        <span className="text-sm font-bold text-[#82f1eb]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                          {item.title}
                        </h2>

                        <p className="mt-3 leading-7 text-white/90">
                          {item.description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="p-8">
                      <span className="text-sm font-bold text-[#078b87]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h2 className="mt-12 text-2xl font-semibold tracking-[-0.03em] text-[#173f3e]">
                        {item.title}
                      </h2>

                      <p className="mt-4 leading-7 text-[#60716f]">
                        {item.description}
                      </p>
                    </div>
                  )}
                </article>
              ))}
            </div>

            <div className="mt-20 rounded-[2.5rem] bg-[#064f4e] px-7 py-12 text-white sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16 lg:py-16">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#82f1eb]">
                  Buckart Viagens
                </p>

                <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
                  Você sonha com a viagem. A gente organiza o caminho.
                </h2>
              </div>

              <Link
                href="/planeje-sua-viagem"
                className="mt-8 inline-flex min-h-14 items-center rounded-full bg-white px-7 font-semibold !text-[#064f4e] transition hover:bg-[#dffaf7] hover:!text-[#064f4e] lg:mt-0"
              >
                Quero planejar
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