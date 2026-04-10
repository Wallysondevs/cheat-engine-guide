import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Evasao() {
    return (
      <PageContainer
        title="Evasão de Anti-Cheat"
        subtitle="Como sistemas de proteção detectam o Cheat Engine e técnicas para reduzir sua visibilidade."
        difficulty="avançado"
        timeToRead="18 min"
      >
        <AlertBox type="warning" title="Somente para fins educacionais e single-player">
          Este conteúdo é para entender como proteções funcionam e para uso em jogos single-player. Usar cheats em jogos multiplayer prejudica outros jogadores e viola os termos de serviço — podendo resultar em ban permanente da conta.
        </AlertBox>

        <h2>Por que anti-cheats existem</h2>
        <p>
          Sistemas anti-cheat existem por razões legítimas: em jogos competitivos, cheaters destroem a experiência de jogadores honestos. Uma pessoa com aimbot em um FPS online torna o jogo impossível de ganhar para todos os outros. Desenvolvedores investem pesado em proteção porque a reputação de um jogo como "infestado de cheaters" afasta jogadores e destrói a base de usuários.
        </p>
        <p>
          Dito isso, entender como esses sistemas funcionam é valioso tanto para desenvolvedores que querem proteger seus jogos quanto para usuários que querem usar o Cheat Engine legitimamente em jogos single-player — onde ferramentas como o CE são completamente válidas, mas alguns jogos têm anti-cheats que interferem mesmo offline.
        </p>

        <h2>Como Anti-Cheats Detectam o Cheat Engine</h2>
        <p>
          Os métodos de detecção vão do simples ao sofisticado, e sistemas modernos usam múltiplas camadas simultaneamente:
        </p>
        <p>
          <strong>Detecção por nome de processo:</strong> O método mais básico. O anti-cheat lista todos os processos em execução e compara os nomes com uma lista de ferramentas conhecidas. "cheatengine-x86_64.exe", "CE.exe", "CheatEngine.exe" são assinaturas óbvias. Muitos sistemas fazem isso mesmo antes do jogo carregar completamente.
        </p>
        <p>
          <strong>Detecção por título de janela:</strong> Similar à detecção de processo, mas verifica os títulos das janelas abertas. O CE cria uma janela com "Cheat Engine" no título — facilmente detectável via EnumWindows.
        </p>
        <p>
          <strong>Detecção por driver:</strong> O CE usa um driver de kernel (dbk64.sys) para acessar memória com privilégios elevados. Esse driver tem uma assinatura conhecida. Anti-cheats como o Vanguard (Riot Games) que rodam em nível kernel podem enumerar drivers carregados e identificar o dbk64.sys antes mesmo que o jogo seja aberto.
        </p>
        <p>
          <strong>Detecção por handles abertos:</strong> Quando o CE se anexa a um processo, ele abre handles (identificadores) com permissões de leitura e escrita de memória — PROCESS_VM_READ, PROCESS_VM_WRITE. O jogo pode verificar quem tem handles abertos para seu próprio processo e detectar ferramentas externas suspeitas.
        </p>
        <p>
          <strong>Detecção por hooks de API:</strong> Para o Speed Hack funcionar, o CE precisa interceptar funções do Windows como GetTickCount e QueryPerformanceCounter. Isso é feito via hooking — modificando as primeiras instruções dessas funções para redirecionar para o código do CE. Anti-cheats verificam se as funções de sistema foram modificadas e detectam esses hooks.
        </p>
        <p>
          <strong>Detecção por varredura de memória:</strong> O anti-cheat pode escanear a memória do processo do jogo em busca de padrões de bytes conhecidos de injetores ou cheats. Estruturas de dados internas do CE, padrões de código, e assinaturas de scripts injetados são verificados.
        </p>
        <p>
          <strong>Análise comportamental:</strong> Sistemas mais avançados não procuram apenas por ferramentas específicas — eles monitoram comportamentos suspeitos. Mover o mouse com precisão impossível para humanos, reações mais rápidas que o tempo de reação humano, padrões de movimento não naturais. Esses sistemas usam machine learning e são muito mais difíceis de enganar.
        </p>

        <h2>Os Principais Sistemas Anti-Cheat</h2>
        <p>
          <strong>Easy Anti-Cheat (EAC):</strong> Desenvolvido pela Kamu e adquirido pela Epic Games. Usado em Fortnite, Apex Legends, Rust, Dead by Daylight, e centenas de outros títulos. Opera principalmente em user mode mas tem componentes kernel. Detecta assinaturas conhecidas, hooks, e injeção de DLL. Considerado difícil de burlar sem builds customizadas do CE.
        </p>
        <p>
          <strong>BattlEye:</strong> Desenvolvido independentemente, usado em PUBG, Rainbow Six Siege, DayZ, Arma, e muitos outros. Opera como serviço de Windows e tem componentes kernel. Faz varreduras ativas de memória e verifica integridade de código. É mais agressivo que o EAC em termos de detecção em tempo real.
        </p>
        <p>
          <strong>Riot Vanguard:</strong> O anti-cheat do Valorant (e futuro do LoL) é o mais invasivo dos sistemas populares — ele roda desde a inicialização do Windows, antes mesmo do jogo abrir, com privilégios de kernel (Ring 0). Pode verificar outros drivers, processos que iniciaram antes dele, e tem acesso total ao sistema. É considerado o anti-cheat mais difícil de contornar atualmente.
        </p>
        <p>
          <strong>VAC (Valve Anti-Cheat):</strong> O sistema da Valve para CS, Dota, TF2, etc. Funciona de forma "offline" — coleta dados durante o jogo e os verifica nos servidores da Valve periodicamente. Bans podem vir horas ou dias depois da infração. Não detecta tão rápido quanto os outros mas os bans são frequentemente em ondas que atingem muitos cheaters de uma vez.
        </p>

        <h2>Técnicas Básicas de Evasão para Single-Player</h2>
        <p>
          Para jogos single-player que inexplicavelmente incluem anti-cheats que interferem no uso do CE (algo que acontece com alguns jogos que usam proteções de DRM junto com anti-cheat), existem técnicas básicas:
        </p>
        <p>
          <strong>Renomear o executável:</strong> A técnica mais simples e que resolve a detecção por nome de processo. Copie o executável do CE para outra pasta e renomeie para algo neutro. "explorer.exe" seria muito óbvio — use algo como "audio_manager.exe" ou "display_tool.exe". A maioria das detecções por nome de processo para aqui.
        </p>
        <CodeBlock
          title="Renomear o CE para evadir detecção por nome"
          language="text"
          code={`Localização original:
  C:\Program Files\Cheat Engine 7.5\cheatengine-x86_64.exe

  Processo:
  1. Copie o arquivo para outra pasta (não apenas renomeie no lugar)
  2. Renomeie a cópia para algo neutro:
     audio_helper.exe
     win32_tool.exe
     
  3. Execute a cópia renomeada — ela funciona normalmente
  4. O anti-cheat que verifica apenas pelo nome "cheatengine" não detecta mais

  Nota: Isso só resolve detecção por nome de processo.
  Detecção por driver, handle ou hash de arquivo ainda pode ocorrer.`}
        />
        <p>
          <strong>Usar sem o driver:</strong> O driver do CE (dbk64.sys) é a maior assinatura conhecida. Quando o CE pergunta se deve carregar o driver no início, responder "No" faz o CE funcionar sem ele. A funcionalidade é reduzida (acesso kernel limitado), mas para muitos jogos é suficiente e muito menos detectável.
        </p>
        <p>
          <strong>Builds customizadas:</strong> A comunidade de engenharia reversa mantém versões modificadas do CE com strings, assinaturas e padrões alterados. Essas builds têm assinaturas diferentes do CE padrão e evitam detecção por varredura de padrões de bytes. Busque em fóruns de segurança como UnknownCheats.
        </p>

        <h2>Técnicas Avançadas (para pesquisa)</h2>
        <p>
          Em nível mais técnico, existem abordagens usadas por pesquisadores de segurança que envolvem: drivers personalizados que não têm as assinaturas do CE mas oferecem acesso similar; leitura de memória via mapeamento de arquivo em vez de ReadProcessMemory (evita alguns hooks); virtualização via hypervisor para acessar memória do guest de fora (muito complexo); e manipulação de handles via duplicação em vez de abertura direta.
        </p>
        <p>
          Essas técnicas são descritas em papers de segurança e apresentações em conferências como DEF CON. Elas requerem conhecimento avançado de desenvolvimento de drivers Windows e arquitetura de sistema operacional.
        </p>

        <AlertBox type="info" title="Jogos single-player geralmente não têm anti-cheat rigoroso">
          A grande maioria dos jogos single-player não tem anti-cheat, ou tem proteções tão básicas (como apenas verificar o nome do processo) que renomear o CE resolve. Anti-cheats invasivos são quase exclusivos de jogos multiplayer competitivos. Se você está usando o CE apenas em single-player, provavelmente não precisa de nenhuma técnica de evasão.
        </AlertBox>
      </PageContainer>
    );
  }
  