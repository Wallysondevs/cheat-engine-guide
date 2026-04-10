import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Interface() {
    return (
      <PageContainer
        title="Interface do Cheat Engine"
        subtitle="Tour completo pela interface do CE — entenda cada área, botão e painel antes de começar."
        difficulty="iniciante"
        timeToRead="15 min"
      >
        <h2>Visão Geral da Janela Principal</h2>
        <p>
          Quando você abre o Cheat Engine pela primeira vez, a janela principal pode parecer intimidadora com seus muitos controles. Mas a interface tem uma lógica clara: está dividida em zonas que correspondem às fases de trabalho — primeiro você encontra o processo, depois faz varreduras para encontrar valores, e por último gerencia esses valores na Address List. Cada zona tem sua função específica.
        </p>
        <p>
          A janela principal pode ser visualizada como três faixas horizontais: a toolbar no topo com acesso rápido a funções, a área de varredura no centro com todos os controles de scan, e a Address List na parte inferior onde seus resultados são organizados e gerenciados. Vamos detalhar cada uma.
        </p>

        <h2>A Toolbar Superior</h2>
        <p>
          A toolbar no topo da janela contém ícones de acesso rápido para as funções mais usadas. Da esquerda para direita: o ícone de computador com lupa para abrir um processo (este é o primeiro passo sempre), o ícone de disquete para salvar/carregar tabelas, ícones para abrir o Memory View (Ctrl+M), o Auto Assembler (Ctrl+Alt+A), e diversas outras ferramentas avançadas.
        </p>
        <p>
          O campo de texto logo abaixo dos ícones mostra o nome do processo atualmente anexado — ou "No process selected" se nenhum processo foi aberto ainda. Este campo muda para o nome e PID (Process ID) do jogo quando você o anexa com sucesso.
        </p>

        <h2>A Área de Varredura</h2>
        <p>
          O painel de controles de varredura ocupa a parte central da janela. Ele contém:
        </p>
        <p>
          <strong>Value:</strong> O campo onde você digita o valor que está buscando. Para uma busca de Exact Value, este é o número exato. Para Unknown Initial Value, deixe em branco. Para Between, este campo se expande para dois campos (mínimo e máximo).
        </p>
        <p>
          <strong>Scan Type (Tipo de Varredura):</strong> O menu suspenso que define como você está buscando — Exact Value, Unknown Initial Value, Bigger Than, Smaller Than, Changed Value, etc. Esta é uma das escolhas mais importantes de cada varredura.
        </p>
        <p>
          <strong>Value Type (Tipo de Valor):</strong> O menu que define o formato do dado — 1 Byte, 2 Bytes, 4 Bytes, 8 Bytes, Float, Double, String, Array of Bytes. Escolher o tipo errado é a causa mais comum de não encontrar um valor.
        </p>
        <p>
          <strong>First Scan / Next Scan:</strong> Os botões de ação. "First Scan" inicia uma nova busca do zero. "Next Scan" filtra a lista de resultados existente baseado nas novas condições. Depois de uma First Scan, o botão muda para "New Scan" para limpar e começar novamente.
        </p>
        <p>
          <strong>Scan Options:</strong> Um botão que expande opções avançadas — limitar a varredura a uma faixa de memória específica (útil para jogos grandes), definir alinhamento de bytes, habilitar varredura de memória compactada, etc. Para uso básico, as opções padrão são suficientes.
        </p>
        <p>
          <strong>Lista de Resultados:</strong> Abaixo dos controles de varredura, o painel de resultados lista todos os endereços que correspondem aos critérios de busca. Cada linha mostra o endereço (em hexadecimal), o tipo de dado, e o valor atual (que atualiza em tempo real). A barra de progresso abaixo mostra quantos resultados existem.
        </p>

        <h2>A Address List</h2>
        <p>
          A parte inferior da janela é a Address List — o "coração" do CE onde você organiza e usa seus cheats. Ela ocupa cerca de 40% da janela por padrão e pode ser redimensionada arrastando a divisória entre ela e a lista de resultados.
        </p>
        <p>
          A Address List tem uma toolbar própria na parte inferior com botões para: adicionar um endereço manualmente (+), adicionar endereços selecionados da lista de resultados, e outros controles. Acima da toolbar, uma barra de status mostra informações sobre a seleção atual.
        </p>

        <h2>Menus e Suas Funções</h2>
        <p>
          <strong>File:</strong> Gerencia tabelas — New (limpa tudo), Open/Save/Save As (trabalha com arquivos .CT), e Recent Tables (tabelas recentes). A função de merge (combinar tabelas) também fica aqui.
        </p>
        <p>
          <strong>Edit:</strong> Funções básicas de edição — Select All (seleciona todos os resultados), e algumas opções de preferências globais.
        </p>
        <p>
          <strong>View:</strong> Acesso ao Memory View, Advanced options, e configurações de exibição — como mostrar/ocultar a toolbar, mudar a fonte da interface, etc.
        </p>
        <p>
          <strong>Table:</strong> Opções específicas da tabela atual — Table Hot Keys (hotkeys globais), Add Address Manually, e configurações de comportamento da tabela.
        </p>
        <p>
          <strong>Tools:</strong> Acesso às ferramentas avançadas — Pointer Scanner, Dissect Data/Structures, Kernel tools, Create threadlist, Process Memory Scanner, e outras. É a seção mais rica para usuários avançados.
        </p>
        <p>
          <strong>Memory Scan:</strong> Opções avançadas de varredura — habilitar escaneamento de regiões específicas, configurar alinhamento de varredura, ativar varredura de strings Unicode, etc.
        </p>
        <p>
          <strong>Help:</strong> Acesso ao tutorial integrado, documentação, e informações de versão.
        </p>

        <h2>Personalizando a Interface</h2>
        <p>
          O CE oferece algumas opções de personalização. Via View → Options (ou o ícone de engrenagem na toolbar), você pode: mudar o tema de cores (dark mode é popular para uso noturno), ajustar o tamanho da fonte (útil em monitores de alta resolução), configurar o comportamento de attach automático, e definir diretórios padrão para tabelas.
        </p>
        <p>
          A divisória entre a lista de resultados e a Address List pode ser arrastada para dar mais espaço a qualquer uma das duas. Se você usa principalmente a Address List (com uma tabela já montada), arraste a divisória para cima para maximizar o espaço da Address List. Se está ativamente fazendo varreduras, arraste para baixo para ver mais resultados.
        </p>

        <AlertBox type="tip" title="Redimensione o CE de acordo com sua tarefa">
          Para varreduras intensas (muitos Next Scans), maximize a janela e arraste a divisória para dar mais espaço à lista de resultados. Para trabalhar com uma tabela montada, um CE pequeno no canto da tela com a Address List visível é suficiente — você pode ver os valores enquanto joga sem o CE ocupar toda a tela.
        </AlertBox>
      </PageContainer>
    );
  }
  