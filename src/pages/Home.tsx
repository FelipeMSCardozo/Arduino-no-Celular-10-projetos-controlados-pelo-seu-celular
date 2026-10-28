import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, LevelBadge, ProgressBar, AlertBox } from '../components/ui';
import { PROJETOS_CELULAR } from '../content/projetosCelular';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const Home: React.FC = () => {
  const [concluidos, setConcluidos] = useLocalStorage<number[]>('projetos-celular-concluidos', []);
  const [filtroNivel, setFiltroNivel] = useState<string>('Todos');

  const total = PROJETOS_CELULAR.length;
  const concluidosCount = concluidos.length;

  const toggleConcluido = (num: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setConcluidos((prev) =>
      prev.includes(num) ? prev.filter((id) => id !== num) : [...prev, num]
    );
  };

  const projetosFiltrados = PROJETOS_CELULAR.filter((p) => {
    if (filtroNivel === 'Todos') return true;
    return p.nivel === filtroNivel;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-24 md:pb-12 space-y-8">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent-text dark:text-accent text-xs font-semibold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          Bônus Oficial • 10 Projetos com Bluetooth
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight">
          Controle o Arduino pelo celular{' '}
          <span className="text-accent-text dark:text-accent">sem complicação.</span>
        </h1>
        <p className="text-ink-muted text-base sm:text-lg">
          Projetos testados na bancada, códigos compiláveis com SoftwareSerial, diagramas elétricos com divisor de tensão no RX e o aplicativo gratuito recomendado.
        </p>

        {/* Barra de Progresso Geral */}
        <div className="pt-2 max-w-xl mx-auto">
          <ProgressBar value={concluidosCount} max={total} label="Projetos montados e testados" />
        </div>
      </div>

      {/* Alerta Vital iPhone vs Android */}
      <AlertBox type="warning" title="Aviso importante sobre iPhone (iOS) e Android">
        <p className="text-sm leading-relaxed">
          <strong>Se você usa Android:</strong> o módulo HC-05 ou HC-06 funciona perfeitamente com o app gratuito <em>Serial Bluetooth Terminal</em>.<br />
          <strong>Se você usa iPhone:</strong> a Apple bloqueia conexões Bluetooth SPP clássicas do HC-05/06. Para iPhone, você precisa do módulo <strong>HM-10 ou AT-09 (Bluetooth BLE)</strong>. O código e os diagramas dos 10 projetos continuam exatamente iguais! Consulte a aba <Link to="/comece-aqui" className="underline font-bold text-accent">Comece Aqui</Link> para mais detalhes.
        </p>
      </AlertBox>

      {/* Filtro por Nível */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-bench-card border border-bench-border rounded-xl p-3 text-xs">
        <span className="font-semibold text-ink">Filtrar por nível:</span>
        <div className="flex items-center gap-1.5">
          {['Todos', 'Iniciante', 'Intermediário', 'Avançado'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFiltroNivel(lvl)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filtroNivel === lvl
                  ? 'bg-accent text-white dark:text-slate-950 font-bold shadow-sm'
                  : 'bg-bench-elevated text-ink-muted hover:text-ink hover:bg-bench-border'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Grid dos 10 Projetos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projetosFiltrados.map((p) => {
          const isDone = concluidos.includes(p.numero);
          return (
            <Link key={p.numero} to={`/projeto/${p.numero}`} className="group block">
              <Card
                interactive
                highlight={isDone}
                className="h-full flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-bench-elevated text-ink">
                        PROJETO #{String(p.numero).padStart(2, '0')}
                      </span>
                      <LevelBadge level={p.nivel} />
                      <span className="text-[11px] text-ink-muted">⏱ {p.tempoEstimado}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => toggleConcluido(p.numero, e)}
                      title={isDone ? 'Projeto concluído' : 'Marcar como concluído'}
                      className={`p-1.5 rounded-lg border text-xs font-medium transition-colors ${
                        isDone
                          ? 'bg-led/20 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                          : 'bg-bench-elevated border-bench-border text-ink-muted hover:text-ink'
                      }`}
                    >
                      {isDone ? (
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Feito
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px]">
                          <span className="w-2 h-2 rounded-full border border-ink-muted"></span>
                          Pendente
                        </span>
                      )}
                    </button>
                  </div>

                  <div>
                    <h2 className="font-bold text-lg text-ink group-hover:text-accent-text dark:group-hover:text-accent transition-colors">
                      {p.titulo}
                    </h2>
                    <p className="text-ink-muted text-xs sm:text-sm mt-1 leading-relaxed">
                      {p.subtitulo}
                    </p>
                  </div>

                  {/* Pills de Comandos */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] text-ink-muted font-medium">Comandos:</span>
                    {p.comandos.slice(0, 4).map((c, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded font-mono text-[11px] bg-accent/10 border border-accent/20 text-accent-text dark:text-accent"
                      >
                        {c.comando}
                      </span>
                    ))}
                    {p.comandos.length > 4 && (
                      <span className="text-[10px] text-ink-muted">+{p.comandos.length - 4} outros</span>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-bench-border/50 flex items-center justify-between text-xs text-ink-muted">
                  <span>{p.pecas.length} componentes</span>
                  <span className="text-accent-text dark:text-accent font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Ver esquema e código →
                  </span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
