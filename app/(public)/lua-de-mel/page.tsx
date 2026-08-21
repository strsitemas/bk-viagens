import { PublicLandingPage } from "@/components/public-landing-page";

export default function LuaDeMelPage() {
  return (
    <PublicLandingPage
      eyebrow="Lua de Mel"
      title="A primeira grande viagem"
      highlight="da nova história de vocês."
      description="Uma lua de mel merece mais do que um destino bonito. A Buckart ajuda a construir uma viagem a dois com ritmo, experiências e detalhes pensados para o casal."
      heroImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=85"
      heroImageAlt="Praia paradisíaca para lua de mel"
      items={[
        {
          title: "Maldivas",
          description:
            "Águas transparentes, privacidade e dias feitos para desacelerar juntos.",
          image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=82",
        },
        {
          title: "Itália",
          description:
            "Romance, gastronomia, história e cidades que transformam cada dia em uma experiência.",
          image:
            "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=82",
        },
        {
          title: "Paris",
          description:
            "Um clássico para celebrar a dois entre passeios, gastronomia e cenários inesquecíveis.",
          image:
            "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=82",
        },
        {
          title: "Caribe",
          description:
            "Praias especiais e resorts para uma viagem leve, confortável e romântica.",
          image:
            "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=82",
        },
        {
          title: "Cruzeiro",
          description:
            "Vários destinos em uma única viagem com estrutura, gastronomia e experiências a bordo.",
          image:
            "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1200&q=82",
        },
        {
          title: "Sob medida",
          description:
            "Conte para a Buckart como vocês imaginam essa viagem e nós ajudamos a transformar a ideia em roteiro.",
          image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82",
        },
      ]}
    />
  );
}