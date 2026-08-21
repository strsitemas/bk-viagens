import { PublicLandingPage } from "@/components/public-landing-page";

export default function ViajeAgoraPage() {
  return (
    <PublicLandingPage
      eyebrow="Viaje Agora"
      title="A vontade apareceu."
      highlight="Talvez a viagem esteja mais perto do que parece."
      description="Para quem tem flexibilidade e quer aproveitar boas oportunidades, a Buckart ajuda a encontrar possibilidades de viagem sem transformar a decisão de última hora em improviso."
      heroImage="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=85"
      heroImageAlt="Experiência de viagem e descoberta"
      items={[
        {
          title: "Próximos feriados",
          description:
            "Ideias para transformar alguns dias livres em uma viagem bem aproveitada.",
          image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82",
        },
        {
          title: "Praia agora",
          description:
            "Destinos para quem quer trocar a rotina por alguns dias perto do mar.",
          image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=82",
        },
        {
          title: "Escapadas",
          description:
            "Viagens mais curtas para descansar, conhecer um lugar novo e voltar com outra energia.",
          image:
            "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=82",
        },
        {
          title: "Internacional",
          description:
            "Possibilidades para quem está com documentos em ordem e flexibilidade para embarcar.",
          image:
            "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=82",
        },
        {
          title: "Cruzeiros",
          description:
            "Consulte possibilidades de embarque e roteiros para as próximas temporadas.",
          image:
            "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1200&q=82",
        },
        {
          title: "Tenho datas flexíveis",
          description:
            "Conte quando você pode viajar e deixe a Buckart procurar caminhos interessantes para você.",
          image:
            "https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=1200&q=82",
        },
      ]}
    />
  );
}