import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function ValorDesconhecido() {
    return (
      <PageContainer
        title="Encontrando Valores Desconhecidos"
        subtitle="Como encontrar e identificar valores na memória quando você não sabe exatamente o que procurar."
        difficulty="intermediário"
        timeToRead="18 min"
      >
        <h2>O desafio dos valores ocultos</h2>
        <p>
          Nem todo valor de jogo é explicitamente mostrado ao jogador. A barra de HP é vermelha e parcialmente cheia, mas não há número. O medidor de stamina é visual, sem dígitos. A "energia" de uma habilidade especial é representada por um efeito gráfico, não um contador. A posição do personagem existe internamente mas não é exibida. Em todos esses casos, você sabe que o valor existe, mas não sabe que número procurar.
        </p>
        <p>
          Além dos valores ocultos visualmente, existe outro desafio: valores que existem mas são representados de forma diferente do esperado. A vida pode ser armazenada como 1.0 (100%) em vez de 100. O ouro pode ter um XOR com uma chave aleatória para dificultar a leitura. A velocidade pode estar em centímetros por segundo em vez de metros por segundo. Em todos esses casos, o Exact Value não funciona — você precisa de abordagens diferentes.
        </p>

        <h2>A Varredura de Valor Desconhecido</h2>
        <p>
          O ponto de partida para qualquer valor desconhecido é o tipo de scan <strong>Unknown Initial Value</strong> do Cheat Engine. Em vez de buscar um número específico, essa varredura simplesmente fotografa todo o estado atual da memória do processo — armazena uma cópia de todos os bytes. Nas varreduras subsequentes, o CE compara o estado atual com esse snapshot para filtrar baseado em como os valores mudaram.
        </p>
        <p>
          A desvantagem é o custo: um processo moderno pode ter 2-4 GB de memória, e a varredura de Unknown Initial Value precisa armazenar todo esse conteúdo. Você precisará de RAM livre suficiente e paciência para a varredura inicial, que pode levar de 30 segundos a vários minutos dependendo do tamanho do processo e velocidade do disco.
        </p>
        <p>
          Para minimizar o impacto: antes de fazer uma varredura de Unknown Initial Value, feche outros programas pesados (navegador com muitas abas, outros jogos), desative o antivírus temporariamente (pode interferir com a leitura de memória), e esteja num estado estável no jogo onde o valor que você quer buscar está em algum valor que você consegue mudar de forma controlada.
        </p>

        <h2>Estratégias de Refinamento para Valores Ocultos</h2>
        <p>
          Após o snapshot inicial, você precisa refinar usando comparações relativas. A chave é fazer mudanças controladas e previsíveis no valor que você está buscando, alternando entre varreduras de "mudou" e "não mudou".
        </p>
        <p>
          <strong>Para barras de HP sem número:</strong> A estratégia clássica é alternar entre tomar dano e se curar. Após o Unknown Initial Value: tome algum dano (a barra diminui) → Next Scan "Decreased Value" (elimina tudo que não diminuiu). Cure-se (a barra sobe) → Next Scan "Increased Value". Tome dano de novo → "Decreased Value". Repita 5-8 vezes. O endereço da HP vai aparecer consistentemente como um valor que segue exatamente esse padrão — cai quando você toma dano, sobe quando você se cura.
        </p>
        <p>
          <strong>Para valores que só mudam em momentos específicos:</strong> Use a alternância entre "Changed" e "Unchanged". Quando o valor muda, use Changed. Quando o valor não muda, use Unchanged. Isso é eficaz para valores como "energia especial" que só se acumula quando você faz certas ações — você pode controlar exatamente quando ela muda e quando não.
        </p>
        <p>
          <strong>Para valores de posição:</strong> Mova o personagem numa direção → "Changed" (a posição mudou). Pare completamente → "Unchanged" (a posição não mudou). Mova noutra direção → "Changed". Esse padrão identifica rapidamente coordenadas X, Y e Z, mesmo sem saber quais valores elas têm.
        </p>

        <h2>Quando o Valor é uma Fração (0.0 a 1.0)</h2>
        <p>
          Muitos jogos armazenam barras de recurso como frações — 1.0 para 100% cheio, 0.5 para metade, 0.0 para vazio. Se você está buscando vida com Exact Value e tipo Integer e não encontra nada, experimente Float com valor entre 0.0 e 1.0.
        </p>
        <p>
          A abordagem com tipo Float e valor desconhecido: Unknown Initial Value com tipo Float → tome dano (a fração cai) → Decreased Value → cure-se (a fração sobe) → Increased Value → tome dano → Decreased Value. Geralmente em 3-5 ciclos você chega ao endereço. Quando encontrá-lo, o valor vai ser algo como 0.65 se você está com 65% de vida.
        </p>
        <CodeBlock
          title="Verificando se um valor é uma fração"
          language="text"
          code={`Se você encontrou um candidato e o valor é algo como 0.647 ou 1.0:

  1. Adicione à Address List
  2. Veja na coluna Value: se mostrar valores como 0.xxx, é um float percentual
  3. No jogo, verifique se 0.647 corresponde aproximadamente a 65% de vida
  4. Para setar vida max: defina o valor para 1.0 (e não para 100!)
  5. Para freeze de vida max: freeze em 1.0 (100%)

  Se o valor mostrado não faz sentido como percentual:
  → Tente Double em vez de Float (mais precisão)
  → Tente 4 Bytes Integer (pode ser 100 mesmo, mas você estava buscando como Float)`}
        />

        <h2>Valores Criptografados</h2>
        <p>
          Alguns jogos aplicam transformações matemáticas aos valores antes de armazená-los na memória, deliberadamente para dificultar a detecção por ferramentas como o Cheat Engine. O valor real é 100 de ouro, mas na memória está guardado como 100 × 1337 = 133700 (XOR, multiplicação, ou outras operações). Quando você busca 100, não encontra nada — porque na memória está 133700.
        </p>
        <p>
          Sinais de que um valor pode estar criptografado: você tem certeza de qual é o valor (ex: 100 de vida visível na HUD), mas Exact Value com Integer e Float retornam zero resultados depois de várias varreduras. Ou você encontra resultados mas quando modifica o valor, o jogo não responde.
        </p>
        <p>
          A abordagem para valores criptografados: use Unknown Initial Value + Changed/Unchanged. Isso não tenta adivinhar o valor criptografado — apenas rastreia quais endereços mudam junto com o valor visível. Após encontrar o endereço, você pode tentar descobrir a criptografia via "Find out what writes to this address" e analisar o código Assembly que escreve lá — a transformação matemática estará visível nas instruções.
        </p>
        <p>
          Versões mais recentes do Cheat Engine têm um campo "Encrypted scan" nas configurações que tenta diferentes transformações automaticamente. Vale explorar se o método manual não funcionar.
        </p>

        <h2>Identificando o Que Você Encontrou</h2>
        <p>
          Após encontrar um candidato, você precisa confirmar que é realmente o valor que buscava e não um falso positivo. A técnica mais confiável é o "teste de controle": defina o valor para um número bem específico e observe o efeito no jogo.
        </p>
        <p>
          Se você está buscando HP e encontrou um candidato mostrando 0.73 (Float), defina para 0.0 e observe: o personagem morreu? Ótimo, é o HP. Então defina para 1.0 — o HP está cheio? Perfeito, confirmado. Se ao definir 0.0 nada aconteceu no jogo, provavelmente não é o HP e sim outro float com valor similar que mudou junto com o HP por coincidência.
        </p>

        <AlertBox type="tip" title="Paciência com valores desconhecidos">
          Encontrar valores ocultos pode levar mais tempo que valores visíveis — são necessários mais ciclos de refinamento. Mas o processo é metódico e funciona: cada varredura elimina falsos positivos, e eventualmente você chega ao endereço certo. Não apresse o processo pulando varreduras.
        </AlertBox>

        <AlertBox type="info" title="Tipo de dado importa muito mais aqui">
          Com valores visíveis, você pode tentar Integer e se não funcionar tentar Float. Com valores ocultos, você não sabe qual tipo usar. Faça varreduras separadas com 4 Bytes, Float e Double para o mesmo valor. Muitas vezes o tipo errado é a razão de não encontrar nada, não a técnica.
        </AlertBox>
      </PageContainer>
    );
  }
  