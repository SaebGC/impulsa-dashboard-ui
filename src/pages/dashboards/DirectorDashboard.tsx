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
  Crown,
  Award,
  CheckCircle2,
  Clock,
  Upload,
  Info,
  Sparkles,
  LogOut,
  CheckSquare,
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
      {/* Confetti particles */}
      <circle cx="20" cy="50" r="3" fill="#3B82F6" className="animate-pulse" />
      <circle cx="175" cy="40" r="4.5" fill="#EC4899" />
      <rect x="35" y="85" width="7" height="4" rx="1.5" fill="#10B981" transform="rotate(18 35 85)" />
      <rect x="165" y="95" width="5.5" height="5.5" rx="1.5" fill="#F59E0B" transform="rotate(45 165 95)" />
      <path d="M155 55 L161 61 L153 63 Z" fill="#8B5CF6" />

      {/* Pedestal base */}
      <path d="M60 148H140V163C140 165.2 138.2 167 136 167H64C61.8 167 60 165.2 60 163V148Z" fill="url(#pedestalGrad)" />
      <path d="M50 167H150V175C150 177.2 148.2 179 146 179H54C51.8 179 50 177.2 50 175V167Z" fill="#1e293b" />
      <path d="M100 152.5L102 156.5H106L102.8 158.7L104 162.7L100 160.5L96 162.7L97.2 158.7L94 156.5H98L100 152.5Z" fill="#F59E0B" />

      {/* Trophy Stem */}
      <path d="M92 115H108V148H92V115Z" fill="url(#goldGrad)" />
      <path d="M80 115H120V121H80V115Z" fill="url(#goldDarkGrad)" />

      {/* Trophy Cup */}
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
        <linearGradient id="goldDarkGrad" x1="80" y1="115" x2="120" y2="121" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D97706" />
          <stop offset="1" stopColor="#78350F" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

// Quick Access custom SVGs
const QuickAccessChecklistSVG: React.FC = () => (
  <svg viewBox="0 0 120 120" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 shrink-0 transition-transform duration-300 hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="25" y="20" width="70" height="80" rx="8" fill="white" stroke="#22C55E" strokeWidth="5" />
    <line x1="45" y1="40" x2="75" y2="40" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" />
    <line x1="45" y1="60" x2="75" y2="60" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" />
    <line x1="45" y1="80" x2="65" y2="80" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" />
    <circle cx="35" cy="40" r="4" fill="#22C55E" />
    <circle cx="35" cy="60" r="4" fill="#22C55E" />
    <circle cx="35" cy="80" r="4" fill="#22C55E" />
  </svg>
);

const QuickAccessShieldSVG: React.FC = () => (
  <svg viewBox="0 0 120 120" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 shrink-0 transition-transform duration-300 hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M60 15C88 15 98 22 98 46C98 72 78 94 60 105C42 94 22 72 22 46C22 22 32 15 60 15Z"
      fill="#2563EB"
      stroke="#93C5FD"
      strokeWidth="5"
    />
    <path
      d="M60 22C82 22 90 28 90 47C90 68 74 87 60 96C46 87 30 68 30 47C30 28 38 22 60 22Z"
      fill="#3B82F6"
    />
    <path
      d="M60 38L65 49H76.5L67.5 56.5L71 67.5L60 60.5L49 67.5L52.5 56.5L43.5 49H55L60 38Z"
      fill="#FBBF24"
    />
  </svg>
);

const QuickAccessTrophySVG: React.FC = () => (
  <svg viewBox="0 0 120 120" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 shrink-0 transition-transform duration-300 hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M35 88H85V98H35V88Z" fill="#1E3A8A" />
    <path d="M42 80H78V88H42V80Z" fill="#2563EB" />
    <path d="M54 62H66V80H54V62Z" fill="#EAB308" />
    <path d="M38 26H82V54C82 66 70 78 60 78C50 78 38 66 38 54V26Z" fill="#F59E0B" />
    <path d="M42 29H78V36H42V29Z" fill="#FBBF24" />
  </svg>
);

// Mock student submissions for this specific director
interface Submission {
  id: string;
  studentName: string;
  missionTitle: string;
  date: string;
  points: number;
}

const INITIAL_SUBMISSIONS: Submission[] = [
  { id: 'sub1', studentName: 'Juan Pérez', missionTitle: 'Guardianes del Agua', date: 'Hoy, 10:30 AM', points: 400 },
  { id: 'sub2', studentName: 'María Gómez', missionTitle: 'Aula Limpia Sorpresa', date: 'Ayer', points: 450 },
  { id: 'sub3', studentName: 'Diana Valderrama', missionTitle: 'Lectores Imparables', date: 'Hace 2 días', points: 1200 },
];

