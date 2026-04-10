import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Injecao() {
    return (
      <PageContainer
        title="Injeção de Código"
        subtitle="Como modificar o comportamento de um jogo injetando instruções Assembly diretamente na memória."
        difficulty="avançado"
        timeToRead="16 min"
      >
        <p>
          A injeção de código é a técnica mais poderosa do Cheat Engine: em vez de apenas modificar valores, você <strong>modifica o comportamento</strong> do jogo — mudando as instruções que ele executa. É a diferença entre "defina vida = 9999" e "faça o jogo nunca diminuir a vida".
        </p>

        <h2>Como Funciona a Injeção de Código</h2>
        <p>
          A técnica clássica é chamada de <strong>Code Cave</strong> ou <strong>Detour</strong>:
        </p>
        <div className="not-prose grid grid-cols-1 gap-3 my-4">
          {[
            { n: "1", passo: "Encontre a instrução alvo", desc: "Use What Writes para identificar a instrução Assembly que modifica o valor (ex: SUB [EBX+4C], EAX diminui a vida)." },
            { n: "2", passo: "Aloque nova memória", desc: "Use alloc() no Auto Assembler para reservar espaço para seu novo código." },
            { n: "3", passo: "Escreva seu código", desc: "Seu código substitui ou estende a instrução original — pode ignorar, modificar valores ou adicionar lógica." },
            { n: "4", passo: "Instale o hook (JMP)", desc: "Substitua a instrução original por um JMP para seu código (5 bytes). Bytes restantes viram NOP." },
            { n: "5", passo: "Retorne ao fluxo original", desc: "Ao final do seu código, pule de volta para a instrução seguinte ao hook." },
          ].map((item) => (
            <div key={item.n} className="flex gap-3 p-3 border border-border rounded-xl bg-card">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">{item.n}</span>
              <div>
                <h4 className="font-bold text-sm mb-0.5">{item.passo}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>Exemplo: Ignorar Dano no Jogador</h2>
        <CodeBlock
          title="Code Injection completa — godmode"
          language="asm"
          code={`// Situação: identificamos que EBX+0x4C é a vida do jogador
  // A instrução que a reduz é: SUB [EBX+4C], EAX

  [ENABLE]
  aobscanmodule(INJPOINT, game.exe, 2B 83 4C 00 00 00)
  alloc(godmem, 256, INJPOINT)

  label(codigo)
  label(retorno)
  label(original)

  godmem:
  codigo:
    // Verificar se é o jogador antes de ignorar o dano
    // EBX aponta para a struct do personagem
    // Se for inimigo, aplicar o dano normalmente
    
    // Simplesmente pular a instrução — nenhum dano
    // Para ignorar o dano apenas do jogador, adicione comparação aqui
    
    jmp retorno

  INJPOINT:
    jmp godmem  // 5 bytes — sobrescreve os 6 bytes originais
    nop         // 1 byte extra para completar
  retorno:
  registersymbol(INJPOINT)

  [DISABLE]
  INJPOINT:
    db 2B 83 4C 00 00 00  // restaura: SUB [EBX+0x4C], EAX
  unregistersymbol(INJPOINT)
  dealloc(godmem)`}
        />

        <h2>Exemplo: Modificar Dano Causado</h2>
        <CodeBlock
          title="Multiplicar o dano causado por 10x"
          language="asm"
          code={`[ENABLE]
  aobscanmodule(DANO_INJPOINT, game.exe, 29 83 50 00 00 00)
  alloc(danomem, 256, DANO_INJPOINT)

  label(danoreturn)

  danomem:
    // EAX contém o dano a ser aplicado
    // Multiplicamos por 10 antes de aplicar
    imul eax, eax, 0A       // EAX = EAX * 10
    sub [ebx+00000050], eax // aplica o dano multiplicado
    jmp danoreturn

  DANO_INJPOINT:
    jmp danomem
    nop
  danoreturn:
  registersymbol(DANO_INJPOINT)

  [DISABLE]
  DANO_INJPOINT:
    db 29 83 50 00 00 00
  unregistersymbol(DANO_INJPOINT)
  dealloc(danomem)`}
        />

        <h2>Preservando Registradores</h2>
        <AlertBox type="warning" title="Sempre preserve os registradores!">
          Ao injetar código, você interrompe o fluxo do jogo. Se modificar registradores sem restaurá-los, você corrompe o estado do jogo e ele pode travar. Use PUSHAD/POPAD (x86) ou salve manualmente cada registrador que modificar.
        </AlertBox>

        <CodeBlock
          title="Template com preservação de registradores"
          language="asm"
          code={`meuCodigo:
    pushad          // salva EAX, EBX, ECX, EDX, ESI, EDI, EBP, ESP
    pushfd          // salva as flags (EFLAGS)
    
    // Seu código aqui — pode modificar qualquer registrador livremente
    mov eax, 9999
    mov [ebx+4C], eax
    
    popfd           // restaura as flags
    popad           // restaura todos os registradores
    
    // Executa a instrução original (que copiamos aqui)
    // [instrução original]
    
    jmp retorno`}
        />
      </PageContainer>
    );
  }
  