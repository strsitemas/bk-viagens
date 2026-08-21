import Image from "next/image";
import Link from "next/link";

const explore = [
  ["Destinos", "/destinos"],
  ["Experiências", "/experiencias"],
  ["Cruzeiros", "/cruzeiros"],
  ["Lua de Mel", "/lua-de-mel"],
  ["Viaje Agora", "/viaje-agora"],
];

const institutional = [
  ["Sobre a Buckart", "/sobre"],
  ["Planeje sua viagem", "/planeje-sua-viagem"],
  ["Privacidade", "/privacidade"],
];

export function Footer() {
  return (
    <footer className="bg-[#032f30] px-6 pb-8 pt-16 text-white lg:px-10 lg:pt-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-14 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr]">
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-flex items-center gap-4"
              aria-label="Buckart Viagens"
            >
              <span className="relative h-16 w-16 overflow-hidden rounded-2xl">
                <Image
                  src="/images/logo-buckart-dark.jpg"
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </span>

              <span>
                <span className="block text-xl font-semibold tracking-[0.22em]">
                  BUCKART
                </span>

                <span className="mt-1 block text-[10px] font-semibold tracking-[0.45em] text-[#70eee7]">
                  VIAGENS
                </span>
              </span>
            </Link>

            <p className="mt-7 text-sm leading-7 text-white/60">
              Viagens planejadas com cuidado, curadoria e atendimento próximo
              para você aproveitar melhor cada experiência.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#70eee7]">
              Explore
            </p>

            <nav className="mt-6 flex flex-col gap-4" aria-label="Explorar">
              {explore.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="w-fit text-sm text-white/70 transition hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#70eee7]">
              Buckart
            </p>

            <nav className="mt-6 flex flex-col gap-4" aria-label="Buckart">
              {institutional.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="w-fit text-sm text-white/70 transition hover:text-white"
                >
                  {label}
                </Link>
              ))}

              <a
                href="https://www.instagram.com/buckartviagens/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-sm text-white/70 transition hover:text-white"
              >
                Instagram ↗
              </a>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs text-white/45">
              © {new Date().getFullYear()} Buckart Viagens. Todos os direitos reservados.
            </p>

            <p className="mt-2 text-sm text-white/70">
              Desenvolvido por{" "}
              <a
                href="https://strsoftware.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#70eee7] transition hover:text-white"
              >
                STR Software
              </a>
            </p>
          </div>

          <Link
            href="/admin/login"
            className="w-fit text-[11px] text-white/30 transition hover:text-white/70"
          >
            Área administrativa
          </Link>
        </div>
      </div>
    </footer>
  );
}