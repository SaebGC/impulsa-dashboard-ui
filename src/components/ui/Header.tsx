import React from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { LogOut, Rocket, LayoutDashboard, BarChart3 } from 'lucide-react';

interface HeaderProps {
  title: string;
  roleLabel: string;
}

export const Header: React.FC<HeaderProps> = ({ title, roleLabel }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate({ to: '/login' });
  };

  const getRolePath = (role: string) => {
    switch (role) {
      case 'Director de Grupo':
        return '/dashboard/director';
      case 'Docente':
        return '/dashboard/docente';
      case 'Administrador':
        return '/dashboard/admin';
      default:
        return '/dashboard/estudiante';
    }
  };

  const myRolePath = getRolePath(roleLabel);
  const isGeneralActive = location.pathname === '/dashboard/general';
  const isMyPanelActive = location.pathname === myRolePath;

  return (
    <header className="bg-slate-900 border-b border-indigo-900/50 px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-slate-100 shadow-md">
      <div className="flex items-center justify-between md:justify-start gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-xl shadow-md shadow-indigo-600/30">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wide text-white">IMPULSA</h1>
            <p className="text-[11px] text-indigo-400 font-semibold">{roleLabel}</p>
          </div>
        </div>

        {/* Pestañas de Navegación (Mobile + Desktop) */}
        <nav className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => navigate({ to: myRolePath as any })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isMyPanelActive
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Mi Panel</span>
          </button>

          <button
            onClick={() => navigate({ to: '/dashboard/general' as any })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isGeneralActive
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Estadísticas y Liga</span>
          </button>
        </nav>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 border-slate-800 pt-2 md:pt-0">
        <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">{title}</span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-400 border border-slate-700 hover:border-rose-800/50 rounded-xl text-xs font-semibold transition-all duration-200 ml-auto md:ml-0"
        >
          <LogOut className="w-3.5 h-3.5" />
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
};