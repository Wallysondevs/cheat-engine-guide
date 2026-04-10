import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Hotkeys() {
    return (
      <PageContainer
        title="Hotkeys e Atalhos"
        subtitle="Configure teclas de atalho para controlar seus cheats sem sair do jogo — indispensável para qualquer tabela profissional."
        difficulty="iniciante"
        timeToRead="14 min"
      >
        <h2>Por que hotkeys são indispensáveis</h2>
        <p>
          Usar cheats sem hotkeys é fundamentalmente inconveniente. Você está no meio de uma batalha intensa, a vida cai para zero, e você precisa: pressionar Alt+Tab para sair do jogo (possivelmente causando uma pausa ou lag), clicar na janela do CE, marcar o checkbox do freeze de vida, e então Alt+Tab de volta ao jogo — que provavelmente já mostrou a tela de morte. Com hotkeys, você simplesmente pressiona F1 durante o jogo e o cheat ativa instantaneamente, sem jamais tirar os olhos da tela.
        </p>
        <p>
          Hotkeys bem configuradas também permitem usar o Cheat Engine como um verdadeiro trainer — uma ferramenta que roda em background e responde a pressionamentos de tecla durante o jogo, da mesma forma que trainers comerciais (como os do WeMod) funcionam. A diferença é que você mesmo criou e controla tudo.
        </p>

        <h2>Hotkeys de Endereço Individual</h2>
        <p>
          Cada endereço na Address List pode ter sua própria hotkey para controlar o freeze. Para configurar, clique com botão direito no endereço → "Set hotkey". Uma janela abre com dois campos principais:
        </p>
        <p>
          O campo de tecla: clique nele e pressione a tecla que quer usar. O CE registra a tecla (ou combinação). Teclas de função (F1-F12) são as mais populares para hotkeys de jogo porque raramente conflitam com outros atalhos e são fáceis de alcançar. Mas você pode usar qualquer tecla, inclusive combinações com Ctrl, Alt ou Shift.
        </p>
        <p>
          O campo de ação: um menu suspenso que define o que acontece quando a tecla é pressionada. As opções são: "Toggle activation" (alterna entre ativo e inativo — o uso mais comum), "Activate" (sempre ativa, nunca desativa), "Deactivate" (sempre desativa), e "Set value to X" (define o valor para um número específico sem freeze). Há também "Increase/Decrease value by X" para hotkeys que adicionam ou subtraem do valor atual.
        </p>

        <h2>Hotkeys Globais de Tabela</h2>
        <p>
          Além das hotkeys individuais de cada endereço, existe um sistema de hotkeys globais que podem executar ações complexas com uma única tecla. Acesse em Table → Table Hot Keys (ou Ctrl+H). Aqui você pode criar hotkeys que executam scripts Lua completos quando ativadas.
        </p>
        <p>
          A vantagem das hotkeys globais é que uma única tecla pode ativar ou desativar múltiplos endereços ao mesmo tempo, ou executar lógica condicional. Por exemplo: uma hotkey de "God Mode" que ativa o freeze de vida, mana, e escudo ao mesmo tempo, ou uma hotkey que aplica um conjunto completo de buffs.
        </p>
        <CodeBlock
          title="Hotkey global que ativa múltiplos cheats"
          language="lua"
          code={`-- Hotkey que ativa/desativa "God Mode" completo
  local godModeAtivo = false

  local function toggleGodMode()
    godModeAtivo = not godModeAtivo
    local al = getAddressList()
    
    -- Lista de descrições de endereços para incluir no god mode
    local cheats = {"Vida Infinita", "Mana Infinita", "Escudo Infinito", "Stamina Infinita"}
    
    for _, nome in ipairs(cheats) do
      local rec = al.getMemoryRecordByDescription(nome)
      if rec then
        rec.Active = godModeAtivo
      end
    end
    
    if godModeAtivo then
      showMessage("God Mode ATIVADO")
    else
      showMessage("God Mode DESATIVADO")
    end
  end

  -- Registra a hotkey F1
  createHotkey(toggleGodMode, VK_F1)
  print("F1 = Toggle God Mode")`}
        />

        <h2>Códigos de Tecla Virtual (VK Codes)</h2>
        <p>
          Quando você cria hotkeys via Lua, precisa especificar as teclas usando seus códigos virtuais (Virtual Key codes). Os mais usados em scripts de CE:
        </p>
        <CodeBlock
          title="Códigos VK mais usados no Cheat Engine"
          language="lua"
          code={`-- Teclas de função
  VK_F1  = 0x70   VK_F2  = 0x71   VK_F3  = 0x72   VK_F4  = 0x73
  VK_F5  = 0x74   VK_F6  = 0x75   VK_F7  = 0x76   VK_F8  = 0x77
  VK_F9  = 0x78   VK_F10 = 0x79   VK_F11 = 0x7A   VK_F12 = 0x7B

  -- Teclas numéricas (teclado numérico)
  VK_NUMPAD0 = 0x60  VK_NUMPAD1 = 0x61  VK_NUMPAD2 = 0x62
  VK_NUMPAD3 = 0x63  VK_NUMPAD4 = 0x64  VK_NUMPAD5 = 0x65
  VK_NUMPAD6 = 0x66  VK_NUMPAD7 = 0x67  VK_NUMPAD8 = 0x68
  VK_NUMPAD9 = 0x69

  -- Teclas especiais
  VK_INSERT = 0x2D  VK_DELETE = 0x2E  VK_HOME = 0x24  VK_END = 0x23
  VK_PRIOR  = 0x21  -- Page Up
  VK_NEXT   = 0x22  -- Page Down

  -- Exemplo de uso:
  createHotkey(minhaFuncao, VK_F5)              -- F5 simples
  createHotkey(minhaFuncao, VK_F5, VK_SHIFT)   -- Shift+F5`}
        />

        <h2>Hotkeys com Teclas de Combinação</h2>
        <p>
          Para evitar conflitos com atalhos do jogo, usar combinações como Ctrl+F5 ou Alt+F5 é mais seguro que teclas simples. A criação via interface do CE: ao clicar no campo de tecla na janela de hotkey, você pode manter Ctrl, Alt ou Shift pressionado enquanto pressiona a tecla principal. O CE registra a combinação completa.
        </p>
        <p>
          Via Lua: o segundo e terceiro argumentos do createHotkey especificam modificadores. Consulte a documentação do CE para os valores exatos de VK_CONTROL, VK_MENU (Alt) e VK_SHIFT.
        </p>

        <h2>Gerenciamento e Troubleshooting de Hotkeys</h2>
        <p>
          Se uma hotkey não responde, os problemas mais comuns são: (1) conflito com uma hotkey do próprio jogo que captura a tecla primeiro, (2) o jogo está rodando em modo exclusivo fullscreen que impede hotkeys externas, (3) o CE não tem privilégios de sistema suficientes para registrar hotkeys globais.
        </p>
        <p>
          Para o problema de fullscreen exclusivo: tente rodar o jogo em modo Borderless Windowed (janela sem bordas) em vez de Fullscreen verdadeiro. Borderless Windowed compartilha o foco de forma diferente e geralmente permite que hotkeys externas funcionem.
        </p>
        <p>
          Para privilégios: execute o Cheat Engine como Administrador (botão direito no ícone → "Executar como administrador"). Isso garante que o CE tem os direitos necessários para registrar hotkeys globais no sistema.
        </p>
        <p>
          Para verificar quais hotkeys estão configuradas: vá em Table → Table Hot Keys para as hotkeys globais. Para hotkeys de endereços individuais, a lista na Address List não mostra as hotkeys diretamente — você precisa clicar direito em cada endereço e verificar.
        </p>

        <AlertBox type="tip" title="Teclas de função (F1-F12) são as mais confiáveis">
          Use F1-F12 para suas hotkeys de cheat sempre que possível. Jogos raramente usam essas teclas para funções críticas (F5 às vezes é usado para save rápido, então prefira F9-F12). Evite letras e números que o jogo usa para controle do personagem.
        </AlertBox>

        <AlertBox type="info" title="Hotkeys funcionam mesmo com o CE minimizado">
          Uma vez configuradas, as hotkeys do CE continuam funcionando mesmo com a janela do CE minimizada ou movida para segundo plano. O CE corre como um processo ativo e monitora as teclas independentemente de qual janela está em foco — desde que o processo do jogo esteja em execução.
        </AlertBox>
      </PageContainer>
    );
  }
  