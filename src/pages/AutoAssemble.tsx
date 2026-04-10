import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function AutoAssemble() {
    return (
      <PageContainer
        title="Auto Assembler"
        subtitle="Como usar o compilador Assembly integrado do CE para criar injeções de código, patches e cheats avançados."
        difficulty="avançado"
        timeToRead="20 min"
      >
        <h2>O que é o Auto Assembler</h2>
        <p>
          O Auto Assembler (AA) é um compilador Assembly integrado ao Cheat Engine que permite escrever instruções Assembly em texto legível e compilá-las diretamente na memória do processo alvo. É a ferramenta principal para criar cheats que modificam o comportamento do código do jogo — não apenas valores na memória, mas a lógica de execução em si.
        </p>
        <p>
          A diferença entre simples freeze de memória e Auto Assembler é análoga à diferença entre pintar por cima de uma placa de rua e trocar a placa. O freeze "pinta por cima" do valor constantemente. O Auto Assembler "troca a instrução" que escreve o valor — o resultado é mais limpo, mais estável, e frequentemente mais difícil de detectar por anti-cheats simplistas.
        </p>

        <h2>Abrindo e Usando o Auto Assembler</h2>
        <p>
          Acesse via Ctrl+Alt+A ou Tools → Auto Assembler. Uma janela de editor de código abre. Você pode digitar código AA diretamente, ou usar templates pré-prontos via Template menu no topo do editor.
        </p>
        <p>
          Para usar, escreva ou cole seu código AA, depois clique "Execute" para compilar e injetar imediatamente no processo. Alternativamente, use "Assign to current cheat table" para salvar o código como um script de Memory Record que pode ser ativado/desativado via checkbox.
        </p>

        <h2>Estrutura de um Script Auto Assembler</h2>
        <CodeBlock
          title="Estrutura completa de script AA com enable/disable"
          language="asm"
          code={`// Diretivas de definição (como #define em C)
  define(MODULO, game.exe)
  define(ADDR_DANO, MODULO+1F22C)  // endereço onde o dano é aplicado

  [ENABLE]
  // Código que executa quando o cheat é ATIVADO

  // Passo 1: Alocar memória para o código injetado
  alloc(meuCodigo, 256, ADDR_DANO)

  // Passo 2: Definir labels para referências de endereço
  label(original)
  label(retorno)

  // Passo 3: Escrever o código injetado no bloco alocado
  meuCodigo:
    // Preservar registradores que vamos modificar
    pushad  // salva todos os registradores
    
    // Nossa lógica de cheat aqui:
    // Zerar EAX para que dano seja 0
    xor eax, eax
    
    // Restaurar registradores
    popad
    
  original:
    // Aqui virão as instruções originais do jogo que fomos sobrescrever
    // (preenchidas pelo template automaticamente se usar newmem)
    sub ecx, eax  // instrução original de dano
    
  retorno:
    jmp ADDR_DANO+6  // volta após as instruções que sobrescrevemos

  // Passo 4: Sobrescrever as instruções originais com jump para nosso código
  ADDR_DANO:
    jmp meuCodigo  // JMP ocupa 5 bytes
    nop            // padding se a instrução original tinha mais de 5 bytes

  [DISABLE]
  // Código que executa quando o cheat é DESATIVADO

  // Restaurar os bytes originais
  ADDR_DANO:
    sub ecx, eax  // restaura instrução original
    nop

  // Liberar a memória alocada
  dealloc(meuCodigo)`}
        />

        <h2>O Template "Code Injection"</h2>
        <p>
          Em vez de escrever tudo manualmente, o AA oferece um template de "Code Injection" que preenche automaticamente a estrutura básica. Vá em Template → Code Injection → digite o endereço onde quer injetar → o template é criado com os bytes originais já preenchidos nas posições corretas.
        </p>
        <p>
          O template de Code Injection gera automaticamente: a diretiva alloc com tamanho adequado, o ponto de desvio (JMP) no endereço original, a seção de código injetado com os bytes originais copiados, o JMP de retorno para após o desvio, e a seção DISABLE que restaura tudo. Você só precisa adicionar sua lógica de cheat no meio.
        </p>

        <h2>Instruções Especiais do Auto Assembler</h2>
        <p>
          O AA tem algumas instruções além do Assembly padrão que facilitam a criação de cheats:
        </p>
        <p>
          <strong>alloc(nome, tamanho):</strong> Aloca memória executável no processo. O bloco alocado é onde você coloca seu código injetado. Sempre especifique tamanho suficiente — mais é melhor que menos. O bloco é inicializado com NOPs.
        </p>
        <p>
          <strong>dealloc(nome):</strong> Libera a memória alocada. Sempre faça isso no DISABLE para não vazar memória.
        </p>
        <p>
          <strong>label(nome):</strong> Define um label (rótulo) para referência por outros pontos do código. Permite usar nomes em vez de endereços numéricos.
        </p>
        <p>
          <strong>define(nome, valor):</strong> Cria uma constante simbólica. "define(HP_OFFSET, 4C)" permite usar HP_OFFSET em vez de 4C em todo o código — mais legível e fácil de atualizar.
        </p>
        <p>
          <strong>aobscanmodule(nome, modulo, padrão):</strong> Busca um padrão de bytes (Array of Bytes) no módulo especificado e define o resultado como um label. Permite que o script encontre automaticamente o endereço correto mesmo após atualizações do jogo.
        </p>
        <CodeBlock
          title="Usando AOB scan para endereços automáticos"
          language="asm"
          code={`[ENABLE]
  // Encontra automaticamente a instrução de dano pelo padrão de bytes
  // em vez de depender de um endereço fixo que muda com updates
  aobscanmodule(ADDR_DANO_AOB, game.exe, 2B C8 89 43 4C)
  // 2B C8 = SUB ECX, EAX
  // 89 43 4C = MOV [EBX+4C], ECX
  // Esse padrão identifica a sequência de dano + escrita de HP

  // Agora ADDR_DANO_AOB contém o endereço onde esse padrão foi encontrado
  // O resto do script usa esse endereço normalmente

  alloc(godMode, 256, ADDR_DANO_AOB)
  label(retorno)

  godMode:
    // Código que ignora o dano...
    mov ecx, [ebx+4C]  // lê HP atual sem subtrair dano
    mov [ebx+4C], ecx  // escreve o mesmo valor (sem mudança)
    jmp retorno

  ADDR_DANO_AOB:
    jmp godMode
    nop
    nop

  retorno:

  [DISABLE]
  ADDR_DANO_AOB:
    sub ecx, eax    // restaura SUB
    mov [ebx+4C], ecx  // restaura MOV
  dealloc(godMode)`}
        />

        <AlertBox type="warning" title="Bytes originais devem ser copiados exatamente">
          Ao escrever a seção DISABLE do script, os bytes originais devem ser idênticos aos que existiam antes. Copie exatamente do disassembler — olhe os bytes hexadecimais, não apenas a instrução em texto. Uma instrução pode ter múltiplos encodings diferentes.
        </AlertBox>

        <AlertBox type="tip" title="Use AOB scan para scripts resistentes a updates">
          Scripts que dependem de endereços fixos quebram a cada update do jogo. Scripts que usam aobscanmodule com padrões de bytes únicos encontram automaticamente o novo endereço após o update. Invista tempo criando bons padrões AOB — o script vai funcionar por muito mais tempo sem manutenção.
        </AlertBox>
      </PageContainer>
    );
  }
  