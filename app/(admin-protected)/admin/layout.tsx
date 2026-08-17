import Link from "next/link";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { obterSessao } from "@/lib/auth-admin";
import { LogoutButton } from "@/components/admin/logout-button";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await obterSessao();

  if (!session) {
    redirect("/admin/login");
  }

  const usuario =
    await prisma.usuarioAdmin.findFirst({
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
        nome: true,
        papel: true,
        empresaId: true,
      },
    });

  if (!usuario) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#f4f7f6] text-[#173f3e]">

      <header className="border-b border-[#d9e7e5] bg-white">
        <div className="mx-auto flex min-h-20 max-w-[1500px] items-center justify-between gap-6 px-6 lg:px-10">

          <div className="flex items-center gap-8">

            <Link
              href="/admin"
              className="flex items-center gap-3"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#064f4e] text-lg font-bold text-white">
                B
              </span>

              <span>
                <span className="block text-base font-bold tracking-[0.16em] text-[#063f3f]">
                  BUCKART
                </span>

                <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#078b87]">
                  Administração
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              <Link
                href="/admin"
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#315654] transition hover:bg-[#edf7f5]"
              >
                Dashboard
              </Link>

              <Link
                href="/admin/leads"
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#315654] transition hover:bg-[#edf7f5]"
              >
                Leads
              </Link>
              <Link
                href="/admin/conteudo"
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#315654] transition hover:bg-[#edf7f5]"
              >
                Conteúdo
              </Link>
            </nav>

          </div>

          <div className="flex items-center gap-4">

            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-[#304846]">
                {usuario.nome}
              </p>

              <p className="text-xs font-medium text-[#788784]">
                {usuario.papel}
              </p>
            </div>

            <LogoutButton />

          </div>

        </div>
      </header>

      {children}

    </div>
  );
}