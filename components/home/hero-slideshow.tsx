"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "/images/hero/disney.webp",
    alt: "Experiência em família em Orlando",
    label: "Disney",
    position: "center center",
  },
  {
    src: "/images/hero/rio.webp",
    alt: "Rio de Janeiro e Cristo Redentor",
    label: "Rio de Janeiro",
    position: "center center",
  },
  {
    src: "/images/hero/paris.webp",
    alt: "Paris e Torre Eiffel",
    label: "Paris",
    position: "center center",
  },
  {
    src: "/images/hero/italia.webp",
    alt: "Experiência de viagem pela Itália",
    label: "Itália",
    position: "center center",
  },
  {
    src: "/images/hero/bahia.webp",
    alt: "Praia tropical na Bahia",
    label: "Bahia",
    position: "center center",
  },
  {
    src: "/images/hero/neve.webp",
    alt: "Estação de esqui com teleférico e pessoas esquiando na neve",
    label: "Neve",
    position: "center center",
  },
  {
    src: "/images/hero/cruzeiro.webp",
    alt: "Experiência de viagem em cruzeiro",
    label: "Cruzeiro",
    position: "center center",
  },
];

export function HeroSlideshow() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[#063f3f]"
      aria-hidden="true"
    >
      {slides.map((slide, index) => {
        const isActive = index === activeSlide;

        return (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              priority={index === 0}
              quality={85}
              sizes="100vw"
              className="object-cover"
              style={{
                objectPosition: slide.position,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}