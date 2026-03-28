import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function MultiNivel() {
  return (
    <PageContainer
      title="Ponteiros Multinível"
      subtitle="Entenda e trabalhe com cadeias de múltiplos ponteiros (multilevel pointers)."
      difficulty="avançado"
      timeToRead="10 min"
    >
      <h2>O que é um Ponteiro Multinível?</h2>
      <p>
        Em muitos jogos, a estrutura de dados do personagem não está diretamente apontada por um endereço estático. Em vez disso, há uma cadeia de ponteiros: um endereço estático aponta para outro ponteiro, que aponta para outro, que aponta para outro... até chegar no dado.
      </p>
      <CodeBlock
        title="Exemplo de Cadeia Multinível"
        language="pseudocode"
        code={`
Nível 0 (Estático): game.exe + 0x00A1B230
  ↓ ler valor
Nível 1: [game.exe + 0x00A1B230] = 0x1A2B0000
  ↓ + offset 0x18
Nível 2: [0x1A2B0000 + 0x18] = 0x3C4D0000
  ↓ + offset 0x4C
Valor da Vida: [0x3C4D0000 + 0x4C] = 100
        `}
      />

      <h2>Notação no Cheat Engine</h2>
      <p>
        O CE exibe ponteiros multinível como:
      </p>
      <div className="bg-muted rounded-lg p-4 not-prose font-mono text-sm mb-4">
        <span className="text-primary">P→P→P→</span>vida
        <div className="text-muted-foreground text-xs mt-1">game.exe+A1B230, 18, 4C</div>
      </div>

      <h2>Adicionando Ponteiro Multinível Manualmente</h2>
      <ol>
        <li>Clique em <strong>"Add address manually"</strong></li>
        <li>Marque <strong>"Pointer"</strong></li>
        <li>No campo Base Address: <code>game.exe+0xA1B230</code></li>
        <li>Clique em <strong>"Add Offset"</strong> e adicione cada offset em ordem: <code>0x18</code>, <code>0x4C</code></li>
        <li>O CE resolverá a cadeia automaticamente e mostrará o valor final</li>
      </ol>

      <h2>Validando o Ponteiro</h2>
      <p>
        Para confirmar que o ponteiro multinível é válido:
      </p>
      <ol>
        <li>Adicione-o à lista de endereços</li>
        <li>Feche e reabra o jogo</li>
        <li>Abra a mesma tabela no CE</li>
        <li>Se o valor mostrado no endereço está correto, o ponteiro funciona!</li>
      </ol>

      <AlertBox type="tip" title="Dica Prática">
        Ponteiros de 2-3 níveis são os mais comuns. Mais de 5 níveis geralmente indica que você está no caminho errado — tente outro ponteiro base. Use o Pointer Scanner com comparação entre sessões para encontrar os mais confiáveis.
      </AlertBox>
    </PageContainer>
  );
}
