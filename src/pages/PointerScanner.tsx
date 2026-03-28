import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function PointerScanner() {
  return (
    <PageContainer
      title="Pointer Scanner"
      subtitle="Use o scanner automático do Cheat Engine para encontrar cadeias de ponteiros."
      difficulty="intermediário"
      timeToRead="10 min"
    >
      <AlertBox type="info" title="O que é">
        O Pointer Scanner é uma ferramenta automática que procura cadeias de ponteiros que levam a um endereço alvo. É muito mais rápido que o método manual para ponteiros multinível.
      </AlertBox>

      <h2>Abrindo o Pointer Scanner</h2>
      <p>
        Vá em <strong>Tools → Pointer scanner → Scan for pointer</strong>. Você também pode abrir pelo ícone de seta na barra de ferramentas.
      </p>

      <h2>Configuração do Scan</h2>
      <ol>
        <li><strong>Address to find:</strong> cole o endereço dinâmico que você quer um ponteiro permanente</li>
        <li><strong>Max offset value:</strong> o maior offset possível entre ponteiros (padrão 1000-4095 é bom)</li>
        <li><strong>Max level:</strong> quantos níveis de ponteiro (começa com 3-4)</li>
        <li><strong>Use saved pointermap:</strong> marque se já salvou um mapa anterior</li>
      </ol>

      <h2>Salvando o Pointer Map</h2>
      <p>
        Antes de escanear, salve um <strong>Pointer Map</strong> do estado atual. Isso permite fazer comparações entre sessões para encontrar os ponteiros mais estáveis:
      </p>
      <ol>
        <li>Clique em <strong>"Save pointer map"</strong></li>
        <li>Nomeie o arquivo (ex: <code>session1.pmap</code>)</li>
        <li>Reinicie o jogo, encontre o novo endereço dinâmico</li>
        <li>Abra o Pointer Scanner novamente com o novo endereço</li>
        <li>Marque "Use saved pointermap" e carregue o arquivo anterior</li>
        <li>Os ponteiros que aparecem em ambas as sessões são os estáveis!</li>
      </ol>

      <h2>Interpretando os Resultados</h2>
      <p>
        O resultado mostra linhas como:
      </p>
      <div className="bg-muted rounded-lg p-4 my-4 not-prose font-mono text-sm space-y-1">
        <div><span className="text-primary">game.exe</span>+0x1A2B30 → +0x4C</div>
        <div><span className="text-primary">game.exe</span>+0x3F8A00 → +0x10 → +0x4C</div>
        <div><span className="text-primary">game.exe</span>+0x002B10 → +0x8 → +0x18 → +0x4C</div>
      </div>
      <p>
        Prefira ponteiros com menos níveis (mais diretos) e com base em <code>game.exe</code> (estático). Aqueles com base em DLLs também funcionam se a DLL sempre carrega no mesmo endereço.
      </p>

      <AlertBox type="warning" title="Resultados em Massa">
        O Pointer Scanner pode retornar milhares de resultados. Filtre por nível máximo de 3-4 e use comparação entre sessões para encontrar os mais confiáveis.
      </AlertBox>
    </PageContainer>
  );
}
