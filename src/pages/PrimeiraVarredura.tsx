import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function PrimeiraVarredura() {
    return (
      <PageContainer
        title="Primeira Varredura"
        subtitle="Como executar sua primeira varredura de memória com sucesso — escolhendo o tipo certo, o valor certo, e interpretando os resultados."
        difficulty="iniciante"
        timeToRead="15 min"
      >
        <h2>Antes de Varrer — Preparação Essencial</h2>
        <p>
          Uma varredura bem-sucedida começa antes de clicar em "First Scan". A preparação adequada evita os erros mais comuns e economiza muito tempo de frustração. Há três coisas a fazer antes de começar:
        </p>
        <p>
          Primeiro, <strong>abra o jogo e chegue a um estado estável</strong>. Carregue um save existente ou comece um novo jogo e chegue ao ponto onde o valor que você quer modificar é relevante. Se você quer modificar ouro, certifique-se de que já há ouro para ver e o valor está estável (não está sendo ganho ou gasto no momento). Se quer a vida, esteja em combate ou espere com a vida num valor fixo.
        </p>
        <p>
          Segundo, <strong>anote o valor exato</strong>. Pause o jogo se possível. Olhe para o número na tela: quantos exatamente? "100" ou "100.5"? Se há uma casas decimais, provavelmente é um float. Se é um número redondo, provavelmente é um inteiro. Quanto mais preciso você for ao anotar o valor, mais eficiente será a varredura.
        </p>
        <p>
          Terceiro, <strong>anexe o CE ao processo correto</strong>. Clique no ícone de computador com lupa no CE (ou no menu File → Open Process). Uma lista de processos aparece. Encontre o processo do jogo — geralmente tem o nome do jogo ou do executável (.exe) na lista. Clique e selecione. O CE aparece agora "conectado" ao jogo.
        </p>

        <h2>Escolhendo o Tipo de Dado Correto</h2>
        <p>
          Esta é a escolha mais importante da First Scan. O tipo de dado determina como o CE interpreta os bytes na memória. Um byte com o valor 100 em Integer é 100. Os mesmos bytes interpretados como Float representam um número completamente diferente. Se você escolher o tipo errado, o CE não vai encontrar o endereço correto — não porque ele não existe, mas porque está procurando o padrão de bytes errado.
        </p>
        <p>
          <strong>Regra prática para jogos:</strong> comece sempre com "4 Bytes" (inteiro de 32 bits). A grande maioria dos valores em jogos modernos são inteiros de 32 bits — vida, mana, ouro, nível, XP, munição, pontos. Se a varredura com 4 Bytes não produzir resultados convincentes (você refininou bastante mas os candidatos não respondem à modificação), então tente "Float" e depois "2 Bytes" (para jogos mais antigos ou simples).
        </p>
        <p>
          Use Float quando o valor tem casas decimais. Use 1 Byte quando o valor é pequeno (0-255) e parece não ser encontrado como 4 Bytes. Use 8 Bytes para jogos modernos em 64 bits onde valores podem exceder os limites de 32 bits. Use Double para floats de alta precisão (raro em jogos, mais comum em software científico).
        </p>

        <h2>Fazendo a First Scan</h2>
        <p>
          Com o processo anexado e os parâmetros configurados: no campo "Value" do CE, digite o número exato que você viu no jogo. Confirme que "Scan Type" está em "Exact Value" e o tipo de dado está correto. Clique "First Scan".
        </p>
        <p>
          O CE varre toda a memória do processo em busca de endereços que contêm exatamente aquele valor. Após alguns segundos, uma lista de resultados aparece — geralmente com centenas de milhares de entradas. Isso é normal e esperado: muitos endereços aleatórios coincidentemente têm aquele número. O objetivo das varreduras seguintes é eliminar os falsos positivos.
        </p>
        <p>
          Se a lista de resultados aparecer totalmente vazia (0 resultados), há um problema: ou o tipo de dado está errado, ou o valor que você anotou não está exatamente como você pensa, ou o jogo está ofuscando o valor. Nesse caso: tente outro tipo de dado, tente um valor próximo (se a vida é "100" exibida mas o jogo armazena "99" ou "101"), e use Unknown Initial Value se os outros falhem.
        </p>

        <h2>Refinando com Next Scans</h2>
        <p>
          Após a First Scan com muitos resultados, a fase de refinamento começa. O objetivo é fazer com que o valor alvo mude no jogo e então usar esse novo valor para filtrar os resultados.
        </p>
        <p>
          <strong>Método controlado:</strong> Cause uma mudança exata e conhecida no valor. Para HP: tome uma quantidade específica de dano de um inimigo fraco (que você sabe que causa, digamos, 10 de dano exatamente). Para ouro: gaste uma quantia exata comprando algo. Para XP: mate um inimigo que dê uma quantidade fixa de XP. Agora você sabe o novo valor: se tinha 100 de HP e tomou 10 de dano, agora tem 90.
        </p>
        <p>
          No CE, mude o campo de valor para o novo número (90) e clique "Next Scan". O CE mantém apenas os endereços que tinham o valor antigo E agora têm o novo valor. Esse filtro duplo elimina a maioria dos falsos positivos — endereços que coincidentemente tinham 100 antes mas não têm 90 agora (e vice-versa) são eliminados.
        </p>
        <p>
          Repita: cause mais mudanças no jogo (tome mais dano, gaste mais ouro) e faça Next Scans com os novos valores. Em 3-5 ciclos, você deve chegar a 1-10 candidatos. Se após 10+ ciclos você ainda tem milhares de resultados, algo está errado — o jogo pode estar usando um tipo diferente de dado, ou o valor que você acha que está mudando não é realmente o que está armazenado naquele campo.
        </p>

        <h2>Identificando o Endereço Correto</h2>
        <p>
          Quando a lista está com poucos candidatos (1-10), é hora de identificar qual é o real. A técnica mais rápida: selecione todos os candidatos na lista de resultados com <kbd>Ctrl+A</kbd>, clique direito e "Change value of selected addresses" → defina um valor facilmente identificável como 9999. Volte ao jogo — qual mudou? O HP foi para 9999? Aquele é o endereço correto.
        </p>
        <p>
          Se nenhuma mudança visível aconteceu: talvez o jogo tenha "corrigido" o valor imediatamente, ou talvez nenhum dos candidatos seja o verdadeiro endereço. Nesse caso, desfaça a mudança e continue refinando com mais Next Scans.
        </p>
        <p>
          Se múltiplas coisas mudaram: você tem mais de um endereço real. Alguns valores têm cópias (mirrors) na memória. Você pode precisar de todos eles para um cheat completo, ou pode ser que alguns sejam variáveis de sistema coincidentes. Modifique um de cada vez para descobrir qual produz o efeito correto no jogo.
        </p>

        <AlertBox type="tip" title="Máximo 5 resultados antes de adicionar à Address List">
          Espere ter 1-5 candidatos antes de adicionar à Address List e testar. Com muitos candidatos, você vai modificar endereços aleatórios além do correto, possivelmente causando travamentos. Seja paciente com os Next Scans — cada um elimina uma grande quantidade de falsos positivos.
        </AlertBox>

        <AlertBox type="warning" title="Não faça First Scan com o jogo carregando">
          Fazer First Scan enquanto o jogo ainda está inicializando (tela de loading) resulta em varreduras de estado transitório — valores que estão sendo escritos e mudando rapidamente. Sempre espere o jogo estar completamente carregado e em estado estável antes de começar a varrer.
        </AlertBox>
      </PageContainer>
    );
  }
  