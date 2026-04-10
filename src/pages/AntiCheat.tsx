import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function AntiCheat() {
    return (
      <PageContainer
        title="Sistemas Anti-Cheat"
        subtitle="Como funcionam os principais sistemas de proteção de jogos e o que cada um detecta."
        difficulty="avançado"
        timeToRead="14 min"
      >
        <AlertBox type="warning" title="Apenas para fins educacionais">
          Entender como anti-cheats funcionam é legítimo e educativo. Este guia não incentiva uso de cheats em jogos online. Respeite as regras e outros jogadores.
        </AlertBox>

        <h2>Os Principais Sistemas Anti-Cheat</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Sistema</th>
                <th className="p-3 text-left">Desenvolvedor</th>
                <th className="p-3 text-left">Jogos Notáveis</th>
                <th className="p-3 text-left">Nível</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["EasyAntiCheat (EAC)", "Epic Games", "Fortnite, Apex, Rust, Dead by Daylight", "Alto"],
                ["BattlEye", "BattlEye GmbH", "PUBG, Rainbow Six, DayZ, GTA Online", "Alto"],
                ["Vanguard", "Riot Games", "Valorant, LoL (futuro)", "Muito Alto (kernel)"],
                ["VAC (Valve AC)", "Valve", "CS:GO/CS2, Dota 2, TF2", "Médio (offline-first)"],
                ["PunkBuster", "Even Balance", "BF4 (legado), jogos antigos", "Baixo (obsoleto)"],
                ["nProtect GameGuard", "INCA Internet", "MapleStory, MU Online, muitos MMOs", "Médio"],
                ["Xigncode3", "Wellbia", "Black Desert Online, muitos MMOs asiáticos", "Médio"],
              ].map(([sistema, dev, jogos, nivel], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-medium text-sm">{sistema}</td>
                  <td className="p-3 text-muted-foreground text-sm">{dev}</td>
                  <td className="p-3 text-muted-foreground text-xs">{jogos}</td>
                  <td className="p-3 text-sm">{nivel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Métodos de Detecção por Nível</h2>

        <h3>Nível 1 — Detecção de Processo</h3>
        <p>
          O sistema mais básico: verifica processos em execução por nome, janela ou assinatura:
        </p>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          {[
            { m: "Verificar lista de processos", d: "Lista todos os processos e compara com nomes conhecidos de cheats (cheatengine-x86_64.exe, mhyprot.sys, etc.)" },
            { m: "Verificar títulos de janelas", d: "Busca por janelas com 'Cheat Engine', 'Injector', 'WinRE' no título" },
            { m: "Hash de arquivos", d: "Calcula o hash do executável e compara com lista de cheats conhecidos" },
          ].map((item) => (
            <div key={item.m} className="border border-border rounded-xl p-3 bg-card">
              <h4 className="font-bold text-xs mb-1">{item.m}</h4>
              <p className="text-xs text-muted-foreground">{item.d}</p>
            </div>
          ))}
        </div>

        <h3>Nível 2 — Detecção de Memória</h3>
        <p>
          Verifica a integridade da memória do processo do jogo:
        </p>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          {[
            { m: "Verificação de integridade", d: "Calcula checksum de seções de código — detecta NOP e patches de memória" },
            { m: "Detecção de hooks de API", d: "Verifica se funções do Windows (ReadProcessMemory, etc.) foram interceptadas" },
            { m: "Detecção de injeção", d: "Monitora DLLs carregadas no processo — detecta injeção de código" },
          ].map((item) => (
            <div key={item.m} className="border border-border rounded-xl p-3 bg-card">
              <h4 className="font-bold text-xs mb-1">{item.m}</h4>
              <p className="text-xs text-muted-foreground">{item.d}</p>
            </div>
          ))}
        </div>

        <h3>Nível 3 — Kernel Mode (Ring 0)</h3>
        <p>
          Sistemas como o Vanguard (Riot) operam em modo kernel — o nível mais privilegiado do sistema:
        </p>
        <AlertBox type="info" title="Por que o Vanguard é tão eficaz">
          O Riot Vanguard roda como driver de kernel e inicia com o Windows (antes mesmo do jogo). Isso permite verificar drivers carregados, detectar cheats de kernel e verificar a integridade do sistema antes do jogo começar — muito mais difícil de burlar do que sistemas user-mode.
        </AlertBox>

        <h2>O que o CE Faz que é Detectável</h2>
        <CodeBlock
          title="Rastros do Cheat Engine"
          language="text"
          code={`Processo: cheatengine-x86_64.exe (nome padrão)
  Driver: dbk64.sys (driver do CE — assinatura muito conhecida)
  Handle: OpenProcess com PROCESS_VM_READ|PROCESS_VM_WRITE no processo do jogo
  Hooks: O CE hooks GetTickCount, QueryPerformanceCounter para speed hack
  DLLs: Se você usar code injection, uma DLL é injetada no processo do jogo`}
        />
      </PageContainer>
    );
  }
  