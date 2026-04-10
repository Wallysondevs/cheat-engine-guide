import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function TiposVarredura() {
    return (
      <PageContainer
        title="Tipos de Varredura"
        subtitle="Guia completo de todos os filtros de busca do Cheat Engine — quando e como usar cada tipo para qualquer situação."
        difficulty="iniciante"
        timeToRead="18 min"
      >
        <h2>Por que existem diferentes tipos de varredura?</h2>
        <p>
          Quando você abre o Cheat Engine e quer encontrar um valor na memória do jogo, a situação ideal seria sempre saber exatamente qual é esse valor — e o tipo "Exact Value" seria suficiente para tudo. Mas a realidade é bem mais complexa. A barra de HP pode não mostrar o número exato. A experiência pode ser representada como uma porcentagem. O tempo de recarga pode ser um float que você não consegue ler precisamente. O inventário pode ter valores que só aumentam ou só diminuem.
        </p>
        <p>
          É por isso que o Cheat Engine oferece vários tipos de varredura — cada um projetado para uma situação específica. Dominar esses tipos é a diferença entre encontrar um valor em 5 minutos e lutar por horas sem resultado. Esta página explora cada tipo em profundidade, com exemplos práticos de quando usá-los.
        </p>

        <h2>Exact Value — O Tipo Básico</h2>
        <p>
          O <strong>Exact Value</strong> é o tipo padrão e o mais intuitivo. Você sabe exatamente qual é o valor e o CE busca endereços que contêm precisamente aquele número. É o ponto de partida para qualquer cheat em que o jogo mostra o valor claramente na interface — barra de HP com número visível, quantidade de ouro exibida, nível do personagem, etc.
        </p>
        <p>
          O workflow padrão com Exact Value: note o valor atual (ex: 100 de vida), faça First Scan com esse valor, cause uma mudança no jogo (tome dano, gaste ouro, ganhe XP), note o novo valor (ex: 75 de vida), faça Next Scan com o novo valor. Repita 3-5 vezes até sobrar apenas 1-3 endereços.
        </p>
        <p>
          Um detalhe importante: o Exact Value é sensível ao tipo de dado. Se a vida está armazenada como Float mas você busca como 4 Bytes Integer, você não vai encontrar nada (ou vai encontrar endereços errados). Sempre experimente diferentes tipos de dados quando o Exact Value não produz bons resultados.
        </p>

        <h2>Bigger Than / Smaller Than — Quando Você Sabe a Faixa</h2>
        <p>
          Os tipos <strong>Bigger than</strong> e <strong>Smaller than</strong> são úteis quando você sabe aproximadamente qual é o valor mas não o número exato. Por exemplo, você está num RPG e sabe que seu personagem tem "muito ouro" — certamente mais de 1000, provavelmente mais de 5000, mas não sabe exatamente. Fazer uma busca "Bigger than 1000" já elimina bilhões de endereços irrelevantes que têm valores menores.
        </p>
        <p>
          Outro caso de uso é quando você quer evitar endereços de sistema que armazenam valores de controle (geralmente 0, 1, ou valores muito altos como timestamps). Buscar "Bigger than 50 AND Smaller than 10000" restringe muito a busca a valores na faixa que faz sentido para a vida de um personagem.
        </p>
        <p>
          Na prática, use Bigger/Smaller como primeiro filtro, depois refine com Changed/Unchanged ou Exact Value. Por exemplo: First Scan com "Bigger than 0" + "Smaller than 1000" para ouro → gaste algum ouro → Next Scan com "Smaller than [valor anterior]" → ganhe ouro → Next Scan com "Bigger than [valor anterior]".
        </p>

        <h2>Value Between — Intervalo Preciso</h2>
        <p>
          O <strong>Value Between</strong> combina Bigger than e Smaller than numa única operação. Você define um valor mínimo e um máximo, e o CE retorna apenas endereços dentro dessa faixa. É mais eficiente que fazer dois scans separados e é especialmente útil quando você sabe que o valor deve estar dentro de um intervalo específico.
        </p>
        <p>
          Exemplo prático: em um jogo de corrida, a velocidade do carro varia entre 0 (parado) e 300 (velocidade máxima). Buscar "Value between 50 and 300" enquanto está dirigindo elimina imediatamente todos os zeros e valores fora do range. Depois de alguns Next Scans com o valor atual exato, você chega ao endereço de velocidade rapidamente.
        </p>
        <p>
          Para floats, o Value Between é particularmente poderoso. Se você sabe que a barra de vida é representada como uma fração entre 0.0 e 1.0, buscar "Value between 0.0 and 1.0" (com tipo Float) retorna apenas endereços com valores percentuais, eliminando imediatamente a maior parte da memória irrelevante.
        </p>

        <h2>Unknown Initial Value — A Ferramenta para o Desconhecido</h2>
        <p>
          O <strong>Unknown Initial Value</strong> é o tipo mais poderoso — e o mais lento. Em vez de buscar um valor específico, ele simplesmente fotografa toda a memória do processo e armazena o estado atual. Nas varreduras seguintes, você compara o estado atual com o snapshot anterior para filtrar endereços baseado em como eles mudaram.
        </p>
        <p>
          Use Unknown Initial Value quando você não sabe absolutamente nada sobre o valor que está buscando: não sabe se é inteiro ou float, não sabe a faixa, não vê o número na tela. A barra de HP sem número, um medidor visual sem unidade, um valor interno que o jogo não mostra ao jogador — todos são candidatos para Unknown Initial Value.
        </p>
        <p>
          A desvantagem óbvia é o tamanho: um snapshot de processo pode ter vários gigabytes. O CE precisa de memória RAM suficiente para armazenar isso, e a varredura inicial leva mais tempo. Feche outros programas antes de usar Unknown Initial Value para garantir memória suficiente.
        </p>
        <p>
          A estratégia com Unknown Initial Value é usar tipos relativos de comparação nas varreduras seguintes: "Changed Value" quando você sabe que o valor mudou mas não sabe como, "Unchanged Value" quando o valor não deveria ter mudado, "Increased Value" quando sabe que subiu, "Decreased Value" quando sabe que desceu.
        </p>

        <h2>Changed / Unchanged Value</h2>
        <p>
          <strong>Changed Value</strong> filtra para endereços que tiveram qualquer mudança desde a última varredura. Não importa de quanto — qualquer diferença é suficiente para o endereço passar pelo filtro. Use após um período de atividade no jogo quando o valor que você busca certamente mudou mas você não sabe exatamente para quanto.
        </p>
        <p>
          <strong>Unchanged Value</strong> é o oposto: filtra para endereços que permaneceram exatamente iguais desde a última varredura. Este é um dos tipos mais poderosos em combinação com outros — alternando entre Changed e Unchanged, você pode convergir para o endereço correto muito mais rapidamente do que usando apenas Exact Value.
        </p>
        <p>
          A técnica clássica de alternância: (1) Unknown Initial Value, (2) faça o valor mudar → Next Scan "Changed", (3) não mexa no valor por alguns segundos → Next Scan "Unchanged", (4) faça o valor mudar de novo → Next Scan "Changed". Repita até poucos resultados. O valor alvo vai aparecer consistentemente nos dois filtros; valores aleatórios vão mudar de forma imprevisível e serão eliminados.
        </p>

        <h2>Increased / Decreased Value</h2>
        <p>
          <strong>Increased Value</strong> passa apenas endereços cujo valor aumentou desde a última varredura (qualquer aumento). <strong>Decreased Value</strong> passa apenas os que diminuíram. Esses tipos são mais precisos que Changed Value porque indicam a direção da mudança, o que elimina mais falsos positivos.
        </p>
        <p>
          Exemplo: você está buscando o XP do personagem. XP só aumenta (você nunca perde XP). Então: Unknown Initial Value → ganhe algum XP → Next Scan "Increased Value" → ganhe mais XP → Next Scan "Increased Value". A cada ciclo, você elimina todos os endereços que não aumentaram, convergindo rápido para o XP.
        </p>
        <p>
          O inverso: buscando a munição. Atire alguns tiros → "Decreased Value". Recarregue → "Increased Value". Atire mais → "Decreased Value". A munição vai aparecer consistentemente como o único valor que segue esse padrão preciso.
        </p>

        <h2>Increased / Decreased by Exact Value</h2>
        <p>
          Uma variação ainda mais poderosa: em vez de buscar qualquer aumento ou diminuição, você especifica a quantidade exata de mudança. Se você tomou exatamente 15 de dano, buscar "Decreased by exactly 15" vai filtrar para apenas os endereços que diminuíram exatamente 15 — um filtro muito mais restrito que simplesmente "Decreased".
        </p>
        <p>
          Isso é extremamente útil em jogos onde você tem controle preciso sobre as ações. Se você sabe que gastou exatamente 50 de ouro em uma compra, "Decreased by 50" vai encontrar o endereço do ouro em uma ou duas varreduras, em vez das 5-10 que seriam necessárias com o método genérico.
        </p>

        <h2>Estratégias Combinadas — O Método Profissional</h2>
        <p>
          Os profissionais de engenharia reversa raramente usam apenas um tipo de varredura. A abordagem eficaz é combinar tipos para convergir rapidamente. Aqui estão algumas estratégias comprovadas:
        </p>
        <p>
          <strong>Para HP/Vida:</strong> Exact Value com o HP atual → tome dano exato (atacar inimigo fraco) → Exact Value com novo HP → cure exato → Exact Value com HP curado. Em 3-4 ciclos você encontra o endereço.
        </p>
        <p>
          <strong>Para valores ocultos (barra sem número):</strong> Unknown Initial Value → varie o valor intensamente (tome muito dano, cure muito) → Decreased → Increased → Decreased → Increased. 5-8 ciclos geralmente são suficientes.
        </p>
        <p>
          <strong>Para floats (velocidade, posição):</strong> Unknown Initial Value → mova o personagem → Changed Value → pare completamente → Unchanged Value → mova novamente → Changed Value. Valores de posição vão mudar consistentemente com movimento e estabilizar quando parado.
        </p>

        <AlertBox type="tip" title="Combine tipos para convergência rápida">
          A regra de ouro: nunca dependa de um único tipo de varredura. Combine Exact Value para refinamento final com Changed/Unchanged para eliminação rápida de ruído. A alternância sistemática entre "o valor mudou" e "o valor não mudou" é a técnica mais eficaz para qualquer tipo de valor.
        </AlertBox>

        <AlertBox type="info" title="Desempenho das varreduras">
          Unknown Initial Value é lento na primeira varredura mas rápido nas seguintes (compara com o snapshot). Exact Value é sempre rápido mas pode falhar se o tipo estiver errado. Para jogos grandes (mais de 2GB de RAM alocada), considere restringir a região de memória na aba de configurações do scan para acelerar tudo.
        </AlertBox>
      </PageContainer>
    );
  }
  