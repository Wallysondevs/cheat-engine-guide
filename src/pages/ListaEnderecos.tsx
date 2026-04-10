import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function ListaEnderecos() {
    return (
      <PageContainer
        title="Lista de Endereços"
        subtitle="Como organizar, nomear, gerenciar e usar eficientemente a Address List — o coração do Cheat Engine."
        difficulty="iniciante"
        timeToRead="15 min"
      >
        <h2>O que é a Address List e por que ela importa</h2>
        <p>
          A Address List (Lista de Endereços) é o painel inferior da janela principal do Cheat Engine — aquele com colunas como Description, Address, Type e Value. É nela que você adiciona os endereços de memória que encontrou por varredura e que deseja monitorar, modificar ou travar. Pense nela como uma planilha dos seus cheats ativos para o jogo que está aberto.
        </p>
        <p>
          A importância da Address List vai além de simplesmente listar endereços. É nela que você configura freezes, atribui hotkeys, adiciona scripts, organiza grupos, e cria a estrutura que eventualmente se torna uma tabela .CT reutilizável. Uma Address List bem organizada é a diferença entre um conjunto de cheats bagunçados e difíceis de usar, e um trainer completo e profissional.
        </p>

        <h2>Adicionando Endereços à Lista</h2>
        <p>
          O método mais comum de adicionar endereços é a partir da lista de resultados de varredura. Após refinar sua busca até chegar a poucos candidatos, selecione um ou mais endereços na lista de resultados e pressione <kbd>Enter</kbd>, ou duplo clique neles, ou clique no botão vermelho "Add selected results to the addresslist" na parte inferior. Os endereços aparecem na Address List com um nome genérico como "No Description" que você pode (e deve) editar.
        </p>
        <p>
          Você também pode adicionar endereços manualmente sem fazer varredura. Isso é útil quando você já sabe o endereço (por exemplo, você encontrou um ponteiro documentado pela comunidade) ou quando quer adicionar um endereço calculado dinamicamente via expressão. Clique no botão azul "Add address manually" na barra inferior da Address List (ícone de "+"). Uma caixa de diálogo pede o endereço, o tipo, e se é um ponteiro. Você pode escrever tanto um número hexadecimal puro quanto uma expressão como "game.exe+0x0045A3B0" ou até cálculos como "game.exe+0x00123+ecx" — o CE resolve a expressão em tempo real.
        </p>

        <h2>Entendendo as Colunas</h2>
        <p>
          A coluna <strong>Active</strong> (o checkbox à esquerda) é o interruptor principal do freeze. Quando marcado, o CE mantém o valor do endereço constante, reescrevendo-o continuamente com o valor que está na coluna Value no momento em que o checkbox foi ativado. Desmarcar desativa o freeze e o jogo volta a controlar o valor normalmente.
        </p>
        <p>
          A coluna <strong>Description</strong> é o nome que você dá ao endereço. O CE não nomeia automaticamente — você deve editar manualmente. Duplo clique na coluna abre um campo de edição onde você digita o nome. Seja descritivo: "Vida do Jogador (HP Atual)" é muito melhor que "Endereço 1". Se a tabela vai ser compartilhada, nomes claros em português ou inglês ajudam outros usuários a entender o que cada endereço faz.
        </p>
        <p>
          A coluna <strong>Address</strong> mostra o endereço de memória. Endereços aparecem em diferentes cores com significados importantes: <strong>verde</strong> indica um endereço estático (relativo a um módulo, sempre o mesmo), <strong>preto</strong> indica um endereço dinâmico (número absoluto que muda entre sessões), e <strong>roxo/violeta</strong> indica um ponteiro configurado. Prefira sempre endereços verdes nas suas tabelas — eles funcionam a cada reinicialização sem precisar de nova varredura.
        </p>
        <p>
          A coluna <strong>Type</strong> mostra o tipo de dado: 4 Bytes (inteiro de 32 bits), Float (ponto flutuante), String, etc. Duplo clique abre uma lista suspensa com todos os tipos disponíveis. Mudar o tipo não modifica o valor em memória — apenas muda como o CE interpreta e exibe os bytes. Isso é útil quando você não tem certeza do tipo correto: tente 4 Bytes, veja se o valor faz sentido, tente Float, e compare.
        </p>
        <p>
          A coluna <strong>Value</strong> mostra o valor atual e atualiza em tempo real enquanto o jogo roda. Se você pausar o jogo, o valor para de mudar. Duplo clique abre o diálogo de modificação. O valor também é editável diretamente — em algumas versões do CE, você pode simplesmente clicar na célula e digitar.
        </p>

        <h2>Organizando com Grupos e Hierarquias</h2>
        <p>
          A Address List suporta grupos aninhados — grupos dentro de grupos — criando uma hierarquia de organização. Para criar um grupo, clique com botão direito numa área vazia da lista → "Add Group". O grupo aparece como uma pasta com um nome padrão; duplo clique no nome para renomeá-lo.
        </p>
        <p>
          Para mover endereços para dentro de um grupo, selecione-os e arraste. Grupos podem ser colapsados (clicando na setinha ao lado do nome) para ocultar temporariamente seu conteúdo — útil quando você tem muitos endereços e quer focar em uma seção específica.
        </p>
        <p>
          Uma estrutura de organização que funciona bem para jogos de RPG: grupo raiz "[ PERSONAGEM ]" com subgrupos "Status" (vida, mana, stamina, escudo), "Progressão" (XP, nível, pontos de habilidade), e "Posição" (X, Y, Z, ângulo); grupo raiz "[ ECONOMIA ]" com "Moedas" e "Inventário"; grupo raiz "[ SCRIPTS ]" para cheats baseados em código que não se encaixam em simples freeze.
        </p>

        <h2>Opções do Menu de Contexto</h2>
        <p>
          Clique com botão direito em qualquer endereço na Address List para abrir um menu rico de opções. Além das básicas (modificar valor, ativar/desativar), há opções avançadas muito úteis:
        </p>
        <p>
          <strong>Find out what writes to this address:</strong> Abre o debugger e monitora quais instruções Assembly do jogo escrevem neste endereço. Essencial para engenharia reversa avançada — você vê exatamente qual parte do código do jogo controla aquele valor, o que é o primeiro passo para injetar código e modificar o comportamento.
        </p>
        <p>
          <strong>Find out what reads this address:</strong> Similar, mas monitora leituras. Útil para entender qual parte do jogo usa um valor — por exemplo, qual função lê a vida do personagem para fazer cálculos de dano.
        </p>
        <p>
          <strong>Pointer scan for this address:</strong> Inicia automaticamente o Pointer Scanner para encontrar um caminho estático de ponteiros até este endereço. É o ponto de partida para tornar um endereço dinâmico em um ponteiro permanente.
        </p>
        <p>
          <strong>Browse memory region:</strong> Abre o Memory View exibindo a região de memória ao redor deste endereço. Você pode inspecionar os bytes vizinhos, o que frequentemente revela outros valores da mesma estrutura de dados.
        </p>
        <p>
          <strong>Set hotkey:</strong> Associa uma tecla de atalho a este endereço. Você escolhe a ação (toggle, activate, deactivate, set value) e a tecla. A hotkey funciona em background enquanto o jogo está em primeiro plano.
        </p>

        <h2>Endereços com Scripts Associados</h2>
        <p>
          Um recurso poderoso e frequentemente subestimado é a possibilidade de associar um script Auto Assembler ou Lua diretamente a um Memory Record. Em vez de apenas travar um valor numérico, o "cheat" executa código quando ativado. Para associar um script, duplo clique no endereço para abrir o editor, e você verá uma aba "Script" onde pode escrever o código.
        </p>
        <p>
          Na prática, isso significa que o checkbox de um endereço pode ativar um God Mode que modifica o código Assembly do jogo, um script que cria uma interface gráfica, ou uma função Lua complexa que gerencia múltiplos endereços simultaneamente. A Address List se torna assim uma central de controle completa, não apenas uma lista de valores a travar.
        </p>

        <AlertBox type="tip" title="Cores dos endereços têm significado crítico">
          Sempre preste atenção à cor dos endereços. Verde = estático (perfeito para tabelas). Preto = dinâmico (vai quebrar na próxima sessão). Roxo = ponteiro configurado (estático se configurado corretamente). Se você salvar uma tabela com endereços pretos, eles não vão funcionar quando o jogo for reiniciado.
        </AlertBox>

        <AlertBox type="info" title="Auto-atualização de valores">
          A Address List atualiza os valores em tempo real enquanto o processo está em execução. Se você quiser "pausar" essa atualização para analisar um momento específico, o CE não oferece isso diretamente para a Address List — mas você pode usar o debugger para pausar o processo inteiro, o que congela todos os valores tanto no jogo quanto no CE.
        </AlertBox>
      </PageContainer>
    );
  }
  