import * as fs from 'fs';
import * as path from 'path';

interface ComandoItem {
  comando: string;
  descricao: string;
  acao: string;
}

interface PecaItem {
  item: string;
  quantidade: number;
  obs?: string;
}

interface PassoItem {
  passo: number;
  titulo: string;
  instrucao: string;
}

interface DiagnosticoItem {
  sintoma: string;
  causaProvavel: string;
  comoTestar: string;
}

interface ProjetoCelular {
  numero: number;
  slug: string;
  titulo: string;
  subtitulo: string;
  objetivo: string;
  nivel: 'Iniciante' | 'Intermediário' | 'Avançado';
  tempoEstimado: string;
  pecas: PecaItem[];
  comandos: ComandoItem[];
  passosMontagem: PassoItem[];
  comoParear: string[];
  seNaoResponder: DiagnosticoItem[];
  codigoFonte: string;
}

const projetosInfo = [
  {
    numero: 1,
    slug: 'led-bluetooth',
    folder: 'p01_led_bluetooth',
    titulo: 'Ligar e Desligar LED pelo Celular',
    subtitulo: 'O "Hello World" do Bluetooth no Arduino: acenda seu primeiro componente sem fios.',
    objetivo: 'Controlar um LED conectado ao pino 13 enviando os caracteres "1" e "0" pelo celular.',
    nivel: 'Iniciante' as const,
    tempoEstimado: '20 minutos',
    pecas: [
      { item: 'Arduino Uno R3 + Cabo USB', quantidade: 1, obs: 'Cérebro do circuito' },
      { item: 'Módulo Bluetooth HC-05 ou HC-06', quantidade: 1, obs: 'Receptor sem fio' },
      { item: 'Resistor de 1 kΩ (Marrom, Preto, Vermelho)', quantidade: 1, obs: 'R1 do divisor no RX' },
      { item: 'Resistor de 2 kΩ ou 2.2 kΩ', quantidade: 1, obs: 'R2 do divisor ao GND' },
      { item: 'LED Difuso 5mm (qualquer cor)', quantidade: 1, obs: 'Perna longa no pino 13' },
      { item: 'Resistor de 220 Ω (Vermelho, Vermelho, Marrom)', quantidade: 1, obs: 'Limitador do LED' },
      { item: 'Protoboard de 400 ou 830 furos', quantidade: 1 },
      { item: 'Fios Jumpers macho-macho e macho-fêmea', quantidade: 8 }
    ],
    comandos: [
      { comando: '1', descricao: 'Caractere numérico um', acao: 'Acende o LED e responde "LED ACESO" na tela do celular' },
      { comando: '0', descricao: 'Caractere numérico zero', acao: 'Apaga o LED e responde "LED APAGADO" na tela do celular' }
    ],
    passosMontagem: [
      { passo: 1, titulo: 'Alimente o barramento da protoboard', instrucao: 'Ligue o pino 5V do Arduino na linha vermelha (+) e o GND na linha azul (-).' },
      { passo: 2, titulo: 'Encaixe o módulo Bluetooth', instrucao: 'Posicione o HC-05 na protoboard. Conecte o pino VCC na linha vermelha (5V) e GND na linha azul (GND).' },
      { passo: 3, titulo: 'Ligue o pino TX do Bluetooth', instrucao: 'Conecte um fio jumper do pino TXD do módulo direto ao pino D2 do Arduino (ele opera em 3.3V e o Arduino lê com segurança).' },
      { passo: 4, titulo: 'Monte o divisor de tensão no RX do Bluetooth', instrucao: 'Ligue o resistor de 1 kΩ do pino D3 do Arduino ao pino RXD do Bluetooth. No mesmo pino RXD, ligue o resistor de 2 kΩ levando a outra ponta para a linha azul (GND).' },
      { passo: 5, titulo: 'Conecte o LED de teste', instrucao: 'Encaixe o LED com a perna longa (ânodo) em série com o resistor de 220 Ω até o pino 13. A perna curta vai ao GND.' },
      { passo: 6, titulo: 'Grave o código e ligue o celular', instrucao: 'Conecte o cabo USB, selecione a porta correta na IDE e envie o código. Abra o app no celular e digite 1.' }
    ]
  },
  {
    numero: 2,
    slug: 'semaforo-bluetooth',
    folder: 'p02_semaforo_bluetooth',
    titulo: 'Semáforo Inteligente Controlado pelo Celular',
    subtitulo: 'Alterne manualmente entre as cores ou ative o ciclo automático de cruzamento pela tela.',
    objetivo: 'Controlar 3 LEDs de sinalização (Verde, Amarelo e Vermelho) por comandos Bluetooth com opção de ciclo automático.',
    nivel: 'Iniciante' as const,
    tempoEstimado: '30 minutos',
    pecas: [
      { item: 'Arduino Uno R3', quantidade: 1 },
      { item: 'Módulo Bluetooth HC-05/HC-06', quantidade: 1 },
      { item: 'Divisor de tensão (1k e 2k)', quantidade: 2 },
      { item: 'LEDs 5mm (1 Verde, 1 Amarelo, 1 Vermelho)', quantidade: 3 },
      { item: 'Resistores de 220 Ω', quantidade: 3 },
      { item: 'Protoboard e Jumpers', quantidade: 1 }
    ],
    comandos: [
      { comando: 'V', descricao: 'Sinal Verde', acao: 'Desliga os outros e acende apenas o LED Verde (pino 8)' },
      { comando: 'A', descricao: 'Sinal Amarelo', acao: 'Desliga os outros e acende apenas o LED Amarelo (pino 9)' },
      { comando: 'R', descricao: 'Sinal Vermelho', acao: 'Desliga os outros e acende apenas o LED Vermelho (pino 10)' },
      { comando: 'C', descricao: 'Ciclo Automático', acao: 'Inicia a rotação de trânsito contínua (Verde 3s -> Amarelo 1.5s -> Vermelho 3s)' }
    ],
    passosMontagem: [
      { passo: 1, titulo: 'Mantenha a base do Bluetooth', instrucao: 'Conecte VCC (5V), GND, TXD no pino D2 e RXD no pino D3 com o divisor de tensão de 1k/2k.' },
      { passo: 2, titulo: 'Posicione os 3 LEDs em fila', instrucao: 'Coloque o LED Verde, Amarelo e Vermelho com os cátodos (pernas curtas) ligados ao GND.' },
      { passo: 3, titulo: 'Ligue os resistores de 220 Ω', instrucao: 'Conecte um resistor em cada ânodo (perna longa): Verde no pino D8, Amarelo no D9 e Vermelho no D10.' },
      { passo: 4, titulo: 'Envie o código e teste os comandos', instrucao: 'No app do celular, digite V, A, R para controle manual ou C para simular o cruzamento automático.' }
    ]
  },
  {
    numero: 3,
    slug: 'led-rgb-bluetooth',
    folder: 'p03_led_rgb_bluetooth',
    titulo: 'LED RGB: Escolha a Cor pelo Celular',
    subtitulo: 'Misture luzes e controle a cor de uma luminária ambiente enviando comandos de texto.',
    objetivo: 'Controlar as intensidades dos canais Vermelho, Verde e Azul de um LED RGB usando saídas PWM.',
    nivel: 'Iniciante' as const,
    tempoEstimado: '25 minutos',
    pecas: [
      { item: 'Arduino Uno R3', quantidade: 1 },
      { item: 'Módulo Bluetooth HC-05/HC-06 + Divisor 1k/2k', quantidade: 1 },
      { item: 'LED RGB Cátodo Comum (4 pernas)', quantidade: 1 },
      { item: 'Resistores de 220 Ω', quantidade: 3 },
      { item: 'Protoboard e Jumpers', quantidade: 8 }
    ],
    comandos: [
      { comando: 'R', descricao: 'Vermelho', acao: 'Acende canal Vermelho 100%' },
      { comando: 'G', descricao: 'Verde', acao: 'Acende canal Verde 100%' },
      { comando: 'B', descricao: 'Azul', acao: 'Acende canal Azul 100%' },
      { comando: 'Y', descricao: 'Amarelo', acao: 'Mistura Vermelho e Verde' },
      { comando: 'W', descricao: 'Branco', acao: 'Acende os 3 canais em potência máxima' },
      { comando: '0', descricao: 'Apagar', acao: 'Desliga todas as cores' }
    ],
    passosMontagem: [
      { passo: 1, titulo: 'Identifique os pinos do LED RGB', instrucao: 'A perna mais longa é o Cátodo (-) e vai ao GND. As outras três são R (vermelho), G (verde) e B (azul).' },
      { passo: 2, titulo: 'Instale resistores limitadores', instrucao: 'Coloque um resistor de 220 Ω em cada uma das 3 pernas de cor para proteger os pinos do Arduino.' },
      { passo: 3, titulo: 'Ligue aos pinos PWM', instrucao: 'Ligue o canal R no pino D9, G no pino D10 e B no pino D11 (todos com PWM).' },
      { passo: 4, titulo: 'Conecte o Bluetooth nos pinos 2 e 3', instrucao: 'Use o divisor de tensão de 1k/2k no RX e alimente com 5V e GND.' }
    ]
  },
  {
    numero: 4,
    slug: 'dimmer-bluetooth',
    folder: 'p04_dimmer_bluetooth',
    titulo: 'Dimmer de LED: Controle de Brilho de 0 a 100%',
    subtitulo: 'Regule a luminosidade do ambiente em 10 níveis enviando números de 0 a 9.',
    objetivo: 'Controlar o ciclo de trabalho PWM de uma lâmpada LED em degraus suaves pelo celular.',
    nivel: 'Iniciante' as const,
    tempoEstimado: '20 minutos',
    pecas: [
      { item: 'Arduino Uno R3', quantidade: 1 },
      { item: 'Módulo Bluetooth + Divisor 1k/2k', quantidade: 1 },
      { item: 'LED Alto Brilho 5mm', quantidade: 1 },
      { item: 'Resistor 220 Ω', quantidade: 1 },
      { item: 'Protoboard e Jumpers', quantidade: 6 }
    ],
    comandos: [
      { comando: '0', descricao: 'Desligado (0%)', acao: 'Apaga completamente o LED (PWM = 0)' },
      { comando: '5', descricao: 'Meia Potência (55%)', acao: 'Luminosidade média suave para leitura' },
      { comando: '9', descricao: 'Potência Máxima (100%)', acao: 'Brilho total do LED (PWM = 255)' }
    ],
    passosMontagem: [
      { passo: 1, titulo: 'Ligue o Bluetooth com divisor de tensão', instrucao: 'D2 no TX do BT, D3 no divisor 1k/2k para o RX do BT, VCC no 5V e GND no GND.' },
      { passo: 2, titulo: 'Conecte o LED ao pino D9', instrucao: 'Encaixe o LED no pino D9 (que tem o til ~ de PWM) com resistor de 220 Ω em série ao GND.' },
      { passo: 3, titulo: 'Envie o código e teste a escala', instrucao: 'Abra o terminal e digite 0, 1, 3, 5, 8, 9 para ver o brilho aumentar gradualmente.' }
    ]
  },
  {
    numero: 5,
    slug: 'alarme-bluetooth',
    folder: 'p05_alarme_bluetooth',
    titulo: 'Alarme Residencial com Aviso no Celular',
    subtitulo: 'O Arduino monitora portas e janelas e envia "INTRUSO!" para o seu smartphone na hora.',
    objetivo: 'Criar uma central de alarme sem fio com rearme remoto pelo app e aviso instantâneo.',
    nivel: 'Intermediário' as const,
    tempoEstimado: '35 minutos',
    pecas: [
      { item: 'Arduino Uno R3', quantidade: 1 },
      { item: 'Módulo Bluetooth + Divisor 1k/2k', quantidade: 1 },
      { item: 'Sensor Magnético Reed ou Pushbutton', quantidade: 1 },
      { item: 'Buzzer Sonoro 5V', quantidade: 1 },
      { item: 'Resistores e Jumpers', quantidade: 8 }
    ],
    comandos: [
      { comando: 'A', descricao: 'Armar Alarme', acao: 'Ativa a vigilância; se o sensor abrir, a sirene toca e manda mensagem' },
      { comando: 'D', descricao: 'Desarmar Alarme', acao: 'Cessa a sirene e desliga a vigilância para permitir passagem' }
    ],
    passosMontagem: [
      { passo: 1, titulo: 'Conecte o sensor de porta no pino D4', instrucao: 'Ligue um terminal do sensor magnético no pino D4 e o outro no GND (usa INPUT_PULLUP interno).' },
      { passo: 2, titulo: 'Ligue o buzzer no pino D8', instrucao: 'Conecte o polo positivo (+) do buzzer no pino D8 e o negativo (-) no GND.' },
      { passo: 3, titulo: 'Ligue o Bluetooth com segurança', instrucao: 'Conecte pinos 2 e 3 com o divisor de tensão e certifique-se de que o GND é comum.' },
      { passo: 4, titulo: 'Simule a invasão', instrucao: 'Arme com "A". Ao afastar o ímã do sensor, o celular vibra com o alerta "INTRUSO!" e a sirene toca.' }
    ]
  },
  {
    numero: 6,
    slug: 'pir-bluetooth',
    folder: 'p06_pir_bluetooth',
    titulo: 'Sensor de Presença PIR com Notificação no Celular',
    subtitulo: 'Detecte qualquer movimento de pessoas no cômodo e receba aviso em tempo real.',
    objetivo: 'Integrar sensor infravermelho passivo com envio assíncrono de notificações via Bluetooth.',
    nivel: 'Intermediário' as const,
    tempoEstimado: '30 minutos',
    pecas: [
      { item: 'Arduino Uno R3', quantidade: 1 },
      { item: 'Módulo Bluetooth HC-05/HC-06 + Divisor 1k/2k', quantidade: 1 },
      { item: 'Sensor de Presença PIR (HC-SR501)', quantidade: 1 },
      { item: 'LED Indicador + Resistor 220 Ω', quantidade: 1 },
      { item: 'Jumpers macho-fêmea', quantidade: 6 }
    ],
    comandos: [
      { comando: '(Automático)', descricao: 'Detecção contínua', acao: 'O Arduino envia "MOVIMENTO DETECTADO!" assim que alguém passa à frente do sensor' }
    ],
    passosMontagem: [
      { passo: 1, titulo: 'Conecte o sensor PIR', instrucao: 'VCC no 5V, GND no GND e o pino central OUT no pino digital D4 do Arduino.' },
      { passo: 2, titulo: 'Ajuste os potenciômetros do PIR', instrucao: 'Gire o potenciômetro de sensibilidade para a metade e o de tempo (delay) todo para o mínimo (sentido anti-horário).' },
      { passo: 3, titulo: 'Conecte o Bluetooth', instrucao: 'D2 no TX do BT, D3 no divisor 1k/2k para RX do BT.' },
      { passo: 4, titulo: 'Aguarde 30 segundos de calibração', instrucao: 'Ao ligar, o sensor PIR precisa de 30 segundos para estabilizar a leitura térmica do ambiente.' }
    ]
  },
  {
    numero: 7,
    slug: 'dht11-bluetooth',
    folder: 'p07_dht11_bluetooth',
    titulo: 'Termômetro e Higrômetro no Celular',
    subtitulo: 'Temperatura e umidade do quarto transmitidas direto para o seu smartphone a cada 5 segundos.',
    objetivo: 'Ler grandezas ambientais digitais e formatar um painel de telemetria sem fio.',
    nivel: 'Intermediário' as const,
    tempoEstimado: '35 minutos',
    pecas: [
      { item: 'Arduino Uno R3', quantidade: 1 },
      { item: 'Módulo Bluetooth HC-05/HC-06 + Divisor 1k/2k', quantidade: 1 },
      { item: 'Sensor de Temperatura e Umidade DHT11', quantidade: 1 },
      { item: 'Resistor de 10 kΩ (Pull-up de dados)', quantidade: 1 },
      { item: 'Jumpers e Protoboard', quantidade: 7 }
    ],
    comandos: [
      { comando: 'L', descricao: 'Leitura Instantânea', acao: 'Força a medição imediata de temperatura e umidade' },
      { comando: '(Automático)', descricao: 'Telemetria Contínua', acao: 'Atualiza os dados na tela do celular a cada 5 segundos' }
    ],
    passosMontagem: [
      { passo: 1, titulo: 'Conecte o sensor DHT11', instrucao: 'Pino 1 (VCC) no 5V, pino 2 (Dados) no D4 com resistor de 10k ligado ao 5V, e pino 4 (GND) no GND.' },
      { passo: 2, titulo: 'Ligue o Bluetooth', instrucao: 'Ligue os pinos de comunicação serial (D2 e D3 com divisor).' },
      { passo: 3, titulo: 'Acompanhe no app', instrucao: 'Veja as linhas "Temp: 25.0 C | Umid: 60.0 %" subindo no terminal a cada 5 segundos.' }
    ]
  },
  {
    numero: 8,
    slug: 'servo-bluetooth',
    folder: 'p08_servo_bluetooth',
    titulo: 'Fechadura / Cancela com Servo Motor',
    subtitulo: 'Abra e feche portas, gavetas secretas ou cancelas de garagem com um toque no celular.',
    objetivo: 'Controlar o ângulo exato de um servo motor SG90 por comando serial com trava mecânica.',
    nivel: 'Intermediário' as const,
    tempoEstimado: '35 minutos',
    pecas: [
      { item: 'Arduino Uno R3', quantidade: 1 },
      { item: 'Módulo Bluetooth HC-05/HC-06 + Divisor 1k/2k', quantidade: 1 },
      { item: 'Micro Servo Motor 9g (SG90)', quantidade: 1 },
      { item: 'Fonte ou Pilhas externas para o servo', quantidade: 1, obs: 'Altamente recomendado' },
      { item: 'Jumpers', quantidade: 8 }
    ],
    comandos: [
      { comando: 'A', descricao: 'Abrir Cancela', acao: 'Move o servo para 90 graus (posição aberta)' },
      { comando: 'F', descricao: 'Fechar Cancela', acao: 'Move o servo para 0 grau (posição fechada e travada)' }
    ],
    passosMontagem: [
      { passo: 1, titulo: 'Atenção aos fios do Servo', instrucao: 'Marrom = GND, Vermelho = 5V, Laranja/Amarelo = Sinal de controle.' },
      { passo: 2, titulo: 'Conecte o sinal no pino D9', instrucao: 'Ligue o fio de sinal (laranja) no pino D9 do Arduino.' },
      { passo: 3, titulo: 'Alimentação do Servo', instrucao: 'Para testes leves o 5V do Arduino serve; se for puxar uma tranca real, alimente o servo por 4 pilhas com GND compartilhado.' },
      { passo: 4, titulo: 'Teste no app', instrucao: 'Envie "A" para liberar a trava e "F" para recolher o trinco.' }
    ]
  },
  {
    numero: 9,
    slug: 'lcd-bluetooth',
    folder: 'p09_lcd_bluetooth',
    titulo: 'Mensagem no Display LCD Enviada pelo Celular',
    subtitulo: 'Digite qualquer frase no seu smartphone e veja o texto aparecer instantaneamente na tela do Arduino.',
    objetivo: 'Receber strings de texto completas via serial e exibi-las em um display LCD 16x2 com protocolo I2C.',
    nivel: 'Intermediário' as const,
    tempoEstimado: '40 minutos',
    pecas: [
      { item: 'Arduino Uno R3', quantidade: 1 },
      { item: 'Módulo Bluetooth + Divisor 1k/2k', quantidade: 1 },
      { item: 'Display LCD 16x2 com Módulo I2C', quantidade: 1 },
      { item: 'Jumpers macho-fêmea', quantidade: 8 }
    ],
    comandos: [
      { comando: 'Qualquer texto + Enter', descricao: 'Mensagem Livre', acao: 'Exibe o texto no LCD (até 32 caracteres divididos em 2 linhas de 16)' }
    ],
    passosMontagem: [
      { passo: 1, titulo: 'Ligue o display LCD I2C', instrucao: 'VCC no 5V, GND no GND, SDA no pino A4 e SCL no pino A5 do Arduino.' },
      { passo: 2, titulo: 'Ajuste o contraste no trimpot traseiro', instrucao: 'Gire o potenciômetro azul atrás da placa com chave de fenda até ver os blocos pretos dos caracteres.' },
      { passo: 3, titulo: 'Conecte o Bluetooth nos pinos D2 e D3', instrucao: 'D2 no TX do BT, D3 no divisor 1k/2k para o RX do BT.' },
      { passo: 4, titulo: 'Envie sua mensagem', instrucao: 'No app do celular, digite "Ola Mundo!" e aperte Enviar. A frase surge imediatamente na tela azul.' }
    ]
  },
  {
    numero: 10,
    slug: 'carrinho-bluetooth',
    folder: 'p10_carrinho_bluetooth',
    titulo: 'Carrinho Robô 2 Rodas Controlado pelo Celular',
    subtitulo: 'O projeto final dos sonhos: frente, ré, curvas ágeis e parada instantânea pelo celular.',
    objetivo: 'Controlar uma ponte H com dois motores DC usando comandos direcionais sem fio.',
    nivel: 'Avançado' as const,
    tempoEstimado: '60 minutos',
    pecas: [
      { item: 'Arduino Uno R3', quantidade: 1 },
      { item: 'Módulo Bluetooth HC-05/HC-06 + Divisor 1k/2k', quantidade: 1 },
      { item: 'Kit Chassi 2 Rodas com 2 motores DC e roda boba', quantidade: 1 },
      { item: 'Módulo Ponte H (L298N ou L9110S)', quantidade: 1 },
      { item: 'Suporte de 4 pilhas AA (6V) para os motores', quantidade: 1, obs: 'OBRIGATÓRIO fonte separada' },
      { item: 'Bateria ou powerbank para o Arduino', quantidade: 1 },
      { item: 'Jumpers e parafusos de fixação', quantidade: 14 }
    ],
    comandos: [
      { comando: 'F', descricao: 'Frente', acao: 'Gira os dois motores para frente' },
      { comando: 'T', descricao: 'Ré', acao: 'Inverte o sentido dos dois motores' },
      { comando: 'E', descricao: 'Esquerda', acao: 'Gira o motor direito para frente e o esquerdo para trás' },
      { comando: 'D', descricao: 'Direita', acao: 'Gira o motor esquerdo para frente e o direito para trás' },
      { comando: 'P', descricao: 'Parar', acao: 'Corta a energia de ambos os motores imediatamente' }
    ],
    passosMontagem: [
      { passo: 1, titulo: 'Monte a mecânica do chassi', instrucao: 'Fixe os 2 motores DC com caixa amarela e a roda boba na placa de acrílico.' },
      { passo: 2, titulo: 'Conecte os motores na Ponte H', instrucao: 'Ligue os 2 fios do motor esquerdo nos bornes OUT1/OUT2 e o motor direito nos bornes OUT3/OUT4.' },
      { passo: 3, titulo: 'REGRA VITAL: Alimentação dos motores', instrucao: 'Ligue o suporte de 4 pilhas AA no borne VCC (12V) e GND da ponte H. UNA o GND da ponte H ao GND do Arduino!' },
      { passo: 4, titulo: 'Ligue os pinos de controle no Arduino', instrucao: 'IN1 no pino D5, IN2 no pino D6, IN3 no pino D9 e IN4 no pino D10.' },
      { passo: 5, titulo: 'Conecte o Bluetooth', instrucao: 'D2 no TX do BT, D3 no divisor 1k/2k para o RX do BT, VCC no 5V do Arduino e GND no barramento comum.' },
      { passo: 6, titulo: 'Calibre o sentido de giro', instrucao: 'Se ao mandar "F" uma roda girar para trás, basta inverter os dois fios daquele motor no borne da ponte H.' }
    ]
  }
];

