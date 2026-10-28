/*
 * Projeto 05: Alarme Residencial com Aviso no Celular
 * Sensor: Botão ou Sensor Magnético Reed no pino 4 (INPUT_PULLUP)
 * Atuador: Buzzer no pino 8
 */
#include <SoftwareSerial.h>

const byte PINO_BT_RX = 2;
const byte PINO_BT_TX = 3;
const byte PINO_SENSOR = 4; // Sensor de porta/janela
const byte PINO_BUZZER = 8;

SoftwareSerial bluetooth(PINO_BT_RX, PINO_BT_TX);
bool alarmeArmado = true;
bool intrusaoDetectada = false;

void setup() {
  pinMode(PINO_SENSOR, INPUT_PULLUP);
  pinMode(PINO_BUZZER, OUTPUT);
  digitalWrite(PINO_BUZZER, LOW);

  Serial.begin(9600);
  bluetooth.begin(9600);
  bluetooth.println(F("Sistema de Alarme iniciado! Envie 'D' para desarmar ou 'A' para armar."));
}

void loop() {
  // Comandos do celular
  if (bluetooth.available()) {
    char c = bluetooth.read();
    if (c == 'D' || c == 'd') {
      alarmeArmado = false;
      intrusaoDetectada = false;
      digitalWrite(PINO_BUZZER, LOW);
      bluetooth.println(F("ALARME DESARMADO"));
    } else if (c == 'A' || c == 'a') {
      alarmeArmado = true;
      intrusaoDetectada = false;
      digitalWrite(PINO_BUZZER, LOW);
      bluetooth.println(F("ALARME ARMADO E VIGILANTE"));
    }
  }

  // Verificação de invasão (contato aberto = HIGH)
  if (alarmeArmado && !intrusaoDetectada) {
    if (digitalRead(PINO_SENSOR) == HIGH) {
      intrusaoDetectada = true;
      bluetooth.println(F(">>> ALERTA DE INTRUSO! PORTA ABERTA! <<<"));
    }
  }

  // Disparo sonoro do buzzer
  if (alarmeArmado && intrusaoDetectada) {
    digitalWrite(PINO_BUZZER, HIGH);
    delay(100);
    digitalWrite(PINO_BUZZER, LOW);
    delay(100);
  }
}
