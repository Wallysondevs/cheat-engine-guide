import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function MemoryView() {
    return (
      <PageContainer
        title="Memory View"
        subtitle="Como usar o visualizador hexadecimal e o disassembler integrado do Cheat Engine."
        difficulty="intermediário"
        timeToRead="12 min"
      >
        <p>
          O Memory View é a janela mais poderosa do Cheat Engine. Ela combina um visualizador hexadecimal da memória, um disassembler de código Assembly, e o debugger — tudo em uma interface.
        </p>

        <h2>Abrindo o Memory View</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Método</th>
                <th className="p-3 text-left">Como fazer</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Atalho", "Ctrl+M na janela principal do CE"],
                ["Menu", "View → Memory View"],
                ["Via endereço", "Clique direito em um endereço → 'Browse memory region'"],
              ].map(([m, c], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-medium text-sm">{m}</td>
                  <td className="p-3 text-muted-foreground text-sm">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Layout da Janela</h2>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          {[
            { area: "Painel superior — Disassembler", desc: "Mostra o código Assembly do processo. Você vê as instruções que o jogo executa. Útil para cheats avançados." },
            { area: "Painel inferior — Hex Editor", desc: "Visualização hexadecimal da memória bruta. Você pode ver e editar bytes diretamente — como um editor hexadecimal." },
            { area: "Painel direito — Registradores", desc: "Aparece durante o debugging. Mostra EAX, EBX, etc. em tempo real quando pausado em um breakpoint." },
            { area: "Barra de endereço", desc: "Digite qualquer endereço (hex ou expressão como 'game.exe'+0x100) para navegar até aquela região de memória." },
          ].map((item) => (
            <div key={item.area} className="border border-border rounded-xl p-4 bg-card">
              <h4 className="font-bold text-sm mb-1 text-primary">{item.area}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2>Usando o Hex Editor</h2>
        <CodeBlock
          title="Navegando e editando no Hex Editor"
          language="text"
          code={`Navegar para endereço: Ctrl+G → digitar endereço ou expressão
  Editar byte: clicar no byte em hex → digitar novo valor em hex
  Editar como texto: clicar na coluna ASCII à direita
  Salvar alteração: Enter após digitar
  Cancelar: Escape

  Dica: O hex editor atualiza em tempo real — os bytes mudam
  conforme o jogo escreve na memória (se auto-update estiver ativo)`}
        />

        <h2>Usando o Disassembler</h2>
        <CodeBlock
          title="Navegando no Disassembler"
          language="text"
          code={`Ir para endereço: Ctrl+G → endereço hex
  Ver de onde vem uma chamada (CALL): Clique direito → "Find references to this address"
  Adicionar breakpoint: Clique no endereço → F5 (ou duplo clique na margem esquerda)
  Mostrar labels: o CE resolve automaticamente endereços de funções conhecidas
  NOP uma instrução: Clique direito → "Replace with code that does nothing (NOP)"
  Restaurar instrução original: Clique direito → "Restore with original code"`}
        />

        <h2>Pesquisa na Memória</h2>
        <CodeBlock
          title="Pesquisar por sequências de bytes"
          language="text"
          code={`Menu Memory View: Tools → Search Memory (ou Ctrl+F)

  Tipos de busca:
  - Hex bytes: FF 00 4E A1 (busca sequência exata de bytes)
  - Text: PlayerName (busca string ASCII)
  - Unicode: para textos em caracteres especiais

  Útil para encontrar:
  - Strings de texto do jogo
  - Padrões de código Assembly
  - Valores específicos em formato bruto`}
        />

        <AlertBox type="tip" title="Dica — Seguir Jumps e Calls">
          No disassembler, clique duplo em um endereço após CALL ou JMP para navegar diretamente para o destino. Use o botão de histórico (seta para trás) para voltar ao ponto anterior.
        </AlertBox>

        <AlertBox type="info" title="Auto-Refresh e Freeze de Visualização">
          Por padrão, o Memory View atualiza automaticamente. Se quiser "congelar" a visualização para analisar com calma, vá em View → Pause auto-refresh (ou a visualização se tornará uma foto do momento).
        </AlertBox>
      </PageContainer>
    );
  }
  