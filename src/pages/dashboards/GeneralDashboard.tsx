import React, { useState, useEffect, useMemo } from 'react';
import logoColegio from "../../assets/cologo.png";
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
  Flame,
  TrendingUp,
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
  <img src={logoColegio} alt="Logo del Colegio" className={className} />
);

const BannerTrophy: React.FC = () => (
  <div className="relative select-none pointer-events-none flex items-center justify-center shrink-0">
    <svg viewBox="0 0 200 200" className="w-36 h-36 md:w-44 md:h-44 drop-shadow-[0_12px_24px_rgba(245,158,11,0.35)]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="50" fill="#FBBF24" opacity="0.2" filter="blur(15px)" />
      {/* Confetti particles */}
      <circle cx="20" cy="50" r="3" fill="#3B82F6" className="animate-pulse" />
      <circle cx="175" cy="40" r="4.5" fill="#EC4899" />
      <rect x="35" y="85" width="7" height="4" rx="1.5" fill="#10B981" transform="rotate(18 35 85)" />

      {/* Pedestal base */}
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
const QuickAccessTrophySVG: React.FC = () => (
  <svg viewBox="0 0 120 120" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 shrink-0 transition-transform duration-300 hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M35 88H85V98H35V88Z" fill="#1E3A8A" />
    <path d="M42 80H78V88H42V80Z" fill="#2563EB" />
    <path d="M54 62H66V80H54V62Z" fill="#EAB308" />
    <path d="M38 26H82V54C82 66 70 78 60 78C50 78 38 66 38 54V26Z" fill="#F59E0B" />
  </svg>
);

const LEADERBOARD_SEASON = [
  { rank: 1, classroom: '10-01', points: '9.210 pts', isLeader: true },
  { rank: 2, classroom: '11-02', points: '8.980 pts' },
  { rank: 3, classroom: '10-02', points: '8.450 pts', isMe: true },
  { rank: 4, classroom: '09-01', points: '7.850 pts' },
  { rank: 5, classroom: '11-01', points: '7.120 pts' },
];

const LEADERBOARD_LEAGUE = [
  { rank: 1, classroom: '11-02', points: '48.200 pts', isLeader: true },
  { rank: 2, classroom: '09-01', points: '44.150 pts' },
  { rank: 3, classroom: '10-02', points: '41.300 pts', isMe: true },
  { rank: 4, classroom: '10-01', points: '38.900 pts' },
  { rank: 5, classroom: '11-01', points: '35.400 pts' },
];

export const GeneralDashboard: React.FC = () => {
  const navigate = useNavigate();

  // State Management
  const [activeTab, setActiveTab] = useState<'ranking' | 'inicio'>('ranking');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [rankingFilter, setRankingFilter] = useState<'season' | 'league'>('season');

  const [classrooms, setClassrooms] = useState<any[]>(() => {
    const stored = localStorage.getItem('school_classrooms');
    return stored ? JSON.parse(stored) : [
      { id: '10-02', name: '10-02 Los Invencibles', grade: '10°', director: 'Carlos Mendoza', points: 12700, approvedMissions: 40, rejectedMissions: 5, members: 28 },
      { id: '10-01', name: '10-01 Líderes', grade: '10°', director: 'Sofía Rincón', points: 9210, approvedMissions: 45, rejectedMissions: 3, members: 30 },
      { id: '09-01', name: '09-01 Exploradores', grade: '9°', director: 'Jorge Salazar', points: 7850, approvedMissions: 32, rejectedMissions: 8, members: 26 },
      { id: '11-02', name: '11-02 Los Imparables', grade: '11°', director: 'Marta Pérez', points: 8980, approvedMissions: 38, rejectedMissions: 2, members: 25 },
    ];
  });

  useEffect(() => {
    const loadSharedClassrooms = () => {
      const stored = localStorage.getItem('school_classrooms');
      if (stored) {
        try {
          setClassrooms(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    };
    loadSharedClassrooms();
    window.addEventListener('storage', loadSharedClassrooms);
    window.addEventListener('director_data_updated', loadSharedClassrooms);
    window.addEventListener('global_system_updated', loadSharedClassrooms);
    return () => {
      window.removeEventListener('storage', loadSharedClassrooms);
      window.removeEventListener('director_data_updated', loadSharedClassrooms);
      window.removeEventListener('global_system_updated', loadSharedClassrooms);
    };
  }, []);

  const sortedClassrooms = useMemo(() => {
    return [...classrooms].sort((a, b) => b.points - a.points);
  }, [classrooms]);

  const myClassroomIndex = useMemo(() => {
    const idx = sortedClassrooms.findIndex((c: any) => c.id === '10-02');
    return idx >= 0 ? idx + 1 : 1;
  }, [sortedClassrooms]);

  const leader = useMemo(() => sortedClassrooms[0], [sortedClassrooms]);
  const myClassroom = useMemo(() => classrooms.find((c: any) => c.id === '10-02'), [classrooms]);

  const pointsDiffWithLeader = useMemo(() => {
    if (!leader || !myClassroom) return 0;
    return leader.points - myClassroom.points;
  }, [leader, myClassroom]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    toast.success('Sesión cerrada con éxito');
    navigate({ to: '/login' });
  };

  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'ranking', label: 'Tabla de Liga', icon: Trophy },
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
                  if (item.id === 'inicio') {
                    // Redirect back to student panel
                    navigate({ to: '/dashboard/estudiante' as any });
                  } else {
                    setActiveTab(item.id);
                  }
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
              <h4 className="text-xs font-bold text-white truncate">10-02 Los Invencibles</h4>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-[11px] text-yellow-400 font-black">
                  {(myClassroom?.points ?? 12700).toLocaleString('es-CO')} pts
                </span>
              </div>
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
                Estadísticas y Tabla General de Liga
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <SchoolCrest className="w-8 h-8" />
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-slate-900">Colegio Mayor</p>
              <p className="text-[10px] font-semibold text-slate-400">Liga Superior</p>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 space-y-8 max-w-6xl mx-auto w-full overflow-y-auto">
          
          {/* TAB: RANKING */}
          {activeTab === 'ranking' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="text-left">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2 font-sans">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    Puestos Generales de Liga
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold">Toda la comunidad participando activamente</p>
                </div>
                
                <div className="flex bg-[#F1F5F9] p-1 rounded-xl">
                  <button
                    onClick={() => setRankingFilter('season')}
                    className={`px-4 py-2 text-xs font-extrabold rounded-lg transition-all ${
                      rankingFilter === 'season' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    Temporada 3
                  </button>
                  <button
                    onClick={() => setRankingFilter('league')}
                    className={`px-4 py-2 text-xs font-extrabold rounded-lg transition-all ${
                      rankingFilter === 'league' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    Liga General
                  </button>
                </div>
              </div>

              {/* KPIs de Posición */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
                <div className="p-4 bg-[#F8FAFC] border border-slate-100 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Posición de 10-02</span>
                  <p className="text-xl font-black text-slate-800">#{myClassroomIndex} Puesto</p>
                  <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                    <TrendingUp className="w-3.5 h-3.5" /> En tiempo real
                  </p>
                </div>

                <div className="p-4 bg-[#F8FAFC] border border-slate-100 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Diferencia con Líder</span>
                  <p className="text-xl font-black text-slate-800">
                    {pointsDiffWithLeader === 0 ? '¡Es el Líder!' : `-${pointsDiffWithLeader.toLocaleString('es-CO')} pts`}
                  </p>
                  <p className="text-[10px] text-slate-400 font-semibold">Frente a {leader?.name || 'Líder'}</p>
                </div>

                <div className="p-4 bg-[#F8FAFC] border border-slate-100 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Total Salones</span>
                  <p className="text-xl font-black text-slate-800">{classrooms.length} Salones</p>
                  <p className="text-[10px] text-indigo-600 font-bold">Liga Activa</p>
                </div>
              </div>

              {/* Leaderboard Table list */}
              <div className="space-y-3">
                {sortedClassrooms.map((item: any, index: number) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border ${
                      item.id === '10-02' ? 'bg-[#E8F0FE] border-blue-300' : 'bg-[#F8FAFC] border-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3 text-left">
                      <span className="w-7 h-7 rounded-full bg-slate-100 text-xs font-black flex items-center justify-center">
                        #{index + 1}
                      </span>
                      <h4 className="text-sm font-bold text-slate-800">Grado {item.name}</h4>
                    </div>
                    <span className="text-sm font-black text-slate-800">
                      {(rankingFilter === 'season' ? item.points : item.points + 10000).toLocaleString('es-CO')} pts
                    </span>
                  </div>
                ))}
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
