import "server-only";

import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

type JsonValue =
  | string
  | number
  | boolean
  | JsonValue[]
  | { [key: string]: JsonValue };

type AuditInput = {
  empresaId: string;
  usuarioId?: string | null;
  acao: string;
  entidade: string;
  entidadeId?: string | null;
  dadosAntes?: Record<string, unknown> | null;
  dadosDepois?: Record<string, unknown> | null;
  metadata?: Record<string, unknown> | null;
  requestId?: string | null;
  ip?: string | null;
  userAgent?: string | null;
};

const SENSITIVE_KEYS = [
  "password",
  "senha",
  "senhahash",
  "token",
  "authorization",
  "cookie",
  "auth_secret",
  "database_url",
];

function sanitizeAudit(value: unknown): JsonValue {
  if (value === null || value === undefined) {
    return "[NULL]";
  }

  if (
    typeof value === "string" ||
    typeof value === "boolean"
  ) {
    return value;
  }

  if (typeof value === "number") {
    return Number.isFinite(value)
      ? value
      : String(value);
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeAudit);
  }

  if (typeof value === "object") {
    const result: Record<string, JsonValue> = {};

    for (const [key, item] of Object.entries(
      value as Record<string, unknown>
    )) {
      const normalizedKey = key.toLowerCase();

      if (
        SENSITIVE_KEYS.some((sensitive) =>
          normalizedKey.includes(sensitive)
        )
      ) {
        result[key] = "[REDACTED]";
        continue;
      }

      result[key] = sanitizeAudit(item);
    }

    return result;
  }

  return String(value);
}

export async function registrarAuditoria(
  input: AuditInput
): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        empresaId: input.empresaId,
        usuarioId: input.usuarioId ?? null,
        acao: input.acao,
        entidade: input.entidade,
        entidadeId: input.entidadeId ?? null,

        dadosAntes: input.dadosAntes
          ? sanitizeAudit(input.dadosAntes)
          : undefined,

        dadosDepois: input.dadosDepois
          ? sanitizeAudit(input.dadosDepois)
          : undefined,

        metadata: input.metadata
          ? sanitizeAudit(input.metadata)
          : undefined,

        requestId: input.requestId ?? null,
        ip: input.ip ?? null,
        userAgent: input.userAgent ?? null,
      },
    });
  } catch (error) {
    logger.error(
      "audit.persist_failed",
      error,
      {
        requestId: input.requestId,
        empresaId: input.empresaId,
        usuarioId: input.usuarioId,
        acao: input.acao,
        entidade: input.entidade,
        entidadeId: input.entidadeId,
      }
    );
  }
}