const diagnosticosGerais: DiagnosticoItem[] = [
  {
    sintoma: 'O celular não encontra o módulo na lista de Bluetooth',
    causaProvavel: 'Módulo sem energia ou uso de iPhone com módulo HC-05.',
    comoTestar: '1) Confira se o LED vermelho do Bluetooth está piscando. Se estiver apagado, meça a tensão no VCC (deve dar 5V). 2) Se você tem iPhone, o HC-05 não aparece: você precisa do módulo HM-10 (BLE).'
  },
  {
    sintoma: 'O app conecta, mas o Arduino não reage a nenhum comando',
    causaProvavel: 'Fios TX e RX invertidos ou esquecimento do divisor.',
    comoTestar: 'Lembre-se: o TX do Bluetooth vai no D2 do Arduino, e o D3 do Arduino vai no RX do Bluetooth através do divisor de tensão. Se você ligou TX com TX, eles estão ambos tentando falar no mesmo fio.'
  },
  {
    sintoma: 'Aparecem caracteres estranhos ou pontos de interrogação no app',
    causaProvavel: 'Baud rate divergente entre o código e o aplicativo.',
    comoTestar: 'Abra as configurações do app Serial Bluetooth Terminal e confirme se o Baudrate está fixado em 9600.'
  },
  {
    sintoma: 'O módulo reinicia ou desliga quando o motor/servo é acionado',
    causaProvavel: 'Queda de tensão por alimentar motor no pino 5V do Arduino.',
    comoTestar: 'Desconecte o motor do pino 5V e use alimentação externa separada (pilhas) com o GND interligado.'
  }
];

