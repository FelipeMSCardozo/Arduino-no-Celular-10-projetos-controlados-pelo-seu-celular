/*
 * Projeto 02: Semáforo Inteligente Controlado pelo Celular
 * Comandos: 'V' (Verde), 'A' (Amarelo), 'R' (Vermelho), 'C' (Ciclo automático)
 */
#include <SoftwareSerial.h>

const byte PINO_BT_RX = 2;
const byte PINO_BT_TX = 3;

const byte PINO_VERDE = 8;
const byte PINO_AMARELO = 9;
const byte PINO_VERMELHO = 10;

SoftwareSerial bluetooth(PINO_BT_RX, PINO_BT_TX);
bool modoAutomatico = false;
unsigned long tempoAnterior = 0;
byte faseAutomatica = 0;

void desligarTodos() {
  digitalWrite(PINO_VERDE, LOW);
  digitalWrite(PINO_AMARELO, LOW);
  digitalWrite(PINO_VERMELHO, LOW);
}

void setup() {
  pinMode(PINO_VERDE, OUTPUT);
  pinMode(PINO_AMARELO, OUTPUT);
  pinMode(PINO_VERMELHO, OUTPUT);

  desligarTodos();
  digitalWrite(PINO_VERMELHO, HIGH);

  Serial.begin(9600);
  bluetooth.begin(9600);
  bluetooth.println(F("Semáforo pronto: envie V, A, R ou C (Ciclo)"));
}

void loop() {
  if (bluetooth.available()) {
    char c = bluetooth.read();
    if (c == 'V' || c == 'v') {
      modoAutomatico = false;
      desligarTodos();
      digitalWrite(PINO_VERDE, HIGH);
      bluetooth.println(F("Sinal: VERDE"));
    } else if (c == 'A' || c == 'a') {
      modoAutomatico = false;
      desligarTodos();
      digitalWrite(PINO_AMARELO, HIGH);
      bluetooth.println(F("Sinal: AMARELO"));
    } else if (c == 'R' || c == 'r') {
      modoAutomatico = false;
      desligarTodos();
      digitalWrite(PINO_VERMELHO, HIGH);
      bluetooth.println(F("Sinal: VERMELHO"));
    } else if (c == 'C' || c == 'c') {
      modoAutomatico = true;
      tempoAnterior = millis();
      faseAutomatica = 0;
      bluetooth.println(F("Modo: AUTOMÁTICO INICIADO"));
    }
  }

  if (modoAutomatico) {
    unsigned long agora = millis();
    if (faseAutomatica == 0 && agora - tempoAnterior >= 3000) {
      desligarTodos();
      digitalWrite(PINO_AMARELO, HIGH);
      faseAutomatica = 1;
      tempoAnterior = agora;
    } else if (faseAutomatica == 1 && agora - tempoAnterior >= 1500) {
      desligarTodos();
      digitalWrite(PINO_VERMELHO, HIGH);
      faseAutomatica = 2;
      tempoAnterior = agora;
    } else if (faseAutomatica == 2 && agora - tempoAnterior >= 3000) {
      desligarTodos();
      digitalWrite(PINO_VERDE, HIGH);
      faseAutomatica = 0;
      tempoAnterior = agora;
    }
  }
}
