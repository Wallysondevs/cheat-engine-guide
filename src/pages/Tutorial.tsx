import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Tutorial() {
    return (
      <PageContainer
        title="Tutorial Prático do CE"
        subtitle="Passo a passo completo usando o tutorial integrado do Cheat Engine — do zero ao primeiro cheat funcional."
        difficulty="iniciante"
        timeToRead="20 min"
      >
        <h2>O Tutorial Integrado do CE</h2>
        <p>
          O Cheat Engine vem com um tutorial interativo muito bem feito — um programa separado (CE Tutorial) que você usa para praticar todas as técnicas básicas em um ambiente controlado antes de tentar em jogos reais. O tutorial simula um jogo simplificado e te guia por cada conceito passo a passo.
        </p>
        <p>
          Para abrir: no CE, vá em Help → Cheat Engine Tutorial, ou encontre "Tutorial" na pasta de instalação do CE. Uma janela pequena abre com o texto "Tutorial" e começa no Passo 1. Você deve anexar o CE ao processo do tutorial (aparecer na lista de processos como "Tutorial" ou "CEtutorial") e então resolver cada desafio.
        </p>
        <p>
          Recomendo fortemente completar o tutorial antes de tentar qualquer jogo real. Cada passo ensina uma habilidade fundamental, e o ambiente controlado do tutorial permite entender o que está acontecendo sem a complexidade e as incertezas de um jogo real.
        </p>

        <h2>Passo 1 — Encontrar um Valor Exact Value</h2>
        <p>
          O primeiro desafio: há um número visível na janela do tutorial ("Health: 100"). Sua tarefa é encontrar onde 100 está armazenado na memória e modificar para 1000 para completar o passo.
        </p>
        <p>
          Processo: certifique-se de que o CE está anexado ao processo do tutorial (o nome do processo aparece no canto superior direito do CE). No CE, selecione tipo de scan "Exact Value" e tipo de dado "4 Bytes". Digite "100" no campo de valor. Clique "First Scan". Uma lista de resultados aparece — centenas de endereços que têm o valor 100.
        </p>
        <p>
          Agora clique em "Hit me" na janela do tutorial para reduzir o health. Note o novo valor (ex: 90). No CE, digite "90" no campo de valor e clique "Next Scan". A lista de resultados deve diminuir drasticamente — apenas endereços que tinham 100 antes e agora têm 90 passam pelo filtro. Continue clicando "Hit me" e fazendo Next Scans até sobrar poucos resultados (1-5 idealmente).
        </p>
        <p>
          Selecione o endereço correto (geralmente o único ou o que claramente segue os valores do tutorial), adicione à Address List, defina o valor para 1000, e clique "Next" no tutorial. Parabéns — você completou o passo 1.
        </p>

        <h2>Passo 2 — Modificar um Valor Desconhecido</h2>
        <p>
          O segundo desafio é mais difícil: não há número visível. Há uma barra de saúde gráfica sem indicação numérica. Você precisa encontrar o valor sem saber o número.
        </p>
        <p>
          Processo: mude o tipo de scan para "Unknown Initial Value" (sem colocar nada no campo de valor). Clique "First Scan" — o CE fotografa toda a memória. Isso pode levar um momento. Depois, clique "Hit me" uma vez (a barra diminui). No CE, mude o tipo de scan para "Decreased Value" e clique "Next Scan". O número de resultados cai muito.
        </p>
        <p>
          Repita: clique "Hit me" → "Decreased Value" scan. Clique "Hit me" novamente → "Decreased Value" scan. Se você clicar "Heal" (se disponível) → "Increased Value" scan. Alterne entre decreased e increased até sobrar poucos resultados. Adicione o candidato à Address List, defina o valor para o máximo (geralmente 1000 ou um número alto), e confirme se a barra de saúde fica cheia.
        </p>

        <h2>Passo 3 — Float Values</h2>
        <p>
          O passo 3 introduz floats. O health agora é um número decimal como 97.2 ou 85.5. Se você buscar "97" com tipo Integer, não vai encontrar — porque 97.2 não é 97 como inteiro, e 85.5 não é 85.
        </p>
        <p>
          A solução: mude o tipo de dado de "4 Bytes" para "Float". Agora faça a mesma varredura de Exact Value — mas com o número decimal exato. Se o tutorial mostra "97.2", busque "97.2". Se mostra "85.5", busque "85.5". Prossiga com Next Scans normalmente após cada "Hit me". Você vai encontrar o endereço e pode definir para um valor alto como 5000 para completar o passo.
        </p>

        <h2>Passo 4 — Código Assembly e Bytes Proibidos</h2>
        <p>
          Passos posteriores introduzem conceitos mais avançados. O passo 4 tipicamente envolve encontrar o código que escreve no endereço e modificá-lo diretamente — a técnica de "Find out what writes to this address".
        </p>
        <p>
          Depois de encontrar o endereço (pelos passos anteriores), você usa "Find out what writes" para descobrir qual instrução Assembly atualiza o valor. O tutorial então pede para você modificar essa instrução — transformar "MOV [endereço], EAX" em instruções NOP para que o código de dano não execute mais, efetivamente criando um cheat de vida infinita sem freeze de memória.
        </p>
        <CodeBlock
          title="Processo de NOP para criar vida infinita"
          language="text"
          code={`1. Encontre o endereço do health por varredura
  2. Clique direito → "Find out what writes to this address"
  3. Cause dano no tutorial (clique "Hit me")
  4. Uma instrução aparece na lista, ex: "MOV [EBX+4C], EAX"
  5. Selecione essa instrução → clique "Show disassembler"
  6. No disassembler, selecione a instrução
  7. Clique direito → "Replace with code that does nothing (NOP)"
  8. Confirme — o CE substituirá a instrução por NOPs
  9. Agora clique "Hit me" no tutorial — o health não diminui!
     O código de dano existe mas não consegue mais escrever o novo valor.`}
        />

        <h2>Passos Avançados — Ponteiros e Scripts</h2>
        <p>
          Os passos finais do tutorial introduzem ponteiros multi-nível. O tutorial explicitamente muda o endereço do health entre tentativas (simulando o comportamento de jogos reais). Você é ensinado a usar o Pointer Scanner para encontrar um caminho estático até o endereço, e a adicionar esse ponteiro à Address List para que funcione mesmo depois que o endereço muda.
        </p>
        <p>
          O último passo geralmente envolve escrever um script Lua simples — por exemplo, um script que monitora o health e cura automaticamente quando cai abaixo de um limite. Isso introduz a API Lua do CE e demonstra que a ferramenta vai muito além de simples freezes de valor.
        </p>

        <h2>Praticando Além do Tutorial</h2>
        <p>
          Depois de completar o tutorial, o melhor próximo passo é escolher um jogo single-player simples e tentar encontrar um valor básico (vida, ouro). Jogos antigos e simples são mais fáceis de começar — menos proteção de memória, valores geralmente inteiros simples, menos ruído de resultados.
        </p>
        <p>
          Jogos recomendados para iniciantes: qualquer RPG simples da era 2000-2010 (Dungeon Siege, Diablo 2, Baldur's Gate), jogos de estratégia com recursos visíveis (Age of Empires, Civilization, SimCity), ou jogos de ação simples em 2D. Evite jogos com anti-cheat, jogos online, e jogos com obfuscação pesada de memória para os primeiros exercícios.
        </p>

        <AlertBox type="tip" title="Conclua cada passo do tutorial antes de avançar">
          O tutorial é progressivo — cada passo adiciona uma camada de complexidade sobre o anterior. Pular passos porque parece "fácil" pode resultar em lacunas de conhecimento que aparecem como problemas frustrantes mais tarde. Gaste o tempo necessário em cada passo para realmente entender o que está fazendo e por quê.
        </AlertBox>

        <AlertBox type="info" title="O tutorial pode ser reiniciado">
          Se você cometeu um erro ou quer praticar novamente, feche e reabra o programa do tutorial. Ele começa do zero com o Passo 1 todas as vezes. Praticar várias vezes até que cada técnica seja instintiva é a melhor preparação para jogos reais.
        </AlertBox>
      </PageContainer>
    );
  }
  