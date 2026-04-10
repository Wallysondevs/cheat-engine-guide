import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Templates() {
    return (
      <PageContainer
        title="Templates e Scripts Reutilizáveis"
        subtitle="Como criar, organizar e reutilizar padrões de scripts no Cheat Engine para acelerar o desenvolvimento de cheats."
        difficulty="intermediário"
        timeToRead="15 min"
      >
        <h2>O valor da reutilização no desenvolvimento de cheats</h2>
        <p>
          Quando você cria cheats para múltiplos jogos, rapidamente percebe que certos padrões se repetem: o código para encontrar ponteiros multi-nível, a estrutura básica de um God Mode script, a função Lua para criar uma interface de controle, os patterns de AOB scan. Em vez de reescrever isso do zero para cada jogo, criar templates e scripts reutilizáveis economiza horas de trabalho.
        </p>
        <p>
          Templates no contexto do Cheat Engine são arquivos .CT parcialmente preenchidos (ou scripts Lua/AA) que funcionam como ponto de partida, precisando apenas que você preencha os endereços e offsets específicos do jogo alvo. É a mesma filosofia de "não reinvente a roda" aplicada ao desenvolvimento de cheats.
        </p>

        <h2>Template Básico de God Mode (Auto Assembler)</h2>
        <CodeBlock
          title="Template de God Mode via Code Injection"
          language="asm"
          code={`[ENABLE]
  // Encontre o endereço onde o dano é aplicado via "Find what writes"
  // e substitua GAME_EXE e ADDR_APLICA_DANO com os valores reais

  define(GAME_EXE, game.exe)
  define(ADDR_APLICA_DANO, GAME_EXE+FFFFFF)  // ← substitua com endereço real

  alloc(godModeCode, 128, ADDR_APLICA_DANO)
  label(godModeOriginal)
  label(godModeReturn)

  godModeCode:
    // Adicione aqui o código original que você sobrescreveu:
    // (copie do disassembler — as instruções que você "pisou")
    // mov [ebx+4C], ecx  // EXEMPLO — use o código real do seu jogo
  godModeOriginal:
    jmp godModeReturn

  ADDR_APLICA_DANO:
    jmp godModeCode
    nop

  godModeReturn:

  [DISABLE]
  ADDR_APLICA_DANO:
    // Restaure as instruções originais aqui
    // (copie do disassembler antes de modificar)
    db XX XX XX XX XX  // ← bytes originais`}
        />
        <p>
          Este template de God Mode usa injeção de código — uma técnica mais robusta que simplesmente congelar o valor de HP. Em vez de combater o jogo (que continua calculando dano e escrevendo), o código injetado redireciona o fluxo para não aplicar o dano. O template tem marcadores claros de onde você precisa preencher os valores específicos do jogo.
        </p>

        <h2>Template de Lua para Gerenciamento de Cheats</h2>
        <CodeBlock
          title="Template completo de tabela Lua estruturada"
          language="lua"
          code={`-- ================================================
  -- Template de Tabela Lua para [NOME DO JOGO]
  -- Versão: 1.0 | Autor: Seu Nome
  -- Compatível com versão do jogo: X.X.X
  -- ================================================

  -- Configurações — altere estes valores para o seu jogo
  local CONFIG = {
    PROCESSO = "game.exe",
    VERSAO_JOGO = "1.0.0",
    
    -- Endereços base (estáticos)
    BASE_PLAYER = "game.exe+0x009E48",  -- ponteiro para objeto do jogador
    
    -- Offsets dentro do objeto do jogador
    OFF_VIDA     = 0x4C,
    OFF_VIDA_MAX = 0x50,
    OFF_MANA     = 0x54,
    OFF_OURO     = 0x100,
  }

  -- Funções utilitárias
  local function getPlayerBase()
    return readPointer(getAddress(CONFIG.BASE_PLAYER))
  end

  local function getVida()
    return readInteger(getPlayerBase() + CONFIG.OFF_VIDA)
  end

  local function setVida(valor)
    writeInteger(getPlayerBase() + CONFIG.OFF_VIDA, valor)
  end

  -- Verificação de processo
  if not process then
    showMessage("Jogo não detectado. Abra " .. CONFIG.PROCESSO .. " primeiro.")
    return
  end

  -- Hotkeys
  local function toggleGodMode()
    local mr = getAddressList().getMemoryRecordByDescription("God Mode")
    if mr then
      mr.Active = not mr.Active
      print("God Mode: " .. (mr.Active and "ON" or "OFF"))
    end
  end

  createHotkey(toggleGodMode, VK_F1)
  print("Template carregado! F1 = God Mode")`}
        />

        <h2>Organizando sua Biblioteca de Templates</h2>
        <p>
          Com o tempo, você vai acumular vários templates úteis. Uma boa estratégia é criar uma pasta "Templates_CE" com subpastas por tipo: "GodMode", "MoneyHacks", "SpeedScripts", "PointerHelpers", etc. Dentro de cada subpasta, mantenha os arquivos .lua ou .ct com comentários claros sobre como usar.
        </p>
        <p>
          Para templates de Auto Assembler, salve-os como arquivos .txt ou .lua separados (o AA aceita arquivos externos com lua do CE). Para templates de tabela completa, salve como .CT com o nome do padrão: "Template_GodMode_RPG.CT", "Template_MoneyPointer.CT".
        </p>

        <h2>Gerenciando Versões de Scripts</h2>
        <p>
          Jogos são atualizados frequentemente, quebrando offsets e endereços. Uma boa prática é manter um "changelog" no próprio script ou tabela — um comentário no início com as versões do jogo testadas, o que mudou em cada versão, e quais offsets foram verificados por último.
        </p>
        <CodeBlock
          title="Cabeçalho de versão para scripts"
          language="lua"
          code={`-- ===========================================
  -- Tabela: MeuJogo Ultimate Trainer
  -- ===========================================
  -- CHANGELOG:
  -- v3.0 (2026-04-10): Atualizado offsets para patch 1.5.2
  --   - OFF_VIDA mudou de 0x4C para 0x54
  --   - OFF_OURO mudou de 0x100 para 0x108
  --   - Adicionado: suporte a personagens múltiplos
  --
  -- v2.0 (2026-02-15): Adicionado Speed Hack automático
  -- v1.0 (2026-01-01): Versão inicial (patch 1.0.0)
  -- ===========================================`}
        />

        <AlertBox type="tip" title="Templates economizam 80% do tempo de desenvolvimento">
          A maior parte do trabalho de criar um novo cheat está em entender a estrutura do jogo e encontrar os endereços corretos. O código em si é frequentemente um template que você já usou antes. Invista tempo criando bons templates reutilizáveis — o retorno em produtividade é enorme ao longo do tempo.
        </AlertBox>
      </PageContainer>
    );
  }
  