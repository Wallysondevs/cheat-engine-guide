import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Freeze() {
    return (
      <PageContainer
        title="Freeze de Valores"
        subtitle="Como travar valores para que não mudem — vida infinita, munição infinita e mais."
        difficulty="iniciante"
        timeToRead="10 min"
      >
        <h2>O que é Freeze?</h2>
        <p>
          O Freeze (congelar) é uma funcionalidade que força o Cheat Engine a reescrever continuamente um valor no endereço de memória, fazendo com que ele permaneça constante mesmo que o jogo tente alterá-lo. É como "travar" o valor — o jogo pode tentar reduzir sua vida, mas o CE restaura imediatamente.
        </p>

        <h2>Como Ativar o Freeze</h2>
        <div className="not-prose grid grid-cols-1 gap-3 my-4">
          {[
            { n: "1", passo: "Encontre e adicione o endereço à lista", desc: "Use varredura para encontrar o valor e clique em 'Add to list'" },
            { n: "2", passo: "Defina o valor que quer travar", desc: "Duplo clique na coluna Value e digite o valor desejado (ex: 9999)" },
            { n: "3", passo: "Marque o checkbox", desc: "Clique na caixa de seleção na primeira coluna (Active). O endereço ficará travado." },
          ].map((item) => (
            <div key={item.n} className="flex gap-4 p-4 border border-border rounded-xl bg-card">
              <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">{item.n}</span>
              <div>
                <h4 className="font-bold text-sm mb-1">{item.passo}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>Opções Avançadas de Freeze</h2>
        <p>
          Clique com botão direito em um endereço na Address List para ver opções avançadas de freeze:
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Opção</th>
                <th className="p-3 text-left">Descrição</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Set/show timer freeze interval", "Controla a frequência de reescrita (em milissegundos). Padrão: a cada ciclo do CE."],
                ["Set value (frozen)", "Define um valor específico para o freeze, diferente do valor atual."],
                ["Freeze type: Set value", "Modo padrão: define o valor no intervalo configurado."],
                ["Freeze type: Increase value", "A cada ciclo, soma uma quantidade ao valor — útil para acumular recursos."],
                ["Freeze type: Decrease value", "A cada ciclo, subtrai — útil para cooldowns ou cronômetros."],
              ].map(([opcao, desc], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-xs">{opcao}</td>
                  <td className="p-3 text-muted-foreground text-sm">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Freeze com Hotkeys</h2>
        <p>
          Em vez de manter o freeze sempre ativo, configure um hotkey para ativar/desativar conforme necessário. Isso evita conflitos com mecânicas do jogo.
        </p>
        <CodeBlock
          title="Ativando freeze via hotkey no CE"
          language="text"
          code={`1. Na Address List, clique com botão direito no endereço
  2. Selecione "Set hotkeys" ou configure via menu Table → Hot Keys
  3. Atribua uma tecla (ex: F1) para ativar/desativar o freeze
  4. Durante o jogo, pressione F1 para congelar/descongelar o valor`}
        />

        <h2>Freeze via Lua Script</h2>
        <CodeBlock
          title="Freeze programático com Lua"
          language="lua"
          code={`-- Ativar freeze em todos os endereços com "Vida" no nome
  local al = getAddressList()
  for i = 0, al.Count - 1 do
    local rec = al.getMemoryRecord(i)
    if rec.Description:find("Vida") then
      rec.Value = "9999"
      rec.Active = true
      print("Freeze ativado: " .. rec.Description)
    end
  end`}
        />

        <AlertBox type="warning" title="Freeze pode travar o jogo?">
          Em alguns jogos, travar certos valores pode causar bugs ou comportamentos inesperados. Por exemplo, travar o tempo de recarga de uma habilidade em 0 pode quebrar animações. Travar saúde do inimigo pode tornar o jogo impossível de completar. Teste com cuidado.
        </AlertBox>

        <AlertBox type="tip" title="Dica — Freeze Seletivo">
          Não congele todos os valores ao mesmo tempo. Ative o freeze apenas para os valores essenciais e desative para os demais. Isso mantém a jogabilidade mais natural e reduz a chance de bugs.
        </AlertBox>

        <h2>Casos de Uso Comuns</h2>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          {[
            { caso: "Vida Infinita", desc: "Trave a vida no valor máximo. Defina o valor para 100 (ou o máximo do jogo) antes de ativar." },
            { caso: "Munição Infinita", desc: "Trave a munição atual e a do carregador. Pode ser necessário dois endereços diferentes." },
            { caso: "Dinheiro/Ouro", desc: "Trave em um valor alto. Mas cuidado — transações que verificam saldo antes de gastar podem falhar." },
            { caso: "Tempo de Partida", desc: "Trave o cronômetro para parar o tempo. Funciona bem em jogos com limite de tempo." },
          ].map((item) => (
            <div key={item.caso} className="border border-border rounded-xl p-4 bg-card">
              <h4 className="font-bold text-sm mb-1 text-primary">{item.caso}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </PageContainer>
    );
  }
  