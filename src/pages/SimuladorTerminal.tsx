import React, { useState } from 'react';
import { Button, AlertBox } from '../components/ui';

interface LogMsg {
  hora: string;
  tipo: 'tx' | 'rx';
  texto: string;
}

export const SimuladorTerminal: React.FC = () => {
  const [projetoSimulado, setProjetoSimulado] = useState<'led' | 'semaforo' | 'rgb' | 'dimmer' | 'servo' | 'carrinho'>('led');
  const [inputComando, setInputComando] = useState('');
  const [logs, setLogs] = useState<LogMsg[]>([
    { hora: '10:00:00', tipo: 'rx', texto: 'Bluetooth conectado! Aguardando comandos...' }
  ]);

  // Estados dos componentes simulados
  const [ledLigado, setLedLigado] = useState(false);
  const [corSemaforo, setCorSemaforo] = useState<'verde' | 'amarelo' | 'vermelho'>('vermelho');
  const [corRgb, setCorRgb] = useState<'#000' | '#EF4444' | '#22C55E' | '#3B82F6' | '#F59E0B' | '#FFFFFF'>('#000');
  const [dimmerNivel, setDimmerNivel] = useState(0); // 0 a 9
  const [servoAngulo, setServoAngulo] = useState(0); // 0 ou 90
  const [carrinhoDirecao, setCarrinhoDirecao] = useState<'PARADO' | 'FRENTE' | 'RÉ' | 'ESQUERDA' | 'DIREITA'>('PARADO');

  const addLog = (tipo: 'tx' | 'rx', texto: string) => {
    const hora = new Date().toLocaleTimeString('pt-BR');
    setLogs((prev) => [...prev, { hora, tipo, texto }]);
  };

  const processarComando = (cmd: string) => {
    const limpo = cmd.trim();
    if (!limpo) return;

    addLog('tx', limpo);

    if (projetoSimulado === 'led') {
      if (limpo === '1') {
        setLedLigado(true);
        setTimeout(() => addLog('rx', 'LED ACESO'), 60);
      } else if (limpo === '0') {
        setLedLigado(false);
        setTimeout(() => addLog('rx', 'LED APAGADO'), 60);
      } else {
        setTimeout(() => addLog('rx', 'Comando desconhecido. Envie 1 ou 0.'), 60);
      }
    } else if (projetoSimulado === 'semaforo') {
      const c = limpo.toUpperCase();
      if (c === 'V') {
        setCorSemaforo('verde');
        setTimeout(() => addLog('rx', 'Sinal: VERDE'), 60);
      } else if (c === 'A') {
        setCorSemaforo('amarelo');
        setTimeout(() => addLog('rx', 'Sinal: AMARELO'), 60);
      } else if (c === 'R') {
        setCorSemaforo('vermelho');
        setTimeout(() => addLog('rx', 'Sinal: VERMELHO'), 60);
      } else if (c === 'C') {
        setTimeout(() => addLog('rx', 'Modo: AUTOMÁTICO INICIADO'), 60);
      }
    } else if (projetoSimulado === 'rgb') {
      const c = limpo.toUpperCase();
      if (c === 'R') { setCorRgb('#EF4444'); setTimeout(() => addLog('rx', 'Cor: VERMELHO'), 60); }
      else if (c === 'G') { setCorRgb('#22C55E'); setTimeout(() => addLog('rx', 'Cor: VERDE'), 60); }
      else if (c === 'B') { setCorRgb('#3B82F6'); setTimeout(() => addLog('rx', 'Cor: AZUL'), 60); }
      else if (c === 'Y') { setCorRgb('#F59E0B'); setTimeout(() => addLog('rx', 'Cor: AMARELO'), 60); }
      else if (c === 'W') { setCorRgb('#FFFFFF'); setTimeout(() => addLog('rx', 'Cor: BRANCO'), 60); }
      else if (c === '0') { setCorRgb('#000'); setTimeout(() => addLog('rx', 'Cor: APAGADO'), 60); }
    } else if (projetoSimulado === 'dimmer') {
      const n = parseInt(limpo, 10);
      if (!isNaN(n) && n >= 0 && n <= 9) {
        setDimmerNivel(n);
        setTimeout(() => addLog('rx', `Brilho ajustado para: ${n * 11}%`), 60);
      }
    } else if (projetoSimulado === 'servo') {
      const c = limpo.toUpperCase();
      if (c === 'A') { setServoAngulo(90); setTimeout(() => addLog('rx', 'PORTA / CANCELA: ABERTA (90°)'), 60); }
      else if (c === 'F') { setServoAngulo(0); setTimeout(() => addLog('rx', 'PORTA / CANCELA: FECHADA (0°)'), 60); }
    } else if (projetoSimulado === 'carrinho') {
      const c = limpo.toUpperCase();
      if (c === 'F') { setCarrinhoDirecao('FRENTE'); setTimeout(() => addLog('rx', 'MOVIMENTO: FRENTE'), 60); }
      else if (c === 'T') { setCarrinhoDirecao('RÉ'); setTimeout(() => addLog('rx', 'MOVIMENTO: RÉ'), 60); }
      else if (c === 'E') { setCarrinhoDirecao('ESQUERDA'); setTimeout(() => addLog('rx', 'MOVIMENTO: ESQUERDA'), 60); }
      else if (c === 'D') { setCarrinhoDirecao('DIREITA'); setTimeout(() => addLog('rx', 'MOVIMENTO: DIREITA'), 60); }
      else if (c === 'P' || c === 'S') { setCarrinhoDirecao('PARADO'); setTimeout(() => addLog('rx', 'MOVIMENTO: PARADO'), 60); }
    }

    setInputComando('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-24 md:pb-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent-text dark:text-accent text-xs font-semibold uppercase tracking-wider">
          <span>🎮</span> Laboratório Virtual
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-ink tracking-tight">
          Simulador de Terminal Bluetooth
        </h1>
        <p className="text-ink-muted text-sm sm:text-base">
          Entenda o protocolo serial antes de ligar na bancada. Envie comandos como se estivesse no app do celular e veja o circuito virtual reagir em tempo real.
        </p>
      </div>

      {/* Seletor de Projeto Simulado */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-bench-border overflow-x-auto text-xs">
        <span className="font-semibold text-ink mr-1">Simular:</span>
        {[
          { id: 'led', label: 'Proj 01: LED' },
          { id: 'semaforo', label: 'Proj 02: Semáforo' },
          { id: 'rgb', label: 'Proj 03: LED RGB' },
          { id: 'dimmer', label: 'Proj 04: Dimmer' },
          { id: 'servo', label: 'Proj 08: Servo Cancela' },
          { id: 'carrinho', label: 'Proj 10: Carrinho Robô' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setProjetoSimulado(item.id as 'led' | 'semaforo' | 'rgb' | 'dimmer' | 'servo' | 'carrinho');
              setLogs([
                { hora: new Date().toLocaleTimeString('pt-BR'), tipo: 'rx', texto: `Simulador iniciado para ${item.label}` }
              ]);
            }}
            className={`px-3 py-2 rounded-xl font-semibold transition-colors ${
              projetoSimulado === item.id
                ? 'bg-accent text-white dark:text-slate-950 shadow-sm'
                : 'bg-bench-card border border-bench-border text-ink-muted hover:text-ink hover:bg-bench-elevated'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Grid Principal: Hardware Visualizado (Esq) vs Terminal App (Dir) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Painel do Hardware Simulado (7 colunas) */}
        <div className="lg:col-span-6 bg-bench-card border border-bench-border rounded-2xl p-6 flex flex-col items-center justify-center min-h-[360px] text-center space-y-4 shadow-lg">
          <div className="text-xs font-mono font-bold text-accent uppercase tracking-wider">
            Bancada Virtual do Arduino
          </div>

          {/* SIMULAÇÃO LED */}
          {projetoSimulado === 'led' && (
            <div className="space-y-4 py-6">
              <div
                className={`w-28 h-28 rounded-full mx-auto flex items-center justify-center transition-all duration-300 ${
                  ledLigado
                    ? 'bg-emerald-500 shadow-[0_0_50px_rgba(34,197,94,0.8)] border-4 border-emerald-300 scale-105'
                    : 'bg-emerald-950/40 border-4 border-slate-700 opacity-60'
                }`}
              >
                <span className="text-3xl font-black text-white">
                  {ledLigado ? '💡' : '🌑'}
                </span>
              </div>
              <div>
                <p className="font-bold text-lg text-ink">
                  LED no Pino 13: {ledLigado ? 'ACESO (HIGH / 5V)' : 'APAGADO (LOW / 0V)'}
                </p>
                <p className="text-xs text-ink-muted">Envie "1" para ligar ou "0" para desligar</p>
              </div>
            </div>
          )}

          {/* SIMULAÇÃO SEMÁFORO */}
          {projetoSimulado === 'semaforo' && (
            <div className="space-y-4 py-4">
              <div className="w-24 bg-slate-900 border-4 border-slate-700 rounded-3xl p-3 flex flex-col gap-3 mx-auto shadow-xl">
                <div className={`w-14 h-14 rounded-full mx-auto transition-all ${corSemaforo === 'vermelho' ? 'bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.9)]' : 'bg-red-950/40 opacity-40'}`} />
                <div className={`w-14 h-14 rounded-full mx-auto transition-all ${corSemaforo === 'amarelo' ? 'bg-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.9)]' : 'bg-amber-950/40 opacity-40'}`} />
                <div className={`w-14 h-14 rounded-full mx-auto transition-all ${corSemaforo === 'verde' ? 'bg-emerald-500 shadow-[0_0_30px_rgba(34,197,94,0.9)]' : 'bg-emerald-950/40 opacity-40'}`} />
              </div>
              <p className="font-bold text-ink uppercase tracking-wide">
                Fase Ativa: <span className="text-accent">{corSemaforo}</span>
              </p>
            </div>
          )}

          {/* SIMULAÇÃO RGB */}
          {projetoSimulado === 'rgb' && (
            <div className="space-y-4 py-6">
              <div
                className="w-28 h-28 rounded-full mx-auto flex items-center justify-center transition-all duration-300 border-4 border-slate-600 shadow-xl"
                style={{
                  backgroundColor: corRgb === '#000' ? '#1F2937' : corRgb,
                  boxShadow: corRgb === '#000' ? 'none' : `0 0 50px ${corRgb}`
                }}
              >
                <span className="text-xs font-mono font-bold text-slate-950 bg-white/70 px-2 py-0.5 rounded">
                  RGB
                </span>
              </div>
              <p className="font-bold text-ink">
                Cor: {corRgb === '#000' ? 'APAGADO' : corRgb}
              </p>
            </div>
          )}

          {/* SIMULAÇÃO DIMMER */}
          {projetoSimulado === 'dimmer' && (
            <div className="space-y-4 py-6 w-full max-w-xs mx-auto">
              <div
                className="w-24 h-24 rounded-full mx-auto flex items-center justify-center transition-all duration-200 border-4 border-slate-700 bg-amber-400"
                style={{
                  opacity: Math.max(0.15, dimmerNivel / 9),
                  boxShadow: `0 0 ${dimmerNivel * 6}px rgba(245, 158, 11, ${dimmerNivel / 9})`
                }}
              />
              <div className="space-y-1">
                <p className="font-bold text-lg text-ink">Nível PWM: {dimmerNivel} de 9 ({Math.round(dimmerNivel * 11.1)}%)</p>
                <p className="text-xs text-ink-muted">Digite qualquer número de 0 a 9 no terminal</p>
              </div>
            </div>
          )}

          {/* SIMULAÇÃO SERVO CANCELA */}
          {projetoSimulado === 'servo' && (
            <div className="space-y-4 py-4">
              <div className="w-48 h-36 bg-slate-900 border border-slate-700 rounded-2xl relative flex items-end justify-center p-4 mx-auto overflow-hidden">
                {/* Base do motor */}
                <div className="w-16 h-12 bg-blue-600 rounded-lg relative z-10 flex items-center justify-center text-[10px] font-bold text-white">
                  SERVO 9G
                </div>
                {/* Braço da cancela rotacionando */}
                <div
                  className="w-28 h-3 bg-amber-400 border border-slate-900 rounded-full absolute origin-bottom-left transition-transform duration-500 ease-out z-20"
                  style={{
                    bottom: '22px',
                    left: '50%',
                    transform: `rotate(-${servoAngulo}deg)`
                  }}
                />
              </div>
              <p className="font-bold text-ink">
                Cancela: {servoAngulo === 90 ? 'ABERTA (90°)' : 'FECHADA (0°)'}
              </p>
            </div>
          )}

          {/* SIMULAÇÃO CARRINHO */}
          {projetoSimulado === 'carrinho' && (
            <div className="space-y-4 py-4">
              <div className="w-48 h-40 bg-slate-800 border-2 border-slate-600 rounded-3xl relative mx-auto p-4 flex flex-col justify-between shadow-2xl">
                {/* Rodas laterais */}
                <div className="w-4 h-12 bg-slate-950 border border-slate-700 rounded-md absolute -left-2 top-4"></div>
                <div className="w-4 h-12 bg-slate-950 border border-slate-700 rounded-md absolute -right-2 top-4"></div>
                <div className="w-4 h-12 bg-slate-950 border border-slate-700 rounded-md absolute -left-2 bottom-4"></div>
                <div className="w-4 h-12 bg-slate-950 border border-slate-700 rounded-md absolute -right-2 bottom-4"></div>

                <div className="text-center font-mono text-[10px] text-accent font-bold">CHASSI 2WD</div>
                <div className="text-3xl text-center">
                  {carrinhoDirecao === 'FRENTE' && '⬆️'}
                  {carrinhoDirecao === 'RÉ' && '⬇️'}
                  {carrinhoDirecao === 'ESQUERDA' && '⬅️'}
                  {carrinhoDirecao === 'DIREITA' && '➡️'}
                  {carrinhoDirecao === 'PARADO' && '🛑'}
                </div>
                <div className="text-center font-mono font-bold text-xs text-white">
                  {carrinhoDirecao}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Lado Direito: Terminal do App Serial Bluetooth Terminal (6 colunas) */}
        <div className="lg:col-span-6 bg-[#0B0F17] border border-bench-border rounded-2xl overflow-hidden shadow-xl flex flex-col h-[460px]">
          {/* Header do App */}
          <div className="bg-[#161B26] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-led animate-pulse"></span>
              <span className="font-mono text-xs font-bold text-slate-200">
                HC-05 [Conectado 9600 baud]
              </span>
            </div>
            <button
              onClick={() => setLogs([])}
              className="text-[11px] text-slate-400 hover:text-white transition-colors"
            >
              Limpar tela
            </button>
          </div>

          {/* Log de Conversa Serial */}
          <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-2 select-text">
            {logs.map((l, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 ${
                  l.tipo === 'tx' ? 'text-accent justify-end' : 'text-emerald-400'
                }`}
              >
                <span className="text-[10px] text-slate-500 font-normal">[{l.hora}]</span>
                <span className="font-bold">{l.tipo === 'tx' ? '>' : '<'}</span>
                <span className="bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                  {l.texto}
                </span>
              </div>
            ))}
          </div>

          {/* Botões Macros Rápidos */}
          <div className="p-2 bg-[#121620] border-t border-slate-800 flex flex-wrap gap-1.5 text-xs font-mono">
            {projetoSimulado === 'led' && (
              <>
                <button onClick={() => processarComando('1')} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded">
                  [1] Ligar
                </button>
                <button onClick={() => processarComando('0')} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded">
                  [0] Desligar
                </button>
              </>
            )}
            {projetoSimulado === 'semaforo' && (
              <>
                <button onClick={() => processarComando('V')} className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded">V: Verde</button>
                <button onClick={() => processarComando('A')} className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded">A: Amarelo</button>
                <button onClick={() => processarComando('R')} className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-red-400 rounded">R: Vermelho</button>
                <button onClick={() => processarComando('C')} className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded">C: Ciclo</button>
              </>
            )}
            {projetoSimulado === 'carrinho' && (
              <>
                <button onClick={() => processarComando('F')} className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded">F: Frente</button>
                <button onClick={() => processarComando('T')} className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded">T: Ré</button>
                <button onClick={() => processarComando('E')} className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded">E: Esq</button>
                <button onClick={() => processarComando('D')} className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded">D: Dir</button>
                <button onClick={() => processarComando('P')} className="px-2 py-1 bg-red-900 hover:bg-red-800 text-white rounded">P: Parar</button>
              </>
            )}
            {projetoSimulado === 'servo' && (
              <>
                <button onClick={() => processarComando('A')} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded">A: Abrir</button>
                <button onClick={() => processarComando('F')} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-red-400 rounded">F: Fechar</button>
              </>
            )}
            {projetoSimulado === 'dimmer' && (
              <>
                <button onClick={() => processarComando('0')} className="px-2 py-1 bg-slate-800 text-white rounded">0%</button>
                <button onClick={() => processarComando('3')} className="px-2 py-1 bg-slate-800 text-white rounded">30%</button>
                <button onClick={() => processarComando('5')} className="px-2 py-1 bg-slate-800 text-white rounded">50%</button>
                <button onClick={() => processarComando('9')} className="px-2 py-1 bg-slate-800 text-white rounded">100%</button>
              </>
            )}
          </div>

          {/* Campo de Envio de Texto */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              processarComando(inputComando);
            }}
            className="p-3 bg-[#161B26] border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputComando}
              onChange={(e) => setInputComando(e.target.value)}
              placeholder="Digite o comando (ex: 1, 0, V, F)..."
              className="flex-1 bg-[#0B0F17] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 font-mono focus:outline-none focus:border-accent"
            />
            <Button variant="primary" size="sm" type="submit" className="text-xs">
              Enviar
            </Button>
          </form>
        </div>
      </div>

      <AlertBox type="tip" title="Como reproduzir no seu celular real">
        No aplicativo <em>Serial Bluetooth Terminal</em> do Android, você pode programar os botões <strong>M1, M2, M3</strong> na parte inferior com esses mesmos caracteres para não precisar ficar digitando toda vez.
      </AlertBox>
    </div>
  );
};
