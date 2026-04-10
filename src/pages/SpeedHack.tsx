import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function SpeedHack() {
    return (
      <PageContainer
        title="Speed Hack"
        subtitle="Como e por que o Speed Hack funciona, suas aplicações práticas e suas limitações."
        difficulty="iniciante"
        timeToRead="15 min"
      >
        <h2>Como o Speed Hack funciona por dentro</h2>
        <p>
          O Speed Hack do Cheat Engine não acelera seu hardware — ele intercepta as funções de tempo do sistema operacional que o jogo usa para medir quanto tempo passou. Funções como <code>GetTickCount</code>, <code>QueryPerformanceCounter</code>, <code>timeGetTime</code> e <code>GetSystemTime</code> são interceptadas pelo CE, que retorna valores multiplicados ou divididos pelo fator que você escolheu.
        </p>
        <p>
          Na prática: o jogo chama "quanto tempo passou?" e esperaria receber "16 milissegundos" (um frame a 60fps). Com o Speed Hack em 2.0x, o CE responde "32 milissegundos". O jogo então processa esse frame como se dois frames tivessem passado, efetivamente dobrando a velocidade de tudo que depende de tempo — animações, física, timers, cooldowns, velocidade de movimento.
        </p>
        <p>
          Isso explica tanto a eficácia quanto as limitações do Speed Hack. Qualquer coisa que o jogo calcula com base no tempo vai ser afetada. Mas coisas que não dependem de tempo — como colisões calculadas por posição, não por velocidade — podem não responder como esperado.
        </p>

        <h2>Ativando e Configurando o Speed Hack</h2>
        <p>
          Na janela principal do Cheat Engine, após anexar ao processo de um jogo, você verá um checkbox "Enable Speedhack" com um campo numérico ao lado. O processo é: marque o checkbox, ajuste o valor numérico, clique Apply. A mudança é instantânea — você verá o jogo acelerar ou desacelerar imediatamente.
        </p>
        <p>
          O valor 1.0 representa velocidade normal — o jogo roda como se o CE não estivesse interferindo. Valores acima de 1.0 aceleram (2.0 = dobro da velocidade, 5.0 = cinco vezes mais rápido, etc.). Valores abaixo de 1.0 desaceleram (0.5 = metade da velocidade, 0.1 = câmera lenta dramática). Valores negativos ou zero geralmente travam o jogo ou causam comportamento imprevisível — evite.
        </p>
        <p>
          Para desativar completamente, defina o valor para 1.0 e clique Apply, ou desmarque o checkbox "Enable Speedhack". O jogo volta à velocidade normal imediatamente.
        </p>

        <h2>Aplicações Práticas do Speed Hack</h2>
        <p>
          <strong>Grinding acelerado:</strong> Sem dúvida o uso mais popular. Em jogos de RPG onde você precisa matar centenas de inimigos para subir de nível, ou em jogos de farm onde certas missões precisam ser repetidas muitas vezes, o Speed Hack em 3-5x reduz drasticamente o tempo necessário. Uma sessão de grinding de 2 horas pode ser concluída em 30-40 minutos com 3x de velocidade.
        </p>
        <p>
          <strong>Pular seções entediantes:</strong> Sequências de diálogos lentos, cutscenes longas, telas de loading com conteúdo ativo, ou fases que você já jogou muitas vezes e não quer jogar de novo. Com o Speed Hack alto, você passa rapidamente pelo conteúdo que não te interessa mais.
        </p>
        <p>
          <strong>Câmera lenta para estudo:</strong> Um uso menos óbvio mas extremamente valioso. Abaixar a velocidade para 0.3x ou 0.1x permite analisar em detalhes os padrões de ataque de bosses difíceis, a janela de parry/dodge, as trajetórias de projéteis, e qualquer mecânica rápida demais para processar em velocidade normal. É como assistir ao replay em câmera lenta, mas você ainda está jogando.
        </p>
        <p>
          <strong>Debugging de código de jogo:</strong> Para desenvolvedores ou modders que analisam o código interno de jogos, rodar em câmera lenta permite observar o estado do jogo frame a frame, facilitando entender fluxos de execução que acontecem rápido demais para rastrear em tempo real.
        </p>
        <p>
          <strong>Speedrunning de prática:</strong> Paradoxalmente, usar câmera lenta para praticar seções difíceis de speedrun pode ajudar. Você aprende os inputs corretos em câmera lenta, memorizando a sequência, e progressivamente aumenta a velocidade até conseguir executar em velocidade normal.
        </p>

        <h2>Configurando Hotkeys para Controle de Velocidade</h2>
        <p>
          Alternar entre velocidades durante o jogo sem precisar clicar na janela do CE exige configurar hotkeys. No CE, clique com botão direito no campo de velocidade do Speed Hack → "Set hotkey for this value". Na janela que abre, pressione a tecla que você quer usar e defina o valor que será aplicado quando essa tecla for pressionada.
        </p>
        <p>
          Uma configuração popular é ter três hotkeys: uma para câmera lenta (ex: <kbd>F5</kbd> = 0.5x), uma para velocidade normal (<kbd>F6</kbd> = 1.0x), e uma para velocidade rápida (<kbd>F7</kbd> = 3.0x). Isso permite alternar instantaneamente entre os três modos sem tirar as mãos do joystick/teclado e sem ver a janela do CE.
        </p>

        <h2>Speed Hack via Script Lua</h2>
        <CodeBlock
          title="Controle de velocidade via Lua"
          language="lua"
          code={`-- Controlar o speed hack programaticamente
  speedhack_setSpeed(2.0)   -- acelera 2x
  speedhack_setSpeed(1.0)   -- volta ao normal
  speedhack_setSpeed(0.5)   -- câmera lenta

  -- Toggle entre normal e rápido com uma variável de estado
  local velRapida = false
  local function toggleVelocidade()
    velRapida = not velRapida
    if velRapida then
      speedhack_setSpeed(3.0)
      print("Speed Hack: 3x ativado")
    else
      speedhack_setSpeed(1.0)
      print("Speed Hack: velocidade normal")
    end
  end

  -- Registrar hotkey F5 para o toggle
  createHotkey(toggleVelocidade, VK_F5)
  print("F5 = Toggle velocidade 1x/3x")`}
        />

        <h2>Limitações e Problemas Comuns</h2>
        <p>
          <strong>Física se comporta mal em velocidades altas:</strong> Motores de física calculam colisões assumindo que passos de tempo são pequenos. Com Speed Hack alto, os passos de tempo ficam grandes e a física pode "explodir" — objetos passam uns pelos outros, o personagem atravessa o chão, veículos saem de controle. Geralmente 3-4x é o limite prático antes que a física comece a ter problemas graves.
        </p>
        <p>
          <strong>Áudio dessincronizado:</strong> O Speed Hack afeta o tempo do jogo, mas o sistema de áudio do Windows (DirectSound, XAudio2) tem seu próprio clock independente. O resultado é que o áudio continua em velocidade normal enquanto o jogo está acelerado — músicas ficam na velocidade correta mas estão "atrasadas" em relação às ações, e efeitos sonoros saem no momento errado. Para jogos com muito áudio narrativo (RPGs com dublagem), isso pode ser especialmente perturbador.
        </p>
        <p>
          <strong>Jogos online detectam e rejeitam:</strong> Jogos multiplayer têm verificações de tempo no servidor. Se o cliente reporta ter feito 100 ações em 10 segundos (o que normalmente levaria 20 segundos), o servidor detecta a anomalia e pode desconectar o jogador ou acionar sistemas anti-cheat. Em jogos com VAC, BattlEye, ou EAC, o Speed Hack é uma forma garantida de ban.
        </p>
        <p>
          <strong>O jogo usa seu próprio timer:</strong> Alguns jogos implementam seu próprio sistema de tempo em vez de usar as funções padrão do Windows. Nesses casos, o Speed Hack do CE não tem efeito porque as funções interceptadas não são as que o jogo usa. Para esses jogos, você precisaria encontrar o timer interno na memória e modificá-lo diretamente.
        </p>

        <AlertBox type="warning" title="Nunca use Speed Hack em jogos online">
          O Speed Hack é detectável e resulta em ban permanente na grande maioria dos jogos multiplayer. Use exclusivamente em single-player, ou em servidores privados onde as regras permitem. Mesmo jogos aparentemente single-player com verificações online podem ter problemas.
        </AlertBox>

        <AlertBox type="tip" title="Valores moderados são mais estáveis">
          Para uso geral, valores entre 1.5x e 3x oferecem boa aceleração sem quebrar a física ou animações. Para câmera lenta, valores entre 0.3x e 0.7x são os mais úteis para análise de mecânicas. Valores extremos (acima de 10x ou abaixo de 0.1x) raramente são práticos.
        </AlertBox>
      </PageContainer>
    );
  }
  