import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/login-form";
import { obterSessao } from "@/lib/auth-admin";

export default async function AdminLoginPage() {
  const session = await obterSessao();

  if (session) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#edf7f5] px-6 py-12">

      <div className="w-full max-w-md">

        <div className="mb-7 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-[#064f4e] text-2xl font-bold text-white shadow-lg">
            B
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.28em] text-[#078b87]">
            Buckart Viagens
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#173f3e]">
            Área administrativa
          </h1>

          <p className="mt-3 text-base leading-7 text-[#60716f]">
            Acesse o painel para acompanhar
            viajantes e administrar o site.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[#d8e7e5] bg-white p-7 shadow-[0_20px_60px_rgba(10,70,68,0.10)] sm:p-9">
          <AdminLoginForm />
        </div>

      </div>

    </main>
  );
}