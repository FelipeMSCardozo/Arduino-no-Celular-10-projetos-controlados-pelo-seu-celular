/*
 * Projeto 03: LED RGB com Seleção de Cores via Celular
 * Comandos: 'R' (Vermelho), 'G' (Verde), 'B' (Azul), 'Y' (Amarelo), 'W' (Branco), '0' (Apagar)
 */
#include <SoftwareSerial.h>

const byte PINO_BT_RX = 2;
const byte PINO_BT_TX = 3;

const byte PINO_RED = 9;   // Pinos PWM
const byte PINO_GREEN = 10;
const byte PINO_BLUE = 11;

SoftwareSerial bluetooth(PINO_BT_RX, PINO_BT_TX);

void definirCor(byte r, byte g, byte b) {
  // Cátodo comum (HIGH = liga, LOW = desliga)
  analogWrite(PINO_RED, r);
  analogWrite(PINO_GREEN, g);
  analogWrite(PINO_BLUE, b);
}

void setup() {
  pinMode(PINO_RED, OUTPUT);
  pinMode(PINO_GREEN, OUTPUT);
  pinMode(PINO_BLUE, OUTPUT);

  definirCor(0, 0, 0); // Começa desligado

  Serial.begin(9600);
  bluetooth.begin(9600);
  bluetooth.println(F("RGB Bluetooth pronto: envie R, G, B, Y, W ou 0"));
}

void loop() {
  if (bluetooth.available()) {
    char c = bluetooth.read();
    switch (c) {
      case 'R': case 'r':
        definirCor(255, 0, 0);
        bluetooth.println(F("Cor: VERMELHO"));
        break;
      case 'G': case 'g':
        definirCor(0, 255, 0);
        bluetooth.println(F("Cor: VERDE"));
        break;
      case 'B': case 'b':
        definirCor(0, 0, 255);
        bluetooth.println(F("Cor: AZUL"));
        break;
      case 'Y': case 'y':
        definirCor(255, 200, 0);
        bluetooth.println(F("Cor: AMARELO"));
        break;
      case 'W': case 'w':
        definirCor(255, 255, 255);
        bluetooth.println(F("Cor: BRANCO"));
        break;
      case '0':
        definirCor(0, 0, 0);
        bluetooth.println(F("Cor: APAGADO"));
        break;
    }
  }
}
