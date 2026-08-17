import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { obterSessao } from "@/lib/auth-admin";
import { LeadStatusControl } from "@/components/admin/lead-status-control";

export const dynamic = "force-dynamic";

function limparWhatsapp(
  value: string | null
) {
  if (!value) {
    return null;
  }

  return value.replace(/\D/g, "");
}

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const session = await obterSessao();

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const lead = await prisma.lead.findFirst({
    where: {
      id,
      empresaId: session.empresaId,
    },

    select: {
      id: true,
      nome: true,
      email: true,
      telefone: true,
      whatsapp: true,

      origemCidade: true,
      origemEstado: true,

      destinoDesejado: true,
      periodoDesejado: true,
      duracaoDesejada: true,

      quantidadeAdultos: true,
      quantidadeCriancas: true,

      nivelConforto: true,
      observacoes: true,
      origemLead: true,

      status: true,

      consentimentoLgpd: true,
      consentimentoEm: true,

      createdAt: true,
      updatedAt: true,
    },
  });

  if (!lead) {
    notFound();
  }

  const whatsapp =
    limparWhatsapp(lead.whatsapp);

  const whatsappHref = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(
        `Olá ${lead.nome}, tudo bem? Aqui é da Buckart Viagens. Recebemos sua solicitação e vamos conversar sobre sua viagem.`
      )}`
    : null;

  const totalPessoas =
    lead.quantidadeAdultos +
    lead.quantidadeCriancas;

  return (
    <main className="mx-auto max-w-[1250px] px-6 py-10 lg:px-10 lg:py-12">

      <Link
        href="/admin/leads"
        className="text-sm font-semibold text-[#087b77] hover:text-[#064f4e]"
      >
        ← Voltar para viajantes
      </Link>


      <div className="mt-7 flex flex-col justify-between gap-6 lg:flex-row lg:items-start">

        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#078b87]">
            Atendimento Buckart
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#173f3e] sm:text-5xl">
            {lead.nome}
          </h1>

          <p className="mt-3 text-base text-[#60716f]">
            Solicitação recebida em{" "}
            {new Intl.DateTimeFormat(
              "pt-BR",
              {
                dateStyle: "long",
                timeStyle: "short",
                timeZone:
                  "America/Sao_Paulo",
              }
            ).format(lead.createdAt)}
          </p>

        </div>


        <div className="w-full rounded-3xl border border-[#dce9e7] bg-white p-5 shadow-[0_10px_30px_rgba(15,70,68,0.05)] lg:w-[300px]">

          <LeadStatusControl
            leadId={lead.id}
            currentStatus={lead.status}
          />

        </div>

      </div>


      <div className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">


        <section className="space-y-6">

          <div className="rounded-3xl border border-[#deebe9] bg-white p-7 lg:p-8">

            <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[#173f3e]">
              A viagem
            </h2>

            <div className="mt-7 grid gap-6 sm:grid-cols-2">

              <Info
                label="Destino"
                value={
                  lead.destinoDesejado ||
                  "Destino em aberto"
                }
              />

              <Info
                label="Período"
                value={
                  lead.periodoDesejado ||
                  "Não informado"
                }
              />

              <Info
                label="Duração"
                value={
                  lead.duracaoDesejada ||
                  "Não informada"
                }
              />

              <Info
                label="Viajantes"
                value={`${totalPessoas} pessoa${
                  totalPessoas === 1
                    ? ""
                    : "s"
                }`}
              />

              <Info
                label="Adultos"
                value={String(
                  lead.quantidadeAdultos
                )}
              />

              <Info
                label="Crianças"
                value={String(
                  lead.quantidadeCriancas
                )}
              />

              <Info
                label="Nível de conforto"
                value={
                  lead.nivelConforto ||
                  "Não informado"
                }
              />

              <Info
                label="Origem"
                value={
                  [
                    lead.origemCidade,
                    lead.origemEstado,
                  ]
                    .filter(Boolean)
                    .join(" - ") ||
                  "Não informada"
                }
              />

            </div>

          </div>


          <div className="rounded-3xl border border-[#deebe9] bg-white p-7 lg:p-8">

            <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[#173f3e]">
              Observações do viajante
            </h2>

            <p className="mt-5 whitespace-pre-wrap text-base leading-8 text-[#435957]">
              {lead.observacoes ||
                "Nenhuma observação informada."}
            </p>

          </div>

        </section>


        <aside className="space-y-6">

          <div className="rounded-3xl border border-[#deebe9] bg-white p-7">

            <h2 className="text-xl font-semibold text-[#173f3e]">
              Contato
            </h2>

            <div className="mt-6 space-y-5">

              <Info
                label="WhatsApp"
                value={
                  lead.whatsapp ||
                  "Não informado"
                }
              />

              <Info
                label="Telefone"
                value={
                  lead.telefone ||
                  "Não informado"
                }
              />

              <Info
                label="E-mail"
                value={
                  lead.email ||
                  "Não informado"
                }
              />

            </div>


            {whatsappHref && (

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 flex min-h-13 w-full items-center justify-center rounded-full bg-[#087b77] px-5 text-base font-semibold text-white transition hover:bg-[#065f5c]"
              >
                Chamar no WhatsApp
              </a>

            )}

          </div>


          <div className="rounded-3xl border border-[#deebe9] bg-white p-7">

            <h2 className="text-xl font-semibold text-[#173f3e]">
              Registro
            </h2>

            <div className="mt-6 space-y-5">

              <Info
                label="Origem do lead"
                value={
                  lead.origemLead ||
                  "Não informada"
                }
              />

              <Info
                label="LGPD"
                value={
                  lead.consentimentoLgpd
                    ? "Consentimento registrado"
                    : "Não registrado"
                }
              />

              <Info
                label="Última atualização"
                value={new Intl.DateTimeFormat(
                  "pt-BR",
                  {
                    dateStyle: "short",
                    timeStyle: "short",
                    timeZone:
                      "America/Sao_Paulo",
                  }
                ).format(
                  lead.updatedAt
                )}
              />

            </div>

          </div>

        </aside>

      </div>

    </main>
  );
}


function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#71817f]">
        {label}
      </p>

      <p className="mt-1.5 text-base font-medium leading-7 text-[#304846]">
        {value}
      </p>
    </div>
  );
}