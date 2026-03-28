import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function Disassembler() {
  return (
    <PageContainer
      title="Disassembler"
      subtitle="Leia e interprete o código assembly de jogos usando o disassembler integrado do Cheat Engine."
      difficulty="avançado"
      timeToRead="12 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
        Para usar o disassembler eficientemente, é recomendável ter noções básicas de assembly x86/x64. Este tópico cobre o essencial para quem está começando na engenharia reversa de jogos.
      </AlertBox>

      <h2>O que é um Disassembler?</h2>
      <p>
        Um disassembler converte código de máquina (bytes binários) de volta para instruções assembly legíveis por humanos. Isso permite entender o que o programa está fazendo internamente.
      </p>

      <h2>Navegando pelo Disassembler</h2>
      <ul>
        <li><strong>F5:</strong> ir para um endereço (Go to address)</li>
        <li><strong>Enter:</strong> seguir um jump ou call</li>
        <li><strong>Alt+←:</strong> voltar ao endereço anterior</li>
        <li><strong>Espaço:</strong> alternar entre código e hex</li>
        <li><strong>Clique direito:</strong> opções de breakpoint, follow, copiar</li>
      </ul>

      <h2>Instruções Assembly Comuns em Jogos</h2>
      <CodeBlock
        title="Instruções Básicas"
        language="asm"
        code={`
; Mover valor da memória para registrador
mov eax, [esi+4C]       ; eax = *(esi + 0x4C)

; Comparar e saltar
cmp eax, 0              ; comparar eax com 0
jle morte               ; se eax <= 0, ir para 'morte'

; Operações aritméticas
sub eax, ebx            ; eax = eax - ebx (dano)
add [esi+4C], eax       ; *(esi+0x4C) += eax (curar)

; Chamada de função
call 0x00A1B230         ; chama função em 0x00A1B230
        `}
      />

      <h2>Encontrando Funções Importantes</h2>
      <p>
        Estratégias para encontrar funções relevantes no código:
      </p>
      <ul>
        <li><strong>"What writes to this address":</strong> encontra o código que modifica um valor</li>
        <li><strong>"What accesses this address":</strong> encontra todo código que lê ou escreve</li>
        <li><strong>AOB scan:</strong> busca por padrões de bytes conhecidos</li>
        <li><strong>Strings:</strong> encontre strings de texto para chegar perto de funções de interface</li>
      </ul>

      <h2>Lendo uma Função de Dano</h2>
      <CodeBlock
        title="Exemplo — Função de Dano Típica"
        language="asm"
        code={`
; ESI = ponteiro para estrutura do jogador
; EAX = valor do dano

sub [esi+4C], eax    ; vida = vida - dano
cmp [esi+4C], 0      ; vida <= 0?
jle @morte           ; sim: ir para função de morte
ret                  ; não: retornar
        `}
      />

      <p>
        Para fazer vida infinita por injeção de código, você poderia substituir <code>sub [esi+4C], eax</code> por um <code>nop</code> (no operation — não faz nada), impedindo a diminuição da vida.
      </p>

      <AlertBox type="tip" title="Atalho Poderoso">
        Use <strong>"Follow in Disassembler"</strong> após o "What writes to this address" para ir diretamente para a instrução que modifica o valor. É o caminho mais rápido para encontrar a lógica do jogo.
      </AlertBox>
    </PageContainer>
  );
}
