import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function AutoAssemble() {
  return (
    <PageContainer
      title="Auto-Assemble"
      subtitle="O editor de código assembly do Cheat Engine para injetar código diretamente em processos."
      difficulty="avançado"
      timeToRead="12 min"
    >
      <AlertBox type="info" title="O que é Auto-Assemble?">
        O Auto-Assemble é o editor integrado do CE onde você escreve código assembly (ou usa templates) para injetar em um processo. É a ferramenta mais poderosa para criar cheats complexos.
      </AlertBox>

      <h2>Abrindo o Auto-Assemble</h2>
      <ul>
        <li>No Memory View: <strong>Tools → Auto Assemble</strong> (ou <code>Ctrl+A</code>)</li>
        <li>Ou no menu principal: <strong>Tools → Auto Assemble</strong></li>
      </ul>

      <h2>Estrutura Básica de um Script</h2>
      <CodeBlock
        title="Estrutura de Script AA"
        language="asm"
        code={`
[ENABLE]
; Código executado quando ativado

[DISABLE]
; Código executado quando desativado
        `}
      />

      <h2>Templates Disponíveis</h2>
      <p>
        Vá em <strong>Template → Code Injection</strong> para usar templates prontos:
      </p>
      <ul>
        <li><strong>Code Injection:</strong> template básico para injetar código</li>
        <li><strong>AOB Injection:</strong> busca por padrão de bytes antes de injetar</li>
        <li><strong>Full Injection:</strong> cria código alocando memória automaticamente</li>
      </ul>

      <h2>Exemplo: NOP (Anular uma Instrução)</h2>
      <CodeBlock
        title="NOP uma instrução — Sem dano"
        language="asm"
        code={`
[ENABLE]
// Endereço onde está a instrução de subtração de vida
// Instrução original: sub [esi+4C], eax  (6 bytes)
// Substituir por NOP NOP NOP NOP NOP NOP
00A1B230:
  nop
  nop
  nop
  nop
  nop
  nop

[DISABLE]
// Restaurar instrução original
00A1B230:
  db 29 46 4C 8B 4D F8
        `}
      />

      <h2>Code Injection com Cave</h2>
      <p>
        Para código maior, o CE aloca uma "cave" de memória (espaço livre) e redireciona a execução para lá:
      </p>
      <CodeBlock
        title="Code Cave — Vida Mínima 1"
        language="asm"
        code={`
[ENABLE]
alloc(minhaCave, 128)
label(original)
label(retornar)

minhaCave:
  sub [esi+4C], eax        ; executa instrução original
  cmp [esi+4C], 0          ; vida <= 0?
  jg retornar              ; não: retornar
  mov dword ptr [esi+4C],1 ; sim: setar para 1 (não morrer)
  retornar:
  jmp original

original:
  jmp minhaCave
  nop

[DISABLE]
original:
  db 29 46 4C               ; restaura instrução original
dealloc(minhaCave)
        `}
      />

      <AlertBox type="tip" title="Dica — Usar Template">
        Em vez de escrever do zero, use <strong>Template → Code Injection</strong> no menu do Auto-Assemble. Ele gera o código da cave automaticamente a partir do endereço selecionado no disassembler.
      </AlertBox>
    </PageContainer>
  );
}
