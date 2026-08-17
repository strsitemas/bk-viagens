import Image from "next/image";
import Link from "next/link";

const navigation = [
  { label: "Destinos", href: "/destinos" },
  { label: "Experiências", href: "/experiencias" },
  { label: "Cruzeiros", href: "/cruzeiros" },
  { label: "Lua de Mel", href: "/lua-de-mel" },
  { label: "Viaje Agora", href: "/viaje-agora" },
];

type HeaderProps = {
  variant?: "overlay" | "light";
};

export function Header({ variant = "overlay" }: HeaderProps) {
  const light = variant === "light";

  return (
    <header
      className={`inset-x-0 top-0 z-30 ${
        light
          ? "absolute border-b border-[#b8d8d5]/50 bg-[#edf7f5]/95"
          : "absolute"
      }`}
    >
      <div className="mx-auto flex h-24 max-w-[1440px] items-center justify-between px-6 lg:px-10">

        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Buckart Viagens - início"
        >
          <span className="relative h-14 w-14 overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/logo-buckart-dark.jpg"
              alt=""
              fill
              priority
              sizes="56px"
              className="object-cover"
            />
          </span>

          <span className="hidden sm:block">
            <span
              className={`block text-lg font-semibold tracking-[0.22em] ${
                light ? "text-[#063f3f]" : "text-white"
              }`}
            >
              BUCKART
            </span>

            <span className="mt-1 block text-[11px] font-bold tracking-[0.38em] text-[#078b87]">
              VIAGENS
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 xl:flex"
          aria-label="Principal"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-base font-semibold transition-colors ${
                light
                  ? "text-[#173f3e] hover:text-[#078b87]"
                  : "text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.55)] hover:text-[#82f1eb]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/planeje-sua-viagem"
          className={`hidden items-center rounded-full px-6 py-3.5 text-base font-semibold shadow-lg transition sm:inline-flex ${
            light
              ? "bg-[#064f4e] text-white hover:bg-[#08706d]"
              : "bg-white text-[#064f4e] hover:bg-[#dffaf7]"
          }`}
        >
          Planeje sua viagem

          <span className={`ml-2 ${light ? "text-[#8de7e1]" : "text-[#0b8f8b]"}`}>
            →
          </span>
        </Link>

        <Link
          href="/destinos"
          className={`inline-flex h-12 w-12 items-center justify-center rounded-full shadow-lg sm:hidden ${
            light
              ? "border border-[#0a7773]/30 bg-white"
              : "border border-white/70 bg-white/15 backdrop-blur-md"
          }`}
          aria-label="Explorar destinos"
        >
          <span className="flex flex-col gap-1.5">
            <span className={`block h-[2px] w-5 ${light ? "bg-[#064f4e]" : "bg-white"}`} />
            <span className={`block h-[2px] w-5 ${light ? "bg-[#064f4e]" : "bg-white"}`} />
            <span className={`block h-[2px] w-5 ${light ? "bg-[#064f4e]" : "bg-white"}`} />
          </span>
        </Link>

      </div>
    </header>
  );
}