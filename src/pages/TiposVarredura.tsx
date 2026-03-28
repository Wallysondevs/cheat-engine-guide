import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function TiposVarredura() {
  return (
    <PageContainer
      title="Tipos de Varredura"
      subtitle="Todos os modos de varredura disponíveis no Cheat Engine e quando usar cada um."
      difficulty="iniciante"
      timeToRead="7 min"
    >
      <h2>Scan Types Disponíveis</h2>
      <div className="space-y-3 my-4 not-prose">
        {[
          { name: "Exact Value", uso: "Você sabe o valor exato. Ex: procurar 100 de vida.", nivel: "Básico" },
          { name: "Bigger than...", uso: "Busca valores maiores que o digitado. Ex: >50.", nivel: "Básico" },
          { name: "Smaller than...", uso: "Busca valores menores que o digitado.", nivel: "Básico" },
          { name: "Value between...", uso: "Busca valores em um intervalo. Ex: entre 80 e 120.", nivel: "Básico" },
          { name: "Unknown Initial Value", uso: "Não sabe o valor. Faz snapshot para comparar depois.", nivel: "Intermediário" },
          { name: "Changed Value", uso: "O valor mudou desde a última varredura.", nivel: "Intermediário" },
          { name: "Unchanged Value", uso: "O valor NÃO mudou.", nivel: "Intermediário" },
          { name: "Increased Value", uso: "O valor aumentou (qualquer quantidade).", nivel: "Intermediário" },
          { name: "Decreased Value", uso: "O valor diminuiu (qualquer quantidade).", nivel: "Intermediário" },
          { name: "Increased by", uso: "Aumentou por um valor específico.", nivel: "Avançado" },
          { name: "Decreased by", uso: "Diminuiu por um valor específico.", nivel: "Avançado" },
          { name: "Not equal to value", uso: "Valor diferente do digitado.", nivel: "Avançado" },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 border border-border rounded-lg p-3 bg-card">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <code className="text-primary font-mono text-sm">{item.name}</code>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  item.nivel === "Básico" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                  item.nivel === "Intermediário" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                  "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }`}>{item.nivel}</span>
              </div>
              <p className="text-sm text-muted-foreground">{item.uso}</p>
            </div>
          </div>
        ))}
      </div>

      <AlertBox type="tip" title="Combinação Mais Eficiente">
        Para jogos que você não conhece, comece com <strong>Exact Value + 4 Bytes</strong>. Se não funcionar, tente <strong>Float</strong>. Se ainda não encontrar, use <strong>Unknown Initial Value</strong> com comparações de Increased/Decreased.
      </AlertBox>
    </PageContainer>
  );
}
