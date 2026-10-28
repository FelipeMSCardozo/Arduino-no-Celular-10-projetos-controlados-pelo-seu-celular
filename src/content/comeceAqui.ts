export interface Mandamento {
  id: number;
  titulo: string;
  destaque: string;
  explicacao: string;
  perigoEvitado: string;
  dicaBancada: string;
  svgTipo?: 'divisor' | 'modulo' | 'iphone' | 'motores';
}

export interface ItemChecklist {
  id: string;
  titulo: string;
  descricao: string;
}

export interface ItemCompra {
  nome: string;
  quantidade: string;
  especificacao: string;
  ondeUsado: string;
}

export const MANDAMENTOS_BLUETOOTH: Mandamento[] = [
  {
    id: 1,
    titulo: 'HC-05 vs HC-06: Qual comprar?',
    destaque: 'O HC-05 é mestre e escravo (tem botão no canto). O HC-06 é apenas escravo.',
    explicacao: 'Para controlar o Arduino pelo celular, QUALQUER UM dos dois funciona perfeitamente, porque o celular sempre age como mestre e o Arduino como escravo. No entanto, recomendamos o **HC-05**: ele custa praticamente o mesmo preço, vem com o botãozinho de comando AT no canto da placa e permite no futuro ligar dois Arduinos entre si sem fio.',
    perigoEvitado: 'Comprar o módulo errado achando que o HC-06 não serve para falar com o celular (ele serve sim!).',
    dicaBancada: 'Se você já tem o HC-06 na bancada, use-o tranquilamente. Se for comprar agora, prefira o HC-05.'
  },
  {
    id: 2,
    titulo: 'O Pino RX é 3.3V! Use Sempre o Divisor de Tensão',
    destaque: 'O VCC aceita 5V, mas o pino RX do módulo queima com 5V do Arduino.',
    explicacao: 'A placa traseira azul tem um regulador interno que alimenta o chip em 3.3V a partir dos 5V do pino VCC. Porém, as linhas de dados NÃO têm regulador! O pino TX do Arduino envia pulsos de 5V direto no RX do Bluetooth. Para proteger o módulo de superaquecimento e queima prematura, monte um divisor de tensão com 2 resistores: **R1 = 1 kΩ (entre pino D3 do Arduino e pino RX do BT)** e **R2 = 2 kΩ ou 2.2 kΩ (entre pino RX do BT e GND)**. Isso reduz os 5V com precisão para 3.33V seguros.',
    perigoEvitado: 'Degradação e queima do receptor do módulo Bluetooth após poucos dias de uso.',
    dicaBancada: 'A linha TX do Bluetooth (que manda dados para o RX do Arduino) NÃO precisa de divisor: os 3.3V que saem do módulo são lidos com total segurança como nível HIGH pelo pino do Arduino.',
    svgTipo: 'divisor'
  },
  {
    id: 3,
    titulo: 'Nunca Conecte nos Pinos 0 e 1 Durante o Upload USB',
    destaque: 'Pinos D0 (RX) e D1 (TX) são compartilhados com o cabo USB do computador.',
    explicacao: 'Quando você grava um código pelo Arduino IDE, o chip FTDI/ATmega16U2 conversa com o microcontrolador através dos pinos D0 e D1. Se o módulo Bluetooth estiver conectado neles, haverá conflito elétrico e a IDE vai travar exibindo o erro fatal: "avrdude: stk500_recv(): programmer is not responding". Em todos os 10 projetos deste app, usamos a biblioteca nativa **SoftwareSerial nos pinos 2 e 3**, deixando a serial USB totalmente livre para diagnóstico!',
    perigoEvitado: 'Erro crônico de gravação e código que nunca sobe para a placa.',
    dicaBancada: 'Com SoftwareSerial, você pode manter o cabo USB conectado ao computador monitorando o que acontece enquanto manda comandos pelo celular ao mesmo tempo!'
  },
  {
    id: 4,
    titulo: 'Taxa de Transmissão Padrão: 9600 Baud',
    destaque: 'Quase 100% dos módulos HC-05 e HC-06 vêm de fábrica configurados para 9600 baud.',
    explicacao: 'Tanto o comando bluetooth.begin(9600) no código Arduino quanto a configuração do aplicativo no celular precisam estar rigorosamente na mesma velocidade. Se o módulo estiver em 9600 e o app em 115200, a mensagem chegará como caracteres ilegíveis ("????").',
    perigoEvitado: 'Mensagens ilegíveis ou comunicação aparentemente morta na tela do celular.',
    dicaBancada: 'Só use 38400 baud se estiver configurando comandos AT segurando o botãozinho do HC-05.'
  },
  {
    id: 5,
    titulo: 'O Que o LED Vermelho do Módulo Significa?',
    destaque: 'O ritmo do LED é o termômetro do status da conexão.',
    explicacao: 'Observe o LED integrado na plaquinha Bluetooth:\n• **Piscando rápido (2 a 3 vezes por segundo):** o módulo está ligado e procurando dispositivos, mas ainda NÃO está conectado a nenhum celular.\n• **Piscando lento (uma vez a cada 2 segundos):** entrou no modo de configuração AT (HC-05).\n• **Aceso fixo ou pisca duplo suave:** o celular está CONECTADO e pronto para trocar mensagens!',
    perigoEvitado: 'Achar que o código está errado quando o celular simplesmente ainda não conectou.',
    dicaBancada: 'Nunca envie comandos enquanto o LED estiver piscando rápido: o módulo não vai repassar os dados para o Arduino.'
  },
  {
    id: 6,
    titulo: 'Senha Padrão de Pareamento: 1234 ou 0000',
    destaque: 'O pareamento precisa ser feito primeiro no menu Bluetooth do Android.',
    explicacao: 'Antes de abrir o aplicativo de terminal, vá em Configurações > Bluetooth no seu smartphone, mande procurar dispositivos e toque no nome "HC-05" ou "HC-06". O sistema vai pedir uma senha (PIN): digite **1234** (em 95% dos casos) ou **0000**. Só abra o aplicativo depois que ele aparecer como "Dispositivo Pareado".',
    perigoEvitado: 'Tentar conectar pelo app sem antes registrar o dispositivo no Android.',
    dicaBancada: 'Se o celular não encontrar o módulo, confira se o pino VCC do Bluetooth está recebendo 5V reais da placa.'
  },
  {
    id: 7,
    titulo: 'ALERTA IPHONE (iOS): HC-05 NÃO Funciona na Apple!',
    destaque: 'Dispositivos Apple exigem Bluetooth BLE (HM-10 ou AT-09), não Bluetooth Clássico SPP.',
    explicacao: 'A Apple bloqueia conexões do perfil Bluetooth SPP (Serial Port Profile) clássico usado pelo HC-05 e HC-06 em iPhones e iPads, a menos que o fabricante pague royalties do programa MFi. Portanto, **o HC-05 e HC-06 NÃO aparecem nem funcionam no iPhone**.\n\nSe você usa iPhone, você DEVE comprar um módulo **HM-10 ou AT-09 (Bluetooth 4.0 BLE)**. Os códigos dos 10 projetos continuam 100% iguais (mesmos pinos 2 e 3 e mesma lógica serial), mudando apenas o app no iPhone (como o "BLE Terminal" ou "DSD TECH Bluetooth").',
    perigoEvitado: 'Frustração de tentar parear o HC-05 no iPhone por horas sem sucesso.',
    dicaBancada: 'Se você usa Android, o HC-05 funciona perfeitamente de primeira!',
    svgTipo: 'iphone'
  },
  {
    id: 8,
    titulo: 'App Recomendado: "Serial Bluetooth Terminal" (Kai Morich)',
    destaque: 'O melhor aplicativo para Android: 100% gratuito, sem anúncios e muito estável.',
    explicacao: 'Na Google Play Store, procure por **"Serial Bluetooth Terminal"** do desenvolvedor **Kai Morich**. Ele é a referência na comunidade de engenharia: leve, com botões programáveis (macros M1, M2...) e sem propagandas chatas. Nas configurações dele, deixe:\n• Baudrate: 9600\n• Newline: CRLF (ou CR)\n• Charset: UTF-8',
    perigoEvitado: 'Usar apps cheios de anúncios invasivos ou que fecham sozinhos no meio do teste.',
    dicaBancada: 'Você pode renomear os botões na parte inferior do app para "Ligar LED", "Desligar", etc., facilitando a demonstração para amigos.'
  },
  {
    id: 9,
    titulo: 'Motores e Cargas Pesadas: Fonte Externa Obrigatória!',
    destaque: 'NUNCA ligue motores DC ou servos no pino 5V do Arduino.',
    explicacao: 'No Projeto 10 (carrinho) e no Projeto 08 (servo motor), os motores consomem picos de 500mA a mais de 1A ao darem a partida. O regulador interno do Arduino suporta no máximo 400mA no pino 5V. Se você ligar o motor no 5V do Arduino, a tensão vai despencar, a placa vai resetar e o Bluetooth vai desconectar na hora!\n\n**A REGRA DE OURO:** use um suporte de 4 pilhas AA (6V) ou bateria para alimentar a ponte H/motores, e una o fio preto (GND) das pilhas ao GND do Arduino para manter a mesma referência.',
    perigoEvitado: 'Queima do regulador do Arduino e reinicializações misteriosas do Bluetooth.',
    dicaBancada: 'Bateria de 9V retangular comum é péssima para motores: ela descarrega em 10 minutos. Use 4 pilhas AA alcalinas ou bateria 18650.',
    svgTipo: 'motores'
  },
  {
    id: 10,
    titulo: 'Ordem de Sucesso: Comece pelo Projeto 01',
    destaque: 'Valide o rádio Bluetooth com um simples LED antes de montar o robô completo.',
    explicacao: 'A causa nº 1 de desistência é o cliente tentar montar o carrinho com 15 fios de primeira e nada funcionar. Comece pelo Projeto 01 (apenas o Bluetooth e 1 LED). Quando você ver o comando "1" acender o LED pelo celular, você terá 100% de certeza de que o rádio, a senha, o app e o divisor de tensão estão perfeitos. A partir daí, os outros 9 projetos são fáceis!',
    perigoEvitado: 'Complexidade desnecessária e excesso de variáveis de erro na bancada.',
    dicaBancada: 'Eletrônica se constrói em camadas testadas: primeiro a comunicação, depois os sensores, depois os motores.'
  }
];

