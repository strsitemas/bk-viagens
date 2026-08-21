import Link from "next/link";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { obterSessao } from "@/lib/auth-admin";

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
  NOVO:
    "bg-[#e1f6f3] text-[#076965]",
  EM_CONTATO:
    "bg-blue-100 text-blue-800",
  PROPOSTA:
    "bg-amber-100 text-amber-800",
  NEGOCIACAO:
    "bg-violet-100 text-violet-800",
  FECHADO:
    "bg-emerald-100 text-emerald-800",
  PERDIDO:
    "bg-stone-200 text-stone-700",
};

export default async function AdminLeadsPage() {
  const session = await obterSessao();

  if (!session) {
    redirect("/admin/login");
  }

  const leads = await prisma.lead.findMany({
    where: {
      empresaId: session.empresaId,
    },

    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,
      nome: true,
      whatsapp: true,
      email: true,
      destinoDesejado: true,
      periodoDesejado: true,
      quantidadeAdultos: true,
      quantidadeCriancas: true,
      status: true,
      createdAt: true,
    },
  });

  return (
    <main className="mx-auto max-w-[1500px] px-6 py-10 lg:px-10 lg:py-12">

      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#078b87]">
            CRM Buckart
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#173f3e]">
            Viajantes
          </h1>

          <p className="mt-3 text-base leading-7 text-[#60716f]">
            Solicitações recebidas pelo site e
            andamento dos atendimentos.
          </p>
        </div>

        <div className="rounded-full bg-[#e4f3f1] px-5 py-3 text-sm font-semibold text-[#315654]">
          {leads.length}{" "}
          {leads.length === 1
            ? "lead"
            : "leads"}
        </div>

      </div>


      <section className="mt-10 overflow-hidden rounded-3xl border border-[#deebe9] bg-white shadow-[0_12px_35px_rgba(15,70,68,0.05)]">

        {leads.length === 0 ? (
          <div className="px-8 py-16 text-center">

            <p className="text-lg font-semibold text-[#304846]">
              Nenhum viajante por aqui ainda.
            </p>

            <p className="mt-2 text-base text-[#71817f]">
              Novas solicitações aparecerão
              automaticamente nesta tela.
            </p>

          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full min-w-[1000px]">

              <thead>
                <tr className="border-b border-[#e9f0ef] bg-[#f9fbfa]">

                  <th className="px-7 py-5 text-left text-sm font-semibold text-[#536967]">
                    Viajante
                  </th>

                  <th className="px-6 py-5 text-left text-sm font-semibold text-[#536967]">
                    Destino
                  </th>

                  <th className="px-6 py-5 text-left text-sm font-semibold text-[#536967]">
                    Pessoas
                  </th>

                  <th className="px-6 py-5 text-left text-sm font-semibold text-[#536967]">
                    Status
                  </th>

                  <th className="px-6 py-5 text-left text-sm font-semibold text-[#536967]">
                    Recebido
                  </th>

                  <th className="px-7 py-5 text-right text-sm font-semibold text-[#536967]">
                    Atendimento
                  </th>

                </tr>
              </thead>

              <tbody>

                {leads.map((lead) => {
                  const totalPessoas =
                    lead.quantidadeAdultos +
                    lead.quantidadeCriancas;

                  return (
                    <tr
                      key={lead.id}
                      className="border-b border-[#edf2f1] last:border-0 hover:bg-[#fbfdfc]"
                    >

                      <td className="px-7 py-5">

                        <p className="text-base font-semibold text-[#243e3c]">
                          {lead.nome}
                        </p>

                        <p className="mt-1 text-sm text-[#71817f]">
                          {lead.whatsapp ||
                            lead.email ||
                            "Sem contato informado"}
                        </p>

                      </td>

                      <td className="px-6 py-5 text-base text-[#405856]">
                        {lead.destinoDesejado ||
                          "Em aberto"}
                      </td>

                      <td className="px-6 py-5 text-base text-[#405856]">
                        {totalPessoas}
                      </td>

                      <td className="px-6 py-5">

                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-sm font-semibold ${
                            statusStyles[
                              lead.status
                            ] ||
                            "bg-stone-100 text-stone-700"
                          }`}
                        >
                          {statusLabels[
                            lead.status
                          ] || lead.status}
                        </span>

                      </td>

                      <td className="px-6 py-5 text-sm text-[#60716f]">
                        {new Intl.DateTimeFormat(
                          "pt-BR",
                          {
                            dateStyle: "short",
                            timeStyle: "short",
                            timeZone:
                              "America/Sao_Paulo",
                          }
                        ).format(
                          lead.createdAt
                        )}
                      </td>

                      <td className="px-7 py-5 text-right">

                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#064f4e] px-5 text-sm font-semibold text-white transition hover:bg-[#08706d]"
                        >
                          Abrir
                        </Link>

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
