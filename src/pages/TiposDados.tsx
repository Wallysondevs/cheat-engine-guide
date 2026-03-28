import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function TiposDados() {
  return (
    <PageContainer
      title="Tipos de Dados"
      subtitle="Entenda como os dados são armazenados na memória e qual tipo usar em cada situação."
      difficulty="iniciante"
      timeToRead="8 min"
    >
      <AlertBox type="info" title="Por que isso importa?">
        Escolher o tipo de dado correto é fundamental para encontrar o valor certo. Usar o tipo errado (ex: procurar "100" como Float quando está armazenado como Integer de 4 bytes) não retornará resultado algum.
      </AlertBox>

      <h2>Tipos Inteiros</h2>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-muted text-left">
              <th className="border border-border px-3 py-2 font-semibold">Tipo</th>
              <th className="border border-border px-3 py-2 font-semibold">Bytes</th>
              <th className="border border-border px-3 py-2 font-semibold">Intervalo</th>
              <th className="border border-border px-3 py-2 font-semibold">Uso Típico</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Byte", "1", "0 a 255", "Flags, booleans simples"],
              ["2 Bytes (Word)", "2", "0 a 65.535", "Contadores pequenos"],
              ["4 Bytes (DWord)", "4", "0 a 4 bilhões", "Vida, ouro, pontos (mais comum!)"],
              ["8 Bytes (QWord)", "8", "0 a 18 quintilhões", "IDs únicos, valores grandes"],
            ].map(([tipo, bytes, range, uso], i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                <td className="border border-border px-3 py-2 font-mono text-primary">{tipo}</td>
                <td className="border border-border px-3 py-2">{bytes}</td>
                <td className="border border-border px-3 py-2 text-muted-foreground">{range}</td>
                <td className="border border-border px-3 py-2">{uso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Tipos de Ponto Flutuante</h2>
      <p>
        Muitos jogos usam ponto flutuante para valores como velocidade, posição e ângulos. A diferença entre Float e Double é a precisão:
      </p>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-muted text-left">
              <th className="border border-border px-3 py-2 font-semibold">Tipo</th>
              <th className="border border-border px-3 py-2 font-semibold">Bytes</th>
              <th className="border border-border px-3 py-2 font-semibold">Precisão</th>
              <th className="border border-border px-3 py-2 font-semibold">Exemplo</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Float", "4", "~7 dígitos decimais", "100.0, 3.14159, -0.5"],
              ["Double", "8", "~15 dígitos decimais", "valores de posição precisos"],
            ].map(([tipo, bytes, prec, ex], i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                <td className="border border-border px-3 py-2 font-mono text-primary">{tipo}</td>
                <td className="border border-border px-3 py-2">{bytes}</td>
                <td className="border border-border px-3 py-2 text-muted-foreground">{prec}</td>
                <td className="border border-border px-3 py-2 font-mono text-xs">{ex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Outros Tipos</h2>
      <ul>
        <li><strong>String:</strong> texto em ASCII ou Unicode. Útil para encontrar nomes de personagens, mensagens, etc.</li>
        <li><strong>Array of Bytes:</strong> sequência arbitrária de bytes. Usado em engenharia reversa avançada para encontrar padrões no código.</li>
      </ul>

      <h2>Como Saber Qual Tipo Usar?</h2>
      <div className="space-y-3 my-4 not-prose">
        {[
          { valor: "Vida, munição, dinheiro, pontos", tipo: "4 Bytes (mais provável)", cor: "border-green-500" },
          { valor: "Velocidade, altura, posição X/Y/Z", tipo: "Float ou Double", cor: "border-blue-500" },
          { valor: "Nome do personagem, texto", tipo: "String", cor: "border-purple-500" },
          { valor: "Flags de estado (ligado/desligado)", tipo: "Byte ou 4 Bytes", cor: "border-amber-500" },
        ].map((item, i) => (
          <div key={i} className={`border-l-4 ${item.cor} pl-4 py-1`}>
            <div className="text-sm text-muted-foreground">{item.valor}</div>
            <div className="text-sm font-semibold">→ {item.tipo}</div>
          </div>
        ))}
      </div>

      <AlertBox type="tip" title="Dica Prática">
        Quando não sabe o tipo exato, comece com <strong>4 Bytes</strong>. É o tipo mais comum em jogos modernos. Se não encontrar, tente <strong>Float</strong>. Somente depois tente os outros tipos.
      </AlertBox>
    </PageContainer>
  );
}
