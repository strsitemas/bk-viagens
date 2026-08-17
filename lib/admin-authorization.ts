import "server-only";

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { obterSessao } from "@/lib/auth-admin";

export type AdminRole =
  | "ADMIN"
  | "EDITOR"
  | "AGENTE";

export type AuthenticatedAdmin = {
  id: string;
  empresaId: string;
  nome: string;
  email: string;
  papel: AdminRole;
};

type AdminAuthSuccess = {
  ok: true;
  admin: AuthenticatedAdmin;
};

type AdminAuthFailure = {
  ok: false;
  response: NextResponse;
};

export type AdminAuthResult =
  | AdminAuthSuccess
  | AdminAuthFailure;


function unauthorized(
  message = "Não autorizado."
): AdminAuthFailure {
  return {
    ok: false,

    response: NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 401,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    ),
  };
}


function forbidden(
  message = "Você não possui permissão para esta operação."
): AdminAuthFailure {
  return {
    ok: false,

    response: NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 403,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    ),
  };
}


export async function requireAdminApi(): Promise<AdminAuthResult> {
  const session = await obterSessao();

  if (!session) {
    return unauthorized();
  }

  const usuario =
    await prisma.usuarioAdmin.findFirst({
      where: {
        id: session.userId,
        empresaId: session.empresaId,
        email: session.email,

        ativo: true,

        empresa: {
          slug: "buckart-viagens",
          ativo: true,
        },
      },

      select: {
        id: true,
        empresaId: true,
        nome: true,
        email: true,
        papel: true,
      },
    });

  if (!usuario) {
    return unauthorized(
      "Sessão inválida ou usuário desativado."
    );
  }

  return {
    ok: true,

    admin: {
      id: usuario.id,
      empresaId: usuario.empresaId,
      nome: usuario.nome,
      email: usuario.email,
      papel: usuario.papel,
    },
  };
}


export async function requireAdminRole(
  allowedRoles: AdminRole[]
): Promise<AdminAuthResult> {
  const auth = await requireAdminApi();

  if (!auth.ok) {
    return auth;
  }

  if (!allowedRoles.includes(auth.admin.papel)) {
    return forbidden();
  }

  return auth;
}