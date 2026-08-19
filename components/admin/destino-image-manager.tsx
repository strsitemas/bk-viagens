"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";

type Props = {
  destinoId: string;
  destinoNome: string;
};

type TipoImagem = "CAPA" | "GALERIA";

export default function DestinoImageManager({
  destinoId,
  destinoNome,
}: Props) {
  const router = useRouter();

  const [arquivo, setArquivo] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState<string | null>(null);

  const [alt, setAlt] = useState("");
  const [tipo, setTipo] =
    useState<TipoImagem>("GALERIA");

  const [ordem, setOrdem] = useState("0");

  const [enviando, setEnviando] =
    useState(false);

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  function selecionarArquivo(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0] ?? null;

    setErro("");
    setSucesso("");

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    if (!file) {
      setArquivo(null);
      setPreview(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setArquivo(null);
      setPreview(null);
      setErro("Selecione um arquivo de imagem.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setArquivo(null);
      setPreview(null);
      setErro(
        "A imagem deve possuir no máximo 5 MB."
      );
      return;
    }

    setArquivo(file);
    setPreview(URL.createObjectURL(file));

    if (!alt) {
      setAlt(`Imagem de ${destinoNome}`);
    }
  }

  async function enviar(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (enviando) {
      return;
    }

    setErro("");
    setSucesso("");

    if (!arquivo) {
      setErro("Selecione uma imagem.");
      return;
    }

    if (!alt.trim()) {
      setErro(
        "Informe o texto alternativo da imagem."
      );
      return;
    }

    setEnviando(true);

    try {
      /*
       * Etapa 1:
       * envia o arquivo físico ao Vercel Blob.
       */
      const formData = new FormData();
      formData.append("file", arquivo);

      const uploadResponse = await fetch(
        "/api/admin/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData =
        await uploadResponse.json();

      if (
        !uploadResponse.ok ||
        !uploadData.success
      ) {
        throw new Error(
          uploadData.message ||
            "Falha no upload da imagem."
        );
      }

      /*
       * Etapa 2:
       * registra a URL e os metadados no Neon.
       */
      const registerResponse = await fetch(
        `/api/admin/destinos/${destinoId}/imagens`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: uploadData.file.url,
            alt: alt.trim(),
            tipo,
            ordem: Number(ordem),
          }),
        }
      );

      const registerData =
        await registerResponse.json();

      if (
        !registerResponse.ok ||
        !registerData.success
      ) {
        throw new Error(
          registerData.message ||
            "A imagem foi enviada, mas não pôde ser registrada."
        );
      }

      setSucesso(
        "Imagem adicionada ao destino com sucesso."
      );

      setArquivo(null);
      setPreview(null);
      setAlt("");
      setTipo("GALERIA");
      setOrdem("0");

      const input =
        document.getElementById(
          "destino-imagem-file"
        ) as HTMLInputElement | null;

      if (input) {
        input.value = "";
      }

      router.refresh();
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar a imagem."
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="rounded-[2rem] border border-[#dce9e7] bg-white p-7 lg:p-8">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#078b87]">
          Mídia
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-[#173f3e]">
          Imagens do destino
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#60716f]">
          Adicione a capa e as imagens da galeria de{" "}
          {destinoNome}.
        </p>
      </div>

      <form
        onSubmit={enviar}
        className="mt-7 space-y-6"
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

        <label className="block">
          <span className="text-sm font-semibold text-[#49605e]">
            Arquivo
          </span>

          <input
            id="destino-imagem-file"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={selecionarArquivo}
            disabled={enviando}
            className="mt-2 block w-full rounded-2xl border border-[#cbdedb] bg-white px-4 py-3 text-sm text-[#49605e]"
          />

          <span className="mt-2 block text-xs text-[#82918f]">
            JPG, PNG, WebP ou AVIF. Máximo de 5 MB.
          </span>
        </label>

        {preview && (
          <div className="overflow-hidden rounded-3xl border border-[#dce9e7] bg-[#f5f9f8]">
            <img
              src={preview}
              alt="Pré-visualização da imagem selecionada"
              className="h-[320px] w-full object-cover"
            />
          </div>
        )}

        <label className="block">
          <span className="text-sm font-semibold text-[#49605e]">
            Texto alternativo (ALT)
          </span>

          <input
            type="text"
            value={alt}
            onChange={(event) =>
              setAlt(event.target.value)
            }
            disabled={enviando}
            placeholder={`Ex.: Vista de ${destinoNome}`}
            className="mt-2 w-full rounded-2xl border border-[#cbdedb] bg-white px-4 py-3 text-[#173f3e] outline-none focus:border-[#078b87]"
          />

          <span className="mt-2 block text-xs text-[#82918f]">
            Descreva brevemente o conteúdo da foto.
          </span>
        </label>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-[#49605e]">
              Tipo
            </span>

            <select
              value={tipo}
              onChange={(event) =>
                setTipo(
                  event.target
                    .value as TipoImagem
                )
              }
              disabled={enviando}
              className="mt-2 w-full rounded-2xl border border-[#cbdedb] bg-white px-4 py-3 text-[#173f3e] outline-none focus:border-[#078b87]"
            >
              <option value="GALERIA">
                Galeria
              </option>

              <option value="CAPA">
                Capa
              </option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-[#49605e]">
              Ordem
            </span>

            <input
              type="number"
              min="0"
              value={ordem}
              onChange={(event) =>
                setOrdem(event.target.value)
              }
              disabled={enviando}
              className="mt-2 w-full rounded-2xl border border-[#cbdedb] bg-white px-4 py-3 text-[#173f3e] outline-none focus:border-[#078b87]"
            />
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={enviando || !arquivo}
            className="inline-flex rounded-full bg-[#064f4e] px-7 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {enviando
              ? "Enviando..."
              : "Adicionar imagem"}
          </button>
        </div>
      </form>
    </section>
  );
}