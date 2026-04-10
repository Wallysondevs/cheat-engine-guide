import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Breakpoints() {
    return (
      <PageContainer
        title="Breakpoints"
        subtitle="Como pausar a execução do jogo em pontos específicos para inspecionar e modificar valores em tempo real."
        difficulty="intermediário"
        timeToRead="12 min"
      >
        <p>
          Breakpoints (pontos de parada) pausam a execução do jogo quando uma condição específica é atendida — como quando o jogo acessa ou modifica um endereço de memória. São essenciais para entender como o jogo funciona internamente.
        </p>

        <h2>Tipos de Breakpoints</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Tipo</th>
                <th className="p-3 text-left">Quando pausa</th>
                <th className="p-3 text-left">Uso</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Software Breakpoint", "Quando a execução chega a uma instrução Assembly específica", "Debugging de código — ver o estado na hora exata de uma instrução"],
                ["Hardware Breakpoint (Access)", "Quando qualquer código lê OU escreve em um endereço de memória", "Descobrir quem acessa um valor"],
                ["Hardware Breakpoint (Write)", "Quando qualquer código escreve em um endereço de memória", "Descobrir o que modifica a vida, XP, etc."],
                ["Hardware Breakpoint (Execute)", "Quando o código em um endereço é executado", "Breakpoint em código sem modificar a memória"],
              ].map(([tipo, quando, uso], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-medium text-sm text-primary">{tipo}</td>
                  <td className="p-3 text-sm">{quando}</td>
                  <td className="p-3 text-muted-foreground text-sm">{uso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Adicionando Breakpoints</h2>
        <h3>Breakpoint em Endereço de Memória</h3>
        <CodeBlock
          title="Definir breakpoint via Address List"
          language="text"
          code={`1. Encontre o endereço do valor (ex: vida do personagem)
  2. Clique com botão direito → "Find out what writes to this address"
  3. Uma janela de debug se abre — configure o tipo: Write
  4. Interaja com o jogo para fazer o valor mudar
  5. O CE pausará automaticamente e mostrará a instrução responsável`}
        />

        <h3>Breakpoint no Disassembler</h3>
        <CodeBlock
          title="Definir breakpoint em instrução Assembly"
          language="text"
          code={`1. Abra o Memory View (Ctrl+M)
  2. Navegue até o endereço da instrução (Ctrl+G)
  3. Clique na instrução desejada
  4. Pressione F5 para toggle breakpoint
     (ou: clique na margem esquerda — aparece um ponto vermelho)
  5. O CE pausará quando a instrução for executada`}
        />

        <h2>O que fazer quando o breakpoint é atingido</h2>
        <div className="not-prose grid grid-cols-1 gap-3 my-4">
          {[
            { acao: "Ver registradores", desc: "O painel direito mostra EAX, EBX, ECX... Você vê exatamente quais valores o código está operando." },
            { acao: "Ver Stack", desc: "O painel inferior direito mostra a pilha de chamadas — você vê quais funções chamaram este código." },
            { acao: "Modificar valores", desc: "Duplo clique em qualquer registrador para alterar seu valor antes de continuar." },
            { acao: "Step Over (F8)", desc: "Executa a instrução atual e para na próxima. Não entra em funções chamadas." },
            { acao: "Step Into (F7)", desc: "Executa a instrução atual. Se for CALL, entra na função chamada." },
            { acao: "Run (F9)", desc: "Continua a execução normalmente até o próximo breakpoint." },
          ].map((item) => (
            <div key={item.acao} className="flex gap-3 p-3 border border-border rounded-xl bg-card">
              <span className="text-primary font-mono text-sm min-w-32 font-bold">{item.acao}</span>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <AlertBox type="warning" title="Breakpoints pausam o jogo inteiro">
          Quando um breakpoint é atingido, todo o processo para. Em jogos online, isso pode causar timeout e desconexão. Use breakpoints apenas em jogos single-player ou em um ambiente seguro.
        </AlertBox>

        <AlertBox type="tip" title="Dica — Conditional Breakpoints">
          No Cheat Engine, você pode adicionar uma condição ao breakpoint. Por exemplo: só pausar se EAX == 0 (quando o dano seria zero). Isso evita pausas desnecessárias quando a instrução é executada em outros contextos.
        </AlertBox>
      </PageContainer>
    );
  }
  