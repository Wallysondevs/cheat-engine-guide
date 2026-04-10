import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Modificar() {
    return (
      <PageContainer
        title="Modificar Valores"
        subtitle="Tudo sobre alterar valores na memória — da modificação mais básica às técnicas condicionais avançadas."
        difficulty="iniciante"
        timeToRead="15 min"
      >
        <h2>Por que Modificar Valores?</h2>
        <p>
          Modificar valores é a operação mais fundamental do Cheat Engine. Toda vez que você quer mudar algo no jogo — a vida do personagem, a quantidade de ouro, o número de balas, o nível, os pontos de experiência — você está modificando um valor armazenado na memória. O processo consiste em encontrar onde esse valor está guardado e escrever um novo número naquele endereço.
        </p>
        <p>
          A lógica por trás disso é simples: o jogo lê a vida do personagem da memória RAM quando precisa exibi-la ou processá-la. Se você mudar o número antes que o jogo leia, o jogo vai "achar" que a vida nunca diminuiu. Se você escrever um número maior que o máximo, em muitos jogos isso resulta em vida "estourada" — acima do limite normal.
        </p>

        <h2>Modificação Pontual — O Método Básico</h2>
        <p>
          A forma mais direta de modificar um valor é o duplo clique na coluna <strong>Value</strong> de um endereço na Address List. Uma caixa de diálogo pequena aparece, você digita o novo valor e pressiona Enter. A mudança é imediata — se o endereço está correto, você verá o efeito no jogo instantaneamente.
        </p>
        <p>
          Esse método é suficiente para a maioria das situações de uso casual: você quer mais dinheiro, define 999999. Quer vida máxima, define o valor para o máximo do jogo. Quer zerar o cooldown de uma habilidade, define o timer para 0. É rápido, direto e não requer nenhum conhecimento avançado.
        </p>
        <p>
          A limitação desse método é que a modificação é temporária no sentido de que, assim que o jogo calcular novamente aquele valor (por exemplo, você toma mais dano), o valor muda de novo. Para manter o valor constante, você precisa do Freeze — mas entenderemos isso melhor em breve.
        </p>

        <h2>Modificar Diretamente na Lista de Resultados</h2>
        <p>
          Você não precisa necessariamente adicionar um endereço à Address List antes de modificar. Diretamente na lista de resultados da varredura — o painel superior do CE — você pode selecionar um ou mais endereços e modificar seus valores. Selecione os endereços desejados (use <kbd>Ctrl+Click</kbd> para selecionar múltiplos ou <kbd>Ctrl+A</kbd> para todos), clique com botão direito e escolha <strong>"Change value of selected addresses"</strong>.
        </p>
        <p>
          Isso é especialmente útil quando você ainda não decidiu qual endereço é o correto entre vários candidatos. Você pode selecionar todos os candidatos, modificar todos para um valor fácil de identificar (como 9999), e observar qual efeito aparece no jogo. O endereço que produziu o efeito desejado é o correto.
        </p>

        <h2>As Três Opções de Modificação</h2>
        <p>
          Quando você abre o diálogo de modificação de valor (seja via duplo clique ou menu de contexto), o Cheat Engine oferece três modos distintos de alterar o valor:
        </p>
        <p>
          <strong>Set value to:</strong> Este é o modo padrão e mais comum. Você define exatamente qual será o novo valor, substituindo completamente o atual. Se a vida está em 47 e você define 100, ela vai para 100 independentemente do valor anterior. Use esse modo quando quer definir um valor preciso.
        </p>
        <p>
          <strong>Add to value:</strong> Em vez de definir um valor absoluto, você soma uma quantidade ao valor atual. Se a vida está em 47 e você adiciona 50, ela vai para 97. Isso é útil quando você não sabe exatamente qual é o valor máximo e quer apenas "curar" uma quantidade específica, ou quando quer adicionar recursos sem saber o total atual.
        </p>
        <p>
          <strong>Subtract from value:</strong> O oposto do anterior — subtrai a quantidade do valor atual. Se o tempo de espera está em 120 segundos e você subtrai 100, fica em 20. Útil para reduzir cooldowns, penalidades, ou qualquer valor que você quer diminuir sem zerar completamente.
        </p>

        <h2>Modificar Diferentes Tipos de Dados</h2>
        <p>
          O formato do valor que você digita no diálogo de modificação depende do tipo de dado do endereço. Entender isso evita erros frustrantes onde você digita um valor correto mas o jogo não responde como esperado.
        </p>
        <p>
          Para tipos inteiros (Byte, 2 Bytes, 4 Bytes, 8 Bytes): simplesmente digits o número. Pode ser positivo ou negativo. Valores negativos como -1 são representados internamente como números muito grandes em binário (complemento de 2), então às vezes você pode ver algo estranho como 4294967295 representar o que o jogo interpreta como "infinito" ou "-1".
        </p>
        <p>
          Para Float e Double: use ponto (não vírgula) como separador decimal. Se a velocidade do personagem é 1.5, você digita "1.5" ou "2.0" para dobrar a velocidade. Nunca use vírgula — o CE não reconhece "1,5" como um número válido e pode inserir 1 ou dar erro.
        </p>
        <p>
          Para String: o texto exatamente como deve aparecer. Não coloque aspas ao redor — apenas o texto puro. O comprimento do texto novo não pode ser maior que o original, pois você estaria sobrescrevendo memória além do espaço alocado para aquela string, potencialmente causando corrupção.
        </p>
        <p>
          Para Array of Bytes: os bytes em hexadecimal separados por espaços. "FF 00 4E A3" por exemplo. Cada par de dígitos hex representa um byte (0-255). Dois dígitos hex podem ter um ponto de interrogação "??" se você não quiser alterar aquele byte específico.
        </p>

        <h2>Atalhos e Ações Rápidas</h2>
        <p>
          O Cheat Engine oferece vários atalhos para modificação rápida quando você trabalha com a Address List. Saber esses atalhos acelera muito o workflow, especialmente quando você está testando múltiplos endereços ao mesmo tempo.
        </p>
        <p>
          Com um endereço selecionado na Address List, pressionar <kbd>Enter</kbd> abre o diálogo de modificação de valor — o mesmo que duplo clicar na coluna Value. A barra de espaço alterna o freeze (ativa/desativa o checkbox Active). <kbd>Delete</kbd> remove o endereço selecionado da lista.
        </p>
        <p>
          Para alterar a descrição de um endereço (renomear), clique duplo na coluna Description. Para alterar o tipo de dado, clique duplo na coluna Type — uma lista suspensa aparece com todos os tipos disponíveis. Para alterar o endereço em si (mover o cheat para um endereço diferente), clique duplo na coluna Address.
        </p>

        <h2>Modificação Condicional com Lua</h2>
        <p>
          Para cheats mais sofisticados, você pode usar Lua para modificar valores condicionalmente — por exemplo, só curar a vida se ela cair abaixo de um certo limite, ou adicionar ouro em intervalos regulares. Isso vai além da simples modificação manual e cria cheats que funcionam automaticamente.
        </p>
        <CodeBlock
          title="Curar automaticamente quando vida cair abaixo de 30%"
          language="lua"
          code={`-- Script que monitora a vida e cura automaticamente
  local ADDR_VIDA = "game.exe+0x0012A3B0"
  local VIDA_MAX = 100

  local timer = createTimer(nil, false)
  timer.Interval = 500  -- verifica a cada 500ms

  timer.OnTimer = function()
    local vida = readInteger(ADDR_VIDA)
    
    -- Se vida caiu abaixo de 30%, cura para o máximo
    if vida < (VIDA_MAX * 0.3) then
      writeInteger(ADDR_VIDA, VIDA_MAX)
      print("Auto-cura ativada! Vida restaurada para " .. VIDA_MAX)
    end
  end

  timer.Enabled = true
  print("Monitor de vida ativado. Pressione Stop para desativar.")`}
        />

        <CodeBlock
          title="Adicionar ouro periodicamente"
          language="lua"
          code={`-- Adiciona 100 de ouro a cada 5 segundos
  local ADDR_OURO = "game.exe+0x00456ABC"
  local ADICIONAR = 100
  local intervalo = 5000  -- 5 segundos em ms

  local timer = createTimer(nil, false)
  timer.Interval = intervalo
  timer.OnTimer = function()
    local ouroAtual = readInteger(ADDR_OURO)
    writeInteger(ADDR_OURO, ouroAtual + ADICIONAR)
    print("Ouro: " .. (ouroAtual + ADICIONAR))
  end

  timer.Enabled = true`}
        />

        <h2>Modificando Múltiplos Endereços Relacionados</h2>
        <p>
          Muitos jogos armazenam o mesmo valor em mais de um endereço — por exemplo, a vida atual e a vida máxima são endereços separados, ou existem mirrors do mesmo dado para diferentes sistemas. Quando você modifica apenas um e não o outro, o jogo pode corrigir o valor ou comportar-se de forma estranha.
        </p>
        <p>
          Um exemplo clássico: em muitos RPGs, existe o valor de "vida atual" e o valor de "vida máxima" separados. Se você aumenta a vida atual para 9999 mas a vida máxima permanece em 100, o jogo pode imediatamente clipar a vida atual de volta para 100 (pois não pode exceder o máximo). A solução é encontrar e modificar ambos os endereços.
        </p>
        <p>
          Outra situação comum é quando o jogo verifica a validade de um valor — por exemplo, se você tem munição infinita mas o jogo verifica se o carregador está cheio antes de recarregar, você pode precisar modificar tanto o total de balas quanto as balas no carregador atual.
        </p>

        <AlertBox type="warning" title="Valores de Ponto Flutuante e Overflow">
          Cuidado ao definir valores muito altos em campos Float. O Float tem precisão limitada de cerca de 7 dígitos significativos. Valores como 9999999.0 podem não representar exatamente o que você espera. Além disso, alguns jogos têm validação que corrige valores acima do máximo — defina primeiro o máximo e depois o atual, ou ambos ao mesmo tempo.
        </AlertBox>

        <AlertBox type="tip" title="Teste Incremental é mais seguro">
          Quando não tem certeza do efeito de uma modificação, faça mudanças incrementais ao invés de valores extremos. Mude a vida de 50 para 75 primeiro e veja o comportamento. Se funcionar, aí você vai para 100 ou 9999. Isso evita crashes ou comportamentos imprevisíveis do jogo.
        </AlertBox>

        <h2>Erros Comuns ao Modificar Valores</h2>
        <p>
          <strong>O valor muda mas volta imediatamente:</strong> O jogo está recalculando o valor constantemente. Você precisa do Freeze para manter o valor constante, ou precisa encontrar e modificar a instrução que faz o cálculo (mais avançado). Outra possibilidade é que você encontrou um endereço espelho e não o endereço principal.
        </p>
        <p>
          <strong>O valor muda mas não tem efeito visual:</strong> Provavelmente o jogo usa o valor de outra forma do que você imagina. Por exemplo, o jogo pode renderizar a barra de vida com base em um cálculo (vidaAtual / vidaMax) × largura_da_barra — se você mudou o valor mas não o máximo, a barra pode não mudar visivelmente.
        </p>
        <p>
          <strong>O jogo crasha após a modificação:</strong> Você possivelmente modificou um endereço que não é o valor desejado mas sim um ponteiro, um contador de estrutura, ou um valor crítico para o funcionamento interno do jogo. Use Undo Scan para voltar ao estado anterior e refine mais a busca antes de modificar.
        </p>
      </PageContainer>
    );
  }
  