import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function PointerScanner() {
    return (
      <PageContainer
        title="Pointer Scanner"
        subtitle="Como usar o Pointer Scanner para encontrar automaticamente caminhos estáticos até endereços dinâmicos."
        difficulty="intermediário"
        timeToRead="18 min"
      >
        <h2>O Problema que o Pointer Scanner Resolve</h2>
        <p>
          Você passou 20 minutos fazendo varreduras, refinando resultados, e finalmente encontrou o endereço exato da vida do personagem. Você modifica para 9999, freeze, e o jogo funciona perfeitamente. Mas no dia seguinte, você abre o jogo de novo, carrega sua tabela .CT, e o valor que era "Vida do Personagem" está mostrando um número sem sentido, ou pior — o freeze não faz efeito nenhum. O cheat quebrou.
        </p>
        <p>
          Isso acontece porque o endereço que você encontrou era dinâmico — alocado pelo sistema operacional em um local diferente a cada vez que o jogo é iniciado. O objeto "personagem" foi criado em 0x1A2B3C00 ontem, mas hoje o mesmo objeto está em 0x3F7A2800. O endereço 0x1A2B3C4C onde você leu a vida ontem agora contém dados completamente diferentes.
        </p>
        <p>
          O Pointer Scanner resolve isso: em vez de usar o endereço do dado diretamente, ele encontra uma cadeia de ponteiros partindo de um endereço estático (que nunca muda) e seguindo referências até chegar ao dado. Mesmo que o objeto seja criado em lugares diferentes, a cadeia de ponteiros sempre aponta para onde ele está.
        </p>

        <h2>Entendendo Ponteiros antes de Usar o Scanner</h2>
        <p>
          Um ponteiro é simplesmente um valor que contém o endereço de outro valor. Em vez de guardar a vida diretamente, o jogo guarda a vida num endereço X. E num endereço estático Y (que nunca muda), ele guarda o valor X (o endereço da vida). Então para chegar à vida, você vai a Y, lê o valor lá (que é X), e vai para X+offset para ler a vida.
        </p>
        <p>
          Na prática, games modernos têm múltiplos níveis: um endereço estático aponta para um objeto base, que contém um ponteiro para outro objeto, que contém outro ponteiro, até chegar ao dado final. O Pointer Scanner encontra automaticamente todas essas cadeias.
        </p>

        <h2>Usando o Pointer Scanner Passo a Passo</h2>
        <p>
          <strong>Passo 1 — Encontre o endereço alvo:</strong> Usando varredura normal, encontre o endereço atual do valor que você quer criar um ponteiro. Para a vida, faça First Scan + Next Scans até chegar no endereço. Adicione à Address List e confirme que está funcionando.
        </p>
        <p>
          <strong>Passo 2 — Inicie o Pointer Scan:</strong> Clique com botão direito no endereço na Address List e selecione "Pointer scan for this address". Ou use o menu Tools → Pointer scanner. Uma janela de configuração abre.
        </p>
        <p>
          <strong>Passo 3 — Configure os parâmetros:</strong> Na janela de configuração do Pointer Scan, os parâmetros mais importantes são: "Max levels" (profundidade máxima da cadeia — comece com 5-7), "Max offset" (offset máximo entre ponteiros — 0x1000 é um bom padrão), e o crucial "Only find paths with static address" (deve estar marcado — busca apenas caminhos que começam em endereço estático). Clique OK.
        </p>
        <p>
          <strong>Passo 4 — Salve os resultados:</strong> O CE pede um nome de arquivo para salvar os resultados (.ptr). Escolha um nome descritivo como "Vida_scan1.ptr". O scanner começa a trabalhar — dependendo do tamanho do processo, pode levar de 30 segundos a vários minutos.
        </p>
        <p>
          <strong>Passo 5 — Reinicie o jogo completamente:</strong> Este passo é crítico. Feche o jogo completamente, feche e reabra o CE se necessário, e abra o jogo novamente. Carregue o save ou chegue ao mesmo ponto onde você encontrou o valor antes.
        </p>
        <p>
          <strong>Passo 6 — Encontre o novo endereço:</strong> Faça uma nova varredura para encontrar onde está o valor agora (após o reinício). Este endereço será diferente do anterior (porque o processo foi reiniciado e a memória foi realocada).
        </p>
        <p>
          <strong>Passo 7 — Refine o Pointer Scan:</strong> Na janela do Pointer Scanner (que ainda deve estar aberta com os resultados da primeira scan), vá em "Pointer Scanner → Rescan memory". Informe o novo endereço que você encontrou no passo 6. O CE filtra todos os ponteiros que NÃO levam ao novo endereço — eliminando os inválidos. Os que sobram são caminhos estáticos válidos.
        </p>
        <p>
          <strong>Passo 8 — Repita:</strong> Reinicie o jogo mais vezes, encontre o novo endereço, e faça Rescan novamente. Cada ciclo elimina mais ponteiros falsos. Após 3-5 ciclos, você deve ter uma lista pequena de ponteiros confiáveis.
        </p>

        <h2>Interpretando os Resultados</h2>
        <p>
          Cada resultado no Pointer Scanner mostra um caminho: o endereço base estático (relativo ao módulo, como "game.exe+0x009E48") seguido por uma série de offsets (como +0x148, +0x64, +0x4C). Para chegar ao valor final, você vai ao endereço base, lê o valor lá (que é um endereço), soma o primeiro offset, lê o valor nesse novo endereço, soma o próximo offset, e assim por diante.
        </p>
        <p>
          Resultados com menos níveis (offsets) são geralmente mais confiáveis e mais simples de usar. Um ponteiro de 2 níveis que sobreviveu a 5 reinícios é quase certamente válido. Um ponteiro de 7 níveis que sobreviveu ao mesmo número de testes também é válido, mas é mais frágil — atualização do jogo tem mais chance de quebrar uma cadeia longa.
        </p>
        <p>
          Quando a lista tem dezenas de resultados, selecione alguns com menos níveis e adicione à Address List para teste. Se o valor mostrado estiver correto e continuar correto após reiniciar o jogo várias vezes, o ponteiro é válido.
        </p>

        <h2>Adicionando o Ponteiro à Address List</h2>
        <CodeBlock
          title="Usando o resultado do Pointer Scanner"
          language="text"
          code={`Na janela do Pointer Scanner, após ter poucos resultados confiáveis:

  1. Selecione um resultado (preferencialmente com poucos níveis)
  2. Clique direito → "Add selected results to addresslist"
     ou arraste o resultado para a Address List

  3. O endereço aparece com cor roxa/violeta na Address List
     (indicando que é um ponteiro configurado)

  4. Renomeie para algo descritivo: "Vida [Ponteiro Estático]"

  5. VALIDAÇÃO — reinicie o jogo novamente e confirme:
     - O valor na Address List ainda mostra o HP correto?
     - Modificar o valor ainda afeta a vida no jogo?
     Se sim para ambas: o ponteiro é válido e pode ser salvo na tabela!`}
        />

        <h2>Configurações Avançadas do Pointer Scanner</h2>
        <p>
          <strong>"Pointer must point to module":</strong> Restringe o início da cadeia ao módulo principal do executável (game.exe). Reduz drasticamente o número de resultados e geralmente os torna mais confiáveis, pois ponteiros que começam no módulo principal são mais estáveis.
        </p>
        <p>
          <strong>"Allow stack":</strong> Inclui ponteiros na pilha (stack) do processo. Raramente útil — ponteiros de stack são geralmente temporários e inválidos fora de um contexto de função específica. Deixe desmarcado a menos que você saiba que precisa.
        </p>
        <p>
          <strong>"Use saved pointer scan file":</strong> Permite combinar múltiplos arquivos de scan. Se você fez scan com o endereço de hoje e salvou, e fez scan com o endereço de amanhã e salvou, você pode combinar os dois arquivos para refinar ainda mais.
        </p>

        <AlertBox type="tip" title="Mais ciclos = mais confiança">
          O número de vezes que você reinicia o jogo e refina é diretamente proporcional à confiança no ponteiro. Ponteiros que sobrevivem a 5+ reinícios raramente falham. Para ponteiros que você vai compartilhar em tabelas públicas, faça pelo menos 5-10 ciclos de validação.
        </AlertBox>

        <AlertBox type="warning" title="Ponteiros podem quebrar com updates do jogo">
          Cada vez que o desenvolvedor lança uma atualização que modifica o código ou estruturas de dados, os offsets do ponteiro podem mudar. Um ponteiro que funcionava perfeitamente antes de um patch pode parar de funcionar depois. Verifique tabelas sempre que o jogo for atualizado.
        </AlertBox>
      </PageContainer>
    );
  }
  