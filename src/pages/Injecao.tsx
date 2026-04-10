import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Injecao() {
    return (
      <PageContainer
        title="Injeção de Código"
        subtitle="Como injetar código Assembly no jogo para modificar seu comportamento de forma permanente e limpa."
        difficulty="avançado"
        timeToRead="20 min"
      >
        <h2>Por que injetar código em vez de apenas modificar memória</h2>
        <p>
          Modificar valores na memória tem limitações: o jogo continua calculando e sobrescrevendo os valores que você muda. O freeze do CE fica em uma luta constante com o jogo — CE escreve 100, o jogo escreve 75, CE escreve 100, o jogo escreve 75, dezenas de vezes por segundo. Além de ser conceitualmente "sujo", pode ter janelas de tempo onde o valor errado causa efeitos indesejados.
        </p>
        <p>
          A injeção de código resolve isso na raiz: em vez de sobrescrever o resultado, você modifica o código que produz o resultado. O jogo ainda executa sua lógica de dano, mas a instrução que aplica o dano na memória foi substituída por código que simplesmente não aplica dano. Nenhuma luta, nenhum freeze, nenhuma inconsistência.
        </p>

        <h2>O Modelo de Code Injection</h2>
        <p>
          A injeção de código no CE segue um modelo padrão chamado "detour" (desvio). O processo funciona assim: você identifica uma instrução específica no código do jogo que quer modificar. Você aloca uma região de memória executável em outro lugar (o "cave" ou caverna de código). Você sobrescreve a instrução original com um JMP para sua caverna. Na caverna, você coloca o código injetado (sua lógica de cheat), seguido pelas instruções originais que foram sobrescritas, seguido de um JMP de volta para logo após onde você desviou.
        </p>
        <p>
          O resultado: o jogo executa tudo normalmente até chegar à instrução que você modificou. Em vez da instrução original, ele executa um JMP para sua caverna. Na caverna, seu código roda (ex: zerando o dano), as instruções originais rodam (ex: escrevendo o dano — que agora é zero — na memória), e então volta para o jogo como se nada tivesse acontecido. O jogo não sabe que algo foi inserido no fluxo.
        </p>

        <h2>Implementando um Code Injection Completo</h2>
        <CodeBlock
          title="God Mode por injeção de código"
          language="asm"
          code={`// Contexto: queremos que o personagem nunca tome dano
  // Instrução original encontrada via "what writes": SUB ECX, EAX (2B C8)
  // Seguida por: MOV [EBX+4C], ECX (89 4B 4C)
  // Total: 5 bytes — perfeito para um JMP (que usa exatamente 5 bytes)

  [ENABLE]
  define(game, game.exe)
  define(addrDano, game+001F22C)  // endereço onde SUB ECX, EAX está

  // Criar a caverna de código
  alloc(godModeCave, 128, addrDano)
  label(godModeOriginal)
  label(godModeReturn)

  godModeCave:
    // Nosso cheat: em vez de subtrair o dano (ECX = ECX - EAX),
    // não fazemos nada com ECX — ele já tem o HP atual
    // Simplesmente restauramos as instruções originais SEM o SUB:
    
    // Salvar EAX (o dano) por segurança
    push eax
    xor eax, eax       // zera EAX (dano = 0)
    
  godModeOriginal:
    sub ecx, eax       // ECX - 0 = ECX (HP não muda!)
    mov [ebx+4C], ecx  // escreve HP inalterado

    // Restaurar EAX original
    pop eax

  godModeReturn:
    jmp addrDano+5     // volta para após as instruções sobrescritas
                       // (5 bytes: o tamanho do JMP que colocamos)

  // Sobrescrever instruções originais com JMP para a caverna
  addrDano:
    jmp godModeCave     // JMP = 5 bytes: E9 XX XX XX XX
    // as 3 instruções originais que somam 5 bytes são sobrescritas

  [DISABLE]
  // Restaurar os bytes originais exatamente
  addrDano:
    db 2B C8           // SUB ECX, EAX
    db 89 4B 4C        // MOV [EBX+4C], ECX

  dealloc(godModeCave)`}
        />

        <h2>Calculando o Tamanho das Instruções</h2>
        <p>
          Um desafio crítico: o JMP de 32 bits ocupa exatamente 5 bytes (E9 + 4 bytes de offset relativo). As instruções que você vai sobrescrever precisam ter exatamente 5 bytes — nem mais, nem menos. Se as instruções têm menos de 5 bytes, você vai sobrescrever instruções adicionais que não deveria. Se têm mais de 5, você não sobrescreveu completamente a instrução original.
        </p>
        <p>
          A solução: calcule o tamanho total das instruções no disassembler. Cada instrução Assembly tem um tamanho em bytes mostrado no disassembler do CE. Some os tamanhos até chegar a pelo menos 5. Se a soma der mais que 5, inclua todas essas instruções na seção "godModeOriginal" do seu cave — elas precisam ser restauradas tanto na caverna quanto no DISABLE.
        </p>
        <CodeBlock
          title="Exemplo de cálculo de tamanhos"
          language="text"
          code={`Instruções no endereço alvo:
  00A1F22C: 2B C8         (2 bytes) SUB ECX, EAX
  00A1F22E: 89 4B 4C      (3 bytes) MOV [EBX+4C], ECX

  Total: 2 + 3 = 5 bytes ✓ Perfeito para um JMP de 5 bytes!

  Outro exemplo:
  00A1F22C: 89 4B 4C      (3 bytes) MOV [EBX+4C], ECX
  Total: 3 bytes — MUITO PEQUENO para um JMP de 5 bytes!
  Solução: incluir a próxima instrução também:
  00A1F22F: EB 05         (2 bytes) JMP 00A1F236
  Total: 3 + 2 = 5 bytes ✓ Agora funciona — mas lembre de incluir o JMP original na cave!`}
        />

        <h2>Verificando e Testando a Injeção</h2>
        <p>
          Após executar o script de injeção, verifique o disassembler no endereço original — você deve ver um JMP para o endereço da sua caverna. Na caverna, você deve ver suas instruções seguidas de um JMP de retorno. Se qualquer coisa parecer errada, desative imediatamente o script (que executará o DISABLE e restaurará os bytes originais) antes de investigar.
        </p>
        <p>
          Teste sistematicamente: (1) ative o script, (2) teste se o cheat funciona como esperado, (3) desative o script, (4) confirme que o comportamento original foi restaurado completamente. Se o jogo não crashou em nenhuma dessas etapas e o cheat funcionou, a injeção está correta.
        </p>

        <AlertBox type="warning" title="Bytes originais errados = crash garantido">
          Se os bytes no DISABLE não correspondem exatamente aos bytes originais, o jogo vai crashar ou ter comportamento imprevisível quando você desativar o cheat. Sempre copie os bytes diretamente do disassembler, verificando byte por byte. Um erro de um único byte é suficiente para travar o processo.
        </AlertBox>

        <AlertBox type="tip" title="Use o template de Code Injection do CE">
          Em vez de escrever o structure do cave manualmente, use Template → Code Injection no Auto Assembler. O CE copia os bytes originais automaticamente e cria a structure básica. Você só precisa adicionar sua lógica de cheat no lugar correto.
        </AlertBox>
      </PageContainer>
    );
  }
  