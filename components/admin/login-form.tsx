"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            senha,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setError(
          result.message ||
            "NÃ£o foi possÃ­vel entrar."
        );
        return;
      }

      router.replace("/admin");
      router.refresh();
    }
    catch {
      setError(
        "NÃ£o foi possÃ­vel conectar ao servidor."
      );
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-9 space-y-5"
    >
      <label className="block">
        <span className="text-base font-semibold text-[#304846]">
          E-mail
        </span>

        <input
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          className="mt-2 min-h-14 w-full rounded-2xl border border-[#cfdfdd] bg-[#f8fbfa] px-5 text-base text-[#203735] outline-none transition focus:border-[#078b87] focus:bg-white"
          placeholder="seu@email.com"
        />
      </label>

      <label className="block">
        <span className="text-base font-semibold text-[#304846]">
          Senha
        </span>

        <input
          type="password"
          autoComplete="current-password"
          required
          value={senha}
          onChange={(event) =>
            setSenha(event.target.value)
          }
          className="mt-2 min-h-14 w-full rounded-2xl border border-[#cfdfdd] bg-[#f8fbfa] px-5 text-base text-[#203735] outline-none transition focus:border-[#078b87] focus:bg-white"
          placeholder="Sua senha"
        />
      </label>

      {error && (
        <div
          role="alert"
          className="rounded-2xl bg-red-50 px-5 py-4 text-sm font-medium leading-6 text-red-700"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex min-h-14 w-full items-center justify-center rounded-full bg-[#064f4e] px-7 text-base font-semibold text-white transition hover:bg-[#08706d] disabled:cursor-wait disabled:opacity-60"
      >
        {loading
          ? "Entrando..."
          : "Entrar no painel"}
      </button>
    </form>
  );
}
