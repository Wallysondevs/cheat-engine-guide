import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function MultiNivel() {
    return (
      <PageContainer
        title="Ponteiros Multi-Nível"
        subtitle="Como mapear e usar cadeias de ponteiros aninhados — a técnica definitiva para cheats permanentes em jogos modernos."
        difficulty="intermediário"
        timeToRead="18 min"
      >
        <h2>De um nível a vários — a realidade dos objetos de jogo</h2>
        <p>
          Um ponteiro de nível único funciona assim: existe um endereço estático A que contém um endereço B, e em B+offset está seu dado. Simples. Mas jogos modernos raramente organizam seus dados tão simplesmente. Eles têm gerenciadores de cena, gerenciadores de entidades, controladores de personagem, componentes de stats — cada um apontando para o próximo numa cadeia. Para chegar à vida do personagem, talvez você precise seguir 4, 5 ou até 7 níveis de ponteiros.
        </p>
        <p>
          Por exemplo: o módulo game.exe tem um ponteiro estático para o GameManager. O GameManager tem um campo que aponta para o PlayerController. O PlayerController tem um campo que aponta para o PlayerStats. O PlayerStats tem um campo que é a vida atual. Para chegar à vida, você segue: [game.exe+0x009E48] → [resultado+0x148] → [resultado+0x64] → [resultado+0x4C] = vida.
        </p>
        <p>
          Isso pode parecer complicado, mas é a estrutura normal de código orientado a objetos. O Cheat Engine lida com isso perfeitamente — e o Pointer Scanner automatiza a descoberta dessas cadeias.
        </p>

        <h2>Notação de Ponteiros Multi-Nível no CE</h2>
        <p>
          O Cheat Engine usa uma notação consistente para representar cadeias de ponteiros. Entender essa notação é essencial para ler tabelas de outros e para configurar ponteiros manualmente.
        </p>
        <CodeBlock
          title="Notação de ponteiro multi-nível no CE"
          language="pseudocode"
          code={`; Exemplo com 4 níveis:
  ; Base estática: "game.exe"+0x009E48
  ; Seguindo os ponteiros:
  ; Nível 1: [[game.exe+0x009E48] + 0x148]  ← GameManager
  ; Nível 2: [[[game.exe+0x009E48] + 0x148] + 0x64]  ← PlayerController  
  ; Nível 3: [[[[game.exe+0x009E48] + 0x148] + 0x64] + 0x4C]  ← Vida

  ; Como o CE exibe na Address List:
  ; Endereço: P→P→P→P→"game.exe"+9E48
  ; Com offsets: [+148][+64][+4C]
  ; 
  ; Cada "P→" representa um nível de desreferenciamento (ler o endereço apontado)`}
        />

        <h2>Configurando um Ponteiro Multi-Nível Manualmente</h2>
        <p>
          Às vezes o Pointer Scanner retorna a cadeia correta mas você quer adicioná-la manualmente à Address List (por exemplo, ao recriar uma tabela depois de um update do jogo onde você sabe que apenas um offset mudou). O processo é:
        </p>
        <p>
          Clique no botão "Add address manually" (ícone + azul) na parte inferior da Address List. Na janela que abre, marque a caixa "Pointer". Um campo aparece para o endereço base — escreva o endereço estático em formato "nome_do_módulo"+offset, como "game.exe+0x9E48". Abaixo, aparecem campos para adicionar offsets — clique no "+" para adicionar mais níveis. Preencha os offsets na ordem: 0x148, 0x64, 0x4C para o exemplo acima. Selecione o tipo de dado (4 Bytes para vida inteira, Float para vida decimal). Clique OK.
        </p>
        <p>
          O endereço aparece na Address List com cor roxa/violeta, indicando que é um ponteiro. O valor exibido é o resultado de seguir toda a cadeia — se está correto, você verá a vida atual do personagem. Se está mostrando 0 ou um valor sem sentido, algum offset está errado.
        </p>

        <h2>Depurando Ponteiros Quebrados</h2>
        <p>
          Quando um ponteiro multi-nível não funciona (mostra valor errado ou "??"), é necessário inspecionar cada nível individualmente para identificar onde a cadeia quebra. O processo de diagnóstico é o seguinte:
        </p>
        <p>
          Comece com o endereço base: abra o Memory View (Ctrl+M) e navegue para o endereço base estático. Leia os bytes lá — esses bytes formam o endereço do próximo nível. Converta de little-endian (como os bytes aparecem na memória) para o endereço. Vá para esse endereço. Continue seguindo a cadeia manualmente até o ponto onde o valor não faz sentido — esse nível está com o offset errado ou o ponteiro foi invalidado por uma atualização do jogo.
        </p>
        <CodeBlock
          title="Depurando ponteiro level por level via Lua"
          language="lua"
          code={`-- Depurar uma cadeia de ponteiros nível por nível
  local base = getAddress("game.exe") + 0x9E48

  -- Nível 1
  local lvl1 = readInteger(base)
  print("Nível 0 (base): " .. string.format("0x%X", base))
  print("Nível 1 (após deref): " .. string.format("0x%X", lvl1))
  if lvl1 == 0 then print("ERRO: ponteiro nulo no nível 1!") return end

  -- Nível 2
  local lvl2 = readInteger(lvl1 + 0x148)
  print("Nível 2 (após +0x148): " .. string.format("0x%X", lvl2))
  if lvl2 == 0 then print("ERRO: ponteiro nulo no nível 2! Offset 0x148 pode estar errado.") return end

  -- Nível 3
  local lvl3 = readInteger(lvl2 + 0x64)
  print("Nível 3 (após +0x64): " .. string.format("0x%X", lvl3))
  if lvl3 == 0 then print("ERRO: ponteiro nulo no nível 3! Offset 0x64 pode estar errado.") return end

  -- Valor final
  local vida = readInteger(lvl3 + 0x4C)
  print("Vida encontrada: " .. vida)`}
        />

        <h2>A Questão dos Offsets Após Updates</h2>
        <p>
          O cenário mais frustrante no trabalho com ponteiros multi-nível é quando o jogo é atualizado e os ponteiros param de funcionar. O endereço base estático geralmente ainda funciona, mas um ou mais offsets mudaram porque a estrutura interna dos objetos foi reorganizada.
        </p>
        <p>
          A abordagem para recuperar um ponteiro quebrado após update: use o Dissect Data/Structures do CE. Após encontrar o novo endereço do valor por varredura, use a ferramenta de dissect no nível imediatamente acima para mapear os campos do objeto. Compare com o mapeamento antigo para identificar qual offset mudou. Frequentemente é uma diferença de 4-8 bytes porque o compilador adicionou ou removeu um campo no meio da estrutura.
        </p>

        <h2>Ponteiros Multi-Nível em Tabelas Profissionais</h2>
        <p>
          As melhores tabelas da comunidade (como as do FearLess Cheat Engine) frequentemente incluem comentários explicando a estrutura dos ponteiros. Um comentário típico seria algo como: "Base → GameManager → LocalPlayer → HealthComponent → MaxHealth". Isso não é apenas por documentação — é para facilitar a atualização quando o jogo muda.
        </p>
        <p>
          Quando você entende a lógica por trás da cadeia (que objeto cada nível representa), descobrir um novo offset após uma atualização é muito mais rápido. Em vez de refazer tudo do zero, você sabe que precisa verificar apenas o offset no nível do HealthComponent e pode confirmar rapidamente qual é o novo offset correto.
        </p>

        <AlertBox type="tip" title="Use o Pointer Scanner, não tente adivinhar os offsets">
          Com mais de 2 níveis de ponteiros, tentar descobrir os offsets manualmente é extremamente tedioso. O Pointer Scanner automatiza isso. Mesmo que você conheça a teoria dos ponteiros multi-nível, use o scanner para encontrar os offsets — é a ferramenta certa para isso.
        </AlertBox>

        <AlertBox type="info" title="Ponteiros de nível 5+ são mais frágeis">
          Cadeias com 5 ou mais níveis têm mais pontos de falha — cada nível é uma oportunidade para um offset mudar num update. Se o Pointer Scanner encontrar resultados com poucos e muitos níveis, prefira os de poucos níveis para suas tabelas. Mais simples = mais robusto.
        </AlertBox>
      </PageContainer>
    );
  }
  