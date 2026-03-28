import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function ValorDesconhecido() {
  return (
    <PageContainer
      title="Varredura por Valor Desconhecido"
      subtitle="Como encontrar valores quando você não sabe o número exato — para barras de vida, mana e outros valores ocultos."
      difficulty="intermediário"
      timeToRead="8 min"
    >
      <AlertBox type="info" title="Quando usar?">
        Use "Unknown Initial Value" quando o jogo não mostra o valor numérico exato. Por exemplo, uma barra de vida visual sem número, ou quando o valor está em uma escala diferente da esperada.
      </AlertBox>

      <h2>Unknown Initial Value</h2>
      <p>
        Quando você não sabe o valor exato armazenado, selecione <strong>"Unknown Initial Value"</strong> no Scan Type e clique em <strong>First Scan</strong>. O Cheat Engine armazenará um snapshot de toda a memória do processo — isso pode levar alguns segundos e usar bastante RAM.
      </p>

      <h2>Refinando com Comparações Relativas</h2>
      <p>Após a varredura inicial com valor desconhecido, use estes tipos de Next Scan:</p>
      <div className="space-y-3 my-4 not-prose">
        {[
          { type: "Increased Value", desc: "Filtra endereços cujo valor aumentou desde a última varredura" },
          { type: "Decreased Value", desc: "Filtra endereços cujo valor diminuiu" },
          { type: "Changed Value", desc: "Filtra qualquer endereço que mudou (aumentou ou diminuiu)" },
          { type: "Unchanged Value", desc: "Filtra apenas endereços que NÃO mudaram" },
          { type: "Increased by", desc: "Aumentou por um valor específico (ex: aumentou exatamente 10)" },
          { type: "Decreased by", desc: "Diminuiu por um valor específico" },
          { type: "Value between X and Y", desc: "O valor atual está num intervalo definido" },
        ].map((item, i) => (
          <div key={i} className="border border-border rounded-lg p-3 bg-card">
            <code className="text-primary font-mono text-sm">{item.type}</code>
            <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Estratégia Prática — Barra de Vida Oculta</h2>
      <ol>
        <li><strong>First Scan</strong> com Unknown Initial Value</li>
        <li>Tome dano no jogo → <strong>Next Scan: Decreased Value</strong></li>
        <li>Cure-se → <strong>Next Scan: Increased Value</strong></li>
        <li>Fique parado → <strong>Next Scan: Unchanged Value</strong></li>
        <li>Tome dano novamente → <strong>Next Scan: Decreased Value</strong></li>
        <li>Repita até restar poucos resultados</li>
      </ol>

      <AlertBox type="tip" title="Dica Avançada">
        Combine Unknown Initial Value com <strong>Value Type: All</strong> para procurar em todos os tipos de dados de uma vez. Isso é mais lento, mas aumenta as chances de encontrar o endereço correto quando não sabe o tipo.
      </AlertBox>

      <h2>Snapshot de Memória</h2>
      <p>
        O Cheat Engine armazena um snapshot da memória para poder comparar varreduras. Com processos grandes (jogos AAA), isso pode ocupar centenas de MB de RAM. Se o CE ficar lento, considere restringir o intervalo de busca em <strong>Settings → Scan → Memory Scan Region</strong>.
      </p>
    </PageContainer>
  );
}