export const CHECKLIST_ANTES_DE_LIGAR: ItemChecklist[] = [
  {
    id: 'chk-1',
    titulo: 'Divisor de tensão no pino RX do Bluetooth conferido',
    descricao: 'R1 (1 kΩ) sai do pino D3 do Arduino até o RX do módulo. R2 (2 kΩ ou 2.2 kΩ) sai do RX do módulo até o barramento GND azul.'
  },
  {
    id: 'chk-2',
    titulo: 'Pinos TX e RX cruzados corretamente',
    descricao: 'O pino TX do Bluetooth liga direto no pino D2 do Arduino (sem resistor). O pino RX do Bluetooth recebe o sinal atenuado do pino D3.'
  },
  {
    id: 'chk-3',
    titulo: 'Pinos D0 e D1 do Arduino estão totalmente vazios',
    descricao: 'Nenhum fio conectado em D0 (RX) e D1 (TX) para não interferir na gravação do código via USB.'
  },
  {
    id: 'chk-4',
    titulo: 'GND comum verificado entre todas as fontes',
    descricao: 'Se estiver usando suporte de pilhas externo para motores ou servo, o polo negativo (-) está conectado ao pino GND do Arduino.'
  },
  {
    id: 'chk-5',
    titulo: 'Código gravado com sucesso antes de conectar no celular',
    descricao: 'O sketch foi compilado e enviado para a placa, e o Monitor Serial foi aberto a 9600 baud para conferir a mensagem de inicialização.'
  },
  {
    id: 'chk-6',
    titulo: 'Dispositivo pareado no menu Bluetooth do Android com senha 1234',
    descricao: 'O módulo já consta como dispositivo pareado no sistema antes de abrir o app Serial Bluetooth Terminal.'
  }
];

