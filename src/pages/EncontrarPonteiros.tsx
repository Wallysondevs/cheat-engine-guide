import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function EncontrarPonteiros() {
    return (
      <PageContainer
        title="Encontrando Ponteiros"
        subtitle="Técnicas manuais e automáticas para descobrir ponteiros estáticos para qualquer valor."
        difficulty="intermediário"
        timeToRead="14 min"
      >
        <p>
          Encontrar ponteiros é a etapa que transforma um cheat temporário (que para de funcionar ao reiniciar o jogo) em um cheat permanente. Existem abordagens manuais e automáticas para fazer isso.
        </p>

        <h2>Método 1: Pointer Scanner (Automático)</h2>
        <p>
          O método mais fácil: o CE varre a memória automaticamente em busca de caminhos de ponteiros.
        </p>
        <CodeBlock
          title="Usando o Pointer Scanner"
          language="text"
          code={`1. Encontre o endereço dinâmico do valor
  2. Clique direito → "Pointer scan for this address"
  3. Configurações: Max level 5, Max offset 0x1000, Only static addresses
  4. Salve o arquivo .ptr quando solicitado
  5. Reinicie o jogo → encontre o novo endereço do valor
  6. Na janela do Pointer Scanner: Pointer Scanner → Rescan Memory
  7. Informe o novo endereço → filtrar resultados
  8. Repita 3-5 vezes para confirmar`}
        />

        <h2>Método 2: What Writes / What Reads</h2>
        <p>
          Descubra quais instruções de Assembly acessam o endereço e trace manualmente os ponteiros:
        </p>
        <CodeBlock
          title="Usando What Writes to This Address"
          language="text"
          code={`1. Clique direito no endereço → "Find out what writes to this address"
  2. Uma janela se abre monitorando acessos
  3. Faça o valor mudar no jogo (tome dano, gaste ouro, etc.)
  4. A instrução que escreveu aparece na lista — ex:
     MOV [EBX+0x4C], EAX

  5. O registrador EBX contém o endereço base do objeto
  6. Clique em "Show disassembler" para ver o contexto
  7. Trace EBX para encontrar de onde ele vem (stack, outro ponteiro, etc.)`}
        />

        <h2>Método 3: Dissect Data Structure</h2>
        <p>
          Após encontrar o endereço base de um objeto, o CE pode mapear automaticamente toda a estrutura:
        </p>
        <div className="not-prose grid grid-cols-1 gap-3 my-4">
          {[
            { n: "1", passo: "Abra Tools → Dissect Data/Structures", desc: "Disponível no menu Tools do CE" },
            { n: "2", passo: "Informe o endereço base do objeto", desc: "O endereço que contém o EBX que você encontrou no passo anterior" },
            { n: "3", passo: "Defina o tamanho da estrutura", desc: "Tente 256 ou 512 bytes primeiro — você pode ampliar depois" },
            { n: "4", passo: "Interaja com o jogo", desc: "Ganhe/perca vida, XP, etc. O CE mostrará quais offsets mudam" },
            { n: "5", passo: "Identifique os offsets", desc: "Você verá os valores em cada offset — identifique o que é vida, XP, mana, etc." },
          ].map((item) => (
            <div key={item.n} className="flex gap-3 p-3 border border-border rounded-xl bg-card">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">{item.n}</span>
              <div>
                <h4 className="font-bold text-sm mb-0.5">{item.passo}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>Identificando Endereços Estáticos</h2>
        <p>
          O objetivo final é encontrar um endereço estático que aponte para o valor. No CE:
        </p>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          {[
            { cor: "Verde ✅", desc: "Endereço estático — começa com o nome do módulo (ex: 'game.exe'+0x4A3B2). Sempre o mesmo.", bom: true },
            { cor: "Preto ❌", desc: "Endereço dinâmico — número hexadecimal puro. Muda a cada sessão. Precisa de ponteiro.", bom: false },
          ].map((item) => (
            <div key={item.cor} className={`border rounded-xl p-4 ${item.bom ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
              <h4 className="font-bold text-sm mb-1">{item.cor}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <AlertBox type="tip" title="Dica — Filtre por Módulo no Pointer Scanner">
          Na configuração do Pointer Scanner, marque "Pointer must point to module" e selecione o executável principal. Isso reduz drasticamente o número de resultados e os ponteiros encontrados são mais estáveis.
        </AlertBox>
      </PageContainer>
    );
  }
  