/*
 * Projeto 08: Fechadura / Cancela com Servo Motor
 * Atuador: Micro Servo 9g no pino 9
 * Comandos: 'A' (Abrir - 90 graus), 'F' (Fechar - 0 graus)
 */
#include <SoftwareSerial.h>
#include <Servo.h>

const byte PINO_BT_RX = 2;
const byte PINO_BT_TX = 3;
const byte PINO_SERVO = 9;

SoftwareSerial bluetooth(PINO_BT_RX, PINO_BT_TX);
Servo cancela;

void setup() {
  cancela.attach(PINO_SERVO);
  cancela.write(0); // Posição fechada inicial

  Serial.begin(9600);
  bluetooth.begin(9600);
  bluetooth.println(F("Fechadura pronta: envie 'A' para ABRIR ou 'F' para FECHAR."));
}

void loop() {
  if (bluetooth.available()) {
    char c = bluetooth.read();
    if (c == 'A' || c == 'a') {
      cancela.write(90); // Abre a cancela
      bluetooth.println(F("PORTA / CANCELA: ABERTA"));
    } else if (c == 'F' || c == 'f') {
      cancela.write(0);  // Fecha a cancela
      bluetooth.println(F("PORTA / CANCELA: FECHADA"));
    }
  }
}
