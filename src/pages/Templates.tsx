import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function Templates() {
  return (
    <PageContainer
      title="Templates do Cheat Engine"
      subtitle="Templates prontos do CE para as tarefas mais comuns de code injection."
      difficulty="avançado"
      timeToRead="8 min"
    >
      <AlertBox type="info" title="Templates Automáticos">
        O CE oferece templates que geram automaticamente o código de cave, alocação de memória e restauração. Acesse pelo menu <strong>Template</strong> no Auto-Assemble.
      </AlertBox>

      <h2>Template: Code Injection</h2>
      <p>
        Gerado automaticamente quando você clica com botão direito em uma instrução no disassembler e seleciona <strong>"Template → Code Injection"</strong>.
      </p>
      <CodeBlock
        title="Code Injection (gerado pelo CE)"
        language="asm"
        code={`
{ Game   : game.exe
  Version: 1.0
  Date   : 2024-01-01
  Author : Você }

[ENABLE]

aobscanmodule(INJECT,game.exe,89 46 4C 8B 4D F8) // Busca por bytes
alloc(newmem,$1000,"game.exe"+A1B230)

label(code)
label(return)

newmem:

code:
  // Seu código aqui
  mov [esi+4C],eax
  jmp return

"game.exe"+A1B230:
  jmp code
  nop

return:

[DISABLE]

"game.exe"+A1B230:
  db 89 46 4C 8B 4D F8

dealloc(newmem)
        `}
      />

      <h2>Template: AOB Injection</h2>
      <p>
        Usa Array of Bytes para encontrar o endereço dinamicamente — funciona mesmo após atualizações do jogo:
      </p>
      <CodeBlock
        title="AOB Injection — Resistente a Updates"
        language="asm"
        code={`
[ENABLE]
aobscanmodule(VIDA_AOB, game.exe, 29 46 4C 3B 46 4C)
alloc(godMode, 64, VIDA_AOB)
label(retorno)

VIDA_AOB:
  jmp godMode
  nop

godMode:
  mov dword ptr [esi+4C], #999
  jmp retorno

retorno:

[DISABLE]
VIDA_AOB:
  db 29 46 4C 3B 46 4C
dealloc(godMode)
        `}
      />

      <AlertBox type="tip" title="AOB = Cheats Permanentes">
        Scripts com AOB scan continuam funcionando após atualizações do jogo, pois buscam a instrução pelos bytes em vez do endereço fixo. É a abordagem preferida para cheats distribuídos em tabelas públicas.
      </AlertBox>
    </PageContainer>
  );
}
