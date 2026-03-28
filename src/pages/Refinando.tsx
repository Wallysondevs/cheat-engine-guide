import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Refinando() {
  return (
    <PageContainer
      title="Refinando Resultados"
      subtitle="Técnicas para reduzir rapidamente centenas de resultados até encontrar o endereço exato."
      difficulty="iniciante"
      timeToRead="6 min"
    >
      <AlertBox type="info" title="O Objetivo">
        Após a primeira varredura você pode ter milhões de resultados. O refinamento progressivo filtra esses resultados até sobrar apenas o endereço correto.
      </AlertBox>

      <h2>Técnicas de Refinamento</h2>

      <h3>1. Varreduras Repetidas com Novo Valor</h3>
      <p>
        A técnica mais básica: mude o valor no jogo, anote o novo valor, faça Next Scan. Repita até poucos resultados. Funciona para a maioria dos valores simples.
      </p>

      <h3>2. Filtrar por Intervalo de Memória</h3>
      <p>
        No painel de scan, você pode definir um intervalo de endereços para buscar (Start e Stop address). Valores de jogo geralmente ficam em regiões específicas da memória — experimentar intervalos menores acelera a busca.
      </p>

      <h3>3. Usar "Unchanged Value" Estrategicamente</h3>
      <p>
        Quando o valor que você busca não muda por um período, use Next Scan com "Unchanged Value" para eliminar endereços que flutuaram por outras razões.
      </p>

      <h3>4. Ordenar por Endereço</h3>
      <p>
        Na lista de resultados, clique na coluna "Address" para ordenar. Endereços estáticos (que não mudam entre sessões) geralmente ficam em regiões mais altas da memória. Endereços de pilha e heap ficam em regiões mais baixas.
      </p>

      <h3>5. Verificar em Tempo Real</h3>
      <p>
        Quando restar menos de ~20 endereços, selecione todos (Ctrl+A) e adicione à lista de endereços. Observe quais valores mudam em sincronia com o que você está monitorando no jogo.
      </p>

      <AlertBox type="warning" title="Cuidado com Ponteiros Temporários">
        Alguns endereços encontrados são temporários — mudam a cada reinicialização do jogo ou fase. Se o cheat parou de funcionar após reiniciar, você precisa aprender sobre <strong>ponteiros estáticos</strong> (próximo tópico).
      </AlertBox>

      <h2>Cenário: Muitos Resultados Persistem</h2>
      <p>Se após 5+ varreduras ainda restar centenas de resultados, tente:</p>
      <ul>
        <li>Mudar o tipo de dados (tente Float se estava usando 4 Bytes)</li>
        <li>Usar "Value between X and Y" com um intervalo mais estreito</li>
        <li>Fechar outros programas para reduzir o "ruído" de memória</li>
        <li>Verificar se o jogo usa valores criptografados (CE tem suporte a isso em versões recentes)</li>
      </ul>
    </PageContainer>
  );
}
