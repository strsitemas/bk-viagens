"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type PapelUsuario =
  | "ADMIN"
  | "EDITOR"
  | "AGENTE";

type ApiResponse = {
  success?: boolean;
  message?: string;
};

export function UsuarioCreateForm() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [papel, setPapel] =
    useState<PapelUsuario>("AGENTE");

  const [enviando, setEnviando] =
    useState(false);

  const [erro, setErro] =
    useState<string | null>(null);

  const [sucesso, setSucesso] =
    useState<string | null>(null);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (enviando) {
      return;
    }

    setErro(null);
    setSucesso(null);
    setEnviando(true);

    try {
      const response = await fetch(
        "/api/admin/usuarios",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            nome,
            email,
            senha,
            papel,
          }),
        }
      );

      const data =
        (await response.json()) as ApiResponse;

      if (!response.ok || !data.success) {
        setErro(
          data.message ||
            "Não foi possível criar o usuário."
        );

        return;
      }

      setNome("");
      setEmail("");
      setSenha("");
      setPapel("AGENTE");

      setSucesso(
        "Usuário criado com sucesso."
      );

      router.refresh();
    } catch {
      setErro(
        "Não foi possível comunicar com o servidor."
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="mt-10 rounded-3xl border border-[#deebe9] bg-white p-6 shadow-[0_12px_35px_rgba(15,70,68,0.05)] lg:p-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#078b87]">
          Novo acesso
        </p>

        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-[#173f3e]">
          Criar usuário
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#71817f]">
          Cadastre uma pessoa que poderá acessar o
          painel administrativo da Buckart.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-7"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <label
              htmlFor="usuario-nome"
              className="mb-2 block text-sm font-semibold text-[#315654]"
            >
              Nome
            </label>

            <input
              id="usuario-nome"
              type="text"
              value={nome}
              onChange={(event) =>
                setNome(event.target.value)
              }
              required
              minLength={3}
              autoComplete="name"
              placeholder="Nome do usuário"
              className="min-h-13 w-full rounded-2xl border border-[#cfdfdc] bg-white px-4 text-base text-[#263f3d] outline-none transition placeholder:text-[#9aaba8] focus:border-[#078b87] focus:ring-2 focus:ring-[#078b87]/10"
            />
          </div>

          <div>
            <label
              htmlFor="usuario-email"
              className="mb-2 block text-sm font-semibold text-[#315654]"
            >
              E-mail
            </label>

            <input
              id="usuario-email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
              autoComplete="email"
              placeholder="usuario@exemplo.com"
              className="min-h-13 w-full rounded-2xl border border-[#cfdfdc] bg-white px-4 text-base text-[#263f3d] outline-none transition placeholder:text-[#9aaba8] focus:border-[#078b87] focus:ring-2 focus:ring-[#078b87]/10"
            />
          </div>

          <div>
            <label
              htmlFor="usuario-senha"
              className="mb-2 block text-sm font-semibold text-[#315654]"
            >
              Senha inicial
            </label>

            <input
              id="usuario-senha"
              type="password"
              value={senha}
              onChange={(event) =>
                setSenha(event.target.value)
              }
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Mínimo de 8 caracteres"
              className="min-h-13 w-full rounded-2xl border border-[#cfdfdc] bg-white px-4 text-base text-[#263f3d] outline-none transition placeholder:text-[#9aaba8] focus:border-[#078b87] focus:ring-2 focus:ring-[#078b87]/10"
            />

            <p className="mt-2 text-xs text-[#82918f]">
              Utilize pelo menos 8 caracteres.
            </p>
          </div>

          <div>
            <label
              htmlFor="usuario-papel"
              className="mb-2 block text-sm font-semibold text-[#315654]"
            >
              Perfil
            </label>

            <select
              id="usuario-papel"
              value={papel}
              onChange={(event) =>
                setPapel(
                  event.target.value as PapelUsuario
                )
              }
              className="min-h-13 w-full rounded-2xl border border-[#cfdfdc] bg-white px-4 text-base text-[#263f3d] outline-none transition focus:border-[#078b87] focus:ring-2 focus:ring-[#078b87]/10"
            >
              <option value="AGENTE">
                Agente
              </option>

              <option value="EDITOR">
                Editor
              </option>

              <option value="ADMIN">
                Administrador
              </option>
            </select>
          </div>
        </div>

        {erro && (
          <div
            role="alert"
            className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {erro}
          </div>
        )}

        {sucesso && (
          <div
            role="status"
            className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
          >
            {sucesso}
          </div>
        )}

        <div className="mt-7 flex justify-end">
          <button
            type="submit"
            disabled={enviando}
            className="inline-flex min-h-13 items-center justify-center rounded-full bg-[#064f4e] px-7 text-sm font-semibold text-white transition hover:bg-[#08706d] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {enviando
              ? "Criando..."
              : "Criar usuário"}
          </button>
        </div>
      </form>
    </section>
  );
}