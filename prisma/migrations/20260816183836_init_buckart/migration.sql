-- CreateEnum
CREATE TYPE "PapelUsuario" AS ENUM ('ADMIN', 'EDITOR', 'AGENTE');

-- CreateEnum
CREATE TYPE "StatusLead" AS ENUM ('NOVO', 'EM_CONTATO', 'PROPOSTA', 'NEGOCIACAO', 'FECHADO', 'PERDIDO');

-- CreateEnum
CREATE TYPE "TipoPreco" AS ENUM ('FIXO', 'A_PARTIR_DE', 'SOB_CONSULTA');

-- CreateEnum
CREATE TYPE "TipoImagem" AS ENUM ('CAPA', 'GALERIA');

-- CreateEnum
CREATE TYPE "TipoDestino" AS ENUM ('NACIONAL', 'INTERNACIONAL');

-- CreateTable
CREATE TABLE "Empresa" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "email" TEXT,
    "telefone" TEXT,
    "whatsapp" TEXT,
    "site" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioAdmin" (
    "id" UUID NOT NULL,
    "empresaId" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "papel" "PapelUsuario" NOT NULL DEFAULT 'AGENTE',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsuarioAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Destino" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "estadoRegiao" TEXT,
    "cidade" TEXT,
    "tipo" "TipoDestino" NOT NULL,
    "resumo" TEXT,
    "descricao" TEXT,
    "melhorEpoca" TEXT,
    "duracaoSugerida" TEXT,
    "publicado" BOOLEAN NOT NULL DEFAULT false,
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Destino_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DestinoImagem" (
    "id" UUID NOT NULL,
    "destinoId" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "tipo" "TipoImagem" NOT NULL DEFAULT 'GALERIA',
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DestinoImagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experiencia" (
    "id" UUID NOT NULL,
    "empresaId" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "resumo" TEXT,
    "descricao" TEXT,
    "duracaoDias" INTEGER,
    "duracaoNoites" INTEGER,
    "tipoPreco" "TipoPreco" NOT NULL DEFAULT 'SOB_CONSULTA',
    "preco" DECIMAL(12,2),
    "moeda" TEXT NOT NULL DEFAULT 'BRL',
    "inclui" TEXT,
    "naoInclui" TEXT,
    "observacoes" TEXT,
    "personalizavel" BOOLEAN NOT NULL DEFAULT true,
    "publicado" BOOLEAN NOT NULL DEFAULT false,
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "viajeAgora" BOOLEAN NOT NULL DEFAULT false,
    "validoAte" TIMESTAMP(3),
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experiencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienciaDestino" (
    "experienciaId" UUID NOT NULL,
    "destinoId" UUID NOT NULL,
    "principal" BOOLEAN NOT NULL DEFAULT false,
    "ordem" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ExperienciaDestino_pkey" PRIMARY KEY ("experienciaId","destinoId")
);

-- CreateTable
CREATE TABLE "ExperienciaImagem" (
    "id" UUID NOT NULL,
    "experienciaId" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "tipo" "TipoImagem" NOT NULL DEFAULT 'GALERIA',
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExperienciaImagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienciaTag" (
    "experienciaId" UUID NOT NULL,
    "tagId" UUID NOT NULL,

    CONSTRAINT "ExperienciaTag_pkey" PRIMARY KEY ("experienciaId","tagId")
);

