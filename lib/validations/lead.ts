import { z } from "zod";

export const leadSchema = z
  .object({
    nome: z
      .string()
      .trim()
      .min(2, "Informe seu nome.")
      .max(100),

    whatsapp: z
      .string()
      .trim()
      .min(10, "Informe um WhatsApp válido.")
      .max(20),

    email: z
      .string()
      .trim()
      .email("Informe um e-mail válido.")
      .max(150)
      .optional()
      .or(z.literal("")),

    destino: z
      .string()
      .trim()
      .max(120)
      .optional(),

    aceitaSugestoes: z
      .boolean()
      .default(false),

    tipoExperiencia: z
      .string()
      .trim()
      .max(80)
      .optional(),

    dataPretendida: z
      .string()
      .trim()
      .max(80)
      .optional(),

    duracao: z
      .string()
      .trim()
      .max(80)
      .optional(),

    adultos: z
      .number()
      .int()
      .min(1)
      .max(30),

    criancas: z
      .number()
      .int()
      .min(0)
      .max(30),

    faixaInvestimento: z
      .string()
      .trim()
      .max(100)
      .optional(),

    observacoes: z
      .string()
      .trim()
      .max(1500)
      .optional(),

    origem: z.enum([
      "PLANEJE_SUA_VIAGEM",
      "ME_SURPREENDA",
      "DESTINO",
      "CRUZEIRO",
      "LUA_DE_MEL",
      "VIAJE_AGORA",
    ]).default("PLANEJE_SUA_VIAGEM"),
  })
  .refine(
    (data) =>
      data.aceitaSugestoes ||
      Boolean(data.destino && data.destino.trim().length >= 2),
    {
      message: "Informe um destino ou escolha receber sugestões da Buckart.",
      path: ["destino"],
    }
  );

export type LeadInput = z.infer<typeof leadSchema>;