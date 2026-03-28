import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function Assembly() {
  return (
    <PageContainer
      title="Fundamentos de Assembly"
      subtitle="A linguagem que o processador entende — base para qualquer modificação avançada com o Cheat Engine."
      difficulty="intermediário"
      timeToRead="18 min"
    >
      <AlertBox type="info" title="Por que aprender Assembly?">
        O Cheat Engine usa Assembly (x86/x64) para injetar código em processos. Entender os conceitos básicos te permite criar cheats precisos, ler o que o jogo realmente faz na memória e modificar comportamentos sem quebrar o executável.
      </AlertBox>

      <h2>O que é Assembly?</h2>
      <p>
        Assembly é a linguagem mais próxima do código de máquina. Cada instrução corresponde diretamente
        a uma operação do processador — mover dados, somar, comparar, pular para outro endereço.
        No contexto do Cheat Engine, você escreve Assembly para substituir ou complementar instruções
        do jogo em tempo real.
      </p>
      <ul>
        <li><strong>x86</strong> — Processos de 32 bits (a maioria dos jogos antigos)</li>
        <li><strong>x64</strong> — Processos de 64 bits (jogos modernos)</li>
        <li>O CE suporta os dois modos automaticamente</li>
      </ul>

      <h2>Registradores</h2>
      <p>
        Registradores são variáveis ultra-rápidas dentro do processador. Em x86 existem registradores
        de 32 bits; em x64 eles são estendidos para 64 bits e novos são adicionados.
      </p>

      <h3>Registradores de Uso Geral (x86 — 32 bits)</h3>
      <CodeBlock
        title="Registradores principais — x86"
        language="asm"
        code={`
EAX  ; Acumulador — resultado de operações aritméticas, valor de retorno de funções
EBX  ; Base — ponteiro para dados/estruturas
ECX  ; Contador — loops, parâmetros de funções (stdcall)
EDX  ; Dado — operações de divisão, multiplicação, I/O

ESI  ; Source Index — ponteiro de origem em operações de memória
EDI  ; Destination Index — ponteiro de destino
EBP  ; Base Pointer — base do stack frame atual
ESP  ; Stack Pointer — topo da pilha (não mexa sem cuidado!)

EIP  ; Instruction Pointer — endereço da próxima instrução (read-only)
        `}
      />

      <h3>Registradores em x64 (64 bits)</h3>
      <CodeBlock
        title="Registradores x64"
        language="asm"
        code={`
; Os mesmos registradores x86, mas com prefixo R e 64 bits:
RAX, RBX, RCX, RDX, RSI, RDI, RBP, RSP

; Novos registradores adicionados no x64:
R8, R9, R10, R11, R12, R13, R14, R15

; Subregistradores — partes menores de RAX, por exemplo:
RAX  ; 64 bits (bits 0–63)
EAX  ; 32 bits baixos (bits 0–31)
AX   ; 16 bits baixos (bits 0–15)
AL   ; 8 bits baixos (bits 0–7)
AH   ; 8 bits altos de AX (bits 8–15)
        `}
      />

      <AlertBox type="tip" title="Dica — Ver registradores no CE">
        No Cheat Engine, abra o Memory View e clique em <strong>View → Registers</strong> (ou pressione <kbd>Ctrl+R</kbd> no debugger). Você vê o valor de todos os registradores em tempo real quando o processo está pausado em um breakpoint.
      </AlertBox>

      <h2>Instruções Fundamentais</h2>

      <h3>MOV — Mover dados</h3>
      <p>A instrução mais usada. Copia um valor de uma origem para um destino.</p>
      <CodeBlock
        title="MOV — exemplos"
        language="asm"
        code={`
mov eax, 100          ; eax = 100 (valor imediato)
mov eax, ebx          ; eax = ebx (registrador → registrador)
mov eax, [ebx]        ; eax = valor na memória apontada por ebx
mov [ebx], eax        ; memória[ebx] = eax
mov eax, [ebx+4C]     ; eax = memória[ebx + 0x4C] (offset em hex)
mov dword ptr [ebx], 999  ; escreve 999 (4 bytes) no endereço ebx
        `}
      />

      <AlertBox type="warning" title="Atenção — Tamanho dos dados">
        Sempre indique o tamanho ao acessar memória quando não for óbvio:
        <br /><code>byte ptr</code> = 1 byte &nbsp;|&nbsp;
        <code>word ptr</code> = 2 bytes &nbsp;|&nbsp;
        <code>dword ptr</code> = 4 bytes &nbsp;|&nbsp;
        <code>qword ptr</code> = 8 bytes (x64)
      </AlertBox>

      <h3>Aritmética</h3>
      <CodeBlock
        title="Operações aritméticas"
        language="asm"
        code={`
add eax, 50          ; eax = eax + 50
sub eax, 10          ; eax = eax - 10
mul ecx              ; edx:eax = eax * ecx  (resultado em 2 registradores)
div ecx              ; eax = eax / ecx  |  edx = resto
inc eax              ; eax = eax + 1  (mais rápido que add eax, 1)
dec eax              ; eax = eax - 1
neg eax              ; eax = -eax  (inverte sinal)

; Vida Infinita simples:
add [esi+4C], 100    ; adiciona 100 de vida a cada frame
        `}
      />

      <h3>Operações de Bit</h3>
      <CodeBlock
        title="AND, OR, XOR, NOT, SHL, SHR"
        language="asm"
        code={`
and eax, 0xFF        ; zera todos os bits exceto os 8 menos significativos
or  eax, 0x80        ; liga o bit 7 de eax
xor eax, eax         ; eax = 0 (forma rápida de zerar um registrador)
not eax              ; inverte todos os bits

shl eax, 1           ; desloca bits à esquerda (multiplica por 2)
shr eax, 2           ; desloca à direita (divide por 4)

; Exemplo real: verificar se um flag está ativo
test eax, 0x01       ; verifica bit 0 (não altera eax, apenas flags)
jnz flag_ativo       ; se bit 0 = 1, pula para flag_ativo
        `}
      />

      <h2>Comparações e Saltos</h2>
      <p>
        Assembly não tem <code>if/else</code>. Em vez disso, você compara valores com <code>CMP</code>
        ou <code>TEST</code> e depois salta com instruções de jump condicionais.
      </p>

      <CodeBlock
        title="CMP e saltos condicionais"
        language="asm"
        code={`
; CMP faz uma subtração sem salvar o resultado, apenas atualiza as flags
cmp eax, 100         ; compara eax com 100

; Saltos após CMP (signed — com sinal):
je  destino          ; jump if equal           (eax == 100)
jne destino          ; jump if not equal       (eax != 100)
jg  destino          ; jump if greater         (eax >  100)
jge destino          ; jump if greater/equal   (eax >= 100)
jl  destino          ; jump if less            (eax <  100)
jle destino          ; jump if less/equal      (eax <= 100)

; Saltos após CMP (unsigned — sem sinal):
ja  destino          ; above (>)
jae destino          ; above or equal (>=)
jb  destino          ; below (<)
jbe destino          ; below or equal (<=)

; Salto incondicional:
jmp destino          ; sempre pula

; Exemplo: se vida <= 0, seta para 1
cmp dword ptr [esi+4C], 0
jg vida_ok
mov dword ptr [esi+4C], 1
vida_ok:
        `}
      />

      <h2>A Pilha (Stack)</h2>
      <p>
        A pilha é uma região de memória LIFO (último a entrar, primeiro a sair). É usada para
        passar argumentos para funções e salvar/restaurar registradores.
      </p>
      <CodeBlock
        title="PUSH, POP, CALL, RET"
        language="asm"
        code={`
push eax             ; empilha eax (ESP -= 4, memória[ESP] = eax)
push ebx             ; empilha ebx
pop  ebx             ; desempilha em ebx (ebx = memória[ESP], ESP += 4)
pop  eax             ; desempilha em eax

; CALL — chama uma função (empilha endereço de retorno e pula)
call MinhaFuncao

; RET — retorna de uma função (desempilha endereço de retorno e pula)
ret

; Regra de ouro: todo PUSH precisa de um POP correspondente.
; Desbalancear a pilha causa crash imediato!
        `}
      />

      <AlertBox type="error" title="Erro clássico — Pilha desbalanceada">
        Esquecer um <code>POP</code> correspondente ao seu <code>PUSH</code> vai corromper o stack
        e causar um crash instantâneo no jogo. Sempre que empilhar registradores no início do seu código,
        desempilhe-os na mesma ordem inversa antes do <code>jmp retornar</code>.
      </AlertBox>

      <h2>Preservando Registradores em Code Caves</h2>
      <p>
        Quando você injeta código, o jogo não sabe que seu código está rodando. Se você modificar
        registradores que o jogo espera intactos, vai causar comportamento estranho ou crash.
        A convenção é salvar e restaurar todos os registradores que você usa:
      </p>
      <CodeBlock
        title="Code cave com preservação correta"
        language="asm"
        code={`
[ENABLE]
alloc(cave, 256)
label(retornar)
label(original)

cave:
  pushad               ; salva TODOS os registradores de uso geral (EAX–EDI)
  pushfd               ; salva as flags do processador

  ; Seu código aqui — use registradores à vontade
  mov eax, [esi+4C]    ; lê vida atual
  add eax, 999         ; adiciona 999
  mov [esi+4C], eax    ; escreve de volta

  popfd                ; restaura flags
  popad                ; restaura registradores

  ; Instrução original que foi substituída pelo JMP:
  original:
  db 89 46 4C          ; (bytes originais — veja no disassembler)

  jmp retornar

; Substitui a instrução original por um JMP para a cave:
00A1B230:
  jmp cave
  nop                  ; preenche bytes restantes se necessário
retornar:

[DISABLE]
00A1B230:
  db 89 46 4C          ; restaura bytes originais
dealloc(cave)
        `}
      />

      <h2>Endereçamento de Memória</h2>
      <p>
        O modo de endereçamento mais importante para o CE. Você acessa campos de uma estrutura usando
        um registrador como ponteiro base e um offset:
      </p>
      <CodeBlock
        title="Padrões de endereçamento comuns"
        language="asm"
        code={`
; Sintaxe: [base + índice * escala + deslocamento]

[esi + 4C]           ; estrutura em ESI, offset 0x4C (vida, por exemplo)
[eax + ecx*4]        ; array: eax = base, ecx = índice, 4 = tamanho do elemento
[ebp - 8]            ; variável local na pilha (offset negativo de EBP)
[00A1B230]           ; endereço absoluto (ponteiro estático)

; Exemplos reais:
mov eax, [esi + 0x4C]   ; vida do jogador (esi aponta p/ struct do jogador)
mov ecx, [ecx + 0x10]   ; ponteiro de segundo nível
cmp [eax + ecx*4], 0    ; elemento de um array de inteiros
        `}
      />

      <h2>NOP — Anular Instruções</h2>
      <p>
        <code>NOP</code> (No Operation) é a instrução que não faz nada. É usada para anular
        instruções do jogo sem quebrar o tamanho do código:
      </p>
      <CodeBlock
        title="NOP para desativar dano"
        language="asm"
        code={`
; Instrução original que subtrai dano:
; sub [esi+4C], eax   → bytes: 29 46 4C  (3 bytes)

[ENABLE]
00A1B230:
  nop                  ; substitui os 3 bytes por 3 NOPs
  nop
  nop

[DISABLE]
00A1B230:
  db 29 46 4C          ; restaura instrução original

; O CE também aceita a diretiva nop em quantidade:
; nop 6                ; insere 6 bytes de NOP de uma vez
        `}
      />

      <h2>Resumo Visual das Instruções Mais Usadas no CE</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse border border-border">
          <thead>
            <tr className="bg-muted text-muted-foreground text-xs uppercase tracking-wide">
              <th className="border border-border px-3 py-2 text-left">Instrução</th>
              <th className="border border-border px-3 py-2 text-left">Função</th>
              <th className="border border-border px-3 py-2 text-left">Uso no CE</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["MOV dst, src", "Copia valor", "Ler/escrever vida, mana, dinheiro"],
              ["ADD dst, val", "Soma", "Adicionar itens, vida infinita"],
              ["SUB dst, val", "Subtrai", "Analisar onde dano é aplicado"],
              ["CMP a, b", "Compara (flags)", "Verificar condições antes de agir"],
              ["JE / JNE / JG", "Salto condicional", "Controlar fluxo do cheat"],
              ["JMP destino", "Salto incondicional", "Redirecionar para code cave"],
              ["NOP", "Não faz nada", "Anular instruções do jogo"],
              ["PUSH / POP", "Pilha", "Salvar/restaurar registradores"],
              ["PUSHAD / POPAD", "Salva todos regs", "Obrigatório em code caves"],
              ["CALL endereço", "Chama função", "Invocar funções do jogo"],
            ].map(([inst, fn, uso]) => (
              <tr key={inst} className="hover:bg-accent/30 transition-colors">
                <td className="border border-border px-3 py-1.5 font-mono text-primary text-xs">{inst}</td>
                <td className="border border-border px-3 py-1.5">{fn}</td>
                <td className="border border-border px-3 py-1.5 text-muted-foreground">{uso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertBox type="tip" title="Próximo passo">
        Com esses fundamentos, você está pronto para usar o <strong>Auto-Assemble</strong> do Cheat Engine.
        Lá você vai usar tudo isso na prática — escrever, compilar e injetar seu Assembly diretamente em jogos rodando.
      </AlertBox>
    </PageContainer>
  );
}
