import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Templates() {
    return (
      <PageContainer
        title="Templates de Scripts"
        subtitle="Como usar e criar templates reutilizáveis no Cheat Engine para acelerar o desenvolvimento."
        difficulty="intermediário"
        timeToRead="10 min"
      >
        <p>
          Templates no Cheat Engine são modelos pré-configurados de scripts e tabelas que você pode reutilizar em diferentes projetos. Eles evitam reescrever código comum e padronizam a estrutura dos seus cheats.
        </p>

        <h2>Templates de Auto Assembler</h2>
        <p>
          O Auto Assembler do CE oferece templates prontos para operações comuns. Acesse via Ctrl+A → Template:
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Template</th>
                <th className="p-3 text-left">Para que serve</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Cheat Table Framework Code", "Estrutura base para uma tabela completa com ativação/desativação"],
                ["Code Injection", "Template para injetar código Assembly em um endereço específico"],
                ["AOB Injection", "Injeção usando Array of Bytes (mais resistente a updates do jogo)"],
                ["Full Injection", "Injeção completa com save/restore de registradores"],
                ["Lua Script", "Template básico de script Lua com estrutura de enable/disable"],
              ].map(([template, para], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-sm">{template}</td>
                  <td className="p-3 text-muted-foreground text-sm">{para}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Template de Code Injection</h2>
        <CodeBlock
          title="Template padrão de Code Injection"
          language="asm"
          code={`[ENABLE]
  aobscanmodule(INJECT,game.exe,FF 83 4C 00 00 00 ??) // ENCONTRAR
  alloc(newmem,$1000,"game.exe"+0)

  label(code)
  label(return)

  newmem:
  code:
    // Seu código personalizado aqui
    // Exemplo: ignorar o dano
    // jmp return  (pular a instrução original)
    
    // OU: executar a instrução original e depois seu código:
    // [instrução original copiada]
    
    jmp return

  INJECT:
    jmp newmem
    nop 2
  return:
  registersymbol(INJECT)

  [DISABLE]
  INJECT:
    db [bytes originais]
  unregistersymbol(INJECT)
  dealloc(newmem)`}
        />

        <h2>Criando seus Próprios Templates</h2>
        <CodeBlock
          title="Salvando um script como template"
          language="text"
          code={`1. Escreva seu script no Auto Assembler (Ctrl+A)
  2. Selecione todo o código (Ctrl+A para selecionar)
  3. Copie o código
  4. Crie um arquivo .txt ou .ce na pasta de templates do CE:
     C:\Program Files\Cheat Engine 7.5\autorun\templates\

  5. Na próxima vez, acesse via Template → seu arquivo
     
  Alternativa: salve em um arquivo .ct compartilhado com
  prefixo de comentário para identificação:`}
        />

        <h2>Template Reutilizável de Trainer em Lua</h2>
        <CodeBlock
          title="Template base de trainer com hotkeys"
          language="lua"
          code={`-- Template de Trainer Genérico
  -- Substitua os endereços e valores conforme necessário

  local cheats = {
    { nome = "Vida Infinita",  addr = "0x00400000", val = "9999", hotkey = VK_F1 },
    { nome = "Ouro Infinito",  addr = "0x00400010", val = "99999", hotkey = VK_F2 },
    { nome = "XP Max",         addr = "0x00400020", val = "9999999", hotkey = VK_F3 },
  }

  for _, cheat in ipairs(cheats) do
    createHotkey(function()
      local mr = getAddressList().getMemoryRecordByDescription(cheat.nome)
      if mr then
        mr.Value = cheat.val
        mr.Active = not mr.Active
        print((mr.Active and "Ativado: " or "Desativado: ") .. cheat.nome)
      end
    end, cheat.hotkey)
  end
  print("Trainer carregado! F1=Vida, F2=Ouro, F3=XP")`}
        />

        <AlertBox type="tip" title="Compartilhe Templates Úteis">
          A comunidade do Cheat Engine no FearLess (fearlessrevolution.com) tem uma seção de templates e recursos reutilizáveis. Compartilhar seus templates ajuda outros e você pode receber melhorias de volta.
        </AlertBox>
      </PageContainer>
    );
  }
  