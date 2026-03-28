import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function Hotkeys() {
  return (
    <PageContainer
      title="Hotkeys"
      subtitle="Configure atalhos de teclado para ativar e desativar cheats durante o jogo."
      difficulty="iniciante"
      timeToRead="6 min"
    >
      <h2>Configurando Hotkeys pela Interface</h2>
      <ol>
        <li>Na Address List, clique com botão direito em uma entrada</li>
        <li>Selecione <strong>"Set/Remove Hotkeys"</strong></li>
        <li>Na janela que abrir, clique em <strong>"Add"</strong></li>
        <li>Pressione a tecla ou combinação desejada (ex: F1, Ctrl+1, Numpad0)</li>
        <li>Escolha a ação: <strong>Toggle</strong>, <strong>Enable</strong>, ou <strong>Disable</strong></li>
      </ol>

      <h2>Tipos de Ação para Hotkey</h2>
      <ul>
        <li><strong>Toggle:</strong> ativa se desativado, desativa se ativado</li>
        <li><strong>Enable:</strong> sempre ativa (liga o freeze/cheat)</li>
        <li><strong>Disable:</strong> sempre desativa</li>
        <li><strong>Set value:</strong> define o valor para um número específico quando pressionado</li>
      </ul>

      <h2>Hotkeys via Lua</h2>
      <CodeBlock
        title="Registrar Hotkey por Script"
        language="lua"
        code={`
-- Registrar F1 para Godmode
registerHotkey(VK_F1, function()
  local entrada = getAddressList().getMemoryRecordByDescription("Vida")
  if entrada then
    entrada.Active = not entrada.Active
    if entrada.Active then
      showMessage("GODMODE ON")
    else
      showMessage("GODMODE OFF")
    end
  end
end)

-- Registrar Numpad+ para adicionar dinheiro
registerHotkey(VK_ADD, function()
  local dinheiro = readInteger(0x1A2B3C4D)
  writeInteger(0x1A2B3C4D, dinheiro + 10000)
  print("+ 10000 de dinheiro!")
end)
        `}
      />

      <h2>Teclas Virtuais Comuns</h2>
      <div className="not-prose grid grid-cols-2 sm:grid-cols-3 gap-2 my-4">
        {[
          ["VK_F1 a VK_F12", "Teclas F"],
          ["VK_NUMPAD0–9", "Teclado numérico"],
          ["VK_ADD", "Numpad +"],
          ["VK_SUBTRACT", "Numpad -"],
          ["VK_HOME", "Home"],
          ["VK_END", "End"],
          ["VK_INSERT", "Insert"],
          ["VK_DELETE", "Delete"],
          ["VK_PRIOR", "Page Up"],
          ["VK_NEXT", "Page Down"],
        ].map(([vk, desc], i) => (
          <div key={i} className="border border-border rounded p-2 bg-card text-xs">
            <code className="text-primary block">{vk}</code>
            <span className="text-muted-foreground">{desc}</span>
          </div>
        ))}
      </div>

      <AlertBox type="tip" title="Dica de Conforto">
        Use teclas de função (F1–F12) ou o teclado numérico para hotkeys. Eles raramente conflitam com controles do jogo e são fáceis de alcançar enquanto joga.
      </AlertBox>
    </PageContainer>
  );
}
