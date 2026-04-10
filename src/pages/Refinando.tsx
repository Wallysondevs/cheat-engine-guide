import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Refinando() {
    return (
      <PageContainer
        title="Refinando Resultados"
        subtitle="Técnicas para reduzir rapidamente centenas de resultados até encontrar o endereço exato."
        difficulty="iniciante"
        timeToRead="12 min"
      >
        <AlertBox type="info" title="O Objetivo">
          Após a primeira varredura você pode ter milhões de resultados. O refinamento progressivo filtra esses resultados até sobrar apenas o endereço correto.
        </AlertBox>

        <h2>Técnicas de Refinamento</h2>

        <h3>1. Varreduras Repetidas com Novo Valor</h3>
        <p>
          A técnica mais básica: mude o valor no jogo, anote o novo valor, faça Next Scan. Repita até poucos resultados. Funciona para a maioria dos valores simples.
        </p>
        <CodeBlock
          title="Fluxo de refinamento por valor exato"
          language="text"
          code={`Vida: 100 → First Scan: Exact Value 100
  Tome dano (-20) → Vida: 80 → Next Scan: Exact Value 80
  Tome dano (-15) → Vida: 65 → Next Scan: Exact Value 65
  Cure (+35) → Vida: 100 → Next Scan: Exact Value 100
  [Devem restar 1-3 endereços]`}
        />

        <h3>2. Filtrar por Intervalo de Memória</h3>
        <p>
          No painel de scan, você pode definir um intervalo de endereços para buscar (Start e Stop address). Valores de jogo geralmente ficam em regiões específicas da memória — experimentar intervalos menores acelera a busca.
        </p>

        <h3>3. Usar "Unchanged Value" Estrategicamente</h3>
        <p>
          Quando o valor que você busca não muda por um período, use Next Scan com "Unchanged Value" para eliminar endereços que flutuaram por outras razões.
        </p>
        <CodeBlock
          title="Alternando Changed e Unchanged"
          language="text"
          code={`Tome dano → Next Scan: Decreased Value (muitos resultados)
  Fique parado (não mude a vida) → Next Scan: Unchanged Value
  Tome dano → Next Scan: Decreased Value
  [Converge muito mais rápido do que só Decreased]`}
        />

        <h3>4. Ordenar por Endereço</h3>
        <p>
          Na lista de resultados, clique na coluna "Address" para ordenar. Endereços estáticos (que não mudam entre sessões) geralmente ficam em regiões mais altas da memória. Endereços de pilha e heap ficam em regiões mais baixas.
        </p>

        <h3>5. Verificar em Tempo Real</h3>
        <p>
          Quando restar menos de ~20 endereços, selecione todos (Ctrl+A) e adicione à lista de endereços. Observe quais valores mudam em sincronia com o que você está monitorando no jogo.
        </p>

        <h2>Filtros Avançados</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Técnica</th>
                <th className="p-3 text-left">Como usar</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Decreased by exact value", "Se você tomou exatamente 20 de dano, busque 'Decreased value by 20' — muito mais preciso que só 'Decreased'"],
                ["Value between X and Y", "Quando sabe a faixa (ex: vida entre 50 e 80 após combate)"],
                ["Filtrar por tipo de memória", "Marque apenas 'Writable' e desmarque 'Executable' — evita resultados em código do programa"],
                ["Filtrar por região", "Use 'Start/Stop address' para limitar a busca a regiões específicas do executável"],
              ].map(([tecnica, como], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-medium text-sm">{tecnica}</td>
                  <td className="p-3 text-muted-foreground text-sm">{como}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AlertBox type="warning" title="Cuidado com Ponteiros Temporários">
          Alguns endereços encontrados são temporários — mudam a cada reinicialização do jogo ou fase. Se o cheat parou de funcionar após reiniciar, você precisa aprender sobre <strong>ponteiros estáticos</strong> (próximo tópico).
        </AlertBox>

        <h2>Cenário: Muitos Resultados Persistem</h2>
        <p>Se após 5+ varreduras ainda restar centenas de resultados, tente:</p>
        <ul>
          <li>Mudar o tipo de dados (tente Float se estava usando 4 Bytes)</li>
          <li>Usar "Value between X and Y" com um intervalo mais estreito</li>
          <li>Fechar outros programas para reduzir o "ruído" de memória</li>
          <li>Verificar se o jogo usa valores criptografados</li>
          <li>Usar "Decreased by exact amount" em vez de "Decreased"</li>
        </ul>

        <AlertBox type="tip" title="Dica de Eficiência">
          Não se preocupe em ter muitos resultados nas primeiras 2-3 varreduras. O processo normal leva de 5 a 10 rodadas de refinamento para jogos típicos. Seja paciente e metódico.
        </AlertBox>
      </PageContainer>
    );
  }
  