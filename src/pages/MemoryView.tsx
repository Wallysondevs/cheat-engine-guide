import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function MemoryView() {
  return (
    <PageContainer
      title="Memory View"
      subtitle="O visualizador de memória hexadecimal do Cheat Engine — inspecione a memória raw de qualquer processo."
      difficulty="intermediário"
      timeToRead="8 min"
    >
      <AlertBox type="info" title="O que é">
        O Memory View é o editor hexadecimal integrado do Cheat Engine. Ele mostra a memória do processo em formato hexadecimal e permite navegar, inspecionar e editar bytes diretamente.
      </AlertBox>

      <h2>Abrindo o Memory View</h2>
      <ul>
        <li>Clique no ícone de olho na barra de ferramentas</li>
        <li>Ou vá em <strong>View → Memory View</strong></li>
        <li>Atalho: <code>Ctrl+M</code> na janela principal</li>
      </ul>

      <h2>Layout do Memory View</h2>
      <div className="space-y-3 my-4 not-prose">
        {[
          { area: "Painel Superior (Disassembler)", desc: "Mostra o código assembly do processo. Permite navegar pelo código desmontado, setar breakpoints e fazer análise estática." },
          { area: "Painel Inferior (Hex Editor)", desc: "Exibe a memória em formato hexadecimal e ASCII. Você pode editar bytes diretamente aqui." },
          { area: "Barra de Endereço", desc: "Campo no topo para navegar para um endereço específico. Aceita endereços hex como 0x1A2B3C4D." },
        ].map((item, i) => (
          <div key={i} className="border border-border rounded-lg p-3 bg-card">
            <div className="font-semibold text-sm mb-1">{item.area}</div>
            <div className="text-sm text-muted-foreground">{item.desc}</div>
          </div>
        ))}
      </div>

      <h2>Navegando pela Memória</h2>
      <ul>
        <li><strong>Ctrl+G:</strong> "Go to address" — ir para um endereço específico</li>
        <li><strong>Ctrl+F:</strong> buscar bytes ou strings na memória</li>
        <li><strong>Alt+← / Alt+→:</strong> voltar/avançar no histórico de navegação</li>
        <li><strong>Clique na coluna do disassembler:</strong> navegação pelo código</li>
      </ul>

      <h2>Editando Bytes Diretamente</h2>
      <ol>
        <li>Navegue até o endereço desejado no painel hex</li>
        <li>Clique no byte que deseja editar</li>
        <li>Digite o novo valor hexadecimal</li>
        <li>As mudanças são aplicadas imediatamente ao processo</li>
      </ol>

      <h2>Buscando Padrões (AOB Scan)</h2>
      <p>
        Um dos usos mais poderosos do Memory View é buscar por <strong>Array of Bytes (AOB)</strong> — sequências de bytes específicas no código do processo. Isso é usado para encontrar funções específicas no executável.
      </p>
      <ol>
        <li>No Memory View: <strong>Ctrl+F</strong></li>
        <li>Selecione <strong>"Array of Byte"</strong></li>
        <li>Digite os bytes separados por espaço: <code>89 45 FC 8B 4D F8</code></li>
        <li>Use <code>??</code> como wildcard: <code>89 45 ?? 8B 4D ??</code></li>
      </ol>

      <AlertBox type="tip" title="Dica — Array of Bytes para Cheats Estáveis">
        Ao invés de usar endereços fixos no código, use AOB para encontrar a instrução dinamicamente. Isso funciona mesmo quando o jogo atualiza (muda os endereços mas mantém as instruções).
      </AlertBox>
    </PageContainer>
  );
}
