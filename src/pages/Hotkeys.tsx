import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Hotkeys() {
    return (
      <PageContainer
        title="Hotkeys"
        subtitle="Configure atalhos de teclado para ativar cheats sem sair do jogo."
        difficulty="iniciante"
        timeToRead="10 min"
      >
        <p>
          Hotkeys são atalhos de teclado que você configura no Cheat Engine para ativar ou desativar cheats enquanto joga — sem precisar alternar entre janelas. Você pode atribuir qualquer tecla ou combinação para qualquer ação.
        </p>

        <h2>Configurando Hotkeys em Endereços</h2>
        <div className="not-prose grid grid-cols-1 gap-3 my-4">
          {[
            { n: "1", passo: "Clique com botão direito no endereço", desc: "Selecione um endereço na Address List e clique com o botão direito do mouse." },
            { n: "2", passo: "Selecione 'Set hotkey'", desc: "Ou acesse via 'Toggle activation of this entry'." },
            { n: "3", passo: "Pressione a tecla desejada", desc: "Qualquer tecla ou combinação: F1-F12, Numpad, Ctrl+tecla, etc." },
            { n: "4", passo: "Escolha a ação", desc: "Toggle (ativa/desativa), Activate, Deactivate, ou Set value." },
          ].map((item) => (
            <div key={item.n} className="flex gap-3 p-3 border border-border rounded-xl bg-card">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">{item.n}</span>
              <div>
                <h4 className="font-bold text-sm mb-0.5">{item.passo}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>Ações de Hotkey Disponíveis</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Ação</th>
                <th className="p-3 text-left">O que faz</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Toggle Activation", "Alterna entre ativo e inativo cada vez que a tecla é pressionada"],
                ["Activate", "Ativa o freeze/script (checkbox marcado)"],
                ["Deactivate", "Desativa o freeze/script (checkbox desmarcado)"],
                ["Set value to X", "Define um valor específico ao pressionar, sem freeze contínuo"],
                ["Increase value by X", "Adiciona X ao valor atual ao pressionar"],
                ["Decrease value by X", "Subtrai X do valor atual ao pressionar"],
              ].map(([acao, oqfaz], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-medium text-sm">{acao}</td>
                  <td className="p-3 text-muted-foreground text-sm">{oqfaz}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Hotkeys Globais da Tabela</h2>
        <p>
          Além dos hotkeys por endereço, você pode configurar hotkeys globais que executam ações em múltiplos endereços ou scripts de uma vez:
        </p>
        <CodeBlock
          title="Configurando hotkeys globais"
          language="text"
          code={`Menu: Table → Table Hot Keys (Ctrl+H)

  Na janela de Hot Keys:
  1. Clique em "Add" para criar um novo hotkey
  2. Pressione a tecla desejada
  3. Configure a ação: ativar todos, executar script Lua, etc.

  Exemplo de hotkey global:
  F1 = Ativar todos os cheats (vida, mana, ouro, etc.)
  F2 = Desativar todos os cheats
  F3 = Toggle Speed Hack 2x`}
        />

        <h2>Hotkeys via Lua</h2>
        <CodeBlock
          title="Registrando hotkeys via script Lua"
          language="lua"
          code={`-- Registrar hotkey via Lua no CE
  local hotkey1 = createHotkey(function()
    -- F1 pressionado: ativa vida infinita
    local vida = getAddressList().getMemoryRecordByDescription("Vida")
    if vida then
      vida.Value = "9999"
      vida.Active = true
    end
  end, VK_F1)

  -- Hotkey com Ctrl+F1
  local hotkey2 = createHotkey(function()
    print("Ctrl+F1 pressionado")
  end, VK_F1, false, true, false) -- (tecla, shift, ctrl, alt)`}
        />

        <AlertBox type="tip" title="Dica — Use Numpad para Hotkeys">
          As teclas do Numpad (Numpad 1-9, Numpad +, -) são ótimas para hotkeys em jogos — raramente são usadas em jogos e não interferem com movimentos ou ações.
        </AlertBox>

        <AlertBox type="info" title="Hotkeys funcionam em segundo plano">
          Os hotkeys do CE funcionam mesmo quando o CE está em segundo plano (em tela inteira no jogo). Você não precisa alternar para a janela do CE — basta pressionar a tecla configurada.
        </AlertBox>

        <h2>Layout Recomendado de Hotkeys</h2>
        <div className="not-prose grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
          {[
            { tecla: "F1", acao: "Vida infinita toggle" },
            { tecla: "F2", acao: "Mana infinita toggle" },
            { tecla: "F3", acao: "Ouro +1000" },
            { tecla: "F4", acao: "XP +1000" },
            { tecla: "F5", acao: "Speed 2x toggle" },
            { tecla: "F6", acao: "Speed normal" },
            { tecla: "F7", acao: "Munição infinita" },
            { tecla: "F8", acao: "Desativar tudo" },
          ].map((item) => (
            <div key={item.tecla} className="border border-border rounded-xl p-3 bg-card text-center">
              <div className="font-mono text-primary font-bold text-lg mb-1">{item.tecla}</div>
              <div className="text-xs text-muted-foreground">{item.acao}</div>
            </div>
          ))}
        </div>
      </PageContainer>
    );
  }
  