import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function Injecao() {
  return (
    <PageContainer
      title="Injeção de Código"
      subtitle="Técnicas avançadas de code injection para modificar o comportamento de jogos."
      difficulty="avançado"
      timeToRead="12 min"
    >
      <h2>O que é Code Injection?</h2>
      <p>
        Code injection é a técnica de inserir código próprio no fluxo de execução de um programa. No contexto de jogos, isso permite modificar comportamentos sem precisar encontrar endereços de memória específicos — você modifica o próprio código do jogo.
      </p>

      <h2>Técnica: Jump Patch</h2>
      <p>
        A técnica mais comum: substituir uma instrução existente por um <code>jmp</code> para sua cave de código.
      </p>
      <CodeBlock
        title="Jump Patch Básico"
        language="asm"
        code={`
; Instrução original em 0x00A1B230:
; sub [esi+4C], eax   (3 bytes)
; cmp [esi+4C], 0     (3 bytes) = 6 bytes total

; Substituímos por:
; jmp minhaCave        (5 bytes)
; nop                  (1 byte) = 6 bytes total

; Na cave:
minhaCave:
  pushad              ; salvar todos registradores
  ; ... seu código aqui ...
  popad               ; restaurar registradores
  sub [esi+4C], eax   ; instrução original
  cmp [esi+4C], 0     ; instrução original
  jmp 00A1B236        ; retornar ao código original
        `}
      />

      <h2>Godmode — Exemplo Completo</h2>
      <CodeBlock
        title="Godmode (sem dano)"
        language="asm"
        code={`
[ENABLE]
alloc(godmode, 128)
label(retorno)

// Endereço onde a instrução de dano está
// Instrução: sub [esi+4C], eax
00A1B230:
  jmp godmode
  nop

godmode:
  // Não executa o sub — ignorar o dano
  // Restaurar vida para máximo se necessário
  mov dword ptr [esi+4C], #100
  jmp retorno

retorno:

[DISABLE]
00A1B230:
  sub [esi+4C], eax
  nop
dealloc(godmode)
        `}
      />

      <h2>Infinite Ammo — Exemplo</h2>
      <CodeBlock
        title="Munição Infinita"
        language="asm"
        code={`
[ENABLE]
alloc(infAmmo, 64)
label(retorno)

// Instrução que subtrai munição:
// dec [edi+1C]  (quando atirar)
00B2C340:
  jmp infAmmo
  nop
  nop
  nop

infAmmo:
  // Não decrementa — ignora o sub de munição
  // dec [edi+1C]  (removida)
  jmp retorno

retorno:

[DISABLE]
00B2C340:
  dec [edi+1C]
  nop
  nop
  nop
dealloc(infAmmo)
        `}
      />

      <AlertBox type="warning" title="Tamanho das Instruções">
        Um <code>jmp</code> (salto relativo) ocupa 5 bytes. A instrução que você está substituindo deve ter pelo menos 5 bytes, ou você precisa incluir a próxima instrução também (e recolocá-la na cave). Use o disassembler para verificar os tamanhos.
      </AlertBox>
    </PageContainer>
  );
}
