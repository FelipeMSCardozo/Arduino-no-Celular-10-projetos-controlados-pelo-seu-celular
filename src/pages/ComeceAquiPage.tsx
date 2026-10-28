import React from 'react';
import { Card, AlertBox, ResponsiveTable } from '../components/ui';
import { BluetoothDividerDiagramSvg } from '../illustrations/HardwareSvgs';
import { MANDAMENTOS_BLUETOOTH, LISTA_DE_COMPRAS } from '../content/comeceAqui';

export const ComeceAquiPage: React.FC = () => {
  const comprasHeaders = ['Componente', 'Quantidade', 'Especificação', 'Onde é usado'];
  const comprasRows = LISTA_DE_COMPRAS.map((c) => [
    <strong key="nome" className="text-ink">{c.nome}</strong>,
    <span key="qtd" className="font-mono text-xs">{c.quantidade}</span>,
    <span key="esp" className="text-xs">{c.especificacao}</span>,
    <span key="onde" className="text-xs text-ink-muted">{c.ondeUsado}</span>
  ]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-24 md:pb-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent-text dark:text-accent text-xs font-semibold uppercase tracking-wider">
          <span>⚡</span> Guia Fundamental de Bancada
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-ink tracking-tight">
          Comece Aqui: Os 10 Mandamentos do Bluetooth
        </h1>
        <p className="text-ink-muted text-sm sm:text-base">
          Tudo o que você precisa saber para não queimar o módulo, parear de primeira e evitar as armadilhas mais comuns de quem começa no Arduino sem fio.
        </p>
      </div>

      {/* Alerta Destacado do iPhone */}
      <AlertBox type="warning" title="Atenção Usuários de iPhone (iOS)">
        A Apple proíbe dispositivos Bluetooth SPP clássico sem certificação proprietária. O módulo HC-05 e HC-06 <strong>NÃO funcionam no iPhone</strong>. Para usar no iOS, adquira o módulo <strong>HM-10 ou AT-09 (BLE)</strong>. Se você usa celular Android, o HC-05 e HC-06 funcionam 100% de fábrica.
      </AlertBox>

      {/* Diagrama Elétrico em Destaque do Divisor de Tensão */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-ink flex items-center gap-2">
          <span>🛡️</span> O Divisor de Tensão Obrigatório no RX
        </h2>
        <Card className="p-3 sm:p-5 border-bench-border overflow-hidden">
          <BluetoothDividerDiagramSvg extraComponentLabel="Pino RXD Protegido em 3.3V" extraPin="D3" />
        </Card>
      </div>

      {/* Os 10 Mandamentos */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-ink flex items-center gap-2">
          <span>📜</span> Os 10 Mandamentos da Conexão Sem Fio
        </h2>

        <div className="space-y-4">
          {MANDAMENTOS_BLUETOOTH.map((m) => (
            <Card key={m.id} className="space-y-3 border-bench-border/80 hover:border-accent/50 transition-colors">
              <div className="flex items-center gap-3 border-b border-bench-border/50 pb-2.5">
                <span className="w-7 h-7 rounded-lg bg-accent/15 text-accent-text dark:text-accent font-mono font-bold text-sm flex items-center justify-center shrink-0">
                  {m.id}
                </span>
                <h3 className="font-bold text-base text-ink">
                  {m.titulo}
                </h3>
              </div>

              <div className="p-2.5 rounded-lg bg-accent/10 border border-accent/20 text-xs font-semibold text-accent-text dark:text-accent">
                {m.destaque}
              </div>

              <div className="text-xs sm:text-sm text-ink-muted whitespace-pre-line leading-relaxed font-sans">
                {m.explicacao}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 text-xs">
                <div className="p-2.5 rounded-lg bg-bench-elevated border border-bench-border text-ink-muted">
                  <strong className="text-red-500 block mb-0.5">⚠️ Perigo que evita:</strong>
                  {m.perigoEvitado}
                </div>
                <div className="p-2.5 rounded-lg bg-bench-elevated border border-bench-border text-ink-muted">
                  <strong className="text-led block mb-0.5">💡 Dica de bancada:</strong>
                  {m.dicaBancada}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Lista de Compras Completa */}
      <div className="space-y-4 pt-4 border-t border-bench-border">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-ink flex items-center gap-2">
            <span>🛒</span> Lista de Compras para os 10 Projetos
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted">
            Economize no frete comprando os componentes juntos em qualquer loja de eletrônica, Mercado Livre ou Shopee.
          </p>
        </div>

        <ResponsiveTable headers={comprasHeaders} rows={comprasRows} />
      </div>
    </div>
  );
};
