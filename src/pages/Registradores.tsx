import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Registradores() {
  return (
    <PageContainer
      title="Registradores"
      subtitle="Entenda os registradores do CPU e como lê-los no contexto de engenharia reversa."
      difficulty="intermediário"
      timeToRead="8 min"
    >
      <h2>Registradores Principais (x86 — 32 bits)</h2>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-muted text-left">
              <th className="border border-border px-3 py-2">Registrador</th>
              <th className="border border-border px-3 py-2">Nome</th>
              <th className="border border-border px-3 py-2">Uso Típico em Jogos</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["EAX", "Accumulator", "Valor de retorno de funções, cálculos aritméticos"],
              ["EBX", "Base", "Endereço base de estruturas de dados"],
              ["ECX", "Counter", "Contador de loops, 'this' em C++ (objetos)"],
              ["EDX", "Data", "Dados auxiliares, divisões de 64 bits"],
              ["ESI", "Source Index", "Ponteiro para estrutura do jogador/entidade"],
              ["EDI", "Destination Index", "Ponteiro de destino em operações de cópia"],
              ["ESP", "Stack Pointer", "Topo da pilha de execução"],
              ["EBP", "Base Pointer", "Base do frame atual da pilha"],
              ["EIP", "Instruction Pointer", "Próxima instrução a ser executada"],
            ].map(([reg, nome, uso], i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                <td className="border border-border px-3 py-2 font-mono text-primary">{reg}</td>
                <td className="border border-border px-3 py-2 text-sm">{nome}</td>
                <td className="border border-border px-3 py-2 text-sm text-muted-foreground">{uso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Registradores x64 (64 bits)</h2>
      <p>
        Em jogos de 64 bits, os registradores têm o prefixo <strong>R</strong> em vez de <strong>E</strong>: RAX, RBX, RCX, RDX, RSI, RDI, RSP, RBP, RIP. Além disso, há registradores extras: R8, R9, R10, R11, R12, R13, R14, R15.
      </p>
      <p>
        Em x64, os primeiros argumentos de função são passados por registradores:
      </p>
      <ul>
        <li><strong>RCX:</strong> primeiro argumento (frequentemente o ponteiro "this" do objeto)</li>
        <li><strong>RDX:</strong> segundo argumento</li>
        <li><strong>R8:</strong> terceiro argumento</li>
        <li><strong>R9:</strong> quarto argumento</li>
      </ul>

      <AlertBox type="tip" title="Dica Prática">
        Quando o breakpoint para em uma função e você vê <code>mov [ecx+4C], eax</code>, geralmente ECX (ou RCX em 64 bits) é o ponteiro para o objeto (personagem, entidade). Anote esse valor — é provavelmente o que você precisa para encontrar o ponteiro estático.
      </AlertBox>
    </PageContainer>
  );
}
