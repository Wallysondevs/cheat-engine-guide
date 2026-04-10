import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Registradores() {
    return (
      <PageContainer
        title="Registradores do Processador"
        subtitle="Entenda EAX, EBX, ECX e outros registradores — elementos fundamentais do Assembly e do Cheat Engine."
        difficulty="intermediário"
        timeToRead="12 min"
      >
        <p>
          Registradores são variáveis ultra-rápidas dentro do processador. Quando o Cheat Engine pausa um processo em um breakpoint, você pode ver e modificar todos os registradores em tempo real — essencial para cheats avançados de Assembly.
        </p>

        <h2>Registradores x86 (32 bits)</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Registrador</th>
                <th className="p-3 text-left">Nome completo</th>
                <th className="p-3 text-left">Uso principal</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["EAX", "Accumulator", "Resultado de operações e retorno de funções"],
                ["EBX", "Base", "Ponteiro para dados e estruturas"],
                ["ECX", "Counter", "Contador em loops e 1º parâmetro (fastcall)"],
                ["EDX", "Data", "Operações de multiplicação/divisão, I/O"],
                ["ESI", "Source Index", "Ponteiro de origem em operações de memória"],
                ["EDI", "Destination Index", "Ponteiro de destino em operações de memória"],
                ["EBP", "Base Pointer", "Base do stack frame da função atual"],
                ["ESP", "Stack Pointer", "Topo da pilha de execução (cuidado ao modificar!)"],
                ["EIP", "Instruction Pointer", "Endereço da próxima instrução (somente leitura)"],
              ].map(([reg, nome, uso], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-sm font-bold">{reg}</td>
                  <td className="p-3 text-sm">{nome}</td>
                  <td className="p-3 text-muted-foreground text-sm">{uso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Registradores x64 (64 bits)</h2>
        <CodeBlock
          title="Registradores em modo 64-bit"
          language="asm"
          code={`; Os registradores x86 existem em x64 com prefixo R:
  RAX, RBX, RCX, RDX, RSI, RDI, RBP, RSP (64 bits)

  ; Novos registradores em x64:
  R8, R9, R10, R11, R12, R13, R14, R15

  ; Subregistradores de RAX como exemplo:
  RAX   ; 64 bits completos
  EAX   ; 32 bits baixos de RAX
  AX    ; 16 bits baixos
  AL    ; 8 bits baixos
  AH    ; 8 bits altos de AX`}
        />

        <h2>Flags do Processador (EFLAGS)</h2>
        <p>
          O registrador de flags (EFLAGS/RFLAGS) contém bits que indicam o resultado das operações. O CE permite ver e modificar flags individualmente no debugger:
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Flag</th>
                <th className="p-3 text-left">Bit</th>
                <th className="p-3 text-left">Significado</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["CF", "0", "Carry Flag — overflow de operação sem sinal"],
                ["ZF", "6", "Zero Flag — resultado foi zero (ou igualdade em cmp)"],
                ["SF", "7", "Sign Flag — resultado foi negativo"],
                ["OF", "11", "Overflow Flag — overflow de operação com sinal"],
                ["DF", "10", "Direction Flag — direção de operações de string"],
              ].map(([flag, bit, sig], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-sm font-bold">{flag}</td>
                  <td className="p-3 font-mono text-sm">{bit}</td>
                  <td className="p-3 text-muted-foreground text-sm">{sig}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Modificando Registradores no CE</h2>
        <CodeBlock
          title="Como modificar registradores em tempo real"
          language="text"
          code={`1. Abra o Memory View (Ctrl+M)
  2. Clique em Debug → Toggle Breakpoint (ou F5 em um endereço)
  3. Execute o jogo até o breakpoint ser atingido
  4. No painel de registradores (direita superior), clique duplo em qualquer valor
  5. Digite o novo valor — o jogo continuará com o registrador modificado

  Exemplo prático:
  - Se EAX contém os danos que você vai receber (visto pelo debugger)
  - Modifique EAX = 0 antes de continuar → você não recebe dano`}
        />

        <AlertBox type="tip" title="Dica — Modificar ZF para Pular Condições">
          Quando o jogo executa um salto condicional (JE, JNE, JZ, JNZ), você pode modificar o Zero Flag (ZF) para forçar o caminho que quiser. ZF=1 faz JE/JZ saltar; ZF=0 faz JNE/JNZ saltar.
        </AlertBox>
      </PageContainer>
    );
  }
  