import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Tabelas() {
    return (
      <PageContainer
        title="Tabelas do Cheat Engine"
        subtitle="Salve, carregue e compartilhe seus cheats usando arquivos de tabela (.CT)."
        difficulty="iniciante"
        timeToRead="10 min"
      >
        <p>
          Tabelas (.CT — Cheat Table) são arquivos que salvam todo o seu trabalho no Cheat Engine: endereços, scripts, hotkeys e configurações. São o equivalente a um "projeto salvo" — você pode compartilhá-las com outros ou carregar tabelas prontas feitas pela comunidade.
        </p>

        <h2>Salvando uma Tabela</h2>
        <p>Para salvar seu trabalho atual:</p>
        <div className="not-prose grid grid-cols-1 gap-3 my-4">
          {[
            { n: "1", passo: "File → Save Table As...", desc: "Abre o diálogo de salvar. Escolha um nome descritivo como 'MinecraftCreative.CT'" },
            { n: "2", passo: "Ou Ctrl+S", desc: "Salva na localização atual. Use na primeira vez para definir onde salvar." },
            { n: "3", passo: "Definir senha (opcional)", desc: "Você pode proteger a tabela com senha para scripts confidenciais." },
          ].map((item) => (
            <div key={item.n} className="flex gap-4 p-4 border border-border rounded-xl bg-card">
              <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">{item.n}</span>
              <div>
                <h4 className="font-bold text-sm mb-1">{item.passo}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>Carregando Tabelas</h2>
        <p>Para carregar uma tabela salva ou baixada:</p>
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
                ["Arrastar e soltar", "Arraste o arquivo .CT diretamente para a janela do Cheat Engine"],
                ["Menu File", "File → Load Table (Ctrl+L) → selecione o arquivo .CT"],
                ["Duplo clique", "Duplo clique no arquivo .CT no Windows Explorer (associação automática)"],
                ["Linha de comando", "Cheat Engine.exe NomeDoJogo.CT (abre o CE com a tabela já carregada)"],
              ].map(([metodo, como], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-medium text-sm">{metodo}</td>
                  <td className="p-3 text-muted-foreground text-sm">{como}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Estrutura de uma Tabela .CT</h2>
        <p>
          Uma tabela CT é na verdade um arquivo XML internamente. Contém:
        </p>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          {[
            { item: "Address List", desc: "Todos os endereços adicionados, com nome, tipo e valor. Podem ter scripts embutidos." },
            { item: "Lua Scripts", desc: "Scripts Lua que executam ao abrir a tabela, ao ativar cheats, ou manualmente." },
            { item: "Hotkeys Globais", desc: "Teclas de atalho definidas na tabela — funcionam enquanto o jogo está aberto." },
            { item: "Estruturas/Types", desc: "Definições de estruturas de memória (structs) mapeadas pelo usuário." },
          ].map((i) => (
            <div key={i.item} className="border border-border rounded-xl p-4 bg-card">
              <h4 className="font-bold text-sm mb-1 text-primary">{i.item}</h4>
              <p className="text-xs text-muted-foreground">{i.desc}</p>
            </div>
          ))}
        </div>

        <h2>Tabelas da Comunidade</h2>
        <p>
          Sites como <strong>FearLess Cheat Engine</strong> (fearlessrevolution.com) e o <strong>subreddit r/cheatengine</strong> hospedam milhares de tabelas prontas para jogos populares. Você pode baixar e usar diretamente.
        </p>

        <AlertBox type="warning" title="Cuidado com Tabelas de Fontes Desconhecidas">
          Tabelas .CT podem conter scripts Lua que executam código no seu PC. Baixe apenas de sites de confiança (FearLess, GCW) e inspecione os scripts antes de ativar. Scripts maliciosos são raros mas existem.
        </AlertBox>

        <AlertBox type="tip" title="Organize seus Endereços em Grupos">
          Na Address List, clique com botão direito → Add Group para criar seções. Por exemplo: "Recursos", "Stats", "Posição". Isso torna a tabela muito mais fácil de usar — especialmente quando compartilhada.
        </AlertBox>
      </PageContainer>
    );
  }
  