export const LISTA_DE_COMPRAS: ItemCompra[] = [
  {
    nome: 'Módulo Bluetooth HC-05 (ou HC-06)',
    quantidade: '1 unidade',
    especificacao: 'Placa com base azul de 6 pinos (VCC, GND, TXD, RXD, STATE, EN)',
    ondeUsado: 'Usado em todos os 10 projetos'
  },
  {
    nome: 'Resistor de 1 kΩ (Marrom, Preto, Vermelho)',
    quantidade: '2 unidades',
    especificacao: '1/4W (0.25W), tolerância 5%',
    ondeUsado: 'Divisor de tensão obrigatório da linha RX'
  },
  {
    nome: 'Resistor de 2 kΩ ou 2.2 kΩ (Vermelho, Vermelho, Vermelho)',
    quantidade: '2 unidades',
    especificacao: '1/4W (0.25W), tolerância 5%',
    ondeUsado: 'Divisor de tensão obrigatório da linha RX ao GND'
  },
  {
    nome: 'LEDs Difusos 5mm (Vermelho, Amarelo, Verde)',
    quantidade: '4 unidades',
    especificacao: '5mm difuso padrão + resistores de 220 Ω',
    ondeUsado: 'Projetos 01, 02 e 04'
  },
  {
    nome: 'LED RGB Cátodo Comum',
    quantidade: '1 unidade',
    especificacao: '4 pernas (pino mais longo no GND) + 3 resistores 220 Ω',
    ondeUsado: 'Projeto 03'
  },
  {
    nome: 'Buzzer Ativo ou Passivo 5V',
    quantidade: '1 unidade',
    especificacao: 'Buzzer contínuo ou piezoelétrico',
    ondeUsado: 'Projeto 05 (alarme)'
  },
  {
    nome: 'Sensor de Presença PIR (HC-SR501)',
    quantidade: '1 unidade',
    especificacao: 'Sensor infravermelho passivo com cúpula branca',
    ondeUsado: 'Projeto 06'
  },
  {
    nome: 'Sensor de Temperatura e Umidade DHT11',
    quantidade: '1 unidade',
    especificacao: 'Sensor azul de 3 ou 4 pinos',
    ondeUsado: 'Projeto 07'
  },
  {
    nome: 'Micro Servo Motor 9g (SG90)',
    quantidade: '1 unidade',
    especificacao: 'Mini servo motor azul 180 graus',
    ondeUsado: 'Projeto 08'
  },
  {
    nome: 'Display LCD 16x2 com Módulo I2C soldado',
    quantidade: '1 unidade',
    especificacao: 'Backlight azul ou verde, interface 4 pinos (VCC, GND, SDA, SCL)',
    ondeUsado: 'Projeto 09'
  },
  {
    nome: 'Kit Chassi 2 Rodas Robô + Ponte H (L298N ou L9110S)',
    quantidade: '1 kit',
    especificacao: '2 motores DC com caixa de redução amarela + suporte 4 pilhas AA',
    ondeUsado: 'Projeto 10 (carrinho)'
  }
];
