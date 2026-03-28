import { PageContainer } from "@/components/layout/PageContainer";

export default function NotFound() {
  return (
    <PageContainer title="Página não encontrada" subtitle="Este tópico não existe ou foi movido.">
      <p>
        Volte ao início clicando em <a href="#/" className="text-primary hover:underline">Introdução</a>.
      </p>
    </PageContainer>
  );
}
