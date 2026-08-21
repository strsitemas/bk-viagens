import Image from "next/image";
import Link from "next/link";

const destinations = [
  {
    name: "Itália",
    description: "História, gastronomia e paisagens inesquecíveis.",
    href: "/destinos/italia",
    image:
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=82",
  },
  {
    name: "Maldivas",
    description: "Dias desacelerados em algumas das águas mais bonitas do mundo.",
    href: "/destinos/maldivas",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=82",
  },
  {
    name: "Patagônia",
    description: "Natureza monumental para quem quer sentir o mundo de perto.",
    href: "/destinos/patagonia",
    image:
      "https://images.unsplash.com/photo-1531761535209-180857e963b9?auto=format&fit=crop&w=1200&q=82",
  },
];

export function FeaturedDestinations() {
  return (
    <section className="bg-[#f7f5f1] px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">
              Curadoria Buckart
            </p>

            <h2 className="text-4xl font-medium tracking-[-0.035em] text-stone-900 sm:text-5xl">
              Para onde agora?
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-stone-600">
            Alguns lugares simplesmente combinam com o momento certo.
            Selecionamos experiências que merecem entrar no seu próximo roteiro.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {destinations.map((destination, index) => (
            <Link
              href={destination.href}
              key={destination.name}
              className={`group relative overflow-hidden rounded-[1.75rem] bg-stone-800 ${
                ""
              }`}
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.035]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 text-white lg:p-8">
                  <h3 className="text-3xl font-medium tracking-[-0.03em]">
                    {destination.name}
                  </h3>

                  <p className="mt-2 max-w-xs text-sm leading-6 text-white/75">
                    {destination.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                    Descobrir
                    <span
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
