import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function AutoAssemble() {
    return (
      <PageContainer
        title="Auto Assembler"
        subtitle="Como usar o editor Auto Assembler do Cheat Engine para escrever e injetar código Assembly."
        difficulty="avançado"
        timeToRead="16 min"
      >
        <p>
          O Auto Assembler é o editor de scripts de baixo nível do CE. Ele usa uma sintaxe simplificada de Assembly (com macros e helpers) para injetar código em processos, modificar instruções e criar cheats que vão além de simples modificações de valor.
        </p>

        <h2>Abrindo o Auto Assembler</h2>
        <CodeBlock
          title="Como acessar"
          language="text"
          code={`Atalho: Ctrl+A na janela principal do CE
  Menu: Tools → Auto Assembler
  Via Memory View: Ctrl+A também funciona lá

  Na janela do AA, clique em Template para inserir
  estruturas prontas.`}
        />

        <h2>Sintaxe e Diretivas Principais</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Diretiva</th>
                <th className="p-3 text-left">Função</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["[ENABLE]", "Código executado ao ativar o script (checkbox marcado)"],
                ["[DISABLE]", "Código executado ao desativar o script (restaura original)"],
                ["alloc(nome, tamanho)", "Aloca região de memória para o novo código"],
                ["dealloc(nome)", "Libera a memória alocada (coloque no [DISABLE])"],
                ["label(nome)", "Define um label (ponto de referência no código)"],
                ["registersymbol(nome)", "Registra um símbolo para referenciar no CE"],
                ["unregistersymbol(nome)", "Remove o símbolo registrado"],
                ["aobscanmodule(nome, mod, padrão)", "Busca padrão de bytes (AOB) no módulo"],
                ["db", "Define bytes diretamente (db FF A3 00)"],
                ["readmem(addr, size)", "Copia bytes de um endereço (para [DISABLE])"],
              ].map(([dir, func], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-xs">{dir}</td>
                  <td className="p-3 text-muted-foreground text-sm">{func}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Script de Code Injection Completo</h2>
        <CodeBlock
          title="Ignorar dano recebido — exemplo real"
          language="asm"
          code={`[ENABLE]
  // Encontrar a instrução de subtração de vida usando AOB
  aobscanmodule(INJPOINT, game.exe, 29 83 4C 00 00 00)
  // 29 = SUB, 83 4C 00 00 00 = [EBX+0x4C]
  // Isso é: SUB [EBX+4C], EAX — diminuindo a vida

  alloc(meuCodigo, 256, INJPOINT)

  label(codigo)
  label(retorno)

  meuCodigo:
  codigo:
    // Ignoramos a instrução original (não subtraímos nada)
    // e pulamos de volta para depois dela
    jmp retorno

  INJPOINT:
    jmp meuCodigo  // 5 bytes
    nop            // 1 byte (instrução original era 6 bytes total)
  retorno:
  registersymbol(INJPOINT)

  [DISABLE]
  INJPOINT:
    db 29 83 4C 00 00 00  // restaura: SUB [EBX+0x4C], EAX
  unregistersymbol(INJPOINT)
  dealloc(meuCodigo)`}
        />

        <h2>AOB (Array of Bytes) — Por que usar</h2>
        <p>
          Em vez de endereços absolutos, use AOB para que o script funcione mesmo após updates do jogo:
        </p>
        <CodeBlock
          title="aobscanmodule — busca por padrão de bytes"
          language="asm"
          code={`// Busca o padrão FF 83 4C 00 00 00 ?? no módulo game.exe
  // O ?? é wildcard — aceita qualquer byte nessa posição
  aobscanmodule(MEUADDR, game.exe, FF 83 4C 00 00 00 ??)

  // Depois use MEUADDR como endereço
  MEUADDR:
    // code...`}
        />

        <AlertBox type="tip" title="Dica — Execute o Script para Testar">
          Antes de fechar o Auto Assembler, clique em "Execute" para testar o script sem associá-lo a um endereço. Se der erro, a mensagem aparece no console. Se funcionar, você pode então associar ao Memory Record.
        </AlertBox>

        <AlertBox type="warning" title="Erros comuns no Auto Assembler">
          Os erros mais frequentes são: instrução original não restaurada corretamente (causando crash), tamanho alocado insuficiente (alloc muito pequeno), e label undefined. Sempre teste em um ambiente controlado antes de usar no jogo real.
        </AlertBox>
      </PageContainer>
    );
  }
  