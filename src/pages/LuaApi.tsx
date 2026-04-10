import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function LuaApi() {
    return (
      <PageContainer
        title="API Lua do Cheat Engine"
        subtitle="Referência das principais funções e objetos disponíveis na API Lua do Cheat Engine."
        difficulty="avançado"
        timeToRead="16 min"
      >
        <p>
          O Cheat Engine expõe uma API Lua extensa que permite controlar quase todas as funcionalidades do CE via script. Esta referência cobre as funções e objetos mais usados.
        </p>

        <h2>Funções de Memória</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Função</th>
                <th className="p-3 text-left">Retorno / Parâmetros</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["readInteger(addr)", "Lê 4 bytes como inteiro assinado"],
                ["readSmallInt(addr)", "Lê 2 bytes como inteiro"],
                ["readFloat(addr)", "Lê 4 bytes como float"],
                ["readDouble(addr)", "Lê 8 bytes como double"],
                ["readBytes(addr, size)", "Lê N bytes — retorna table de bytes"],
                ["readString(addr, length, unicode)", "Lê string ASCII ou Unicode"],
                ["writeInteger(addr, val)", "Escreve inteiro de 4 bytes"],
                ["writeFloat(addr, val)", "Escreve float de 4 bytes"],
                ["writeDouble(addr, val)", "Escreve double de 8 bytes"],
                ["writeBytes(addr, b1, b2, ...)", "Escreve bytes individuais"],
                ["writeString(addr, str, unicode)", "Escreve string na memória"],
                ["getAddress(name)", "Resolve nome de símbolo para endereço (ex: 'game.exe')"],
              ].map(([func, desc], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-xs">{func}</td>
                  <td className="p-3 text-muted-foreground text-sm">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Objetos Principais</h2>
        <CodeBlock
          title="Objetos e suas propriedades"
          language="lua"
          code={`-- getAddressList() → objeto AddressList
  local al = getAddressList()
  al.Count                                -- número de Memory Records
  al.getMemoryRecord(index)               -- por índice (0-based)
  al.getMemoryRecordByDescription("nome") -- por descrição
  al.createMemoryRecord()                 -- criar novo Memory Record

  -- Memory Record (mr)
  mr.Description       -- nome do endereço
  mr.Address           -- endereço como string
  mr.Type              -- tipo (vtDword, vtFloat, vtString, etc.)
  mr.Value             -- valor atual (string)
  mr.Active            -- boolean — freeze ativo
  mr.Script            -- script AA associado

  -- getProcess()
  local proc = getOpenedProcessID()  -- PID do processo
  local name = getProcessIDFromName("game.exe")  -- PID por nome

  -- createHotkey(callback, key, shift, ctrl, alt)
  local hk = createHotkey(function() print("F1!") end, VK_F1)`}
        />

        <h2>Constantes de Tipo de Valor</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Constante Lua</th>
                <th className="p-3 text-left">Tipo no CE</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["vtByte", "Byte (1 byte)"],
                ["vtWord", "2 Bytes (short)"],
                ["vtDword", "4 Bytes (int)"],
                ["vtQword", "8 Bytes (long)"],
                ["vtSingle", "Float"],
                ["vtDouble", "Double"],
                ["vtString", "String"],
                ["vtByteArray", "Array of Bytes"],
              ].map(([const_, tipo], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-sm">{const_}</td>
                  <td className="p-3 text-muted-foreground text-sm">{tipo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Funções de Interface Gráfica</h2>
        <CodeBlock
          title="Criando UI com a API Lua do CE"
          language="lua"
          code={`-- Criar janela
  local form = createForm(true) -- true = form padrão do Lua
  form.Caption = "Meu Trainer"
  form.Width = 350
  form.Height = 300
  form.Position = poScreenCenter  -- centralizar na tela

  -- Botão
  local btn = createButton(form)
  btn.Caption = "Vida Infinita"
  btn.Left = 20; btn.Top = 20
  btn.Width = 200; btn.Height = 35
  btn.OnClick = function(s)
    writeInteger("game.exe+0x123", 9999)
  end

  -- Label
  local lbl = createLabel(form)
  lbl.Caption = "Status: Ativo"
  lbl.Left = 20; lbl.Top = 70

  -- Checkbox
  local chk = createCheckBox(form)
  chk.Caption = "Speed Hack x2"
  chk.Left = 20; chk.Top = 100
  chk.OnChange = function(s)
    speedhack_setSpeed(chk.State == cbChecked and 2.0 or 1.0)
  end

  form.show()`}
        />

        <AlertBox type="info" title="Documentação completa da API">
          A documentação completa da API Lua do CE está disponível em: github.com/cheat-engine/cheat-engine/blob/master/Cheat%20Engine/bin/autorun/LuaInterface.md — consulte para funções avançadas como criação de tipos personalizados, acesso ao disassembler via Lua e controle do debugger.
        </AlertBox>
      </PageContainer>
    );
  }
  