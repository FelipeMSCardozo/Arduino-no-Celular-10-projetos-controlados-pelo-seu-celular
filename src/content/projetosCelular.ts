// Dados completos e compilados dos 10 Projetos Arduino no Celular
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

export const PROJETOS_CELULAR: ProjetoCelular[] = [
  {
    "numero": 1,
    "slug": "led-bluetooth",
    "titulo": "Ligar e Desligar LED pelo Celular",
    "subtitulo": "O \"Hello World\" do Bluetooth no Arduino: acenda seu primeiro componente sem fios.",
    "objetivo": "Controlar um LED conectado ao pino 13 enviando os caracteres \"1\" e \"0\" pelo celular.",
    "nivel": "Iniciante",
    "tempoEstimado": "20 minutos",
    "pecas": [
      {
        "item": "Arduino Uno R3 + Cabo USB",
        "quantidade": 1,
        "obs": "Cérebro do circuito"
      },
      {
        "item": "Módulo Bluetooth HC-05 ou HC-06",
        "quantidade": 1,
        "obs": "Receptor sem fio"
      },
      {
        "item": "Resistor de 1 kΩ (Marrom, Preto, Vermelho)",
        "quantidade": 1,
        "obs": "R1 do divisor no RX"
      },
      {
        "item": "Resistor de 2 kΩ ou 2.2 kΩ",
        "quantidade": 1,
        "obs": "R2 do divisor ao GND"
      },
      {
        "item": "LED Difuso 5mm (qualquer cor)",
        "quantidade": 1,
        "obs": "Perna longa no pino 13"
      },
      {
        "item": "Resistor de 220 Ω (Vermelho, Vermelho, Marrom)",
        "quantidade": 1,
        "obs": "Limitador do LED"
      },
      {
        "item": "Protoboard de 400 ou 830 furos",
        "quantidade": 1
      },
      {
        "item": "Fios Jumpers macho-macho e macho-fêmea",
        "quantidade": 8
      }
    ],
    "comandos": [
      {
        "comando": "1",
        "descricao": "Caractere numérico um",
        "acao": "Acende o LED e responde \"LED ACESO\" na tela do celular"
      },
      {
        "comando": "0",
        "descricao": "Caractere numérico zero",
        "acao": "Apaga o LED e responde \"LED APAGADO\" na tela do celular"
      }
    ],
    "passosMontagem": [
      {
        "passo": 1,
        "titulo": "Alimente o barramento da protoboard",
        "instrucao": "Ligue o pino 5V do Arduino na linha vermelha (+) e o GND na linha azul (-)."
      },
      {
        "passo": 2,
        "titulo": "Encaixe o módulo Bluetooth",
        "instrucao": "Posicione o HC-05 na protoboard. Conecte o pino VCC na linha vermelha (5V) e GND na linha azul (GND)."
      },
      {
        "passo": 3,
        "titulo": "Ligue o pino TX do Bluetooth",
        "instrucao": "Conecte um fio jumper do pino TXD do módulo direto ao pino D2 do Arduino (ele opera em 3.3V e o Arduino lê com segurança)."
      },
      {
        "passo": 4,
        "titulo": "Monte o divisor de tensão no RX do Bluetooth",
        "instrucao": "Ligue o resistor de 1 kΩ do pino D3 do Arduino ao pino RXD do Bluetooth. No mesmo pino RXD, ligue o resistor de 2 kΩ levando a outra ponta para a linha azul (GND)."
      },
      {
        "passo": 5,
        "titulo": "Conecte o LED de teste",
        "instrucao": "Encaixe o LED com a perna longa (ânodo) em série com o resistor de 220 Ω até o pino 13. A perna curta vai ao GND."
      },
      {
        "passo": 6,
        "titulo": "Grave o código e ligue o celular",
        "instrucao": "Conecte o cabo USB, selecione a porta correta na IDE e envie o código. Abra o app no celular e digite 1."
      }
    ],
    "comoParear": [
      "Ligue o Arduino pelo cabo USB ou fonte.",
      "Confira se o LED do módulo Bluetooth está piscando rápido (2 a 3 vezes por segundo).",
      "Abra as Configurações do seu celular > Bluetooth > Procurar novos dispositivos.",
      "Toque em \"HC-05\" (ou \"HC-06\") e digite o PIN \"1234\" (ou \"0000\").",
      "Abra o aplicativo \"Serial Bluetooth Terminal\" no Android.",
      "Toque no menu lateral (três linhas) > \"Devices\" > aba \"Bluetooth Classic\" e selecione o HC-05.",
      "O LED do módulo vai ficar aceso ou piscar duplo suave: a conexão está pronta!"
    ],
    "seNaoResponder": [
      {
        "sintoma": "O celular não encontra o módulo na lista de Bluetooth",
        "causaProvavel": "Módulo sem energia ou uso de iPhone com módulo HC-05.",
        "comoTestar": "1) Confira se o LED vermelho do Bluetooth está piscando. Se estiver apagado, meça a tensão no VCC (deve dar 5V). 2) Se você tem iPhone, o HC-05 não aparece: você precisa do módulo HM-10 (BLE)."
      },
      {
        "sintoma": "O app conecta, mas o Arduino não reage a nenhum comando",
        "causaProvavel": "Fios TX e RX invertidos ou esquecimento do divisor.",
        "comoTestar": "Lembre-se: o TX do Bluetooth vai no D2 do Arduino, e o D3 do Arduino vai no RX do Bluetooth através do divisor de tensão. Se você ligou TX com TX, eles estão ambos tentando falar no mesmo fio."
      },
      {
        "sintoma": "Aparecem caracteres estranhos ou pontos de interrogação no app",
        "causaProvavel": "Baud rate divergente entre o código e o aplicativo.",
        "comoTestar": "Abra as configurações do app Serial Bluetooth Terminal e confirme se o Baudrate está fixado em 9600."
      },
      {
        "sintoma": "O módulo reinicia ou desliga quando o motor/servo é acionado",
        "causaProvavel": "Queda de tensão por alimentar motor no pino 5V do Arduino.",
        "comoTestar": "Desconecte o motor do pino 5V e use alimentação externa separada (pilhas) com o GND interligado."
      }
    ],
    "codigoFonte": "/*\n * Projeto 01: Ligar e Desligar LED pelo Celular\n * Comunicação: SoftwareSerial nos pinos 2 (RX do Arduino) e 3 (TX do Arduino)\n * Divisor de tensão obrigatório no RX do Bluetooth: D3 -> 1k -> RX_BT -> 2k -> GND\n */\n#include <SoftwareSerial.h>\n\nconst byte PINO_BT_RX = 2; // Conectado ao TX do módulo Bluetooth\nconst byte PINO_BT_TX = 3; // Conectado ao divisor de tensão que vai ao RX do módulo\nconst byte PINO_LED = 13;  // LED indicador no pino 13\n\nSoftwareSerial bluetooth(PINO_BT_RX, PINO_BT_TX);\n\nvoid setup() {\n  pinMode(PINO_LED, OUTPUT);\n  digitalWrite(PINO_LED, LOW);\n\n  Serial.begin(9600);\n  bluetooth.begin(9600);\n\n  Serial.println(F(\"Projeto 01: LED Bluetooth iniciado!\"));\n  bluetooth.println(F(\"Arduino pronto! Envie 1 para ligar ou 0 para desligar.\"));\n}\n\nvoid loop() {\n  if (bluetooth.available()) {\n    char comando = bluetooth.read();\n    Serial.print(F(\"Comando recebido: \"));\n    Serial.println(comando);\n\n    if (comando == '1') {\n      digitalWrite(PINO_LED, HIGH);\n      bluetooth.println(F(\"LED ACESO\"));\n    } else if (comando == '0') {\n      digitalWrite(PINO_LED, LOW);\n      bluetooth.println(F(\"LED APAGADO\"));\n    }\n  }\n}\n"
  },
  {
    "numero": 2,
    "slug": "semaforo-bluetooth",
    "titulo": "Semáforo Inteligente Controlado pelo Celular",
    "subtitulo": "Alterne manualmente entre as cores ou ative o ciclo automático de cruzamento pela tela.",
    "objetivo": "Controlar 3 LEDs de sinalização (Verde, Amarelo e Vermelho) por comandos Bluetooth com opção de ciclo automático.",
    "nivel": "Iniciante",
    "tempoEstimado": "30 minutos",
    "pecas": [
      {
        "item": "Arduino Uno R3",
        "quantidade": 1
      },
      {
        "item": "Módulo Bluetooth HC-05/HC-06",
        "quantidade": 1
      },
      {
        "item": "Divisor de tensão (1k e 2k)",
        "quantidade": 2
      },
      {
        "item": "LEDs 5mm (1 Verde, 1 Amarelo, 1 Vermelho)",
        "quantidade": 3
      },
      {
        "item": "Resistores de 220 Ω",
        "quantidade": 3
      },
      {
        "item": "Protoboard e Jumpers",
        "quantidade": 1
      }
    ],
    "comandos": [
      {
        "comando": "V",
        "descricao": "Sinal Verde",
        "acao": "Desliga os outros e acende apenas o LED Verde (pino 8)"
      },
      {
        "comando": "A",
        "descricao": "Sinal Amarelo",
        "acao": "Desliga os outros e acende apenas o LED Amarelo (pino 9)"
      },
      {
        "comando": "R",
        "descricao": "Sinal Vermelho",
        "acao": "Desliga os outros e acende apenas o LED Vermelho (pino 10)"
      },
      {
        "comando": "C",
        "descricao": "Ciclo Automático",
        "acao": "Inicia a rotação de trânsito contínua (Verde 3s -> Amarelo 1.5s -> Vermelho 3s)"
      }
    ],
    "passosMontagem": [
      {
        "passo": 1,
        "titulo": "Mantenha a base do Bluetooth",
        "instrucao": "Conecte VCC (5V), GND, TXD no pino D2 e RXD no pino D3 com o divisor de tensão de 1k/2k."
      },
      {
        "passo": 2,
        "titulo": "Posicione os 3 LEDs em fila",
        "instrucao": "Coloque o LED Verde, Amarelo e Vermelho com os cátodos (pernas curtas) ligados ao GND."
      },
      {
        "passo": 3,
        "titulo": "Ligue os resistores de 220 Ω",
        "instrucao": "Conecte um resistor em cada ânodo (perna longa): Verde no pino D8, Amarelo no D9 e Vermelho no D10."
      },
      {
        "passo": 4,
        "titulo": "Envie o código e teste os comandos",
        "instrucao": "No app do celular, digite V, A, R para controle manual ou C para simular o cruzamento automático."
      }
    ],
    "comoParear": [
      "Ligue o Arduino pelo cabo USB ou fonte.",
      "Confira se o LED do módulo Bluetooth está piscando rápido (2 a 3 vezes por segundo).",
      "Abra as Configurações do seu celular > Bluetooth > Procurar novos dispositivos.",
      "Toque em \"HC-05\" (ou \"HC-06\") e digite o PIN \"1234\" (ou \"0000\").",
      "Abra o aplicativo \"Serial Bluetooth Terminal\" no Android.",
      "Toque no menu lateral (três linhas) > \"Devices\" > aba \"Bluetooth Classic\" e selecione o HC-05.",
      "O LED do módulo vai ficar aceso ou piscar duplo suave: a conexão está pronta!"
    ],
    "seNaoResponder": [
      {
        "sintoma": "O celular não encontra o módulo na lista de Bluetooth",
        "causaProvavel": "Módulo sem energia ou uso de iPhone com módulo HC-05.",
        "comoTestar": "1) Confira se o LED vermelho do Bluetooth está piscando. Se estiver apagado, meça a tensão no VCC (deve dar 5V). 2) Se você tem iPhone, o HC-05 não aparece: você precisa do módulo HM-10 (BLE)."
      },
      {
        "sintoma": "O app conecta, mas o Arduino não reage a nenhum comando",
        "causaProvavel": "Fios TX e RX invertidos ou esquecimento do divisor.",
        "comoTestar": "Lembre-se: o TX do Bluetooth vai no D2 do Arduino, e o D3 do Arduino vai no RX do Bluetooth através do divisor de tensão. Se você ligou TX com TX, eles estão ambos tentando falar no mesmo fio."
      },
      {
        "sintoma": "Aparecem caracteres estranhos ou pontos de interrogação no app",
        "causaProvavel": "Baud rate divergente entre o código e o aplicativo.",
        "comoTestar": "Abra as configurações do app Serial Bluetooth Terminal e confirme se o Baudrate está fixado em 9600."
      },
      {
        "sintoma": "O módulo reinicia ou desliga quando o motor/servo é acionado",
        "causaProvavel": "Queda de tensão por alimentar motor no pino 5V do Arduino.",
        "comoTestar": "Desconecte o motor do pino 5V e use alimentação externa separada (pilhas) com o GND interligado."
      }
    ],
    "codigoFonte": "/*\n * Projeto 02: Semáforo Inteligente Controlado pelo Celular\n * Comandos: 'V' (Verde), 'A' (Amarelo), 'R' (Vermelho), 'C' (Ciclo automático)\n */\n#include <SoftwareSerial.h>\n\nconst byte PINO_BT_RX = 2;\nconst byte PINO_BT_TX = 3;\n\nconst byte PINO_VERDE = 8;\nconst byte PINO_AMARELO = 9;\nconst byte PINO_VERMELHO = 10;\n\nSoftwareSerial bluetooth(PINO_BT_RX, PINO_BT_TX);\nbool modoAutomatico = false;\nunsigned long tempoAnterior = 0;\nbyte faseAutomatica = 0;\n\nvoid desligarTodos() {\n  digitalWrite(PINO_VERDE, LOW);\n  digitalWrite(PINO_AMARELO, LOW);\n  digitalWrite(PINO_VERMELHO, LOW);\n}\n\nvoid setup() {\n  pinMode(PINO_VERDE, OUTPUT);\n  pinMode(PINO_AMARELO, OUTPUT);\n  pinMode(PINO_VERMELHO, OUTPUT);\n\n  desligarTodos();\n  digitalWrite(PINO_VERMELHO, HIGH);\n\n  Serial.begin(9600);\n  bluetooth.begin(9600);\n  bluetooth.println(F(\"Semáforo pronto: envie V, A, R ou C (Ciclo)\"));\n}\n\nvoid loop() {\n  if (bluetooth.available()) {\n    char c = bluetooth.read();\n    if (c == 'V' || c == 'v') {\n      modoAutomatico = false;\n      desligarTodos();\n      digitalWrite(PINO_VERDE, HIGH);\n      bluetooth.println(F(\"Sinal: VERDE\"));\n    } else if (c == 'A' || c == 'a') {\n      modoAutomatico = false;\n      desligarTodos();\n      digitalWrite(PINO_AMARELO, HIGH);\n      bluetooth.println(F(\"Sinal: AMARELO\"));\n    } else if (c == 'R' || c == 'r') {\n      modoAutomatico = false;\n      desligarTodos();\n      digitalWrite(PINO_VERMELHO, HIGH);\n      bluetooth.println(F(\"Sinal: VERMELHO\"));\n    } else if (c == 'C' || c == 'c') {\n      modoAutomatico = true;\n      tempoAnterior = millis();\n      faseAutomatica = 0;\n      bluetooth.println(F(\"Modo: AUTOMÁTICO INICIADO\"));\n    }\n  }\n\n  if (modoAutomatico) {\n    unsigned long agora = millis();\n    if (faseAutomatica == 0 && agora - tempoAnterior >= 3000) {\n      desligarTodos();\n      digitalWrite(PINO_AMARELO, HIGH);\n      faseAutomatica = 1;\n      tempoAnterior = agora;\n    } else if (faseAutomatica == 1 && agora - tempoAnterior >= 1500) {\n      desligarTodos();\n      digitalWrite(PINO_VERMELHO, HIGH);\n      faseAutomatica = 2;\n      tempoAnterior = agora;\n    } else if (faseAutomatica == 2 && agora - tempoAnterior >= 3000) {\n      desligarTodos();\n      digitalWrite(PINO_VERDE, HIGH);\n      faseAutomatica = 0;\n      tempoAnterior = agora;\n    }\n  }\n}\n"
  },
  {
    "numero": 3,
    "slug": "led-rgb-bluetooth",
    "titulo": "LED RGB: Escolha a Cor pelo Celular",
    "subtitulo": "Misture luzes e controle a cor de uma luminária ambiente enviando comandos de texto.",
    "objetivo": "Controlar as intensidades dos canais Vermelho, Verde e Azul de um LED RGB usando saídas PWM.",
    "nivel": "Iniciante",
    "tempoEstimado": "25 minutos",
    "pecas": [
      {
        "item": "Arduino Uno R3",
        "quantidade": 1
      },
      {
        "item": "Módulo Bluetooth HC-05/HC-06 + Divisor 1k/2k",
        "quantidade": 1
      },
      {
        "item": "LED RGB Cátodo Comum (4 pernas)",
        "quantidade": 1
      },
      {
        "item": "Resistores de 220 Ω",
        "quantidade": 3
      },
      {
        "item": "Protoboard e Jumpers",
        "quantidade": 8
      }
    ],
    "comandos": [
      {
        "comando": "R",
        "descricao": "Vermelho",
        "acao": "Acende canal Vermelho 100%"
      },
      {
        "comando": "G",
        "descricao": "Verde",
        "acao": "Acende canal Verde 100%"
      },
      {
        "comando": "B",
        "descricao": "Azul",
        "acao": "Acende canal Azul 100%"
      },
      {
        "comando": "Y",
        "descricao": "Amarelo",
        "acao": "Mistura Vermelho e Verde"
      },
      {
        "comando": "W",
        "descricao": "Branco",
        "acao": "Acende os 3 canais em potência máxima"
      },
      {
        "comando": "0",
        "descricao": "Apagar",
        "acao": "Desliga todas as cores"
      }
    ],
    "passosMontagem": [
      {
        "passo": 1,
        "titulo": "Identifique os pinos do LED RGB",
        "instrucao": "A perna mais longa é o Cátodo (-) e vai ao GND. As outras três são R (vermelho), G (verde) e B (azul)."
      },
      {
        "passo": 2,
        "titulo": "Instale resistores limitadores",
        "instrucao": "Coloque um resistor de 220 Ω em cada uma das 3 pernas de cor para proteger os pinos do Arduino."
      },
      {
        "passo": 3,
        "titulo": "Ligue aos pinos PWM",
        "instrucao": "Ligue o canal R no pino D9, G no pino D10 e B no pino D11 (todos com PWM)."
      },
      {
        "passo": 4,
        "titulo": "Conecte o Bluetooth nos pinos 2 e 3",
        "instrucao": "Use o divisor de tensão de 1k/2k no RX e alimente com 5V e GND."
      }
    ],
    "comoParear": [
      "Ligue o Arduino pelo cabo USB ou fonte.",
      "Confira se o LED do módulo Bluetooth está piscando rápido (2 a 3 vezes por segundo).",
      "Abra as Configurações do seu celular > Bluetooth > Procurar novos dispositivos.",
      "Toque em \"HC-05\" (ou \"HC-06\") e digite o PIN \"1234\" (ou \"0000\").",
      "Abra o aplicativo \"Serial Bluetooth Terminal\" no Android.",
      "Toque no menu lateral (três linhas) > \"Devices\" > aba \"Bluetooth Classic\" e selecione o HC-05.",
      "O LED do módulo vai ficar aceso ou piscar duplo suave: a conexão está pronta!"
    ],
    "seNaoResponder": [
      {
        "sintoma": "O celular não encontra o módulo na lista de Bluetooth",
        "causaProvavel": "Módulo sem energia ou uso de iPhone com módulo HC-05.",
        "comoTestar": "1) Confira se o LED vermelho do Bluetooth está piscando. Se estiver apagado, meça a tensão no VCC (deve dar 5V). 2) Se você tem iPhone, o HC-05 não aparece: você precisa do módulo HM-10 (BLE)."
      },
      {
        "sintoma": "O app conecta, mas o Arduino não reage a nenhum comando",
        "causaProvavel": "Fios TX e RX invertidos ou esquecimento do divisor.",
        "comoTestar": "Lembre-se: o TX do Bluetooth vai no D2 do Arduino, e o D3 do Arduino vai no RX do Bluetooth através do divisor de tensão. Se você ligou TX com TX, eles estão ambos tentando falar no mesmo fio."
      },
      {
        "sintoma": "Aparecem caracteres estranhos ou pontos de interrogação no app",
        "causaProvavel": "Baud rate divergente entre o código e o aplicativo.",
        "comoTestar": "Abra as configurações do app Serial Bluetooth Terminal e confirme se o Baudrate está fixado em 9600."
      },
      {
        "sintoma": "O módulo reinicia ou desliga quando o motor/servo é acionado",
        "causaProvavel": "Queda de tensão por alimentar motor no pino 5V do Arduino.",
        "comoTestar": "Desconecte o motor do pino 5V e use alimentação externa separada (pilhas) com o GND interligado."
      }
    ],
    "codigoFonte": "/*\n * Projeto 03: LED RGB com Seleção de Cores via Celular\n * Comandos: 'R' (Vermelho), 'G' (Verde), 'B' (Azul), 'Y' (Amarelo), 'W' (Branco), '0' (Apagar)\n */\n#include <SoftwareSerial.h>\n\nconst byte PINO_BT_RX = 2;\nconst byte PINO_BT_TX = 3;\n\nconst byte PINO_RED = 9;   // Pinos PWM\nconst byte PINO_GREEN = 10;\nconst byte PINO_BLUE = 11;\n\nSoftwareSerial bluetooth(PINO_BT_RX, PINO_BT_TX);\n\nvoid definirCor(byte r, byte g, byte b) {\n  // Cátodo comum (HIGH = liga, LOW = desliga)\n  analogWrite(PINO_RED, r);\n  analogWrite(PINO_GREEN, g);\n  analogWrite(PINO_BLUE, b);\n}\n\nvoid setup() {\n  pinMode(PINO_RED, OUTPUT);\n  pinMode(PINO_GREEN, OUTPUT);\n  pinMode(PINO_BLUE, OUTPUT);\n\n  definirCor(0, 0, 0); // Começa desligado\n\n  Serial.begin(9600);\n  bluetooth.begin(9600);\n  bluetooth.println(F(\"RGB Bluetooth pronto: envie R, G, B, Y, W ou 0\"));\n}\n\nvoid loop() {\n  if (bluetooth.available()) {\n    char c = bluetooth.read();\n    switch (c) {\n      case 'R': case 'r':\n        definirCor(255, 0, 0);\n        bluetooth.println(F(\"Cor: VERMELHO\"));\n        break;\n      case 'G': case 'g':\n        definirCor(0, 255, 0);\n        bluetooth.println(F(\"Cor: VERDE\"));\n        break;\n      case 'B': case 'b':\n        definirCor(0, 0, 255);\n        bluetooth.println(F(\"Cor: AZUL\"));\n        break;\n      case 'Y': case 'y':\n        definirCor(255, 200, 0);\n        bluetooth.println(F(\"Cor: AMARELO\"));\n        break;\n      case 'W': case 'w':\n        definirCor(255, 255, 255);\n        bluetooth.println(F(\"Cor: BRANCO\"));\n        break;\n      case '0':\n        definirCor(0, 0, 0);\n        bluetooth.println(F(\"Cor: APAGADO\"));\n        break;\n    }\n  }\n}\n"
  },
  {
    "numero": 4,
    "slug": "dimmer-bluetooth",
    "titulo": "Dimmer de LED: Controle de Brilho de 0 a 100%",
    "subtitulo": "Regule a luminosidade do ambiente em 10 níveis enviando números de 0 a 9.",
    "objetivo": "Controlar o ciclo de trabalho PWM de uma lâmpada LED em degraus suaves pelo celular.",
    "nivel": "Iniciante",
    "tempoEstimado": "20 minutos",
    "pecas": [
      {
        "item": "Arduino Uno R3",
        "quantidade": 1
      },
      {
        "item": "Módulo Bluetooth + Divisor 1k/2k",
        "quantidade": 1
      },
      {
        "item": "LED Alto Brilho 5mm",
        "quantidade": 1
      },
      {
        "item": "Resistor 220 Ω",
        "quantidade": 1
      },
      {
        "item": "Protoboard e Jumpers",
        "quantidade": 6
      }
    ],
    "comandos": [
      {
        "comando": "0",
        "descricao": "Desligado (0%)",
        "acao": "Apaga completamente o LED (PWM = 0)"
      },
      {
        "comando": "5",
        "descricao": "Meia Potência (55%)",
        "acao": "Luminosidade média suave para leitura"
      },
      {
        "comando": "9",
        "descricao": "Potência Máxima (100%)",
        "acao": "Brilho total do LED (PWM = 255)"
      }
    ],
    "passosMontagem": [
      {
        "passo": 1,
        "titulo": "Ligue o Bluetooth com divisor de tensão",
        "instrucao": "D2 no TX do BT, D3 no divisor 1k/2k para o RX do BT, VCC no 5V e GND no GND."
      },
      {
        "passo": 2,
        "titulo": "Conecte o LED ao pino D9",
        "instrucao": "Encaixe o LED no pino D9 (que tem o til ~ de PWM) com resistor de 220 Ω em série ao GND."
      },
      {
        "passo": 3,
        "titulo": "Envie o código e teste a escala",
        "instrucao": "Abra o terminal e digite 0, 1, 3, 5, 8, 9 para ver o brilho aumentar gradualmente."
      }
    ],
    "comoParear": [
      "Ligue o Arduino pelo cabo USB ou fonte.",
      "Confira se o LED do módulo Bluetooth está piscando rápido (2 a 3 vezes por segundo).",
      "Abra as Configurações do seu celular > Bluetooth > Procurar novos dispositivos.",
      "Toque em \"HC-05\" (ou \"HC-06\") e digite o PIN \"1234\" (ou \"0000\").",
      "Abra o aplicativo \"Serial Bluetooth Terminal\" no Android.",
      "Toque no menu lateral (três linhas) > \"Devices\" > aba \"Bluetooth Classic\" e selecione o HC-05.",
      "O LED do módulo vai ficar aceso ou piscar duplo suave: a conexão está pronta!"
    ],
    "seNaoResponder": [
      {
        "sintoma": "O celular não encontra o módulo na lista de Bluetooth",
        "causaProvavel": "Módulo sem energia ou uso de iPhone com módulo HC-05.",
        "comoTestar": "1) Confira se o LED vermelho do Bluetooth está piscando. Se estiver apagado, meça a tensão no VCC (deve dar 5V). 2) Se você tem iPhone, o HC-05 não aparece: você precisa do módulo HM-10 (BLE)."
      },
      {
        "sintoma": "O app conecta, mas o Arduino não reage a nenhum comando",
        "causaProvavel": "Fios TX e RX invertidos ou esquecimento do divisor.",
        "comoTestar": "Lembre-se: o TX do Bluetooth vai no D2 do Arduino, e o D3 do Arduino vai no RX do Bluetooth através do divisor de tensão. Se você ligou TX com TX, eles estão ambos tentando falar no mesmo fio."
      },
      {
        "sintoma": "Aparecem caracteres estranhos ou pontos de interrogação no app",
        "causaProvavel": "Baud rate divergente entre o código e o aplicativo.",
        "comoTestar": "Abra as configurações do app Serial Bluetooth Terminal e confirme se o Baudrate está fixado em 9600."
      },
      {
        "sintoma": "O módulo reinicia ou desliga quando o motor/servo é acionado",
        "causaProvavel": "Queda de tensão por alimentar motor no pino 5V do Arduino.",
        "comoTestar": "Desconecte o motor do pino 5V e use alimentação externa separada (pilhas) com o GND interligado."
      }
    ],
    "codigoFonte": "/*\n * Projeto 04: Dimmer de LED com Controle de Brilho\n * Comandos: caracteres de '0' (0%) a '9' (100% de brilho)\n */\n#include <SoftwareSerial.h>\n\nconst byte PINO_BT_RX = 2;\nconst byte PINO_BT_TX = 3;\nconst byte PINO_LED_PWM = 9; // Pino com PWM (~)\n\nSoftwareSerial bluetooth(PINO_BT_RX, PINO_BT_TX);\n\nvoid setup() {\n  pinMode(PINO_LED_PWM, OUTPUT);\n  analogWrite(PINO_LED_PWM, 0);\n\n  Serial.begin(9600);\n  bluetooth.begin(9600);\n  bluetooth.println(F(\"Dimmer pronto: envie de 0 (desligado) a 9 (máximo)\"));\n}\n\nvoid loop() {\n  if (bluetooth.available()) {\n    char c = bluetooth.read();\n    if (c >= '0' && c <= '9') {\n      int nivel = c - '0'; // Converte char para 0..9\n      int pwm = map(nivel, 0, 9, 0, 255);\n      analogWrite(PINO_LED_PWM, pwm);\n\n      bluetooth.print(F(\"Brilho ajustado para: \"));\n      bluetooth.print(nivel * 11); // aproximadamente 0 a 100%\n      bluetooth.println(F(\"%\"));\n    }\n  }\n}\n"
  },
  {
    "numero": 5,
    "slug": "alarme-bluetooth",
    "titulo": "Alarme Residencial com Aviso no Celular",
    "subtitulo": "O Arduino monitora portas e janelas e envia \"INTRUSO!\" para o seu smartphone na hora.",
    "objetivo": "Criar uma central de alarme sem fio com rearme remoto pelo app e aviso instantâneo.",
    "nivel": "Intermediário",
    "tempoEstimado": "35 minutos",
    "pecas": [
      {
        "item": "Arduino Uno R3",
        "quantidade": 1
      },
      {
        "item": "Módulo Bluetooth + Divisor 1k/2k",
        "quantidade": 1
      },
      {
        "item": "Sensor Magnético Reed ou Pushbutton",
        "quantidade": 1
      },
      {
        "item": "Buzzer Sonoro 5V",
        "quantidade": 1
      },
      {
        "item": "Resistores e Jumpers",
        "quantidade": 8
      }
    ],
    "comandos": [
      {
        "comando": "A",
        "descricao": "Armar Alarme",
        "acao": "Ativa a vigilância; se o sensor abrir, a sirene toca e manda mensagem"
      },
      {
        "comando": "D",
        "descricao": "Desarmar Alarme",
        "acao": "Cessa a sirene e desliga a vigilância para permitir passagem"
      }
    ],
    "passosMontagem": [
      {
        "passo": 1,
        "titulo": "Conecte o sensor de porta no pino D4",
        "instrucao": "Ligue um terminal do sensor magnético no pino D4 e o outro no GND (usa INPUT_PULLUP interno)."
      },
      {
        "passo": 2,
        "titulo": "Ligue o buzzer no pino D8",
        "instrucao": "Conecte o polo positivo (+) do buzzer no pino D8 e o negativo (-) no GND."
      },
      {
        "passo": 3,
        "titulo": "Ligue o Bluetooth com segurança",
        "instrucao": "Conecte pinos 2 e 3 com o divisor de tensão e certifique-se de que o GND é comum."
      },
      {
        "passo": 4,
        "titulo": "Simule a invasão",
        "instrucao": "Arme com \"A\". Ao afastar o ímã do sensor, o celular vibra com o alerta \"INTRUSO!\" e a sirene toca."
      }
    ],
    "comoParear": [
      "Ligue o Arduino pelo cabo USB ou fonte.",
      "Confira se o LED do módulo Bluetooth está piscando rápido (2 a 3 vezes por segundo).",
      "Abra as Configurações do seu celular > Bluetooth > Procurar novos dispositivos.",
      "Toque em \"HC-05\" (ou \"HC-06\") e digite o PIN \"1234\" (ou \"0000\").",
      "Abra o aplicativo \"Serial Bluetooth Terminal\" no Android.",
      "Toque no menu lateral (três linhas) > \"Devices\" > aba \"Bluetooth Classic\" e selecione o HC-05.",
      "O LED do módulo vai ficar aceso ou piscar duplo suave: a conexão está pronta!"
    ],
    "seNaoResponder": [
      {
        "sintoma": "O celular não encontra o módulo na lista de Bluetooth",
        "causaProvavel": "Módulo sem energia ou uso de iPhone com módulo HC-05.",
        "comoTestar": "1) Confira se o LED vermelho do Bluetooth está piscando. Se estiver apagado, meça a tensão no VCC (deve dar 5V). 2) Se você tem iPhone, o HC-05 não aparece: você precisa do módulo HM-10 (BLE)."
      },
      {
        "sintoma": "O app conecta, mas o Arduino não reage a nenhum comando",
        "causaProvavel": "Fios TX e RX invertidos ou esquecimento do divisor.",
        "comoTestar": "Lembre-se: o TX do Bluetooth vai no D2 do Arduino, e o D3 do Arduino vai no RX do Bluetooth através do divisor de tensão. Se você ligou TX com TX, eles estão ambos tentando falar no mesmo fio."
      },
      {
        "sintoma": "Aparecem caracteres estranhos ou pontos de interrogação no app",
        "causaProvavel": "Baud rate divergente entre o código e o aplicativo.",
        "comoTestar": "Abra as configurações do app Serial Bluetooth Terminal e confirme se o Baudrate está fixado em 9600."
      },
      {
        "sintoma": "O módulo reinicia ou desliga quando o motor/servo é acionado",
        "causaProvavel": "Queda de tensão por alimentar motor no pino 5V do Arduino.",
        "comoTestar": "Desconecte o motor do pino 5V e use alimentação externa separada (pilhas) com o GND interligado."
      }
    ],
    "codigoFonte": "/*\n * Projeto 05: Alarme Residencial com Aviso no Celular\n * Sensor: Botão ou Sensor Magnético Reed no pino 4 (INPUT_PULLUP)\n * Atuador: Buzzer no pino 8\n */\n#include <SoftwareSerial.h>\n\nconst byte PINO_BT_RX = 2;\nconst byte PINO_BT_TX = 3;\nconst byte PINO_SENSOR = 4; // Sensor de porta/janela\nconst byte PINO_BUZZER = 8;\n\nSoftwareSerial bluetooth(PINO_BT_RX, PINO_BT_TX);\nbool alarmeArmado = true;\nbool intrusaoDetectada = false;\n\nvoid setup() {\n  pinMode(PINO_SENSOR, INPUT_PULLUP);\n  pinMode(PINO_BUZZER, OUTPUT);\n  digitalWrite(PINO_BUZZER, LOW);\n\n  Serial.begin(9600);\n  bluetooth.begin(9600);\n  bluetooth.println(F(\"Sistema de Alarme iniciado! Envie 'D' para desarmar ou 'A' para armar.\"));\n}\n\nvoid loop() {\n  // Comandos do celular\n  if (bluetooth.available()) {\n    char c = bluetooth.read();\n    if (c == 'D' || c == 'd') {\n      alarmeArmado = false;\n      intrusaoDetectada = false;\n      digitalWrite(PINO_BUZZER, LOW);\n      bluetooth.println(F(\"ALARME DESARMADO\"));\n    } else if (c == 'A' || c == 'a') {\n      alarmeArmado = true;\n      intrusaoDetectada = false;\n      digitalWrite(PINO_BUZZER, LOW);\n      bluetooth.println(F(\"ALARME ARMADO E VIGILANTE\"));\n    }\n  }\n\n  // Verificação de invasão (contato aberto = HIGH)\n  if (alarmeArmado && !intrusaoDetectada) {\n    if (digitalRead(PINO_SENSOR) == HIGH) {\n      intrusaoDetectada = true;\n      bluetooth.println(F(\">>> ALERTA DE INTRUSO! PORTA ABERTA! <<<\"));\n    }\n  }\n\n  // Disparo sonoro do buzzer\n  if (alarmeArmado && intrusaoDetectada) {\n    digitalWrite(PINO_BUZZER, HIGH);\n    delay(100);\n    digitalWrite(PINO_BUZZER, LOW);\n    delay(100);\n  }\n}\n"
  },
  {
    "numero": 6,
    "slug": "pir-bluetooth",
    "titulo": "Sensor de Presença PIR com Notificação no Celular",
    "subtitulo": "Detecte qualquer movimento de pessoas no cômodo e receba aviso em tempo real.",
    "objetivo": "Integrar sensor infravermelho passivo com envio assíncrono de notificações via Bluetooth.",
    "nivel": "Intermediário",
    "tempoEstimado": "30 minutos",
    "pecas": [
      {
        "item": "Arduino Uno R3",
        "quantidade": 1
      },
      {
        "item": "Módulo Bluetooth HC-05/HC-06 + Divisor 1k/2k",
        "quantidade": 1
      },
      {
        "item": "Sensor de Presença PIR (HC-SR501)",
        "quantidade": 1
      },
      {
        "item": "LED Indicador + Resistor 220 Ω",
        "quantidade": 1
      },
      {
        "item": "Jumpers macho-fêmea",
        "quantidade": 6
      }
    ],
    "comandos": [
      {
        "comando": "(Automático)",
        "descricao": "Detecção contínua",
        "acao": "O Arduino envia \"MOVIMENTO DETECTADO!\" assim que alguém passa à frente do sensor"
      }
    ],
    "passosMontagem": [
      {
        "passo": 1,
        "titulo": "Conecte o sensor PIR",
        "instrucao": "VCC no 5V, GND no GND e o pino central OUT no pino digital D4 do Arduino."
      },
      {
        "passo": 2,
        "titulo": "Ajuste os potenciômetros do PIR",
        "instrucao": "Gire o potenciômetro de sensibilidade para a metade e o de tempo (delay) todo para o mínimo (sentido anti-horário)."
      },
      {
        "passo": 3,
        "titulo": "Conecte o Bluetooth",
        "instrucao": "D2 no TX do BT, D3 no divisor 1k/2k para RX do BT."
      },
      {
        "passo": 4,
        "titulo": "Aguarde 30 segundos de calibração",
        "instrucao": "Ao ligar, o sensor PIR precisa de 30 segundos para estabilizar a leitura térmica do ambiente."
      }
    ],
    "comoParear": [
      "Ligue o Arduino pelo cabo USB ou fonte.",
      "Confira se o LED do módulo Bluetooth está piscando rápido (2 a 3 vezes por segundo).",
      "Abra as Configurações do seu celular > Bluetooth > Procurar novos dispositivos.",
      "Toque em \"HC-05\" (ou \"HC-06\") e digite o PIN \"1234\" (ou \"0000\").",
      "Abra o aplicativo \"Serial Bluetooth Terminal\" no Android.",
      "Toque no menu lateral (três linhas) > \"Devices\" > aba \"Bluetooth Classic\" e selecione o HC-05.",
      "O LED do módulo vai ficar aceso ou piscar duplo suave: a conexão está pronta!"
    ],
    "seNaoResponder": [
      {
        "sintoma": "O celular não encontra o módulo na lista de Bluetooth",
        "causaProvavel": "Módulo sem energia ou uso de iPhone com módulo HC-05.",
        "comoTestar": "1) Confira se o LED vermelho do Bluetooth está piscando. Se estiver apagado, meça a tensão no VCC (deve dar 5V). 2) Se você tem iPhone, o HC-05 não aparece: você precisa do módulo HM-10 (BLE)."
      },
      {
        "sintoma": "O app conecta, mas o Arduino não reage a nenhum comando",
        "causaProvavel": "Fios TX e RX invertidos ou esquecimento do divisor.",
        "comoTestar": "Lembre-se: o TX do Bluetooth vai no D2 do Arduino, e o D3 do Arduino vai no RX do Bluetooth através do divisor de tensão. Se você ligou TX com TX, eles estão ambos tentando falar no mesmo fio."
      },
      {
        "sintoma": "Aparecem caracteres estranhos ou pontos de interrogação no app",
        "causaProvavel": "Baud rate divergente entre o código e o aplicativo.",
        "comoTestar": "Abra as configurações do app Serial Bluetooth Terminal e confirme se o Baudrate está fixado em 9600."
      },
      {
        "sintoma": "O módulo reinicia ou desliga quando o motor/servo é acionado",
        "causaProvavel": "Queda de tensão por alimentar motor no pino 5V do Arduino.",
        "comoTestar": "Desconecte o motor do pino 5V e use alimentação externa separada (pilhas) com o GND interligado."
      }
    ],
    "codigoFonte": "/*\n * Projeto 06: Sensor de Presença PIR com Notificação no Celular\n * Sensor: PIR no pino 4\n */\n#include <SoftwareSerial.h>\n\nconst byte PINO_BT_RX = 2;\nconst byte PINO_BT_TX = 3;\nconst byte PINO_PIR = 4;\nconst byte PINO_LED = 13;\n\nSoftwareSerial bluetooth(PINO_BT_RX, PINO_BT_TX);\nbool movimentoAnterior = false;\n\nvoid setup() {\n  pinMode(PINO_PIR, INPUT);\n  pinMode(PINO_LED, OUTPUT);\n  digitalWrite(PINO_LED, LOW);\n\n  Serial.begin(9600);\n  bluetooth.begin(9600);\n  bluetooth.println(F(\"Monitor de Presença PIR ativo! Aguardando estabilização do sensor...\"));\n  delay(2000); // tempo para o PIR calibrar\n  bluetooth.println(F(\"Sensor calibrado e pronto!\"));\n}\n\nvoid loop() {\n  bool movimentoAtual = (digitalRead(PINO_PIR) == HIGH);\n\n  if (movimentoAtual && !movimentoAnterior) {\n    digitalWrite(PINO_LED, HIGH);\n    bluetooth.println(F(\"MOVIMENTO DETECTADO NO AMBIENTE!\"));\n    movimentoAnterior = true;\n  } else if (!movimentoAtual && movimentoAnterior) {\n    digitalWrite(PINO_LED, LOW);\n    bluetooth.println(F(\"Ambiente limpo (sem movimento).\"));\n    movimentoAnterior = false;\n  }\n\n  delay(200);\n}\n"
  },
  {
    "numero": 7,
    "slug": "dht11-bluetooth",
    "titulo": "Termômetro e Higrômetro no Celular",
    "subtitulo": "Temperatura e umidade do quarto transmitidas direto para o seu smartphone a cada 5 segundos.",
    "objetivo": "Ler grandezas ambientais digitais e formatar um painel de telemetria sem fio.",
    "nivel": "Intermediário",
    "tempoEstimado": "35 minutos",
    "pecas": [
      {
        "item": "Arduino Uno R3",
        "quantidade": 1
      },
      {
        "item": "Módulo Bluetooth HC-05/HC-06 + Divisor 1k/2k",
        "quantidade": 1
      },
      {
        "item": "Sensor de Temperatura e Umidade DHT11",
        "quantidade": 1
      },
      {
        "item": "Resistor de 10 kΩ (Pull-up de dados)",
        "quantidade": 1
      },
      {
        "item": "Jumpers e Protoboard",
        "quantidade": 7
      }
    ],
    "comandos": [
      {
        "comando": "L",
        "descricao": "Leitura Instantânea",
        "acao": "Força a medição imediata de temperatura e umidade"
      },
      {
        "comando": "(Automático)",
        "descricao": "Telemetria Contínua",
        "acao": "Atualiza os dados na tela do celular a cada 5 segundos"
      }
    ],
    "passosMontagem": [
      {
        "passo": 1,
        "titulo": "Conecte o sensor DHT11",
        "instrucao": "Pino 1 (VCC) no 5V, pino 2 (Dados) no D4 com resistor de 10k ligado ao 5V, e pino 4 (GND) no GND."
      },
      {
        "passo": 2,
        "titulo": "Ligue o Bluetooth",
        "instrucao": "Ligue os pinos de comunicação serial (D2 e D3 com divisor)."
      },
      {
        "passo": 3,
        "titulo": "Acompanhe no app",
        "instrucao": "Veja as linhas \"Temp: 25.0 C | Umid: 60.0 %\" subindo no terminal a cada 5 segundos."
      }
    ],
    "comoParear": [
      "Ligue o Arduino pelo cabo USB ou fonte.",
      "Confira se o LED do módulo Bluetooth está piscando rápido (2 a 3 vezes por segundo).",
      "Abra as Configurações do seu celular > Bluetooth > Procurar novos dispositivos.",
      "Toque em \"HC-05\" (ou \"HC-06\") e digite o PIN \"1234\" (ou \"0000\").",
      "Abra o aplicativo \"Serial Bluetooth Terminal\" no Android.",
      "Toque no menu lateral (três linhas) > \"Devices\" > aba \"Bluetooth Classic\" e selecione o HC-05.",
      "O LED do módulo vai ficar aceso ou piscar duplo suave: a conexão está pronta!"
    ],
    "seNaoResponder": [
      {
        "sintoma": "O celular não encontra o módulo na lista de Bluetooth",
        "causaProvavel": "Módulo sem energia ou uso de iPhone com módulo HC-05.",
        "comoTestar": "1) Confira se o LED vermelho do Bluetooth está piscando. Se estiver apagado, meça a tensão no VCC (deve dar 5V). 2) Se você tem iPhone, o HC-05 não aparece: você precisa do módulo HM-10 (BLE)."
      },
      {
        "sintoma": "O app conecta, mas o Arduino não reage a nenhum comando",
        "causaProvavel": "Fios TX e RX invertidos ou esquecimento do divisor.",
        "comoTestar": "Lembre-se: o TX do Bluetooth vai no D2 do Arduino, e o D3 do Arduino vai no RX do Bluetooth através do divisor de tensão. Se você ligou TX com TX, eles estão ambos tentando falar no mesmo fio."
      },
      {
        "sintoma": "Aparecem caracteres estranhos ou pontos de interrogação no app",
        "causaProvavel": "Baud rate divergente entre o código e o aplicativo.",
        "comoTestar": "Abra as configurações do app Serial Bluetooth Terminal e confirme se o Baudrate está fixado em 9600."
      },
      {
        "sintoma": "O módulo reinicia ou desliga quando o motor/servo é acionado",
        "causaProvavel": "Queda de tensão por alimentar motor no pino 5V do Arduino.",
        "comoTestar": "Desconecte o motor do pino 5V e use alimentação externa separada (pilhas) com o GND interligado."
      }
    ],
    "codigoFonte": "/*\n * Projeto 07: Termômetro e Higrômetro no Celular\n * Sensor: DHT11 no pino 4\n */\n#include <SoftwareSerial.h>\n#include <DHT.h>\n\nconst byte PINO_BT_RX = 2;\nconst byte PINO_BT_TX = 3;\nconst byte PINO_DHT = 4;\n\n#define DHTTYPE DHT11\nDHT dht(PINO_DHT, DHTTYPE);\nSoftwareSerial bluetooth(PINO_BT_RX, PINO_BT_TX);\n\nunsigned long tempoUltimoEnvio = 0;\nconst unsigned long INTERVALO_LEITURA = 5000; // Envia a cada 5 segundos\n\nvoid enviarLeitura() {\n  float umidade = dht.readHumidity();\n  float temperatura = dht.readTemperature();\n\n  if (isnan(umidade) || isnan(temperatura)) {\n    bluetooth.println(F(\"Falha ao ler o sensor DHT11! Confira os fios.\"));\n    return;\n  }\n\n  bluetooth.print(F(\"Temp: \"));\n  bluetooth.print(temperatura, 1);\n  bluetooth.print(F(\" C | Umid: \"));\n  bluetooth.print(umidade, 1);\n  bluetooth.println(F(\" %\"));\n}\n\nvoid setup() {\n  dht.begin();\n  Serial.begin(9600);\n  bluetooth.begin(9600);\n  bluetooth.println(F(\"Estação de Clima pronta: envie 'L' para ler ou aguarde o ciclo de 5s.\"));\n}\n\nvoid loop() {\n  if (bluetooth.available()) {\n    char c = bluetooth.read();\n    if (c == 'L' || c == 'l') {\n      enviarLeitura();\n    }\n  }\n\n  unsigned long agora = millis();\n  if (agora - tempoUltimoEnvio >= INTERVALO_LEITURA) {\n    tempoUltimoEnvio = agora;\n    enviarLeitura();\n  }\n}\n"
  },
  {
    "numero": 8,
    "slug": "servo-bluetooth",
    "titulo": "Fechadura / Cancela com Servo Motor",
    "subtitulo": "Abra e feche portas, gavetas secretas ou cancelas de garagem com um toque no celular.",
    "objetivo": "Controlar o ângulo exato de um servo motor SG90 por comando serial com trava mecânica.",
    "nivel": "Intermediário",
    "tempoEstimado": "35 minutos",
    "pecas": [
      {
        "item": "Arduino Uno R3",
        "quantidade": 1
      },
      {
        "item": "Módulo Bluetooth HC-05/HC-06 + Divisor 1k/2k",
        "quantidade": 1
      },
      {
        "item": "Micro Servo Motor 9g (SG90)",
        "quantidade": 1
      },
      {
        "item": "Fonte ou Pilhas externas para o servo",
        "quantidade": 1,
        "obs": "Altamente recomendado"
      },
      {
        "item": "Jumpers",
        "quantidade": 8
      }
    ],
    "comandos": [
      {
        "comando": "A",
        "descricao": "Abrir Cancela",
        "acao": "Move o servo para 90 graus (posição aberta)"
      },
      {
        "comando": "F",
        "descricao": "Fechar Cancela",
        "acao": "Move o servo para 0 grau (posição fechada e travada)"
      }
    ],
    "passosMontagem": [
      {
        "passo": 1,
        "titulo": "Atenção aos fios do Servo",
        "instrucao": "Marrom = GND, Vermelho = 5V, Laranja/Amarelo = Sinal de controle."
      },
      {
        "passo": 2,
        "titulo": "Conecte o sinal no pino D9",
        "instrucao": "Ligue o fio de sinal (laranja) no pino D9 do Arduino."
      },
      {
        "passo": 3,
        "titulo": "Alimentação do Servo",
        "instrucao": "Para testes leves o 5V do Arduino serve; se for puxar uma tranca real, alimente o servo por 4 pilhas com GND compartilhado."
      },
      {
        "passo": 4,
        "titulo": "Teste no app",
        "instrucao": "Envie \"A\" para liberar a trava e \"F\" para recolher o trinco."
      }
    ],
    "comoParear": [
      "Ligue o Arduino pelo cabo USB ou fonte.",
      "Confira se o LED do módulo Bluetooth está piscando rápido (2 a 3 vezes por segundo).",
      "Abra as Configurações do seu celular > Bluetooth > Procurar novos dispositivos.",
      "Toque em \"HC-05\" (ou \"HC-06\") e digite o PIN \"1234\" (ou \"0000\").",
      "Abra o aplicativo \"Serial Bluetooth Terminal\" no Android.",
      "Toque no menu lateral (três linhas) > \"Devices\" > aba \"Bluetooth Classic\" e selecione o HC-05.",
      "O LED do módulo vai ficar aceso ou piscar duplo suave: a conexão está pronta!"
    ],
    "seNaoResponder": [
      {
        "sintoma": "O celular não encontra o módulo na lista de Bluetooth",
        "causaProvavel": "Módulo sem energia ou uso de iPhone com módulo HC-05.",
        "comoTestar": "1) Confira se o LED vermelho do Bluetooth está piscando. Se estiver apagado, meça a tensão no VCC (deve dar 5V). 2) Se você tem iPhone, o HC-05 não aparece: você precisa do módulo HM-10 (BLE)."
      },
      {
        "sintoma": "O app conecta, mas o Arduino não reage a nenhum comando",
        "causaProvavel": "Fios TX e RX invertidos ou esquecimento do divisor.",
        "comoTestar": "Lembre-se: o TX do Bluetooth vai no D2 do Arduino, e o D3 do Arduino vai no RX do Bluetooth através do divisor de tensão. Se você ligou TX com TX, eles estão ambos tentando falar no mesmo fio."
      },
      {
        "sintoma": "Aparecem caracteres estranhos ou pontos de interrogação no app",
        "causaProvavel": "Baud rate divergente entre o código e o aplicativo.",
        "comoTestar": "Abra as configurações do app Serial Bluetooth Terminal e confirme se o Baudrate está fixado em 9600."
      },
      {
        "sintoma": "O módulo reinicia ou desliga quando o motor/servo é acionado",
        "causaProvavel": "Queda de tensão por alimentar motor no pino 5V do Arduino.",
        "comoTestar": "Desconecte o motor do pino 5V e use alimentação externa separada (pilhas) com o GND interligado."
      }
    ],
    "codigoFonte": "/*\n * Projeto 08: Fechadura / Cancela com Servo Motor\n * Atuador: Micro Servo 9g no pino 9\n * Comandos: 'A' (Abrir - 90 graus), 'F' (Fechar - 0 graus)\n */\n#include <SoftwareSerial.h>\n#include <Servo.h>\n\nconst byte PINO_BT_RX = 2;\nconst byte PINO_BT_TX = 3;\nconst byte PINO_SERVO = 9;\n\nSoftwareSerial bluetooth(PINO_BT_RX, PINO_BT_TX);\nServo cancela;\n\nvoid setup() {\n  cancela.attach(PINO_SERVO);\n  cancela.write(0); // Posição fechada inicial\n\n  Serial.begin(9600);\n  bluetooth.begin(9600);\n  bluetooth.println(F(\"Fechadura pronta: envie 'A' para ABRIR ou 'F' para FECHAR.\"));\n}\n\nvoid loop() {\n  if (bluetooth.available()) {\n    char c = bluetooth.read();\n    if (c == 'A' || c == 'a') {\n      cancela.write(90); // Abre a cancela\n      bluetooth.println(F(\"PORTA / CANCELA: ABERTA\"));\n    } else if (c == 'F' || c == 'f') {\n      cancela.write(0);  // Fecha a cancela\n      bluetooth.println(F(\"PORTA / CANCELA: FECHADA\"));\n    }\n  }\n}\n"
  },
  {
    "numero": 9,
    "slug": "lcd-bluetooth",
    "titulo": "Mensagem no Display LCD Enviada pelo Celular",
    "subtitulo": "Digite qualquer frase no seu smartphone e veja o texto aparecer instantaneamente na tela do Arduino.",
    "objetivo": "Receber strings de texto completas via serial e exibi-las em um display LCD 16x2 com protocolo I2C.",
    "nivel": "Intermediário",
    "tempoEstimado": "40 minutos",
    "pecas": [
      {
        "item": "Arduino Uno R3",
        "quantidade": 1
      },
      {
        "item": "Módulo Bluetooth + Divisor 1k/2k",
        "quantidade": 1
      },
      {
        "item": "Display LCD 16x2 com Módulo I2C",
        "quantidade": 1
      },
      {
        "item": "Jumpers macho-fêmea",
        "quantidade": 8
      }
    ],
    "comandos": [
      {
        "comando": "Qualquer texto + Enter",
        "descricao": "Mensagem Livre",
        "acao": "Exibe o texto no LCD (até 32 caracteres divididos em 2 linhas de 16)"
      }
    ],
    "passosMontagem": [
      {
        "passo": 1,
        "titulo": "Ligue o display LCD I2C",
        "instrucao": "VCC no 5V, GND no GND, SDA no pino A4 e SCL no pino A5 do Arduino."
      },
      {
        "passo": 2,
        "titulo": "Ajuste o contraste no trimpot traseiro",
        "instrucao": "Gire o potenciômetro azul atrás da placa com chave de fenda até ver os blocos pretos dos caracteres."
      },
      {
        "passo": 3,
        "titulo": "Conecte o Bluetooth nos pinos D2 e D3",
        "instrucao": "D2 no TX do BT, D3 no divisor 1k/2k para o RX do BT."
      },
      {
        "passo": 4,
        "titulo": "Envie sua mensagem",
        "instrucao": "No app do celular, digite \"Ola Mundo!\" e aperte Enviar. A frase surge imediatamente na tela azul."
      }
    ],
    "comoParear": [
      "Ligue o Arduino pelo cabo USB ou fonte.",
      "Confira se o LED do módulo Bluetooth está piscando rápido (2 a 3 vezes por segundo).",
      "Abra as Configurações do seu celular > Bluetooth > Procurar novos dispositivos.",
      "Toque em \"HC-05\" (ou \"HC-06\") e digite o PIN \"1234\" (ou \"0000\").",
      "Abra o aplicativo \"Serial Bluetooth Terminal\" no Android.",
      "Toque no menu lateral (três linhas) > \"Devices\" > aba \"Bluetooth Classic\" e selecione o HC-05.",
      "O LED do módulo vai ficar aceso ou piscar duplo suave: a conexão está pronta!"
    ],
    "seNaoResponder": [
      {
        "sintoma": "O celular não encontra o módulo na lista de Bluetooth",
        "causaProvavel": "Módulo sem energia ou uso de iPhone com módulo HC-05.",
        "comoTestar": "1) Confira se o LED vermelho do Bluetooth está piscando. Se estiver apagado, meça a tensão no VCC (deve dar 5V). 2) Se você tem iPhone, o HC-05 não aparece: você precisa do módulo HM-10 (BLE)."
      },
      {
        "sintoma": "O app conecta, mas o Arduino não reage a nenhum comando",
        "causaProvavel": "Fios TX e RX invertidos ou esquecimento do divisor.",
        "comoTestar": "Lembre-se: o TX do Bluetooth vai no D2 do Arduino, e o D3 do Arduino vai no RX do Bluetooth através do divisor de tensão. Se você ligou TX com TX, eles estão ambos tentando falar no mesmo fio."
      },
      {
        "sintoma": "Aparecem caracteres estranhos ou pontos de interrogação no app",
        "causaProvavel": "Baud rate divergente entre o código e o aplicativo.",
        "comoTestar": "Abra as configurações do app Serial Bluetooth Terminal e confirme se o Baudrate está fixado em 9600."
      },
      {
        "sintoma": "O módulo reinicia ou desliga quando o motor/servo é acionado",
        "causaProvavel": "Queda de tensão por alimentar motor no pino 5V do Arduino.",
        "comoTestar": "Desconecte o motor do pino 5V e use alimentação externa separada (pilhas) com o GND interligado."
      }
    ],
    "codigoFonte": "/*\n * Projeto 09: Mensagem no Display LCD 16x2 I2C via Celular\n * Display: LCD 16x2 I2C (SDA = A4, SCL = A5)\n */\n#include <Wire.h>\n#include <LiquidCrystal_I2C.h>\n#include <SoftwareSerial.h>\n\nconst byte PINO_BT_RX = 2;\nconst byte PINO_BT_TX = 3;\n\nSoftwareSerial bluetooth(PINO_BT_RX, PINO_BT_TX);\nLiquidCrystal_I2C lcd(0x27, 16, 2);\n\nString mensagemRecebida = \"\";\n\nvoid setup() {\n  lcd.init();\n  lcd.backlight();\n  lcd.clear();\n  lcd.setCursor(0, 0);\n  lcd.print(\"Aguardando msg..\");\n\n  Serial.begin(9600);\n  bluetooth.begin(9600);\n  bluetooth.println(F(\"LCD I2C pronto! Digite uma frase e aperte Enter no app.\"));\n}\n\nvoid loop() {\n  while (bluetooth.available()) {\n    char c = bluetooth.read();\n    if (c == '\\n' || c == '\\r') {\n      if (mensagemRecebida.length() > 0) {\n        lcd.clear();\n        lcd.setCursor(0, 0);\n        // Exibe primeiros 16 caracteres na linha 1\n        lcd.print(mensagemRecebida.substring(0, 16));\n        // Se houver mais, exibe na linha 2\n        if (mensagemRecebida.length() > 16) {\n          lcd.setCursor(0, 1);\n          lcd.print(mensagemRecebida.substring(16, 32));\n        }\n        bluetooth.print(F(\"Exibido no LCD: \"));\n        bluetooth.println(mensagemRecebida);\n        mensagemRecebida = \"\";\n      }\n    } else {\n      if (mensagemRecebida.length() < 32) {\n        mensagemRecebida += c;\n      }\n    }\n  }\n}\n"
  },
  {
    "numero": 10,
    "slug": "carrinho-bluetooth",
    "titulo": "Carrinho Robô 2 Rodas Controlado pelo Celular",
    "subtitulo": "O projeto final dos sonhos: frente, ré, curvas ágeis e parada instantânea pelo celular.",
    "objetivo": "Controlar uma ponte H com dois motores DC usando comandos direcionais sem fio.",
    "nivel": "Avançado",
    "tempoEstimado": "60 minutos",
    "pecas": [
      {
        "item": "Arduino Uno R3",
        "quantidade": 1
      },
      {
        "item": "Módulo Bluetooth HC-05/HC-06 + Divisor 1k/2k",
        "quantidade": 1
      },
      {
        "item": "Kit Chassi 2 Rodas com 2 motores DC e roda boba",
        "quantidade": 1
      },
      {
        "item": "Módulo Ponte H (L298N ou L9110S)",
        "quantidade": 1
      },
      {
        "item": "Suporte de 4 pilhas AA (6V) para os motores",
        "quantidade": 1,
        "obs": "OBRIGATÓRIO fonte separada"
      },
      {
        "item": "Bateria ou powerbank para o Arduino",
        "quantidade": 1
      },
      {
        "item": "Jumpers e parafusos de fixação",
        "quantidade": 14
      }
    ],
    "comandos": [
      {
        "comando": "F",
        "descricao": "Frente",
        "acao": "Gira os dois motores para frente"
      },
      {
        "comando": "T",
        "descricao": "Ré",
        "acao": "Inverte o sentido dos dois motores"
      },
      {
        "comando": "E",
        "descricao": "Esquerda",
        "acao": "Gira o motor direito para frente e o esquerdo para trás"
      },
      {
        "comando": "D",
        "descricao": "Direita",
        "acao": "Gira o motor esquerdo para frente e o direito para trás"
      },
      {
        "comando": "P",
        "descricao": "Parar",
        "acao": "Corta a energia de ambos os motores imediatamente"
      }
    ],
    "passosMontagem": [
      {
        "passo": 1,
        "titulo": "Monte a mecânica do chassi",
        "instrucao": "Fixe os 2 motores DC com caixa amarela e a roda boba na placa de acrílico."
      },
      {
        "passo": 2,
        "titulo": "Conecte os motores na Ponte H",
        "instrucao": "Ligue os 2 fios do motor esquerdo nos bornes OUT1/OUT2 e o motor direito nos bornes OUT3/OUT4."
      },
      {
        "passo": 3,
        "titulo": "REGRA VITAL: Alimentação dos motores",
        "instrucao": "Ligue o suporte de 4 pilhas AA no borne VCC (12V) e GND da ponte H. UNA o GND da ponte H ao GND do Arduino!"
      },
      {
        "passo": 4,
        "titulo": "Ligue os pinos de controle no Arduino",
        "instrucao": "IN1 no pino D5, IN2 no pino D6, IN3 no pino D9 e IN4 no pino D10."
      },
      {
        "passo": 5,
        "titulo": "Conecte o Bluetooth",
        "instrucao": "D2 no TX do BT, D3 no divisor 1k/2k para o RX do BT, VCC no 5V do Arduino e GND no barramento comum."
      },
      {
        "passo": 6,
        "titulo": "Calibre o sentido de giro",
        "instrucao": "Se ao mandar \"F\" uma roda girar para trás, basta inverter os dois fios daquele motor no borne da ponte H."
      }
    ],
    "comoParear": [
      "Ligue o Arduino pelo cabo USB ou fonte.",
      "Confira se o LED do módulo Bluetooth está piscando rápido (2 a 3 vezes por segundo).",
      "Abra as Configurações do seu celular > Bluetooth > Procurar novos dispositivos.",
      "Toque em \"HC-05\" (ou \"HC-06\") e digite o PIN \"1234\" (ou \"0000\").",
      "Abra o aplicativo \"Serial Bluetooth Terminal\" no Android.",
      "Toque no menu lateral (três linhas) > \"Devices\" > aba \"Bluetooth Classic\" e selecione o HC-05.",
      "O LED do módulo vai ficar aceso ou piscar duplo suave: a conexão está pronta!"
    ],
    "seNaoResponder": [
      {
        "sintoma": "O celular não encontra o módulo na lista de Bluetooth",
        "causaProvavel": "Módulo sem energia ou uso de iPhone com módulo HC-05.",
        "comoTestar": "1) Confira se o LED vermelho do Bluetooth está piscando. Se estiver apagado, meça a tensão no VCC (deve dar 5V). 2) Se você tem iPhone, o HC-05 não aparece: você precisa do módulo HM-10 (BLE)."
      },
      {
        "sintoma": "O app conecta, mas o Arduino não reage a nenhum comando",
        "causaProvavel": "Fios TX e RX invertidos ou esquecimento do divisor.",
        "comoTestar": "Lembre-se: o TX do Bluetooth vai no D2 do Arduino, e o D3 do Arduino vai no RX do Bluetooth através do divisor de tensão. Se você ligou TX com TX, eles estão ambos tentando falar no mesmo fio."
      },
      {
        "sintoma": "Aparecem caracteres estranhos ou pontos de interrogação no app",
        "causaProvavel": "Baud rate divergente entre o código e o aplicativo.",
        "comoTestar": "Abra as configurações do app Serial Bluetooth Terminal e confirme se o Baudrate está fixado em 9600."
      },
      {
        "sintoma": "O módulo reinicia ou desliga quando o motor/servo é acionado",
        "causaProvavel": "Queda de tensão por alimentar motor no pino 5V do Arduino.",
        "comoTestar": "Desconecte o motor do pino 5V e use alimentação externa separada (pilhas) com o GND interligado."
      }
    ],
    "codigoFonte": "/*\n * Projeto 10: Carrinho Robô 2 Rodas Controlado pelo Celular\n * Driver: Ponte H (L298N ou L9110)\n * Pinos: IN1=5, IN2=6, IN3=9, IN4=10\n * Comandos: 'F' (Frente), 'T' (Ré), 'E' (Esquerda), 'D' (Direita), 'P' ou 'S' (Parar)\n * REGRA VITAL: Alimentação dos motores por suporte de pilhas separado!\n */\n#include <SoftwareSerial.h>\n\nconst byte PINO_BT_RX = 2;\nconst byte PINO_BT_TX = 3;\n\n// Motor Esquerdo\nconst byte PINO_IN1 = 5;\nconst byte PINO_IN2 = 6;\n// Motor Direito\nconst byte PINO_IN3 = 9;\nconst byte PINO_IN4 = 10;\n\nSoftwareSerial bluetooth(PINO_BT_RX, PINO_BT_TX);\n\nvoid moverFrente() {\n  digitalWrite(PINO_IN1, HIGH);\n  digitalWrite(PINO_IN2, LOW);\n  digitalWrite(PINO_IN3, HIGH);\n  digitalWrite(PINO_IN4, LOW);\n}\n\nvoid moverRe() {\n  digitalWrite(PINO_IN1, LOW);\n  digitalWrite(PINO_IN2, HIGH);\n  digitalWrite(PINO_IN3, LOW);\n  digitalWrite(PINO_IN4, HIGH);\n}\n\nvoid virarEsquerda() {\n  digitalWrite(PINO_IN1, LOW);\n  digitalWrite(PINO_IN2, HIGH);\n  digitalWrite(PINO_IN3, HIGH);\n  digitalWrite(PINO_IN4, LOW);\n}\n\nvoid virarDireita() {\n  digitalWrite(PINO_IN1, HIGH);\n  digitalWrite(PINO_IN2, LOW);\n  digitalWrite(PINO_IN3, LOW);\n  digitalWrite(PINO_IN4, HIGH);\n}\n\nvoid pararMotores() {\n  digitalWrite(PINO_IN1, LOW);\n  digitalWrite(PINO_IN2, LOW);\n  digitalWrite(PINO_IN3, LOW);\n  digitalWrite(PINO_IN4, LOW);\n}\n\nvoid setup() {\n  pinMode(PINO_IN1, OUTPUT);\n  pinMode(PINO_IN2, OUTPUT);\n  pinMode(PINO_IN3, OUTPUT);\n  pinMode(PINO_IN4, OUTPUT);\n\n  pararMotores();\n\n  Serial.begin(9600);\n  bluetooth.begin(9600);\n  bluetooth.println(F(\"Carrinho Robô pronto! Comandos: F (Frente), T (Ré), E (Esq), D (Dir), P (Parar).\"));\n}\n\nvoid loop() {\n  if (bluetooth.available()) {\n    char comando = bluetooth.read();\n    switch (comando) {\n      case 'F': case 'f':\n        moverFrente();\n        bluetooth.println(F(\"MOVIMENTO: FRENTE\"));\n        break;\n      case 'T': case 't':\n        moverRe();\n        bluetooth.println(F(\"MOVIMENTO: RÉ\"));\n        break;\n      case 'E': case 'e':\n        virarEsquerda();\n        bluetooth.println(F(\"MOVIMENTO: ESQUERDA\"));\n        break;\n      case 'D': case 'd':\n        virarDireita();\n        bluetooth.println(F(\"MOVIMENTO: DIREITA\"));\n        break;\n      case 'P': case 'p': case 'S': case 's':\n        pararMotores();\n        bluetooth.println(F(\"MOVIMENTO: PARADO\"));\n        break;\n    }\n  }\n}\n"
  }
];
