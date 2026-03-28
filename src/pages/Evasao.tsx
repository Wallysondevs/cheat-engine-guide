import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Evasao() {
  return (
    <PageContainer
      title="Técnicas de Evasão"
      subtitle="Como o Cheat Engine tenta evitar detecção — perspectiva educacional e de segurança."
      difficulty="avançado"
      timeToRead="8 min"
    >
      <AlertBox type="danger" title="Apenas para Fins Educacionais">
        Este conteúdo é para entender como ferramentas de segurança funcionam tecnicamente. Usar técnicas de evasão para trapacear em jogos online é contra os termos de serviço e pode resultar em banimento.
      </AlertBox>

      <h2>Técnicas Integradas no Cheat Engine</h2>
      <div className="space-y-3 my-4 not-prose">
        {[
          {
            tecnica: "DBVM (Dark Byte's Virtual Machine)",
            desc: "Um hypervisor que executa o CE em um nível abaixo do sistema operacional (Ring -1). Permite acesso total à memória sem ser detectado por drivers de kernel do jogo. Requer CPU com suporte a VT-x/AMD-V."
          },
          {
            tecnica: "Hardware Breakpoints",
            desc: "Usa os registradores de debug do hardware (DR0–DR3) em vez de Software Breakpoints (INT3). Muito mais difícil de detectar por anti-cheats baseados em software."
          },
          {
            tecnica: "Kernel Driver Spoofing",
            desc: "O driver do CE (dbk64.sys) pode ser compilado com nome diferente ou assinado com certificados personalizados para evitar blacklists baseadas em nome."
          },
          {
            tecnica: "Memory Mapped Files",
            desc: "Em vez de usar ReadProcessMemory/WriteProcessMemory (facilmente detectáveis), o CE pode usar arquivos mapeados em memória para acesso mais discreto."
          },
        ].map((item, i) => (
          <div key={i} className="border border-border rounded-lg p-3 bg-card">
            <div className="font-semibold text-sm mb-1">{item.tecnica}</div>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Perspectiva de Desenvolvimento de Jogos</h2>
      <p>
        Entender essas técnicas é crucial para desenvolvedores que querem proteger seus jogos. As melhores práticas incluem:
      </p>
      <ul>
        <li><strong>Validação Server-Side:</strong> nunca confie em valores do cliente — sempre valide no servidor</li>
        <li><strong>Criptografia de Valores:</strong> armazene valores críticos criptografados na memória</li>
        <li><strong>Checksums:</strong> verifique a integridade do código regularmente</li>
        <li><strong>Obfuscação:</strong> dificulte a leitura do código desmontado</li>
        <li><strong>Anti-Tampering:</strong> detecte modificações no executável e na memória</li>
      </ul>

      <AlertBox type="tip" title="Para Pesquisadores">
        Esse conhecimento é valioso para: pesquisa em segurança de software, desenvolvimento de anti-cheats, estudos acadêmicos sobre proteção de software, e desenvolvimento de ferramentas de análise legítimas.
      </AlertBox>
    </PageContainer>
  );
}
