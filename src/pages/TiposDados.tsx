import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function TiposDados() {
    return (
      <PageContainer
        title="Tipos de Dados"
        subtitle="Entenda os diferentes tipos de dados na memória e qual usar ao procurar valores no Cheat Engine."
        difficulty="iniciante"
        timeToRead="12 min"
      >
        <p>
          Escolher o tipo de dado correto é um dos fatores mais importantes para encontrar valores no Cheat Engine. Se você busca vida com tipo errado, nunca vai achar — mesmo que o valor esteja lá.
        </p>

        <h2>Tipos Inteiros</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Tipo</th>
                <th className="p-3 text-left">Bytes</th>
                <th className="p-3 text-left">Intervalo</th>
                <th className="p-3 text-left">Uso Típico</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Byte", "1", "0 a 255", "Flags, booleans, pequenos contadores"],
                ["2 Bytes (Short)", "2", "0 a 65.535", "Stat de personagem em jogos antigos, HP compacto"],
                ["4 Bytes (Int)", "4", "0 a 4.294.967.295", "O mais comum — HP, XP, Ouro, inventário"],
                ["8 Bytes (Long)", "8", "Muito grande", "Grandes quantidades de recursos, timestamps"],
              ].map(([tipo, bytes, intervalo, uso], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-sm font-bold">{tipo}</td>
                  <td className="p-3 text-center text-sm">{bytes}</td>
                  <td className="p-3 font-mono text-xs text-muted-foreground">{intervalo}</td>
                  <td className="p-3 text-sm">{uso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Tipos de Ponto Flutuante</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Tipo</th>
                <th className="p-3 text-left">Bytes</th>
                <th className="p-3 text-left">Precisão</th>
                <th className="p-3 text-left">Uso Típico</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Float", "4", "~7 dígitos", "Velocidade, posição XYZ, multiplicadores, porcentagens (0.0 – 1.0)"],
                ["Double", "8", "~15 dígitos", "Posição precisa, física avançada, valores que precisam de alta precisão"],
              ].map(([tipo, bytes, precisao, uso], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-sm font-bold">{tipo}</td>
                  <td className="p-3 text-center text-sm">{bytes}</td>
                  <td className="p-3 text-sm">{precisao}</td>
                  <td className="p-3 text-muted-foreground text-sm">{uso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Tipos Especiais</h2>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          {[
            { tipo: "String (Text)", desc: "Texto ASCII ou Unicode. Use para encontrar nomes de jogadores, mensagens, identificadores de itens. Escreva o texto exatamente como aparece no jogo.", ex: "Ex: 'Sword of Fire', 'PlayerName'" },
            { tipo: "Array of Bytes (AOB)", desc: "Sequência de bytes em hexadecimal. Extremamente útil para encontrar padrões de código Assembly ou dados binários específicos.", ex: "Ex: FF A3 00 4E ?? 00 (? = qualquer byte)" },
            { tipo: "All", desc: "O CE busca o valor em todos os tipos ao mesmo tempo. Lento mas útil quando você não sabe o tipo.", ex: "Use como último recurso." },
            { tipo: "Custom", desc: "Tipo personalizado definido por você — estruturas complexas, tipos customizados do jogo.", ex: "Para projetos avançados de RE." },
          ].map((item) => (
            <div key={item.tipo} className="border border-border rounded-xl p-4 bg-card">
              <h4 className="font-bold text-sm mb-1 text-primary">{item.tipo}</h4>
              <p className="text-xs text-muted-foreground mb-2">{item.desc}</p>
              <code className="text-xs text-muted-foreground italic">{item.ex}</code>
            </div>
          ))}
        </div>

        <h2>Como Identificar o Tipo Correto</h2>
        <CodeBlock
          title="Guia de decisão para tipo de dado"
          language="text"
          code={`Valor que você vê no jogo          → Tipo provável no CE
  ─────────────────────────────────────────────────────
  100, 250, 9999 (número inteiro)    → 4 Bytes (mais comum) ou 2 Bytes
  1.5, 99.99, 0.75 (decimal)         → Float (mais comum) ou Double
  XYZ de posição/velocidade          → Float
  Porcentagem de HP (barra)          → Float (0.0 a 1.0)
  Nome do personagem, item           → String / Array of Bytes
  Flag on/off (ligado/desligado)     → Byte (0 = off, 1 = on)
  Timestamp, ID único                → 4 Bytes ou 8 Bytes`}
        />

        <AlertBox type="tip" title="Tente todos os tipos se tiver dúvida">
          Se não encontrar nada com 4 Bytes, tente Float. Se Float não funcionar, tente 2 Bytes. Use o tipo "All" como último recurso — ele é mais lento mas não deixa passar nada.
        </AlertBox>

        <AlertBox type="info" title="Dica: Tipo All em Jogos Antigos">
          Jogos DOS/Win95 frequentemente usam 2 Bytes para vida e ouro (limite de 65535). Jogos modernos quase sempre usam 4 Bytes ou Float. Jogos de celular portados podem usar Double.
        </AlertBox>
      </PageContainer>
    );
  }
  