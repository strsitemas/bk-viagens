import Image from "next/image";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2200&q=82",
    alt: "Viagem em famÃ­lia",
  },
  {
    src: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=2200&q=82",
    alt: "Rio de Janeiro",
  },
  {
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2200&q=82",
    alt: "Paris",
  },
  {
    src: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=2200&q=82",
    alt: "Itália",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=82",
    alt: "Praia",
  },
  {
    src: "https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=2200&q=82",
    alt: "Neve nos Alpes",
  },
  {
    src: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=2200&q=82",
    alt: "Cruzeiro",
  },
];

export function HeroBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[#063f3f]"
      aria-hidden="true"
    >
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className="buckart-hero-slide absolute inset-0"
          style={{
            animationDelay: `${index * -7}s`,
            zIndex: slides.length - index,
          }}
        >
          <Image
            src={slide.src}
            alt=""
            fill
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
