import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Tabelas() {
  return (
    <PageContainer
      title="Tabelas de Trapaça (.CT)"
      subtitle="Como criar, salvar e usar Cheat Tables — o formato de arquivo do Cheat Engine."
      difficulty="iniciante"
      timeToRead="6 min"
    >
      <h2>O que é uma Cheat Table?</h2>
      <p>
        Uma Cheat Table (<code>.CT</code>) é o formato de arquivo do Cheat Engine. Ela armazena tudo que você configurou: endereços, ponteiros, scripts Lua, hotkeys, grupos e comentários. É basicamente um "perfil de cheats" para um jogo específico.
      </p>

      <h2>Criar uma Nova Tabela</h2>
      <ol>
        <li>Abra o Cheat Engine e conecte ao processo do jogo</li>
        <li>Encontre e organize os endereços/cheats na Address List</li>
        <li>Vá em <strong>File → Save</strong> (ou <code>Ctrl+S</code>)</li>
        <li>Escolha um nome descritivo, ex: <code>NomeDoJogo_Cheats.CT</code></li>
      </ol>

      <h2>Usando uma Tabela Existente</h2>
      <ol>
        <li>Abra o Cheat Engine</li>
        <li>Vá em <strong>File → Open</strong> (ou <code>Ctrl+O</code>)</li>
        <li>Selecione o arquivo <code>.CT</code></li>
        <li>Uma mensagem perguntará se quer abrir o processo automaticamente — diga Sim se o jogo já estiver aberto</li>
        <li>Os endereços e scripts carregarão na Address List</li>
      </ol>

      <h2>Organizando sua Tabela</h2>
      <ul>
        <li><strong>Grupos:</strong> clique no ícone de pasta para criar grupos (ex: "Vida", "Recursos", "Velocidade")</li>
        <li><strong>Comentários:</strong> adicione entradas sem endereço que servem como cabeçalhos ou notas</li>
        <li><strong>Ordenar:</strong> arraste entradas para reordenar</li>
      </ul>

      <h2>Compartilhando Tabelas</h2>
      <p>
        O arquivo <code>.CT</code> é portátil — você pode compartilhar com outros jogadores. Os melhores lugares para encontrar e compartilhar tabelas são:
      </p>
      <ul>
        <li><strong>FearLess Cheat Engine:</strong> <code>fearlessrevolution.com</code> — maior comunidade de tabelas</li>
        <li><strong>Reddit r/cheatengine:</strong> discussões e compartilhamento</li>
        <li><strong>GitHub:</strong> muitos desenvolvedores publicam tabelas como repositórios</li>
      </ul>

      <AlertBox type="warning" title="Tabelas de Terceiros">
        Tenha cuidado ao baixar tabelas de desconhecidos. O formato .CT pode conter scripts Lua maliciosos. Use fontes confiáveis como o FearLess e verifique o conteúdo do script antes de executar.
      </AlertBox>
    </PageContainer>
  );
}
