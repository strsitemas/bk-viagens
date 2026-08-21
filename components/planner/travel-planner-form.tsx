"use client";

import { FormEvent, useState } from "react";

const experiencias = [
  "Praia",
  "Família",
  "Romance",
  "Neve",
  "Europa",
  "Cruzeiro",
  "Aventura",
  "Outro",
];

type FormState = {
  nome: string;
  whatsapp: string;
  email: string;
  destino: string;
  aceitaSugestoes: boolean;
  tipoExperiencia: string;
  dataPretendida: string;
  duracao: string;
  adultos: number;
  criancas: number;
  observacoes: string;
  consentimentoLgpd: boolean;
};

const initialState: FormState = {
  nome: "",
  whatsapp: "",
  email: "",
  destino: "",
  aceitaSugestoes: false,
  tipoExperiencia: "",
  dataPretendida: "",
  duracao: "",
  adultos: 2,
  criancas: 0,
  observacoes: "",
  consentimentoLgpd: false,
};

export function TravelPlannerForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          origem: "PLANEJE_SUA_VIAGEM",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(
          result.message ||
            "Não foi possível enviar sua solicitação."
        );
        return;
      }

      setSuccess(true);
      setForm(initialState);
    } catch {
      setError(
        "Não foi possível conectar com a Buckart agora. Tente novamente."
      );
    } finally {
      setSending(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-[2rem] bg-white p-8 shadow-xl sm:p-12">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#dff8f5] text-2xl text-[#06716e]">
          ✓
        </div>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-[#087d7a]">
          Solicitação recebida
        </p>

        <h2 className="mt-4 text-4xl font-medium leading-tight tracking-[-0.04em] text-[#073f3f]">
          Sua viagem já começou por aqui.
        </h2>

        <p className="mt-6 max-w-xl leading-7 text-stone-600">
          Recebemos suas informações. A Buckart poderá entrar em
          contato para entender os detalhes e ajudar a transformar
          sua ideia em uma viagem bem planejada.
        </p>

        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-8 rounded-full border border-[#087d7a] px-6 py-3 text-sm font-semibold text-[#06625f] transition hover:bg-[#edfafa]"
        >
          Planejar outra viagem
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] bg-white p-6 shadow-xl sm:p-9 lg:p-12"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#087d7a]">
          Primeiro, a viagem
        </p>

        <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-stone-900 sm:text-3xl">
          Para onde você gostaria de ir?
        </h2>

        <input
          type="text"
          value={form.destino}
          disabled={form.aceitaSugestoes}
          onChange={(event) =>
            update("destino", event.target.value)
          }
          placeholder="Ex.: Paris, Bahia, Orlando..."
          className="mt-6 min-h-14 w-full rounded-2xl border border-stone-200 bg-stone-50 px-5 text-base text-[#202d2c] outline-none transition placeholder:text-[#6c7775] focus:border-[#0a8b87] disabled:cursor-not-allowed disabled:opacity-50"
        />

        <label className="mt-4 flex cursor-pointer items-start gap-3 text-base leading-7 text-[#425452]">
          <input
            type="checkbox"
            checked={form.aceitaSugestoes}
            onChange={(event) => {
              update("aceitaSugestoes", event.target.checked);

              if (event.target.checked) {
                update("destino", "");
              }
            }}
            className="mt-1 h-5 w-5 shrink-0 accent-[#087d7a]"
          />

          <span>
            Ainda não decidi. Quero que a Buckart me sugira destinos.
          </span>
        </label>
      </div>

      <div className="my-10 h-px bg-stone-100" />

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#087d7a]">
          O que você quer viver?
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {experiencias.map((experiencia) => {
            const selected =
              form.tipoExperiencia === experiencia;

            return (
              <button
                key={experiencia}
                type="button"
                onClick={() =>
                  update(
                    "tipoExperiencia",
                    selected ? "" : experiencia
                  )
                }
                className={`rounded-full border px-5 py-3 text-base font-medium transition ${
                  selected
                    ? "border-[#087d7a] bg-[#087d7a] text-white"
                    : "border-stone-200 bg-white text-stone-600 hover:border-[#087d7a]"
                }`}
              >
                {experiencia}
              </button>
            );
          })}
        </div>
      </div>

      <div className="my-10 h-px bg-stone-100" />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-base font-semibold text-[#344745]">
          Quando pretende viajar?

          <input
            type="text"
            value={form.dataPretendida}
            onChange={(event) =>
              update("dataPretendida", event.target.value)
            }
            placeholder="Ex.: Janeiro de 2027"
            className="mt-2 min-h-14 w-full rounded-2xl border border-stone-200 bg-stone-50 px-5 text-base font-normal text-[#202d2c] outline-none placeholder:text-[#6c7775] focus:border-[#0a8b87]"
          />
        </label>

        <label className="text-base font-semibold text-[#344745]">
          Quanto tempo?

          <input
            type="text"
            value={form.duracao}
            onChange={(event) =>
              update("duracao", event.target.value)
            }
            placeholder="Ex.: 7 a 10 dias"
            className="mt-2 min-h-14 w-full rounded-2xl border border-stone-200 bg-stone-50 px-5 text-base font-normal text-[#202d2c] outline-none placeholder:text-[#6c7775] focus:border-[#0a8b87]"
          />
        </label>
      </div>

      <div className="my-10 h-px bg-stone-100" />

      <div>
        <p className="text-base font-semibold text-[#344745]">
          Quem vai viajar?
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="rounded-2xl border border-stone-200 p-5">
            <span className="block text-base font-semibold text-[#293b39]">
              Adultos
            </span>

            <input
              type="number"
              min="1"
              max="30"
              value={form.adultos}
              onChange={(event) =>
                update(
                  "adultos",
                  Math.max(1, Number(event.target.value))
                )
              }
              className="mt-3 w-full bg-transparent text-2xl font-medium text-[#064f4e] outline-none"
            />
          </label>

          <label className="rounded-2xl border border-stone-200 p-5">
            <span className="block text-base font-semibold text-[#293b39]">
              Crianças
            </span>

            <input
              type="number"
              min="0"
              max="30"
              value={form.criancas}
              onChange={(event) =>
                update(
                  "criancas",
                  Math.max(0, Number(event.target.value))
                )
              }
              className="mt-3 w-full bg-transparent text-2xl font-medium text-[#064f4e] outline-none"
            />
          </label>
        </div>
      </div>

      <div className="my-10 h-px bg-stone-100" />

      <div>
        <label className="text-base font-semibold text-[#344745]">
          Tem algo que faria essa viagem ser ainda mais especial?

          <textarea
            value={form.observacoes}
            onChange={(event) =>
              update("observacoes", event.target.value)
            }
            maxLength={1500}
            rows={5}
            placeholder="Conte preferências, comemorações, necessidades ou experiências que gostaria de viver..."
            className="mt-2 w-full resize-none rounded-2xl border border-stone-200 bg-stone-50 p-5 text-base font-normal leading-7 text-[#202d2c] outline-none placeholder:text-[#6c7775] focus:border-[#0a8b87]"
          />
        </label>
      </div>

      <div className="my-10 h-px bg-stone-100" />

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#087d7a]">
          Como podemos falar com você?
        </p>

        <div className="mt-5 grid gap-4">
          <input
            required
            type="text"
            value={form.nome}
            onChange={(event) =>
              update("nome", event.target.value)
            }
            placeholder="Seu nome"
            className="min-h-14 rounded-2xl border border-stone-200 bg-stone-50 px-5 text-base text-[#202d2c] outline-none placeholder:text-[#6c7775] focus:border-[#0a8b87]"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              type="tel"
              value={form.whatsapp}
              onChange={(event) =>
                update("whatsapp", event.target.value)
              }
              placeholder="WhatsApp"
              className="min-h-14 rounded-2xl border border-stone-200 bg-stone-50 px-5 text-base text-[#202d2c] outline-none placeholder:text-[#6c7775] focus:border-[#0a8b87]"
            />

            <input
              type="email"
              value={form.email}
              onChange={(event) =>
                update("email", event.target.value)
              }
              placeholder="E-mail (opcional)"
              className="min-h-14 rounded-2xl border border-stone-200 bg-stone-50 px-5 text-base text-[#202d2c] outline-none placeholder:text-[#6c7775] focus:border-[#0a8b87]"
            />
          </div>
        </div>
      </div>

      <label className="mt-8 flex cursor-pointer items-start gap-3 rounded-2xl bg-[#f1faf9] p-5 text-sm leading-6 text-[#425452]">
        <input
          required
          type="checkbox"
          checked={form.consentimentoLgpd}
          onChange={(event) =>
            update(
              "consentimentoLgpd",
              event.target.checked
            )
          }
          className="mt-0.5 h-5 w-5 shrink-0 accent-[#087d7a]"
        />

        <span>
          Autorizo a Buckart Viagens a utilizar os dados informados
          para entrar em contato comigo sobre esta solicitação de
          viagem.
        </span>
      </label>

      {error && (
        <div
          role="alert"
          className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-7 flex min-h-14 w-full items-center justify-center rounded-full bg-[#064f4e] px-8 text-base font-semibold text-white transition hover:bg-[#08706d] disabled:cursor-wait disabled:opacity-60"
      >
        {sending
          ? "Enviando..."
          : "Quero planejar minha viagem →"}
      </button>

      <p className="mt-4 text-center text-sm leading-6 text-[#667573]">
        Sem compromisso. A Buckart entra em contato para entender
        melhor sua viagem.
      </p>
    </form>
  );
}
