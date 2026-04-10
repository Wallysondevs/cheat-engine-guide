import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Disassembler() {
    return (
      <PageContainer
        title="Disassembler"
        subtitle="Como ler e interpretar o código Assembly de um jogo usando o disassembler integrado do CE."
        difficulty="avançado"
        timeToRead="14 min"
      >
        <p>
          O disassembler do Cheat Engine converte código de máquina (bytes) em instruções Assembly legíveis. É a ferramenta usada para entender o que o jogo está fazendo internamente — essencial para injeção de código e engenharia reversa.
        </p>

        <h2>Acessando o Disassembler</h2>
        <CodeBlock
          title="Como abrir o disassembler"
          language="text"
          code={`Ctrl+M → Memory View → painel superior é o disassembler
  Ou: clique direito em endereço → "Find out what writes" → "Show disassembler"
  Ou: clique em um endereço na Address List → Ctrl+M direto para aquele endereço`}
        />

        <h2>Lendo o Disassembler</h2>
        <CodeBlock
          title="Exemplo de saída do disassembler"
          language="asm"
          code={`; Endereço   | Bytes (hex)      | Instrução Assembly
  00A1F230     | 83 E8 0A         | SUB EAX, 0A           ; vida -= 10
  00A1F233     | 89 83 4C 00 00 00| MOV [EBX+4C], EAX     ; salva na memória
  00A1F239     | 85 C0            | TEST EAX, EAX         ; verifica se é zero
  00A1F23B     | 7E 0A            | JLE 00A1F247          ; pula se vida <= 0
  00A1F23D     | E8 AA BB CC DD   | CALL 00FFDDEF         ; chama função de update`}
        />

        <h2>Instruções Assembly Mais Comuns</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Instrução</th>
                <th className="p-3 text-left">Significado</th>
                <th className="p-3 text-left">Exemplo</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["MOV dst, src", "Copia valor de src para dst", "MOV EAX, [EBX+4C]"],
                ["SUB dst, val", "Subtrai val de dst", "SUB EAX, 10 (vida -= 10)"],
                ["ADD dst, val", "Soma val a dst", "ADD EAX, 10 (vida += 10)"],
                ["CMP a, b", "Compara dois valores (define flags)", "CMP EAX, 0 (vida == 0?)"],
                ["JE / JZ addr", "Pula se igual / se zero", "JE 00A1F250 (se vida=0)"],
                ["JNE / JNZ addr", "Pula se diferente / não-zero", "JNE 00A1F240"],
                ["JLE addr", "Pula se menor ou igual", "JLE morte (se vida<=0)"],
                ["CALL addr", "Chama uma função", "CALL calcularDano"],
                ["RET", "Retorna da função atual", "RET ou RET 8"],
                ["NOP", "Não faz nada (No Operation)", "Substitui instruções para desabilitar"],
                ["PUSH val", "Empurra valor na pilha", "PUSH EAX"],
                ["POP reg", "Retira valor da pilha", "POP EAX"],
              ].map(([inst, sig, ex], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-xs">{inst}</td>
                  <td className="p-3 text-sm">{sig}</td>
                  <td className="p-3 font-mono text-muted-foreground text-xs">{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Operações Comuns no Disassembler</h2>
        <CodeBlock
          title="Ações do menu de contexto"
          language="text"
          code={`Clique direito no disassembler:
  - "Replace with code that does nothing (NOP)" → desabilita a instrução
  - "Assemble" → escreva sua própria instrução Assembly
  - "Toggle Breakpoint (F5)" → adiciona breakpoint na instrução
  - "Find references to this address" → onde esta instrução é chamada
  - "Go to address" (Ctrl+G) → navegar para endereço específico
  - "Copy selected to clipboard" → copiar bytes para análise externa`}
        />

        <AlertBox type="tip" title="NOP para Desabilitar Dano">
          Uma das técnicas mais simples: encontre a instrução SUB que reduz a vida → clique direito → NOP. O jogo nunca mais executará aquela instrução e você não perde vida. Lembre de restaurar depois.
        </AlertBox>

        <AlertBox type="info" title="x86 vs x64 no Disassembler">
          O CE detecta automaticamente se o processo é 32-bit (x86) ou 64-bit (x64). No x64, os registradores são RAX, RBX... e alguns padrões de código mudam. O disassembler adapta a leitura automaticamente.
        </AlertBox>
      </PageContainer>
    );
  }
  