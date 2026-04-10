import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Ponteiros() {
    return (
      <PageContainer
        title="Ponteiros e Endereços Dinâmicos"
        subtitle="Entenda por que endereços mudam entre sessões e como usar ponteiros para criar cheats permanentes."
        difficulty="intermediário"
        timeToRead="16 min"
      >
        <h2>O Problema dos Endereços Dinâmicos</h2>
        <p>
          Você passou 30 minutos encontrando o endereço da vida do personagem, fez o freeze, o cheat funcionou perfeitamente. No dia seguinte, abre o jogo, carrega sua tabela, e o endereço que era "Vida do Personagem" está mostrando lixo, ou o freeze está afetando algo completamente diferente. O cheat quebrou.
        </p>
        <p>
          Isso acontece porque a memória RAM é gerenciada pelo sistema operacional de forma dinâmica. Quando um jogo cria um objeto "personagem" na memória, o SO escolhe um bloco de bytes disponíveis para alocar. Na sessão de ontem, havia espaço livre em 0x1A2B3C00, então o personagem foi criado lá. Hoje, aquele espaço estava ocupado por outra coisa (talvez o SO carregou uma DLL diferente lá), então o personagem foi criado em 0x3F4A5B00. O endereço que você encontrou ontem aponta para uma região completamente diferente hoje.
        </p>
        <p>
          Esse comportamento é chamado de "endereço dinâmico" — o valor muda entre execuções. Em contraste, "endereços estáticos" ficam sempre no mesmo lugar, geralmente porque são parte do próprio executável ou de seções de dados que sempre são mapeadas no mesmo offset do módulo.
        </p>

        <h2>Como Identificar um Endereço Dinâmico</h2>
        <p>
          No Cheat Engine, endereços são coloridos para indicar seu tipo. <strong>Endereços verdes</strong> são estáticos — eles são expressos como "nome_do_modulo+offset" (ex: "game.exe+0x009E48") e esse offset é sempre o mesmo porque o offset dentro do módulo não muda. <strong>Endereços pretos</strong> são dinâmicos — são números absolutos como "0x1A2B3C4C" que mudam entre sessões.
        </p>
        <p>
          Se você adicionar um endereço dinâmico (preto) à Address List e salvar a tabela, ao reabrir o jogo e carregar a tabela, aquele endereço vai apontar para uma localização aleatória de memória. O valor mostrado será lixo ou zero, e modificá-lo pode não ter efeito ou pode travar o jogo.
        </p>

        <h2>Ponteiros — A Solução</h2>
        <p>
          Um ponteiro é um valor que contém o endereço de outro valor. Em vez de usar o endereço dinâmico 0x1A2B3C4C diretamente, você usa um endereço estático que contém o valor 0x1A2B3C00 (a base do objeto), e sabe que o dado que quer está em [0x1A2B3C00 + 0x4C]. Se a sessão seguinte criar o objeto em 0x3F4A5B00, o endereço estático vai automaticamente conter 0x3F4A5B00, e o ponteiro vai corretamente apontar para 0x3F4A5B00 + 0x4C.
        </p>
        <p>
          O conceito é simples mas o processo de encontrar o ponteiro correto requer trabalho — o Pointer Scanner automatiza isso, mas você ainda precisa entender o que está fazendo para verificar e usar os resultados corretamente.
        </p>

        <h2>Como Ponteiros São Representados no CE</h2>
        <CodeBlock
          title="Notação de ponteiro no Cheat Engine"
          language="text"
          code={`Ponteiro de 1 nível:
  Endereço: "game.exe"+9E48
  Offsets:  +4C
  Interpretação: vá para game.exe+0x9E48, leia o endereço ali,
                 some 0x4C, e esse é o endereço do seu valor.

  Ponteiro de 3 níveis:
  Endereço: "game.exe"+9E48
  Offsets:  +148, +64, +4C
  Interpretação:
  1. Leia o valor em game.exe+0x9E48  → chame de A
  2. Leia o valor em A + 0x148        → chame de B
  3. Leia o valor em B + 0x64         → chame de C
  4. C + 0x4C é o endereço do seu dado

  Na Address List: endereços com ponteiro aparecem em roxo/violeta
  e o CE resolve a cadeia automaticamente a cada atualização.`}
        />

        <h2>Adicionando um Ponteiro Manualmente</h2>
        <p>
          Se você já sabe os offsets do ponteiro (por exemplo, copiou de uma tabela de outra pessoa ou obteve via Pointer Scanner), pode adicionar manualmente. Clique no botão azul "Add address manually" na Address List. Na janela, marque a checkbox "Pointer". Um campo para o endereço base aparece — escreva o endereço estático (ex: "game.exe+0x9E48"). Campos para offsets aparecem abaixo; clique no botão "+" para adicionar mais níveis. Preencha cada offset na ordem. Defina o tipo de dado (4 Bytes, Float, etc.) e clique OK.
        </p>
        <p>
          O ponteiro aparece na Address List em roxo. Se o CE consegue resolver a cadeia e chegar a um endereço válido, o valor correto aparece. Se mostra "??" ou um número sem sentido, algum offset está errado, o jogo ainda não inicializou o objeto, ou o processo não está rodando.
        </p>

        <h2>Verificando se um Ponteiro é Válido</h2>
        <p>
          O processo de validação de ponteiro é simples mas crucial. Com o jogo rodando e o personagem carregado: o valor mostrado na Address List deve corresponder ao valor real no jogo. Modifique o valor — se a mudança se reflete no jogo, o ponteiro é válido para esta sessão.
        </p>
        <p>
          Para confirmar que é permanente: feche completamente o jogo, reabra, carregue o save, e verifique novamente. Se o ponteiro ainda mostra o valor correto após o reinício, é um ponteiro estático válido. Repita esse teste 3-5 vezes para ter confiança.
        </p>

        <AlertBox type="tip" title="Ponteiros são o elemento mais valioso de uma tabela">
          Uma tabela com ponteiros estáticos válidos funciona indefinidamente (até uma atualização do jogo que mude os offsets). Uma tabela com apenas endereços dinâmicos é descartável. Sempre que você criar uma tabela para compartilhar, invista tempo para descobrir os ponteiros estáticos — é o que torna a tabela verdadeiramente útil para outros.
        </AlertBox>

        <AlertBox type="warning" title="Ponteiros podem apontar para null (0x00000000)">
          Se o objeto para o qual o ponteiro aponta ainda não foi criado (o jogo ainda está carregando, o personagem ainda não foi selecionado), o endereço base pode conter 0x00000000 — um ponteiro nulo. Tentar ler da posição 0x00000000 vai causar um erro. O CE exibe "??" nesses casos. Sempre verifique se o jogo está completamente carregado antes de usar ponteiros.
        </AlertBox>
      </PageContainer>
    );
  }
  