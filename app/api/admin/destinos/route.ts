import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { registrarAuditoria } from "@/lib/audit";
import { requireAdminRole } from "@/lib/admin-authorization";
import { createRequestId, logger } from "@/lib/logger";

const TIPOS = ["NACIONAL", "INTERNACIONAL"] as const;

type TipoDestino = (typeof TIPOS)[number];

function texto(value: unknown): string {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function booleano(value: unknown): boolean {
  return value === true;
}

function gerarSlug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function tipoValido(value: unknown): value is TipoDestino {
  return (
    typeof value === "string" &&
    TIPOS.includes(value as TipoDestino)
  );
}

export async function POST(request: Request) {
  const requestId = createRequestId();

  try {
    const auth = await requireAdminRole([
      "ADMIN",
      "EDITOR",
    ]);

    if (!auth.ok) {
      logger.warn("admin.destino.create_unauthorized", {
        requestId,
      });

      return auth.response;
    }

    let body: Record<string, unknown>;

    try {
      const parsed = await request.json();

      if (
        typeof parsed !== "object" ||
        parsed === null ||
        Array.isArray(parsed)
      ) {
        throw new Error("Body inválido");
      }

      body = parsed as Record<string, unknown>;
    } catch {
      logger.warn("admin.destino.invalid_json", {
        requestId,
        userId: auth.admin.id,
        empresaId: auth.admin.empresaId,
      });

      return NextResponse.json(
        {
          success: false,
          message: "JSON inválido.",
          requestId,
        },
        { status: 400 }
      );
    }

    const nome = texto(body.nome);
    const pais = texto(body.pais);
    const cidade = texto(body.cidade);
    const estadoRegiao = texto(body.estadoRegiao);
    const resumo = texto(body.resumo);
    const descricao = texto(body.descricao);
    const melhorEpoca = texto(body.melhorEpoca);
    const duracaoSugerida = texto(body.duracaoSugerida);
    const seoTitle = texto(body.seoTitle);
    const seoDescription = texto(body.seoDescription);

    if (!nome || !pais || !tipoValido(body.tipo)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Nome, país e tipo do destino são obrigatórios.",
          requestId,
        },
        { status: 400 }
      );
    }

    const slug = gerarSlug(
      texto(body.slug) || nome
    );

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Não foi possível gerar o slug.",
          requestId,
        },
        { status: 400 }
      );
    }

    const slugExistente =
      await prisma.destino.findUnique({
        where: { slug },
        select: { id: true },
      });

    if (slugExistente) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Já existe um destino utilizando este slug.",
          requestId,
        },
        { status: 409 }
      );
    }

    const ordemNumero = Number(body.ordem);

    const destino = await prisma.destino.create({
      data: {
        nome,
        slug,
        pais,
        estadoRegiao: estadoRegiao || null,
        cidade: cidade || null,
        tipo: body.tipo,
        resumo: resumo || null,
        descricao: descricao || null,
        melhorEpoca: melhorEpoca || null,
        duracaoSugerida: duracaoSugerida || null,
        publicado: booleano(body.publicado),
        destaque: booleano(body.destaque),
        ordem:
          Number.isInteger(ordemNumero) &&
          ordemNumero >= 0
            ? ordemNumero
            : 0,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
      },
    });

    await registrarAuditoria({
      empresaId: auth.admin.empresaId,
      usuarioId: auth.admin.id,
      acao: "CREATE",
      entidade: "Destino",
      entidadeId: destino.id,
      dadosDepois: {
        id: destino.id,
        nome: destino.nome,
        slug: destino.slug,
        pais: destino.pais,
        cidade: destino.cidade,
        tipo: destino.tipo,
        publicado: destino.publicado,
        destaque: destino.destaque,
      },
      metadata: {
        origem: "admin.cms.destino",
      },
      requestId,
      userAgent: request.headers.get("user-agent"),
    });

    logger.info("admin.destino.created", {
      requestId,
      userId: auth.admin.id,
      empresaId: auth.admin.empresaId,
      destinoId: destino.id,
      slug: destino.slug,
    });

    return NextResponse.json(
      {
        success: true,
        requestId,
        destino,
      },
      {
        status: 201,
        headers: {
          "Cache-Control": "no-store",
          "X-Request-Id": requestId,
        },
      }
    );
  } catch (error) {
    logger.error(
      "admin.destino.create_failed",
      error,
      { requestId }
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Não foi possível cadastrar o destino.",
        requestId,
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
          "X-Request-Id": requestId,
        },
      }
    );
  }
}
