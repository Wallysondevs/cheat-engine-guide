import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Introducao() {
    return (
      <PageContainer
        title="Introdução ao Cheat Engine"
        subtitle="O que é o Cheat Engine, para que serve e como pensar sobre memória de jogos antes de começar."
        difficulty="iniciante"
        timeToRead="15 min"
      >
        <h2>O que é o Cheat Engine</h2>
        <p>
          O Cheat Engine é uma ferramenta de código aberto para Windows criada por Dark Byte, desenvolvida continuamente desde 2001. Na superfície, parece ser simplesmente um programa para criar cheats em jogos — vida infinita, munição infinita, dinheiro ilimitado. E de fato, esse é o uso mais popular. Mas a profundidade do CE vai muito além: é uma suíte completa de engenharia reversa que inclui um scanner de memória, um editor hexadecimal, um disassembler, um debugger, um executor de scripts Lua, um compilador de Assembly, e muito mais.
        </p>
        <p>
          Para programadores e pesquisadores de segurança, o CE é uma ferramenta de análise de processo e engenharia reversa comparável a ferramentas profissionais como OllyDbg, x64dbg, e WinDbg — mas com uma interface muito mais acessível e focada em casos de uso práticos. Para jogadores casuais, é a forma mais fácil de experimentar seus jogos favoritos de formas que os desenvolvedores não pretendiam.
        </p>
        <p>
          O CE é <strong>gratuito e de código aberto</strong>. O código fonte está disponível no GitHub. Você pode baixar em cheatengine.org. Não há versão "premium" ou pagamento necessário para nenhuma funcionalidade — ao contrário de muitas ferramentas similares que cobram por recursos avançados.
        </p>

        <h2>Como os Jogos Armazenam Dados</h2>
        <p>
          Para entender o que o Cheat Engine faz, é preciso entender como jogos de computador guardam suas informações. Quando um jogo está rodando, todos os seus dados — a vida do personagem, o dinheiro, a posição no mapa, os itens no inventário, a configuração dos inimigos — estão armazenados na memória RAM do computador. A RAM é simplesmente uma grande sequência de bytes (números de 0 a 255), cada um numa posição específica chamada "endereço de memória".
        </p>
        <p>
          Quando a barra de HP do seu personagem diminui porque você tomou dano, o que acontece internamente é: o código do jogo calcula o novo valor de HP (HP atual menos o dano recebido), e então escreve esse novo número num endereço de memória específico. Quando o jogo precisa exibir a barra de HP na tela, ele lê esse endereço e usa o valor para determinar qual porcentagem da barra deve estar preenchida.
        </p>
        <p>
          O Cheat Engine aproveita esse funcionamento: ele pode ler e escrever na memória de qualquer processo rodando no Windows (com as permissões corretas). Se você encontrar o endereço de memória onde o HP está guardado e escrever o número 9999 lá, o jogo vai "achar" que o HP é 9999 — porque é isso que está na memória. A barra vai mostrar máximo, os cálculos de morte vão detectar que você tem vida abundante, e o jogo funciona como se você tivesse mesmo 9999 de HP.
        </p>

        <h2>Por que Encontrar Endereços é Necessário</h2>
        <p>
          Se fosse tão simples, por que não basta escrever num endereço fixo? O problema é que os endereços de memória mudam a cada vez que o jogo é iniciado. A memória RAM é gerenciada pelo sistema operacional, que aloca espaço para os processos conforme necessário. Quando o jogo inicializa e precisa criar um objeto "personagem" com todos os seus atributos, o SO escolhe um bloco de memória disponível — e esse bloco vai ser diferente toda sessão.
        </p>
        <p>
          Ontem, o HP do personagem estava no endereço 0x0F45A3C4. Hoje, está em 0x1C2B7890. Amanhã, estará em outro lugar. Por isso o CE tem o sistema de varredura — você busca pelo valor atual do HP (ex: 100) em toda a memória, o jogo muda (ex: você toma dano e HP vai para 85), você busca novamente pelo novo valor. Endereços que têm os dois valores certos são candidatos ao HP. Repita algumas vezes e você chega ao endereço correto para essa sessão.
        </p>

        <h2>Usos Legítimos do Cheat Engine</h2>
        <p>
          O Cheat Engine tem uma variedade de usos completamente legítimos que vão além de simplesmente "trapacear" em jogos:
        </p>
        <p>
          <strong>Acessibilidade:</strong> Jogadores com limitações físicas que não conseguem superar certas partes difíceis podem usar o CE para tornar o jogo viável. Vida infinita numa luta de boss particularmente difícil, ou velocidade reduzida para ter mais tempo de reação, podem tornar um jogo acessível para alguém que de outra forma não conseguiria jogar.
        </p>
        <p>
          <strong>Exploração de conteúdo:</strong> Muitos jogadores querem ver toda a história e conteúdo de um jogo sem gastar centenas de horas em grinding. Usar o CE para pular partes repetitivas e focar na narrativa é uma escolha pessoal completamente válida num jogo single-player.
        </p>
        <p>
          <strong>Modding e desenvolvimento:</strong> Modders usam o CE extensivamente para entender as estruturas de dados dos jogos que estão modificando. Game developers usam para testar: pular para qualquer ponto do jogo, setar recursos para valores específicos, testar edge cases rapidamente.
        </p>
        <p>
          <strong>Aprendizado de engenharia reversa:</strong> O CE é frequentemente recomendado como ponto de entrada para quem quer aprender engenharia reversa de software, segurança de sistemas, e programação de baixo nível. Os conceitos de memória, ponteiros, Assembly e debugging aprendidos com o CE se aplicam diretamente a carreiras em segurança de software.
        </p>

        <h2>O que o CE não faz</h2>
        <p>
          É igualmente importante entender as limitações e o escopo do CE. Ele <strong>não funciona em jogos online com anti-cheat</strong> — sistemas como Easy Anti-Cheat, BattlEye, e Riot Vanguard detectam o CE e proibem sua execução ou baneiam contas que o utilizam. Usar cheats em jogos online prejudica outros jogadores e viola os termos de serviço — resulta em ban permanente.
        </p>
        <p>
          O CE também <strong>não modifica arquivos de jogo</strong> — ele opera exclusivamente na memória RAM durante a execução do processo. Fechar o jogo desfaz qualquer modificação (a menos que o jogo tenha salvado os valores modificados, o que alguns fazem). Para modificações permanentes de arquivos, outras ferramentas como editores de savestate são mais apropriadas.
        </p>
        <p>
          Finalmente, o CE <strong>não é um vírus nem spyware</strong> — é software legítimo de código aberto com um histórico de duas décadas. Alguns antivírus o detectam como "ferramenta potencialmente indesejada" (PUP) porque pode ser usada para fins maliciosos, mas o próprio programa não tem comportamento malicioso. Você pode (e deve) baixar apenas do site oficial: cheatengine.org.
        </p>

        <AlertBox type="info" title="Single-player = sem regras, multiplayer = sem cheats">
          A regra de ouro é simples. Em jogos single-player, você está jogando em seu próprio mundo e pode brincar como quiser — o CE é uma ferramenta válida. Em jogos multiplayer, usar cheats prejudica outros jogadores reais e viola acordos legais. O foco deste guia é inteiramente em single-player e uso educacional.
        </AlertBox>
      </PageContainer>
    );
  }
  