import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function PointerScanner() {
    return (
      <PageContainer
        title="Pointer Scanner"
        subtitle="Como usar o Pointer Scanner do Cheat Engine para encontrar ponteiros estáticos automaticamente."
        difficulty="intermediário"
        timeToRead="14 min"
      >
        <p>
          O Pointer Scanner é a ferramenta do Cheat Engine que encontra automaticamente ponteiros estáticos que levam a um endereço dinâmico. Ele percorre a memória em busca de cadeias de ponteiros partindo de endereços estáticos conhecidos até chegar ao endereço alvo.
        </p>

        <h2>Quando Usar o Pointer Scanner</h2>
        <p>
          Use quando você encontrou o endereço de um valor mas ele muda a cada reinicialização do jogo (endereço dinâmico/preto). O Pointer Scanner encontra uma rota estável até ele.
        </p>

        <h2>Processo Passo a Passo</h2>
        <div className="not-prose grid grid-cols-1 gap-3 my-4">
          {[
            { n: "1", passo: "Encontre o endereço dinâmico", desc: "Use varredura normal e identifique o endereço do valor (ex: 0x1A2B3C4D)." },
            { n: "2", passo: "Inicie o Pointer Scanner", desc: "Clique com botão direito no endereço → 'Pointer scan for this address'. Ou menu Tools → Pointer scanner." },
            { n: "3", passo: "Configure e execute o scan", desc: "Deixe as configurações padrão na primeira vez. Max level 7 é bom para começar. Clique OK." },
            { n: "4", passo: "Salve o arquivo de resultados", desc: "O CE pede um nome de arquivo para salvar os resultados (.ptr). Escolha um nome descritivo." },
            { n: "5", passo: "Reinicie o jogo", desc: "Feche e abra o jogo novamente. Não use o CE ainda." },
            { n: "6", passo: "Encontre o novo endereço", desc: "Após reiniciar, faça uma nova varredura e encontre o endereço atual do mesmo valor." },
            { n: "7", passo: "Filtre com o novo endereço", desc: "No Pointer Scanner, clique em 'Rescan memory' e informe o novo endereço. Os ponteiros inválidos serão eliminados." },
            { n: "8", passo: "Repita até poucos resultados", desc: "Reinicie o jogo mais vezes e refine. Os ponteiros que sobreviverem são os estáticos válidos." },
          ].map((item) => (
            <div key={item.n} className="flex gap-3 p-3 border border-border rounded-xl bg-card">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">{item.n}</span>
              <div>
                <h4 className="font-bold text-sm mb-0.5">{item.passo}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>Configurações do Pointer Scanner</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Opção</th>
                <th className="p-3 text-left">Recomendado</th>
                <th className="p-3 text-left">Descrição</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Max level", "5-7", "Profundidade máxima da cadeia de ponteiros. Mais = mais resultados e mais lento."],
                ["Max offset", "4096 (0x1000)", "Offset máximo entre ponteiros. Valores maiores = mais resultados."],
                ["Only find paths with static address", "✅ Ativado", "Essencial — filtra apenas caminhos que começam em endereço estático."],
                ["Allow stack", "❌ Desativado", "Inclui ponteiros na pilha — geralmente inúteis."],
                ["Pointer must point to module", "Opcional", "Restringe o início ao módulo do executável — menos resultados mas mais confiáveis."],
              ].map(([opcao, rec, desc], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-xs">{opcao}</td>
                  <td className="p-3 text-green-400 text-sm font-medium">{rec}</td>
                  <td className="p-3 text-muted-foreground text-sm">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AlertBox type="tip" title="Dica — Número de Refinamentos">
          Quanto mais vezes você reiniciar o jogo e refinar o scan, mais confiável será o ponteiro. O ideal é refinar pelo menos 3-5 vezes. Um ponteiro que sobrevive a 5 reinícios é quase certamente estático.
        </AlertBox>

        <h2>Adicionando o Ponteiro Encontrado</h2>
        <CodeBlock
          title="Usando o resultado do Pointer Scanner"
          language="text"
          code={`1. Selecione um resultado confiável na lista do Pointer Scanner
  2. Clique com botão direito → "Add selected results to addresslist"
  3. O endereço será adicionado como ponteiro (aparece em roxo)
  4. Verifique: reinicie o jogo e confirme que o valor ainda aparece corretamente
  5. Se o valor estiver correto após reiniciar, o ponteiro é válido!`}
        />

        <AlertBox type="info" title="Ponteiros de Múltiplos Níveis">
          Um ponteiro pode ter vários offsets: [[baseAddr] + 0x30] + 0x4C etc. O Pointer Scanner encontra esses caminhos automaticamente. Quanto mais níveis, mais frágil o ponteiro pode ser após atualizações do jogo.
        </AlertBox>
      </PageContainer>
    );
  }
  