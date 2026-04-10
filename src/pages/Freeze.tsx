import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Freeze() {
    return (
      <PageContainer
        title="Freeze de Valores"
        subtitle="Como travar valores na memória para que o jogo não possa alterá-los — e todas as nuances dessa técnica."
        difficulty="iniciante"
        timeToRead="15 min"
      >
        <h2>O que é o Freeze e como funciona internamente</h2>
        <p>
          O Freeze (congelamento) é uma funcionalidade que faz o Cheat Engine reescrever continuamente um valor em um endereço de memória, a uma frequência alta o suficiente para que o jogo não consiga alterá-lo de forma perceptível. O princípio é simples: mesmo que o jogo escreva "90" no endereço da vida a cada 16ms (equivalente a 60fps), o CE escreve "100" no mesmo endereço a cada poucos milissegundos, sobrepondo a escrita do jogo.
        </p>
        <p>
          O resultado prático é que o valor parece travado do ponto de vista do jogador e do jogo — a vida nunca cai, o ouro nunca diminui, o timer nunca conta. É uma das técnicas mais simples e mais usadas no Cheat Engine, especialmente para criação rápida de cheats de vida infinita e munição infinita.
        </p>
        <p>
          É importante entender que o Freeze não impede que o jogo escreva no endereço — ele apenas sobrescreve o que o jogo escreveu logo em seguida. Isso significa que, em teoria, existe uma janela de tempo minúscula onde o valor está errado. Para a maioria dos jogos, essa janela é imperceptível. Porém, em jogos muito rápidos ou com verificações síncronas, pode haver instabilidade.
        </p>

        <h2>Como Ativar o Freeze Passo a Passo</h2>
        <p>
          O processo de ativar o freeze é direto, mas há uma ordem correta a seguir para garantir que o valor seja travado no número que você deseja, e não em um valor aleatório.
        </p>
        <p>
          Primeiro, você precisa ter o endereço na Address List — se você acabou de encontrá-lo por varredura, selecione-o na lista de resultados e pressione Enter (ou duplo clique) para adicionar à Address List. O endereço aparecerá no painel inferior com um checkbox na coluna "Active" (que fica desmarcado por padrão).
        </p>
        <p>
          Segundo, antes de ativar o freeze, defina o valor que você quer travar. Duplo clique na coluna Value, digite o número desejado (por exemplo, 100 para vida máxima, ou 9999 para um valor alto artificial) e confirme com Enter. Isso garante que o freeze vai manter exatamente aquele valor, e não o valor atual que pode ser baixo (ex: você já tomou dano e a vida está em 30).
        </p>
        <p>
          Terceiro, marque o checkbox na coluna Active. O endereço ficará realçado e o CE começará a reescrever o valor continuamente. Você verá o valor na coluna Value se estabilizar no número que você definiu. No jogo, a barra de vida ou o recurso que você travou ficará constante.
        </p>
        <p>
          Para desativar, simplesmente desmarque o checkbox. O valor voltará a ser controlado pelo jogo normalmente.
        </p>

        <h2>Freeze em Múltiplos Endereços Simultaneamente</h2>
        <p>
          Uma técnica muito útil é selecionar múltiplos endereços na Address List e ativar o freeze em todos de uma vez. Selecione os endereços com <kbd>Ctrl+Click</kbd> ou <kbd>Shift+Click</kbd> (para selecionar um intervalo), depois pressione <kbd>Espaço</kbd> para ativar/desativar o freeze em todos os selecionados simultaneamente. Alternativamente, clique com botão direito → "Toggle all checkboxes".
        </p>
        <p>
          Isso é especialmente útil quando você tem um grupo de cheats numa tabela organizada — todos os recursos (vida, mana, stamina, munição) podem ser ativados com um único atalho, em vez de clicar em cada checkbox individualmente.
        </p>

        <h2>Opções Avançadas de Freeze — Tipos de Congelamento</h2>
        <p>
          O Cheat Engine oferece mais do que simplesmente travar um valor fixo. Ao clicar com botão direito em um endereço freezado, você verá opções de "Freeze type" que mudam o comportamento do freeze:
        </p>
        <p>
          <strong>Set value (padrão):</strong> O modo clássico. O CE reescreve o valor definido repetidamente. O valor fica absolutamente constante no número que você escolheu. É o mais usado e o que a maioria das pessoas pensa quando fala em "freeze".
        </p>
        <p>
          <strong>Increase value by X:</strong> A cada ciclo do freeze, o CE adiciona X ao valor atual. Se você definir X como 10 e o intervalo como 1000ms, o valor aumentará em 10 a cada segundo. Útil para acumular recursos continuamente — por exemplo, ganhar ouro automaticamente enquanto o jogo roda, sem precisar fazer nada.
        </p>
        <p>
          <strong>Decrease value by X:</strong> O oposto do anterior. A cada ciclo, subtrai X do valor. Útil para timers de cooldown — você pode fazer o cooldown diminuir mais rápido do que normalmente diminuiria, efetivamente tornando habilidades com recarga quase instantânea.
        </p>

        <h2>Controlando o Intervalo de Reescrita</h2>
        <p>
          O intervalo padrão de reescrita do freeze é determinado pelo ciclo de processamento do CE, que geralmente é bem rápido (dezenas de milissegundos). Para a maioria dos jogos, isso é suficiente. Mas você pode configurar manualmente o intervalo de uma forma mais específica.
        </p>
        <p>
          Clique com botão direito no endereço e selecione <strong>"Set/show timer freeze interval"</strong>. Uma caixa de diálogo permite definir o intervalo em milissegundos. Um valor de 100ms significa que o CE reescreve o valor 10 vezes por segundo. Um valor de 16ms equivale a aproximadamente 60 reescritas por segundo — sincronizado com o framerate de muitos jogos.
        </p>
        <p>
          Por que isso importa? Em alguns jogos, um intervalo muito longo pode resultar em "piscar" visível — você vê a vida cair por uma fração de segundo antes de ser restaurada. Reduzir o intervalo elimina esse efeito. Por outro lado, um intervalo muito curto aumenta o uso de CPU do CE. 50-100ms é um bom ponto de partida.
        </p>

        <h2>Freeze com Hotkeys — Controle Sem Sair do Jogo</h2>
        <p>
          Manter o freeze sempre ativo pode causar problemas com certas mecânicas do jogo. A melhor prática é configurar uma hotkey para ativar e desativar o freeze conforme necessário, sem precisar alternar para a janela do CE.
        </p>
        <p>
          Para configurar uma hotkey de freeze, clique com botão direito no endereço na Address List e selecione "Set hotkey". Na janela que abre, pressione a tecla que você quer usar (ex: <kbd>F1</kbd>), escolha a ação "Toggle activation" (para alternar entre ativo e inativo), e confirme. A partir daí, pressionar F1 durante o jogo ativa ou desativa o freeze daquele endereço específico.
        </p>
        <p>
          Uma estratégia popular é usar a tecla do freeze apenas durante momentos críticos. Por exemplo: você joga normalmente, quando está prestes a morrer pressiona F1 para ativar vida infinita, sobrevive ao momento difícil, e pressiona F1 novamente para desativar e continuar jogando normalmente. Isso preserva a experiência de jogo enquanto ainda oferece uma "rede de segurança".
        </p>

        <h2>Freeze via Lua — Controle Programático</h2>
        <p>
          Para tabelas mais sofisticadas, você pode controlar o freeze de endereços via scripts Lua. Isso permite criar lógicas condicionais — ativar o freeze apenas quando determinada condição é verdadeira, ou alterar o valor de freeze dinamicamente baseado em outros valores do jogo.
        </p>
        <CodeBlock
          title="Ativando freeze em múltiplos endereços por Lua"
          language="lua"
          code={`-- Ativar freeze em todos os cheats de um grupo específico
  local al = getAddressList()
  for i = 0, al.Count - 1 do
    local rec = al.getMemoryRecord(i)
    -- Ativa todos que começam com "[Recurso]"
    if rec.Description:find("^%[Recurso%]") then
      rec.Active = true
      print("Freeze ativado: " .. rec.Description)
    end
  end`}
        />
        <CodeBlock
          title="Freeze condicional — ativa apenas quando vida está baixa"
          language="lua"
          code={`-- Apenas ativa o freeze de vida quando HP caiu abaixo de 20%
  local ADDR_VIDA = "game.exe+0x12345"
  local HP_MAXIMO = 100
  local LIMITE = 20  -- ativa freeze se vida < 20

  local mr = getAddressList().getMemoryRecordByDescription("Vida")

  local timer = createTimer(nil, false)
  timer.Interval = 250  -- verifica 4x por segundo
  timer.OnTimer = function()
    local vida = readInteger(ADDR_VIDA)
    if vida < LIMITE and not mr.Active then
      mr.Value = tostring(HP_MAXIMO)
      mr.Active = true
      print("ALERTA: vida baixa — freeze ativado!")
    elseif vida >= LIMITE and mr.Active then
      mr.Active = false
      print("Vida normalizada — freeze desativado.")
    end
  end
  timer.Enabled = true`}
        />

        <h2>Casos de Uso Comuns e Considerações Práticas</h2>
        <p>
          <strong>Vida infinita:</strong> Trave a vida no valor máximo. É importante também travá-la um pouco acima do máximo visível? Às vezes sim — alguns jogos têm escudos ou camadas de HP que somam ao total e são representados separadamente. Verifique se o jogo usa HP "acima do máximo" como escudo e trave os dois endereços.
        </p>
        <p>
          <strong>Munição infinita:</strong> Freqüentemente requer dois endereços — a munição do carregador atual e a reserva total de balas. Se você trava apenas o carregador mas não a reserva, recarregar pode zerar a reserva e o jogo pode não carregar mais. Identifique ambos e freeze os dois.
        </p>
        <p>
          <strong>Dinheiro/ouro:</strong> Travar em um valor alto funciona, mas cuidado com jogos que verificam se você tem saldo suficiente antes de uma compra — às vezes o valor travado pode causar problemas com transações. Uma alternativa é travar no valor que você quer e ativar/desativar conforme necessário.
        </p>
        <p>
          <strong>Timer de corrida ou combate:</strong> Travar o timer impede que ele avance, dando tempo ilimitado. Mas esteja ciente de que alguns jogos têm verificações do lado do servidor — em modo online, isso pode resultar em desconexão ou ban.
        </p>

        <AlertBox type="warning" title="Freeze pode causar comportamentos inesperados">
          Travar certos valores pode quebrar mecânicas do jogo. Por exemplo, travar o HP do inimigo em 9999 pode tornar o jogo impossível de completar. Travar valores de física ou movimento pode quebrar a simulação. Travar valores de IA pode fazer os inimigos pararem de se mover. Sempre entenda o que o valor representa antes de travá-lo e tenha um plano para desfazer se algo der errado.
        </AlertBox>

        <AlertBox type="tip" title="Use grupos na Address List para organizar freezes">
          Crie grupos na Address List (clique direito → Add Group) para organizar seus cheats por categoria — "Combate", "Recursos", "Movimento". Isso facilita ativar e desativar grupos inteiros de freezes rapidamente, especialmente quando você tem 10 ou mais endereços numa tabela.
        </AlertBox>
      </PageContainer>
    );
  }
  