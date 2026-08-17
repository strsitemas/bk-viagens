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
    const empresa = await prisma.empresa.upsert({
      where: {
        slug: "buckart-viagens",
      },

      update: {
        nome: "Buckart Viagens",
        site: "https://buckartviagens.com.br",
        ativo: true,
      },

      create: {
        nome: "Buckart Viagens",
        slug: "buckart-viagens",
        site: "https://buckartviagens.com.br",
        ativo: true,
      },

      select: {
        id: true,
        nome: true,
        slug: true,
        site: true,
        ativo: true,
      },
    });

    console.log("");
    console.log("============================================");
    console.log(" BUCKART - EMPRESA CONFIGURADA");
    console.log("============================================");
    console.log("");
    console.log(empresa);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});