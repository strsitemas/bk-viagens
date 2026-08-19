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
    const logs = await prisma.auditLog.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      select: {
        id: true,
        acao: true,
        entidade: true,
        entidadeId: true,
        dadosAntes: true,
        dadosDepois: true,
        metadata: true,
        requestId: true,
        userAgent: true,
        createdAt: true,
        usuario: {
          select: {
            nome: true,
            email: true,
          },
        },
        empresa: {
          select: {
            nome: true,
          },
        },
      },
    });

    console.log("");
    console.log("============================================");
    console.log(" BUCKART - AUDIT LOG");
    console.log("============================================");
    console.log("");
    console.log("Registros encontrados:", logs.length);
    console.log("");

    console.dir(logs, {
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