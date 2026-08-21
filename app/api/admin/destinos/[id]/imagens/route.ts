import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { registrarAuditoria } from "@/lib/audit";
import { requireAdminRole } from "@/lib/admin-authorization";
import { createRequestId, logger } from "@/lib/logger";

const TIPOS = ["CAPA", "GALERIA"] as const;

type TipoImagem = (typeof TIPOS)[number];

function texto(value: unknown): string {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function tipoValido(
  value: unknown
): value is TipoImagem {
  return (
    typeof value === "string" &&
    TIPOS.includes(value as TipoImagem)
  );
}

export async function POST(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const requestId = createRequestId();

  try {
    const auth = await requireAdminRole([
      "ADMIN",
      "EDITOR",
    ]);

    if (!auth.ok) {
      return auth.response;
    }

    const { id } = await context.params;

    const destino =
      await prisma.destino.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          nome: true,
        },
      });

    if (!destino) {
      return NextResponse.json(
        {
          success: false,
          message: "Destino não encontrado.",
          requestId,
        },
        { status: 404 }
      );
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
      return NextResponse.json(
        {
          success: false,
          message: "JSON inválido.",
          requestId,
        },
        { status: 400 }
      );
    }

    const url = texto(body.url);
    const alt = texto(body.alt);

    const tipo: TipoImagem =
      tipoValido(body.tipo)
        ? body.tipo
        : "GALERIA";

    const ordemNumero = Number(body.ordem);

    if (!url || !alt) {
      return NextResponse.json(
        {
          success: false,
          message:
            "URL e texto alternativo são obrigatórios.",
          requestId,
        },
        { status: 400 }
      );
    }

    let parsedUrl: URL;

    try {
      parsedUrl = new URL(url);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "URL da imagem inválida.",
          requestId,
        },
        { status: 400 }
      );
    }

    if (parsedUrl.protocol !== "https:") {
      return NextResponse.json(
        {
          success: false,
          message:
            "A imagem precisa utilizar HTTPS.",
          requestId,
        },
        { status: 400 }
      );
    }

    const ordem =
      Number.isInteger(ordemNumero) &&
      ordemNumero >= 0
        ? ordemNumero
        : 0;

    const imagem =
      await prisma.$transaction(
        async (tx) => {
          /*
           * Um destino deve possuir no máximo
           * uma imagem marcada como CAPA.
           */
          if (tipo === "CAPA") {
            await tx.destinoImagem.updateMany({
              where: {
                destinoId: destino.id,
                tipo: "CAPA",
              },
              data: {
                tipo: "GALERIA",
              },
            });
          }

          return tx.destinoImagem.create({
            data: {
              destinoId: destino.id,
              url,
              alt,
              tipo,
              ordem,
            },
          });
        }
      );

    await registrarAuditoria({
      empresaId: auth.admin.empresaId,
      usuarioId: auth.admin.id,
      acao: "CREATE",
      entidade: "DestinoImagem",
      entidadeId: imagem.id,
      dadosDepois: {
        id: imagem.id,
        destinoId: imagem.destinoId,
        url: imagem.url,
        alt: imagem.alt,
        tipo: imagem.tipo,
        ordem: imagem.ordem,
      },
      metadata: {
        origem: "admin.cms.destino.imagens",
        destinoNome: destino.nome,
      },
      requestId,
      userAgent:
        request.headers.get("user-agent"),
    });

    logger.info(
      "admin.destino.imagem.created",
      {
        requestId,
        userId: auth.admin.id,
        empresaId: auth.admin.empresaId,
        destinoId: destino.id,
        imagemId: imagem.id,
        tipo: imagem.tipo,
      }
    );

    return NextResponse.json(
      {
        success: true,
        requestId,
        imagem,
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
      "admin.destino.imagem.create_failed",
      error,
      {
        requestId,
      }
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Não foi possível cadastrar a imagem.",
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
