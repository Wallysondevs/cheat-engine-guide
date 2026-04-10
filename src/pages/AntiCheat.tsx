import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function AntiCheat() {
    return (
      <PageContainer
        title="Anti-Cheat em Jogos"
        subtitle="Como funcionam os sistemas de proteção contra cheats e por que respeitar seus limites é fundamental."
        difficulty="intermediário"
        timeToRead="15 min"
      >
        <AlertBox type="warning" title="Este guia é educacional — use apenas em single-player">
          Entender anti-cheats é valioso para aprender sobre segurança de software. Este conhecimento é para uso em jogos single-player e para fins educacionais. Usar cheats em jogos multiplayer prejudica outros jogadores e resulta em bans permanentes.
        </AlertBox>

        <h2>O ecossistema de proteção de jogos</h2>
        <p>
          Anti-cheat é um campo de batalha tecnológico em constante evolução. Do lado dos cheaters, há ferramentas como o Cheat Engine, injetores de DLL, e modificações de driver. Do lado dos desenvolvedores, há sistemas progressivamente mais sofisticados que operam em múltiplos níveis do sistema operacional para detectar e banir usuários maliciosos.
        </p>
        <p>
          A evolução foi acelerada pelo mercado de cheats para jogos competitivos: pessoas pagam centenas de dólares por cheats sofisticados em jogos como Counter-Strike e Valorant. Com tanto dinheiro envolvido, desenvolvedores de cheat têm recursos para criar ferramentas muito avançadas, o que força as empresas de jogos a responder com sistemas de proteção igualmente avançados.
        </p>
        <p>
          O resultado dessa arms race é que os sistemas anti-cheat modernos são algumas das mais complexas peças de software de segurança em existência — comparáveis a sistemas antivírus enterprise em sofisticação técnica, mas com foco específico em detectar ferramentas de manipulação de jogos.
        </p>

        <h2>Camadas de Detecção</h2>
        <p>
          Sistemas anti-cheat modernos operam em múltiplas camadas simultâneas. Nenhuma detecção isolada é suficiente — é a combinação de várias que torna o burlar difícil.
        </p>
        <p>
          <strong>Nível de aplicação (User Mode):</strong> A camada mais básica. O cliente do jogo verifica processos em execução, janelas abertas, e módulos carregados. Procura por nomes conhecidos ("cheatengine", "injector", "trainer"), títulos de janelas suspeitos, e DLLs injetadas que não deveriam estar lá. Fácil de implementar, fácil de burlar por usuários experientes.
        </p>
        <p>
          <strong>Nível de driver (Kernel Mode):</strong> O anti-cheat carrega um driver que opera no nível do kernel do Windows — o mesmo nível que drivers de hardware. Drivers kernel têm visibilidade completa do sistema e acesso a APIs que software em user mode não pode usar. Podem verificar outros drivers carregados, interceptar chamadas de sistema, e detectar manipulações de memória kernel.
        </p>
        <p>
          <strong>Análise comportamental:</strong> Em vez de procurar ferramentas específicas, monitoram padrões de comportamento do jogador que são impossíveis para humanos mas fáceis para software: precisão de mira acima de 99%, tempo de reação de 5ms, movimento perfeitamente constante, cliques com timing impossível. Machine learning é usado para distinguir habilidade humana excepcional de auxílio computacional.
        </p>
        <p>
          <strong>Verificações server-side:</strong> Validação no servidor de que as ações do cliente são fisicamente possíveis. Você não pode estar em dois lugares ao mesmo tempo, não pode matar alguém através de uma parede sólida (em jogos sem penetração de projéteis), não pode ter se movido 100 metros em 0.1 segundos. Qualquer impossibilidade é detectada e pode resultar em ban automático.
        </p>

        <h2>Os Grandes Sistemas Anti-Cheat</h2>
        <p>
          <strong>Easy Anti-Cheat (EAC):</strong> Criado pela Kamu, adquirido pela Epic Games em 2018. Usado em Fortnite, Apex Legends, Rust, Dead by Daylight, e mais de 200 outros títulos. Opera em user mode com alguns componentes kernel. Focado em detecção de assinaturas e comportamento. Relativamente comum ver bypass parciais porque é amplamente estudado.
        </p>
        <p>
          <strong>BattlEye:</strong> Independente, usado em PUBG, Rainbow Six Siege, DayZ, Arma 3, Hunt: Showdown, e outros. Driver kernel sempre ativo enquanto o jogo está rodando. Faz varreduras ativas de memória dos processos do jogo em tempo real. Tem reputação de ser mais agressivo nas verificações que o EAC.
        </p>
        <p>
          <strong>Riot Vanguard:</strong> Sistema do Valorant. Carrega seu driver no boot do Windows — está ativo desde antes do sistema completamente inicializar, antes mesmo do jogo ser aberto. Opera em ring 0 (nível mais privilegiado do kernel). Verifica a integridade do sistema antes de permitir que o jogo seja lançado. Considerado o mais invasivo e mais difícil de contornar dos sistemas populares.
        </p>
        <p>
          <strong>VAC (Valve Anti-Cheat):</strong> Sistema da Valve para Steam, usado em CS2, Dota 2, TF2, e outros. Diferente dos outros em sua abordagem — funciona principalmente offline e de forma assíncrona. Coleta dados durante o jogo, envia para os servidores da Valve, que os analisa. Bans são processados em "ondas" — pode levar dias ou semanas após a infração. VAC bans são permanentes e irreversíveis.
        </p>

        <h2>Por que Respeitar os Sistemas Anti-Cheat</h2>
        <p>
          Além da questão ética de não prejudicar outros jogadores, há razões práticas para não tentar burlar sistemas anti-cheat em jogos online:
        </p>
        <p>
          <strong>Bans permanentes de conta:</strong> Perder uma conta com centenas de jogos, milhares de horas de progresso, e possivelmente centenas de dólares em compras in-game é uma consequência real. A maioria dos sistemas de ban é irreversível — apelar raramente funciona quando o sistema tem evidências claras.
        </p>
        <p>
          <strong>Hardware bans:</strong> Sistemas avançados não apenas banem a conta — banem o hardware. Identificadores únicos do computador (HWID — Hardware ID) são registrados e qualquer nova conta criada naquele hardware também é banida. Contornar um hardware ban requer troca real de hardware ou emulação cara.
        </p>
        <p>
          <strong>Ação legal:</strong> Empresas como Activision, Epic Games, e Nexon processuaram legalmente desenvolvedores de cheats. Vender ou distribuir cheats pode resultar em processos milionários.
        </p>

        <h2>Anti-Cheat em Jogos Single-Player</h2>
        <p>
          A boa notícia: jogos puramente single-player geralmente não têm anti-cheat invasivo. Quando um "anti-cheat" aparece em single-player, geralmente é mais DRM (Digital Rights Management — proteção contra pirataria) do que anti-cheat real. Sistemas como Denuvo, por exemplo, protegem o jogo de pirataria mas não interferem com o CE da mesma forma que EAC/BattlEye fazem.
        </p>
        <p>
          Em muitos jogos single-player, o CE funciona completamente sem problemas. Em alguns com Denuvo, o CE pode ter dificuldades para fazer varredura na memória encriptada, mas técnicas avançadas geralmente ainda funcionam para modificação em tempo de execução.
        </p>

        <AlertBox type="info" title="Anti-cheat em single-player é raro e geralmente menos agressivo">
          A grande maioria dos problemas com anti-cheat que usuários de CE encontram são em jogos com componentes online. Jogos puramente offline raramente têm proteções que interferem significativamente com o CE. Se você está travado num jogo single-player, verifique se o jogo tem conexão sempre online ou componentes multiplayer.
        </AlertBox>
      </PageContainer>
    );
  }
  