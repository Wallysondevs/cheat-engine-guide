import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Lua() {
    return (
      <PageContainer
        title="Lua no Cheat Engine"
        subtitle="Use a linguagem Lua para automatizar cheats, criar interfaces e controlar o CE programaticamente."
        difficulty="intermediário"
        timeToRead="14 min"
      >
        <p>
          O Cheat Engine possui um motor Lua integrado que expõe quase toda a sua funcionalidade via API de script. Com Lua você pode ler/escrever memória, criar interfaces gráficas, gerenciar hotkeys e muito mais.
        </p>

        <h2>Acessando o Console Lua</h2>
        <CodeBlock
          title="Como abrir o Lua Engine"
          language="text"
          code={`Menu: Lua → Lua Engine (ou Ctrl+Alt+L)
  Ou: Tools → Lua Engine

  O console tem:
  - Editor de código (parte superior)
  - Console de output (parte inferior)  
  - Botão Execute (Ctrl+Enter) para rodar o código
  - Botão Clear para limpar o output`}
        />

        <h2>Operações de Memória com Lua</h2>
        <CodeBlock
          title="Lendo e escrevendo na memória"
          language="lua"
          code={`-- Leitura de diferentes tipos
  local valorInt    = readInteger("game.exe+0x12345")
  local valorFloat  = readFloat("game.exe+0x67890")
  local valorDouble = readDouble("game.exe+0xABCDE")
  local valorByte   = readBytes("game.exe+0x11111", 1)[1]
  local texto       = readString("game.exe+0x22222", 20)

  -- Escrita de diferentes tipos
  writeInteger("game.exe+0x12345", 9999)
  writeFloat("game.exe+0x67890", 100.0)
  writeDouble("game.exe+0xABCDE", 999.99)
  writeBytes("game.exe+0x11111", 0xFF, 0x00, 0x4E)
  writeString("game.exe+0x22222", "Hero")

  -- Com ponteiro (desreferenciamento)
  local base = readInteger("game.exe+0xPOINTER")
  writeInteger(base + 0x4C, 9999)  -- vida`}
        />

        <h2>API de Controle do CE</h2>
        <CodeBlock
          title="Controlando elementos da interface do CE"
          language="lua"
          code={`-- Obter o processo anexado
  local processo = getOpenedProcessID()
  print("PID: " .. processo)

  -- Trabalhar com a Address List
  local al = getAddressList()
  local count = al.Count
  print("Endereços na lista: " .. count)

  -- Acessar um Memory Record pelo nome
  local mr = al.getMemoryRecordByDescription("Vida")
  if mr then
    print("Valor atual: " .. mr.Value)
    mr.Value = "9999"  -- modificar
    mr.Active = true   -- ativar freeze
  end

  -- Criar um novo Memory Record via Lua
  local novoMR = al.createMemoryRecord()
  novoMR.Description = "Meu Cheat"
  novoMR.Address = "game.exe+0x12345"
  novoMR.Type = vtDword  -- 4 Bytes
  novoMR.Value = "9999"`}
        />

        <h2>Timers e Automação</h2>
        <CodeBlock
          title="Executar código periodicamente"
          language="lua"
          code={`-- Criar um timer que executa a cada 1 segundo
  local meuTimer = createTimer(nil, false)
  meuTimer.Interval = 1000  -- 1000ms = 1 segundo
  meuTimer.OnTimer = function()
    -- Código executado a cada 1 segundo
    local vida = readInteger("game.exe+0x12345")
    if vida < 50 then
      writeInteger("game.exe+0x12345", 9999)
      print("Vida restaurada!")
    end
  end
  meuTimer.Enabled = true

  -- Para parar o timer:
  -- meuTimer.Enabled = false`}
        />

        <AlertBox type="tip" title="Dica — Print para Debug">
          Use <code>print("valor: " .. tostring(valor))</code> liberalmente enquanto desenvolve scripts. A saída aparece no console do Lua Engine e ajuda a entender o que está acontecendo na memória.
        </AlertBox>

        <AlertBox type="info" title="Lua 5.3 no Cheat Engine">
          O CE usa Lua 5.3. A maioria das bibliotecas padrão do Lua está disponível (math, string, table, io). A biblioteca CE-específica é extensa — consulte a documentação da Lua API do CE para ver todas as funções disponíveis.
        </AlertBox>
      </PageContainer>
    );
  }
  