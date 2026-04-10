import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Trainers() {
    return (
      <PageContainer
        title="Criando Trainers com CE"
        subtitle="Como transformar sua tabela do Cheat Engine em um trainer completo com interface gráfica e hotkeys."
        difficulty="intermediário"
        timeToRead="16 min"
      >
        <h2>O que é um Trainer</h2>
        <p>
          Um trainer é um programa externo que se acopla a um jogo e oferece cheats através de uma interface amigável — geralmente uma janela com botões para ativar/desativar cada cheat e campos para definir valores. Programas como o WeMod são essencialmente trainers gerenciados para muitos jogos. O Cheat Engine permite criar seus próprios trainers usando a tabela .CT com scripts Lua para a interface.
        </p>
        <p>
          A diferença entre uma tabela simples e um trainer é a experiência do usuário: uma tabela requer que o usuário entenda o CE, marque checkboxes, e modifique valores. Um trainer apresenta uma interface clara e auto-explicativa, com botões rotulados e feedback visual. Qualquer um pode usar um trainer mesmo sem conhecer o CE.
        </p>

        <h2>Criando uma Interface Gráfica com Lua</h2>
        <p>
          O Lua do Cheat Engine inclui uma biblioteca de UI baseada em componentes do Lazarus/Delphi — forms, botões, labels, editboxes, checkboxes, e mais. Com isso, você pode criar janelas completas que formam a interface do trainer.
        </p>
        <CodeBlock
          title="Trainer básico com interface Lua"
          language="lua"
          code={`-- Criar janela principal do trainer
  local form = createForm(false)
  form.Caption = "MeuJogo Trainer v1.0"
  form.Width = 300
  form.Height = 400
  form.Position = poScreenCenter

  -- Título
  local titulo = createLabel(form)
  titulo.Caption = "MeuJogo Ultimate Trainer"
  titulo.Font.Size = 14
  titulo.Font.Style = "fsBold"
  titulo.Left = 20
  titulo.Top = 15

  -- Botão God Mode
  local btnGod = createButton(form)
  btnGod.Caption = "God Mode [OFF]"
  btnGod.Left = 20
  btnGod.Top = 60
  btnGod.Width = 250
  btnGod.Height = 35

  local godAtivo = false
  btnGod.OnClick = function()
    godAtivo = not godAtivo
    local addr = "game.exe+0x9E48"
    if godAtivo then
      -- Ativa god mode
      writeInteger(addr, 9999)
      btnGod.Caption = "God Mode [ON]  (F1)"
      btnGod.Font.Color = 0x00AA00  -- verde
    else
      btnGod.Caption = "God Mode [OFF] (F1)"
      btnGod.Font.Color = 0x000000  -- preto
    end
  end

  -- Campo de ouro customizado
  local lblOuro = createLabel(form)
  lblOuro.Caption = "Definir Ouro:"
  lblOuro.Left = 20
  lblOuro.Top = 115

  local editOuro = createEdit(form)
  editOuro.Text = "99999"
  editOuro.Left = 120
  editOuro.Top = 110
  editOuro.Width = 100

  local btnOuro = createButton(form)
  btnOuro.Caption = "Aplicar"
  btnOuro.Left = 230
  btnOuro.Top = 108
  btnOuro.Width = 60
  btnOuro.OnClick = function()
    local valor = tonumber(editOuro.Text)
    if valor then
      writeInteger("game.exe+0x45600", valor)
      showMessage("Ouro definido para " .. valor)
    else
      showMessage("Valor inválido!")
    end
  end

  -- Hotkeys
  createHotkey(function() btnGod.OnClick() end, VK_F1)

  -- Mostrar o form
  form.Visible = true`}
        />

        <h2>Adicionando Feedback Visual</h2>
        <p>
          Um bom trainer não apenas funciona — ele comunica ao usuário o que está acontecendo. Adicione labels que mostram os valores atuais do jogo, atualização em tempo real da vida e ouro, e indicações claras de quais cheats estão ativos.
        </p>
        <CodeBlock
          title="Monitor em tempo real de valores do jogo"
          language="lua"
          code={`-- Adicionar label de status na interface
  local lblStatus = createLabel(form)
  lblStatus.Left = 20
  lblStatus.Top = 200
  lblStatus.Width = 260
  lblStatus.Caption = "HP: --- | Ouro: ---"

  -- Timer para atualizar os valores exibidos
  local timerUI = createTimer(form, false)
  timerUI.Interval = 500  -- atualiza 2x por segundo
  timerUI.OnTimer = function()
    local hp = readInteger("game.exe+0x9E48")
    local ouro = readInteger("game.exe+0x45600")
    lblStatus.Caption = string.format("HP: %d | Ouro: %d", hp, ouro)
  end
  timerUI.Enabled = true`}
        />

        <h2>Distribuindo seu Trainer</h2>
        <p>
          Para compartilhar um trainer com outros que não têm o Cheat Engine, você pode: distribuir a tabela .CT (o destinatário precisa ter CE instalado), ou usar o recurso de "standalone trainer" que algumas ferramentas da comunidade oferecem para empacotar tabelas CE como executáveis independentes.
        </p>
        <p>
          A forma mais acessível de compartilhar é via tabela .CT no FearLess Cheat Engine ou em comunidades do jogo específico (Reddit, Discord, fóruns). Inclua uma descrição clara de como usar, quais versões do jogo são suportadas, e o que cada cheat faz.
        </p>

        <h2>Boas Práticas para Trainers</h2>
        <p>
          Um trainer bem feito tem algumas características: detecção automática do processo (avisa se o jogo não está aberto), verificação de versão (avisa se a versão do jogo não é suportada), feedback claro sobre estado ativo/inativo, hotkeys para os cheats mais usados, e opção de fechar a janela sem desativar os cheats (o trainer continua em background).
        </p>
        <p>
          Adicionar uma verificação de processo no início do script Lua do trainer garante uma experiência melhor para o usuário — em vez de um crash confuso quando tentam usar o trainer sem o jogo aberto:
        </p>
        <CodeBlock
          title="Verificação de processo e versão"
          language="lua"
          code={`-- Verificar se o processo correto está rodando
  local PROC_NOME = "game.exe"
  local VERSAO_SUPORTADA = {"1.5.0", "1.5.1", "1.5.2"}

  if not process or not process:find(PROC_NOME) then
    showMessage("Erro: " .. PROC_NOME .. " não encontrado.\nAbra o jogo antes de usar o trainer.")
    return
  end

  -- Verificar versão (opcional - requer leitura de string de versão do executável)
  print("Trainer carregado com sucesso!")
  print("Processo: " .. process)`}
        />

        <AlertBox type="tip" title="Interface simples é melhor que interface complexa">
          Resista à tentação de adicionar todos os cheats possíveis numa interface gigante. Trainers com 5-8 opções bem explicadas são muito mais utilizáveis que trainers com 50 opções confusas. Priorize os cheats mais úteis e mantenha a interface limpa e clara.
        </AlertBox>
      </PageContainer>
    );
  }
  