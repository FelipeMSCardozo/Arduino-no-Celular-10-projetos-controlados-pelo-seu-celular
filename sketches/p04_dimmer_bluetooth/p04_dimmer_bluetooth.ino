/*
 * Projeto 04: Dimmer de LED com Controle de Brilho
 * Comandos: caracteres de '0' (0%) a '9' (100% de brilho)
 */
#include <SoftwareSerial.h>

const byte PINO_BT_RX = 2;
const byte PINO_BT_TX = 3;
const byte PINO_LED_PWM = 9; // Pino com PWM (~)

SoftwareSerial bluetooth(PINO_BT_RX, PINO_BT_TX);

void setup() {
  pinMode(PINO_LED_PWM, OUTPUT);
  analogWrite(PINO_LED_PWM, 0);

  Serial.begin(9600);
  bluetooth.begin(9600);
  bluetooth.println(F("Dimmer pronto: envie de 0 (desligado) a 9 (máximo)"));
}

void loop() {
  if (bluetooth.available()) {
    char c = bluetooth.read();
    if (c >= '0' && c <= '9') {
      int nivel = c - '0'; // Converte char para 0..9
      int pwm = map(nivel, 0, 9, 0, 255);
      analogWrite(PINO_LED_PWM, pwm);

      bluetooth.print(F("Brilho ajustado para: "));
      bluetooth.print(nivel * 11); // aproximadamente 0 a 100%
      bluetooth.println(F("%"));
    }
  }
}
