/*
 * Projeto 10: Carrinho Robô 2 Rodas Controlado pelo Celular
 * Driver: Ponte H (L298N ou L9110)
 * Pinos: IN1=5, IN2=6, IN3=9, IN4=10
 * Comandos: 'F' (Frente), 'T' (Ré), 'E' (Esquerda), 'D' (Direita), 'P' ou 'S' (Parar)
 * REGRA VITAL: Alimentação dos motores por suporte de pilhas separado!
 */
#include <SoftwareSerial.h>

const byte PINO_BT_RX = 2;
const byte PINO_BT_TX = 3;

// Motor Esquerdo
const byte PINO_IN1 = 5;
const byte PINO_IN2 = 6;
// Motor Direito
const byte PINO_IN3 = 9;
const byte PINO_IN4 = 10;

SoftwareSerial bluetooth(PINO_BT_RX, PINO_BT_TX);

void moverFrente() {
  digitalWrite(PINO_IN1, HIGH);
  digitalWrite(PINO_IN2, LOW);
  digitalWrite(PINO_IN3, HIGH);
  digitalWrite(PINO_IN4, LOW);
}

void moverRe() {
  digitalWrite(PINO_IN1, LOW);
  digitalWrite(PINO_IN2, HIGH);
  digitalWrite(PINO_IN3, LOW);
  digitalWrite(PINO_IN4, HIGH);
}

void virarEsquerda() {
  digitalWrite(PINO_IN1, LOW);
  digitalWrite(PINO_IN2, HIGH);
  digitalWrite(PINO_IN3, HIGH);
  digitalWrite(PINO_IN4, LOW);
}

void virarDireita() {
  digitalWrite(PINO_IN1, HIGH);
  digitalWrite(PINO_IN2, LOW);
  digitalWrite(PINO_IN3, LOW);
  digitalWrite(PINO_IN4, HIGH);
}

void pararMotores() {
  digitalWrite(PINO_IN1, LOW);
  digitalWrite(PINO_IN2, LOW);
  digitalWrite(PINO_IN3, LOW);
  digitalWrite(PINO_IN4, LOW);
}

void setup() {
  pinMode(PINO_IN1, OUTPUT);
  pinMode(PINO_IN2, OUTPUT);
  pinMode(PINO_IN3, OUTPUT);
  pinMode(PINO_IN4, OUTPUT);

  pararMotores();

  Serial.begin(9600);
  bluetooth.begin(9600);
  bluetooth.println(F("Carrinho Robô pronto! Comandos: F (Frente), T (Ré), E (Esq), D (Dir), P (Parar)."));
}

void loop() {
  if (bluetooth.available()) {
    char comando = bluetooth.read();
    switch (comando) {
      case 'F': case 'f':
        moverFrente();
        bluetooth.println(F("MOVIMENTO: FRENTE"));
        break;
      case 'T': case 't':
        moverRe();
        bluetooth.println(F("MOVIMENTO: RÉ"));
        break;
      case 'E': case 'e':
        virarEsquerda();
        bluetooth.println(F("MOVIMENTO: ESQUERDA"));
        break;
      case 'D': case 'd':
        virarDireita();
        bluetooth.println(F("MOVIMENTO: DIREITA"));
        break;
      case 'P': case 'p': case 'S': case 's':
        pararMotores();
        bluetooth.println(F("MOVIMENTO: PARADO"));
        break;
    }
  }
}
