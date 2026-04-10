import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Scripts() {
    return (
      <PageContainer
        title="Scripts no Cheat Engine"
        subtitle="Como criar scripts Auto Assembler e Lua para cheats avançados e automatizados."
        difficulty="intermediário"
        timeToRead="14 min"
      >
        <p>
          O Cheat Engine suporta dois tipos de scripts: <strong>Auto Assembler</strong> (scripts de código Assembly com sintaxe simplificada) e <strong>Lua</strong> (linguagem de script de alto nível). Cada um tem seus casos de uso.
        </p>

        <h2>Auto Assembler vs Lua</h2>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          {[
            {
              tipo: "Auto Assembler",
              desc: "Injeta código diretamente no processo do jogo. Usado para modificar comportamentos a nível de CPU — ignorar dano, alterar cálculos, etc. Mais poderoso mas mais complexo.",
              casos: "Code Injection, AOB Patch, NOP de instruções",
            },
            {
              tipo: "Lua",
              desc: "Linguagem de alto nível que controla o CE via API. Usado para automatizar ações, criar UIs, gerenciar múltiplos endereços e criar trainers completos.",
              casos: "Trainers, automação, UI personalizada, lógica condicional",
            },
          ].map((item) => (
            <div key={item.tipo} className="border border-border rounded-xl p-4 bg-card">
              <h4 className="font-bold text-sm mb-2 text-primary">{item.tipo}</h4>
              <p className="text-xs text-muted-foreground mb-2">{item.desc}</p>
              <p className="text-xs font-medium">Casos: <span className="text-muted-foreground">{item.casos}</span></p>
            </div>
          ))}
        </div>

        <h2>Script Auto Assembler Básico</h2>
        <CodeBlock
          title="Estrutura básica de um script AA"
          language="asm"
          code={`[ENABLE]
  // Esta seção executa quando o script é ativado

  // Alocar nova memória para nosso código
  alloc(meuCodigo, 256)

  label(voltarAqui)

  // Endereço onde vamos injetar
  // Substitua pelo endereço real encontrado no debugger
  originalAddress:
    jmp meuCodigo      // pula para nosso código
    nop 2              // preenche espaço (instrução original era 5 bytes)

  meuCodigo:
    // Coloque aqui o que quiser fazer
    // Exemplo: ignorar a instrução de dano
    
    jmp voltarAqui    // retorna ao fluxo normal

  [DISABLE]
  // Esta seção executa quando o script é desativado
  // Restaura os bytes originais
  originalAddress:
    db ?? ?? ?? ?? ??  // bytes originais (CE preenche automaticamente)
    
  dealloc(meuCodigo)`}
        />

        <h2>Scripts Lua Essenciais</h2>
        <CodeBlock
          title="Operações comuns em Lua"
          language="lua"
          code={`-- Ler um valor da memória
  local vida = readInteger("game.exe+0x0012A3B0")
  print("Vida: " .. vida)

  -- Escrever um valor na memória
  writeInteger("game.exe+0x0012A3B0", 9999)

  -- Ler/escrever float
  local velocidade = readFloat("game.exe+0x0045B200")
  writeFloat("game.exe+0x0045B200", 50.0)

  -- Trabalhar com ponteiros
  local base = readInteger("game.exe+0x00A2B4C0")
  local vidaAddr = base + 0x4C
  local vidaAtual = readInteger(vidaAddr)
  print("Vida via ponteiro: " .. vidaAtual)
  writeInteger(vidaAddr, 9999)

  -- Ativar um script na Address List
  local mr = getAddressList().getMemoryRecordByDescription("Vida Infinita")
  mr.Active = true`}
        />

        <h2>Adicionando Scripts a Endereços da Tabela</h2>
        <CodeBlock
          title="Como adicionar script a um Memory Record"
          language="text"
          code={`1. Na Address List, selecione um endereço
  2. Clique com botão direito → "Set script"
  3. Ou: duplo clique no endereço → aba "Script"

  Quando o checkbox for marcado → script [ENABLE] executa
  Quando desmarcado → script [DISABLE] executa

  Isso permite criar cheats complexos que respondem ao checkbox`}
        />

        <AlertBox type="info" title="Auto Assembler: aobscanmodule">
          Use <code>aobscanmodule</code> em vez de endereços absolutos para scripts que devem funcionar em diferentes versões do jogo. O CE busca o padrão de bytes na memória, tornando o script mais robusto.
        </AlertBox>

        <AlertBox type="tip" title="Teste Scripts no Console Lua">
          Antes de adicionar um script a uma tabela, teste no console Lua (menu Lua → Lua Engine). Você pode executar código Lua interativamente e ver os resultados imediatamente sem riscos.
        </AlertBox>
      </PageContainer>
    );
  }
  