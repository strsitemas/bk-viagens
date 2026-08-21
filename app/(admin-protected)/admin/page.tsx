import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const statusLabels: Record<string, string> = {
  NOVO: "Novo",
  EM_CONTATO: "Em contato",
  PROPOSTA: "Proposta",
  NEGOCIACAO: "Negociação",
  FECHADO: "Fechado",
  PERDIDO: "Perdido",
};

const statusStyles: Record<string, string> = {
  NOVO: "bg-[#e3f7f4] text-[#076965]",
  EM_CONTATO: "bg-blue-50 text-blue-700",
  PROPOSTA: "bg-amber-50 text-amber-700",
  NEGOCIACAO: "bg-violet-50 text-violet-700",
  FECHADO: "bg-emerald-50 text-emerald-700",
  PERDIDO: "bg-stone-100 text-stone-600",
};

export default async function AdminDashboardPage() {
  const empresa = await prisma.empresa.findUnique({
    where: {
      slug: "buckart-viagens",
    },
    select: {
      id: true,
      nome: true,
    },
  });

  if (!empresa) {
    return (
      <main className="mx-auto max-w-[1500px] px-6 py-12 lg:px-10">
        <div className="rounded-3xl border border-red-100 bg-red-50 p-8 text-red-700">
          Empresa Buckart não encontrada.
        </div>
      </main>
    );
  }

  const [
    total,
    novos,
    emContato,
    propostas,
    negociacoes,
    fechados,
    ultimosLeads,
  ] = await Promise.all([
    prisma.lead.count({
      where: { empresaId: empresa.id },
    }),

    prisma.lead.count({
      where: {
        empresaId: empresa.id,
        status: "NOVO",
      },
    }),

    prisma.lead.count({
      where: {
        empresaId: empresa.id,
        status: "EM_CONTATO",
      },
    }),

    prisma.lead.count({
      where: {
        empresaId: empresa.id,
        status: "PROPOSTA",
      },
    }),

    prisma.lead.count({
      where: {
        empresaId: empresa.id,
        status: "NEGOCIACAO",
      },
    }),

    prisma.lead.count({
      where: {
        empresaId: empresa.id,
        status: "FECHADO",
      },
    }),

    prisma.lead.findMany({
      where: {
        empresaId: empresa.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 8,
      select: {
        id: true,
        nome: true,
        whatsapp: true,
        destinoDesejado: true,
        quantidadeAdultos: true,
        quantidadeCriancas: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  const metrics = [
    {
      label: "Total de leads",
      value: total,
      detail: "Todos os contatos",
    },
    {
      label: "Novos",
      value: novos,
      detail: "Aguardando atendimento",
    },
    {
      label: "Em contato",
      value: emContato,
      detail: "Atendimento iniciado",
    },
    {
      label: "Propostas",
      value: propostas,
      detail: "Propostas enviadas",
    },
    {
      label: "Negociação",
      value: negociacoes,
      detail: "Em decisão",
    },
    {
      label: "Fechados",
      value: fechados,
      detail: "Viagens convertidas",
    },
  ];

  return (
    <main className="mx-auto max-w-[1500px] px-6 py-10 lg:px-10 lg:py-12">

      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#078b87]">
            Painel Buckart
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#173f3e]">
            Visão geral
          </h1>

          <p className="mt-3 text-base text-[#60716f]">
            Acompanhe os contatos que chegam pelo site e o andamento dos atendimentos.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#b9d4d1] bg-white px-6 text-sm font-semibold text-[#315654] transition hover:border-[#078b87]"
        >
          Ver site
          <span className="ml-2">↗</span>
        </Link>

      </div>


      <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-3xl border border-[#deebe9] bg-white p-6 shadow-[0_12px_35px_rgba(15,70,68,0.05)]"
          >
            <p className="text-base font-semibold text-[#5c706e]">
              {metric.label}
            </p>

            <p className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-[#064f4e]">
              {metric.value}
            </p>

            <p className="mt-2 text-sm text-[#788784]">
              {metric.detail}
            </p>
          </div>
        ))}

      </section>


      <section className="mt-10 overflow-hidden rounded-3xl border border-[#deebe9] bg-white shadow-[0_12px_35px_rgba(15,70,68,0.05)]">

        <div className="flex items-center justify-between border-b border-[#edf2f1] px-6 py-6 lg:px-8">

          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[#173f3e]">
              Leads recentes
            </h2>

            <p className="mt-1 text-sm text-[#71817f]">
              Últimas solicitações recebidas pelo site.
            </p>
          </div>

          <Link
            href="/admin/leads"
            className="text-sm font-semibold text-[#078b87] hover:text-[#064f4e]"
          >
            Ver todos →
          </Link>

        </div>


        {ultimosLeads.length === 0 ? (
          <div className="px-8 py-16 text-center">
            <p className="text-lg font-semibold text-[#425654]">
              Nenhum lead recebido ainda.
            </p>

            <p className="mt-2 text-sm text-[#788784]">
              As solicitações enviadas pelo site aparecerão aqui.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px]">

              <thead>
                <tr className="border-b border-[#edf2f1] text-left">
                  <th className="px-6 py-4 text-sm font-semibold text-[#647674] lg:px-8">
                    Cliente
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-[#647674]">
                    Destino
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-[#647674]">
                    Viajantes
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-[#647674]">
                    Status
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-[#647674]">
                    Recebido
                  </th>
                </tr>
              </thead>

              <tbody>
                {ultimosLeads.map((lead) => {
                  const viajantes =
                    lead.quantidadeAdultos +
                    lead.quantidadeCriancas;

                  return (
                    <tr
                      key={lead.id}
                      className="border-b border-[#f0f4f3] last:border-0"
                    >
                      <td className="px-6 py-5 lg:px-8">
                        <p className="text-base font-semibold text-[#263f3d]">
                          {lead.nome}
                        </p>

                        <p className="mt-1 text-sm text-[#788784]">
                          {lead.whatsapp || "Sem WhatsApp"}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-base text-[#435957]">
                        {lead.destinoDesejado ||
                          "Destino em aberto"}
                      </td>

                      <td className="px-6 py-5 text-base text-[#435957]">
                        {viajantes}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-sm font-semibold ${
                            statusStyles[lead.status] ||
                            "bg-stone-100 text-stone-600"
                          }`}
                        >
                          {statusLabels[lead.status] ||
                            lead.status}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-sm text-[#647674]">
                        {new Intl.DateTimeFormat("pt-BR", {
                          dateStyle: "short",
                          timeStyle: "short",
                          timeZone: "America/Sao_Paulo",
                        }).format(lead.createdAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>

          </div>
        )}

      </section>

    </main>
  );
}
