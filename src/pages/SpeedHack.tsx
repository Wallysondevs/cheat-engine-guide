import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function SpeedHack() {
  return (
    <PageContainer
      title="Speed Hack"
      subtitle="Como usar o Speed Hack do Cheat Engine para controlar a velocidade de execução do jogo."
      difficulty="iniciante"
      timeToRead="5 min"
    >
      <AlertBox type="info" title="O que é o Speed Hack?">
        O Speed Hack manipula as chamadas de sistema de tempo (GetTickCount, QueryPerformanceCounter, etc.) para fazer o jogo "achar" que o tempo está passando mais rápido ou mais devagar. É uma forma de controlar a velocidade geral do jogo sem modificar código específico.
      </AlertBox>

      <h2>Ativando o Speed Hack</h2>
      <ol>
        <li>No Cheat Engine, com o processo do jogo aberto, vá em <strong>Edit → Settings → Hotkeys</strong></li>
        <li>Ou simplesmente procure a caixa <strong>"Enable Speedhack"</strong> na interface principal</li>
        <li>Defina o multiplicador de velocidade (ex: 2.0 = dobro da velocidade, 0.5 = metade)</li>
        <li>Clique em <strong>Apply</strong></li>
      </ol>

      <h2>Valores Comuns</h2>
      <div className="not-prose grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
        {[
          { val: "0.1", desc: "10% — câmera lenta extrema" },
          { val: "0.5", desc: "50% — câmera lenta" },
          { val: "1.0", desc: "Normal (padrão)" },
          { val: "2.0", desc: "2x — rápido" },
          { val: "5.0", desc: "5x — muito rápido" },
          { val: "10.0", desc: "10x — turbo" },
        ].map((item, i) => (
          <div key={i} className="border border-border rounded-lg p-3 bg-card text-center">
            <div className="text-2xl font-mono font-bold text-primary">{item.val}x</div>
            <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
          </div>
        ))}
      </div>

      <h2>Limitações do Speed Hack</h2>
      <ul>
        <li>Não funciona com todos os jogos — alguns usam servidores de tempo independentes</li>
        <li>Jogos online geralmente ignoram ou detectam o Speed Hack</li>
        <li>Pode causar bugs visuais ou de física em valores muito altos</li>
        <li>A IA do jogo também acelera — NPCs ficam mais rápidos igualmente</li>
      </ul>

      <h2>Hotkey para Speed Hack</h2>
      <p>
        Configure hotkeys para alternar rapidamente entre velocidades. Em <strong>Edit → Settings → Hotkeys → Speedhack</strong> você pode definir teclas para ativar/desativar e ajustar a velocidade.
      </p>

      <AlertBox type="tip" title="Uso Prático">
        Speed Hack é ótimo para acelerar seções entediantes (grinding, loading de mapas, cutscenes com skip desativado) ou para estudar mecânicas de jogos em câmera lenta.
      </AlertBox>
    </PageContainer>
  );
}
