import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Tutorial() {
  return (
    <PageContainer
      title="Tutorial Oficial — Passo a Passo"
      subtitle="Guia completo para todos os 9 passos do tutorial integrado do Cheat Engine."
      difficulty="iniciante"
      timeToRead="15 min"
    >
      <AlertBox type="info" title="Tutorial do CE">
        O Cheat Engine tem um tutorial integrado acessível em <strong>Help → Cheat Engine Tutorial</strong>. Este guia explica cada passo em detalhe, complementando o tutorial em Português.
      </AlertBox>

      <h2>Como Abrir o Tutorial</h2>
      <ol>
        <li>Abra o Cheat Engine</li>
        <li>Vá em <strong>Help → Cheat Engine Tutorial</strong></li>
        <li>Um pequeno programa de tutorial será aberto</li>
        <li>Conecte o CE ao processo "Tutorial-x86_64.exe"</li>
      </ol>

      <h2>Passo 1 — Introdução</h2>
      <p>
        O tutorial começa com uma caixa de texto com um número aleatório. Sua tarefa é encontrar e modificar esse número. Clique em "Click me" para incrementar o valor aleatório e veja que ele muda.
      </p>
      <p><strong>Solução:</strong> Clique em "Click me", anote o valor, faça First Scan (Exact Value, 4 Bytes), clique novamente para mudar, anote o novo valor, faça Next Scan. Repita até restar 1 endereço. Modifique para 5000 e clique em "Click me" para avançar.</p>

      <h2>Passo 2 — Valor Desconhecido</h2>
      <p>
        Há uma barra de saúde, mas o valor exato está oculto. Você precisa usar Unknown Initial Value.
      </p>
      <p><strong>Solução:</strong> First Scan (Unknown Initial Value), clique em "Hit me" para perder saúde, Next Scan (Decreased Value), repita até restar poucos resultados, identifique e modifique o endereço correto para 5000.</p>

      <h2>Passo 3 — Freeze</h2>
      <p>
        O valor agora diminui automaticamente. Você precisa travá-lo.
      </p>
      <p><strong>Solução:</strong> Encontre o endereço como nos passos anteriores, adicione-o à Address List, defina o valor para 5000 e ative o Freeze (marque o checkbox). O valor ficará travado.</p>

      <h2>Passo 4 — Ponteiros</h2>
      <p>
        O endereço muda a cada clique em "Restart Game". Você precisa encontrar um ponteiro permanente.
      </p>
      <p><strong>Solução:</strong> Encontre o endereço, clique com botão direito → "Find what writes", tome dano para acionar a escrita, veja a instrução, note o registrador (ex: ESI), encontre o ponteiro para ESI, adicione à Address List como ponteiro com o offset correto.</p>

      <h2>Passo 5 — Code Injection</h2>
      <p>
        Você precisa usar Code Injection para fazer a saúde aumentar em vez de diminuir.
      </p>
      <p><strong>Solução:</strong> Encontre a instrução que subtrai saúde via "What writes", abra no disassembler, use Template → Code Injection para criar uma cave que inverta a operação (sub → add).</p>

      <h2>Passo 6 — Ponteiro Multinível</h2>
      <p>
        Cadeia de ponteiros de múltiplos níveis. Use o Pointer Scanner para encontrar o caminho completo.
      </p>
      <p><strong>Solução:</strong> Encontre o endereço do valor, abra o Pointer Scanner, configure max level = 4, escaneie, reinicie o jogo para validar quais ponteiros funcionam nas duas sessões.</p>

      <h2>Passo 7 — Shared Code</h2>
      <p>
        O código que modifica a saúde é compartilhado entre o jogador e os inimigos. Você precisa modificar apenas o do jogador.
      </p>
      <p><strong>Solução:</strong> Encontre a instrução compartilhada, na cave adicione uma condição que verifica se o ponteiro atual é o do jogador (compare ESI com o endereço base do jogador). Se for, ignore o dano.</p>

      <h2>Passo 8 — Multilevel Pointer Avançado</h2>
      <p>
        Ponteiro de nível ainda mais profundo com estruturas aninhadas.
      </p>
      <p><strong>Solução:</strong> Similar ao Passo 6, mas com mais offsets. Use o Pointer Scanner com level = 5-6 e compare entre sessões.</p>

      <h2>Passo 9 — Registro Personalizado</h2>
      <p>
        O tutorial final! Você recebe um código ao completar todos os passos.
      </p>
      <p><strong>Solução:</strong> Conclua todos os passos anteriores. O código aparecerá no campo de texto. Anote-o como registro do seu progresso!</p>

      <AlertBox type="success" title="Parabéns!">
        Ao completar todos os 9 passos do tutorial, você dominou os fundamentos do Cheat Engine. Agora você está pronto para aplicar esses conhecimentos em qualquer jogo single-player!
      </AlertBox>
    </PageContainer>
  );
}
