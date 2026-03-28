import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function PrimeiraVarredura() {
  return (
    <PageContainer
      title="Primeira Varredura"
      subtitle="Aprenda o fluxo básico para encontrar valores na memória de um jogo."
      difficulty="iniciante"
      timeToRead="10 min"
    >
      <AlertBox type="info" title="O Processo Básico">
        A lógica de varredura é simples: você sabe o valor atual (ex: 100 de vida), faz uma busca, o jogo muda o valor (leva dano), você faz uma nova busca pelo novo valor, e repete até sobrar poucos endereços.
      </AlertBox>

      <h2>Fluxo Passo a Passo</h2>

      <h3>Passo 1: Abrir o Processo</h3>
      <ol>
        <li>Abra o jogo que deseja modificar</li>
        <li>No Cheat Engine, clique no ícone de computador (canto superior esquerdo)</li>
        <li>Selecione o processo do jogo na lista</li>
        <li>Clique em <strong>"Open"</strong></li>
      </ol>

      <h3>Passo 2: Configurar o Scan</h3>
      <ol>
        <li>No campo <strong>Value Type</strong>, selecione <strong>"4 Bytes"</strong> (começa por aqui)</li>
        <li>No campo <strong>Scan Type</strong>, selecione <strong>"Exact Value"</strong></li>
        <li>No campo <strong>Value</strong>, digite o valor atual que quer procurar (ex: <code>100</code> para 100 de vida)</li>
      </ol>

      <h3>Passo 3: Primeira Varredura</h3>
      <ol>
        <li>Clique em <strong>"First Scan"</strong></li>
        <li>Aguarde — o CE vai varrer toda a memória do processo</li>
        <li>Na lista de resultados, provavelmente aparecerão centenas ou milhares de endereços com o valor 100</li>
      </ol>

      <AlertBox type="warning" title="Muitos Resultados?">
        É completamente normal ter milhares de resultados na primeira varredura. O objetivo das próximas varreduras é filtrar progressivamente até encontrar o endereço correto.
      </AlertBox>

      <h3>Passo 4: Mudar o Valor no Jogo</h3>
      <p>
        Volte ao jogo e faça algo para mudar o valor que você está buscando:
      </p>
      <ul>
        <li>Se é vida: tome dano para diminuir</li>
        <li>Se é munição: atire algumas vezes</li>
        <li>Se é dinheiro: compre algum item</li>
      </ul>
      <p>
        Observe o novo valor. Se tinha 100 de vida e tomou 20 de dano, agora tem 80.
      </p>

      <h3>Passo 5: Next Scan</h3>
      <ol>
        <li>Volte ao Cheat Engine</li>
        <li>No campo Value, digite o <strong>novo valor</strong> (ex: <code>80</code>)</li>
        <li>Clique em <strong>"Next Scan"</strong></li>
        <li>O CE filtra os resultados, mostrando apenas os endereços que mudaram para 80</li>
      </ol>

      <h3>Passo 6: Repita até Encontrar</h3>
      <p>
        Repita os passos 4 e 5 (mudar valor no jogo → Next Scan) até restar poucos endereços (idealmente 1 a 5).
      </p>

      <h3>Passo 7: Identificar o Endereço Correto</h3>
      <ol>
        <li>Com poucos endereços na lista, clique duplo em cada um para adicioná-lo à lista de endereços</li>
        <li>Tente modificar o valor (clique duplo na coluna Value)</li>
        <li>O endereço correto mudará o valor no jogo imediatamente</li>
      </ol>

      <AlertBox type="success" title="Endereço Encontrado!">
        Quando você modifica um endereço e o jogo reflete a mudança instantaneamente, você encontrou o endereço correto. Agora você pode dar um nome a ele, ativar Freeze e salvar na tabela.
      </AlertBox>

      <h2>Dicas para Varreduras Rápidas</h2>
      <ul>
        <li>Quanto mais o valor mudar entre varreduras, menos falsos positivos</li>
        <li>Valores muito comuns (como 1, 0, 100) geram mais resultados inicialmente</li>
        <li>Se tiver muitos resultados após várias varreduras, tente <strong>"Changed Value"</strong> ou <strong>"Decreased Value"</strong></li>
      </ul>
    </PageContainer>
  );
}
