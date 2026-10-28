import { Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { ProjetoDetalhe } from './pages/ProjetoDetalhe';
import { ComeceAquiPage } from './pages/ComeceAquiPage';
import { SimuladorTerminal } from './pages/SimuladorTerminal';
import { ChecklistPage } from './pages/ChecklistPage';
import { SobrePage } from './pages/SobrePage';
import { useLocalStorage } from './hooks/useLocalStorage';
import { PROJETOS_CELULAR } from './content/projetosCelular';

export default function App() {
  const [concluidos] = useLocalStorage<number[]>('projetos-celular-concluidos', []);
  const total = PROJETOS_CELULAR.length;

  return (
    <div data-app="arduino-celular" className="min-h-screen bg-bench text-ink flex flex-col transition-colors selection:bg-accent/20">
      <Navigation completedCount={concluidos.length} totalCount={total} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projeto/:numero" element={<ProjetoDetalhe />} />
          <Route path="/comece-aqui" element={<ComeceAquiPage />} />
          <Route path="/simulador" element={<SimuladorTerminal />} />
          <Route path="/checklist" element={<ChecklistPage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
