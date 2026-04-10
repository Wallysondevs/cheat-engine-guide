import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function LuaApi() {
    return (
      <PageContainer
        title="API Lua do Cheat Engine"
        subtitle="Referência das funções mais importantes da API Lua do CE — memória, UI, debugger e utilitários."
        difficulty="avançado"
        timeToRead="20 min"
      >
        <h2>A API Lua do CE — Visão Geral</h2>
        <p>
          O Cheat Engine expõe uma API Lua extensa que dá acesso programático a quase toda funcionalidade da ferramenta. Desde leitura e escrita de memória até criação de interfaces gráficas completas, a API Lua é a porta de entrada para scripts avançados. Esta página cobre as funções mais importantes organizadas por categoria.
        </p>
        <p>
          A documentação oficial da API Lua do CE está disponível no repositório GitHub do projeto e no site oficial. Esta página cobre as funções mais usadas na prática, com exemplos funcionais. Para a referência completa, consulte o arquivo "Cheat Engine Lua Extensions Reference.txt" na pasta de instalação do CE.
        </p>

        <h2>Funções de Memória</h2>
        <CodeBlock
          title="API de leitura e escrita de memória"
          language="lua"
          code={`-- ===== LEITURA =====
  readInteger(address)          -- 4 bytes (int32)
  readSmallInteger(address)     -- 2 bytes (int16)
  readShortInteger(address)     -- alias para readSmallInteger
  readQword(address)            -- 8 bytes (int64)
  readFloat(address)            -- float (4 bytes)
  readDouble(address)           -- double (8 bytes)
  readByte(address)             -- 1 byte
  readBytes(address, size, noTerminator)  -- retorna tabela de bytes
  readString(address, maxLength, wideChar)  -- string (wideChar=true para Unicode)
  readPointer(address)          -- lê ponteiro (32 ou 64 bits baseado no processo)

  -- ===== ESCRITA =====
  writeInteger(address, value)
  writeSmallInteger(address, value)
  writeQword(address, value)
  writeFloat(address, value)
  writeDouble(address, value)
  writeByte(address, value)
  writeBytes(address, ...)    -- variadic: writeBytes(addr, 0xFF, 0x00, 0xAB)
  writeString(address, string, wideChar)

  -- ===== RESOLUÇÃO DE ENDEREÇOS =====
  getAddress(expression)      -- resolve "game.exe+0x1234" → número
  getAddressList()            -- retorna objeto AddressList
  getModuleBase(moduleName)   -- base do módulo (alternativa a getAddress("mod"))

  -- ===== EXEMPLOS =====
  local base = getAddress("game.exe")
  local vida = readInteger(base + 0x9E48)
  writeInteger(base + 0x9E48, 9999)

  -- Lendo ponteiro multi-nível
  local p1 = readPointer(base + 0x9E48)
  local p2 = readPointer(p1 + 0x148)
  local hp  = readInteger(p2 + 0x4C)`}
        />

        <h2>Funções de UI — Janelas e Controles</h2>
        <CodeBlock
          title="Criação de interface gráfica"
          language="lua"
          code={`-- ===== FORMS (JANELAS) =====
  local form = createForm(isChild)   -- isChild=true para janela filha
  form.Caption = "Título"
  form.Width = 400
  form.Height = 300
  form.Position = poScreenCenter    -- centraliza na tela
  form.BorderStyle = bsDialog       -- sem redimensionamento
  form.Visible = true
  form.Close()                      -- fecha o form

  -- ===== LABELS (TEXTO) =====
  local lbl = createLabel(parent)
  lbl.Caption = "Texto aqui"
  lbl.Left = 10; lbl.Top = 20
  lbl.Font.Size = 12
  lbl.Font.Color = 0xFF0000   -- vermelho (BGR, não RGB!)
  lbl.AutoSize = true

  -- ===== BOTÕES =====
  local btn = createButton(parent)
  btn.Caption = "Clique aqui"
  btn.Left = 10; btn.Top = 50
  btn.Width = 120; btn.Height = 30
  btn.OnClick = function() print("Clicado!") end
  btn.Enabled = true  -- false para desabilitar

  -- ===== EDIT BOXES =====
  local edit = createEdit(parent)
  edit.Text = "valor padrão"
  edit.Left = 10; edit.Top = 90
  edit.Width = 100
  local valor = tonumber(edit.Text)  -- converter para número

  -- ===== CHECKBOXES =====
  local chk = createCheckBox(parent)
  chk.Caption = "Ativar cheat"
  chk.Checked = false
  chk.OnChange = function()
    print("Checkbox: " .. tostring(chk.Checked))
  end

  -- ===== DIÁLOGOS =====
  showMessage("Mensagem ao usuário")  -- popup simples
  local resposta = inputQuery("Título", "Prompt:", "valor padrão")
  local sim = messageDialog("Pergunta?", mtConfirmation, mbYes, mbNo) == mrYes`}
        />

        <h2>Funções de Hotkey e Eventos</h2>
        <CodeBlock
          title="Registrando hotkeys e eventos"
          language="lua"
          code={`-- Hotkey simples
  local hotkey = createHotkey(funcao, VK_F1)
  hotkey.Enabled = true

  -- Hotkey com modificador
  local hotkey2 = createHotkey(funcao, VK_F2, VK_CONTROL)  -- Ctrl+F2

  -- Remover hotkey
  hotkey.Destroy()

  -- Timer
  local t = createTimer(parent, autoStart)
  t.Interval = 1000    -- 1 segundo em ms
  t.OnTimer = function() print("tick!") end
  t.Enabled = true

  -- Evento de processo (executa quando processo é encontrado/perdido)
  function OnOpenProcess(processID)
    print("Processo aberto: " .. processID)
  end

  function OnCloseProcess(processID)
    print("Processo fechado")
  end`}
        />

        <h2>Funções da Address List</h2>
        <CodeBlock
          title="Manipulando a Address List"
          language="lua"
          code={`local al = getAddressList()

  -- Acessar registros
  al.Count                          -- número de registros
  al.getMemoryRecord(index)         -- registro por índice (0-based!)
  al.getMemoryRecordByDescription(desc)  -- registro por nome

  -- Propriedades de MemoryRecord
  local mr = al.getMemoryRecord(0)
  mr.Description       -- nome
  mr.Address           -- endereço como string
  mr.Type              -- tipo (vtDword, vtFloat, vtString, etc.)
  mr.Value             -- valor atual como string (read/write)
  mr.Active            -- freeze ativo? (bool, read/write)
  mr.Selected          -- selecionado? (bool)
  mr.Color             -- cor de fundo (integer BGR)

  -- Criar novo registro
  local novo = al.createMemoryRecord()
  novo.Description = "Meu Cheat"
  novo.Address = "game.exe+0x12345"
  novo.Type = vtDword  -- 4 bytes integer
  novo.Value = "100"

  -- Remover registro
  al.delete(index)

  -- Encontrar por grupo
  for i = 0, al.Count - 1 do
    local rec = al.getMemoryRecord(i)
    if rec.Description:find("^%[Vida%]") then
      rec.Active = true
    end
  end`}
        />

        <h2>Funções de Debug e Sistema</h2>
        <CodeBlock
          title="Debug e utilitários do sistema"
          language="lua"
          code={`-- ===== INFORMAÇÕES DO PROCESSO =====
  process             -- string com nome do processo atual
  getProcessID()      -- PID numérico
  enumModules()       -- lista de módulos carregados

  -- ===== DEBUG OUTPUT =====
  print(valor)        -- imprime no Lua Console
  printHex(numero)    -- imprime em hex: "0x00001234"

  -- ===== ASSEMBLY INLINE =====
  -- Executar Assembly diretamente e obter resultado:
  local function calcDano(base, multiplicador)
    -- Não é possível executar Assembly arbitrário diretamente via Lua
    -- Mas você pode usar auto_assemble para patches pontuais:
    auto_assemble([[
      MOV EAX, 0
    ]])
  end

  -- ===== VARREDURA VIA LUA =====
  local scanner = createMemScan()
  scanner.firstScan(soExactValue, vtDword, rtRounded, 100, 0, "00000000", "7FFFFFFF", "*X*W*C+R", fsmNotAligned, "", false, false, false, false)
  scanner.waitTillDone()
  local results = createFoundList(scanner)
  results.initialize()
  for i = 0, results.Count - 1 do
    print(results.getAddress(i) .. ": " .. results.getValue(i))
  end
  results.destroy()
  scanner.destroy()`}
        />

        <AlertBox type="tip" title="Consulte o arquivo de referência no CE">
          A documentação completa da API Lua está em "Cheat Engine Lua Extensions Reference.txt" na pasta de instalação do CE (geralmente C:\Program Files\Cheat Engine 7.5\). Abra com qualquer editor de texto — é um arquivo grande mas bem organizado com todos os objetos, métodos e propriedades documentados.
        </AlertBox>

        <AlertBox type="info" title="Versões do CE têm APIs diferentes">
          Algumas funções foram adicionadas em versões específicas do CE. Se um script usa uma função que não existe na sua versão, você receberá um erro "attempt to call nil value". Sempre verifique a versão mínima requerida pelos scripts que você baixa da internet.
        </AlertBox>
      </PageContainer>
    );
  }
  