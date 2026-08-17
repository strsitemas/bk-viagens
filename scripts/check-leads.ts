import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL nao configurada.");
  }

  const adapter = new PrismaPg({
    connectionString,
  });

  const prisma = new PrismaClient({
    adapter,
  });

  try {
    const empresa = await prisma.empresa.findUnique({
      where: {
        slug: "buckart-viagens",
      },
      select: {
        id: true,
        nome: true,
        slug: true,
      },
    });

    if (!empresa) {
      throw new Error("Empresa Buckart nao encontrada.");
    }

    const leads = await prisma.lead.findMany({
      where: {
        empresaId: empresa.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      select: {
        id: true,
        nome: true,
        whatsapp: true,
        email: true,
        destinoDesejado: true,
        periodoDesejado: true,
        duracaoDesejada: true,
        quantidadeAdultos: true,
        quantidadeCriancas: true,
        observacoes: true,
        origemLead: true,
        status: true,
        consentimentoLgpd: true,
        consentimentoEm: true,
        createdAt: true,
      },
    });

    console.log("");
    console.log("============================================");
    console.log(" BUCKART - LEADS NO NEON");
    console.log("============================================");
    console.log("");
    console.log("Empresa:", empresa.nome);
    console.log("Leads encontrados:", leads.length);
    console.log("");

    console.dir(leads, {
      depth: null,
      colors: true,
    });
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("[STR] ERRO:", error);
  process.exit(1);
});