import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Tabelas() {
    return (
      <PageContainer
        title="Tabelas do Cheat Engine"
        subtitle="Como criar, organizar, salvar e compartilhar tabelas .CT — o formato de projeto do Cheat Engine."
        difficulty="iniciante"
        timeToRead="15 min"
      >
        <h2>O que é uma Tabela do Cheat Engine?</h2>
        <p>
          Uma tabela do Cheat Engine (arquivo com extensão .CT, de Cheat Table) é o equivalente a um "projeto salvo" — ela armazena todo o trabalho que você fez para um jogo específico: os endereços encontrados, os nomes que você deu a eles, os tipos de dados, os scripts de código Assembly ou Lua, as hotkeys configuradas, e até informações sobre a estrutura de dados do jogo. Em essência, é tudo que você precisaria para usar seus cheats sem ter que refazer todo o processo do zero.
        </p>
        <p>
          Internamente, uma tabela .CT é um arquivo XML. Isso significa que você pode abri-la em qualquer editor de texto e ver (ou editar) sua estrutura diretamente, o que é útil para diagnóstico e para fazer edições em massa. Sites como o FearLess Cheat Engine hospedam milhares de tabelas prontas para os jogos mais populares, criadas pela comunidade — e você pode baixar, usar e estudar essas tabelas para aprender técnicas avançadas.
        </p>

        <h2>Criando e Salvando sua Primeira Tabela</h2>
        <p>
          Toda vez que você usa o Cheat Engine, você está implicitamente trabalhando em uma tabela — mesmo que ela esteja em branco e não salva. Quando você adiciona endereços à Address List, configura hotkeys, ou escreve scripts, tudo isso existe apenas na memória do CE até você salvar.
        </p>
        <p>
          Para salvar pela primeira vez, vá em <strong>File → Save Table As...</strong> (ou use <kbd>Ctrl+S</kbd>). Uma caixa de diálogo pede onde salvar e o nome do arquivo. Recomendo uma convenção de nomenclatura clara: NomeDoJogo_v1.0.CT ou JogoNome_vida_ponteiros.CT. Guarde tudo numa pasta dedicada — você vai acumular muitas tabelas com o tempo.
        </p>
        <p>
          Depois da primeira vez, <kbd>Ctrl+S</kbd> salva no mesmo arquivo sem perguntar. Se você quiser uma nova versão (por exemplo, após adicionar muito conteúdo novo), use <strong>File → Save Table As...</strong> novamente com um nome diferente.
        </p>
        <p>
          Uma dica importante: salve frequentemente durante o trabalho. Se o CE travar (o que pode acontecer ao debugar processos complexos), você perde tudo que não salvou. O hábito de salvar a cada nova descoberta significativa evita muita frustração.
        </p>

        <h2>Carregando Tabelas Existentes</h2>
        <p>
          Há múltiplas formas de carregar uma tabela no CE, e a mais conveniente depende do seu workflow. O método mais simples é o <strong>arrastar e soltar</strong>: abra o Windows Explorer, navegue até o arquivo .CT e simplesmente arraste para dentro da janela do Cheat Engine. A tabela carrega instantaneamente.
        </p>
        <p>
          Via menu: <strong>File → Load Table</strong> ou <kbd>Ctrl+L</kbd> abre um browser de arquivos padrão. Você navega até a tabela e a abre. Se você frequentemente usa o CE com a mesma tabela, há outra opção ainda mais rápida: o menu <strong>File → Recent Tables</strong> mostra as últimas tabelas que você abriu, permitindo carregá-las com um único clique sem precisar navegar pelo sistema de arquivos.
        </p>
        <p>
          Associação de arquivo: quando você instala o Cheat Engine, ele se registra como o programa padrão para arquivos .CT. Isso significa que um duplo clique em qualquer .CT no Explorer abre o CE com aquela tabela automaticamente. É conveniente para tabelas baixadas da internet.
        </p>
        <p>
          Via linha de comando: você pode abrir o CE diretamente com uma tabela como argumento — útil para criar atalhos na área de trabalho. Crie um atalho com o alvo: "C:Program FilesCheat Engine 7.5cheatengine-x86_64.exe" "C:TabelasMeuJogo.CT" e o CE abrirá diretamente com a tabela.
        </p>

        <h2>O que uma Tabela Contém</h2>
        <p>
          Entender o que vai dentro de uma tabela ajuda a criar tabelas mais completas e bem organizadas. Uma tabela .CT pode conter os seguintes elementos:
        </p>
        <p>
          <strong>Memory Records (Registros de Memória):</strong> São os endereços que você adicionou à Address List. Cada registro guarda o endereço (ou expressão de ponteiro), o nome/descrição, o tipo de dado, o valor atual no momento do salvamento, e se estava ativo (com freeze). Ao reabrir a tabela, os endereços são restaurados exatamente como estavam quando você salvou.
        </p>
        <p>
          <strong>Scripts embutidos:</strong> Cada Memory Record pode ter um script Auto Assembler ou Lua associado. Quando você ativa o checkbox, o script é executado. Esses scripts são salvos dentro da tabela e permitem criar cheats complexos que vão além de simples freezes de valor.
        </p>
        <p>
          <strong>Lua Scripts de tabela:</strong> Scripts que executam automaticamente quando a tabela é carregada, ou que ficam disponíveis como itens na Address List. Esses scripts podem inicializar configurações, verificar se o processo correto está em execução, ou criar interfaces gráficas completas.
        </p>
        <p>
          <strong>Hotkeys globais:</strong> Teclas de atalho configuradas via <strong>Table → Table Hot Keys</strong>. Diferente das hotkeys de endereços individuais, as hotkeys globais podem executar ações em múltiplos endereços ou scripts de uma vez.
        </p>
        <p>
          <strong>Estruturas de dados definidas:</strong> Se você usou o Dissect Data/Structures para mapear a estrutura de um objeto do jogo, essas definições podem ser salvas na tabela também, permitindo reusá-las nas próximas sessões.
        </p>

        <h2>Organizando a Address List</h2>
        <p>
          Uma tabela bem organizada é muito mais fácil de usar do que uma lista caótica de endereços sem nome. O CE oferece grupos (pastas) para organizar os registros. Para criar um grupo, clique com botão direito na Address List e escolha "Add Group". Uma pasta aparece e você pode nomear e arrastar registros para dentro dela.
        </p>
        <p>
          Uma estrutura de organização recomendada para tabelas de RPG, por exemplo, seria: um grupo "Personagem" contendo vida, mana, XP e nível; um grupo "Inventário" com ouro, itens e peso; um grupo "Scripts" com os cheats de código Assembly mais complexos; e um grupo "Ponteiros" separado se você tiver endereços dinâmicos que precisam de atenção especial.
        </p>
        <p>
          Outra boa prática é usar prefixos nas descrições para indicar o tipo de cheat. Por exemplo: "[Freeze] Vida Infinita", "[Script] God Mode", "[Ponteiro] Ouro". Esses prefixos aparecem na Address List e ficam ainda mais úteis quando a tabela tem dezenas de registros — você sabe o que cada item faz sem precisar abri-lo.
        </p>

        <h2>Protegendo sua Tabela com Senha</h2>
        <p>
          O Cheat Engine permite proteger tabelas com senha, impedindo que outras pessoas vejam ou modifiquem os scripts internos. Isso é usado principalmente por criadores que querem distribuir tabelas funcionais sem revelar suas técnicas. Para adicionar senha, vá em <strong>File → Save Table As...</strong> e antes de salvar, há uma opção para definir uma senha. Tabelas protegidas ainda funcionam normalmente — o usuário pode ativar e usar os cheats — mas não pode ver o código dos scripts.
        </p>
        <p>
          Nota: se você perdeu a senha de uma tabela que você mesmo criou, não há recuperação simples. Faça backup de suas tabelas importantes antes de adicionar senha.
        </p>

        <h2>Baixando e Usando Tabelas da Comunidade</h2>
        <p>
          O site <strong>FearLess Cheat Engine</strong> (fearlessrevolution.com) é o repositório mais completo de tabelas para jogos populares. Você pode buscar pelo nome do jogo e encontrar tabelas feitas por outros usuários, com comentários sobre compatibilidade com versões específicas do jogo.
        </p>
        <p>
          Ao baixar uma tabela de terceiros, sempre verifique: (1) a data de criação — tabelas antigas podem não funcionar com versões atuais do jogo; (2) os comentários de outros usuários confirmando que funciona; (3) se o criador é confiável (verifique o histórico de postagens no fórum). Tabelas de fontes desconhecidas podem conter scripts maliciosos — o Lua do CE tem acesso ao sistema de arquivos e pode executar código arbitrário.
        </p>
        <p>
          Antes de ativar qualquer script numa tabela baixada, abra o editor de scripts (clique duplo no endereço → aba Script) e leia o que o script faz. Scripts legítimos de cheat geralmente são curtos, focados em modificação de memória, e facilmente compreensíveis. Scripts que fazem downloads, acessam a internet, ou executam arquivos do sistema são suspeitos.
        </p>

        <AlertBox type="warning" title="Cuidado com tabelas de fontes desconhecidas">
          Scripts Lua dentro de tabelas .CT têm acesso total ao sistema — eles podem ler arquivos, executar programas e até fazer requisições de rede. Nunca execute scripts de tabelas baixadas de sites não verificados sem antes inspecionar o código. Use o FearLess e outros fóruns estabelecidos como fontes confiáveis.
        </AlertBox>

        <AlertBox type="tip" title="Versione suas tabelas">
          Mantenha versões numeradas das suas tabelas: MeuJogo_v1.CT, MeuJogo_v2.CT. Assim, se você fizer uma mudança que quebrou algo, pode sempre voltar para a versão anterior. É simples mas salva muito tempo quando algo dá errado durante o desenvolvimento.
        </AlertBox>
      </PageContainer>
    );
  }
  