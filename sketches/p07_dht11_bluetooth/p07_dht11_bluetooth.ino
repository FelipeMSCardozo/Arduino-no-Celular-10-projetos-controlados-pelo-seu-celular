/*
 * Projeto 07: Termômetro e Higrômetro no Celular
 * Sensor: DHT11 no pino 4
 */
#include <SoftwareSerial.h>
#include <DHT.h>

const byte PINO_BT_RX = 2;
const byte PINO_BT_TX = 3;
const byte PINO_DHT = 4;

#define DHTTYPE DHT11
DHT dht(PINO_DHT, DHTTYPE);
SoftwareSerial bluetooth(PINO_BT_RX, PINO_BT_TX);

unsigned long tempoUltimoEnvio = 0;
const unsigned long INTERVALO_LEITURA = 5000; // Envia a cada 5 segundos

void enviarLeitura() {
  float umidade = dht.readHumidity();
  float temperatura = dht.readTemperature();

  if (isnan(umidade) || isnan(temperatura)) {
    bluetooth.println(F("Falha ao ler o sensor DHT11! Confira os fios."));
    return;
  }

  bluetooth.print(F("Temp: "));
  bluetooth.print(temperatura, 1);
  bluetooth.print(F(" C | Umid: "));
  bluetooth.print(umidade, 1);
  bluetooth.println(F(" %"));
}

void setup() {
  dht.begin();
  Serial.begin(9600);
  bluetooth.begin(9600);
  bluetooth.println(F("Estação de Clima pronta: envie 'L' para ler ou aguarde o ciclo de 5s."));
}

void loop() {
  if (bluetooth.available()) {
    char c = bluetooth.read();
    if (c == 'L' || c == 'l') {
      enviarLeitura();
    }
  }

  unsigned long agora = millis();
  if (agora - tempoUltimoEnvio >= INTERVALO_LEITURA) {
    tempoUltimoEnvio = agora;
    enviarLeitura();
  }
}
