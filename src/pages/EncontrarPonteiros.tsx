import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function EncontrarPonteiros() {
  return (
    <PageContainer
      title="Encontrar Ponteiros"
      subtitle="Técnica manual para encontrar ponteiros usando o recurso 'What writes to this address'."
      difficulty="intermediário"
      timeToRead="10 min"
    >
      <AlertBox type="info" title="Técnica Essencial">
        Esta técnica permite encontrar o código que modifica um valor e, a partir daí, rastrear o ponteiro até um endereço estático.
      </AlertBox>

      <h2>Passo 1 — Encontrar o Endereço do Valor</h2>
      <p>
        Primeiro, use a varredura normal para encontrar o endereço do valor (ex: a vida do personagem). Adicione-o à lista de endereços.
      </p>

      <h2>Passo 2 — "What Writes to This Address"</h2>
      <ol>
        <li>Clique com botão direito no endereço na lista</li>
        <li>Selecione <strong>"Find out what writes to this address"</strong></li>
        <li>Uma janela aparecerá monitorando o endereço</li>
        <li>Volte ao jogo e faça algo que mude o valor (tome dano)</li>
        <li>O CE registrará as instruções que escreveram no endereço</li>
      </ol>

      <h2>Passo 3 — Analisando a Instrução</h2>
      <p>
        Após ver instruções na lista, clique em uma delas e depois em <strong>"Show disassembler"</strong>. Você verá o código assembly que modifica o valor. Algo como:
      </p>
      <div className="bg-muted rounded-lg p-4 my-4 not-prose font-mono text-sm">
        <div><span className="text-primary">mov</span> <span className="text-amber-500">[esi+0x4C]</span>, eax</div>
        <div className="text-muted-foreground mt-1 text-xs">
          → ESI é o ponteiro para a estrutura do personagem. +0x4C é o offset da vida.
        </div>
      </div>

      <h2>Passo 4 — Encontrar o Valor de ESI</h2>
      <p>
        O registrador <code>ESI</code> (ou RCX, RDX, etc.) contém o endereço base do objeto. Na janela "What writes", você pode ver o valor dos registradores no momento da escrita. Copie o valor de ESI.
      </p>

      <h2>Passo 5 — Encontrar o Ponteiro para ESI</h2>
      <ol>
        <li>No CE, faça uma nova varredura por <strong>Exact Value</strong> com o valor de ESI</li>
        <li>Encontre o endereço que contém o valor de ESI</li>
        <li>Se esse endereço for verde (estático), você encontrou o ponteiro!</li>
        <li>Se for preto, repita o processo para encontrar o ponteiro do ponteiro</li>
      </ol>

      <h2>Configurando o Ponteiro no CE</h2>
      <ol>
        <li>Na lista de endereços, clique em <strong>"Add address manually"</strong></li>
        <li>Marque <strong>"Pointer"</strong></li>
        <li>No campo "Base address", coloque o endereço estático encontrado</li>
        <li>No campo "Offsets", adicione o offset (ex: 0x4C)</li>
        <li>Confirme — agora o endereço funcionará mesmo após reiniciar o jogo</li>
      </ol>

      <AlertBox type="tip" title="Use o Pointer Scanner">
        Para casos complexos com múltiplos níveis de ponteiro, use o Pointer Scanner automático do CE. Ele encontra toda a cadeia de ponteiros automaticamente.
      </AlertBox>
    </PageContainer>
  );
}
