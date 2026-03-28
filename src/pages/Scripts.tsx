import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function Scripts() {
  return (
    <PageContainer
      title="Scripts Automáticos"
      subtitle="Crie scripts Lua que executam automaticamente ao carregar uma tabela."
      difficulty="intermediário"
      timeToRead="8 min"
    >
      <AlertBox type="info" title="Scripts na Tabela">
        Scripts Lua podem ser vinculados a entradas da Address List, executados ao ativar/desativar um cheat, ou rodados automaticamente ao abrir a tabela.
      </AlertBox>

      <h2>Script de Auto-Execução</h2>
      <CodeBlock
        title="Script que roda ao abrir a tabela"
        language="lua"
        code={`
-- Este script roda automaticamente quando a tabela é aberta
-- Adicione-o no campo "Script" do cabeçalho da tabela

-- Verificar se o jogo está aberto
if getProcessList()["game.exe"] then
  openProcess("game.exe")
  print("[Trainer] Conectado ao game.exe")
else
  print("[Trainer] game.exe não encontrado!")
end
        `}
      />

      <h2>Script Vinculado a uma Entrada</h2>
      <CodeBlock
        title="Script em memoryRecord — Ativa/Desativa"
        language="lua"
        code={`
-- Script adicionado numa entrada da Address List
-- Executado quando o checkbox é marcado/desmarcado

if activated then
  -- Ativado
  print("Godmode ON")
  -- Seu código de ativação aqui
else
  -- Desativado
  print("Godmode OFF")
  -- Seu código de desativação aqui
end
        `}
      />

      <h2>Script com Timer — Auto-Heal</h2>
      <CodeBlock
        title="Auto-Heal automático"
        language="lua"
        code={`
local vidaAddr = 0x1A2B3C4D
local vidaMax  = 100
local healTimer = nil

function iniciarAutoHeal()
  healTimer = createTimer(nil)
  healTimer.Interval = 500  -- verificar a cada 500ms
  healTimer.OnTimer = function()
    local vida = readInteger(vidaAddr)
    if vida < vidaMax * 0.5 then  -- se vida < 50%
      writeInteger(vidaAddr, vidaMax)
      print("Auto-curado! Vida restaurada para " .. vidaMax)
    end
  end
  healTimer.Enabled = true
end

function pararAutoHeal()
  if healTimer then
    healTimer.Enabled = false
    healTimer.destroy()
    healTimer = nil
  end
end

if activated then
  iniciarAutoHeal()
else
  pararAutoHeal()
end
        `}
      />

      <AlertBox type="tip" title="Salvar Scripts na Tabela">
        Scripts são salvos automaticamente na tabela (.CT). Compartilhe o arquivo .CT com outros jogadores para distribuir seu trainer completo, incluindo todos os scripts Lua.
      </AlertBox>
    </PageContainer>
  );
}
