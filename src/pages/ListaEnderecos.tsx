import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function ListaEnderecos() {
  return (
    <PageContainer
      title="Lista de Endereços"
      subtitle="Como gerenciar, nomear e organizar os endereços que você encontrou."
      difficulty="iniciante"
      timeToRead="6 min"
    >
      <h2>O que é a Lista de Endereços?</h2>
      <p>
        O painel inferior do Cheat Engine é a <strong>Address List</strong> — sua área de trabalho onde você salva e gerencia os endereços que encontrou. É aqui que você organiza todos os cheats de um jogo específico.
      </p>

      <h2>Adicionando Endereços</h2>
      <ul>
        <li><strong>Duplo clique</strong> em um resultado da lista superior para adicioná-lo</li>
        <li><strong>Botão "Add address manually"</strong> (ícone de +) para adicionar um endereço que você já conhece</li>
        <li><strong>Selecionar múltiplos</strong> + Enter para adicionar vários de uma vez</li>
      </ul>

      <h2>Colunas da Lista</h2>
      <div className="space-y-2 my-4 not-prose">
        {[
          { col: "Active (checkbox)", desc: "Quando marcado, o Freeze está ativo — o valor é mantido travado" },
          { col: "Description", desc: "Nome que você dá ao endereço. Duplo clique para renomear." },
          { col: "Address", desc: "Endereço hexadecimal na memória. Verde = estático, preto = dinâmico" },
          { col: "Type", desc: "Tipo do dado (4 Bytes, Float, etc.)" },
          { col: "Value", desc: "Valor atual. Duplo clique para modificar manualmente." },
        ].map((item, i) => (
          <div key={i} className="flex gap-3 border border-border rounded p-3 bg-card">
            <code className="text-primary text-xs font-mono shrink-0">{item.col}</code>
            <span className="text-sm text-muted-foreground">{item.desc}</span>
          </div>
        ))}
      </div>

      <h2>Operações na Lista</h2>
      <ul>
        <li><strong>Renomear:</strong> duplo clique na descrição</li>
        <li><strong>Modificar valor:</strong> duplo clique na coluna Value</li>
        <li><strong>Ativar Freeze:</strong> marcar o checkbox da coluna Active</li>
        <li><strong>Deletar:</strong> selecionar + tecla Delete</li>
        <li><strong>Organizar em grupos:</strong> botão "Add group" para criar pastas</li>
      </ul>

      <h2>Salvando como Tabela (.CT)</h2>
      <p>
        Vá em <strong>File → Save</strong> para salvar todos os endereços, scripts e configurações em um arquivo <code>.CT</code> (Cheat Table). Na próxima sessão, abra o arquivo com <strong>File → Open</strong> e seus cheats estarão disponíveis novamente.
      </p>

      <AlertBox type="warning" title="Endereços Dinâmicos">
        Endereços que mudam a cada sessão (mostrados em preto) não funcionarão se você fechar e reabrir o jogo. Para cheats permanentes, você precisa usar ponteiros estáticos.
      </AlertBox>
    </PageContainer>
  );
}
