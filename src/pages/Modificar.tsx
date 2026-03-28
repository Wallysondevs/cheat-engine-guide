import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Modificar() {
  return (
    <PageContainer
      title="Modificar Valores"
      subtitle="Como alterar valores na memória de forma pontual ou contínua."
      difficulty="iniciante"
      timeToRead="4 min"
    >
      <h2>Modificação Pontual</h2>
      <p>
        A forma mais simples é um duplo clique na coluna <strong>Value</strong> do endereço na lista. Uma caixa de diálogo aparece, você digita o novo valor e confirma. O jogo reflete a mudança imediatamente (se for o endereço correto).
      </p>

      <h2>Modificar Diretamente na Lista de Resultados</h2>
      <p>
        Você também pode modificar valores diretamente na lista de resultados (antes de adicionar à Address List). Selecione os endereços desejados, clique com botão direito e escolha <strong>"Change value of selected addresses"</strong>.
      </p>

      <h2>Incrementar / Decrementar</h2>
      <p>
        Ao invés de definir um valor absoluto, você pode <strong>adicionar</strong> ou <strong>subtrair</strong> uma quantidade. No diálogo de modificação, há opções para:
      </p>
      <ul>
        <li><strong>Set value to:</strong> define o valor exato</li>
        <li><strong>Add to value:</strong> adiciona ao valor atual</li>
        <li><strong>Subtract from value:</strong> subtrai do valor atual</li>
      </ul>

      <AlertBox type="tip" title="Modificar Múltiplos">
        Selecione vários endereços com Ctrl+Click e depois clique com botão direito → "Change value" para modificar todos de uma vez. Útil quando você tem múltiplos endereços candidatos e quer testar qual é o correto.
      </AlertBox>
    </PageContainer>
  );
}
