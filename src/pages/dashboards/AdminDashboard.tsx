import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  Home,
  Trophy,
  Shield,
  Target,
  History,
  Bell,
  ChevronRight,
  Menu,
  X,
  Star,
  Megaphone,
  BarChart3,
  Award,
  CheckCircle2,
  Clock,
  Upload,
  Info,
  Sparkles,
  LogOut,
  Settings,
  Layers,
  Users,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

// ==========================================
// CUSTOM VECTOR ARTWORK / SVGS (PREMIUM BRANDING)
// ==========================================

const ImpulsaLogo: React.FC = () => (
  <div className="flex items-center gap-3">
    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1e2e6e] border border-blue-400/30 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M19 5c0 0-4.5.5-8 4-2.8 2.8-3.5 6.5-3.5 6.5s-2-1-4 1c-2 2-1.5 6-1.5 6s4 .5 6-1.5c2-2 1-4 1-4s3.7-.7 6.5-3.5c3.5-3.5 4-8 4-8z"
          fill="url(#rocketGoldGrad)"
        />
        <path
          d="M4 20c.5-1.5 2-2.5 2.5-3m-4.5.5l1.5-1.5"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="rocketGoldGrad" x1="4" y1="5" x2="19" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE047" />
            <stop offset="0.5" stopColor="#F59E0B" />
            <stop offset="1" stopColor="#D97706" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <span className="text-xl font-black tracking-widest text-[#FFD700] select-none font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
      IMPULSA
    </span>
  </div>
);

const SchoolCrest: React.FC<{ className?: string }> = ({ className = "w-9 h-9" }) => (
  <svg className={className} viewBox="0 0 40 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 2C32 2 37 6 37 18C37 30 28 39 20 43C12 39 3 30 3 18C3 6 8 2 20 2Z"
      fill="#0f172a"
      stroke="url(#crestGoldBorder)"
      strokeWidth="2.5"
    />
    <path
      d="M20 5C29 5 33 8 33 18C33 27 26 35 20 39C14 35 7 27 7 18C7 8 11 5 20 5Z"
      fill="#1e293b"
    />
    <path
      d="M20 10L22.5 15.5H28.5L24 19L25.8 24.5L20 21L14.2 24.5L16 19L11.5 15.5H17.5L20 10Z"
      fill="url(#crestGoldInner)"
    />
    <path
      d="M13 28C16 31 24 31 27 28"
      stroke="url(#crestGoldInner)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient id="crestGoldBorder" x1="0" y1="0" x2="40" y2="45" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE047" />
        <stop offset="0.5" stopColor="#EAB308" />
        <stop offset="1" stopColor="#CA8A04" />
      </linearGradient>
      <linearGradient id="crestGoldInner" x1="11.5" y1="10" x2="28.5" y2="24.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE047" />
        <stop offset="1" stopColor="#CA8A04" />
      </linearGradient>
    </defs>
  </svg>
);

const BannerTrophy: React.FC = () => (
  <div className="relative select-none pointer-events-none flex items-center justify-center shrink-0">
    <svg viewBox="0 0 200 200" className="w-36 h-36 md:w-44 md:h-44 drop-shadow-[0_12px_24px_rgba(245,158,11,0.35)]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="50" fill="#FBBF24" opacity="0.2" filter="blur(15px)" />
      {/* Pedestal */}
      <path d="M60 148H140V163C140 165.2 138.2 167 136 167H64C61.8 167 60 165.2 60 163V148Z" fill="url(#pedestalGrad)" />
      <path d="M50 167H150V175C150 177.2 148.2 179 146 179H54C51.8 179 50 177.2 50 175V167Z" fill="#1e293b" />
      {/* Trophy Stem & Cup */}
      <path d="M92 115H108V148H92V115Z" fill="url(#goldGrad)" />
      <path d="M60 48H140V90C140 112 122 130 100 130C78 130 60 112 60 90V48Z" fill="url(#goldGrad)" />
      <text x="100" y="93" fill="#92400e" fontSize="38" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">1</text>
      
      <defs>
        <linearGradient id="pedestalGrad" x1="60" y1="148" x2="140" y2="167" gradientUnits="userSpaceOnUse">
          <stop stopColor="#334155" />
          <stop offset="1" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="60" y1="48" x2="140" y2="130" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE047" />
          <stop offset="0.3" stopColor="#FBBF24" />
          <stop offset="0.7" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

// Quick Access custom SVGs
const QuickAccessSettingsSVG: React.FC = () => (
  <svg viewBox="0 0 120 120" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 shrink-0 transition-transform duration-300 hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="45" fill="white" stroke="#22C55E" strokeWidth="5" />
    <circle cx="60" cy="60" r="18" fill="white" stroke="#22C55E" strokeWidth="5" />
    {/* Gear teeth */}
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 360) / 8;
      return (
        <rect
          key={i}
          x="55"
          y="20"
          width="10"
          height="16"
          rx="3"
          fill="#22C55E"
          transform={`rotate(${angle} 60 60)`}
        />
      );
    })}
  </svg>
);

