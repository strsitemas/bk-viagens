"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const statuses = [
  {
    value: "NOVO",
    label: "Novo",
  },
  {
    value: "EM_CONTATO",
    label: "Em contato",
  },
  {
    value: "PROPOSTA",
    label: "Proposta",
  },
  {
    value: "NEGOCIACAO",
    label: "Negociação",
  },
  {
    value: "FECHADO",
    label: "Fechado",
  },
  {
    value: "PERDIDO",
    label: "Perdido",
  },
];

export function LeadStatusControl({
  leadId,
  currentStatus,
}: {
  leadId: string;
  currentStatus: string;
}) {
  const router = useRouter();

  const [status, setStatus] =
    useState(currentStatus);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  async function updateStatus(
    newStatus: string
  ) {
    const previousStatus = status;

    setStatus(newStatus);
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        `/api/admin/leads/${leadId}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        setStatus(previousStatus);

        setMessage(
          result.message ||
            "Não foi possível atualizar."
        );

        return;
      }

      setMessage("Status atualizado.");

      router.refresh();
    }
    catch {
      setStatus(previousStatus);

      setMessage(
        "Erro de comunicação com o servidor."
      );
    }
    finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <label
        htmlFor="lead-status"
        className="block text-sm font-semibold text-[#49605e]"
      >
        Etapa do atendimento
      </label>

      <select
        id="lead-status"
        value={status}
        disabled={saving}
        onChange={(event) =>
          updateStatus(event.target.value)
        }
        className="mt-2 min-h-12 w-full rounded-xl border border-[#cddfdd] bg-white px-4 text-base font-semibold text-[#274542] outline-none transition focus:border-[#078b87] disabled:opacity-60"
      >
        {statuses.map((item) => (
          <option
            key={item.value}
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>

      {message && (
        <p className="mt-2 text-sm font-medium text-[#60716f]">
          {message}
        </p>
      )}
    </div>
  );
}
