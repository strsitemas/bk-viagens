import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { registrarAuditoria } from "@/lib/audit";
import { requireAdminApi } from "@/lib/admin-authorization";
import {
  createRequestId,
  logger,
} from "@/lib/logger";

const STATUS_PERMITIDOS = [
  "NOVO",
  "EM_CONTATO",
  "PROPOSTA",
  "NEGOCIACAO",
  "FECHADO",
  "PERDIDO",
] as const;

type StatusLeadPermitido =
  (typeof STATUS_PERMITIDOS)[number];

function statusValido(
  value: unknown
): value is StatusLeadPermitido {
  return (
    typeof value === "string" &&
    STATUS_PERMITIDOS.includes(
      value as StatusLeadPermitido
    )
  );
}

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const requestId = createRequestId();

  try {
    const auth = await requireAdminApi();

    if (!auth.ok) {
      logger.warn(
        "admin.lead.update_unauthorized",
        {
          requestId,
        }
      );

      return auth.response;
    }

    const { id } = await context.params;

    if (!id) {
      logger.warn(
        "admin.lead.invalid_id",
        {
          requestId,
          userId: auth.admin.id,
          empresaId:
            auth.admin.empresaId,
        }
      );

      return NextResponse.json(
        {
          success: false,
          message: "Lead inválido.",
          requestId,
        },
        { status: 400 }
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    }
    catch (error) {
      logger.warn(
        "admin.lead.invalid_json",
        {
          requestId,
          userId: auth.admin.id,
          empresaId:
            auth.admin.empresaId,
        }
      );

      return NextResponse.json(
        {
          success: false,
          message: "JSON inválido.",
          requestId,
        },
        { status: 400 }
      );
    }

    if (
      typeof body !== "object" ||
      body === null ||
      !("status" in body) ||
      !statusValido(body.status)
    ) {
      logger.warn(
        "admin.lead.invalid_status",
        {
          requestId,
          userId: auth.admin.id,
          empresaId:
            auth.admin.empresaId,
          leadId: id,
        }
      );

      return NextResponse.json(
        {
          success: false,
          message: "Status inválido.",
          requestId,
        },
        { status: 400 }
      );
    }

    const leadExistente =
      await prisma.lead.findFirst({
        where: {
          id,
          empresaId:
            auth.admin.empresaId,
        },

        select: {
          id: true,
          status: true,
        },
      });

    if (!leadExistente) {
      logger.warn(
        "admin.lead.not_found",
        {
          requestId,
          userId: auth.admin.id,
          empresaId:
            auth.admin.empresaId,
          leadId: id,
        }
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Lead não encontrado.",
          requestId,
        },
        { status: 404 }
      );
    }

    const statusAnterior =
      leadExistente.status;

    const lead =
      await prisma.lead.update({
        where: {
          id: leadExistente.id,
        },

        data: {
          status: body.status,
        },

        select: {
          id: true,
          status: true,
          updatedAt: true,
        },
      });

    await registrarAuditoria({
      empresaId: auth.admin.empresaId,
      usuarioId: auth.admin.id,
      acao: "UPDATE",
      entidade: "Lead",
      entidadeId: lead.id,
      dadosAntes: {
        status: statusAnterior,
      },
      dadosDepois: {
        status: lead.status,
      },
      metadata: {
        origem: "admin.lead.status",
      },
      requestId,
      userAgent:
        request.headers.get("user-agent"),
    });

    logger.info(
      "admin.lead.status_changed",
      {
        requestId,
        userId: auth.admin.id,
        empresaId:
          auth.admin.empresaId,
        leadId: lead.id,
        statusAnterior,
        statusNovo: lead.status,
      }
    );

    return NextResponse.json(
      {
        success: true,
        requestId,
        lead,
      },
      {
        headers: {
          "Cache-Control": "no-store",
          "X-Request-Id": requestId,
        },
      }
    );
  }
  catch (error) {
    logger.error(
      "admin.lead.update_failed",
      error,
      {
        requestId,
      }
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Não foi possível atualizar o lead.",
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
