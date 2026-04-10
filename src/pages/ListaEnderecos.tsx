import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function ListaEnderecos() {
    return (
      <PageContainer
        title="Lista de Endereços"
        subtitle="Como organizar, nomear e gerenciar endereços encontrados na Address List do Cheat Engine."
        difficulty="iniciante"
        timeToRead="10 min"
      >
        <p>
          A Address List (Lista de Endereços) é o painel inferior do Cheat Engine onde você adiciona endereços para monitorar e modificar. Ela funciona como uma planilha dos seus cheats ativos.
        </p>

        <h2>Adicionando Endereços</h2>
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
                ["Da lista de resultados", "Selecione endereços na lista e pressione Enter ou duplo clique, ou clique em 'Add to list'"],
                ["Manualmente", "Clique no botão 'Add address manually' (ícone de mais azul) na barra inferior"],
                ["Via Pointer", "Use 'Add address manually' → marque 'Pointer' → informe o endereço base e offsets"],
                ["Via Lua", "Use addAddress() ou o objeto AddressList na API Lua do CE"],
              ].map(([metodo, como], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-medium text-sm">{metodo}</td>
                  <td className="p-3 text-muted-foreground text-sm">{como}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Colunas da Address List</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Coluna</th>
                <th className="p-3 text-left">Função</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Active (checkbox)", "Ativa/desativa o freeze do endereço. Quando marcado, o CE mantém o valor constante."],
                ["Description", "Nome/descrição que você dá ao endereço. Duplo clique para editar. Use nomes claros!"],
                ["Address", "O endereço de memória. Verde = estático, preto = dinâmico, roxo = pointer."],
                ["Type", "Tipo do dado: 4 Bytes, Float, String, etc. Duplo clique para mudar o tipo."],
                ["Value", "Valor atual na memória. Atualiza em tempo real. Duplo clique para modificar."],
              ].map(([col, func], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-sm">{col}</td>
                  <td className="p-3 text-muted-foreground text-sm">{func}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Organizando com Grupos</h2>
        <p>
          Clique com botão direito na Address List → <strong>Add group</strong> para criar seções. Arraste endereços para dentro dos grupos. Isso é essencial para tabelas grandes.
        </p>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          {[
            { grupo: "Recursos", itens: "Vida, Mana, Stamina, XP, Ouro, Munição" },
            { grupo: "Stats do Personagem", itens: "Força, Destreza, Inteligência, Nível" },
            { grupo: "Posição / Velocidade", itens: "X, Y, Z, VelocidadeBase" },
            { grupo: "Scripts", itens: "Agrupamento de scripts Lua e Auto Assembler" },
          ].map((item) => (
            <div key={item.grupo} className="border border-border rounded-xl p-4 bg-card">
              <h4 className="font-bold text-sm mb-1 text-primary">{item.grupo}</h4>
              <p className="text-xs text-muted-foreground">{item.itens}</p>
            </div>
          ))}
        </div>

        <h2>Opções do Botão Direito</h2>
        <CodeBlock
          title="Opções disponíveis ao clicar com botão direito"
          language="text"
          code={`Change value → Modifica o valor (mesmo que duplo clique)
  Set hotkey → Atribui tecla de atalho para ativar/desativar o freeze
  Change type → Muda o tipo de dado do endereço
  Pointer scan for this address → Inicia pointer scan a partir deste endereço
  Find out what writes to this address → Descobre o que escreve neste endereço
  Find out what reads this address → Descobre o que lê este endereço
  Toggle all checkboxes → Ativa/desativa todos de uma vez
  Sort → Ordena por nome, endereço, tipo ou valor`}
        />

        <AlertBox type="tip" title="Dica — Cores dos Endereços">
          Os endereços têm cores com significado: <strong>Verde</strong> = estático (bom, funciona sempre), <strong>Preto</strong> = dinâmico (muda ao reiniciar), <strong>Roxo/Violeta</strong> = ponteiro configurado. Sempre prefira endereços verdes em suas tabelas.
        </AlertBox>

        <AlertBox type="info" title="Endereços com Script">
          Você pode adicionar um script Lua ou Auto Assembler diretamente a um endereço. Quando o checkbox é ativado, o script é executado automaticamente. Isso permite cheats que vão além de simplesmente travar valores.
        </AlertBox>
      </PageContainer>
    );
  }
  