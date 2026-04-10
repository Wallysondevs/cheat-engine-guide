import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Tutorial() {
    return (
      <PageContainer
        title="Tutorial Integrado"
        subtitle="Complete o tutorial oficial do Cheat Engine para aprender os conceitos fundamentais na prática."
        difficulty="iniciante"
        timeToRead="20 min"
      >
        <p>
          O Cheat Engine vem com um tutorial integrado — um programa de treinamento que simula um jogo com diferentes desafios de memória. Completar o tutorial é a melhor forma de aprender as técnicas fundamentais.
        </p>

        <h2>Abrindo o Tutorial</h2>
        <CodeBlock
          title="Como abrir o tutorial do CE"
          language="text"
          code={`Opção 1: Help → Cheat Engine Tutorial (no menu principal)
  Opção 2: Procure "Tutorial-i386.exe" ou "Tutorial-x86_64.exe" 
           na pasta de instalação do CE
           C:\Program Files\Cheat Engine 7.5\Tutorial-x86_64.exe

  Após abrir: anexe o CE ao processo do Tutorial
  (ícone de computador → selecione Tutorial na lista)`}
        />

        <h2>Passos do Tutorial</h2>
        <div className="not-prose grid grid-cols-1 gap-3 my-4">
          {[
            {
              step: "Step 1 — Introdução",
              desc: "Apresentação do tutorial. Leia as instruções e clique Next.",
              tecnica: "Conceitual"
            },
            {
              step: "Step 2 — Exact Value Scan",
              desc: "Encontre o valor exato da vida (100). Faça a varredura, tome dano, faça Next Scan, modifique.",
              tecnica: "Exact Value"
            },
            {
              step: "Step 3 — Unknown Initial Value",
              desc: "A barra de vida não mostra o número. Use Unknown Initial Value + Changed/Unchanged para encontrar.",
              tecnica: "Unknown Value"
            },
            {
              step: "Step 4 — Float",
              desc: "O valor está armazenado como ponto flutuante (float). Mude o tipo de scan para Float.",
              tecnica: "Float Scan"
            },
            {
              step: "Step 5 — Code Finder",
              desc: "O endereço muda constantemente. Use o Code Finder para encontrar e modificar a instrução que escreve o valor.",
              tecnica: "Code Finder / AOB"
            },
            {
              step: "Step 6 — Pointer",
              desc: "O endereço muda ao clicar em 'Change Pointer'. Use Pointer Scan para encontrar o ponteiro estático.",
              tecnica: "Pointer"
            },
            {
              step: "Step 7 — Code Injection",
              desc: "Injete código Assembly para modificar o comportamento — a vida nunca decresce.",
              tecnica: "Code Injection"
            },
            {
              step: "Step 8 — Multilevel Pointer",
              desc: "Um ponteiro com múltiplos offsets. Siga a cadeia manualmente ou use o Pointer Scanner.",
              tecnica: "Multi-Level Pointer"
            },
            {
              step: "Step 9 — Shared Code",
              desc: "A instrução que reduz a vida é compartilhada entre o jogador e os inimigos. Modifique apenas a do jogador.",
              tecnica: "Code Injection Avançada"
            },
          ].map((item) => (
            <div key={item.step} className="border border-border rounded-xl p-4 bg-card">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-sm">{item.step}</h4>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{item.tecnica}</span>
              </div>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2>Dicas para Completar o Tutorial</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Step</th>
                <th className="p-3 text-left">Dica</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Step 3", "Clique em 'Hit Me' várias vezes — use 'Decreased Value' após cada clique, 'Unchanged' quando não clicar"],
                ["Step 4", "Troque o tipo para Float antes de escanear. O valor é 100.0 mas está em formato float."],
                ["Step 5", "Use 'Find out what writes' no endereço → a instrução aparece → clique em 'Change value of instruction'"],
                ["Step 6", "Pointer Scan → reinicie o tutorial (botão restart) → rescan → o ponteiro válido permanece"],
                ["Step 7", "No Code Injection, mude 'sub' (subtrair) para 'add' (somar) — você recupera vida ao invés de perder"],
                ["Step 9", "Use registradores para verificar: EBX+0x? aponta para o jogador vs inimigo. Compare antes de injetar."],
              ].map(([step, dica], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-sm">{step}</td>
                  <td className="p-3 text-muted-foreground text-sm">{dica}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AlertBox type="tip" title="Refaça o Tutorial Várias Vezes">
          O tutorial do CE é curto mas denso. Cada vez que você refaz, entende algo novo. Tente completar cada passo de formas diferentes — sem o Pointer Scanner, ou escrevendo o Assembly manualmente.
        </AlertBox>
      </PageContainer>
    );
  }
  