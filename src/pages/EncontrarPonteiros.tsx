import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function EncontrarPonteiros() {
    return (
      <PageContainer
        title="Encontrando Ponteiros"
        subtitle="Métodos manuais e automáticos para descobrir ponteiros estáticos — a base de qualquer tabela permanente."
        difficulty="intermediário"
        timeToRead="18 min"
      >
        <h2>Por que encontrar ponteiros é tão importante</h2>
        <p>
          Uma tabela .CT com endereços dinâmicos (pretos) é uma tabela descartável — funciona hoje, quebra amanhã. Uma tabela com ponteiros estáticos é um recurso permanente — funciona hoje, funciona em seis meses, funciona depois de reinstalar o jogo. Essa diferença explica por que criar tabelas de qualidade exige sempre encontrar ponteiros estáticos para seus endereços.
        </p>
        <p>
          Entender como encontrar ponteiros também é o que separa usuários casuais do Cheat Engine de usuários avançados que conseguem criar cheats para qualquer jogo, não apenas usando tabelas feitas por outros. É uma habilidade que, uma vez dominada, se aplica a qualquer jogo.
        </p>

        <h2>Método 1 — Pointer Scanner (Automático)</h2>
        <p>
          O método mais acessível para a maioria dos usuários. O CE automatiza a busca por caminhos de ponteiros partindo de qualquer endereço. O processo completo está descrito em detalhes na página dedicada ao Pointer Scanner, mas em resumo: você fornece o endereço dinâmico atual, o CE faz uma varredura completa em busca de caminhos estáticos até aquele endereço, você reinicia o jogo e fornece o novo endereço, e o CE elimina os caminhos inválidos. Repita 3-5 vezes.
        </p>
        <p>
          A principal vantagem do método automático é que ele não exige que você entenda a estrutura interna do jogo. É uma abordagem de força bruta que funciona muito bem na prática. A desvantagem é que pode retornar muitos resultados para análise, e alguns resultados podem ser falsos positivos que parecem funcionais mas quebram em condições específicas (como quando o jogador morre e um novo objeto é criado).
        </p>

        <h2>Método 2 — "What Writes to This Address" (Manual)</h2>
        <p>
          Este método envolve rastrear manualmente qual código do jogo escreve no endereço e de onde esse código obtém o endereço. É mais trabalhoso mas fornece compreensão mais profunda e frequentemente leva a ponteiros mais robustos.
        </p>
        <p>
          O processo: encontre o endereço do valor (ex: vida) por varredura normal. Clique com botão direito → "Find out what writes to this address". Uma janela de monitoramento abre. Volte ao jogo e cause uma mudança no valor (tome dano). Na janela, uma instrução Assembly aparece listando o código que escreveu no endereço — algo como: "MOV [EBX+0x4C], EAX em endereço 0x00A1F233". Isso diz que a instrução no endereço 0x00A1F233 escreveu EAX em [EBX+0x4C]. Portanto, EBX aponta para o objeto que contém a vida no offset 0x4C.
        </p>
        <p>
          Agora você precisa rastrear de onde EBX vem. Abra o Memory View, coloque um breakpoint no endereço 0x00A1F233. Quando o breakpoint é atingido (cause mais dano), o CE pausa e você vê o estado dos registradores: EBX contém o endereço do objeto do personagem (ex: 0x1A2B3C00). Agora você precisa encontrar quem aponta para 0x1A2B3C00.
        </p>
        <p>
          Você pode usar o Pointer Scanner neste ponto (mas agora só precisa encontrar quem aponta para 0x1A2B3C00, não para 0x1A2B3C4C = o endereço do campo vida), ou pode inspecionar o código que faz CALL para a função que contém nosso MOV — olhando como o objeto é passado como argumento.
        </p>
        <CodeBlock
          title="Analisando o código que modificou o valor"
          language="asm"
          code={`; Instrução encontrada pelo "What Writes":
  ; 00A1F233: MOV [EBX+0x4C], EAX
  ;
  ; Isso significa:
  ; - EBX = endereço base do objeto (o personagem provavelmente)
  ; - 0x4C = offset do campo vida dentro do objeto
  ; - EAX = novo valor da vida (o dano já calculado)
  ;
  ; Para encontrar o ponteiro para EBX:
  ; 1. Coloque breakpoint em 00A1F233
  ; 2. Quando pausar, note o valor de EBX (ex: 0x1A2B3C00)
  ; 3. Faça Pointer Scan para o endereço 0x1A2B3C00 (não 0x1A2B3C4C)
  ; 4. Os ponteiros encontrados para 0x1A2B3C00 são mais genéricos e
  ;    frequentemente com menos níveis do que para o endereço final`}
        />

        <h2>Método 3 — Dissect Data/Structures</h2>
        <p>
          Uma vez que você tem o endereço base de um objeto (como o 0x1A2B3C00 do objeto personagem no exemplo acima), o CE pode ajudar a mapear toda a estrutura automaticamente usando a ferramenta Dissect Data/Structures.
        </p>
        <p>
          Acesse em Tools → Dissect Data/Structures (ou Ctrl+Shift+D). Informe o endereço base (0x1A2B3C00) e o tamanho da estrutura a inspecionar (comece com 256 ou 512 bytes — você pode ampliar depois). O CE exibe uma tabela com cada offset e o valor atual naquele offset. Agora interaja com o jogo: tome dano → o offset 0x4C muda (é a vida). Gaste mana → outro offset muda (é a mana). Ganhe XP → mais outro offset. Progressivamente você mapeia toda a estrutura do objeto.
        </p>
        <p>
          Esta ferramenta é poderosa não apenas para encontrar ponteiros, mas para entender profundamente como o jogo organiza seus dados. Uma vez que você entende a estrutura, criar cheats para qualquer campo dela é trivial.
        </p>

        <h2>Verificando se o Ponteiro é Realmente Estático</h2>
        <p>
          Antes de declarar que um ponteiro funciona e publicar sua tabela, valide rigorosamente. O problema é que alguns caminhos de ponteiros parecem estáticos mas na verdade dependem de condições específicas — funcionam enquanto você está numa certa área do jogo, mas quebram quando muda de mapa ou quando o objeto é destruído e recriado.
        </p>
        <p>
          O protocolo de validação recomendado: reinicie o jogo do zero (não apenas recarregue o save) e verifique se o ponteiro aponta para o valor correto. Faça isso 3-5 vezes. Depois, mude de área/mapa/nível e verifique novamente. Morra e reviva (se o jogo suportar) e verifique. Se o ponteiro sobrevive a todos esses testes, é genuinamente estático.
        </p>

        <AlertBox type="tip" title="Menos níveis geralmente significa mais estável">
          Quando o Pointer Scanner retorna múltiplos resultados válidos, prefira os que têm menos níveis de ponteiro. Um caminho de 3 níveis é mais robusto que um de 7 — há menos offsets que podem mudar num update, e há menos dependências de objetos intermediários existirem. Use os resultados de muitos níveis apenas como último recurso.
        </AlertBox>

        <AlertBox type="info" title="Ponteiros para arrays são especiais">
          Quando o jogo tem múltiplos personagens (party em um RPG, por exemplo), pode existir um array de ponteiros para personagens. O ponteiro estático pode apontar para o array, e você precisa de um índice adicional para selecionar o personagem correto. Nesses casos, o endereço final seria [arrayBase + índice * tamanhoObjeto + offset]. Isso requer uma abordagem ligeiramente diferente com scripts Lua.
        </AlertBox>
      </PageContainer>
    );
  }
  