const comoParearPadrao = [
  'Ligue o Arduino pelo cabo USB ou fonte.',
  'Confira se o LED do módulo Bluetooth está piscando rápido (2 a 3 vezes por segundo).',
  'Abra as Configurações do seu celular > Bluetooth > Procurar novos dispositivos.',
  'Toque em "HC-05" (ou "HC-06") e digite o PIN "1234" (ou "0000").',
  'Abra o aplicativo "Serial Bluetooth Terminal" no Android.',
  'Toque no menu lateral (três linhas) > "Devices" > aba "Bluetooth Classic" e selecione o HC-05.',
  'O LED do módulo vai ficar aceso ou piscar duplo suave: a conexão está pronta!'
];

async function run() {
  console.log('[PROJETOS-CELULAR] Gerando dados dos 10 projetos Bluetooth...');
  const sketchesDir = path.resolve(process.cwd(), 'sketches');

  const output: ProjetoCelular[] = [];

  for (const info of projetosInfo) {
    const inoPath = path.join(sketchesDir, info.folder, `${info.folder}.ino`);
    const codigoFonte = fs.readFileSync(inoPath, 'utf8');

    output.push({
      numero: info.numero,
      slug: info.slug,
      titulo: info.titulo,
      subtitulo: info.subtitulo,
      objetivo: info.objetivo,
      nivel: info.nivel,
      tempoEstimado: info.tempoEstimado,
      pecas: info.pecas,
      comandos: info.comandos,
      passosMontagem: info.passosMontagem,
      comoParear: comoParearPadrao,
      seNaoResponder: diagnosticosGerais,
      codigoFonte
    });
  }

  const targetFile = path.resolve(process.cwd(), 'src/content/projetosCelular.ts');
  const tsContent = `// Dados completos e compilados dos 10 Projetos Arduino no Celular
export interface ComandoItem {
  comando: string;
  descricao: string;
  acao: string;
}

export interface PecaItem {
  item: string;
  quantidade: number;
  obs?: string;
}

export interface PassoItem {
  passo: number;
  titulo: string;
  instrucao: string;
}

export interface DiagnosticoItem {
  sintoma: string;
  causaProvavel: string;
  comoTestar: string;
}

export interface ProjetoCelular {
  numero: number;
  slug: string;
  titulo: string;
  subtitulo: string;
  objetivo: string;
  nivel: 'Iniciante' | 'Intermediário' | 'Avançado';
  tempoEstimado: string;
  pecas: PecaItem[];
  comandos: ComandoItem[];
  passosMontagem: PassoItem[];
  comoParear: string[];
  seNaoResponder: DiagnosticoItem[];
  codigoFonte: string;
}

export const PROJETOS_CELULAR: ProjetoCelular[] = ${JSON.stringify(output, null, 2)};
`;

  fs.writeFileSync(targetFile, tsContent, 'utf8');
  console.log(`[PROJETOS-CELULAR] Gravado com sucesso em: ${targetFile}`);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
