import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Disassembler() {
    return (
      <PageContainer
        title="Disassembler do CE"
        subtitle="Como ler código Assembly no Cheat Engine, entender o que o jogo está fazendo e modificar seu comportamento."
        difficulty="avançado"
        timeToRead="18 min"
      >
        <h2>Por que aprender a ler Assembly</h2>
        <p>
          O disassembler transforma os bytes brutos do executável em instruções Assembly — a linguagem mais próxima do hardware que ainda é legível por humanos. Aprender a ler Assembly abre um nível completamente diferente de uso do Cheat Engine: em vez de apenas modificar valores na memória, você pode entender e modificar o comportamento do jogo — anular verificações, alterar cálculos, adicionar lógica nova. É a diferença entre alterar o placar e alterar as regras do jogo.
        </p>
        <p>
          Assembly x86/x64 tem centenas de instruções, mas na prática você vai ver as mesmas 20-30 em código de jogo repetidamente. Não é necessário memorizar todo o conjunto de instruções — um conhecimento básico dos padrões mais comuns é suficiente para a maioria dos usos no CE.
        </p>

        <h2>As Instruções Mais Frequentes em Código de Jogo</h2>
        <p>
          <strong>MOV destino, origem:</strong> Move (copia) um valor. "MOV EAX, [EBX+4C]" lê 4 bytes da memória no endereço EBX+0x4C e coloca em EAX. "MOV [EBX+4C], EAX" escreve o valor de EAX na memória em EBX+0x4C. É a instrução mais comum — você a verá em toda leitura e escrita de variáveis.
        </p>
        <p>
          <strong>ADD e SUB:</strong> Adição e subtração. "ADD EAX, 10" adiciona 10 ao valor em EAX. "SUB ECX, EAX" subtrai EAX de ECX. Frequentemente usados em cálculos de dano: "MOV ECX, [EBX+4C]" (lê HP), "SUB ECX, EAX" (subtrai dano), "MOV [EBX+4C], ECX" (escreve novo HP).
        </p>
        <p>
          <strong>CMP e TEST:</strong> Comparação. "CMP EAX, EBX" compara os dois (faz EAX-EBX internamente sem salvar o resultado, apenas seta flags). "TEST EAX, EAX" é equivalente a "CMP EAX, 0" — verifica se EAX é zero. Essas instruções sozinhas não fazem nada visível — são sempre seguidas de uma instrução de salto condicional.
        </p>
        <p>
          <strong>JMP, JE, JNE, JL, JG, JLE, JGE:</strong> Saltos (jumps). "JMP endereço" pula incondicionalmente para outro endereço. "JE" (Jump if Equal) pula se ZF=1 (resultado da CMP anterior foi zero = valores iguais). "JNE" pula se não igual. "JL" pula se menor (signed). "JG" pula se maior. Modificar esses saltos é como mudar as decisões do jogo.
        </p>
        <p>
          <strong>PUSH e POP:</strong> Empurra/retira da pilha. "PUSH EAX" salva EAX na pilha e decrementa ESP. "POP EBX" retira o topo da pilha e coloca em EBX. Usado para salvar registradores ao entrar em funções e restaurar ao sair.
        </p>
        <p>
          <strong>CALL endereço:</strong> Chama uma função. Salva o endereço de retorno na pilha e pula para o endereço. "RET" volta para o endereço de retorno. Ver CALL é ver uma função sendo chamada — duplo clique no endereço no disassembler do CE para entrar na função.
        </p>
        <p>
          <strong>NOP:</strong> No Operation — não faz absolutamente nada. Ocupa um byte (0x90) mas não tem efeito. Usado para "apagar" instruções sem mudar o tamanho do código — substituir "MOV [EBX+4C], EAX" por NOPs do mesmo tamanho desabilita a escrita sem deslocar o código que vem depois.
        </p>

        <h2>Padrões Comuns em Código de Jogo</h2>
        <CodeBlock
          title="Padrões típicos que você vai ver no disassembler"
          language="asm"
          code={`; Padrão 1: Verificação simples antes de fazer algo
  CMP EAX, 0          ; EAX é zero?
  JE  00A1F3C0        ; se sim, pula para outro código
  ; ... código que executa apenas se EAX != 0

  ; Padrão 2: Cálculo de dano clássico
  MOV ECX, [EBX+4C]   ; ECX = vida atual (lê da memória)
  SUB ECX, EAX         ; ECX = vida - dano
  TEST ECX, ECX        ; vida resultante é zero?
  JLE 00A1F250         ; se vida <= 0, vai para código de morte
  MOV [EBX+4C], ECX   ; salva nova vida na memória

  ; Padrão 3: Loop com contador
  MOV ECX, 10          ; vai repetir 10 vezes
  @@loop:
  ; ... corpo do loop
  DEC ECX              ; decrementa contador
  JNZ @@loop           ; repete se ECX != 0

  ; Padrão 4: Chamada de função com parâmetro em ECX (C++ __thiscall)
  MOV ECX, [game.exe+0x123456]  ; carrega ponteiro "this"
  CALL 00FF2340                  ; chama método do objeto`}
        />

        <h2>Técnicas de Modificação no Disassembler</h2>
        <p>
          <strong>NOP — A mais simples:</strong> Selecione uma instrução no disassembler do CE, clique direito → "Replace with code that does nothing (NOP)". O CE substitui os bytes da instrução por NOPs do mesmo tamanho. A instrução fica no código mas não tem efeito. Para reverter, clique direito → "Restore with original code".
        </p>
        <p>
          <strong>Inverter um salto:</strong> Se "JE" (pula se igual) está impedindo algo de acontecer, mudar para "JNE" (pula se não igual) inverte a lógica. No disassembler, clique na instrução → "Assemble" → escreva "JNE endereço_do_destino" → Enter. O CE converte para os bytes corretos e escreve na memória.
        </p>
        <p>
          <strong>Mudar um valor constante:</strong> Se o código usa "MOV EAX, 10" (sempre carrega 10), você pode mudar para "MOV EAX, 100" via Assemble. Isso altera qualquer valor constante hardcoded no código.
        </p>
        <p>
          <strong>Forçar um salto incondicional:</strong> Se uma verificação condicional está impedindo um cheat, substituir "JNE" (ou qualquer outro salto condicional) por "JMP" (incondicional) faz o jogo sempre pular para aquele destino, independente da condição.
        </p>

        <h2>Trabalhando com a Ferramenta de Assemble</h2>
        <p>
          O menu "Assemble" no disassembler do CE permite digitar Assembly diretamente. Selecione uma instrução, pressione <kbd>Spacebar</kbd> (ou clique direito → Assemble), e uma caixa de texto aparece com a instrução atual. Edite e pressione Enter para aplicar. Se a instrução nova for menor que a original, os bytes que sobram podem ser preenchidos com NOPs automaticamente (o CE pergunta).
        </p>
        <CodeBlock
          title="Exemplos de uso do Assemble para modificações"
          language="text"
          code={`Modificação 1: Anular o dano (transformar SUB em NOP)
  Original:  SUB ECX, EAX     ; subtrai o dano da vida
  Modificar: Selecionar SUB ECX, EAX → direito → NOP
  Resultado: Vida nunca diminui porque a subtração foi removida

  Modificação 2: Curar em vez de danificar
  Original:  SUB ECX, EAX     ; vida = vida - dano
  Novo:      ADD ECX, EAX     ; vida = vida + dano (cura!)
  Como: Selecionar SUB → Assemble → digitar "ADD ECX, EAX"

  Modificação 3: Setar vida para valor fixo sempre
  Original:  MOV [EBX+4C], ECX  ; escreve novo HP calculado
  Novo:      MOV [EBX+4C], 0x64 ; sempre escreve 100 (0x64 hex)
  Como: Assemble → "MOV DWORD PTR [EBX+4C], 64"
  Obs: "DWORD PTR" especifica tamanho de 4 bytes`}
        />

        <AlertBox type="warning" title="Modificações no disassembler são temporárias por padrão">
          Modificações feitas via NOP ou Assemble afetam apenas a memória em execução — o arquivo .exe no disco não é alterado. Fechar o jogo desfaz todas as mudanças. Para que as modificações persistam entre sessões, você precisa usar o Auto Assembler para criar um script que reaplicar as mudanças automaticamente quando o jogo é aberto.
        </AlertBox>
      </PageContainer>
    );
  }
  