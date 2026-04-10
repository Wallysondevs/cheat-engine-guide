import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Breakpoints() {
    return (
      <PageContainer
        title="Breakpoints e Debugging"
        subtitle="Como usar breakpoints para pausar o jogo em momentos exatos, inspecionar o estado interno e modificar o comportamento."
        difficulty="intermediário"
        timeToRead="18 min"
      >
        <h2>O que é um breakpoint e por que usar</h2>
        <p>
          Um breakpoint é um ponto de parada — quando a execução do processo chega a um breakpoint, o CE pausa tudo e te dá controle completo para inspecionar o estado atual: registradores, memória, pilha de chamadas. É como ter um "pause" na execução do jogo no momento exato que te interessa.
        </p>
        <p>
          Por que isso é importante para engenharia reversa? Porque a memória sozinha não conta toda a história. Você viu que a vida diminui, mas não sabe exatamente qual linha de código faz isso, quais valores são usados no cálculo, de onde vem o objeto do personagem. Um breakpoint te coloca no momento exato em que o código responsável está executando, com todos os registradores mostrando os valores que ele está usando.
        </p>

        <h2>Tipos de Breakpoints</h2>
        <p>
          O Cheat Engine suporta dois tipos fundamentais de breakpoints, cada um com propósitos diferentes:
        </p>
        <p>
          <strong>Software Breakpoints (INT3):</strong> São implementados modificando a primeira instrução no endereço alvo para a instrução INT3 (byte 0xCC). Quando o processador executa 0xCC, ele gera uma exceção que o debugger (CE) intercepta, pausando a execução. São os breakpoints mais comuns, mas têm uma limitação: eles modificam o código na memória, o que alguns anti-cheats detectam.
        </p>
        <p>
          <strong>Hardware Breakpoints:</strong> Usam registradores especiais do processador (DR0-DR7, os "debug registers") para definir condições de parada sem modificar o código. São mais furtivos e mais versáteis — podem pausar não apenas quando código é executado, mas quando qualquer instrução lê ou escreve um endereço de memória específico, independente de onde no código essa instrução estiver.
        </p>
        <p>
          A distinção prática: use software breakpoints quando você já sabe qual instrução quer analisar e quer pausar quando ela executar. Use hardware breakpoints quando quer pausar sempre que um endereço de memória específico for acessado — essencial para descobrir quem escreve ou lê um valor.
        </p>

        <h2>Adicionando um Software Breakpoint</h2>
        <p>
          Na janela do Memory View com o disassembler aberto, navegue até a instrução onde quer pausar. Clique na instrução para selecioná-la, depois pressione <kbd>F5</kbd> para toggle do breakpoint. Um ponto vermelho aparece na margem esquerda indicando que o breakpoint está ativo. Pressione F5 novamente para remover.
        </p>
        <p>
          Você também pode clicar diretamente na margem esquerda (a área cinza ao lado dos endereços) para adicionar/remover um breakpoint com um clique. Breakpoints que você adicionou aparecem também no menu Debug → Breakpoints List, onde você pode gerenciá-los todos de uma vez.
        </p>
        <p>
          Uma vez que o breakpoint está configurado, volte ao jogo e cause a ação que dispara aquele código (tome dano, use uma habilidade, compre algo). O CE detecta a execução e pausa o processo — o jogo congela, a janela do CE ganha foco, e você vê os registradores atuais no painel direito do Memory View.
        </p>

        <h2>Adicionando Hardware Breakpoints</h2>
        <p>
          Os hardware breakpoints mais úteis são adicionados a endereços de memória, não a endereços de código. O workflow típico:
        </p>
        <p>
          1. Encontre o endereço do valor que você quer rastrear (ex: a vida do personagem). 2. Na Address List ou na lista de resultados, clique com botão direito → "Find out what writes to this address". Uma janela abre monitorando writes naquele endereço. 3. Cause uma mudança no valor no jogo (tome dano). 4. A instrução que escreveu aparece na lista. Agora você pode ir ao disassembler naquela instrução para análise detalhada.
        </p>
        <p>
          Alternativamente, para definir um hardware breakpoint de Read (para descobrir quem lê o valor), use "Find out what reads this address". Isso é útil quando você quer saber qual sistema usa o valor — por exemplo, qual função de rendering lê a vida para atualizar a barra na HUD.
        </p>

        <h2>Controlando a Execução Após um Breakpoint</h2>
        <p>
          Quando o processo está pausado num breakpoint, o jogo está completamente congelado. Você pode tomar o tempo que quiser para analisar. Quando estiver pronto para continuar, o CE oferece várias opções de execução:
        </p>
        <p>
          <strong>F9 — Run:</strong> Continua a execução normalmente até o próximo breakpoint (ou indefinidamente, se não houver mais breakpoints). O jogo volta a rodar. Use quando terminou a análise do momento atual.
        </p>
        <p>
          <strong>F8 — Step Over:</strong> Executa apenas a instrução atual e para na próxima. Se a instrução atual for um CALL (chamada de função), F8 executa toda a função chamada de uma vez e para na instrução após o CALL — sem entrar dentro da função. Use quando quer avançar linha por linha sem mergulhar em funções.
        </p>
        <p>
          <strong>F7 — Step Into:</strong> Igual ao F8, mas se a instrução for um CALL, entra dentro da função chamada e para na primeira instrução dela. Use quando quer analisar o interior de uma função específica.
        </p>
        <p>
          <strong>Shift+F8 ou F6 — Step Out:</strong> Executa até o fim da função atual e para na instrução que chama esta função (o endereço de retorno). Útil quando você entrou demais em uma função e quer voltar ao nível de chamada.
        </p>

        <h2>O que Fazer com o Processo Pausado</h2>
        <p>
          Enquanto o processo está pausado, você tem acesso total ao estado do processador. O painel de registradores mostra todos os valores atuais — duplo clique em qualquer registrador para editá-lo. Você pode modificar EAX antes de continuar para mudar o resultado de um cálculo. Pode toggle ZF para forçar uma condição de salto a tomar um caminho diferente. Pode navegar pelo hex editor enquanto o processo está pausado para inspecionar áreas de memória específicas.
        </p>
        <CodeBlock
          title="Workflow completo de análise com breakpoint"
          language="text"
          code={`Cenário: descobrir como o dano é calculado

  1. Encontre o endereço da vida por varredura
  2. "Find out what writes" → identifique a instrução: MOV [EBX+4C], ECX em 0x00A1F22C
  3. Abra o Memory View → Ctrl+G → 0x00A1F22C
  4. Clique na instrução → F5 para breakpoint
  5. Volte ao jogo → tome dano → CE pausa
  6. Anote os valores: ECX = novo HP (ex: 75), EAX = dano causado (ex: 25)
  7. Veja as instruções anteriores: SUB ECX, EAX ← aqui calculou HP - Dano
  8. Ainda mais acima: CALL que retornou o dano em EAX
  9. Para anular o dano: modifique EAX = 0 e pressione F9
     Resultado: o SUB vai fazer HP - 0 = HP inalterado!
  10. Ou: modifique ECX = 100 para setar HP para 100 independente do dano`}
        />

        <h2>Conditional Breakpoints — Pausando apenas quando necessário</h2>
        <p>
          Um problema comum com breakpoints em código de jogo é que eles disparam com muita frequência. Se a instrução que escreve a vida for chamada 60 vezes por segundo, seu breakpoint vai pausar o jogo a cada poucos segundos mesmo quando você não quer. A solução são os conditional breakpoints — breakpoints que pausam apenas quando uma condição específica é verdadeira.
        </p>
        <p>
          Para adicionar uma condição, clique com botão direito no breakpoint já configurado → "Set condition" (ou veja em Debug → Breakpoints List → selecione o breakpoint → Edit). Você pode escrever uma condição em Lua que retorna true quando o breakpoint deve pausar: por exemplo, "EAX == 0" pausaria apenas quando o dano é zero, ou "readInteger(EBX+0x4C) < 20" pausaria apenas quando a vida cair abaixo de 20.
        </p>

        <AlertBox type="warning" title="Breakpoints pausam o processo inteiro, incluindo threads">
          Quando um breakpoint é atingido, todos os threads do processo são pausados — não apenas o thread que atingiu o breakpoint. Em jogos online, isso causa imediatamente um timeout de conexão. Use breakpoints apenas em modo offline ou single-player.
        </AlertBox>

        <AlertBox type="tip" title="Use Step Over (F8) extensivamente para entender o fluxo">
          Depois de pausar num breakpoint, usar F8 repetidamente para avançar instrução por instrução é a melhor forma de entender o que um trecho de código faz. Observe como os valores dos registradores mudam a cada passo. É lento mas extremamente educativo, e é assim que profissionais de engenharia reversa trabalham.
        </AlertBox>
      </PageContainer>
    );
  }
  