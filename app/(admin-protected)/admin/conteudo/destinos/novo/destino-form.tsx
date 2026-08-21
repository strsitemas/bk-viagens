"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function DestinoForm() {
  const router = useRouter();

  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  async function salvar(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (salvando) {
      return;
    }

    setSalvando(true);
    setErro("");

    const form = new FormData(event.currentTarget);

    const payload = {
      nome: form.get("nome"),
      slug: form.get("slug"),
      pais: form.get("pais"),
      estadoRegiao: form.get("estadoRegiao"),
      cidade: form.get("cidade"),
      tipo: form.get("tipo"),
      resumo: form.get("resumo"),
      descricao: form.get("descricao"),
      melhorEpoca: form.get("melhorEpoca"),
      duracaoSugerida: form.get("duracaoSugerida"),
      ordem: form.get("ordem"),
      seoTitle: form.get("seoTitle"),
      seoDescription: form.get("seoDescription"),
      publicado: form.get("publicado") === "on",
      destaque: form.get("destaque") === "on",
    };

    try {
      const response = await fetch(
        "/api/admin/destinos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErro(
          data.message ||
            "Não foi possível cadastrar o destino."
        );
        return;
      }

      router.push("/admin/conteudo/destinos");
      router.refresh();
    } catch {
      setErro(
        "Falha de comunicação ao cadastrar o destino."
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10 lg:px-10 lg:py-12">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#078b87]">
          CMS Buckart
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#173f3e] sm:text-5xl">
          Novo destino
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-[#60716f]">
          Cadastre um destino que poderá ser utilizado
          nas experiências e páginas públicas da Buckart.
        </p>
      </div>

      <form
        onSubmit={salvar}
        className="mt-10 space-y-7"
      >
        {erro && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
            {erro}
          </div>
        )}

        <section className="rounded-[2rem] border border-[#dce9e7] bg-white p-7 lg:p-8">
          <h2 className="text-xl font-semibold text-[#173f3e]">
            Identificação
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Campo
              label="Nome do destino"
              name="nome"
              required
              placeholder="Ex.: Paris"
            />

            <Campo
              label="Slug"
              name="slug"
              placeholder="Opcional — gerado pelo nome"
            />

            <Campo
              label="País"
              name="pais"
              required
              placeholder="Ex.: França"
            />

            <Campo
              label="Estado / Região"
              name="estadoRegiao"
              placeholder="Ex.: Île-de-France"
            />

            <Campo
              label="Cidade"
              name="cidade"
              placeholder="Ex.: Paris"
            />

            <label className="block">
              <span className="text-sm font-semibold text-[#49605e]">
                Tipo
              </span>

              <select
                name="tipo"
                required
                defaultValue="INTERNACIONAL"
                className="mt-2 w-full rounded-2xl border border-[#cbdedb] bg-white px-4 py-3 text-[#173f3e] outline-none focus:border-[#078b87]"
              >
                <option value="NACIONAL">
                  Nacional
                </option>

                <option value="INTERNACIONAL">
                  Internacional
                </option>
              </select>
            </label>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#dce9e7] bg-white p-7 lg:p-8">
          <h2 className="text-xl font-semibold text-[#173f3e]">
            Conteúdo
          </h2>

          <div className="mt-6 space-y-5">
            <Area
              label="Resumo"
              name="resumo"
              rows={3}
              placeholder="Breve apresentação do destino"
            />

            <Area
              label="Descrição"
              name="descricao"
              rows={7}
              placeholder="Conteúdo completo do destino"
            />

            <div className="grid gap-5 md:grid-cols-2">
              <Campo
                label="Melhor época"
                name="melhorEpoca"
                placeholder="Ex.: Abril a junho"
              />

              <Campo
                label="Duração sugerida"
                name="duracaoSugerida"
                placeholder="Ex.: 5 a 7 dias"
              />
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#dce9e7] bg-white p-7 lg:p-8">
          <h2 className="text-xl font-semibold text-[#173f3e]">
            Publicação
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Campo
              label="Ordem de exibição"
              name="ordem"
              type="number"
              defaultValue="0"
              min="0"
            />

            <div className="flex flex-col justify-end gap-4 pb-1">
              <Check
                name="publicado"
                label="Publicar destino"
              />

              <Check
                name="destaque"
                label="Exibir como destaque"
              />
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#dce9e7] bg-white p-7 lg:p-8">
          <h2 className="text-xl font-semibold text-[#173f3e]">
            SEO
          </h2>

          <div className="mt-6 space-y-5">
            <Campo
              label="Título SEO"
              name="seoTitle"
              placeholder="Título para mecanismos de busca"
            />

            <Area
              label="Descrição SEO"
              name="seoDescription"
              rows={3}
              placeholder="Descrição para mecanismos de busca"
            />
          </div>
        </section>

        <div className="flex flex-wrap justify-end gap-3">
          <Link
            href="/admin/conteudo/destinos"
            className="inline-flex rounded-full border border-[#cbdedb] bg-white px-6 py-3 font-semibold text-[#173f3e]"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={salvando}
            className="inline-flex rounded-full bg-[#064f4e] px-7 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {salvando
              ? "Salvando..."
              : "Cadastrar destino"}
          </button>
        </div>
      </form>
    </main>
  );
}

function Campo({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  defaultValue,
  min,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  min?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-[#49605e]">
        {label}
      </span>

      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        min={min}
        className="mt-2 w-full rounded-2xl border border-[#cbdedb] bg-white px-4 py-3 text-[#173f3e] outline-none focus:border-[#078b87]"
      />
    </label>
  );
}

function Area({
  label,
  name,
  rows,
  placeholder,
}: {
  label: string;
  name: string;
  rows: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-[#49605e]">
        {label}
      </span>

      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        className="mt-2 w-full resize-y rounded-2xl border border-[#cbdedb] bg-white px-4 py-3 text-[#173f3e] outline-none focus:border-[#078b87]"
      />
    </label>
  );
}

function Check({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  return (
    <label className="flex items-center gap-3 text-sm font-semibold text-[#49605e]">
      <input
        name={name}
        type="checkbox"
        className="h-5 w-5 accent-[#064f4e]"
      />

      {label}
    </label>
  );
}
