import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

import { requireAdminRole } from "@/lib/admin-authorization";
import { createRequestId, logger } from "@/lib/logger";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const TIPOS_PERMITIDOS = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

function nomeSeguro(nome: string): string {
  const ultimoPonto = nome.lastIndexOf(".");

  const extensao =
    ultimoPonto >= 0
      ? nome.slice(ultimoPonto).toLowerCase()
      : "";

  const base =
    ultimoPonto >= 0
      ? nome.slice(0, ultimoPonto)
      : nome;

  const baseSegura = base
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return `${baseSegura || "imagem"}${extensao}`;
}

export async function POST(request: Request) {
  const requestId = createRequestId();

  try {
    const auth = await requireAdminRole([
      "ADMIN",
      "EDITOR",
    ]);

    if (!auth.ok) {
      logger.warn("admin.upload.unauthorized", {
        requestId,
      });

      return auth.response;
    }

    const formData = await request.formData();
    const arquivo = formData.get("file");

    if (!(arquivo instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "Nenhuma imagem foi enviada.",
          requestId,
        },
        { status: 400 }
      );
    }

    if (!TIPOS_PERMITIDOS.has(arquivo.type)) {
      logger.warn("admin.upload.invalid_type", {
        requestId,
        userId: auth.admin.id,
        empresaId: auth.admin.empresaId,
        mimeType: arquivo.type,
      });

      return NextResponse.json(
        {
          success: false,
          message:
            "Formato não permitido. Use JPG, PNG, WebP ou AVIF.",
          requestId,
        },
        { status: 415 }
      );
    }

    if (arquivo.size <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "O arquivo está vazio.",
          requestId,
        },
        { status: 400 }
      );
    }

    if (arquivo.size > MAX_FILE_SIZE) {
      logger.warn("admin.upload.file_too_large", {
        requestId,
        userId: auth.admin.id,
        empresaId: auth.admin.empresaId,
        size: arquivo.size,
      });

      return NextResponse.json(
        {
          success: false,
          message:
            "A imagem excede o limite de 5 MB.",
          requestId,
        },
        { status: 413 }
      );
    }

    const filename = nomeSeguro(arquivo.name);

    const pathname =
      `buckart/destinos/${crypto.randomUUID()}-${filename}`;

    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

    if (!blobToken) {
      logger.error(
        "admin.upload.missing_blob_token",
        new Error("BLOB_READ_WRITE_TOKEN não configurado."),
        {
          requestId,
          userId: auth.admin.id,
          empresaId: auth.admin.empresaId,
        }
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Serviço de armazenamento não configurado.",
          requestId,
        },
        { status: 500 }
      );
    }

    const blob = await put(pathname, arquivo, {
      access: "public",
      addRandomSuffix: false,
      token: blobToken,
    });

    logger.info("admin.upload.completed", {
      requestId,
      userId: auth.admin.id,
      empresaId: auth.admin.empresaId,
      pathname: blob.pathname,
      size: arquivo.size,
      mimeType: arquivo.type,
    });

    return NextResponse.json(
      {
        success: true,
        requestId,
        file: {
          url: blob.url,
          pathname: blob.pathname,
          contentType: arquivo.type,
          size: arquivo.size,
        },
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
      "admin.upload.failed",
      error,
      {
        requestId,
      }
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Não foi possível enviar a imagem.",
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