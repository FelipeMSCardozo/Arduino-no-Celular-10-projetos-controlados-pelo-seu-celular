import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { LedIndicator } from './ui';

interface NavigationProps {
  completedCount?: number;
  totalCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({ completedCount = 0, totalCount = 10 }) => {
  const { theme, toggleTheme } = useTheme();

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 min-h-[44px] ${
      isActive
        ? 'bg-accent/15 text-accent-text dark:text-accent font-bold'
        : 'text-ink-muted hover:text-ink hover:bg-bench-elevated'
    }`;

  const mobileNavItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[11px] font-semibold transition-all min-h-[48px] min-w-[56px] ${
      isActive ? 'text-accent font-bold scale-105' : 'text-ink-muted hover:text-ink'
    }`;

  return (
    <>
      <header className="sticky top-0 z-40 bg-bench-card/90 backdrop-blur-md border-b border-bench-border px-4 lg:px-8 py-3 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-white dark:text-slate-950 font-bold shadow-sm shadow-accent/20 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg text-ink tracking-tight">
                  Arduino no Celular
                </span>
                <LedIndicator on={completedCount > 0} size="sm" />
              </div>
              <p className="text-[11px] text-ink-muted leading-none hidden sm:block">
                10 Projetos Prontos com Bluetooth
              </p>
            </div>
          </NavLink>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={navItemClass}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Projetos ({totalCount})
            </NavLink>
            <NavLink to="/comece-aqui" className={navItemClass}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Comece Aqui
            </NavLink>
            <NavLink to="/simulador" className={navItemClass}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Simulador
            </NavLink>
            <NavLink to="/checklist" className={navItemClass}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Checklist
            </NavLink>
            <NavLink to="/sobre" className={navItemClass}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ajuda
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-bench-elevated border border-bench-border text-xs">
              <span className="font-semibold text-ink">{completedCount}/{totalCount}</span>
              <span className="text-ink-muted">feitos</span>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Alternar modo claro e escuro"
              className="p-2.5 rounded-xl border border-bench-border bg-bench-elevated text-ink hover:border-accent transition-all min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Navegação inferior mobile */}
      <nav aria-label="Navegação móvel" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-bench-card/95 backdrop-blur-lg border-t border-bench-border px-2 py-1.5 flex items-center justify-around shadow-lg">
        <NavLink to="/" end className={mobileNavItemClass}>
          <svg className="w-5 h-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Projetos
        </NavLink>
        <NavLink to="/comece-aqui" className={mobileNavItemClass}>
          <svg className="w-5 h-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Comece Aqui
        </NavLink>
        <NavLink to="/simulador" className={mobileNavItemClass}>
          <svg className="w-5 h-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Simulador
        </NavLink>
        <NavLink to="/checklist" className={mobileNavItemClass}>
          <svg className="w-5 h-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Checklist
        </NavLink>
        <NavLink to="/sobre" className={mobileNavItemClass}>
          <svg className="w-5 h-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Ajuda
        </NavLink>
      </nav>
    </>
  );
};
