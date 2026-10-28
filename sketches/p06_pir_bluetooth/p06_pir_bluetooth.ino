/*
 * Projeto 06: Sensor de Presença PIR com Notificação no Celular
 * Sensor: PIR no pino 4
 */
#include <SoftwareSerial.h>

const byte PINO_BT_RX = 2;
const byte PINO_BT_TX = 3;
const byte PINO_PIR = 4;
const byte PINO_LED = 13;

SoftwareSerial bluetooth(PINO_BT_RX, PINO_BT_TX);
bool movimentoAnterior = false;

void setup() {
  pinMode(PINO_PIR, INPUT);
  pinMode(PINO_LED, OUTPUT);
  digitalWrite(PINO_LED, LOW);

  Serial.begin(9600);
  bluetooth.begin(9600);
  bluetooth.println(F("Monitor de Presença PIR ativo! Aguardando estabilização do sensor..."));
  delay(2000); // tempo para o PIR calibrar
  bluetooth.println(F("Sensor calibrado e pronto!"));
}

void loop() {
  bool movimentoAtual = (digitalRead(PINO_PIR) == HIGH);

  if (movimentoAtual && !movimentoAnterior) {
    digitalWrite(PINO_LED, HIGH);
    bluetooth.println(F("MOVIMENTO DETECTADO NO AMBIENTE!"));
    movimentoAnterior = true;
  } else if (!movimentoAtual && movimentoAnterior) {
    digitalWrite(PINO_LED, LOW);
    bluetooth.println(F("Ambiente limpo (sem movimento)."));
    movimentoAnterior = false;
  }

  delay(200);
}
