import { BuckartExperience } from "@/components/home/buckart-experience";
import { FeaturedDestinations } from "@/components/home/featured-destinations";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { SurpriseMe } from "@/components/home/surprise-me";
import { TravelStyles } from "@/components/home/travel-styles";
import { TrendingNow } from "@/components/home/trending-now";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />

        <FeaturedDestinations />

        <TrendingNow />

        <SurpriseMe />

        <TravelStyles />

        <BuckartExperience />

        <FinalCta />
      </main>

      <Footer />
    </>
  );
}
