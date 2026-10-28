# Arduino no Celular: 10 projetos controlados pelo seu celular

Web App (PWA) de bancada desenvolvido como bônus oficial para o curso **80 Projetos Arduino**.

## Funcionalidades Principais
1. **Comece Aqui (Os 10 Mandamentos do Bluetooth)**: Explicação didática de HC-05 vs HC-06, proteção do pino RX em 3.3V com divisor de tensão (1k e 2k/2.2k), pinos 0 e 1 livres, alerta de compatibilidade iOS/iPhone (indicando HM-10 BLE), pareamento com senha 1234/0000 e regra de alimentação independente para motores.
2. **10 Projetos Prontos Passo a Passo**:
   - P01: Ligar e Desligar LED pelo Celular (Hello World)
   - P02: Semáforo Inteligente Controlado pelo Celular
   - P03: LED RGB com Seleção de Cores
   - P04: Dimmer de LED com Controle de Brilho PWM
   - P05: Alarme Residencial com Alerta Enviado ao Celular
   - P06: Sensor de Presença PIR com Notificação no Celular
   - P07: Termômetro e Higrômetro (DHT11) no Celular
   - P08: Fechadura / Cancela com Servo Motor SG90
   - P09: Mensagem no Display LCD 16x2 I2C
   - P10: Carrinho Robô 2 Rodas Controlado pelo Celular
3. **Diagramas Elétricos em SVG**: Circuitos com divisor de tensão desenhado com convenção de cores estrita e zoom interativo para celular.
4. **Tabela de Comandos & Códigos Testados**: Todos os 10 sketches compilados sem erros com `arduino-cli` usando `SoftwareSerial` nos pinos 2 e 3.
5. **Simulador de Terminal Integrado**: Terminal virtual interativo para testar comandos e ver o hardware reagir na tela antes de montar na bancada.
6. **Checklist Pré-Ligação**: 6 verificações de segurança salvas em `localStorage`.
7. **PWA Offline**: Funciona na bancada sem internet após o primeiro acesso.

## Stack Tecnológica
- React 18 + TypeScript (Strict)
- Vite + Tailwind CSS + PWA (workbox)
- Vitest + Playwright E2E
- 100% de compilação Arduino verificada com `arduino-cli` (10/10)
