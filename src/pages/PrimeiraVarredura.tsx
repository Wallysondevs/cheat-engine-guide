import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function PrimeiraVarredura() {
    return (
      <PageContainer
        title="Primeira Varredura"
        subtitle="Como realizar sua primeira varredura no Cheat Engine e encontrar o endereço de um valor no jogo."
        difficulty="iniciante"
        timeToRead="10 min"
      >
        <p>
          A varredura (scan) é o coração do Cheat Engine. Ela percorre toda a memória do processo em busca de valores que correspondem aos seus critérios. A primeira varredura estabelece a base — as próximas varreduras refinam até chegar ao endereço exato.
        </p>

        <h2>Configurando a Varredura</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Campo</th>
                <th className="p-3 text-left">O que configurar</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Value", "O valor que você quer buscar. Para vida = 100, digite 100."],
                ["Scan Type", "Exact Value para valores exatos. Veja outros tipos na página Tipos de Varredura."],
                ["Value Type", "4 Bytes para inteiros normais. Float para decimais. Veja Tipos de Dados."],
                ["Hex", "Marque se quiser digitar o valor em hexadecimal (ex: FF para 255)."],
              ].map(([campo, oq], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-sm">{campo}</td>
                  <td className="p-3 text-muted-foreground text-sm">{oq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Realizando a Primeira Varredura</h2>
        <div className="not-prose grid grid-cols-1 gap-3 my-4">
          {[
            { n: "1", passo: "Anexe o CE ao processo", desc: "Clique no ícone de computador → selecione o jogo na lista de processos." },
            { n: "2", passo: "Note o valor atual no jogo", desc: "Exemplo: sua vida está em 100. Este é o valor que você vai buscar." },
            { n: "3", passo: "Configure o scan", desc: "Value Type: 4 Bytes, Scan Type: Exact Value, Value: 100." },
            { n: "4", passo: "Clique em First Scan", desc: "O CE varre toda a memória. Pode retornar milhares de resultados — isso é normal." },
            { n: "5", passo: "Mude o valor no jogo", desc: "Tome dano (agora a vida está em 90, por exemplo)." },
            { n: "6", passo: "Clique em Next Scan com o novo valor", desc: "Digite 90 e clique Next Scan. O CE filtra apenas endereços que mudaram de 100 para 90." },
            { n: "7", passo: "Repita até poucos resultados", desc: "Continue tomando dano e fazendo Next Scan. Em 3-5 ciclos, deve restar 1-3 endereços." },
            { n: "8", passo: "Adicione à Address List", desc: "Selecione os endereços restantes e pressione Enter ou duplo clique." },
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

        <h2>Exemplo Prático: Vida em um RPG</h2>
        <CodeBlock
          title="Passo a passo completo"
          language="text"
          code={`Situação: RPG com vida atual = 150/200

  First Scan:  Exact Value, 4 Bytes, Value = 150
  [5.234.891 resultados — normal!]

  → Entre em combate, tome 30 de dano → vida = 120

  Next Scan:  Exact Value, Value = 120
  [143 resultados — bem menos!]

  → Tome mais 20 de dano → vida = 100

  Next Scan:  Exact Value, Value = 100
  [3 resultados]

  → Cure 50 de vida → vida = 150

  Next Scan:  Exact Value, Value = 150
  [1 resultado! ← este é o endereço]

  Duplo clique → modifique para 9999 → vida infinita!`}
        />

        <AlertBox type="tip" title="Dica — Selecione Todos e Teste">
          Quando restar entre 3 e 15 resultados, selecione todos (Ctrl+A) e adicione à lista. Modifique todos ao mesmo tempo para 9999 e veja qual valor muda no jogo — esse é o endereço correto.
        </AlertBox>

        <AlertBox type="info" title="Muitos resultados após várias scans?">
          Se ainda restar centenas de resultados após 5+ varreduras, tente mudar o tipo de dado (Float, 2 Bytes, Double) ou use "Changed/Unchanged Value" em vez de valores exatos. O jogo pode usar um formato diferente.
        </AlertBox>
      </PageContainer>
    );
  }
  