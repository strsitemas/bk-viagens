import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function PrivacidadePage() {
  return (
    <>
      <Header variant="light" />

      <main className="bg-[#f6fbfa]">
        <section className="px-6 pb-24 pt-40 lg:px-10 lg:pb-32 lg:pt-48">
          <div className="mx-auto max-w-[900px]">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#078b87]">
              Privacidade
            </p>

            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] text-[#173f3e] sm:text-6xl">
              Política de Privacidade
            </h1>

            <p className="mt-8 text-lg leading-8 text-[#526966]">
              A Buckart Viagens respeita a sua privacidade e utiliza os dados
              informados neste site para atender solicitações, entrar em
              contato com viajantes e auxiliar no planejamento de viagens.
            </p>

            <div className="mt-14 space-y-10 rounded-[2rem] border border-[#dcebe8] bg-white p-8 sm:p-10">
              <section>
                <h2 className="text-2xl font-semibold text-[#173f3e]">
                  Dados que podemos receber
                </h2>

                <p className="mt-4 leading-7 text-[#60716f]">
                  Ao preencher nossos formulários, você poderá informar dados
                  como nome, telefone, WhatsApp, e-mail, cidade de origem,
                  destino desejado, período da viagem e outras informações
                  necessárias para entendermos sua solicitação.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#173f3e]">
                  Como utilizamos as informações
                </h2>

                <p className="mt-4 leading-7 text-[#60716f]">
                  As informações são utilizadas para responder ao seu contato,
                  compreender suas preferências de viagem, organizar o
                  atendimento e apresentar possibilidades relacionadas à
                  solicitação realizada.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#173f3e]">
                  Proteção das informações
                </h2>

                <p className="mt-4 leading-7 text-[#60716f]">
                  Adotamos medidas destinadas a proteger as informações
                  armazenadas e restringir seu acesso às pessoas que precisam
                  delas para realizar o atendimento.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#173f3e]">
                  Seus direitos
                </h2>

                <p className="mt-4 leading-7 text-[#60716f]">
                  Você poderá solicitar informações sobre seus dados pessoais,
                  bem como pedir correção, atualização ou exclusão quando
                  aplicável, observadas as obrigações legais e regulatórias.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#173f3e]">
                  Consentimento
                </h2>

                <p className="mt-4 leading-7 text-[#60716f]">
                  Ao enviar voluntariamente seus dados pelos formulários do
                  site, você declara estar ciente de que essas informações
                  serão utilizadas para viabilizar o atendimento solicitado.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#173f3e]">
                  Atualizações desta política
                </h2>

                <p className="mt-4 leading-7 text-[#60716f]">
                  Esta política poderá ser atualizada para refletir mudanças
                  nos serviços, processos internos ou requisitos legais.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}