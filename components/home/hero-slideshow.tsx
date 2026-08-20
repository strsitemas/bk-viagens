"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1670336863762-8172a5885a1f?auto=format&fit=crop&w=1920&q=85",
    alt: "Viagem em família em Orlando",
    position: "center center",
  },
  {
    src: "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&w=1920&q=85",
    alt: "Cristo Redentor e Rio de Janeiro",
    position: "center center",
  },
  {
    src: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1920&q=85",
    alt: "Torre Eiffel em Paris",
    position: "center center",
  },
  {
    src: "https://images.unsplash.com/photo-1533656338503-b22f63e96cd8?auto=format&fit=crop&w=1920&q=85",
    alt: "Costa italiana",
    position: "center center",
  },
  {
    src: "https://images.unsplash.com/photo-1646494835208-ba788b9a3ed5?auto=format&fit=crop&w=1920&q=85",
    alt: "Viagem pela Bahia",
    position: "center center",
  },
  {
    src: "https://images.unsplash.com/photo-1774980736296-706f38d211e7?auto=format&fit=crop&w=1920&q=85",
    alt: "Viagem para destino de neve",
    position: "center center",
  },
  {
    src: "https://images.unsplash.com/photo-1675684319073-dd1a1c3587b8?auto=format&fit=crop&w=1920&q=85",
    alt: "Viagem de cruzeiro",
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
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
            index === activeSlide ? "opacity-100" : "opacity-0"
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
            style={{ objectPosition: slide.position }}
          />
        </div>
      ))}
    </div>
  );
}

