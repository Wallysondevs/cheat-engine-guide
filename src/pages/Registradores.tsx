import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Registradores() {
    return (
      <PageContainer
        title="Registradores do Processador"
        subtitle="Entenda EAX, EBX, ECX e todos os outros — o vocabulário essencial para trabalhar com Assembly no Cheat Engine."
        difficulty="intermediário"
        timeToRead="18 min"
      >
        <h2>O que são registradores e por que importam no CE</h2>
        <p>
          Registradores são pequenas áreas de armazenamento dentro do próprio processador — muito mais rápidas que a RAM porque ficam fisicamente dentro do chip. Enquanto a RAM pode ter bilhões de bytes, um processador x86 tem apenas 8 registradores de uso geral (mais alguns especializados), cada um de 32 bits (4 bytes) em x86 ou 64 bits (8 bytes) em x64.
        </p>
        <p>
          No contexto do Cheat Engine, os registradores são fundamentais por dois motivos. Primeiro, quando você usa o debugger do CE para pausar um processo em um breakpoint, o CE exibe o estado atual de todos os registradores — você vê exatamente o que o processador está operando naquele momento, incluindo os valores que o jogo está calculando. Segundo, quando você escreve scripts de Auto Assembler ou Code Injection, você usa registradores para mover e operar dados — entender o que cada registrador faz é essencial para escrever código Assembly correto.
        </p>

        <h2>Os Registradores de Uso Geral em x86</h2>
        <p>
          Em x86 (32 bits), existem 8 registradores de uso geral, cada um de 32 bits (4 bytes). Embora sejam chamados de "uso geral", na prática cada um tem convenções de uso específicas que o compilador e as convenções de chamada de função (calling conventions) seguem:
        </p>
        <p>
          <strong>EAX (Accumulator):</strong> O registrador mais versátil. É o "acumulador" — resultado de operações aritméticas (ADD, SUB, IMUL, IDIV). Quando uma função retorna um valor (um inteiro ou ponteiro), esse valor sempre vem em EAX. Quando você vê "MOV EAX, [endereço]" seguido de "RET", a função está retornando o valor naquele endereço. Se você quiser checar o valor de retorno de uma função no debugger, olhe EAX depois da instrução CALL.
        </p>
        <p>
          <strong>EBX (Base):</strong> Convencionalmente usado como ponteiro para estruturas de dados. Em código de jogo, EBX frequentemente aponta para o objeto do personagem ou outro objeto importante. Quando você vê "MOV [EBX+0x4C], EAX", significa "armazene EAX no campo no offset 0x4C do objeto apontado por EBX". Identificar o que EBX aponta é a chave para encontrar toda a estrutura do objeto.
        </p>
        <p>
          <strong>ECX (Counter):</strong> O contador de loops. Instruções como LOOP e LOOPZ usam ECX implicitamente. Na convenção __fastcall (muito usada em C++), ECX recebe o primeiro parâmetro — frequentemente "this" (o ponteiro para o objeto em métodos de classe). Isso significa que ECX frequentemente aponta para o mesmo objeto que EBX em chamadas de método.
        </p>
        <p>
          <strong>EDX (Data):</strong> Usado em operações de multiplicação e divisão de 64 bits. IMUL de 32×32 bits produz resultado de 64 bits em EDX:EAX. Também carrega o segundo parâmetro em __fastcall. É mais genérico que os outros e serve como registrador auxiliar para cálculos.
        </p>
        <p>
          <strong>ESI (Source Index) e EDI (Destination Index):</strong> Originalmente criados para operações de string (MOVSB, MOVSW, MOVSD que copiam de [ESI] para [EDI]). Hoje são usados como ponteiros genéricos em qualquer operação de memória. ESI frequentemente aponta para "de onde você lê" e EDI "para onde você escreve" em operações de cópia.
        </p>
        <p>
          <strong>ESP (Stack Pointer):</strong> Aponta para o topo da pilha de execução. Cada vez que você chama uma função (CALL), o endereço de retorno é empurrado na pilha e ESP decrementa. Quando a função retorna (RET), ESP incrementa. <strong>Nunca modifique ESP arbitrariamente</strong> — isso vai certamente travar o processo.
        </p>
        <p>
          <strong>EBP (Base Pointer):</strong> Aponta para a base do stack frame da função atual. Parâmetros de função ficam em [EBP+8], [EBP+0xC], etc. Variáveis locais ficam em [EBP-4], [EBP-8], etc. Modificar EBP tem consequências menos catastróficas que ESP mas ainda pode confundir o retorno de funções.
        </p>

        <h2>Subregistradores — Acessando Partes Menores</h2>
        <CodeBlock
          title="Como cada registrador de 32 bits é subdividido"
          language="asm"
          code={`; EAX — 32 bits completos (bits 0 a 31)
  ; AX  — 16 bits baixos de EAX (bits 0 a 15)
  ; AL  — 8 bits baixos de AX (bits 0 a 7)  → byte baixo
  ; AH  — 8 bits altos de AX (bits 8 a 15)  → byte alto

  ; Exemplos:
  MOV EAX, 0x12345678   ; EAX = 0x12345678
                         ; AX  = 0x5678 (16 bits baixos)
                         ; AL  = 0x78  (byte mais baixo)
                         ; AH  = 0x56  (segundo byte)

  ; O mesmo padrão para EBX/BX/BL/BH, ECX/CX/CL/CH, EDX/DX/DL/DH
  ; ESI, EDI, ESP, EBP têm SI, DI, SP, BP (16 bits) mas não têm 8 bits separados em x86`}
        />
        <p>
          Na prática, os subregistradores são usados quando o dado é menor que 32 bits. Um valor booleano (0 ou 1) frequentemente usa AL. Um valor de 16 bits usa AX. Um valor de 8 bits (byte) usa AL. Modificar AL automaticamente modifica a parte baixa de EAX — não são registradores independentes.
        </p>

        <h2>x64 — Extensões e Novos Registradores</h2>
        <p>
          Em x64 (64 bits), todos os registradores foram estendidos para 64 bits e ganharam prefixo R: EAX → RAX, EBX → RBX, ECX → RCX, etc. Mas os nomes antigos (EAX, AX, AL) ainda funcionam e se referem às partes menores do registrador maior.
        </p>
        <p>
          Além disso, x64 adicionou 8 novos registradores de uso geral: R8, R9, R10, R11, R12, R13, R14, R15 — cada um de 64 bits. Isso permite que compiladores x64 mantenham mais valores em registradores (sem precisar ir à memória tão frequentemente), tornando o código mais rápido. Para o Cheat Engine, isso significa mais registradores para rastrear no debugger e mais possibilidades nos scripts de Assembly.
        </p>
        <CodeBlock
          title="Convenção de parâmetros em x64 Windows"
          language="asm"
          code={`; Em x64 Windows (Microsoft ABI), os primeiros 4 parâmetros de uma função vão em:
  ; RCX — 1º parâmetro (frequentemente "this" em C++)
  ; RDX — 2º parâmetro
  ; R8  — 3º parâmetro
  ; R9  — 4º parâmetro
  ; Parâmetros adicionais vão na pilha

  ; Exemplo: chamada de função de dano
  ; void aplicarDano(Personagem* alvo, int dano, float multiplicador, int tipo)
  ; RCX = ponteiro para Personagem (o objeto que recebe o dano)
  ; RDX = quantidade de dano
  ; R8  = multiplicador (como inteiro representando float)
  ; R9  = tipo do dano`}
        />

        <h2>O Registrador de Flags (EFLAGS/RFLAGS)</h2>
        <p>
          O registrador EFLAGS (ou RFLAGS em x64) não armazena dados — armazena o resultado de operações como bits individuais chamados "flags". Instruções de comparação (CMP, TEST) e aritméticas (ADD, SUB) setam essas flags, que depois são lidas por instruções de salto condicional (JE, JNE, JL, JG, etc.).
        </p>
        <p>
          <strong>ZF (Zero Flag):</strong> Setado quando o resultado de uma operação foi zero. "CMP EAX, EBX" faz uma subtração interna; se EAX == EBX, o resultado é 0 e ZF = 1. "JE" (Jump if Equal) verifica se ZF = 1. Então: CMP + JE é essencialmente "se EAX igual EBX, pule". No debugger do CE, você pode clicar em ZF para togglear seu valor — forçando ou impedindo que o próximo salto condicional aconteça.
        </p>
        <p>
          <strong>CF (Carry Flag):</strong> Setado quando há overflow em operação sem sinal. Também é setado pelo SHR/SHL (shift) ao carregar o bit que saiu. "JB" (Jump if Below) e "JAE" (Jump if Above or Equal) verificam CF.
        </p>
        <p>
          <strong>SF (Sign Flag):</strong> Setado quando o resultado é negativo (bit mais significativo = 1 em complemento de 2). "JS" pula se SF = 1.
        </p>
        <p>
          <strong>OF (Overflow Flag):</strong> Setado quando há overflow em operação com sinal. Diferente de CF — CF é para sem sinal, OF é para com sinal.
        </p>

        <h2>Modificando Registradores no Debugger do CE</h2>
        <p>
          Quando o processo está pausado em um breakpoint (o jogo está congelado), o painel de registradores do Memory View mostra todos os valores atuais. Duplo clique em qualquer valor de registrador abre um campo de edição onde você pode digitar um novo valor. A mudança é aplicada imediatamente — quando você pressionar F9 (Continue), o processo continuará com o registrador modificado.
        </p>
        <p>
          Isso é extremamente poderoso para testes rápidos: se você identificou que EAX contém o dano que o personagem vai receber, modificar EAX para 0 antes de continuar efetivamente anula aquele dano. Se ECX aponta para o objeto inimigo e você precisa verificar se o código se aplica ao jogador, compare ECX com o endereço do objeto do jogador no momento em que o breakpoint é atingido.
        </p>

        <AlertBox type="tip" title="Modificar ZF para forçar/impedir saltos condicionais">
          Uma das técnicas de debugging mais úteis no CE: quando você está num breakpoint em uma instrução de salto condicional (JE, JNE, JL, etc.), clique em ZF (ou qualquer outra flag relevante) no painel de registradores para togglear seu valor. Isso força o salto a tomar o caminho que você quer, sem modificar o código — ideal para testar "o que acontece se essa condição for verdadeira/falsa".
        </AlertBox>
      </PageContainer>
    );
  }
  