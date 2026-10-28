import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card, LevelBadge, AlertBox, CodeBlock, ResponsiveTable } from '../components/ui';
import { BluetoothDividerDiagramSvg } from '../illustrations/HardwareSvgs';
import { PROJETOS_CELULAR } from '../content/projetosCelular';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const ProjetoDetalhe: React.FC = () => {
  const { numero } = useParams<{ numero: string }>();
  const numProj = parseInt(numero || '1', 10);

  const projeto = PROJETOS_CELULAR.find((p) => p.numero === numProj) || PROJETOS_CELULAR[0];
  const [concluidos, setConcluidos] = useLocalStorage<number[]>('projetos-celular-concluidos', []);
  const [passosFeitos, setPassosFeitos] = useState<number[]>([]);

  const isDone = concluidos.includes(projeto.numero);

  const toggleConcluido = () => {
    setConcluidos((prev) =>
      prev.includes(projeto.numero)
        ? prev.filter((id) => id !== projeto.numero)
        : [...prev, projeto.numero]
    );
  };

  const togglePasso = (idx: number) => {
    setPassosFeitos((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const projAnterior = projeto.numero > 1 ? projeto.numero - 1 : null;
  const projProximo = projeto.numero < PROJETOS_CELULAR.length ? projeto.numero + 1 : null;

  // Tabela de comandos
  const comandoHeaders = ['Comando', 'O que significa', 'Ação no circuito'];
  const comandoRows = projeto.comandos.map((c) => [
    <span key="cmd" className="font-mono font-bold text-accent px-2 py-0.5 rounded bg-accent/15 border border-accent/30">
      {c.comando}
    </span>,
    c.descricao,
    c.acao
  ]);

  // Tabela de peças
  const pecaHeaders = ['Componente', 'Qtd', 'Observação de Bancada'];
  const pecaRows = projeto.pecas.map((p) => [
    <strong key="item" className="text-ink">{p.item}</strong>,
    <span key="qtd" className="font-mono">{p.quantidade}</span>,
    p.obs || 'Padrão'
  ]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-12 space-y-8">
      {/* Top Bar com Navegação entre Projetos */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <Link
          to="/"
          className="text-ink-muted hover:text-ink flex items-center gap-1.5 font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar para os 10 Projetos
        </Link>

        <div className="flex items-center gap-2">
          {projAnterior && (
            <Link
              to={`/projeto/${projAnterior}`}
              className="px-2.5 py-1 rounded bg-bench-card border border-bench-border hover:bg-bench-elevated text-ink transition-colors"
            >
              ← #{String(projAnterior).padStart(2, '0')} Anterior
            </Link>
          )}
          {projProximo && (
            <Link
              to={`/projeto/${projProximo}`}
              className="px-2.5 py-1 rounded bg-bench-card border border-bench-border hover:bg-bench-elevated text-ink transition-colors"
            >
              Próximo #{String(projProximo).padStart(2, '0')} →
            </Link>
          )}
        </div>
      </div>

      {/* Cabeçalho do Projeto */}
      <div className="bg-bench-card border border-bench-border rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-accent/15 text-accent-text dark:text-accent border border-accent/30">
                PROJETO #{String(projeto.numero).padStart(2, '0')}
              </span>
              <LevelBadge level={projeto.nivel} />
              <span className="text-xs text-ink-muted">⏱ {projeto.tempoEstimado}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              {projeto.titulo}
            </h1>
            <p className="text-ink-muted text-sm sm:text-base leading-relaxed">
              {projeto.subtitulo}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <button
              onClick={toggleConcluido}
              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                isDone
                  ? 'bg-led/20 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'bg-bench-elevated border-bench-border text-ink-muted hover:text-ink hover:border-accent'
              }`}
            >
              {isDone ? (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Projeto Concluído
                </>
              ) : (
                <>
                  <span className="w-3 h-3 rounded-full border border-ink-muted"></span>
                  Marcar como concluído
                </>
              )}
            </button>
            <Link to="/simulador">
              <Button variant="secondary" size="sm" className="w-full text-xs">
                🎮 Testar no Simulador
              </Button>
            </Link>
          </div>
        </div>

        {/* Card de Objetivo */}
        <div className="p-3.5 rounded-xl bg-accent/10 border border-accent/25 text-xs sm:text-sm text-ink leading-relaxed">
          <strong className="text-accent-text dark:text-accent font-bold mr-1">🎯 Objetivo:</strong>
          {projeto.objetivo}
        </div>
      </div>

      {/* DIAGRAMA ELÉTRICO EM SVG COM DIVISOR DE TENSÃO */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-ink flex items-center gap-2">
            <span>📐</span> Diagrama de Ligação no Arduino
          </h2>
          <span className="text-xs text-ink-muted">Zoom por toque ou clique</span>
        </div>
        <Card className="p-2 sm:p-4 border-bench-border overflow-hidden">
          <BluetoothDividerDiagramSvg
            extraComponentLabel={projeto.pecas.find(p => !p.item.includes('Arduino') && !p.item.includes('Bluetooth'))?.item || 'Periférico'}
            extraPin={projeto.numero === 1 ? 'D13' : projeto.numero === 5 ? 'D8 (Buzzer) & D4 (Sensor)' : 'D4..D10'}
          />
        </Card>
      </div>

      {/* TABELA DE COMANDOS BLUETOOTH */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-ink flex items-center gap-2">
          <span>📲</span> Tabela de Comandos para o Celular
        </h2>
        <p className="text-xs sm:text-sm text-ink-muted">
          Envie os seguintes caracteres pelo aplicativo <em>Serial Bluetooth Terminal</em> no seu smartphone:
        </p>
        <ResponsiveTable headers={comandoHeaders} rows={comandoRows} />
      </div>

      {/* LISTA DE PEÇAS */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-ink flex items-center gap-2">
          <span>🧰</span> Peças Necessárias
        </h2>
        <ResponsiveTable headers={pecaHeaders} rows={pecaRows} />
      </div>

      {/* PASSO A PASSO DA MONTAGEM */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-ink flex items-center gap-2">
          <span>🪜</span> Passo a Passo da Montagem
        </h2>
        <div className="space-y-2.5">
          {projeto.passosMontagem.map((p, idx) => {
            const feito = passosFeitos.includes(idx);
            return (
              <div
                key={p.passo}
                onClick={() => togglePasso(idx)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  feito
                    ? 'bg-led/5 border-emerald-500/50'
                    : 'bg-bench-card border-bench-border hover:border-accent'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 border ${
                      feito
                        ? 'bg-led text-slate-950 border-emerald-400'
                        : 'bg-bench-elevated text-ink border-bench-border'
                    }`}
                  >
                    {feito ? '✓' : p.passo}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-ink">{p.titulo}</h3>
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                      {p.instrucao}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CÓDIGO FONTE COMPILÁVEL */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-ink flex items-center gap-2">
            <span>💻</span> Código Arduino Completo (SoftwareSerial)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-ink-muted">
          Código 100% testado na bancada e compilado sem erros. Deixa os pinos D0 e D1 livres para gravação USB sem conflitos.
        </p>
        <CodeBlock code={projeto.codigoFonte} title={`projeto_${String(projeto.numero).padStart(2, '0')}.ino`} />
      </div>

      {/* COMO PAREAR NO CELULAR */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-ink flex items-center gap-2">
          <span>📶</span> Como Parear e Enviar o Primeiro Comando
        </h2>
        <Card className="space-y-3">
          <ol className="space-y-2 text-xs sm:text-sm text-ink-muted list-decimal pl-5 leading-relaxed">
            {projeto.comoParear.map((passo, i) => (
              <li key={i} className="pl-1">{passo}</li>
            ))}
          </ol>
        </Card>
      </div>

      {/* SE NÃO RESPONDER: DIAGNÓSTICO */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-ink flex items-center gap-2">
          <span>🔍</span> Se Não Responder: 4 Verificações de Bancada
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {projeto.seNaoResponder.map((diag, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-bench-card border border-bench-border space-y-1.5">
              <span className="font-bold text-red-500 flex items-center gap-1.5">
                <span>⚠️</span> {diag.sintoma}
              </span>
              <p className="text-ink font-medium"><strong>Causa provável:</strong> {diag.causaProvavel}</p>
              <p className="text-ink-muted leading-relaxed"><strong>Como testar:</strong> {diag.comoTestar}</p>
            </div>
          ))}
        </div>
      </div>

      <AlertBox type="tip" title="Segurança da Bancada">
        Lembre-se: em projetos com motores ou servos (como o Carrinho ou a Cancela), <strong>nunca</strong> alimente a carga pelo pino 5V do Arduino. Use pilhas externas unindo apenas o fio terra (GND) com a placa.
      </AlertBox>
    </div>
  );
};
