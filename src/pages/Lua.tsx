import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Lua() {
    return (
      <PageContainer
        title="Lua no Cheat Engine"
        subtitle="Introdução à linguagem Lua no contexto do CE — desde os conceitos básicos até scripts funcionais."
        difficulty="intermediário"
        timeToRead="18 min"
      >
        <h2>Por que Lua no Cheat Engine</h2>
        <p>
          O Cheat Engine integra Lua como sua linguagem de scripting de alto nível. Lua é uma linguagem leve, rápida, e com sintaxe simples que foi criada no Brasil (pela PUC-Rio) e é amplamente usada em jogos (World of Warcraft, Roblox, LÖVE2D) e sistemas embarcados. No CE, Lua permite fazer tudo que você faria clicando na interface, mais coisas que a interface não suporta.
        </p>
        <p>
          Com Lua no CE você pode: ler e escrever valores na memória do jogo, criar interfaces gráficas personalizadas (janelas, botões, campos de texto), registrar hotkeys, criar timers que executam código periodicamente, manipular a Address List programaticamente, executar código Assembly inline, e interagir com o sistema operacional. É uma plataforma de scripting completa.
        </p>

        <h2>Conceitos Básicos de Lua</h2>
        <p>
          Lua é uma linguagem dinamicamente tipada — variáveis não têm tipo fixo, elas guardam qualquer valor. Strings são delimitadas por aspas simples ou duplas. Comentários de linha única começam com "--". Comentários multilinha ficam entre "--[[" e "]]".
        </p>
        <CodeBlock
          title="Sintaxe básica de Lua"
          language="lua"
          code={`-- Comentário de linha
  --[[ Comentário
       multilinha ]]

  -- Variáveis (sem declaração de tipo)
  local nome = "MeuJogo"
  local vida = 100
  local velocidade = 1.5
  local ativo = true

  -- Strings
  local msg = "Olá " .. nome  -- concatenação com ..
  local comprimento = #nome   -- tamanho da string com #

  -- Condicionais
  if vida > 50 then
    print("Vida boa!")
  elseif vida > 20 then
    print("Vida baixa!")
  else
    print("Vida crítica!")
  end

  -- Loops
  for i = 1, 10 do
    print(i)
  end

  -- While
  local count = 0
  while count < 5 do
    count = count + 1
  end

  -- Funções
  local function saudar(quem)
    return "Olá, " .. quem .. "!"
  end
  print(saudar("mundo"))  -- Olá, mundo!

  -- Tabelas (arrays e dicionários)
  local frutas = {"maçã", "banana", "uva"}
  print(frutas[1])  -- maçã (Lua é 1-indexado!)

  local pessoa = {nome = "João", idade = 30}
  print(pessoa.nome)  -- João`}
        />

        <h2>Lendo e Escrevendo Memória com Lua</h2>
        <p>
          O CE expõe funções especiais de Lua para acessar a memória do processo. Essas funções não existem em Lua padrão — são extensões do CE:
        </p>
        <CodeBlock
          title="Funções de memória do CE em Lua"
          language="lua"
          code={`-- Ler valores
  local inteiro = readInteger("game.exe+0x9E48")      -- 4 bytes (inteiro)
  local flutuante = readFloat("game.exe+0x9E4C")       -- float
  local double = readDouble("game.exe+0x9E50")         -- double
  local byte = readBytes("game.exe+0x9E48", 4, true)  -- array de bytes (retorna tabela)
  local texto = readString("game.exe+0x9E60", 64)     -- string (max 64 chars)

  -- Escrever valores
  writeInteger("game.exe+0x9E48", 9999)     -- escreve inteiro
  writeFloat("game.exe+0x9E4C", 1.5)        -- escreve float
  writeBytes("game.exe+0x9E48", 0xFF, 0x00) -- escreve bytes

  -- Resolver endereços
  local addr = getAddress("game.exe+0x9E48")  -- converte expressão para número
  local modBase = getAddress("game.exe")      -- base do módulo

  -- Ler ponteiro (desreferencia uma vez)
  local ptrValor = readPointer(addr)  -- lê addr e retorna o endereço guardado lá

  -- Seguir cadeia de ponteiros automaticamente
  -- [game.exe+9E48] → [resultado+148] → [resultado+4C]
  local finalAddr = readPointer(readPointer(getAddress("game.exe+9E48")) + 0x148) + 0x4C
  local vida = readInteger(finalAddr)`}
        />

        <h2>Timers — Executando Código Periodicamente</h2>
        <p>
          Timers permitem que código Lua execute repetidamente em intervalos definidos, sem bloquear o CE ou o jogo. São essenciais para: monitorar valores e reagir a mudanças, criar auto-heal que verifica a vida continuamente, atualizar displays na interface do trainer.
        </p>
        <CodeBlock
          title="Usando timers para monitoramento contínuo"
          language="lua"
          code={`-- Timer simples — auto-heal quando HP cair abaixo de 30
  local HP_ADDR = "game.exe+0x9E48"
  local HP_MAX = 100
  local HP_LIMITE = 30

  local healTimer = createTimer(nil, false)
  healTimer.Interval = 200  -- verifica 5x por segundo

  healTimer.OnTimer = function()
    local hp = readInteger(HP_ADDR)
    if hp < HP_LIMITE then
      writeInteger(HP_ADDR, HP_MAX)
      print(os.time() .. ": Auto-heal! HP restaurado para " .. HP_MAX)
    end
  end

  healTimer.Enabled = true

  -- Para parar o timer depois:
  -- healTimer.Enabled = false
  -- healTimer.Destroy()`}
        />

        <h2>Trabalhando com a Address List via Lua</h2>
        <p>
          Lua permite manipular a Address List do CE programaticamente — ativar/desativar registros, adicionar novos, modificar valores. Isso é especialmente poderoso para criar cheats que se auto-configuram ou para gerenciar grupos de cheats como uma unidade.
        </p>
        <CodeBlock
          title="Manipulando Address List com Lua"
          language="lua"
          code={`local al = getAddressList()

  -- Buscar registro por descrição
  local mrVida = al.getMemoryRecordByDescription("Vida Infinita")
  if mrVida then
    mrVida.Active = true  -- ativa o freeze
    mrVida.Value = "9999" -- define o valor (como string!)
  end

  -- Iterar por todos os registros
  for i = 0, al.Count - 1 do
    local mr = al.getMemoryRecord(i)
    print(mr.Description .. ": " .. mr.Value)
  end

  -- Adicionar um novo registro via Lua
  local novoReg = al.createMemoryRecord()
  novoReg.Description = "Ouro Máximo"
  novoReg.Address = "game.exe+0x45600"
  novoReg.Type = vtDword  -- 4 Bytes
  novoReg.Value = "999999"`}
        />

        <h2>Tratamento de Erros</h2>
        <p>
          Scripts Lua no CE podem falhar se o endereço de memória que tentam acessar não é válido — por exemplo, se o ponteiro ainda não foi inicializado (o jogo não carregou completamente) ou se o processo foi reiniciado. Usar pcall (protected call) permite capturar erros e tratá-los graciosamente.
        </p>
        <CodeBlock
          title="Tratamento de erros com pcall"
          language="lua"
          code={`-- Sem proteção (crasha se addr for inválido)
  local vida = readInteger("game.exe+0x9E48")  -- pode causar erro

  -- Com proteção (captura o erro)
  local ok, vida = pcall(readInteger, "game.exe+0x9E48")
  if ok then
    print("Vida: " .. vida)
  else
    print("Erro ao ler vida: " .. vida)  -- vida contém a mensagem de erro
  end

  -- Função wrapper para leitura segura
  local function lerSeguro(addr, funcao)
    funcao = funcao or readInteger
    local ok, resultado = pcall(funcao, addr)
    if ok then return resultado end
    return nil  -- retorna nil em caso de erro
  end

  local hp = lerSeguro("game.exe+0x9E48")
  if hp then
    print("HP: " .. hp)
  else
    print("Não foi possível ler HP (jogo não inicializado?)")
  end`}
        />

        <AlertBox type="tip" title="O Lua Console é a melhor ferramenta de aprendizado">
          Acesse View → Lua Engine para abrir o console Lua interativo. Você pode experimentar qualquer código Lua ali instantaneamente, ver os resultados, e testar antes de colocar em scripts. É a forma mais rápida de aprender as APIs do CE — experimente as funções de memória, manipule a Address List, crie timers de teste.
        </AlertBox>
      </PageContainer>
    );
  }
  