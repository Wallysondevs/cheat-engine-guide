import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Freeze() {
  return (
    <PageContainer
      title="Freeze de Valores"
      subtitle="Como travar valores para que não mudem — vida infinita, munição infinita e mais."
      difficulty="iniciante"
      timeToRead="5 min"
    >
      <h2>O que é Freeze?</h2>
      <p>
        O Freeze (congelar) é uma funcionalidade que força o Cheat Engine a reescrever continuamente um valor no endereço de memória, fazendo com que ele permaneça constante mesmo que o jogo tente alterá-lo. É como "travar" o valor.
      </p>

      <h2>Como Ativar o Freeze</h2>
      <ol>
        <li>Adicione o endereço à lista de endereços</li>
        <li>Marque o <strong>checkbox</strong> na coluna "Active" (primeira coluna)</li>
        <li>O endereço ficará travado no valor atual</li>
      </ol>

      <h2>Definindo o Valor Travado</h2>
      <p>
        Antes de ativar o freeze, você pode definir o valor que quer travar:
      </p>
      <ol>
        <li>Duplo clique na coluna <strong>Value</strong></li>
        <li>Digite o valor desejado (ex: 9999 para vida máxima)</li>
        <li>Confirme com Enter</li>
        <li>Agora marque o checkbox — o valor ficará travado em 9999</li>
      </ol>

      <h2>Freeze Incremental</h2>
      <p>
        Além de travar em um valor fixo, o CE oferece opções avançadas de freeze. Clique com botão direito no endereço e selecione <strong>"Set/show timer freeze interval"</strong> para controlar a frequência de reescrita.
      </p>

      <AlertBox type="warning" title="Freeze pode travar o jogo?">
        Em alguns jogos, travar certos valores pode causar bugs ou travar o jogo. Por exemplo, travar o tempo de recarga de uma habilidade em 0 pode quebrar animações. Teste com cuidado e desative o freeze se o jogo se comportar de forma estranha.
      </AlertBox>

      <AlertBox type="tip" title="Dica — Freeze Temporário">
        Em vez de manter o freeze sempre ativo, você pode usar hotkeys para ativar/desativar o freeze quando necessário. Isso evita conflitos com mecânicas do jogo.
      </AlertBox>
    </PageContainer>
  );
}
