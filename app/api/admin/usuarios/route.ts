import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { requireAdminRole } from "@/lib/admin-authorization";

const PAPEIS = ["ADMIN", "EDITOR", "AGENTE"] as const;

type PapelUsuario = (typeof PAPEIS)[number];

function papelValido(value: unknown): value is PapelUsuario {
  return (
    typeof value === "string" &&
    PAPEIS.includes(value as PapelUsuario)
  );
}

export async function GET() {
  const auth = await requireAdminRole(["ADMIN"]);

  if (!auth.ok) {
    return auth.response;
  }

  const usuarios = await prisma.usuarioAdmin.findMany({
    where: {
      empresaId: auth.admin.empresaId,
    },
    select: {
      id: true,
      nome: true,
      email: true,
      papel: true,
      ativo: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: [
      {
        ativo: "desc",
      },
      {
        nome: "asc",
      },
    ],
  });

  return NextResponse.json(
    {
      success: true,
      usuarios,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

export async function POST(request: Request) {
  const auth = await requireAdminRole(["ADMIN"]);

  if (!auth.ok) {
    return auth.response;
  }

  try {
    const body: unknown = await request.json();

    if (typeof body !== "object" || body === null) {
      return NextResponse.json(
        {
          success: false,
          message: "Dados inválidos.",
        },
        {
          status: 400,
        }
      );
    }

    const data = body as Record<string, unknown>;

    const nome =
      typeof data.nome === "string"
        ? data.nome.trim()
        : "";

    const email =
      typeof data.email === "string"
        ? data.email.trim().toLowerCase()
        : "";

    const senha =
      typeof data.senha === "string"
        ? data.senha
        : "";

    const papel = data.papel;

    if (nome.length < 3) {
      return NextResponse.json(
        {
          success: false,
          message: "Informe um nome válido.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !email ||
      !email.includes("@") ||
      email.length > 254
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Informe um e-mail válido.",
        },
        {
          status: 400,
        }
      );
    }

    if (senha.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A senha deve possuir pelo menos 8 caracteres.",
        },
        {
          status: 400,
        }
      );
    }

    if (!papelValido(papel)) {
      return NextResponse.json(
        {
          success: false,
          message: "Perfil de usuário inválido.",
        },
        {
          status: 400,
        }
      );
    }

    const existente =
      await prisma.usuarioAdmin.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
        },
      });

    if (existente) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Já existe um usuário cadastrado com este e-mail.",
        },
        {
          status: 409,
        }
      );
    }

    const senhaHash = await bcrypt.hash(senha, 12);

    const usuario = await prisma.usuarioAdmin.create({
      data: {
        empresaId: auth.admin.empresaId,
        nome,
        email,
        senhaHash,
        papel,
        ativo: true,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        papel: true,
        ativo: true,
        createdAt: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        empresaId: auth.admin.empresaId,
        usuarioId: auth.admin.id,
        acao: "USUARIO_CRIADO",
        entidade: "UsuarioAdmin",
        entidadeId: usuario.id,
        dadosDepois: {
          nome: usuario.nome,
          email: usuario.email,
          papel: usuario.papel,
          ativo: usuario.ativo,
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        usuario,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "[BUCKART_ADMIN_USUARIOS_CREATE_ERROR]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Não foi possível criar o usuário.",
      },
      {
        status: 500,
      }
    );
  }
}