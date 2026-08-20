import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { criarSessao } from "@/lib/auth-admin";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("email" in body) ||
      !("senha" in body)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Credenciais invÃ¡lidas.",
        },
        { status: 400 }
      );
    }

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const senha =
      typeof body.senha === "string"
        ? body.senha
        : "";

    if (!email || !senha) {
      return NextResponse.json(
        {
          success: false,
          message: "Informe e-mail e senha.",
        },
        { status: 400 }
      );
    }

    const usuario =
      await prisma.usuarioAdmin.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          empresaId: true,
          nome: true,
          email: true,
          senhaHash: true,
          papel: true,
          ativo: true,
          empresa: {
            select: {
              slug: true,
              ativo: true,
            },
          },
        },
      });

    const loginValido =
      usuario &&
      usuario.ativo &&
      usuario.empresa.ativo &&
      usuario.empresa.slug === "buckart-viagens" &&
      (await bcrypt.compare(
        senha,
        usuario.senhaHash
      ));

    if (!loginValido || !usuario) {
      return NextResponse.json(
        {
          success: false,
          message: "E-mail ou senha invÃ¡lidos.",
        },
        { status: 401 }
      );
    }

    await criarSessao({
      userId: usuario.id,
      empresaId: usuario.empresaId,
      nome: usuario.nome,
      email: usuario.email,
      papel: usuario.papel,
    });

    return NextResponse.json({
      success: true,
    });
  }
  catch (error) {
    console.error(
      "[BUCKART_ADMIN_LOGIN_ERROR]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "NÃ£o foi possÃ­vel realizar o login.",
      },
      { status: 500 }
    );
  }
}
