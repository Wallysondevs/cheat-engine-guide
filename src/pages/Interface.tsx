import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Interface() {
  return (
    <PageContainer
      title="Interface Geral"
      subtitle="Conheça todos os elementos da interface do Cheat Engine e para que cada um serve."
      difficulty="iniciante"
      timeToRead="7 min"
    >
      <AlertBox type="info" title="Visão Geral">
        A interface do Cheat Engine é dividida em duas áreas principais: o painel de busca (esquerda/cima) e a lista de endereços (baixo). Entender cada elemento é essencial para usar o programa com eficiência.
      </AlertBox>

      <h2>Áreas Principais da Interface</h2>

      <h3>1. Barra Superior — Seleção de Processo</h3>
      <p>
        No topo da janela há um ícone de computador com o texto <strong>"No process selected"</strong>. Este é o seletor de processo — clique nele para escolher qual programa/jogo você quer inspecionar. Uma lista de todos os processos em execução será exibida.
      </p>

      <h3>2. Painel de Busca (Scan Panel)</h3>
      <p>
        No lado esquerdo fica o painel principal de varredura, com os seguintes campos:
      </p>
      <ul>
        <li><strong>Value:</strong> o valor que você quer procurar na memória</li>
        <li><strong>Hex:</strong> exibe o valor em hexadecimal</li>
        <li><strong>Value Type:</strong> tipo do dado (4 Bytes, Float, Double, etc.)</li>
        <li><strong>Scan Type:</strong> tipo de varredura (Exact Value, Changed Value, etc.)</li>
        <li><strong>First Scan:</strong> inicia a primeira varredura</li>
        <li><strong>Next Scan:</strong> refina os resultados após a primeira varredura</li>
        <li><strong>New Scan:</strong> reinicia, limpando todos os resultados anteriores</li>
      </ul>

      <h3>3. Lista de Resultados</h3>
      <p>
        Após uma varredura, todos os endereços encontrados aparecem aqui. Cada linha mostra:
      </p>
      <ul>
        <li><strong>Address:</strong> endereço hexadecimal na memória</li>
        <li><strong>Value:</strong> valor atual naquele endereço</li>
        <li><strong>Previous:</strong> valor anterior (quando disponível)</li>
      </ul>
      <p>
        Duplo clique em um endereço para adicioná-lo à lista de endereços (painel inferior).
      </p>

      <h3>4. Lista de Endereços (Address List)</h3>
      <p>
        O painel inferior é onde você gerencia os endereços que encontrou. Aqui você pode:
      </p>
      <ul>
        <li>Dar um nome descritivo ao endereço</li>
        <li>Ativar o <strong>Freeze</strong> (travar o valor)</li>
        <li>Modificar o valor manualmente</li>
        <li>Salvar a tabela para uso futuro (.CT — Cheat Table)</li>
      </ul>

      <h2>Menu Principal</h2>
      <div className="space-y-2 my-4 not-prose">
        {[
          { menu: "File", desc: "Abrir/salvar tabelas de trapaça (.CT), novo scan" },
          { menu: "Edit", desc: "Preferências, configurações de scan" },
          { menu: "View", desc: "Abre Memory View, Dissect Data Structures, etc." },
          { menu: "Tools", desc: "Pointer Scanner, Auto Assemble, Trainer Maker" },
          { menu: "Help", desc: "Tutorial integrado, documentação, sobre" },
        ].map((item, i) => (
          <div key={i} className="flex gap-3 border border-border rounded-lg p-3 bg-card">
            <code className="text-primary font-mono text-sm bg-muted px-2 py-0.5 rounded self-start shrink-0">{item.menu}</code>
            <span className="text-sm text-muted-foreground">{item.desc}</span>
          </div>
        ))}
      </div>

      <h2>Barra de Ferramentas</h2>
      <p>
        Abaixo do menu há ícones de atalho para as funções mais usadas:
      </p>
      <ul>
        <li><strong>Ícone de olho:</strong> Memory View (visualizador de memória hexadecimal)</li>
        <li><strong>Ícone de engrenagem:</strong> Auto Assemble (editor de código assembly)</li>
        <li><strong>Ícone de seta:</strong> Pointer Scanner</li>
        <li><strong>Ícone de plug:</strong> Attach to process (mesmo que o seletor de processo)</li>
      </ul>

      <AlertBox type="tip" title="Dica de Produtividade">
        Use <code>Ctrl+Click</code> em um endereço na lista de resultados para selecioná-lo sem ir para a lista de endereços. Isso é útil quando você precisa comparar múltiplos endereços rapidamente.
      </AlertBox>
    </PageContainer>
  );
}
