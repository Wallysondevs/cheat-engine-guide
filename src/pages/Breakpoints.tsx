import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function Breakpoints() {
  return (
    <PageContainer
      title="Breakpoints"
      subtitle="Use breakpoints para pausar a execução do jogo e inspecionar o estado da memória em tempo real."
      difficulty="avançado"
      timeToRead="10 min"
    >
      <AlertBox type="info" title="O que são Breakpoints?">
        Breakpoints são pontos de parada na execução do programa. Quando o CPU atinge um breakpoint, o jogo pausa e o Cheat Engine mostra o estado atual dos registradores e da memória.
      </AlertBox>

      <h2>Tipos de Breakpoints no CE</h2>
      <div className="space-y-3 my-4 not-prose">
        {[
          { tipo: "Software Breakpoint (INT3)", desc: "Substitui a instrução por INT3. Fácil de detectar por anti-cheats. Pausa na execução da instrução.", melhor: "Debug básico" },
          { tipo: "Hardware Breakpoint (DR0-DR3)", desc: "Usa os registradores de debug do hardware. Mais difícil de detectar. Limitado a 4 breakpoints simultâneos.", melhor: "Anti-cheat evasion" },
          { tipo: "Memory Breakpoint", desc: "Monitora uma região de memória e pausa quando é lida/escrita/executada.", melhor: "Encontrar código que acessa um dado" },
        ].map((item, i) => (
          <div key={i} className="border border-border rounded-lg p-3 bg-card">
            <div className="font-semibold text-sm">{item.tipo}</div>
            <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            <div className="text-xs text-primary mt-1">Melhor para: {item.melhor}</div>
          </div>
        ))}
      </div>

      <h2>Setando um Breakpoint</h2>
      <ol>
        <li>Abra o Memory View e navegue até a instrução desejada</li>
        <li>Clique com botão direito na instrução</li>
        <li>Selecione <strong>"Set breakpoint"</strong> ou pressione <code>F5</code></li>
        <li>A instrução ficará marcada em vermelho</li>
        <li>Quando o jogo executar essa instrução, a execução pausará</li>
      </ol>

      <h2>Quando o Breakpoint É Atingido</h2>
      <p>
        O jogo congela e o CE exibe o estado atual:
      </p>
      <ul>
        <li><strong>Registradores:</strong> EAX, EBX, ECX, EDX, ESI, EDI, ESP, EBP, EIP (x86)</li>
        <li><strong>Stack:</strong> valores na pilha de execução</li>
        <li><strong>Memória:</strong> bytes ao redor do ponto de parada</li>
      </ul>
      <p>
        Você pode usar <code>F7</code> (Step Into) ou <code>F8</code> (Step Over) para executar instrução por instrução.
      </p>

      <h2>Breakpoint Condicional</h2>
      <CodeBlock
        title="Exemplo — Breakpoint Lua"
        language="lua"
        code={`
-- Pausa apenas quando EAX < 10 (vida crítica)
if EAX < 10 then
  return true   -- pausar execução
end
return false    -- continuar sem pausar
        `}
      />

      <AlertBox type="warning" title="Atenção com Anti-Cheat">
        Jogos com proteção anti-cheat detectam debuggers ativos. Use <strong>Hardware Breakpoints</strong> em vez de Software Breakpoints, e considere usar o <strong>DBVM</strong> (hypervisor do CE) para maior invisibilidade.
      </AlertBox>
    </PageContainer>
  );
}
