"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Destino = {
  id: string;
  nome: string;
  slug: string;
  pais: string;
  estadoRegiao: string | null;
  cidade: string | null;
  tipo: "NACIONAL" | "INTERNACIONAL";
  resumo: string | null;
  descricao: string | null;
  melhorEpoca: string | null;
  duracaoSugerida: string | null;
  publicado: boolean;
  destaque: boolean;
  ordem: number;
  seoTitle: string | null;
  seoDescription: string | null;
};

export default function DestinoEditForm({
  destino,
}: {
  destino: Destino;
}) {
  const router = useRouter();

  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function salvar(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (salvando) {
      return;
    }

    setSalvando(true);
    setErro("");
    setSucesso("");

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
        `/api/admin/destinos/${destino.id}`,
        {
          method: "PATCH",
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
            "Não foi possível atualizar o destino."
        );
        return;
      }

      setSucesso("Destino atualizado com sucesso.");

      router.refresh();
    } catch {
      setErro(
        "Falha de comunicação ao atualizar o destino."
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
          Editar destino
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-[#60716f]">
          Atualize conteúdo, publicação e informações
          de SEO do destino.
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

        {sucesso && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-800">
            {sucesso}
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
              defaultValue={destino.nome}
            />

            <Campo
              label="Slug"
              name="slug"
              required
              defaultValue={destino.slug}
            />

            <Campo
              label="País"
              name="pais"
              required
              defaultValue={destino.pais}
            />

            <Campo
              label="Estado / Região"
              name="estadoRegiao"
              defaultValue={destino.estadoRegiao ?? ""}
            />

            <Campo
              label="Cidade"
              name="cidade"
              defaultValue={destino.cidade ?? ""}
            />

            <label className="block">
              <span className="text-sm font-semibold text-[#49605e]">
                Tipo
              </span>

              <select
                name="tipo"
                required
                defaultValue={destino.tipo}
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
              defaultValue={destino.resumo ?? ""}
            />

            <Area
              label="Descrição"
              name="descricao"
              rows={7}
              defaultValue={destino.descricao ?? ""}
            />

            <div className="grid gap-5 md:grid-cols-2">
              <Campo
                label="Melhor época"
                name="melhorEpoca"
                defaultValue={destino.melhorEpoca ?? ""}
              />

              <Campo
                label="Duração sugerida"
                name="duracaoSugerida"
                defaultValue={
                  destino.duracaoSugerida ?? ""
                }
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
              min="0"
              defaultValue={String(destino.ordem)}
            />

            <div className="flex flex-col justify-end gap-4 pb-1">
              <Check
                name="publicado"
                label="Publicar destino"
                defaultChecked={destino.publicado}
              />

              <Check
                name="destaque"
                label="Exibir como destaque"
                defaultChecked={destino.destaque}
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
              defaultValue={destino.seoTitle ?? ""}
            />

            <Area
              label="Descrição SEO"
              name="seoDescription"
              rows={3}
              defaultValue={
                destino.seoDescription ?? ""
              }
            />
          </div>
        </section>

        <div className="flex flex-wrap justify-end gap-3">
          <Link
            href="/admin/conteudo/destinos"
            className="inline-flex rounded-full border border-[#cbdedb] bg-white px-6 py-3 font-semibold text-[#173f3e]"
          >
            Voltar
          </Link>

          <button
            type="submit"
            disabled={salvando}
            className="inline-flex rounded-full bg-[#064f4e] px-7 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {salvando
              ? "Salvando..."
              : "Salvar alterações"}
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
  defaultValue,
  min,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
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
  defaultValue,
}: {
  label: string;
  name: string;
  rows: number;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-[#49605e]">
        {label}
      </span>

      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        className="mt-2 w-full resize-y rounded-2xl border border-[#cbdedb] bg-white px-4 py-3 text-[#173f3e] outline-none focus:border-[#078b87]"
      />
    </label>
  );
}

function Check({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex items-center gap-3 text-sm font-semibold text-[#49605e]">
      <input
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="h-5 w-5 accent-[#064f4e]"
      />

      {label}
    </label>
  );
}