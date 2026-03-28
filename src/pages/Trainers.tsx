import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function Trainers() {
  return (
    <PageContainer
      title="Criar Trainers"
      subtitle="Como criar executáveis trainers standalone usando o Cheat Engine Trainer Maker."
      difficulty="avançado"
      timeToRead="10 min"
    >
      <AlertBox type="info" title="O que é um Trainer?">
        Um trainer é um programa separado que você roda junto com o jogo. Ao pressionar hotkeys no trainer, cheats são aplicados ao processo do jogo. É a forma mais distribuível de um cheat.
      </AlertBox>

      <h2>Opção 1 — Trainer via Lua + GUI</h2>
      <p>
        A forma mais rápida de criar um trainer usando o Cheat Engine é com Lua e forms:
      </p>
      <CodeBlock
        title="Trainer Básico em Lua"
        language="lua"
        code={`
-- Criar janela do trainer
local form = createForm(false)
form.Caption = "Super Trainer v1.0"
form.Width = 350
form.Height = 280
form.Position = poScreenCenter

-- Labels de status
local lblStatus = createLabel(form)
lblStatus.Caption = "Conectando ao jogo..."
lblStatus.Left = 10
lblStatus.Top = 10
lblStatus.Width = 330

-- Conectar ao processo
local function conectar()
  local processos = getProcessList()
  if processos["game.exe"] then
    openProcess("game.exe")
    lblStatus.Caption = "Conectado: game.exe"
    return true
  end
  lblStatus.Caption = "game.exe não encontrado!"
  return false
end

-- Botão Vida Infinita
local btnVida = createButton(form)
btnVida.Caption = "[F1] Vida Infinita"
btnVida.Left = 10
btnVida.Top = 40
btnVida.Width = 320
btnVida.Height = 30
btnVida.OnClick = function()
  if not conectar() then return end
  writeInteger(resolveAddress("game.exe+0xA1B230,4C"), 9999)
  showMessage("Vida: 9999")
end

-- Botão Speed Hack
local btnSpeed = createButton(form)
btnSpeed.Caption = "[F2] Speed 2x"
btnSpeed.Left = 10
btnSpeed.Top = 80
btnSpeed.Width = 320
btnSpeed.Height = 30
btnSpeed.OnClick = function()
  speedhack_setSpeed(2.0)
end

-- Registrar hotkeys
registerHotkey(VK_F1, function() btnVida.OnClick(nil) end)
registerHotkey(VK_F2, function() btnSpeed.OnClick(nil) end)

conectar()
form.show()
        `}
      />

      <h2>Opção 2 — CE Trainer Creator</h2>
      <p>
        O Cheat Engine tem um criador de trainers integrado em <strong>Tools → Trainer Creator</strong>. Ele gera um executável <code>.exe</code> a partir de uma tabela <code>.CT</code>:
      </p>
      <ol>
        <li>Configure sua tabela com todos os cheats e hotkeys</li>
        <li>Vá em <strong>Tools → Trainer Creator</strong></li>
        <li>Selecione um template visual (há alguns incluídos)</li>
        <li>Configure nome, ícone e informações do trainer</li>
        <li>Clique em <strong>Generate</strong> para criar o <code>.exe</code></li>
      </ol>

      <AlertBox type="warning" title="Antivírus e Trainers">
        Executáveis de trainers são quase universalmente detectados por antivírus, pois usam técnicas de injeção de memória. Distribua sempre com aviso sobre falso positivo, e prefira compartilhar como tabela <code>.CT</code> quando possível.
      </AlertBox>
    </PageContainer>
  );
}
