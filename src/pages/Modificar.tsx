import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Modificar() {
    return (
      <PageContainer
        title="Modificar Valores"
        subtitle="Como alterar valores na memória de forma pontual, contínua e com precisão cirúrgica."
        difficulty="iniciante"
        timeToRead="10 min"
      >
        <h2>Modificação Pontual</h2>
        <p>
          A forma mais simples de modificar um valor é dar um duplo clique na coluna <strong>Value</strong> do endereço na lista de endereços. Uma caixa de diálogo aparece, você digita o novo valor e confirma com Enter. O jogo reflete a mudança imediatamente (se for o endereço correto).
        </p>

        <h2>Modificar na Lista de Resultados</h2>
        <p>
          Antes mesmo de adicionar um endereço à Address List, você pode modificar valores diretamente na lista de resultados da varredura. Selecione um ou mais endereços, clique com botão direito e escolha <strong>"Change value of selected addresses"</strong>.
        </p>

        <AlertBox type="tip" title="Modificar Múltiplos de Uma Vez">
          Selecione vários endereços com <kbd>Ctrl+Click</kbd> e depois clique com botão direito → "Change value" para modificar todos de uma vez. Útil quando você tem múltiplos candidatos e quer testar qual é o correto.
        </AlertBox>

        <h2>Opções de Modificação</h2>
        <p>No diálogo de modificação de valor, você tem três modos:</p>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
          {[
            { titulo: "Set value to", desc: "Define o valor exatamente como você digitou. Substitui completamente o valor atual.", ex: "Ex: definir vida = 9999" },
            { titulo: "Add to value", desc: "Soma o número digitado ao valor atual. Útil para incrementar pontos ou recursos.", ex: "Ex: adicionar +500 de ouro" },
            { titulo: "Subtract from value", desc: "Subtrai o número digitado do valor atual. Útil para diminuir penalidades ou cooldowns.", ex: "Ex: reduzir tempo de espera" },
          ].map((item) => (
            <div key={item.titulo} className="border border-border rounded-xl p-4 bg-card">
              <h4 className="font-bold text-sm mb-1">{item.titulo}</h4>
              <p className="text-xs text-muted-foreground mb-2">{item.desc}</p>
              <code className="text-xs text-primary">{item.ex}</code>
            </div>
          ))}
        </div>

        <h2>Modificar Tipos de Dados Diferentes</h2>
        <p>
          Cada tipo de dado aceita formatos diferentes no diálogo de modificação:
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Tipo</th>
                <th className="p-3 text-left">Formato aceito</th>
                <th className="p-3 text-left">Exemplo</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Integer (4 Bytes)", "Número inteiro", "9999, -1, 0"],
                ["Float", "Número decimal (ponto)", "1.5, 99.9, 0.0"],
                ["Double", "Decimal maior precisão", "3.14159265"],
                ["String", "Texto entre aspas", "PlayerName"],
                ["Byte Array", "Bytes em hex", "FF A0 00 4E"],
              ].map(([tipo, fmt, ex], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-xs">{tipo}</td>
                  <td className="p-3 text-sm">{fmt}</td>
                  <td className="p-3 font-mono text-xs text-muted-foreground">{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Atalhos de Modificação Rápida</h2>
        <p>
          Ao selecionar um endereço na Address List, você pode usar atalhos de teclado para modificação rápida:
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Ação</th>
                <th className="p-3 text-left">Como fazer</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Alterar valor", "Duplo clique na coluna Value OU Enter com endereço selecionado"],
                ["Ativar/desativar freeze", "Clique no checkbox da coluna Active OU Espaço com seleção"],
                ["Alterar endereço", "Duplo clique na coluna Address"],
                ["Alterar descrição", "Duplo clique na coluna Description"],
                ["Apagar da lista", "Delete com endereço selecionado"],
              ].map(([acao, como], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-medium text-sm">{acao}</td>
                  <td className="p-3 text-muted-foreground text-sm">{como}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Modificação via Script (avançado)</h2>
        <p>
          Para modificações condicionais ou automáticas, use o Lua do Cheat Engine:
        </p>
        <CodeBlock
          title="Modificar valor via Lua"
          language="lua"
          code={`-- Encontrar e modificar um endereço diretamente
  local addr = getAddressList().getMemoryRecordByDescription("Vida")
  if addr then
    addr.Value = "9999"  -- Define o valor
    addr.Active = true   -- Ativa o freeze
  end`}
        />

        <AlertBox type="warning" title="Cuidado com Valores de Ponto Flutuante">
          Se o jogo usa Float ou Double para armazenar a vida/stamina, tentar definir valores muito altos (como 999999) pode causar overflow. Prefira valores dentro do intervalo normal do jogo (ex: 100.0 para barra cheia).
        </AlertBox>
      </PageContainer>
    );
  }
  