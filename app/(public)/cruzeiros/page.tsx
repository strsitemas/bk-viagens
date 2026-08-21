import { PublicLandingPage } from "@/components/public-landing-page";

export default function CruzeirosPage() {
  return (
    <PublicLandingPage
      eyebrow="Cruzeiros"
      title="A viagem começa"
      highlight="antes mesmo de chegar ao destino."
      description="Descubra roteiros pelo mar com diferentes estilos de navio, duração e destinos. A Buckart ajuda você a encontrar o cruzeiro que combina com a sua viagem."
      heroImage="https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=2200&q=85"
      heroImageAlt="Cruzeiro navegando pelo oceano"
      items={[
        {
          title: "Caribe",
          description:
            "Mar azul, ilhas e dias de descanso em alguns dos roteiros mais desejados do mundo.",
          image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=82",
        },
        {
          title: "Mediterrâneo",
          description:
            "Uma maneira especial de conhecer diferentes cidades e países europeus em uma única viagem.",
          image:
            "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1200&q=82",
        },
        {
          title: "Brasil",
          description:
            "Cruzeiros pela costa brasileira para quem quer embarcar em grandes experiências sem ir tão longe.",
          image:
            "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=82",
        },
        {
          title: "Família",
          description:
            "Navios com entretenimento, gastronomia e atividades para diferentes idades.",
          image:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=82",
        },
        {
          title: "A dois",
          description:
            "Roteiros para quem procura descanso, gastronomia e bons momentos no mar.",
          image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82",
        },
        {
          title: "Primeiro cruzeiro",
          description:
            "Ajudamos você a entender cabine, roteiro, duração e tudo o que precisa saber antes de embarcar.",
          image:
            "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1200&q=82",
        },
      ]}
    />
  );
}