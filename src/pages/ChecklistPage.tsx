import React from 'react';
import { Card, Button, Checklist, AlertBox } from '../components/ui';
import { CHECKLIST_ANTES_DE_LIGAR } from '../content/comeceAqui';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const ChecklistPage: React.FC = () => {
  const [marcados, setMarcados] = useLocalStorage<string[]>('checklist-bluetooth-marcados', []);

  const total = CHECKLIST_ANTES_DE_LIGAR.length;
  const concluidosCount = marcados.length;
  const tudoPronto = concluidosCount === total;

  const toggleItem = (id: string) => {
    setMarcados((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const checklistItems = CHECKLIST_ANTES_DE_LIGAR.map((item) => ({
    id: item.id,
    label: item.titulo,
    checked: marcados.includes(item.id),
    hint: item.descricao,
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-24 md:pb-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent-text dark:text-accent text-xs font-semibold uppercase tracking-wider">
          <span>🛡️</span> Segurança em Primeiro Lugar
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-ink tracking-tight">
          Checklist: Antes de Ligar o Bluetooth
        </h1>
        <p className="text-ink-muted text-sm sm:text-base">
          6 conferências rápidas na bancada para garantir que nenhuma ligação queime seu módulo e que o código suba de primeira.
        </p>

        <div className="pt-2">
          <span className="font-semibold text-xs text-ink">
            {concluidosCount} de {total} itens conferidos ({Math.round((concluidosCount / total) * 100)}%)
          </span>
        </div>
      </div>

      <Card className="space-y-6">
        <Checklist
          items={checklistItems}
          checkedIds={marcados}
          onToggle={toggleItem}
          onReset={() => setMarcados([])}
        />

        <div className="pt-4 border-t border-bench-border flex flex-wrap items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMarcados([])}
            className="text-xs"
          >
            Desmarcar todos
          </Button>

          {tudoPronto && (
            <div className="flex items-center gap-2 text-xs font-bold text-led">
              <span>🎉</span> Tudo conferido com segurança! Pode alimentar a bancada.
            </div>
          )}
        </div>
      </Card>

      <AlertBox type="warning" title="Regra de Ouro">
        Nunca pule o item 1 (divisor de tensão no pino RX) e o item 4 (GND comum). Eles respondem por mais de 90% das falhas relatadas por iniciantes.
      </AlertBox>
    </div>
  );
};
