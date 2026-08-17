import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

async function main() {
  const connectionString = process.env.DATABASE_URL;
  const nome = process.env.STR_ADMIN_NOME;
  const email = process.env.STR_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.STR_ADMIN_PASSWORD;

  if (!connectionString) {
    throw new Error("DATABASE_URL nao configurada.");
  }

  if (!nome || !email || !password) {
    throw new Error("Credenciais temporarias do administrador ausentes.");
  }

  if (password.length < 12) {
    throw new Error("A senha deve possuir pelo menos 12 caracteres.");
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
        ativo: true,
      },
    });

    if (!empresa || !empresa.ativo) {
      throw new Error("Empresa Buckart ativa nao encontrada.");
    }

    const senhaHash = await bcrypt.hash(password, 12);

    const usuario = await prisma.usuarioAdmin.upsert({
      where: {
        email,
      },

      update: {
        empresaId: empresa.id,
        nome,
        senhaHash,
        papel: "ADMIN",
        ativo: true,
      },

      create: {
        empresaId: empresa.id,
        nome,
        email,
        senhaHash,
        papel: "ADMIN",
        ativo: true,
      },

      select: {
        id: true,
        nome: true,
        email: true,
        papel: true,
        ativo: true,
        empresa: {
          select: {
            nome: true,
            slug: true,
          },
        },
      },
    });

    console.log("");
    console.log("============================================");
    console.log(" BUCKART - ADMIN CONFIGURADO");
    console.log("============================================");
    console.log("");
    console.log(usuario);
  }
  finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("[STR_ADMIN_SETUP_ERROR]", error);
  process.exit(1);
});