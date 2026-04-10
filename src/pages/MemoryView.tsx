import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function MemoryView() {
    return (
      <PageContainer
        title="Memory View"
        subtitle="Guia completo do visualizador de memória hexadecimal e do disassembler integrado do Cheat Engine."
        difficulty="intermediário"
        timeToRead="16 min"
      >
        <h2>O Memory View — A Janela Mais Poderosa do CE</h2>
        <p>
          O Memory View é uma janela separada do Cheat Engine que combina três ferramentas numa única interface: um editor hexadecimal que mostra os bytes brutos da memória, um disassembler que converte bytes em instruções Assembly legíveis, e o debugger que permite pausar a execução e inspecionar o estado do processador. É por onde os usuários avançados passam a maior parte do tempo.
        </p>
        <p>
          Para abrir, pressione <kbd>Ctrl+M</kbd> na janela principal do CE, ou vá em View → Memory View. Alternativamente, clicar com botão direito em um endereço na Address List e selecionar "Browse memory region" abre o Memory View já posicionado naquela região específica de memória.
        </p>

        <h2>Layout da Janela</h2>
        <p>
          A janela do Memory View é dividida horizontalmente em dois painéis principais. O painel superior é o <strong>disassembler</strong> — ele mostra o código Assembly do processo. O painel inferior é o <strong>editor hexadecimal</strong> — ele mostra a memória raw em formato hexadecimal com representação ASCII ao lado.
        </p>
        <p>
          Quando o debugger está ativo e o processo está pausado em um breakpoint, um terceiro elemento aparece: o painel de registradores no canto superior direito, mostrando os valores atuais de EAX, EBX, ECX, etc. e as flags (ZF, CF, SF, OF). Durante uma sessão de debugging, você oscila constantemente entre esses três painéis.
        </p>

        <h2>Navegando no Editor Hexadecimal</h2>
        <p>
          O editor hexadecimal exibe a memória em três colunas: o endereço (à esquerda), os bytes em hexadecimal (no meio, agrupados em 4 bytes por padrão), e a representação ASCII dos bytes (à direita, onde bytes imprimíveis aparecem como caracteres e o resto como pontos).
        </p>
        <p>
          Para navegar para um endereço específico, pressione <kbd>Ctrl+G</kbd> (Go to Address). Uma caixa de diálogo aceita endereços em hexadecimal ou expressões como "game.exe+0x12345" ou até cálculos envolvendo registradores (durante debugging: "EBX+0x4C"). O CE resolve a expressão e posiciona a visualização naquele endereço.
        </p>
        <p>
          Para editar um byte, clique na posição hexadecimal correspondente — o cursor aparece e você pode digitar dois dígitos hexadecimais para o novo valor. Pressione <kbd>Tab</kbd> para mover para o próximo byte ou <kbd>Enter</kbd> para confirmar. Alternativamente, clique na representação ASCII à direita para editar como texto.
        </p>
        <p>
          O editor atualiza em tempo real enquanto o processo está rodando — você pode ver os bytes mudando enquanto o jogo escreve na memória. Se quiser congelar a visualização para análise estática, o CE não tem uma opção direta para isso no hex editor, mas você pode usar o debugger para pausar o processo inteiro.
        </p>

        <h2>Buscando no Editor Hexadecimal</h2>
        <p>
          Para buscar padrões de bytes na memória, vá em Tools → Search Memory (ou <kbd>Ctrl+F</kbd> no Memory View). Uma caixa de diálogo permite buscar por: sequências de bytes hex (ex: "FF 83 4C 00 00 00"), texto ASCII ou Unicode, e valores em formatos específicos.
        </p>
        <p>
          A busca hexadecimal com wildcards é especialmente útil para encontrar padrões de código: "FF ?? 4C 00 00 00" onde "??" é qualquer byte. Isso é a base da técnica AOB (Array of Bytes) usada em scripts de Auto Assembler para encontrar instruções sem depender do endereço exato.
        </p>

        <h2>Navegando no Disassembler</h2>
        <p>
          O disassembler traduz os bytes de memória em instruções Assembly legíveis. Cada linha mostra o endereço (à esquerda), os bytes raw em hex, e a instrução Assembly correspondente. Para código de jogo compilado com otimizações, você verá instruções complexas mas seguindo padrões reconhecíveis.
        </p>
        <p>
          Para navegar: <kbd>Ctrl+G</kbd> também funciona no disassembler para ir a um endereço. Duplo clique em qualquer endereço de destino após uma instrução CALL ou JMP abre aquela função no disassembler — é como seguir um link. Use o botão de histórico (seta para trás) na toolbar para voltar ao ponto anterior.
        </p>
        <p>
          O CE tenta reconhecer funções e adiciona labels automáticos onde consegue. Funções da biblioteca padrão do Windows, funções de runtime do Visual C++, e outras funções conhecidas aparecem com seus nomes em vez de endereços numéricos, tornando o código mais legível.
        </p>

        <h2>Operações no Disassembler</h2>
        <p>
          Clique com botão direito em qualquer instrução no disassembler para ver o menu de opções. Algumas das mais importantes:
        </p>
        <p>
          <strong>Toggle Breakpoint (F5):</strong> Adiciona ou remove um breakpoint na instrução selecionada. Quando o processo executar aquela instrução, o CE pausará e você poderá inspecionar o estado completo. O breakpoint aparece visualmente como um ponto vermelho na margem esquerda.
        </p>
        <p>
          <strong>Replace with code that does nothing (NOP):</strong> Substitui a instrução por NOPs (No Operation — instrução que não faz nada). Isso efetivamente "desabilita" aquela instrução. É a forma mais rápida de testar "o que acontece se esse código não executar?". NOPs têm o mesmo tamanho que a instrução substituída, então o código ao redor não é afetado.
        </p>
        <p>
          <strong>Restore with original code:</strong> Desfaz a operação de NOP, restaurando os bytes originais. Sempre use isso antes de fechar o CE se você fez NOP em algo que não deveria ter.
        </p>
        <p>
          <strong>Assemble:</strong> Abre um editor onde você pode digitar uma instrução Assembly nova em texto e ela é convertida para bytes e escrita na memória. Isso é diferente do Auto Assembler — o Assemble é para mudanças pontuais em uma única instrução.
        </p>
        <p>
          <strong>Find references to this address:</strong> Busca em toda a memória por referências ao endereço selecionado. Mostra outros pontos do código que fazem CALL, JMP ou referência de memória para aquele endereço. Essencial para entender quem chama quem.
        </p>

        <h2>Usando o Disassembler para Entender o Jogo</h2>
        <p>
          O workflow típico de análise começa com o "Find out what writes to this address" de um endereço na Address List. Isso mostra a instrução responsável por modificar o valor. Clique em "Show disassembler" para ver o contexto — você verá a instrução no meio de uma função, com o código ao redor que revela a lógica.
        </p>
        <p>
          Por exemplo: você encontrou que "MOV [EBX+4C], EAX" em 0x00A1F233 é quem escreve a vida. No disassembler, olhe o código antes dessa instrução: provavelmente há um CALL que calculou o dano e colocou o resultado em EAX, e talvez um CMP e JL (jump if less) que verifica se a vida é menor que zero para chamar a função de morte. Entender esse contexto permite criar injeções de código muito mais precisas.
        </p>
        <CodeBlock
          title="Exemplo de análise de função de dano no disassembler"
          language="asm"
          code={`; Contexto típico ao redor da instrução que escreve a vida:
  00A1F21A: PUSH EAX           ; salva EAX (parâmetros de chamada)
  00A1F21B: CALL 00FF2340      ; chama calcularDano() → resultado em EAX
  00A1F220: ADD ESP, 04        ; limpa pilha após chamada (stdcall)
  00A1F223: MOV ECX, [EBX+4C] ; ECX = vida atual
  00A1F226: SUB ECX, EAX       ; ECX = vida - dano
  00A1F228: TEST ECX, ECX      ; verifica se ECX é zero ou negativo
  00A1F22A: JLE 00A1F250       ; se vida <= 0, pula para código de morte
  00A1F22C: MOV [EBX+4C], ECX  ; ← aqui! escreve nova vida
  00A1F22F: JMP 00A1F260       ; continua fluxo normal
  ; --- código de morte em 00A1F250 ---
  00A1F250: CALL 00AB1234      ; chama morrerPersonagem()`}
        />

        <AlertBox type="tip" title="Ctrl+G é seu melhor amigo no Memory View">
          Memorize Ctrl+G para o Memory View. Você vai usá-lo centenas de vezes — para navegar para endereços específicos, para seguir ponteiros manualmente, e para pular rapidamente entre regiões de código durante análise.
        </AlertBox>
      </PageContainer>
    );
  }
  