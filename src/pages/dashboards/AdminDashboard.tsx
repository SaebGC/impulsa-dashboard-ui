import React, { useState, useEffect } from 'react';
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
  Settings,
  Layers,
  Users,
  AlertCircle,
  Plus,
  Trash2,
  Send
} from 'lucide-react';
import { toast } from 'sonner';

// ==========================================
// TYPES DEFINITION
// ==========================================
export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'alta' | 'media' | 'baja';
  author: string;
}

export interface ClassroomData {
  id: string;
  name: string;
  grade: string;
  director: string;
  points: number;
  approvedMissions: number;
  rejectedMissions: number;
  members: number;
}

const INITIAL_CLASSROOMS: ClassroomData[] = [
  { id: '10-02', name: '10-02 Los Invencibles', grade: '10°', director: 'Carlos Mendoza', points: 12700, approvedMissions: 40, rejectedMissions: 5, members: 28 },
  { id: '10-01', name: '10-01 Líderes', grade: '10°', director: 'Sofía Rincón', points: 9210, approvedMissions: 45, rejectedMissions: 3, members: 30 },
  { id: '09-01', name: '09-01 Exploradores', grade: '9°', director: 'Jorge Salazar', points: 7850, approvedMissions: 32, rejectedMissions: 8, members: 26 },
  { id: '11-02', name: '11-02 Los Imparables', grade: '11°', director: 'Marta Pérez', points: 8980, approvedMissions: 38, rejectedMissions: 2, members: 25 },
];

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
      <path d="M60 148H140V163C140 165.2 138.2 167 136 167H64C61.8 167 60 165.2 60 163V148Z" fill="url(#pedestalGrad)" />
      <path d="M50 167H150V175C150 177.2 148.2 179 146 179H54C51.8 179 50 177.2 50 175V167Z" fill="#1e293b" />
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

const QuickAccessSettingsSVG: React.FC = () => (
  <svg viewBox="0 0 120 120" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 shrink-0 transition-transform duration-300 hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="45" fill="white" stroke="#22C55E" strokeWidth="5" />
    <circle cx="60" cy="60" r="18" fill="white" stroke="#22C55E" strokeWidth="5" />
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 360) / 8;
      return <rect key={i} x="55" y="20" width="10" height="16" rx="3" fill="#22C55E" transform={`rotate(${angle} 60 60)`} />;
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

