import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validations/lead";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    const validation = leadSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Verifique os dados informados.",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    const empresa = await prisma.empresa.findFirst({
      select: {
        id: true,
      },
    });

    if (!empresa) {
      console.error("[BUCKART_EMPRESA_NOT_FOUND]");

      return NextResponse.json(
        {
          success: false,
          message: "A agÃªncia ainda nÃ£o estÃ¡ configurada para receber solicitaÃ§Ãµes.",
        },
        { status: 503 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        empresaId: empresa.id,
        nome: data.nome,
        whatsapp: data.whatsapp,
        email: data.email || null,

        destinoDesejado:
          data.aceitaSugestoes
            ? "Aceita sugestoes da Buckart"
            : data.destino || null,

        periodoDesejado: data.dataPretendida || null,
        duracaoDesejada: data.duracao || null,

        quantidadeAdultos: data.adultos,
        quantidadeCriancas: data.criancas,

        nivelConforto: data.faixaInvestimento || null,
        observacoes: data.observacoes || null,

        origemLead: data.origem,

        consentimentoLgpd: true,
        consentimentoEm: new Date(),
      },

      select: {
        id: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Recebemos sua solicitaÃ§Ã£o. A Buckart poderÃ¡ continuar o atendimento com você.",
        lead,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[BUCKART_LEAD_CREATE_ERROR]", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "NÃ£o foi possÃ­vel enviar sua solicitaÃ§Ã£o agora. Tente novamente.",
      },
      { status: 500 }
    );
  }
}
