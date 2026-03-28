import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function Lua() {
  return (
    <PageContainer
      title="Introdução ao Lua no Cheat Engine"
      subtitle="Use a linguagem Lua para automatizar e estender as capacidades do Cheat Engine."
      difficulty="intermediário"
      timeToRead="10 min"
    >
      <AlertBox type="info" title="Por que Lua?">
        O Cheat Engine usa Lua como sua linguagem de scripting. Com Lua você pode criar cheats muito mais sofisticados que os possíveis com apenas varredura e injeção simples: timers, interfaces gráficas, lógica condicional e muito mais.
      </AlertBox>

      <h2>Acessando o Console Lua</h2>
      <ul>
        <li>Vá em <strong>View → Lua Engine</strong></li>
        <li>Ou <strong>Tools → Lua Engine</strong></li>
        <li>Atalho: <code>Alt+L</code> (dependendo da versão)</li>
      </ul>

      <h2>Básico do Lua</h2>
      <CodeBlock
        title="Sintaxe Básica Lua"
        language="lua"
        code={`
-- Comentário em Lua

-- Variáveis
local nome = "Jogador"
local vida = 100
local ativo = true

-- Condicionais
if vida <= 0 then
  print("Morreu!")
elseif vida < 20 then
  print("Vida crítica!")
else
  print("Vida ok: " .. vida)
end

-- Loops
for i = 1, 10 do
  print(i)
end

-- Funções
local function curar(quantidade)
  vida = vida + quantidade
  return vida
end

print(curar(50))  -- 150
        `}
      />

      <h2>Interagindo com a Memória</h2>
      <CodeBlock
        title="Leitura e Escrita de Memória"
        language="lua"
        code={`
-- Ler um valor de 4 bytes (inteiro)
local endereco = 0x1A2B3C4D
local valor = readInteger(endereco)
print("Vida atual: " .. valor)

-- Escrever um valor de 4 bytes
writeInteger(endereco, 9999)

-- Ler float
local velocidade = readFloat(0x2B3C4D5E)
print("Velocidade: " .. velocidade)

-- Escrever float
writeFloat(0x2B3C4D5E, 999.0)

-- Ler string
local nome = readString(0x3C4D5E6F, 32)  -- 32 bytes
print("Nome: " .. nome)
        `}
      />

      <h2>Usando o Cheat Engine com Lua</h2>
      <CodeBlock
        title="Interagir com a Address List"
        language="lua"
        code={`
-- Obter uma entrada da lista de endereços pelo nome
local entrada = getAddressList().getMemoryRecordByDescription("Vida")
if entrada then
  entrada.Value = "9999"       -- Modificar o valor
  entrada.Active = true        -- Ativar freeze
  print("Vida modificada!")
end

-- Criar novo endereço na lista
local novo = createMemoryRecord()
novo.Description = "Velocidade"
novo.Address = "1A2B3C4D"
novo.Type = vtFloat
novo.Value = "999.0"
        `}
      />

      <AlertBox type="tip" title="Executar Script">
        No Lua Engine, você pode digitar código e executar com <strong>Execute</strong> ou usar a aba de scripts para salvar e reusar. Erros aparecem em vermelho no console.
      </AlertBox>
    </PageContainer>
  );
}
