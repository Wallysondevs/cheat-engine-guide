import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function TiposVarredura() {
    return (
      <PageContainer
        title="Tipos de Varredura"
        subtitle="Conheça todos os filtros de busca do Cheat Engine e quando usar cada um para encontrar valores rapidamente."
        difficulty="iniciante"
        timeToRead="12 min"
      >
        <p>
          O Cheat Engine oferece vários tipos de varredura além do simples "Exact Value". Conhecer cada tipo é essencial para encontrar valores difíceis — como vida que você não sabe exatamente quanto é, ou valores que mudam de formas específicas.
        </p>

        <h2>Tipos de Varredura Disponíveis</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Tipo</th>
                <th className="p-3 text-left">Descrição</th>
                <th className="p-3 text-left">Quando usar</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Exact Value", "Busca exatamente o valor digitado", "Quando você sabe o valor exato (ex: 100 de vida)"],
                ["Bigger than...", "Busca valores maiores que X", "Quando o valor é alto mas não sabe exato"],
                ["Smaller than...", "Busca valores menores que X", "Quando o valor é baixo mas não sabe exato"],
                ["Value between...", "Busca valores em um intervalo", "Quando sabe a faixa aproximada"],
                ["Increased Value", "Valores que aumentaram desde a última scan", "Quando o valor subiu (ex: XP ganho)"],
                ["Decreased Value", "Valores que diminuíram", "Quando o valor caiu (ex: vida perdida)"],
                ["Changed Value", "Qualquer valor que mudou", "Quando não sabe a direção da mudança"],
                ["Unchanged Value", "Valores que NÃO mudaram", "Para eliminar endereços que flutuam"],
                ["Unknown Initial Value", "Primeira scan sem saber o valor", "Para valores completamente desconhecidos"],
              ].map(([tipo, desc, quando], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-xs font-medium">{tipo}</td>
                  <td className="p-3 text-sm">{desc}</td>
                  <td className="p-3 text-muted-foreground text-xs">{quando}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Estratégias de Varredura por Cenário</h2>

        <h3>Cenário 1: Valor que você sabe</h3>
        <p>Use <strong>Exact Value</strong>. Digite o valor exato (ex: 100 de vida) e faça a primeira scan. Depois tome dano e faça Next Scan com o novo valor.</p>

        <h3>Cenário 2: Valor em porcentagem (barra de HP)</h3>
        <p>Muitos jogos armazenam HP como float (0.0 a 1.0 = 0% a 100%). Experimente <strong>Value between 0.0 and 1.0</strong> com tipo Float, ou <strong>Exact Value</strong> com o valor decimal correto (ex: 0.75 para 75%).</p>

        <h3>Cenário 3: Placar que só sobe</h3>
        <p>Use <strong>Unknown Initial Value</strong> → jogue um pouco → <strong>Increased Value</strong> → jogue mais → <strong>Increased Value</strong> novamente. Repita até poucos resultados.</p>

        <h3>Cenário 4: Valor criptografado</h3>
        <p>Alguns jogos multiplicam/somam uma chave ao valor. Use <strong>Unknown Initial Value</strong> e alterne entre <strong>Changed Value</strong> e <strong>Unchanged Value</strong> conforme o valor muda ou não no jogo.</p>

        <AlertBox type="tip" title="Combine tipos para refinar mais rápido">
          A técnica mais eficiente é alternar entre tipos. Por exemplo: Unknown Initial Value → tome dano → Decreased Value → cure-se → Increased Value → tome dano de novo → Decreased Value. Isso converge para o endereço correto muito mais rápido.
        </AlertBox>

        <h2>Opções Adicionais de Scan</h2>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          {[
            { opcao: "Writable", desc: "Busca apenas em regiões de memória que podem ser escritas. Recomendado ativar — exclui código executável." },
            { opcao: "Executable", desc: "Busca em memória executável (código do programa). Ative apenas para cheats de código." },
            { opcao: "Copy On Write", desc: "Inclui regiões de memória com copy-on-write. Raramente necessário para iniciantes." },
            { opcao: "Hex", desc: "Interpreta o valor digitado como hexadecimal. Útil quando você sabe o valor em hex (ex: FF para 255)." },
          ].map((item) => (
            <div key={item.opcao} className="border border-border rounded-xl p-4 bg-card">
              <h4 className="font-bold text-sm mb-1">{item.opcao}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2>Filtros de Região de Memória</h2>
        <p>
          Abaixo do tipo de scan, você pode filtrar por região de memória. Isso reduz o tempo de varredura e o número de resultados:
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Região</th>
                <th className="p-3 text-left">Descrição</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["All", "Varre toda a memória — mais lento, mais resultados"],
                ["Heap", "Apenas objetos alocados dinamicamente — onde ficam dados de jogo"],
                ["Stack", "Pilha de chamadas — valores temporários, raramente útil"],
                ["Custom", "Define um range de endereços manualmente — mais rápido quando você sabe a região"],
              ].map(([regiao, desc], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-sm">{regiao}</td>
                  <td className="p-3 text-muted-foreground text-sm">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AlertBox type="info" title="Dica de Performance">
          Restringir a varredura a regiões específicas pode reduzir o tempo de scan de 30 segundos para menos de 1 segundo. Se você já sabe que o valor fica no heap, selecione apenas essa região.
        </AlertBox>
      </PageContainer>
    );
  }
  