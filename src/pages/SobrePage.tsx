import React from 'react';
import { Card, AlertBox } from '../components/ui';

export const SobrePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-24 md:pb-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent-text dark:text-accent text-xs font-semibold uppercase tracking-wider">
          <span>📖</span> Manual de Uso
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-ink tracking-tight">
          Como Usar o Arduino no Celular
        </h1>
        <p className="text-ink-muted text-sm sm:text-base">
          Guia completo para aproveitar ao máximo os 10 projetos controlados por smartphone na sua bancada.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="space-y-3 border-accent/30">
          <h2 className="text-lg font-bold text-ink flex items-center gap-2">
            <span>1️⃣</span> Passo 1: Comece pela aba Comece Aqui
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed">
            Leia os 10 Mandamentos do Bluetooth. Você vai entender por que o pino RX opera em 3.3V, por que os pinos 0 e 1 devem ficar livres e qual a diferença entre Android e iPhone.
          </p>
        </Card>

        <Card className="space-y-3 border-accent/30">
          <h2 className="text-lg font-bold text-ink flex items-center gap-2">
            <span>2️⃣</span> Passo 2: Baixe o App Gratuito
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed">
            No Android, baixe na Google Play Store o <strong>Serial Bluetooth Terminal</strong> (desenvolvido por Kai Morich). No iPhone (com módulo HM-10), use o <strong>BLE Terminal</strong>. Ambos são leves e livres de anúncios invasivos.
          </p>
        </Card>

        <Card className="space-y-3 border-accent/30">
          <h2 className="text-lg font-bold text-ink flex items-center gap-2">
            <span>3️⃣</span> Passo 3: Teste no Simulador Integrado
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed">
            Use a aba <strong>Simulador</strong> para entender como o envio de caracteres simples como '1', '0' ou 'F' faz o Arduino acender LEDs ou mover o carrinho antes mesmo de conectar os fios físicos.
          </p>
        </Card>

        <AlertBox type="tip" title="Uso Offline na Bancada (PWA)">
          Este aplicativo é um Progressive Web App (PWA). Você pode adicioná-lo à tela de início do seu celular e usá-lo com todos os diagramas e códigos mesmo quando estiver sem internet na bancada.
        </AlertBox>

        <div className="text-center pt-4 text-xs text-ink-muted border-t border-bench-border/50">
          <p className="font-semibold text-ink">Arduino no Celular — 80 Projetos Arduino</p>
          <p className="text-[11px] mt-0.5">Criado com foco em clareza técnica e segurança de bancada.</p>
        </div>
      </div>
    </div>
  );
};