const QuickAccessLayersSVG: React.FC = () => (
  <svg viewBox="0 0 120 120" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 shrink-0 transition-transform duration-300 hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 20L100 35L60 50L20 35L60 20Z" fill="white" stroke="#2563EB" strokeWidth="5" />
    <path d="M20 55L60 70L100 55" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
    <path d="M20 75L60 90L100 75" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

const QuickAccessTrophySVG: React.FC = () => (
  <svg viewBox="0 0 120 120" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 shrink-0 transition-transform duration-300 hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M35 88H85V98H35V88Z" fill="#1E3A8A" />
    <path d="M42 80H78V88H42V80Z" fill="#2563EB" />
    <path d="M54 62H66V80H54V62Z" fill="#EAB308" />
    <path d="M38 26H82V54C82 66 70 78 60 78C50 78 38 66 38 54V26Z" fill="#F59E0B" />
  </svg>
);

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  // State Management
  const [activeTab, setActiveTab] = useState<'inicio' | 'parametros' | 'salones' | 'reportes' | 'historial'>('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [pointsMultiplier, setPointsMultiplier] = useState<string>('1.0');
  const [seasonActive, setSeasonActive] = useState<boolean>(true);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    toast.success('Sesión cerrada con éxito');
    navigate({ to: '/login' });
  };

  const handleSaveParams = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Parámetros guardados', {
      description: `Multiplicador fijado en x${pointsMultiplier}. Estado de la Temporada: ${seasonActive ? 'Activo' : 'Cerrado'}.`,
    });
  };

  const handleRecalculate = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Recalculando puntos de todas las clases...',
        success: '¡Puntos recalculados con éxito!',
        error: 'Error en la sincronización.',
      }
    );
  };

  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'parametros', label: 'Config. Temporada', icon: Settings },
    { id: 'salones', label: 'Salones de Clase', icon: Layers },
    { id: 'reportes', label: 'Reportes y Liga', icon: Trophy },
    { id: 'historial', label: 'Historial Sistema', icon: History },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans relative overflow-x-hidden">
      
      {/* 1. SIDEBAR */}
      <aside
        className={`w-64 bg-[#0A0F24] text-white flex flex-col justify-between shrink-0 transition-transform duration-300 z-40
          fixed md:sticky top-0 h-screen
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-6 border-b border-blue-900/30 flex items-center justify-between">
          <ImpulsaLogo />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden p-1.5 rounded-lg bg-blue-950 text-blue-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-thin">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                  ${isActive
                    ? 'bg-[#1E3A8A] text-white shadow-lg shadow-blue-950/50'
                    : 'text-slate-400 hover:text-white hover:bg-blue-950/30'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#FFD700]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="px-4 py-2 border-t border-blue-900/30">
          <div className="bg-[#1E1145] border border-purple-500/30 rounded-xl p-4 text-center shadow-md">
            <div className="flex justify-center mb-2">
              <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
            </div>
            <h4 className="text-xs font-bold text-white">Temporada 3</h4>
            <p className="text-[11px] text-purple-300 font-medium">La Fuerza del Saber</p>
            <div className="mt-2.5 inline-block px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/20 text-[10px] text-purple-300 font-bold">
              Termina en 18 días
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-t border-blue-900/30 bg-[#070B1E]">
          <div className="flex items-center gap-3">
            <SchoolCrest className="w-9 h-9" />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-white truncate">Admin Principal</h4>
              <p className="text-[10px] text-slate-400 font-semibold truncate">Acceso Total</p>
            </div>
            <button onClick={handleLogout} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900/40">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {mobileMenuOpen && (
        <div onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-[#030712]/50 backdrop-blur-sm z-30 md:hidden" />
      )}

      {/* 2. MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 rounded-lg bg-slate-100 text-slate-700">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight font-sans">
                ¡Buenos días! Administrador
              </h1>
              <span className="text-lg animate-bounce">👋👋</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <SchoolCrest className="w-8 h-8" />
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-slate-900">Consola Central</p>
              <p className="text-[10px] font-semibold text-slate-400">Administrador Global</p>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 space-y-8 max-w-6xl mx-auto w-full overflow-y-auto">
          
          {/* TAB 1: INICIO */}
          {activeTab === 'inicio' && (
            <>
              {/* Banner */}
              <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-xl">
                <div className="p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                  <div className="space-y-4 text-left max-w-lg">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-[10px] sm:text-xs font-extrabold uppercase">
                      ⚙️ PARÁMETROS GLOBALES
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                      Configuración global de la Temporada 3
                    </h2>
                    <p className="text-xs sm:text-sm text-indigo-100 font-medium">
                      Administra las ligas activas, los salones y el multiplicador general de puntos.
                    </p>
                    <button
                      onClick={() => setActiveTab('parametros')}
                      className="px-5 py-2.5 bg-white text-indigo-700 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md"
                    >
                      Ajustar parámetros &gt;
                    </button>
                  </div>
                  <BannerTrophy />
                </div>
              </section>

              {/* KPIs Grid */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white border border-slate-200 p-5 rounded-2xl text-left space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-indigo-500">
                    <Users className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase text-slate-400">Usuarios</span>
                  </div>
                  <p className="text-2xl font-black text-slate-800">1.240</p>
                  <p className="text-[10px] text-slate-400 font-semibold">Alumnos y profesores</p>
                </div>

                <div className="bg-white border border-slate-200 p-5 rounded-2xl text-left space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-indigo-500">
                    <Layers className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase text-slate-400">Salones</span>
                  </div>
                  <p className="text-2xl font-black text-slate-800">32 Grupos</p>
                  <p className="text-[10px] text-slate-400 font-semibold">Cursos registrados</p>
                </div>

                <div className="bg-white border border-slate-200 p-5 rounded-2xl text-left space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-[#8B5CF6]">
                    <Star className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase text-slate-400">Temporada 3</span>
                  </div>
                  <p className="text-2xl font-black text-slate-800">Activa</p>
                  <p className="text-[10px] text-slate-400 font-semibold">Termina en 18 días</p>
                </div>

                <div className="bg-white border border-slate-200 p-5 rounded-2xl text-left space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-emerald-500">
                    <Settings className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase text-slate-400">Sistema</span>
                  </div>
                  <p className="text-2xl font-black text-slate-800">OK</p>
                  <p className="text-[10px] text-emerald-600 font-bold">Servicios activos</p>
                </div>
              </section>

              {/* Quick Access */}
              <section className="space-y-4">
                <h3 className="text-lg font-black text-slate-900 tracking-tight text-left">Accesos directos de administrador</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="bg-[#EBF7EE] border border-green-200 rounded-3xl p-5 flex flex-col justify-between items-start text-left min-h-[160px] relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                    <div className="absolute top-2 right-2 opacity-80 group-hover:scale-105 transition-all">
                      <QuickAccessSettingsSVG />
                    </div>
                    <div className="relative z-10 max-w-[65%] space-y-1.5">
                      <h4 className="text-base font-black text-[#1E4D2B]">Ajustar parámetros</h4>
                      <p className="text-xs text-green-700/80 font-semibold leading-normal">
                        Controla el multiplicador de puntos y fechas de cierre.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('parametros')}
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-[#22C55E] text-white transition-all group-hover:translate-x-1"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="bg-[#E8F0FE] border border-blue-200 rounded-3xl p-5 flex flex-col justify-between items-start text-left min-h-[160px] relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                    <div className="absolute top-2 right-2 opacity-80 group-hover:scale-105 transition-all">
                      <QuickAccessLayersSVG />
                    </div>
                    <div className="relative z-10 max-w-[65%] space-y-1.5">
                      <h4 className="text-base font-black text-[#1A4B8E]">Administrar salones</h4>
                      <p className="text-xs text-blue-700/80 font-semibold leading-normal">
                        Alta, baja y modificación de salones y ligas escolares.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('salones')}
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-[#3B82F6] text-white transition-all group-hover:translate-x-1"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="bg-[#FEF7E0] border border-yellow-200 rounded-3xl p-5 flex flex-col justify-between items-start text-left min-h-[160px] relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                    <div className="absolute top-2 right-2 opacity-80 group-hover:scale-105 transition-all">
                      <QuickAccessTrophySVG />
                    </div>
                    <div className="relative z-10 max-w-[65%] space-y-1.5">
                      <h4 className="text-base font-black text-[#855B14]">Estadísticas liga</h4>
                      <p className="text-xs text-yellow-800/80 font-semibold leading-normal">
                        Visualiza los reportes consolidados y auditorías de puntos.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('reportes')}
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-[#EAB308] text-white transition-all group-hover:translate-x-1"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* TAB 2: PARÁMETROS */}
          {activeTab === 'parametros' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left max-w-xl mx-auto">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Settings className="w-6 h-6 text-indigo-500" />
                  Consola de Parámetros de Temporada
                </h3>
                <p className="text-xs text-slate-400 font-semibold">Establece multiplicadores y reglas globales de la plataforma</p>
              </div>

              <form onSubmit={handleSaveParams} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Multiplicador global de puntos</label>
                  <select
                    value={pointsMultiplier}
                    onChange={(e) => setPointsMultiplier(e.target.value)}
                    className="w-full p-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-slate-800"
                  >
                    <option value="1.0">x1.0 (Predeterminado)</option>
                    <option value="1.5">x1.5 (Bono de Fin de Semana)</option>
                    <option value="2.0">x2.0 (Doble Puntos Especial)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#F8FAFC] border border-slate-100 rounded-xl">
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-800">Estado de la Temporada 3</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Toggles automáticos de la liga</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={seasonActive}
                    onChange={(e) => setSeasonActive(e.target.checked)}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={handleRecalculate}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
                  >
                    Recalcular Puntos
                  </button>
                  
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all shadow-md"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* TAB 3: SALONES */}
          {activeTab === 'salones' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Layers className="w-6 h-6 text-blue-500" />
                  Salones Registrados (Colegio Mayor)
                </h3>
                <p className="text-xs text-slate-400 font-semibold font-sans">Administra los grupos que participan de la temporada</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: '10-02 Los Invencibles', tutor: 'Carlos Mendoza', pts: '8.450 pts', members: 28 },
                  { name: '10-01 Líderes', tutor: 'Sofía Rincón', pts: '9.210 pts', members: 30 },
                  { name: '09-01 Exploradores', tutor: 'Jorge Salazar', pts: '7.850 pts', members: 26 },
                  { name: '11-02 Los Imparables', tutor: 'Marta Pérez', pts: '8.980 pts', members: 25 },
                ].map((classroom, idx) => (
                  <div key={idx} className="p-4 bg-[#F8FAFC] border border-slate-100 rounded-2xl shadow-sm hover:border-slate-200 transition-colors flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-black text-slate-800">{classroom.name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold">Tutor: {classroom.tutor} · Alumnos: {classroom.members}</p>
                    </div>
                    <span className="text-xs font-black text-indigo-600">{classroom.pts}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TAB 4: REPORTES */}
          {activeTab === 'reportes' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Reportes Consolidados</h3>
                <p className="text-xs text-slate-400 font-semibold">Auditoría global de puntos de liga y actividad</p>
              </div>

              <div className="p-5 bg-[#EEF2F6] rounded-2xl border border-slate-200/50 space-y-2">
                <h4 className="text-xs font-bold text-slate-700">Resumen Semanal</h4>
                <ul className="text-xs space-y-2 text-slate-600">
                  <li className="flex justify-between">
                    <span>Misiones resueltas en total:</span> <strong className="text-slate-800">142 entregas</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Puntos totales otorgados:</span> <strong className="text-slate-800">48.900 Pts</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Grado con más participación:</span> <strong className="text-indigo-600">10-02 Los Invencibles</strong>
                  </li>
                </ul>
              </div>
            </section>
          )}

          {/* TAB 5: HISTORIAL */}
          {activeTab === 'historial' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Historial de Logs del Sistema</h3>
                <p className="text-xs text-slate-400 font-semibold font-sans">Bitácora de auditoría y operaciones administrativas</p>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden bg-[#F8FAFC]">
                <div className="p-3 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-slate-800">Multiplicador de liga cambiado a x1.5</p>
                    <p className="text-[10px] text-slate-400">Actor: Admin Principal</p>
                  </div>
                  <span className="text-[10px] text-slate-400">Hace 2 horas</span>
                </div>
                <div className="p-3 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-slate-800">Inicio de la Temporada 3 habilitado</p>
                    <p className="text-[10px] text-slate-400">Actor: Admin Principal</p>
                  </div>
                  <span className="text-[10px] text-slate-400">Hace 1 semana</span>
                </div>
              </div>
            </section>
          )}

        </main>

        <footer className="bg-white border-t border-slate-200 py-6 text-center shrink-0">
          <p className="text-xs sm:text-sm text-slate-500 font-semibold">
            Impulsa lo mejor de ti. Impulsa a tu salón. ❤️🚀
          </p>
        </footer>
      </div>

    </div>
  );
};