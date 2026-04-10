import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Trainers() {
    return (
      <PageContainer
        title="Criando Trainers"
        subtitle="Como criar um trainer executável standalone usando o Cheat Engine — distribua seus cheats sem precisar do CE."
        difficulty="avançado"
        timeToRead="14 min"
      >
        <p>
          Trainers são programas executáveis (.exe) que aplicam cheats em jogos automaticamente. Com o Cheat Engine, você pode criar trainers completos com interface gráfica, sem que o usuário final precise instalar o CE.
        </p>

        <h2>O que é um Trainer?</h2>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          {[
            { aspecto: "Para o usuário final", desc: "Um programa simples com botões e hotkeys. Abre junto com o jogo e aplica os cheats com um clique ou tecla." },
            { aspecto: "Por baixo dos panos", desc: "Um executável que usa as mesmas técnicas do CE: attach ao processo, write à memória, code injection." },
            { aspecto: "Distribuição", desc: "Pode ser compartilhado como um único .exe — não requer CE instalado. Sites como GameCopyWorld e GCW hospedam trainers." },
            { aspecto: "Atualização", desc: "Cada update do jogo pode quebrar o trainer. Endereços mudam, offsets mudam. AOB-based trainers são mais resistentes." },
          ].map((item) => (
            <div key={item.aspecto} className="border border-border rounded-xl p-4 bg-card">
              <h4 className="font-bold text-sm mb-1 text-primary">{item.aspecto}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2>Usando o Trainer Maker do CE</h2>
        <CodeBlock
          title="Acessando o Trainer Maker"
          language="text"
          code={`Menu: Tools → Trainer Maker

  O Trainer Maker permite:
  1. Criar a interface gráfica (botões, labels, hotkeys)
  2. Associar cada botão a um cheat da tabela .CT
  3. Configurar o executável final (nome, ícone, version info)
  4. Compilar e gerar o .exe standalone

  Pré-requisito: ter uma tabela .CT completa e testada`}
        />

        <h2>Trainer em Lua (Abordagem Recomendada)</h2>
        <p>
          A forma mais flexível de criar trainers no CE é usar Lua com a API de UI do CE:
        </p>
        <CodeBlock
          title="Trainer completo com interface Lua"
          language="lua"
          code={`-- Trainer simples com interface gráfica
  local form = createForm()
  form.Caption = "Meu Trainer - v1.0"
  form.Width = 300
  form.Height = 250

  -- Função auxiliar para criar botão
  local function criarBotao(parent, texto, x, y, callback)
    local btn = createButton(parent)
    btn.Caption = texto
    btn.Left = x
    btn.Top = y
    btn.Width = 250
    btn.Height = 35
    btn.OnClick = callback
    return btn
  end

  -- Botão Vida Infinita
  criarBotao(form, "F1 - Vida Infinita", 20, 20, function()
    writeInteger(getAddress("game.exe") + 0x123ABC, 9999)
    print("Vida definida para 9999")
  end)

  -- Botão Ouro Infinito
  criarBotao(form, "F2 - Ouro Infinito", 20, 65, function()
    writeInteger(getAddress("game.exe") + 0x456DEF, 999999)
    print("Ouro definido para 999999")
  end)

  -- Hotkeys
  createHotkey(function() writeInteger(getAddress("game.exe") + 0x123ABC, 9999) end, VK_F1)
  createHotkey(function() writeInteger(getAddress("game.exe") + 0x456DEF, 999999) end, VK_F2)

  form.show()`}
        />

        <h2>Compilando o Trainer para .exe Standalone</h2>
        <CodeBlock
          title="Passos para gerar o executável"
          language="text"
          code={`1. Crie e teste o script Lua ou a tabela .CT completamente
  2. Abra o Trainer Maker (Tools → Trainer Maker)
  3. Configure:
     - Nome do trainer e versão
     - Ícone personalizado (opcional)
     - Processo alvo (nome do .exe do jogo)
     - Cheats da tabela a incluir
  4. Clique em "Create Trainer"
  5. O CE gera um .exe standalone que pode ser distribuído

  Alternativa: Use o CETrainer Generator (ferramenta externa)
  que oferece mais opções de personalização de interface.`}
        />

        <AlertBox type="warning" title="Antivírus podem flagar trainers">
          Executáveis de trainer frequentemente são detectados como malware por antivírus — não porque sejam vírus, mas porque usam técnicas similares (modificação de memória de outro processo). Adicione ao whitelist ou desative temporariamente ao testar.
        </AlertBox>

        <AlertBox type="tip" title="AOB-based Trainers são mais duráveis">
          Trainers baseados em Array of Bytes (AOB scan) em vez de endereços absolutos funcionam por mais tempo após updates do jogo. O CE busca o padrão de bytes na memória, então mesmo que o endereço mude, o padrão continua sendo encontrado.
        </AlertBox>
      </PageContainer>
    );
  }
  