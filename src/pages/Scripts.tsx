import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Scripts() {
    return (
      <PageContainer
        title="Scripts no Cheat Engine"
        subtitle="Como criar e usar scripts na Address List — de simples Lua a injeções complexas de Auto Assembler."
        difficulty="intermediário"
        timeToRead="16 min"
      >
        <h2>Scripts vs Freeze de Valor</h2>
        <p>
          O Freeze simples é a ferramenta certa quando você quer manter um valor constante. Mas há situações onde freeze não é suficiente: quando você quer que o valor responda dinamicamente a eventos do jogo, quando quer modificar o comportamento em vez do valor, quando precisa de lógica condicional, ou quando quer criar interfaces mais ricas. Para tudo isso, scripts são a solução.
        </p>
        <p>
          Um script no contexto do Cheat Engine é um pedaço de código que é executado quando você ativa um Memory Record (checkbox). Esse código pode ser Lua (para lógica de alto nível) ou Auto Assembler (para injeção de código Assembly no processo). Cada Memory Record pode ter seu próprio script associado.
        </p>

        <h2>Scripts Lua em Memory Records</h2>
        <p>
          Para associar um script Lua a um Memory Record: duplo clique no endereço na Address List para abrir o editor. Você verá abas — na aba "Script", você pode escrever código Lua. Quando o checkbox do registro for marcado, o bloco entre "[ENABLE]" e "[DISABLE]" é executado. Quando desmarcado, o bloco DISABLE executa.
        </p>
        <CodeBlock
          title="Estrutura de um script Lua em Memory Record"
          language="lua"
          code={`{$lua}
  [ENABLE]
  -- Este código roda quando você ativa o checkbox

  -- Exemplo: God Mode com timer automático
  local HP_ADDR = "game.exe+0x9E48"
  local HP_MAX = 100

  -- Freeze de vida via Lua (alternativa ao freeze nativo)
  godModeTimer = createTimer(nil, false)
  godModeTimer.Interval = 100  -- verifica a cada 100ms
  godModeTimer.OnTimer = function()
    if readInteger(HP_ADDR) < HP_MAX then
      writeInteger(HP_ADDR, HP_MAX)
    end
  end
  godModeTimer.Enabled = true
  print("God Mode ativado!")

  [DISABLE]
  -- Este código roda quando você desativa o checkbox
  if godModeTimer then
    godModeTimer.Enabled = false
    godModeTimer.Destroy()
    godModeTimer = nil
  end
  print("God Mode desativado.")`}
        />
        <p>
          A vantagem desse padrão é que você pode ter lógica complexa no ENABLE (criação de timers, hooks, interfaces) e limpeza no DISABLE. O CE cuida de chamar o código certo dependendo do estado do checkbox.
        </p>

        <h2>Scripts Auto Assembler em Memory Records</h2>
        <p>
          Para cheats que precisam modificar o código do jogo (não apenas valores na memória), o Auto Assembler é a ferramenta correta. O fluxo típico: você identifica a instrução que precisa modificar via disassembler, escreve um script AA que redireciona o fluxo de execução para código injetado, e associa esse script a um Memory Record.
        </p>
        <CodeBlock
          title="Script Auto Assembler básico para anular dano"
          language="asm"
          code={`[ENABLE]
  // Localizado via "Find out what writes to this address"
  // Original: SUB ECX, EAX  // subtrai dano da vida
  // Modificação: transformar em NOP para anular o dano

  // Método 1: NOP simples (mais fácil)
  GAME_EXE+001F22C:
    nop
    nop
    nop  // ocupa o mesmo espaço que SUB ECX, EAX (3 bytes)

  [DISABLE]
  // Restaurar bytes originais
  GAME_EXE+001F22C:
    db 2B C8  // SUB ECX, EAX em bytes hex
    nop       // padding se necessário`}
        />
        <p>
          Esse script simples usa o endereço de memória onde a instrução de dano está, e quando ativado substitui por NOPs. Quando desativado, restaura os bytes originais. A chave é sempre manter os bytes originais para poder restaurar corretamente.
        </p>

        <h2>Gerenciando Múltiplos Scripts</h2>
        <p>
          Tabelas profissionais têm vários scripts, cada um responsável por um aspecto diferente. Organizar bem esses scripts é crucial para manutenção. Use grupos na Address List para agrupar scripts relacionados. Use nomes descritivos que indicam o que o script faz e como funciona. Adicione comentários no código explicando o raciocínio por trás de cada decisão.
        </p>
        <p>
          Um padrão de nomenclatura útil: prefixe scripts com o tipo — "[AA] God Mode", "[Lua] Auto Heal", "[Pointer] Player Base". Isso deixa claro de relance qual tipo de script cada registro contém, o que é importante quando você volta a uma tabela semanas depois.
        </p>

        <h2>Debugging de Scripts</h2>
        <p>
          Quando um script não funciona como esperado, o Lua Console do CE é seu melhor amigo. Acesse em View → Lua Engine (ou Ctrl+Alt+L). Você pode executar código Lua interativamente — testar funções, verificar valores de endereços, experimentar lógicas novas. É muito mais rápido para debug do que editar o script no Memory Record, salvar, e testar.
        </p>
        <CodeBlock
          title="Técnicas de debugging no Lua Console"
          language="lua"
          code={`-- Verificar se um endereço é válido antes de usar
  local addr = getAddress("game.exe") + 0x9E48
  print(string.format("Endereço: 0x%X", addr))

  -- Ler e mostrar valor
  local valor = readInteger(addr)
  print("Valor atual: " .. valor)

  -- Testar se o processo está correto
  print("Processo: " .. process)

  -- Ver todos os módulos carregados
  local enumMod = enumModules()
  for i, mod in ipairs(enumMod) do
    print(mod.Name .. " @ 0x" .. string.format("%X", mod.Address))
    if i > 10 then print("..."); break end  -- limita output
  end`}
        />

        <AlertBox type="tip" title="Sempre teste no Lua Console antes de colocar no script">
          O Lua Console permite experimentação rápida sem o ciclo de editar/salvar/testar. Quando você descobrir que o código funciona no console, aí copie para o Memory Record. Isso reduz drasticamente o tempo de debugging.
        </AlertBox>
      </PageContainer>
    );
  }
  