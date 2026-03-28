import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function AntiCheat() {
  return (
    <PageContainer
      title="Proteções Anti-Cheat"
      subtitle="Como sistemas anti-cheat detectam o Cheat Engine e por que usar o CE em jogos online é arriscado."
      difficulty="avançado"
      timeToRead="10 min"
    >
      <AlertBox type="danger" title="Aviso Importante">
        Este tópico é puramente educacional. Usar cheats em jogos online viola os termos de serviço e pode resultar em banimento permanente. Use apenas em jogos single-player ou em ambientes controlados.
      </AlertBox>

      <h2>Como Anti-Cheats Detectam o CE</h2>
      <div className="space-y-3 my-4 not-prose">
        {[
          {
            metodo: "Detecção por Nome/Assinatura",
            desc: "O anti-cheat verifica se algum processo com nome \"cheatengine\", \"ce.exe\" ou assinaturas conhecidas está em execução. Simples, mas eficaz contra usuários iniciantes.",
            nivel: "Básico"
          },
          {
            metodo: "Detecção de Driver",
            desc: "O CE instala um driver de kernel (dbk64.sys) para acesso de memória privilegiado. Anti-cheats em modo kernel listam todos os drivers e blacklistam o do CE.",
            nivel: "Intermediário"
          },
          {
            metodo: "Detecção de Debugger",
            desc: "APIs como IsDebuggerPresent(), CheckRemoteDebuggerPresent() e NtQueryInformationProcess() detectam debuggers ativos. O CE usa técnicas para contornar isso, mas não sempre.",
            nivel: "Intermediário"
          },
          {
            metodo: "Integrity Check",
            desc: "O jogo verifica se seu próprio código foi modificado (checksums do executável e da memória). Code injection altera essas verificações.",
            nivel: "Avançado"
          },
          {
            metodo: "Kernel-Level Anti-Cheat",
            desc: "Software como EasyAntiCheat, BattlEye e Vanguard rodam como drivers de kernel com privilégios máximos, monitorando o sistema inteiro em tempo real.",
            nivel: "Muito Avançado"
          },
        ].map((item, i) => (
          <div key={i} className="border border-border rounded-lg p-3 bg-card">
            <div className="flex items-center gap-2 mb-1">
              <div className="font-semibold text-sm">{item.metodo}</div>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                item.nivel === "Básico" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                item.nivel === "Intermediário" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              }`}>{item.nivel}</span>
            </div>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Anti-Cheats Conhecidos</h2>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-muted text-left">
              <th className="border border-border px-3 py-2">Anti-Cheat</th>
              <th className="border border-border px-3 py-2">Nível</th>
              <th className="border border-border px-3 py-2">Jogos</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["VAC (Valve)", "Kernel", "CS2, Dota 2, TF2"],
              ["EasyAntiCheat", "Kernel", "Fortnite, Rust, Dead by Daylight"],
              ["BattlEye", "Kernel", "PUBG, Rainbow Six, DayZ"],
              ["Vanguard (Riot)", "Kernel + Boot", "Valorant, League of Legends"],
              ["Ricochet (Activision)", "Kernel", "Call of Duty"],
            ].map(([ac, nivel, jogos], i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                <td className="border border-border px-3 py-2 font-semibold text-sm">{ac}</td>
                <td className="border border-border px-3 py-2 text-xs text-red-600 dark:text-red-400">{nivel}</td>
                <td className="border border-border px-3 py-2 text-xs text-muted-foreground">{jogos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertBox type="tip" title="Conclusão Educacional">
        Entender como anti-cheats funcionam é valioso para quem desenvolve jogos e quer implementar proteções, ou para pesquisadores de segurança. Fora do ambiente educacional/single-player, respeite as regras dos jogos online.
      </AlertBox>
    </PageContainer>
  );
}
