import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function LuaApi() {
  return (
    <PageContainer
      title="API do Cheat Engine"
      subtitle="Referência das funções mais importantes da API Lua do Cheat Engine."
      difficulty="intermediário"
      timeToRead="12 min"
    >
      <h2>Funções de Memória</h2>
      <div className="space-y-2 my-4 not-prose">
        {[
          { fn: "readInteger(addr)", desc: "Lê 4 bytes como inteiro (signed)" },
          { fn: "readSmallInteger(addr)", desc: "Lê 2 bytes como inteiro" },
          { fn: "readByte(addr)", desc: "Lê 1 byte" },
          { fn: "readFloat(addr)", desc: "Lê 4 bytes como float" },
          { fn: "readDouble(addr)", desc: "Lê 8 bytes como double" },
          { fn: "readQword(addr)", desc: "Lê 8 bytes como inteiro de 64 bits" },
          { fn: "readString(addr, len)", desc: "Lê string ASCII com tamanho especificado" },
          { fn: "writeInteger(addr, val)", desc: "Escreve inteiro de 4 bytes" },
          { fn: "writeFloat(addr, val)", desc: "Escreve float de 4 bytes" },
          { fn: "writeString(addr, str)", desc: "Escreve string ASCII" },
          { fn: "readBytes(addr, len)", desc: "Lê N bytes como array" },
          { fn: "writeBytes(addr, bytes)", desc: "Escreve array de bytes" },
        ].map((item, i) => (
          <div key={i} className="flex gap-3 border border-border rounded p-2.5 bg-card">
            <code className="text-primary text-xs font-mono shrink-0">{item.fn}</code>
            <span className="text-xs text-muted-foreground">{item.desc}</span>
          </div>
        ))}
      </div>

      <h2>Funções de Processo</h2>
      <CodeBlock
        title="Operações de Processo"
        language="lua"
        code={`
-- Obter processo atual
local processo = getOpenedProcessID()

-- Resolver nome de módulo para endereço
local base = getModuleAddress("game.exe")
print(string.format("Base: %X", base))

-- Alocar memória no processo
local addr = allocateMemory(128)

-- Desalocar
freeMemory(addr)

-- AOB Scan
local resultado = AOBScan("89 46 4C ?? 4D F8")
if resultado ~= nil then
  print(string.format("Encontrado em: %X", resultado[0]))
end
        `}
      />

      <h2>Funções de Tempo</h2>
      <CodeBlock
        title="Timers e Sleep"
        language="lua"
        code={`
-- Criar um timer que executa a cada 1 segundo
local timer = createTimer(nil)
timer.Interval = 1000  -- 1000ms = 1 segundo
timer.OnTimer = function(sender)
  -- Código executado a cada segundo
  local vida = readInteger(0x1A2B3C4D)
  if vida < 50 then
    writeInteger(0x1A2B3C4D, 100)
    print("Vida restaurada!")
  end
end
timer.Enabled = true

-- Para o timer depois de 10 segundos
sleep(10000)
timer.Enabled = false
timer.destroy()
        `}
      />

      <h2>Interface Gráfica (Forms)</h2>
      <CodeBlock
        title="Criar Janela GUI"
        language="lua"
        code={`
local form = createForm()
form.Caption = "Meu Trainer"
form.Width = 300
form.Height = 200

local btn = createButton(form)
btn.Caption = "Vida Infinita"
btn.Left = 50
btn.Top = 50
btn.Width = 200
btn.OnClick = function(sender)
  writeInteger(0x1A2B3C4D, 9999)
  showMessage("Vida máxima ativada!")
end

form.show()
        `}
      />

      <AlertBox type="tip" title="Documentação Completa">
        A documentação completa da API está em <strong>Help → Cheat Engine Lua Extensions</strong> dentro do próprio CE, ou em <code>cheatengine.org/forum/</code> na seção Lua.
      </AlertBox>
    </PageContainer>
  );
}