const QuickAccessMegaphoneSVG: React.FC = () => (
  <svg viewBox="0 0 120 120" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 shrink-0 transition-transform duration-300 hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="45" fill="white" stroke="#EC4899" strokeWidth="5" />
    <path d="M40 50L70 35V85L40 70H30V50H40Z" fill="#EC4899" />
    <path d="M78 48C82 52 82 68 78 72" stroke="#EC4899" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'inicio' | 'anuncios' | 'parametros' | 'salones' | 'reportes' | 'historial'>('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [pointsMultiplier, setPointsMultiplier] = useState<string>('1.0');
  const [seasonActive, setSeasonActive] = useState<boolean>(true);

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementContent, setAnnouncementContent] = useState('');
  const [announcementPriority, setAnnouncementPriority] = useState<'alta' | 'media' | 'baja'>('media');

  const [classrooms, setClassrooms] = useState<ClassroomData[]>([]);

  const loadClassroomsData = () => {
    const stored = localStorage.getItem('school_classrooms');
    if (stored) {
      try {
        setClassrooms(JSON.parse(stored));
      } catch (e) {
        setClassrooms(INITIAL_CLASSROOMS);
      }
    } else {
      setClassrooms(INITIAL_CLASSROOMS);
      localStorage.setItem('school_classrooms', JSON.stringify(INITIAL_CLASSROOMS));
    }
  };

  // Cargar datos al iniciar y cada vez que se cambie de pestaña
  useEffect(() => {
    const savedAnnouncements = localStorage.getItem('school_announcements');
    if (savedAnnouncements) {
      try {
        setAnnouncements(JSON.parse(savedAnnouncements));
      } catch (e) {
        console.error("Error leyendo anuncios", e);
      }
    }

    loadClassroomsData();

    window.addEventListener('storage', loadClassroomsData);
    window.addEventListener('director_data_updated', loadClassroomsData);

    return () => {
      window.removeEventListener('storage', loadClassroomsData);
      window.removeEventListener('director_data_updated', loadClassroomsData);
    };
  }, []);

  useEffect(() => {
    loadClassroomsData();
  }, [activeTab]);

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
    loadClassroomsData();
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Actualizando puntajes...',
        success: '¡Puntajes sincronizados correctamente!',
        error: 'Error en la sincronización.',
      }
    );
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementTitle.trim() || !announcementContent.trim()) {
      toast.error('Por favor completa todos los campos del anuncio');
      return;
    }

    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      title: announcementTitle,
      content: announcementContent,
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
      priority: announcementPriority,
      author: 'Admin Principal',
    };

    const updated = [newAnnouncement, ...announcements];
    setAnnouncements(updated);
    localStorage.setItem('school_announcements', JSON.stringify(updated));

    setAnnouncementTitle('');
    setAnnouncementContent('');
    setAnnouncementPriority('media');
    toast.success('¡Anuncio publicado!', { description: 'El anuncio ya es visible.' });
  };

  const handleDeleteAnnouncement = (id: string) => {
    const updated = announcements.filter((item) => item.id !== id);
    setAnnouncements(updated);
    localStorage.setItem('school_announcements', JSON.stringify(updated));
    toast.info('Anuncio eliminado del sistema');
  };

  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'anuncios', label: 'Gestión Anuncios', icon: Megaphone },
    { id: 'parametros', label: 'Config. Temporada', icon: Settings },
    { id: 'salones', label: 'Salones de Clase', icon: Layers },
    { id: 'reportes', label: 'Reportes y Liga', icon: Trophy },
    { id: 'historial', label: 'Historial Sistema', icon: History },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans relative overflow-x-hidden">
      
      <aside className={`w-64 bg-[#0A0F24] text-white flex flex-col justify-between shrink-0 transition-transform duration-300 z-40 fixed md:sticky top-0 h-screen ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-blue-900/30 flex items-center justify-between">
          <ImpulsaLogo />
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden p-1.5 rounded-lg bg-blue-950 text-blue-300 hover:text-white">
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
                onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive ? 'bg-[#1E3A8A] text-white shadow-lg shadow-blue-950/50' : 'text-slate-400 hover:text-white hover:bg-blue-950/30'}`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#FFD700]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="px-4 py-2 border-t border-blue-900/30">
          <div className="bg-[#1E1145] border border-purple-500/30 rounded-xl p-4 text-center shadow-md">
            <div className="flex justify-center mb-2"><Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" /></div>
            <h4 className="text-xs font-bold text-white">Temporada 3</h4>
            <p className="text-[11px] text-purple-300 font-medium">La Fuerza del Saber</p>
            <div className="mt-2.5 inline-block px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/20 text-[10px] text-purple-300 font-bold">
              Termina en 18 días
            </div>
          </div>
        </div>

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

      {mobileMenuOpen && <div onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-[#030712]/50 backdrop-blur-sm z-30 md:hidden" />}

      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 rounded-lg bg-slate-100 text-slate-700">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight font-sans">¡Buenos días! Administrador</h1>
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
          
          {activeTab === 'inicio' && (
            <>
              <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-xl">
                <div className="p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                  <div className="space-y-4 text-left max-w-lg">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-[10px] sm:text-xs font-extrabold uppercase">
                      ⚙️ PARÁMETROS GLOBALES
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">Configuración global de la Temporada 3</h2>
                    <p className="text-xs sm:text-sm text-indigo-100 font-medium">Administra las ligas activas, anuncios de inicio, salones y el multiplicador general de puntos.</p>
                    <button onClick={() => setActiveTab('parametros')} className="px-5 py-2.5 bg-white text-indigo-700 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md hover:bg-indigo-50">
                      Ajustar parámetros &gt;
                    </button>
                  </div>
                  <BannerTrophy />
                </div>
              </section>

              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white border border-slate-200 p-5 rounded-2xl text-left space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-indigo-500"><Users className="w-5 h-5" /><span className="text-[10px] font-black uppercase text-slate-400">Usuarios</span></div>
                  <p className="text-2xl font-black text-slate-800">1.240</p>
                  <p className="text-[10px] text-slate-400 font-semibold">Alumnos y profesores</p>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-2xl text-left space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-indigo-500"><Layers className="w-5 h-5" /><span className="text-[10px] font-black uppercase text-slate-400">Salones</span></div>
                  <p className="text-2xl font-black text-slate-800">{classrooms.length} Grupos</p>
                  <p className="text-[10px] text-slate-400 font-semibold">Cursos registrados</p>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-2xl text-left space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-pink-500"><Megaphone className="w-5 h-5" /><span className="text-[10px] font-black uppercase text-slate-400">Anuncios</span></div>
                  <p className="text-2xl font-black text-slate-800">{announcements.length}</p>
                  <p className="text-[10px] text-slate-400 font-semibold">Publicados en Inicio</p>
                </div>
                <div className="bg-white border border-slate-200 p-5 rounded-2xl text-left space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-emerald-500"><Settings className="w-5 h-5" /><span className="text-[10px] font-black uppercase text-slate-400">Sistema</span></div>
                  <p className="text-2xl font-black text-slate-800">OK</p>
                  <p className="text-[10px] text-emerald-600 font-bold">Servicios activos</p>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-lg font-black text-slate-900 tracking-tight text-left">Accesos directos de administrador</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="bg-[#FDF2F8] border border-pink-200 rounded-3xl p-5 flex flex-col justify-between items-start text-left min-h-[160px] relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                    <div className="absolute top-2 right-2 opacity-80 group-hover:scale-105 transition-all"><QuickAccessMegaphoneSVG /></div>
                    <div className="relative z-10 max-w-[65%] space-y-1.5">
                      <h4 className="text-base font-black text-[#831843]">Crear Anuncios</h4>
                      <p className="text-xs text-pink-700/80 font-semibold leading-normal">Publica avisos clave para mostrar en el Inicio.</p>
                    </div>
                    <button onClick={() => setActiveTab('anuncios')} className="h-10 w-10 flex items-center justify-center rounded-full bg-[#EC4899] text-white transition-all group-hover:translate-x-1"><ChevronRight className="w-5 h-5" /></button>
                  </div>
                  <div className="bg-[#EBF7EE] border border-green-200 rounded-3xl p-5 flex flex-col justify-between items-start text-left min-h-[160px] relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                    <div className="absolute top-2 right-2 opacity-80 group-hover:scale-105 transition-all"><QuickAccessSettingsSVG /></div>
                    <div className="relative z-10 max-w-[65%] space-y-1.5">
                      <h4 className="text-base font-black text-[#1E4D2B]">Ajustar parámetros</h4>
                      <p className="text-xs text-green-700/80 font-semibold leading-normal">Multiplicador de puntos y fechas de cierre.</p>
                    </div>
                    <button onClick={() => setActiveTab('parametros')} className="h-10 w-10 flex items-center justify-center rounded-full bg-[#22C55E] text-white transition-all group-hover:translate-x-1"><ChevronRight className="w-5 h-5" /></button>
                  </div>
                  <div className="bg-[#E8F0FE] border border-blue-200 rounded-3xl p-5 flex flex-col justify-between items-start text-left min-h-[160px] relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                    <div className="absolute top-2 right-2 opacity-80 group-hover:scale-105 transition-all"><QuickAccessLayersSVG /></div>
                    <div className="relative z-10 max-w-[65%] space-y-1.5">
                      <h4 className="text-base font-black text-[#1A4B8E]">Administrar salones</h4>
                      <p className="text-xs text-blue-700/80 font-semibold leading-normal">Gestión de salones y ligas escolares.</p>
                    </div>
                    <button onClick={() => setActiveTab('salones')} className="h-10 w-10 flex items-center justify-center rounded-full bg-[#3B82F6] text-white transition-all group-hover:translate-x-1"><ChevronRight className="w-5 h-5" /></button>
                  </div>
                  <div className="bg-[#FEF7E0] border border-yellow-200 rounded-3xl p-5 flex flex-col justify-between items-start text-left min-h-[160px] relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                    <div className="absolute top-2 right-2 opacity-80 group-hover:scale-105 transition-all"><QuickAccessTrophySVG /></div>
                    <div className="relative z-10 max-w-[65%] space-y-1.5">
                      <h4 className="text-base font-black text-[#855B14]">Estadísticas liga</h4>
                      <p className="text-xs text-yellow-800/80 font-semibold leading-normal">Reportes consolidados y auditorías.</p>
                    </div>
                    <button onClick={() => setActiveTab('reportes')} className="h-10 w-10 flex items-center justify-center rounded-full bg-[#EAB308] text-white transition-all group-hover:translate-x-1"><ChevronRight className="w-5 h-5" /></button>
                  </div>
                </div>
              </section>
            </>
          )}

          {activeTab === 'anuncios' && (
            <div className="space-y-6 text-left">
              <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
                <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <Megaphone className="w-6 h-6 text-pink-500" /> Crear Nuevo Anuncio Escolar
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold">Este aviso aparecerá destacado en la página de inicio para todos los roles.</p>
                  </div>
                </div>
                <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Título del Anuncio</label>
                      <input type="text" placeholder="Ej: Gran Torneo Intercolegial de Matemáticas" value={announcementTitle} onChange={(e) => setAnnouncementTitle(e.target.value)} className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Prioridad / Tipo</label>
                      <select value={announcementPriority} onChange={(e) => setAnnouncementPriority(e.target.value as 'alta' | 'media' | 'baja')} className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="baja">Baja (Informativo / Verde)</option>
                        <option value="media">Media (Normal / Amarillo)</option>
                        <option value="alta">Alta (Urgente / Rojo)</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Contenido del Mensaje</label>
                    <textarea rows={4} placeholder="Escribe aquí los detalles..." value={announcementContent} onChange={(e) => setAnnouncementContent(e.target.value)} className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" required />
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2">
                      <Send className="w-4 h-4" /> Publicar Anuncio
                    </button>
                  </div>
                </form>
              </section>

              <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Anuncios Publicados ({announcements.length})</h3>
                {announcements.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 bg-[#F8FAFC] rounded-2xl border border-dashed border-slate-200">
                    <Megaphone className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-xs font-semibold">No hay anuncios publicados actualmente.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {announcements.map((item) => (
                      <div key={item.id} className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${item.priority === 'alta' ? 'bg-rose-100 text-rose-700' : item.priority === 'media' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                              {item.priority}
                            </span>
                            <h4 className="text-sm font-black text-slate-800">{item.title}</h4>
                          </div>
                          <p className="text-xs text-slate-600 font-medium whitespace-pre-line">{item.content}</p>
                          <p className="text-[10px] text-slate-400 font-bold">Publicado el {item.date} por {item.author}</p>
                        </div>
                        <button onClick={() => handleDeleteAnnouncement(item.id)} className="self-end md:self-center p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          )}

          {activeTab === 'parametros' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left max-w-xl mx-auto">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Settings className="w-6 h-6 text-indigo-500" /> Consola de Parámetros de Temporada
                </h3>
                <p className="text-xs text-slate-400 font-semibold">Establece multiplicadores y reglas globales de la plataforma</p>
              </div>
              <form onSubmit={handleSaveParams} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Multiplicador global de puntos</label>
                  <select value={pointsMultiplier} onChange={(e) => setPointsMultiplier(e.target.value)} className="w-full p-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-slate-800">
                    <option value="1.0">x1.0 (Predeterminado)</option>
                    <option value="1.5">x1.5 (Bono de Fin de Semana)</option>
                    <option value="2.0">x2.0 (Doble Puntos Especial)</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#F8FAFC] border border-slate-100 rounded-xl">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Estado de la Temporada 3</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Toggles automáticos de la liga</p>
                  </div>
                  <input type="checkbox" checked={seasonActive} onChange={(e) => setSeasonActive(e.target.checked)} className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer" />
                </div>
                <div className="pt-2 flex gap-3">
                  <button type="button" onClick={handleRecalculate} className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all">
                    Sincronizar Puntos
                  </button>
                  <button type="submit" className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all shadow-md">
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </section>
          )}

          {activeTab === 'salones' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left">
              <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Layers className="w-6 h-6 text-blue-500" /> Salones Registrados (Colegio Mayor)
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold font-sans">Grupos actualizados automáticamente</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full animate-pulse">
                  ● En Vivo
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...classrooms]
                  .sort((a, b) => b.points - a.points)
                  .map((classroom) => (
                  <div key={classroom.id} className="p-4 bg-[#F8FAFC] border border-slate-100 rounded-2xl shadow-sm hover:border-slate-200 transition-colors flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-black text-slate-800">{classroom.name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold">Director: {classroom.director} · Alumnos: {classroom.members}</p>
                      <p className="text-[10px] text-emerald-600 font-bold mt-1">✔ Aprobadas: {classroom.approvedMissions} | ❌ Rechazadas: {classroom.rejectedMissions}</p>
                    </div>
                    <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100">
                      {classroom.points.toLocaleString('es-CO')} pts
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'reportes' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left">
              <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Reportes Consolidados y Liga</h3>
                  <p className="text-xs text-slate-400 font-semibold">Auditoría global de puntos de liga y actividad</p>
                </div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
                  Automático
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-[#EEF2F6] rounded-2xl border border-slate-200/50 space-y-1">
                  <p className="text-[10px] font-bold uppercase text-slate-500">Puntos Totales Otorgados</p>
                  <p className="text-xl font-black text-indigo-600">
                    {classrooms.reduce((acc, c) => acc + c.points, 0).toLocaleString('es-CO')} Pts
                  </p>
                </div>
                <div className="p-4 bg-[#EEF2F6] rounded-2xl border border-slate-200/50 space-y-1">
                  <p className="text-[10px] font-bold uppercase text-slate-500">Misiones Aprobadas</p>
                  <p className="text-xl font-black text-emerald-600">
                    {classrooms.reduce((acc, c) => acc + c.approvedMissions, 0)} entregas
                  </p>
                </div>
                <div className="p-4 bg-[#EEF2F6] rounded-2xl border border-slate-200/50 space-y-1">
                  <p className="text-[10px] font-bold uppercase text-slate-500">Misiones Rechazadas</p>
                  <p className="text-xl font-black text-rose-600">
                    {classrooms.reduce((acc, c) => acc + c.rejectedMissions, 0)} entregas
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-black text-slate-800 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  Tabla Oficial de la Liga Escolar (En Vivo)
                </h4>
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden bg-[#F8FAFC]">
                  {[...classrooms]
                    .sort((a, b) => b.points - a.points)
                    .map((item, index) => (
                      <div key={item.id} className="p-3.5 flex justify-between items-center text-xs">
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center font-extrabold text-[10px] ${
                            index === 0 ? 'bg-amber-100 text-amber-800' : 
                            index === 1 ? 'bg-slate-200 text-slate-700' : 
                            index === 2 ? 'bg-amber-900/10 text-amber-900' : 'bg-slate-100 text-slate-500'
                          }`}>
                            #{index + 1}
                          </span>
                          <div>
                            <p className="font-bold text-slate-800">{item.name}</p>
                            <p className="text-[10px] text-slate-400">Director: {item.director}</p>
                          </div>
                        </div>
                        <span className="font-black text-indigo-600 text-sm">{item.points.toLocaleString('es-CO')} pts</span>
                      </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeTab === 'historial' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Historial de Logs del Sistema</h3>
                <p className="text-xs text-slate-400 font-semibold font-sans">Bitácora de auditoría y operaciones administrativas</p>
              </div>
              <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden bg-[#F8FAFC]">
                <div className="p-3 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-slate-800">Sincronización de puntos en vivo habilitada</p>
                    <p className="text-[10px] text-slate-400">Actor: Admin Principal</p>
                  </div>
                  <span className="text-[10px] text-slate-400">Hace un momento</span>
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