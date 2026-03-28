import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function Ponteiros() {
  return (
    <PageContainer
      title="O que são Ponteiros"
      subtitle="Entenda a diferença entre endereços dinâmicos e estáticos, e por que ponteiros são essenciais."
      difficulty="intermediário"
      timeToRead="10 min"
    >
      <AlertBox type="info" title="Por que Ponteiros?">
        Endereços encontrados por varredura simples mudam cada vez que o jogo é reiniciado. Ponteiros são a solução permanente: eles apontam para o endereço correto independentemente de onde o dado está na memória.
      </AlertBox>

      <h2>O Problema dos Endereços Dinâmicos</h2>
      <p>
        Quando um jogo cria um objeto (ex: o personagem do jogador), ele aloca memória dinamicamente. Cada vez que o jogo inicia, o sistema operacional pode alocar esse objeto em um endereço diferente.
      </p>
      <p>
        Por isso, o endereço <code>0x1A2B3C4D</code> que você encontrou hoje pode ser <code>0x2F9A1B3E</code> amanhã, e seu cheat não funciona mais.
      </p>

      <h2>Como Ponteiros Funcionam</h2>
      <p>
        Um ponteiro é um valor que contém o endereço de outro valor. Em vez de armazenar o endereço do dado diretamente, você armazena um endereço base (estático) que aponta para o dado.
      </p>
      <CodeBlock
        title="Conceito de Ponteiro"
        language="pseudocode"
        code={`
Endereço Base (estático): 0x00400000
Valor em 0x00400000:      0x1A2B3C4D  ← esse é o endereço dinâmico da vida

Para chegar na vida:
[0x00400000] + offset = endereço da vida
[0x1A2B3C4D] = 100 (valor da vida atual)
        `}
      />

      <h2>Offsets</h2>
      <p>
        Geralmente os dados de um personagem ficam organizados em uma estrutura. O objeto do personagem pode estar em um endereço base, e a vida estará em <code>base + 0x4C</code>, a mana em <code>base + 0x50</code>, etc. Esses deslocamentos são chamados de <strong>offsets</strong>.
      </p>
      <CodeBlock
        title="Exemplo com Offset"
        language="pseudocode"
        code={`
Base Pointer: [0x00400000] = 0x1A2B3C00

Vida:   [0x1A2B3C00 + 0x4C] = 100
Mana:   [0x1A2B3C00 + 0x50] = 80
XP:     [0x1A2B3C00 + 0x60] = 1500
        `}
      />

      <h2>Endereços Estáticos vs Dinâmicos</h2>
      <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
        <div className="border border-green-300 dark:border-green-700 rounded-lg p-4 bg-green-50 dark:bg-green-950/20">
          <div className="font-semibold text-green-800 dark:text-green-300 mb-2">✓ Endereço Estático</div>
          <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
            <li>• Sempre o mesmo endereço</li>
            <li>• Fica em regiões de código/dados do executável</li>
            <li>• Mostrado em <span className="font-mono">verde</span> no CE</li>
            <li>• Funciona após reiniciar o jogo</li>
          </ul>
        </div>
        <div className="border border-red-300 dark:border-red-700 rounded-lg p-4 bg-red-50 dark:bg-red-950/20">
          <div className="font-semibold text-red-800 dark:text-red-300 mb-2">✗ Endereço Dinâmico</div>
          <ul className="text-sm text-red-700 dark:text-red-400 space-y-1">
            <li>• Muda a cada sessão</li>
            <li>• Fica no heap (memória alocada dinamicamente)</li>
            <li>• Mostrado em <span className="font-mono">preto</span> no CE</li>
            <li>• Inválido após reiniciar o jogo</li>
          </ul>
        </div>
      </div>

      <AlertBox type="tip" title="Identificando no CE">
        Na lista de endereços do CE, endereços estáticos aparecem em <strong>verde</strong>. Endereços dinâmicos aparecem em <strong>preto</strong>. Se o seu endereço está preto, você precisa encontrar um ponteiro para ele.
      </AlertBox>
    </PageContainer>
  );
}
