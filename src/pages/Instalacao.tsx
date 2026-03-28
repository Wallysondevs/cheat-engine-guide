import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { useState } from "react";
import { cn } from "@/lib/utils";

type OS = "windows" | "linux";

export default function Instalacao() {
  const [os, setOs] = useState<OS>("windows");

  return (
    <PageContainer
      title="Download e Instalação"
      subtitle="Como baixar, instalar e configurar o Cheat Engine com segurança no Windows e Linux."
      difficulty="iniciante"
      timeToRead="8 min"
    >
      <AlertBox type="danger" title="Cuidado com Sites Falsos">
        Existem sites que hospedam versões modificadas do Cheat Engine com malware real. Use apenas o site oficial <strong>cheatengine.org</strong> ou o repositório GitHub oficial: <strong>github.com/cheat-engine/cheat-engine</strong>.
      </AlertBox>

      {/* OS Switcher */}
      <div className="not-prose flex gap-2 my-6">
        {(["windows", "linux"] as OS[]).map(o => (
          <button
            key={o}
            onClick={() => setOs(o)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium border transition-colors",
              os === o
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:text-foreground hover:bg-muted"
            )}
          >
            {o === "windows" ? "🪟 Windows" : "🐧 Linux"}
          </button>
        ))}
      </div>

      {/* ── WINDOWS ──────────────────────────────────────── */}
      {os === "windows" && (
        <>
          <AlertBox type="warning" title="Atenção: Antivírus">
            O Cheat Engine é frequentemente detectado como vírus ou PUA (Potentially Unwanted Application) por antivírus. Isso é um <strong>falso positivo</strong>. Baixe sempre do site oficial. Antes de instalar, desative temporariamente o antivírus ou adicione exceção.
          </AlertBox>

          <h2>Download</h2>
          <ol>
            <li>Acesse <code>https://www.cheatengine.org/downloads.php</code></li>
            <li>Clique em <strong>"Download Cheat Engine"</strong></li>
            <li>Baixe o instalador <code>.exe</code></li>
          </ol>

          <h2>Instalação Passo a Passo</h2>
          <ol>
            <li>Execute o instalador (<code>CheatEngine78.exe</code> ou versão mais recente)</li>
            <li>Clique em <strong>"I Agree"</strong> para aceitar a licença</li>
            <li>
              <strong>IMPORTANTE:</strong> durante a instalação, aparecerão ofertas de software adicional (McAfee, etc.) —{" "}
              <strong>Decline / desmarque todas</strong>
            </li>
            <li>Escolha a pasta de instalação (padrão: <code>C:\Program Files\Cheat Engine X.X</code>)</li>
            <li>Clique em <strong>"Install"</strong> e aguarde concluir</li>
          </ol>

          <h2>Adicionando Exceção no Windows Defender</h2>
          <ol>
            <li>Abra <strong>Segurança do Windows</strong> (Windows Security)</li>
            <li>Vá em <strong>Proteção contra vírus → Gerenciar configurações</strong></li>
            <li>Role até <strong>Exclusões → Adicionar ou remover exclusões</strong></li>
            <li>Clique em <strong>Adicionar exclusão → Pasta</strong></li>
            <li>Selecione a pasta de instalação do Cheat Engine</li>
          </ol>

          <h2>Versão Portátil (sem instalação)</h2>
          <p>
            No GitHub oficial, baixe o arquivo <code>CheatEngine.zip</code> dos releases. Extraia e execute <code>CheatEngine.exe</code> — sem instalador, sem bundleware.
          </p>

          <h2>Primeiro Acesso</h2>
          <ol>
            <li>Ao abrir o CE pela primeira vez, aparecerá uma tela de doação — clique em <strong>"Later"</strong></li>
            <li>A interface principal é exibida</li>
            <li>Vá em <strong>Help → Tutorial</strong> para abrir o tutorial integrado</li>
          </ol>

          <AlertBox type="success" title="Pronto!">
            Com o CE instalado, você está pronto para explorar a memória de processos. Avance para a seção de Interface Geral.
          </AlertBox>
        </>
      )}

      {/* ── LINUX ──────────────────────────────────────── */}
      {os === "linux" && (
        <>
          <AlertBox type="info" title="Cheat Engine no Linux">
            O Cheat Engine é nativamente um programa Windows. No Linux existem <strong>três abordagens</strong>: via Wine, via Proton (para jogos Steam), ou usando alternativas nativas como o <strong>GameConqueror</strong> / <strong>scanmem</strong>.
          </AlertBox>

          <h2>Opção 1 — Via Wine (recomendado)</h2>
          <p>
            Wine permite executar aplicativos Windows no Linux. É a forma mais completa de usar o Cheat Engine com todos os recursos.
          </p>

          <h3>Instalar Wine</h3>
          <CodeBlock
            title="Ubuntu / Debian / Linux Mint"
            language="bash"
            code={`
# Habilitar arquitetura 32 bits
sudo dpkg --add-architecture i386

# Adicionar repositório oficial do Wine
sudo mkdir -pm755 /etc/apt/keyrings
sudo wget -O /etc/apt/keyrings/winehq-archive.key https://dl.winehq.org/wine-builds/winehq.key
sudo wget -NP /etc/apt/sources.list.d/ \
  https://dl.winehq.org/wine-builds/ubuntu/dists/$(lsb_release -cs)/winehq-$(lsb_release -cs).sources

# Instalar Wine estável
sudo apt update
sudo apt install --install-recommends winehq-stable
            `}
          />
          <CodeBlock
            title="Arch Linux / Manjaro"
            language="bash"
            code={`
# Habilitar repositório multilib em /etc/pacman.conf (descomentar linhas [multilib])
sudo pacman -Sy wine wine-mono wine-gecko
            `}
          />
          <CodeBlock
            title="Fedora / RHEL"
            language="bash"
            code={`
sudo dnf install wine
            `}
          />

          <h3>Instalar e Executar o Cheat Engine via Wine</h3>
          <CodeBlock
            title="Executar o instalador"
            language="bash"
            code={`
# Baixar o instalador do site oficial
wget https://github.com/cheat-engine/cheat-engine/releases/latest/download/CheatEngine.exe

# Executar com Wine
wine CheatEngine.exe
            `}
          />
          <p>
            Siga o instalador normalmente. O CE ficará instalado em <code>~/.wine/drive_c/Program Files/Cheat Engine X.X/</code>.
          </p>
          <CodeBlock
            title="Abrir o CE depois de instalado"
            language="bash"
            code={`
wine "~/.wine/drive_c/Program Files/Cheat Engine 7.5/cheatengine-x86_64.exe"
            `}
          />

          <AlertBox type="warning" title="Limitações no Linux via Wine">
            <ul style={{ marginTop: 4 }}>
              <li>O driver de kernel do CE (<code>dbk64.sys</code>) <strong>não funciona no Linux</strong> — isso limita algumas funcionalidades avançadas</li>
              <li>Jogos Windows rodando via Wine podem funcionar; jogos Linux nativos geralmente <strong>não são acessíveis</strong> pelo CE via Wine</li>
              <li>O Speed Hack tem suporte limitado</li>
            </ul>
          </AlertBox>

          <h2>Opção 2 — Via Proton (jogos Steam)</h2>
          <p>
            Se você quer usar o CE com jogos Steam no Linux (via Proton), a abordagem é diferente:
          </p>
          <ol>
            <li>Instale o <strong>ProtonUp-Qt</strong> para gerenciar versões do Proton</li>
            <li>Use o <strong>GE-Proton</strong> (Proton-GE) que tem melhor suporte a Wine tricks</li>
            <li>Instale o Cheat Engine dentro do mesmo prefixo Wine do jogo:</li>
          </ol>
          <CodeBlock
            title="CE no prefixo do jogo Steam"
            language="bash"
            code={`
# Descobrir o prefix do jogo (substitua GAMEID pelo ID do jogo na Steam)
ls ~/.steam/steam/steamapps/compatdata/GAMEID/pfx/

# Executar o instalador no mesmo prefixo
WINEPREFIX=~/.steam/steam/steamapps/compatdata/GAMEID/pfx \
  wine CheatEngine.exe
            `}
          />

          <h2>Opção 3 — Alternativas Nativas para Linux</h2>
          <p>
            Para jogos Linux nativos (não rodando via Wine/Proton), use ferramentas nativas:
          </p>
          <div className="not-prose space-y-3 my-4">
            {[
              {
                nome: "GameConqueror",
                desc: "Interface gráfica (GTK) para o scanmem. É o equivalente visual do Cheat Engine para Linux.",
                install: "sudo apt install gameconqueror",
              },
              {
                nome: "scanmem / gameconqueror",
                desc: "Ferramenta de linha de comando para varredura de memória. Base do GameConqueror.",
                install: "sudo apt install scanmem",
              },
              {
                nome: "Cheat Engine (nativo — experimental)",
                desc: "O repositório oficial do CE no GitHub tem um port Linux em desenvolvimento. Funcionalidade limitada.",
                install: "# Ver: github.com/cheat-engine/cheat-engine",
              },
            ].map((item, i) => (
              <div key={i} className="border border-border rounded-lg p-3 bg-card">
                <div className="font-semibold text-sm text-primary mb-1">{item.nome}</div>
                <p className="text-sm text-muted-foreground mb-2">{item.desc}</p>
                <code className="text-xs bg-muted px-2 py-1 rounded font-mono">{item.install}</code>
              </div>
            ))}
          </div>

          <h2>Verificando a Instalação (GameConqueror)</h2>
          <CodeBlock
            title="Instalar e abrir o GameConqueror"
            language="bash"
            code={`
# Ubuntu/Debian
sudo apt install gameconqueror

# Arch Linux
sudo pacman -S gameconqueror

# Executar
gameconqueror
            `}
          />

          <AlertBox type="tip" title="Qual usar?">
            Para jogos Windows no Linux via Steam/Proton → <strong>Wine + Cheat Engine no mesmo prefix</strong>. Para jogos Linux nativos → <strong>GameConqueror / scanmem</strong>. Para uso completo do CE com todos os recursos → <strong>Windows</strong> ou VM Windows.
          </AlertBox>
        </>
      )}
    </PageContainer>
  );
}
