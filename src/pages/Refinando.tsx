import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Refinando() {
    return (
      <PageContainer
        title="Refinando Resultados"
        subtitle="Técnicas avançadas para reduzir milhares de candidatos para o endereço exato de forma eficiente."
        difficulty="iniciante"
        timeToRead="15 min"
      >
        <h2>O desafio de muitos resultados</h2>
        <p>
          Uma First Scan típica retorna dezenas de milhares ou centenas de milhares de resultados. Mesmo após alguns Next Scans, você pode ainda ter centenas de candidatos. O objetivo do refinamento é reduzir sistematicamente essa lista até chegar a 1-5 endereços que são claramente os corretos. Esta página apresenta todas as técnicas disponíveis para fazer isso de forma eficiente.
        </p>

        <h2>A Técnica Fundamental — Mudanças Controladas</h2>
        <p>
          A razão pela qual o refinamento funciona é simples: o valor que você busca muda de formas previsíveis baseadas em ações específicas que você controla. Falsos positivos — endereços que coincidentemente têm os mesmos valores — raramente seguem o mesmo padrão preciso. Então, quanto mais específicas e controladas forem as mudanças que você faz, mais rápido os falsos positivos são eliminados.
        </p>
        <p>
          Em vez de simplesmente jogar o jogo e fazer Next Scans com novos valores aleatórios, a abordagem profissional é: causar mudanças exatas de quantidades conhecidas. Se você busca ouro e tem 100, compre exatamente um item de 17 de ouro. Agora você sabe que o ouro deveria ser 83. Busca por 83 após comprar exatamente 17 é muito mais discriminante do que buscar por um valor novo desconhecido.
        </p>

        <h2>Usando Mudanças Incrementais Alternadas</h2>
        <p>
          Uma técnica altamente eficaz: alterne entre aumentar e diminuir o valor de formas específicas. Se busca HP: tome 10 de dano (HP cai) → Next Scan com novo HP → cure 5 (HP sobe ligeiramente) → Next Scan → tome 20 de dano → Next Scan → cure totalmente → Next Scan. A alternância de direção com quantidades específicas elimina os endereços que apenas seguem uma tendência geral.
        </p>

        <h2>Filtrando por Tipo de Dado</h2>
        <p>
          Se após 10 Next Scans você ainda tem muitos resultados com um tipo de dado, tente mudar o tipo. Clique "New Scan" (para limpar), mude o tipo de dado (ex: de 4 Bytes para Float), e refaça o processo. Se o valor real é um Float e você estava buscando como Integer, todos os resultados anteriores eram falsos positivos. Com o tipo correto, você deve convergir muito mais rápido.
        </p>
        <p>
          Um sinal de que o tipo está errado: você faz 15+ Next Scans mas a contagem de resultados não cai abaixo de 100-200. Com o tipo correto e mudanças controladas, geralmente chega a menos de 10 resultados em 5-8 scans. Persistência com o tipo errado nunca converge.
        </p>

        <h2>A Técnica de "Change Value Todos e Observar"</h2>
        <p>
          Com 10-20 candidatos restantes, você pode usar uma abordagem prática direta: selecione todos os candidatos na lista de resultados (<kbd>Ctrl+A</kbd>), clique direito → "Change value of selected addresses", defina um valor absurdo e fácil de identificar (como 9999). Volte ao jogo imediatamente e observe:
        </p>
        <p>
          Se algo inesperado aconteceu (o jogo travou, uma barra ficou cheia, texto mudou), você identificou que pelo menos um dos candidatos é um endereço importante. Se a barra de HP ficou cheia — ótimo, é o HP! Se o jogo travou — você tocou em algo crítico; pressione Ctrl+Z (se disponível) ou reinicie e refine mais antes de modificar.
        </p>
        <p>
          Se nada mudou no jogo, provavelmente nenhum dos candidatos é o endereço real — o valor real pode estar em outro formato. Desfaça as mudanças (se possível) e tente com um tipo diferente.
        </p>

        <h2>Restringindo a Região de Memória</h2>
        <p>
          Uma técnica menos conhecida: restringir a varredura a regiões específicas de memória pode eliminar muito ruído. Acesse as configurações de varredura (botão Scan Options ou o menu Memory Scan) e configure o range de memória. Em vez de varrer toda a memória do processo (0x00000000 a 0x7FFFFFFF em 32 bits), você pode varrer apenas o heap (onde objetos dinâmicos ficam) ou apenas o módulo principal.
        </p>
        <p>
          Para a maioria dos valores de gameplay (vida, ouro, XP), eles ficam no heap — memória alocada dinamicamente. A stack (pilha) e o módulo principal (.text, .data) raramente contêm valores de gameplay persistentes. Restringir a varredura ao heap pode reduzir o tamanho da First Scan em 50-70%.
        </p>

        <h2>Usando a Filtragem "Between" para Refinamento</h2>
        <p>
          O tipo de scan "Value Between" pode ser usado não apenas na First Scan mas também em Next Scans. Se você sabe que o HP deveria estar entre 50 e 150 depois de uma sequência de combate, buscar "Value between 50 and 150" é muito mais restritivo que buscar "Exact Value 83" (que pode ser qualquer coisa que coincidentemente tem 83).
        </p>

        <AlertBox type="tip" title="Regra dos 10 scans">
          Se após 10 Next Scans bem executados você ainda tem mais de 50 resultados, algo está errado — provavelmente o tipo de dado ou o valor inicial estão incorretos. Recomece com uma hipótese diferente (tipo diferente, abordagem de Unknown Initial Value) em vez de continuar com uma abordagem que claramente não está convergindo.
        </AlertBox>

        <AlertBox type="info" title="Salve a lista de resultados intermediária">
          Se você chegou a 50-100 bons candidatos após muito trabalho mas precisa parar e continuar depois, adicione todos os candidatos à Address List antes de fechar o CE. Mesmo sem saber qual é o correto, você preserva o progresso e pode continuar o refinamento na próxima sessão.
        </AlertBox>
      </PageContainer>
    );
  }
  