/*
 * Projeto 01: Ligar e Desligar LED pelo Celular
 * Comunicação: SoftwareSerial nos pinos 2 (RX do Arduino) e 3 (TX do Arduino)
 * Divisor de tensão obrigatório no RX do Bluetooth: D3 -> 1k -> RX_BT -> 2k -> GND
 */
#include <SoftwareSerial.h>

const byte PINO_BT_RX = 2; // Conectado ao TX do módulo Bluetooth
const byte PINO_BT_TX = 3; // Conectado ao divisor de tensão que vai ao RX do módulo
const byte PINO_LED = 13;  // LED indicador no pino 13

SoftwareSerial bluetooth(PINO_BT_RX, PINO_BT_TX);

void setup() {
  pinMode(PINO_LED, OUTPUT);
  digitalWrite(PINO_LED, LOW);

  Serial.begin(9600);
  bluetooth.begin(9600);

  Serial.println(F("Projeto 01: LED Bluetooth iniciado!"));
  bluetooth.println(F("Arduino pronto! Envie 1 para ligar ou 0 para desligar."));
}

void loop() {
  if (bluetooth.available()) {
    char comando = bluetooth.read();
    Serial.print(F("Comando recebido: "));
    Serial.println(comando);

    if (comando == '1') {
      digitalWrite(PINO_LED, HIGH);
      bluetooth.println(F("LED ACESO"));
    } else if (comando == '0') {
      digitalWrite(PINO_LED, LOW);
      bluetooth.println(F("LED APAGADO"));
    }
  }
}
