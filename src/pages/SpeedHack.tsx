import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function SpeedHack() {
    return (
      <PageContainer
        title="Speed Hack"
        subtitle="Como acelerar ou desacelerar o tempo de execução de um jogo com o Speed Hack do Cheat Engine."
        difficulty="iniciante"
        timeToRead="10 min"
      >
        <p>
          O Speed Hack é uma funcionalidade do Cheat Engine que intercepta as chamadas de tempo do sistema operacional usadas pelo jogo, retornando valores diferentes. O jogo "acha" que mais (ou menos) tempo passou — fazendo tudo rodar mais rápido ou mais lento.
        </p>

        <h2>Como Ativar o Speed Hack</h2>
        <div className="not-prose grid grid-cols-1 gap-3 my-4">
          {[
            { n: "1", passo: "Abra o Cheat Engine e anexe ao processo", desc: "Selecione o jogo via 'Select a process to open'" },
            { n: "2", passo: "Marque a opção 'Enable Speedhack'", desc: "Fica no painel principal, abaixo do seletor de processo" },
            { n: "3", passo: "Ajuste o multiplicador de velocidade", desc: "O valor padrão é 1.0 (velocidade normal). Tente 2.0 para dobrar." },
            { n: "4", passo: "Pressione Apply", desc: "O jogo imediatamente fica mais rápido ou lento." },
          ].map((item) => (
            <div key={item.n} className="flex gap-4 p-4 border border-border rounded-xl bg-card">
              <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">{item.n}</span>
              <div>
                <h4 className="font-bold text-sm mb-1">{item.passo}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>Valores de Velocidade</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Valor</th>
                <th className="p-3 text-left">Efeito</th>
                <th className="p-3 text-left">Uso prático</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["0.1 – 0.5", "Câmera lenta", "Estudar movimentos complexos, gravar vídeos em slow-mo"],
                ["0.5 – 0.9", "Ligeiramente mais lento", "Facilitar momentos difíceis sem remover o desafio"],
                ["1.0", "Velocidade normal", "Desativar o speed hack"],
                ["2.0 – 5.0", "Modo rápido", "Pular fases longas, grinding acelerado"],
                ["10.0 – 50.0", "Extremamente rápido", "Testar mecânicas, pular cenas longas"],
              ].map(([valor, efeito, uso], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-sm">{valor}</td>
                  <td className="p-3 text-sm">{efeito}</td>
                  <td className="p-3 text-muted-foreground text-sm">{uso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AlertBox type="warning" title="Nem todos os jogos respondem ao Speed Hack">
          Jogos que usam timers próprios, servidores externos ou DRM avançado podem não responder ao speed hack, ou podem detectá-lo. Jogos online frequentemente têm verificações de tempo no servidor, então o speed hack só afeta o cliente — causando dessincronização ou ban.
        </AlertBox>

        <h2>Speed Hack com Hotkeys</h2>
        <p>
          Configure hotkeys para alternar entre velocidades rapidamente durante o jogo:
        </p>
        <CodeBlock
          title="Configurando hotkeys de velocidade"
          language="text"
          code={`1. Com o Speed Hack ativo, clique com botão direito no campo de velocidade
  2. Selecione "Set hotkey for this value"
  3. Configure uma tecla (ex: F5 = velocidade 2.0, F6 = velocidade 0.5, F7 = normal 1.0)

  Alternativa via Lua:
  speedhack_setSpeed(2.0)  -- define velocidade por script`}
        />

        <h2>Speed Hack via Lua</h2>
        <CodeBlock
          title="Controle de velocidade por script"
          language="lua"
          code={`-- Ativar speed hack via Lua
  speedhack_setSpeed(3.0)  -- 3x mais rápido

  -- Desativar (voltar ao normal)
  speedhack_setSpeed(1.0)

  -- Toggle entre normal e rápido
  local function toggleSpeed()
    local speed = speedhack_getSpeed()
    if speed == 1.0 then
      speedhack_setSpeed(3.0)
    else
      speedhack_setSpeed(1.0)
    end
  end`}
        />

        <AlertBox type="tip" title="Slow Motion para Estudar Boss Fights">
          O speed hack em 0.3-0.5x é uma excelente ferramenta para estudar os padrões de ataque de bosses difíceis. Ative o slow motion na hora do ataque para analisar a janela de esquiva com calma.
        </AlertBox>

        <h2>Limitações e Problemas Comuns</h2>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          {[
            { problema: "Física quebrada em alta velocidade", solucao: "Use valores moderados (até 5x). Acima disso, colisões e física podem falhar." },
            { problema: "Áudio dessincronizado", solucao: "O áudio geralmente não é afetado pelo speed hack. Use para jogos com pouco áudio narrativo." },
            { problema: "Jogo trava ou crasha", solucao: "Reduza a velocidade. Alguns jogos têm limitação de fps que conflita com valores muito altos." },
            { problema: "Não funciona em jogo específico", solucao: "O jogo usa timer próprio. Tente encontrar o valor do timer na memória e modificá-lo diretamente." },
          ].map((item) => (
            <div key={item.problema} className="border border-border rounded-xl p-4 bg-card">
              <h4 className="font-bold text-sm mb-1 text-destructive">{item.problema}</h4>
              <p className="text-xs text-muted-foreground">{item.solucao}</p>
            </div>
          ))}
        </div>
      </PageContainer>
    );
  }
  