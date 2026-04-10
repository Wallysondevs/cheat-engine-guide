import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Ponteiros() {
    return (
      <PageContainer
        title="O que são Ponteiros"
        subtitle="Entenda a diferença entre endereços dinâmicos e estáticos, e por que ponteiros são essenciais para cheats permanentes."
        difficulty="intermediário"
        timeToRead="14 min"
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
          code={`Endereço Base (estático): 0x00400000
  Valor em 0x00400000:      0x1A2B3C4D  ← esse é o endereço dinâmico da vida

  Para chegar na vida:
  [0x00400000] + offset = endereço da vida
  [0x1A2B3C4D] = 100 (valor da vida atual)

  Notação do CE: P→"game.exe"+0x400000 → +0x4C → [valor]`}
        />

        <h2>Offsets</h2>
        <p>
          Geralmente os dados de um personagem ficam organizados em uma estrutura. O objeto do personagem pode estar em um endereço base, e a vida estará em <code>base + 0x4C</code>, a mana em <code>base + 0x50</code>, etc. Esses deslocamentos são chamados de <strong>offsets</strong>.
        </p>
        <CodeBlock
          title="Exemplo com Offset"
          language="pseudocode"
          code={`Base Pointer: [0x00400000] = 0x1A2B3C00  (muda toda sessão)

  Vida:   [0x1A2B3C00 + 0x4C] = 100    (você precisa chegar aqui)
  Mana:   [0x1A2B3C00 + 0x50] = 80
  XP:     [0x1A2B3C00 + 0x60] = 1500

  Ponteiro correto no CE:
  "game.exe" + 0x009E48 → offset +0x4C → Vida`}
        />

        <h2>Endereços Estáticos vs Dinâmicos</h2>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          {[
            { cor: "Verde ✅ — Endereço Estático", itens: ["Sempre o mesmo endereço", "Fica em regiões de código/dados do executável", "Mostrado em verde no CE", "Funciona após reiniciar o jogo"] },
            { cor: "Preto ❌ — Endereço Dinâmico", itens: ["Muda a cada sessão", "Fica no heap (memória dinâmica)", "Mostrado em preto no CE", "Inválido após reiniciar o jogo"] },
          ].map((item) => (
            <div key={item.cor} className="border border-border rounded-xl p-4 bg-card">
              <div className="font-semibold text-sm mb-2">{item.cor}</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                {item.itens.map(i => <li key={i}>• {i}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <h2>Identificando o Endereço Base Estático</h2>
        <CodeBlock
          title="Como encontrar o endereço base de um objeto"
          language="text"
          code={`1. Encontre o endereço dinâmico do valor (ex: vida em 0x1A2B3C4C)
  2. Clique direito → "Find out what writes to this address"
  3. A instrução aparece: MOV [EBX+4C], EAX
  4. EBX é o endereço do objeto (0x1A2B3C00)
  5. Agora você precisa encontrar de onde EBX vem
     — Use o debugger e step back para rastrear

  Alternativa rápida: use o Pointer Scanner
  (clique direito → Pointer scan for this address)`}
        />

        <h2>Validando um Ponteiro</h2>
        <p>
          Após encontrar um ponteiro, valide-o:
        </p>
        <div className="not-prose grid grid-cols-1 gap-3 my-4">
          {[
            { n: "1", passo: "Adicione o ponteiro à Address List", desc: "O valor deve aparecer corretamente." },
            { n: "2", passo: "Reinicie o jogo completamente", desc: "Feche e abra novamente." },
            { n: "3", passo: "Verifique o valor", desc: "O valor ainda deve aparecer na Address List e ser o correto." },
            { n: "4", passo: "Repita pelo menos 3 vezes", desc: "Se funcionar em todas as sessões, o ponteiro é válido e pode ser salvo na tabela." },
          ].map((item) => (
            <div key={item.n} className="flex gap-3 p-3 border border-border rounded-xl bg-card">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">{item.n}</span>
              <div>
                <h4 className="font-bold text-sm mb-0.5">{item.passo}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <AlertBox type="tip" title="Identificando no CE">
          Na lista de endereços do CE, endereços estáticos aparecem em <strong>verde</strong>. Endereços dinâmicos aparecem em <strong>preto</strong>. Ponteiros configurados aparecem em <strong>roxo</strong>. Se o seu endereço está preto, você precisa encontrar um ponteiro para ele.
        </AlertBox>
      </PageContainer>
    );
  }
  