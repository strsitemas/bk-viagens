import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { obterSessao } from "@/lib/auth-admin";
import { UsuarioCreateForm } from "@/components/admin/usuario-create-form";

export const dynamic = "force-dynamic";

const papelLabels: Record<string, string> = {
  ADMIN: "Administrador",
  EDITOR: "Editor",
  AGENTE: "Agente",
};

export default async function AdminUsuariosPage() {
  const session = await obterSessao();

  if (!session) {
    redirect("/admin/login");
  }

  const admin = await prisma.usuarioAdmin.findFirst({
    where: {
      id: session.userId,
      empresaId: session.empresaId,
      ativo: true,
      empresa: {
        slug: "buckart-viagens",
        ativo: true,
      },
    },
    select: {
      id: true,
      empresaId: true,
      papel: true,
    },
  });

  if (!admin) {
    redirect("/admin/login");
  }

  if (admin.papel !== "ADMIN") {
    redirect("/admin");
  }

  const usuarios = await prisma.usuarioAdmin.findMany({
    where: {
      empresaId: admin.empresaId,
    },
    select: {
      id: true,
      nome: true,
      email: true,
      papel: true,
      ativo: true,
      createdAt: true,
    },
    orderBy: [
      {
        ativo: "desc",
      },
      {
        nome: "asc",
      },
    ],
  });

  return (
    <main className="mx-auto max-w-[1500px] px-6 py-10 lg:px-10 lg:py-12">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#078b87]">
            Administração Buckart
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#173f3e]">
            Usuários
          </h1>

          <p className="mt-3 max-w-2xl text-base text-[#60716f]">
            Gerencie as pessoas que possuem acesso ao painel administrativo.
          </p>
        </div>

        <div className="rounded-full bg-[#e3f7f4] px-5 py-3 text-sm font-semibold text-[#076965]">
          {usuarios.length} usuário{usuarios.length === 1 ? "" : "s"}
        </div>
      </div>

      <UsuarioCreateForm />

      <section className="mt-10 overflow-hidden rounded-3xl border border-[#deebe9] bg-white shadow-[0_12px_35px_rgba(15,70,68,0.05)]">
        <div className="border-b border-[#edf2f1] px-6 py-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[#173f3e]">
            Acessos administrativos
          </h2>

          <p className="mt-1 text-sm text-[#71817f]">
            Usuários cadastrados para esta empresa.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-[#edf2f1] text-left">
                <th className="px-6 py-4 text-sm font-semibold text-[#647674] lg:px-8">
                  Usuário
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-[#647674]">
                  Perfil
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-[#647674]">
                  Status
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-[#647674]">
                  Criado em
                </th>
              </tr>
            </thead>

            <tbody>
              {usuarios.map((usuario) => (
                <tr
                  key={usuario.id}
                  className="border-b border-[#f0f4f3] last:border-0"
                >
                  <td className="px-6 py-5 lg:px-8">
                    <p className="text-base font-semibold text-[#263f3d]">
                      {usuario.nome}
                    </p>

                    <p className="mt-1 text-sm text-[#788784]">
                      {usuario.email}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <span className="inline-flex rounded-full bg-[#edf7f5] px-3 py-1.5 text-sm font-semibold text-[#315654]">
                      {papelLabels[usuario.papel] ?? usuario.papel}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-full px-3 py-1.5 text-sm font-semibold ${
                        usuario.ativo
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-stone-100 text-stone-600"
                      }`}
                    >
                      {usuario.ativo ? "Ativo" : "Inativo"}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-sm text-[#647674]">
                    {new Intl.DateTimeFormat("pt-BR", {
                      dateStyle: "short",
                      timeStyle: "short",
                      timeZone: "America/Sao_Paulo",
                    }).format(usuario.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}