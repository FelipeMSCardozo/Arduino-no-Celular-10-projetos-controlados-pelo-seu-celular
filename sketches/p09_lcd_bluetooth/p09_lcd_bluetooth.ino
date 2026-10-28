/*
 * Projeto 09: Mensagem no Display LCD 16x2 I2C via Celular
 * Display: LCD 16x2 I2C (SDA = A4, SCL = A5)
 */
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <SoftwareSerial.h>

const byte PINO_BT_RX = 2;
const byte PINO_BT_TX = 3;

SoftwareSerial bluetooth(PINO_BT_RX, PINO_BT_TX);
LiquidCrystal_I2C lcd(0x27, 16, 2);

String mensagemRecebida = "";

void setup() {
  lcd.init();
  lcd.backlight();
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Aguardando msg..");

  Serial.begin(9600);
  bluetooth.begin(9600);
  bluetooth.println(F("LCD I2C pronto! Digite uma frase e aperte Enter no app."));
}

void loop() {
  while (bluetooth.available()) {
    char c = bluetooth.read();
    if (c == '\n' || c == '\r') {
      if (mensagemRecebida.length() > 0) {
        lcd.clear();
        lcd.setCursor(0, 0);
        // Exibe primeiros 16 caracteres na linha 1
        lcd.print(mensagemRecebida.substring(0, 16));
        // Se houver mais, exibe na linha 2
        if (mensagemRecebida.length() > 16) {
          lcd.setCursor(0, 1);
          lcd.print(mensagemRecebida.substring(16, 32));
        }
        bluetooth.print(F("Exibido no LCD: "));
        bluetooth.println(mensagemRecebida);
        mensagemRecebida = "";
      }
    } else {
      if (mensagemRecebida.length() < 32) {
        mensagemRecebida += c;
      }
    }
  }
}
