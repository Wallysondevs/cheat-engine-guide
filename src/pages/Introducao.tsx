import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Introducao() {
    return (
      <PageContainer
        title="Introdução ao Cheat Engine"
        subtitle="O que é o Cheat Engine, para que serve e como ele funciona por baixo dos panos."
        difficulty="iniciante"
        timeToRead="10 min"
      >
        <p>
          O <strong>Cheat Engine</strong> é uma ferramenta de código aberto para modificar jogos em tempo real. Desenvolvida por Eric "Dark Byte" Heijnen desde 2000, é a ferramenta mais poderosa e versátil para engenharia reversa de jogos no Windows.
        </p>

        <h2>O que você pode fazer com o Cheat Engine</h2>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          {[
            { recurso: "Modificar Valores", desc: "Altere vida, ouro, XP, munição, velocidade e qualquer outro valor armazenado na memória do jogo." },
            { recurso: "Freeze de Valores", desc: "Trave valores para que nunca diminuam — vida infinita, munição infinita, tempo congelado." },
            { recurso: "Speed Hack", desc: "Acelere ou desacelere o tempo de execução do jogo — útil para grinding ou estudar mecânicas." },
            { recurso: "Injeção de Código", desc: "Modifique o comportamento do jogo injetando instruções Assembly diretamente no executável em memória." },
            { recurso: "Pointer Scanner", desc: "Encontre ponteiros estáticos para tornar cheats permanentes entre sessões de jogo." },
            { recurso: "Lua Scripting", desc: "Automatize cheats complexos com scripts Lua — da teleportação a trainers completos." },
          ].map((item) => (
            <div key={item.recurso} className="border border-border rounded-xl p-4 bg-card">
              <h4 className="font-bold text-sm mb-1 text-primary">{item.recurso}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2>Como o Cheat Engine Funciona</h2>
        <p>
          O CE funciona como um <strong>debugger de processo</strong>: ele se anexa a um processo em execução (o jogo) e ganha acesso à memória dele. Com isso, pode ler, escrever e monitorar qualquer valor em memória.
        </p>
        <CodeBlock
          title="Fluxo básico de uso"
          language="text"
          code={`1. Abra o jogo normalmente
  2. Abra o Cheat Engine
  3. Clique no ícone de computador (canto superior esquerdo)
  4. Selecione o processo do jogo na lista
  5. Configure o tipo de dado e valor a buscar
  6. Clique em "First Scan"
  7. Cause mudança no jogo (tome dano, gaste ouro, etc.)
  8. Use "Next Scan" com o novo valor
  9. Repita até encontrar o endereço correto
  10. Adicione à Address List e modifique`}
        />

        <h2>Terminologia Essencial</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Termo</th>
                <th className="p-3 text-left">Definição</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Processo", "O programa em execução (o jogo). O CE se 'anexa' a ele."],
                ["Memória RAM", "Onde o jogo armazena todos os dados em tempo real — vida, posição, inventário."],
                ["Endereço de memória", "Um número hexadecimal que indica onde na RAM um valor está armazenado."],
                ["Varredura (Scan)", "Busca por valores específicos em toda a memória do processo."],
                ["Address List", "Lista onde você adiciona endereços que encontrou para monitorar/modificar."],
                ["Freeze", "Manter um valor constante, mesmo que o jogo tente alterá-lo."],
                ["Ponteiro", "Um endereço que contém o endereço do dado real — necessário para cheats persistentes."],
                ["Assembly", "Linguagem de baixo nível usada para injeção de código avançada no CE."],
              ].map(([termo, def], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-mono text-primary text-sm">{termo}</td>
                  <td className="p-3 text-muted-foreground text-sm">{def}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AlertBox type="info" title="Cheat Engine é open source">
          O código-fonte do CE está disponível no GitHub (github.com/cheat-engine/cheat-engine). Ele é gratuito e tem uma comunidade enorme. O download oficial é em cheatengine.org — evite versões de sites de terceiros que podem conter malware.
        </AlertBox>

        <AlertBox type="warning" title="Use com responsabilidade">
          O Cheat Engine é proibido em jogos online multiplayer pela maioria dos desenvolvedores. Use apenas em jogos single-player ou em ambientes onde cheats são permitidos. Respeite outros jogadores.
        </AlertBox>
      </PageContainer>
    );
  }
  