import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Interface() {
    return (
      <PageContainer
        title="Interface do Cheat Engine"
        subtitle="Conheça todos os elementos da interface principal do CE e o que cada um faz."
        difficulty="iniciante"
        timeToRead="10 min"
      >
        <p>
          A interface principal do Cheat Engine pode parecer intimidadora no início, mas é organizada de forma lógica. Entender cada elemento vai tornar seu trabalho muito mais eficiente.
        </p>

        <h2>Área Superior — Seleção de Processo</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Elemento</th>
                <th className="p-3 text-left">Função</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Ícone de computador (canto superior esq.)", "Abre a lista de processos para anexar o CE a um programa"],
                ["Campo de processo", "Mostra o processo atual anexado. Ex: 'game.exe (1234)'"],
                ["Enable Speedhack", "Checkbox para ativar o speed hack + campo do multiplicador de velocidade"],
                ["Botão Apply", "Aplica as mudanças do speed hack (velocidade)"],
              ].map(([el, func], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-medium text-sm">{el}</td>
                  <td className="p-3 text-muted-foreground text-sm">{func}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Painel Central — Configuração de Scan</h2>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          {[
            { el: "Value", desc: "O valor que você quer buscar. Pode ser número, texto ou hexadecimal." },
            { el: "Scan Type", desc: "Tipo de comparação: Exact Value, Bigger than, Changed, Unchanged, etc." },
            { el: "Value Type", desc: "Formato do dado: 4 Bytes (int), Float, Double, String, Array of Bytes, etc." },
            { el: "First Scan", desc: "Inicia a primeira varredura — varre toda a memória do processo." },
            { el: "Next Scan", desc: "Filtra os resultados anteriores com o novo critério." },
            { el: "Undo Scan", desc: "Desfaz a última scan e volta ao estado anterior." },
            { el: "New Scan", desc: "Limpa todos os resultados e começa do zero." },
            { el: "Stop Scan", desc: "Interrompe uma varredura em andamento." },
          ].map((item) => (
            <div key={item.el} className="border border-border rounded-xl p-3 bg-card">
              <h4 className="font-bold text-sm mb-1 text-primary">{item.el}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2>Painel Inferior — Address List</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Coluna</th>
                <th className="p-3 text-left">Descrição</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Active (checkbox)", "Ativa o freeze do endereço quando marcado"],
                ["Description", "Nome que você dá para identificar o endereço"],
                ["Address", "Localização na memória (verde = estático, preto = dinâmico)"],
                ["Type", "Tipo do dado armazenado naquele endereço"],
                ["Value", "Valor atual — atualiza em tempo real"],
              ].map(([col, desc], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-sm">{col}</td>
                  <td className="p-3 text-muted-foreground text-sm">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Barra de Ferramentas e Menu</h2>
        <CodeBlock
          title="Itens de menu importantes"
          language="text"
          code={`File:
    Open Process       → Anexar ao processo (Ctrl+O)
    Load/Save Table    → Gerenciar tabelas .CT (Ctrl+L / Ctrl+S)

  View:
    Memory View        → Abre o Memory Viewer/Disassembler (Ctrl+M)
    Settings           → Configurações do CE

  Tools:
    Pointer Scanner    → Scanner de ponteiros
    Auto Assembler     → Editor de scripts Assembly (Ctrl+A)
    Lua Engine         → Console Lua interativo
    Dissect Data       → Analisa estruturas de memória
    Trainer Maker      → Cria trainers executáveis
    
  Table:
    Table Hot Keys     → Gerencia hotkeys globais (Ctrl+H)
    Show cheat table   → Mostra/esconde a tabela
    
  Help:
    Tutorial           → Tutorial integrado do CE`}
        />

        <AlertBox type="tip" title="Dica — Customize a Interface">
          Clique com botão direito na barra de ferramentas para personalizar quais botões são exibidos. Você também pode redimensionar os painéis arrastando a divisória entre a lista de resultados e a Address List.
        </AlertBox>
      </PageContainer>
    );
  }
  