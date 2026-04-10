import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function MultiNivel() {
    return (
      <PageContainer
        title="Ponteiros Multi-Nível"
        subtitle="Como mapear cadeias de ponteiros complexas — a chave para cheats permanentes em jogos modernos."
        difficulty="intermediário"
        timeToRead="12 min"
      >
        <p>
          Ponteiros multi-nível são cadeias de referências onde você precisa seguir múltiplos ponteiros até chegar ao valor alvo. Jogos modernos organizam seus dados em objetos aninhados — e você precisa seguir toda a cadeia.
        </p>

        <h2>Por que Múltiplos Níveis?</h2>
        <p>
          Imagine a estrutura de um RPG: o GameManager aponta para o PlayerController, que aponta para o PlayerStats, que contém a vida. Para chegar à vida, você segue três ponteiros.
        </p>
        <CodeBlock
          title="Exemplo de cadeia multi-nível"
          language="pseudocode"
          code={`Endereço base estático: 0x006A9E48  (fica no módulo do executável)
  [0x006A9E48] = 0x12C40000              → ponteiro para GameManager

  [0x12C40000 + 0x148] = 0x23F80200     → ponteiro para PlayerController

  [0x23F80200 + 0x64] = 0x34A12400      → ponteiro para PlayerStats

  [0x34A12400 + 0x4C] = 100             → VIDA DO JOGADOR ✓

  Notação do CE:
  [[[[0x006A9E48] + 0x148] + 0x64] + 0x4C]`}
        />

        <h2>Encontrando Ponteiros Multi-Nível</h2>
        <div className="not-prose grid grid-cols-1 gap-3 my-4">
          {[
            { n: "1", passo: "Encontre o endereço do valor alvo", desc: "Varredura normal — encontre onde a vida está armazenada agora." },
            { n: "2", passo: "Execute o Pointer Scanner", desc: "Clique com botão direito → Pointer scan. Defina Max Level = 5 a 7." },
            { n: "3", passo: "Reinicie o jogo e refine", desc: "Feche, abra o jogo novamente. Encontre o novo endereço da vida. Rescan no Pointer Scanner." },
            { n: "4", passo: "Repita o refinamento", desc: "Quanto mais vezes repetir, mais confiável o ponteiro. Mínimo 3 vezes." },
            { n: "5", passo: "Valide o ponteiro", desc: "Adicione o ponteiro à Address List e reinicie mais uma vez para confirmar." },
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

        <h2>Adicionando Ponteiro Multi-Nível Manualmente</h2>
        <CodeBlock
          title="Adicionar ponteiro manualmente na Address List"
          language="text"
          code={`1. Na Address List, clique em "Add address manually" (ícone +)
  2. Na janela que abre, marque "Pointer"
  3. No campo "Pointer", digite o endereço base estático (ex: "game.exe"+0x009E48)
  4. Adicione os offsets: 0x148, 0x64, 0x4C
     (cada linha de offset é um nível de desreferenciamento)
  5. Selecione o tipo (ex: 4 Bytes)
  6. Clique OK — o endereço aparece em roxo na lista`}
        />

        <h2>Notação de Ponteiro no CE</h2>
        <CodeBlock
          title="Como o CE exibe ponteiros multi-nível"
          language="text"
          code={`Nível 1 (simples):
  P→"game.exe"+0x9E48

  Nível 2:
  P→P→"game.exe"+0x9E48 + 0x148

  Nível 3:
  P→P→P→"game.exe"+0x9E48 + 0x148 + 0x64

  Nível 4 (exemplo da vida):
  P→P→P→P→"game.exe"+0x9E48 + 0x148 + 0x64 + 0x4C`}
        />

        <AlertBox type="warning" title="Ponteiros se quebram com atualizações do jogo">
          Quando o jogo é atualizado, os offsets frequentemente mudam. Você precisará refazer o processo de pointer scanning após cada atualização significativa.
        </AlertBox>

        <AlertBox type="tip" title="Dica — Use o Dissect Data Structure">
          Após encontrar o endereço base de um objeto, use o menu Tools → Dissect data/structures para mapear automaticamente todos os offsets em volta. O CE analisa quais offsets têm valores que mudam e ajuda a identificar o que cada um representa.
        </AlertBox>
      </PageContainer>
    );
  }
  