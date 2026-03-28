import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { Search, Database, Bug, Code2, Terminal } from "lucide-react";

export default function Introducao() {
  return (
    <PageContainer
      title="Cheat Engine"
      subtitle="O mais poderoso editor de memória de jogos do mundo — aprenda do zero ao avançado em Português Brasileiro."
      difficulty="iniciante"
      timeToRead="8 min"
    >
      <AlertBox type="info" title="O que você vai aprender">
        Este guia cobre tudo sobre o Cheat Engine: desde varredura básica de memória até scripts Lua avançados, injeção de código e criação de trainers — tudo explicado em Português.
      </AlertBox>

      <h2>O que é o Cheat Engine?</h2>
      <p>
        O <strong>Cheat Engine</strong> é uma ferramenta open-source de modificação de memória, criada por Eric Heijnen (Dark Byte) em 2000. Ele permite que você inspecione e modifique a memória de processos em execução — principalmente jogos — para alterar valores como vida, munição, velocidade e muito mais.
      </p>
      <p>
        Mas o Cheat Engine vai muito além de simples "cheats". É uma plataforma completa de:
      </p>
      <ul>
        <li><strong>Análise de memória</strong> — varredura e localização de valores em tempo real</li>
        <li><strong>Debugging</strong> — breakpoints, disassembler e inspeção de registradores</li>
        <li><strong>Code injection</strong> — injeção de código assembly diretamente em processos</li>
        <li><strong>Scripting Lua</strong> — automação completa com a API interna do CE</li>
        <li><strong>Análise de ponteiros</strong> — engenharia reversa de estruturas de dados</li>
      </ul>

      <h2>Para que serve?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { icon: <Search className="w-5 h-5" />, title: "Jogos Single Player", desc: "Altere vida, dinheiro, munição e qualquer valor em jogos offline." },
          { icon: <Bug className="w-5 h-5" />, title: "Engenharia Reversa", desc: "Entenda como softwares funcionam internamente, analise estruturas de dados." },
          { icon: <Code2 className="w-5 h-5" />, title: "Desenvolvimento", desc: "Teste e debugue seus próprios programas, encontre bugs de memória." },
          { icon: <Terminal className="w-5 h-5" />, title: "Educação", desc: "Aprenda arquitetura de computadores, assembly e funcionamento da memória." },
        ].map((item, i) => (
          <div key={i} className="border border-border rounded-lg p-4 bg-card">
            <div className="text-primary mb-2">{item.icon}</div>
            <div className="font-semibold text-sm mb-1">{item.title}</div>
            <div className="text-xs text-muted-foreground">{item.desc}</div>
          </div>
        ))}
      </div>

      <AlertBox type="warning" title="Uso Ético">
        O Cheat Engine é uma ferramenta educacional e deve ser usado apenas em jogos single-player ou em softwares nos quais você tem permissão para fazê-lo. Usar em jogos online viola os termos de serviço e pode resultar em banimento permanente.
      </AlertBox>

      <h2>História e Versões</h2>
      <p>
        O Cheat Engine foi lançado em <strong>2000</strong> pelo desenvolvedor belga Dark Byte. Ao longo dos anos tornou-se a referência mundial para modificação de memória de jogos.
      </p>
      <div className="space-y-3 my-4 not-prose">
        {[
          { version: "CE 1.x", year: "2000–2002", desc: "Versão inicial com scanner básico de 4 bytes" },
          { version: "CE 5.x", year: "2008–2012", desc: "Introdução do debugger, pointer scanner e scripts Lua" },
          { version: "CE 6.x", year: "2013–2018", desc: "Suporte a 64 bits, DBVM (hypervisor), VEH debugger" },
          { version: "CE 7.x", year: "2019–hoje", desc: "Melhorias no disassembler, Mono support, ARM64 experimental" },
        ].map((v, i) => (
          <div key={i} className="flex gap-3 items-start border-l-2 border-primary/30 pl-3">
            <div>
              <div className="text-sm font-semibold">{v.version} <span className="text-muted-foreground font-normal">({v.year})</span></div>
              <div className="text-sm text-muted-foreground">{v.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <h2>Requisitos do Sistema</h2>
      <ul>
        <li><strong>Sistema Operacional:</strong> Windows 7/8/10/11 (32 ou 64 bits)</li>
        <li><strong>RAM:</strong> mínimo 512 MB (recomendado 2 GB+)</li>
        <li><strong>Antivírus:</strong> adicione o CE à lista de exceções — falso positivo comum</li>
      </ul>

      <AlertBox type="tip" title="Dica de Iniciante">
        Comece pelo tutorial interno do Cheat Engine (menu Help → Cheat Engine Tutorial). Ele ensina os conceitos básicos de forma prática e interativa, diretamente dentro do programa.
      </AlertBox>
    </PageContainer>
  );
}
