import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Evasao() {
    return (
      <PageContainer
        title="Evasão de Anti-Cheat"
        subtitle="Técnicas para usar o Cheat Engine sem ser detectado por sistemas de proteção de jogos."
        difficulty="avançado"
        timeToRead="14 min"
      >
        <AlertBox type="warning" title="Aviso importante">
          Este guia é para fins educacionais e para uso em jogos single-player. Usar cheats em jogos online multiplayer pode resultar em ban permanente e prejudica a experiência de outros jogadores. Respeite os termos de serviço dos jogos.
        </AlertBox>

        <p>
          Sistemas anti-cheat detectam ferramentas como o Cheat Engine de várias formas: pelo nome do processo, pelas handles abertas, por modificações de memória suspeitas, por drivers injetados, etc. A evasão envolve esconder esses rastros.
        </p>

        <h2>Como Anti-Cheats Detectam o Cheat Engine</h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Método de Detecção</th>
                <th className="p-3 text-left">Como funciona</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Nome do processo", "Verifica se 'cheatengine-x86_64.exe' ou similar está rodando"],
                ["Nome da janela", "Procura por janelas com 'Cheat Engine' no título"],
                ["Handles de processo", "Detecta que outro processo está lendo/escrevendo a memória do jogo"],
                ["Assinaturas de memória", "Procura padrões de bytes do CE injetados em memória"],
                ["Drivers de kernel", "O CE driver (dbk64.sys) é uma assinatura conhecida"],
                ["Hooks de API", "O CE intercepta APIs do Windows — anti-cheats verificam isso"],
              ].map(([metodo, como], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-medium text-sm">{metodo}</td>
                  <td className="p-3 text-muted-foreground text-sm">{como}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Técnicas Básicas de Evasão</h2>

        <h3>1. Renomear o Executável</h3>
        <p>A técnica mais simples: renomeie o executável do Cheat Engine antes de abrir:</p>
        <CodeBlock
          title="Renomear o CE"
          language="text"
          code={`Localize o arquivo:
  C:\Program Files\Cheat Engine 7.5\cheatengine-x86_64.exe

  Copie e renomeie para algo inócuo:
  explorer_helper.exe, driver_tool.exe, etc.

  Execute o arquivo renomeado — muitos anti-cheats básicos não detectam mais.`}
        />

        <h3>2. Usar o CE em Modo Driver Desativado</h3>
        <p>
          O driver do CE (dbk64.sys) é a maior assinatura conhecida. Para jogos que não exigem acesso kernel, você pode rodar o CE sem o driver:
        </p>
        <CodeBlock
          title="Desativar driver do CE"
          language="text"
          code={`Ao abrir o CE, aparece uma mensagem perguntando sobre o driver.
  Selecione "No" (não carregar o driver).
  O CE funcionará com permissões de usuário — mais limitado mas menos detectável.`}
        />

        <h3>3. Builds Customizadas do Cheat Engine</h3>
        <p>
          A comunidade mantém versões do CE com strings alteradas, assinaturas removidas e outras modificações para reduzir detecção. Busque por "Cheat Engine bypass build" em fóruns como UnknownCheats.
        </p>

        <h2>Técnicas Avançadas</h2>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          {[
            { tecnica: "Injeção via Handle Legítimo", desc: "Usar um processo que já tem handle no jogo (como o próprio Windows Explorer) para fazer a leitura/escrita — sem criar um handle externo suspeito." },
            { tecnica: "External Cheats", desc: "Ler memória sem escrever nela via ReadProcessMemory sem abrir handles suspicious. Apenas leitura é muito menos detectável." },
            { tecnica: "Kernel Driver Personalizado", desc: "Criar um driver próprio sem as assinaturas do CE. Requer conhecimento avançado de driver development e UEFI/Secure Boot." },
            { tecnica: "Virtualização", desc: "Rodar o jogo em VM e o CE fora dela, acessando memória via hypervisor. Detectável por jogos que verificam ambiente virtualizado." },
          ].map((item) => (
            <div key={item.tecnica} className="border border-border rounded-xl p-4 bg-card">
              <h4 className="font-bold text-sm mb-1">{item.tecnica}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <AlertBox type="info" title="Para Jogos Single-Player">
          A maioria dos jogos single-player não tem anti-cheat, ou usa proteções muito simples. Para esses jogos, nem é necessário evasão — o CE funciona diretamente. Renomear o executável resolve 90% dos casos.
        </AlertBox>
      </PageContainer>
    );
  }
  