export const DirectorDashboard: React.FC = () => {
  const navigate = useNavigate();

  // State Management
  const [activeTab, setActiveTab] = useState<'inicio' | 'evidencias' | 'salon' | 'ranking' | 'historial'>('inicio');
  const [submissions, setSubmissions] = useState<Submission[]>(INITIAL_SUBMISSIONS);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [bannerIndex, setBannerIndex] = useState<number>(0);
  const [rankingFilter, setRankingFilter] = useState<'season' | 'league'>('season');

  const bannerSlides = [
    {
      tag: '📢 PANEL DE TUTORÍA',
      title: '¡Tu salón 10-02 está en 3er lugar de la temporada!',
      text: 'Ayuda a tus estudiantes a validar evidencias y subir en la liga.',
      buttonText: 'Ver evidencias pendientes >',
    },
    {
      tag: '🔥 COMPETENCIA INTERCURSOS',
      title: '¡10-01 lidera con 9.210 puntos esta semana!',
      text: 'Incentiva a tu clase a realizar la misión ambiental activa.',
      buttonText: 'Ver misiones activas >',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % bannerSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [bannerSlides.length]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    toast.success('Sesión cerrada con éxito');
    navigate({ to: '/login' });
  };

  const handleApprove = (id: string, name: string, mission: string, points: number) => {
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    toast.success(`Evidencia de ${name} aprobada`, {
      description: `Se han sumado +${points} puntos al salón 10-02.`,
    });
  };

  const handleReject = (id: string, name: string) => {
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    toast.error(`Evidencia de ${name} rechazada`, {
      description: 'Se ha notificado al estudiante para corregir la entrega.',
    });
  };

  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'evidencias', label: 'Revisar Evidencias', icon: CheckSquare },
    { id: 'salon', label: 'Mi salón', icon: Shield },
    { id: 'ranking', label: 'Ranking', icon: Trophy },
    { id: 'historial', label: 'Historial', icon: History },
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
                {item.id === 'evidencias' && submissions.length > 0 && (
                  <span className="ml-auto bg-[#EF4444] text-white font-extrabold text-[10px] px-1.5 py-0.5 rounded-full">
                    {submissions.length}
                  </span>
                )}
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

        {/* User Info (Bottom-most) */}
        <div className="p-4 border-t border-blue-900/30 bg-[#070B1E]">
          <div className="flex items-center gap-3">
            <SchoolCrest className="w-9 h-9" />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-white truncate">Carlos Mendoza</h4>
              <p className="text-[10px] text-slate-400 font-semibold truncate">Director de 10-02</p>
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
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                ¡Buenos días! Prof. Carlos
              </h1>
              <span className="text-lg animate-bounce">👋👋</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <SchoolCrest className="w-8 h-8" />
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-slate-900">Colegio Mayor</p>
              <p className="text-[10px] font-semibold text-slate-400">Director de Grupo</p>
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
                      {bannerSlides[bannerIndex].tag}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                      {bannerSlides[bannerIndex].title}
                    </h2>
                    <p className="text-xs sm:text-sm text-indigo-100 font-medium">
                      {bannerSlides[bannerIndex].text}
                    </p>
                    <button
                      onClick={() => setActiveTab(bannerIndex === 0 ? 'evidencias' : 'salon')}
                      className="px-5 py-2.5 bg-white text-indigo-700 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md"
                    >
                      {bannerSlides[bannerIndex].buttonText}
                    </button>
                  </div>
                  <BannerTrophy />
                </div>
              </section>

              {/* Quick Access */}
              <section className="space-y-4">
                <h3 className="text-lg font-black text-slate-900 tracking-tight text-left">Accesos rápidos de gestión</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="bg-[#EBF7EE] border border-green-200 rounded-3xl p-5 flex flex-col justify-between items-start text-left min-h-[160px] relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                    <div className="absolute top-2 right-2 opacity-80 group-hover:scale-105 transition-all">
                      <QuickAccessChecklistSVG />
                    </div>
                    <div className="relative z-10 max-w-[65%] space-y-1.5">
                      <h4 className="text-base font-black text-[#1E4D2B]">Revisar entregas</h4>
                      <p className="text-xs text-green-700/80 font-semibold leading-normal">
                        Hay {submissions.length} evidencias de tus estudiantes pendientes de validación.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('evidencias')}
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-[#22C55E] text-white transition-all group-hover:translate-x-1"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="bg-[#E8F0FE] border border-blue-200 rounded-3xl p-5 flex flex-col justify-between items-start text-left min-h-[160px] relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                    <div className="absolute top-2 right-2 opacity-80 group-hover:scale-105 transition-all">
                      <QuickAccessShieldSVG />
                    </div>
                    <div className="relative z-10 max-w-[65%] space-y-1.5">
                      <h4 className="text-base font-black text-[#1A4B8E]">Mi salón 10-02</h4>
                      <p className="text-xs text-blue-700/80 font-semibold leading-normal">
                        Consulta la historia, el puntaje y estadísticas de tu salón tutorado.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('salon')}
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
                      <h4 className="text-base font-black text-[#855B14]">Ranking de liga</h4>
                      <p className="text-xs text-yellow-800/80 font-semibold leading-normal">
                        Compara el puntaje de 10-02 frente a los otros grados académicos.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('ranking')}
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-[#EAB308] text-white transition-all group-hover:translate-x-1"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </section>

              {/* Activity Section */}
              <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-left">
                <h3 className="text-lg font-black text-[#0A0F24] mb-4">Última actividad del grupo 10-02</h3>
                <div className="space-y-3.5">
                  <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] border border-slate-100 rounded-2xl">
                    <div className="w-9 h-9 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-800">Se completó la misión: Lectores Imparables</p>
                      <p className="text-[10px] text-slate-400">Sumó +1.200 pts de temporada · Hace 32 min</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] border border-slate-100 rounded-2xl">
                    <div className="w-9 h-9 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-800">10-02 ascendió a la 3ª posición general</p>
                      <p className="text-[10px] text-slate-400">Puntaje total actualizado a 8.450 pts · Hace 2 horas</p>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* TAB 2: EVIDENCIAS */}
          {activeTab === 'evidencias' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <CheckSquare className="w-6 h-6 text-green-500" />
                  Revisión de Evidencias Presentadas (10-02)
                </h3>
                <p className="text-xs text-slate-400 font-semibold">Aprueba o rechaza evidencias de misiones subidas por tus alumnos</p>
              </div>

              {submissions.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-800">¡Todo al día!</h4>
                  <p className="text-xs text-slate-400 font-semibold">No hay evidencias pendientes por evaluar en tu salón.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 border border-slate-200/60 rounded-2xl overflow-hidden bg-[#F8FAFC]">
                  {submissions.map((sub) => (
                    <div key={sub.id} className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-colors hover:bg-slate-50">
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-800">{sub.studentName}</p>
                        <p className="text-xs text-slate-500 font-semibold">
                          Misión: <strong className="text-indigo-600 font-bold">{sub.missionTitle}</strong>
                        </p>
                        <p className="text-[10px] text-slate-400">Entregado: {sub.date}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleReject(sub.id, sub.studentName)}
                          className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold rounded-xl transition-all"
                        >
                          Rechazar
                        </button>
                        <button
                          onClick={() => handleApprove(sub.id, sub.studentName, sub.missionTitle, sub.points)}
                          className="px-3.5 py-1.5 bg-green-600 hover:bg-green-500 text-white text-xs font-bold rounded-xl transition-all"
                        >
                          Aprobar (+{sub.points} pts)
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* TAB 3: MI SALÓN */}
          {activeTab === 'salon' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Detalles del Salón Tutorado (10-02)</h3>
                <p className="text-xs text-slate-400 font-semibold">Monitorea el rendimiento del salón en la temporada</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-5 bg-[#F8FAFC] rounded-2xl border border-slate-100 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500">Puntaje Temporada 3</span>
                    <span className="text-xs font-bold text-yellow-600">8.450 pts</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-yellow-400 h-full rounded-full" style={{ width: '84.5%' }} />
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Puesto #3 a nivel institucional.</p>
                </div>

                <div className="p-5 bg-[#F8FAFC] rounded-2xl border border-slate-100 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500">Alumnos Activos</span>
                    <span className="text-xs font-bold text-blue-600">28 Estudiantes</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">100% de estudiantes han participado en alguna misión.</p>
                </div>
              </div>
            </section>
          )}

          {/* TAB 4: RANKING */}
          {activeTab === 'ranking' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="text-left">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    Puestos de Liga de Salón
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold">Tutor Carlos Mendoza · 10-02</p>
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

              <div className="space-y-3">
                {(rankingFilter === 'season' ? LEADERBOARD_SEASON : LEADERBOARD_LEAGUE).map((item) => (
                  <div
                    key={item.rank}
                    className={`flex items-center justify-between p-4 rounded-2xl border ${
                      item.isMe ? 'bg-[#E8F0FE] border-blue-300' : 'bg-[#F8FAFC] border-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3 text-left">
                      <span className="w-7 h-7 rounded-full bg-slate-100 text-xs font-black flex items-center justify-center">
                        #{item.rank}
                      </span>
                      <h4 className="text-sm font-bold text-slate-800">Grado {item.classroom}</h4>
                    </div>
                    <span className="text-sm font-black text-slate-800">{item.points}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TAB 5: HISTORIAL */}
          {activeTab === 'historial' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Historial de Validaciones</h3>
                <p className="text-xs text-slate-400 font-semibold font-sans">Misiones validadas o rechazadas históricamente por este tutor</p>
              </div>

              <div className="relative pl-6 border-l border-slate-100 space-y-8">
                <div className="relative">
                  <span className="absolute -left-[35px] top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white bg-emerald-50 text-emerald-500 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-800">Misión: Lectores Imparables Aprobada</h4>
                    <p className="text-[11px] text-slate-400 font-medium">Evaluador: Carlos Mendoza · Sumó +1200 pts a 10-02</p>
                    <p className="text-[10px] text-slate-400">Hace 32 min</p>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-[35px] top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white bg-rose-50 text-rose-500 shadow-sm">
                    <AlertCircle className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-800">Misión: Taller Estructura de Datos Rechazado</h4>
                    <p className="text-[11px] text-slate-400 font-medium">Evaluador: Carlos Mendoza · Notificación enviada a Daniel R.</p>
                    <p className="text-[10px] text-slate-400">Hace 4 horas</p>
                  </div>
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