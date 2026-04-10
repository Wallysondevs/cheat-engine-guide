import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function ValorDesconhecido() {
    return (
      <PageContainer
        title="Valor Desconhecido"
        subtitle="Como encontrar valores quando você não sabe o que procurar — técnicas avançadas de varredura."
        difficulty="intermediário"
        timeToRead="14 min"
      >
        <p>
          Nem sempre você sabe o valor exato que está buscando. Vida mostrada como barra sem número, criptografia de valores, ou simplesmente não saber a unidade usada pelo jogo — nesses casos, você precisa de técnicas específicas.
        </p>

        <h2>O Poder do "Unknown Initial Value"</h2>
        <p>
          A varredura <strong>Unknown Initial Value</strong> varre toda a memória sem filtro de valor — armazenando um snapshot de tudo. Nas próximas varreduras, você usa comparações relativas para filtrar.
        </p>

        <AlertBox type="info" title="Atenção: Consome mais memória e tempo">
          Uma scan de Unknown Initial Value pode levar 30-60 segundos e usar vários GB de RAM, pois armazena todo o estado da memória. Feche outros programas antes.
        </AlertBox>

        <h2>Estratégias por Tipo de Valor</h2>

        <h3>Barra de Vida sem Número</h3>
        <CodeBlock
          title="Encontrando HP de barra"
          language="text"
          code={`1. Unknown Initial Value (tipo: Float ou 4 Bytes)
  2. Tome dano → Next Scan: Decreased Value
  3. Cure-se → Next Scan: Increased Value
  4. Tome dano novamente → Next Scan: Decreased Value
  5. Repita até poucos resultados (geralmente 5-20 ciclos)`}
        />

        <h3>Valor Criptografado</h3>
        <p>
          Alguns jogos multiplicam o valor por uma chave aleatória para dificultar a busca. A vida real é 100, mas na memória está armazenada como 100 × 1337 = 133700.
        </p>
        <CodeBlock
          title="Detectando valores criptografados"
          language="text"
          code={`Sintomas de criptografia:
  - Exact Value com o valor correto não encontra nada
  - Changed/Unchanged Value encontra candidatos mas não batem com o esperado

  Solução 1: Usar Unknown Initial Value + Changed/Unchanged
  Solução 2: Menu Edit → Settings → Scan Settings → Enable "Encrypted value scan"
  Solução 3: Encontrar o código que escreve no endereço e analisar a criptografia`}
        />

        <h3>Valores em Porcentagem (0.0 a 1.0)</h3>
        <CodeBlock
          title="Buscando valores percentuais"
          language="text"
          code={`Tipo: Float
  Valor: 1.0 (100%), 0.5 (50%), 0.75 (75%)

  Se a vida está em 3/4:
  First Scan: Exact Value = 0.75 (Float)
  Tome dano até ~50%
  Next Scan: Exact Value = 0.5

  Alternativa: Value between 0.0 and 1.0 (Float)
  depois refinar com Changed/Unchanged`}
        />

        <h2>Identificando o Tipo de Dado Correto</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Tipo de Valor</th>
                <th className="p-3 text-left">Provável tipo de dado</th>
                <th className="p-3 text-left">Dica</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Vida, ouro, XP pequenos (0-65535)", "2 Bytes (Short)", "Jogos 16-bit ou valores compactos"],
                ["Vida, ouro, XP grandes", "4 Bytes (Int)", "O mais comum para RPGs e shooters"],
                ["Velocidade, porcentagem, precisão", "Float", "Valores com casas decimais"],
                ["Coordenadas X, Y, Z", "Float ou Double", "Tente float primeiro"],
                ["Texto, nomes", "String (Array of Bytes)", "Use 'Text' no tipo de scan"],
              ].map(([tipo, dado, dica], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 text-sm">{tipo}</td>
                  <td className="p-3 font-mono text-primary text-xs">{dado}</td>
                  <td className="p-3 text-muted-foreground text-xs">{dica}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Técnica de Diferencial</h2>
        <p>
          Quando nada funciona, use a técnica do diferencial: ao invés de buscar o valor, busque a <strong>diferença</strong> entre estados.
        </p>
        <CodeBlock
          title="Técnica do diferencial"
          language="text"
          code={`Você tem 80 de vida (não sabe o valor exato na memória)
  Tome exatamente 20 de dano (agora está com 60)

  Agora busque por "Decreased by 20" no próximo scan

  O CE vai encontrar todos os valores que diminuíram exatamente 20
  — muito mais preciso do que Changed/Decreased genérico`}
        />

        <AlertBox type="tip" title="Dica — Varredura em Modo Debug">
          Habilite o debugger do CE (menu Debug → Enable Debugger) e adicione um watchpoint no endereço encontrado. Quando o valor mudar, o CE pausará e mostrará exatamente qual instrução do jogo está alterando o valor — isso revela a lógica por trás do número.
        </AlertBox>
      </PageContainer>
    );
  }
  