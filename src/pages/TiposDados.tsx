import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function TiposDados() {
    return (
      <PageContainer
        title="Tipos de Dados em Memória"
        subtitle="Integer, Float, Double, String, Array of Bytes — entenda cada tipo e quando usar cada um em suas varreduras."
        difficulty="iniciante"
        timeToRead="16 min"
      >
        <h2>Por que tipos de dados importam</h2>
        <p>
          Na memória do computador, tudo são bytes — números de 0 a 255. O significado desses bytes depende de como você os interpreta. Os bytes 00 00 C8 42 podem ser interpretados como: o inteiro 1000028160 (se lido como 4 Bytes Big Endian), o float 100.0 (se lido como Float Little Endian), ou os caracteres nulos e letras (se lido como texto). O mesmo padrão de bits, significados completamente diferentes.
        </p>
        <p>
          Quando você faz uma varredura no Cheat Engine para encontrar a vida do personagem, se ela está armazenada como Float (ex: 100.0) mas você busca como 4 Bytes Integer com valor 100, o CE vai procurar o padrão de bytes 64 00 00 00 (100 em inteiro little-endian). Mas o Float 100.0 tem padrão de bytes 00 00 C8 42 — completamente diferente. Daí porque você não encontra nada.
        </p>

        <h2>Tipos Inteiros</h2>
        <p>
          Tipos inteiros armazenam números sem parte decimal. O CE oferece quatro tamanhos:
        </p>
        <p>
          <strong>1 Byte (8 bits):</strong> Armazena valores de 0 a 255 (sem sinal) ou -128 a 127 (com sinal). Usado para valores pequenos — flags booleanas, índices de inventário pequenos, contadores de loop internos. Em jogos antigos, vida frequentemente era 1 Byte (máximo 255). Hoje raramente é 1 Byte para valores visíveis ao jogador.
        </p>
        <p>
          <strong>2 Bytes (16 bits):</strong> Valores de 0 a 65535 (sem sinal) ou -32768 a 32767 (com sinal). Mais comum em jogos de 16 bits (SNES, Genesis), emulados via SNES9x, RetroArch, etc. Em jogos PC modernos, 2 Bytes é raro para valores de gameplay mas aparece em estruturas de dados compactas.
        </p>
        <p>
          <strong>4 Bytes (32 bits):</strong> O tipo mais comum em jogos modernos. Valores de 0 a ~4 bilhões (sem sinal) ou ~-2 bilhões a ~2 bilhões (com sinal). A grande maioria de vida, ouro, XP, munição, e outros valores de gameplay são 4 Bytes. Se você não sabe o tipo, <strong>sempre comece aqui</strong>.
        </p>
        <p>
          <strong>8 Bytes (64 bits):</strong> Para valores muito grandes. Em jogos 64-bit modernos, alguns valores que poderiam explodir o limite de 32 bits (como dinheiro em jogos econômicos, timestamps, IDs de entidade) são armazenados como 8 Bytes. Também aparece em contadores de tempo de alta precisão.
        </p>
        <CodeBlock
          title="Limites de cada tipo inteiro"
          language="text"
          code={`1 Byte (unsigned): 0 a 255
  1 Byte (signed):   -128 a 127

  2 Bytes (unsigned): 0 a 65.535
  2 Bytes (signed):   -32.768 a 32.767

  4 Bytes (unsigned): 0 a 4.294.967.295 (~4 bilhões)
  4 Bytes (signed):   -2.147.483.648 a 2.147.483.647 (~2 bilhões)

  8 Bytes (unsigned): 0 a 18.446.744.073.709.551.615 (~18 quintilhões)
  8 Bytes (signed):   -9.223.372.036.854.775.808 a 9.223.372.036.854.775.807

  Dica: se você vê o valor 4294967295 (ou 4.294.967.295) no CE,
  provavelmente representa -1 como inteiro sem sinal.`}
        />

        <h2>Float — Números com Ponto Decimal</h2>
        <p>
          Float (ponto flutuante de 32 bits, conforme o padrão IEEE 754) é usado para números que têm parte decimal — velocidade, coordenadas de posição (X, Y, Z), ângulos de câmera, porcentagens, e qualquer valor que não é um número inteiro perfeito.
        </p>
        <p>
          A precisão do Float é de aproximadamente 7 dígitos significativos. Isso significa que 100.0 é exato, 100.123456 é aproximadamente preciso, mas 1000000.123456789 pode ter arredondamentos. Para a maioria dos valores de jogo, essa precisão é mais que suficiente.
        </p>
        <p>
          Floats têm representação muito diferente de inteiros na memória. O número 1.0 em Float é armazenado como os bytes 00 00 80 3F. O número 100.0 é 00 00 C8 42. Não há relação óbvia com os valores decimais que vemos. Por isso, você não pode buscar "100" como Float esperando encontrar o mesmo padrão que "100" como inteiro.
        </p>
        <p>
          Quando usar Float: quando o valor tem casas decimais visíveis na HUD do jogo, quando você busca coordenadas de posição ou ângulos, quando valores como velocidade e aceleração são os alvos, e quando a varredura com 4 Bytes Integer não produz resultados convincentes.
        </p>

        <h2>Double — Float de Alta Precisão</h2>
        <p>
          Double (ponto flutuante de 64 bits) é essencialmente um Float mais preciso — ~15 dígitos significativos vs ~7 do Float. Em jogos, Double é raramente usado para valores de gameplay visíveis (Float é suficiente), mas aparece em:
        </p>
        <p>
          Motores de física que precisam de alta precisão para simulações de longa duração, timestamps de alta resolução, cálculos matemáticos internos onde precisão é crítica, e coordenadas de mundos muito grandes (em jogos com mundos de scale galáctico como Kerbal Space Program ou Neon Exodus).
        </p>
        <p>
          Na prática: se Float não encontra o valor e você suspeita de ponto flutuante, tente Double. Se nenhum funciona, o valor provavelmente é um inteiro em um tamanho diferente.
        </p>

        <h2>String — Texto</h2>
        <p>
          O tipo String busca sequências de texto na memória. Há dois subtipos importantes: ASCII (texto padrão, 1 byte por caractere) e Unicode (UTF-16, 2 bytes por caractere — usado pelo Windows internamente).
        </p>
        <p>
          Casos de uso comuns: encontrar strings de nome de personagem para localizar a estrutura do personagem; buscar textos de UI para encontrar variáveis relacionadas; identificar mensagens do sistema para entender fluxos de código. Strings raramente são o valor de gameplay que você quer modificar, mas são excelentes âncoras para encontrar estruturas de dados próximas.
        </p>
        <p>
          Para buscar uma string, mude o tipo para "String", selecione o encoding (UTF-8 para ASCII, UTF-16 para Unicode), e digite o texto. O CE retorna todos os endereços onde aquele texto aparece na memória. Use "Browse memory region" em um resultado para ver o contexto ao redor.
        </p>

        <h2>Array of Bytes — Sequências de Bytes Brutos</h2>
        <p>
          Array of Bytes (AOB) permite buscar por sequências de bytes em hexadecimal, com suporte a wildcards (?? = qualquer byte). É a técnica usada em scripts Auto Assembler para encontrar instruções de código independente do endereço exato.
        </p>
        <CodeBlock
          title="Exemplos de busca Array of Bytes"
          language="text"
          code={`Busca exata: FF 83 4C 00 00 00
  → Encontra exatamente essa sequência de bytes

  Com wildcard: FF ?? 4C ?? 00 00
  → O segundo e quarto bytes podem ser qualquer valor (0x00 a 0xFF)
  → Útil para padrões de código que variam por compilação ou versão

  Busca de instrução típica:
  8B 43 4C     → MOV EAX, [EBX+0x4C]
  83 E8 0A     → SUB EAX, 0x0A (subtrai 10)
  89 43 4C     → MOV [EBX+0x4C], EAX

  Se usar ?? para bytes variáveis:
  8B ?? 4C     → MOV EAX, [REG+0x4C]  (qualquer registrador base)
  83 ?? 0A     → SUB REG, 0x0A        (qualquer destino)`}
        />

        <AlertBox type="tip" title="Dica de diagnóstico rápido para tipo desconhecido">
          Não sabe o tipo? Faça varreduras paralelas: tente First Scan com 4 Bytes, depois tente com Float (mantendo ambos os resultados na mente). Se a varredura com 4 Bytes dá muitos resultados que não diminuem mesmo com Next Scans repetidos, e a de Float tem um candidato que responde bem, o valor é Float. Isso geralmente se torna óbvio em 2-3 ciclos de comparação.
        </AlertBox>
      </PageContainer>
    );
  }
  