-- CreateTable
CREATE TABLE "RoteiroItem" (
    "id" UUID NOT NULL,
    "experienciaId" UUID NOT NULL,
    "dia" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "RoteiroItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inspiracao" (
    "id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "resumo" TEXT,
    "conteudo" TEXT NOT NULL,
    "imagemCapaUrl" TEXT,
    "imagemCapaAlt" TEXT,
    "publicado" BOOLEAN NOT NULL DEFAULT false,
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "publicadoEm" TIMESTAMP(3),
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inspiracao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InspiracaoDestino" (
    "inspiracaoId" UUID NOT NULL,
    "destinoId" UUID NOT NULL,

    CONSTRAINT "InspiracaoDestino_pkey" PRIMARY KEY ("inspiracaoId","destinoId")
);

-- CreateTable
CREATE TABLE "InspiracaoExperiencia" (
    "inspiracaoId" UUID NOT NULL,
    "experienciaId" UUID NOT NULL,

    CONSTRAINT "InspiracaoExperiencia_pkey" PRIMARY KEY ("inspiracaoId","experienciaId")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" UUID NOT NULL,
    "empresaId" UUID NOT NULL,
    "experienciaId" UUID,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "telefone" TEXT,
    "whatsapp" TEXT,
    "origemCidade" TEXT,
    "origemEstado" TEXT,
    "destinoDesejado" TEXT,
    "periodoDesejado" TEXT,
    "quantidadeAdultos" INTEGER NOT NULL DEFAULT 1,
    "quantidadeCriancas" INTEGER NOT NULL DEFAULT 0,
    "duracaoDesejada" TEXT,
    "nivelConforto" TEXT,
    "observacoes" TEXT,
    "origemLead" TEXT,
    "status" "StatusLead" NOT NULL DEFAULT 'NOVO',
    "consentimentoLgpd" BOOLEAN NOT NULL DEFAULT false,
    "consentimentoEm" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadPreferencia" (
    "leadId" UUID NOT NULL,
    "tagId" UUID NOT NULL,

    CONSTRAINT "LeadPreferencia_pkey" PRIMARY KEY ("leadId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_slug_key" ON "Empresa"("slug");

-- CreateIndex
CREATE INDEX "Empresa_ativo_idx" ON "Empresa"("ativo");

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioAdmin_email_key" ON "UsuarioAdmin"("email");

-- CreateIndex
CREATE INDEX "UsuarioAdmin_empresaId_idx" ON "UsuarioAdmin"("empresaId");

-- CreateIndex
CREATE INDEX "UsuarioAdmin_ativo_idx" ON "UsuarioAdmin"("ativo");

-- CreateIndex
CREATE UNIQUE INDEX "Destino_slug_key" ON "Destino"("slug");

-- CreateIndex
CREATE INDEX "Destino_publicado_destaque_idx" ON "Destino"("publicado", "destaque");

-- CreateIndex
CREATE INDEX "Destino_tipo_idx" ON "Destino"("tipo");

-- CreateIndex
CREATE INDEX "Destino_ordem_idx" ON "Destino"("ordem");

-- CreateIndex
CREATE INDEX "DestinoImagem_destinoId_ordem_idx" ON "DestinoImagem"("destinoId", "ordem");

-- CreateIndex
CREATE UNIQUE INDEX "Experiencia_slug_key" ON "Experiencia"("slug");

-- CreateIndex
CREATE INDEX "Experiencia_empresaId_idx" ON "Experiencia"("empresaId");

-- CreateIndex
CREATE INDEX "Experiencia_publicado_destaque_idx" ON "Experiencia"("publicado", "destaque");

-- CreateIndex
CREATE INDEX "Experiencia_viajeAgora_validoAte_idx" ON "Experiencia"("viajeAgora", "validoAte");

-- CreateIndex
CREATE INDEX "Experiencia_ordem_idx" ON "Experiencia"("ordem");

-- CreateIndex
CREATE INDEX "ExperienciaDestino_destinoId_idx" ON "ExperienciaDestino"("destinoId");

-- CreateIndex
CREATE INDEX "ExperienciaImagem_experienciaId_ordem_idx" ON "ExperienciaImagem"("experienciaId", "ordem");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "Tag"("slug");

-- CreateIndex
CREATE INDEX "Tag_ativo_idx" ON "Tag"("ativo");

-- CreateIndex
CREATE INDEX "ExperienciaTag_tagId_idx" ON "ExperienciaTag"("tagId");

-- CreateIndex
CREATE INDEX "RoteiroItem_experienciaId_dia_ordem_idx" ON "RoteiroItem"("experienciaId", "dia", "ordem");

-- CreateIndex
CREATE UNIQUE INDEX "Inspiracao_slug_key" ON "Inspiracao"("slug");

-- CreateIndex
CREATE INDEX "Inspiracao_publicado_destaque_idx" ON "Inspiracao"("publicado", "destaque");

-- CreateIndex
CREATE INDEX "Inspiracao_publicadoEm_idx" ON "Inspiracao"("publicadoEm");

-- CreateIndex
CREATE INDEX "InspiracaoDestino_destinoId_idx" ON "InspiracaoDestino"("destinoId");

-- CreateIndex
CREATE INDEX "InspiracaoExperiencia_experienciaId_idx" ON "InspiracaoExperiencia"("experienciaId");

-- CreateIndex
CREATE INDEX "Lead_empresaId_status_idx" ON "Lead"("empresaId", "status");

-- CreateIndex
CREATE INDEX "Lead_experienciaId_idx" ON "Lead"("experienciaId");

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");

-- CreateIndex
CREATE INDEX "LeadPreferencia_tagId_idx" ON "LeadPreferencia"("tagId");

-- AddForeignKey
ALTER TABLE "UsuarioAdmin" ADD CONSTRAINT "UsuarioAdmin_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DestinoImagem" ADD CONSTRAINT "DestinoImagem_destinoId_fkey" FOREIGN KEY ("destinoId") REFERENCES "Destino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experiencia" ADD CONSTRAINT "Experiencia_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienciaDestino" ADD CONSTRAINT "ExperienciaDestino_experienciaId_fkey" FOREIGN KEY ("experienciaId") REFERENCES "Experiencia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienciaDestino" ADD CONSTRAINT "ExperienciaDestino_destinoId_fkey" FOREIGN KEY ("destinoId") REFERENCES "Destino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienciaImagem" ADD CONSTRAINT "ExperienciaImagem_experienciaId_fkey" FOREIGN KEY ("experienciaId") REFERENCES "Experiencia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienciaTag" ADD CONSTRAINT "ExperienciaTag_experienciaId_fkey" FOREIGN KEY ("experienciaId") REFERENCES "Experiencia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienciaTag" ADD CONSTRAINT "ExperienciaTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoteiroItem" ADD CONSTRAINT "RoteiroItem_experienciaId_fkey" FOREIGN KEY ("experienciaId") REFERENCES "Experiencia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspiracaoDestino" ADD CONSTRAINT "InspiracaoDestino_inspiracaoId_fkey" FOREIGN KEY ("inspiracaoId") REFERENCES "Inspiracao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspiracaoDestino" ADD CONSTRAINT "InspiracaoDestino_destinoId_fkey" FOREIGN KEY ("destinoId") REFERENCES "Destino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspiracaoExperiencia" ADD CONSTRAINT "InspiracaoExperiencia_inspiracaoId_fkey" FOREIGN KEY ("inspiracaoId") REFERENCES "Inspiracao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspiracaoExperiencia" ADD CONSTRAINT "InspiracaoExperiencia_experienciaId_fkey" FOREIGN KEY ("experienciaId") REFERENCES "Experiencia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_experienciaId_fkey" FOREIGN KEY ("experienciaId") REFERENCES "Experiencia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadPreferencia" ADD CONSTRAINT "LeadPreferencia_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadPreferencia" ADD CONSTRAINT "LeadPreferencia_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
