import React, { useState, useEffect, useMemo } from 'react';
import logoColegio from "../../assets/cologo.png";
import logoImpulsa from "../../assets/logo-impulsa.png";
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
  Send,
  RotateCcw,
  RefreshCw
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
  puntosTemporada: number; // Progreso del periodo académico actual (reiniciable)
  puntosLiga: number;      // Competencia anual acumulada (permanente)
  points: number;          // Alias mantenido para compatibilidad
  approvedMissions: number;
  rejectedMissions: number;
  members: number;
}

const INITIAL_CLASSROOMS: ClassroomData[] = [
  { id: '10-02', name: '10-02 Los Invencibles', grade: '10°', director: 'Yaritza Tirado', puntosTemporada: 4200, puntosLiga: 12700, points: 12700, approvedMissions: 40, rejectedMissions: 5, members: 28 },
  { id: '10-01', name: '10-01 Líderes', grade: '10°', director: 'Sofía Rincón', puntosTemporada: 3100, puntosLiga: 9210, points: 9210, approvedMissions: 45, rejectedMissions: 3, members: 30 },
  { id: '09-01', name: '09-01 Exploradores', grade: '9°', director: 'Jorge Salazar', puntosTemporada: 2500, puntosLiga: 7850, points: 7850, approvedMissions: 32, rejectedMissions: 8, members: 26 },
  { id: '11-02', name: '11-02 Los Imparables', grade: '11°', director: 'Marta Pérez', puntosTemporada: 3800, puntosLiga: 8980, points: 8980, approvedMissions: 38, rejectedMissions: 2, members: 25 },
];

const SAMPLE_GALLERY_EVIDENCES = [
  {
    id: 'gal-1',
    studentName: 'Valeria Gómez',
    classroomId: '10-02',
    missionTitle: 'Jornada de Reciclaje y Eco-Aula',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
    date: 'Hace 20 min',
    points: 400,
    status: 'APPROVED'
  },
  {
    id: 'gal-2',
    studentName: 'Yaritza Tirado',
    classroomId: '10-01',
    missionTitle: 'Taller Experimental de Robótica',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    date: 'Hace 1 hora',
    points: 350,
    status: 'APPROVED'
  },
  {
    id: 'gal-3',
    studentName: 'Sofia Torres',
    classroomId: '11-02',
    missionTitle: 'Campamento de Semilleros Verdes',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    date: 'Hace 2 horas',
    points: 300,
    status: 'APPROVED'
  },
  {
    id: 'gal-4',
    studentName: 'Maria Riveros',
    classroomId: '09-01',
    missionTitle: 'Resolución de Taller de Algoritmos',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
    date: 'Hace 3 horas',
    points: 300,
    status: 'PENDING'
  }
];

const ImpulsaLogo: React.FC = () => (
  <div className="flex items-center gap-2.5">
    <img
      src={logoImpulsa}
      alt="Logo IMPULSA"
      className="w-10 h-10 object-contain shrink-0 drop-shadow-[0_2px_8px_rgba(59,130,246,0.4)]"
    />
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

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'inicio' | 'anuncios' | 'parametros' | 'salones' | 'sugerencias' | 'reportes' | 'historial'>('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [pointsMultiplier, setPointsMultiplier] = useState<string>('1.0');
  const [seasonActive, setSeasonActive] = useState<boolean>(true);
  const [confirmSeasonModalOpen, setConfirmSeasonModalOpen] = useState<boolean>(false);

  // Tab de filtro para tablas de clasificación: Temporada vs. Liga
  const [rankingFilter, setRankingFilter] = useState<'season' | 'league'>('season');

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementContent, setAnnouncementContent] = useState('');
  const [announcementPriority, setAnnouncementPriority] = useState<'alta' | 'media' | 'baja'>('media');

  const [classrooms, setClassrooms] = useState<ClassroomData[]>([]);
  const [galleryEvidences, setGalleryEvidences] = useState<any[]>([]);
  const [corrections, setCorrections] = useState<any[]>([]);

  const loadClassroomsData = () => {
    const stored = localStorage.getItem('school_classrooms');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const normalized = parsed.map((c: any) => ({
            ...c,
            puntosTemporada: c.puntosTemporada ?? (c.points || 0),
            puntosLiga: c.puntosLiga ?? (c.points || 0),
            points: c.puntosLiga ?? (c.points || 0),
          }));
          setClassrooms(normalized);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }
    setClassrooms(INITIAL_CLASSROOMS);
    localStorage.setItem('school_classrooms', JSON.stringify(INITIAL_CLASSROOMS));
  };

  const loadGalleryEvidences = () => {
    try {
      const storedSubmissions = localStorage.getItem('school_submissions') || localStorage.getItem('director_evidences');
      let list: any[] = [];
      if (storedSubmissions) {
        try {
          const parsed = JSON.parse(storedSubmissions);
          if (Array.isArray(parsed)) list = parsed;
        } catch (e) {
          console.error(e);
        }
      }

      const sampleImages = [
        'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80'
      ];

      const mappedList = list.slice(0, 4).map((sub: any, idx: number) => ({
        id: sub.id || `gal_${idx}`,
        studentName: sub.studentName || 'Estudiante',
        classroomId: sub.classroomId || sub.className || '10-02',
        missionTitle: sub.missionTitle || sub.taskTitle || 'Misión Escolar',
        imageUrl: (sub.content && typeof sub.content === 'string' && sub.content.startsWith('http') && (sub.content.includes('jpg') || sub.content.includes('png') || sub.content.includes('unsplash'))) 
          ? sub.content 
          : sampleImages[idx % sampleImages.length],
        date: sub.submittedAt || sub.date || 'Hace 10 min',
        points: sub.points || 300,
        status: sub.status || 'APPROVED'
      }));

      if (mappedList.length > 0) {
        setGalleryEvidences(mappedList);
      } else {
        setGalleryEvidences(SAMPLE_GALLERY_EVIDENCES);
      }
    } catch (e) {
      setGalleryEvidences(SAMPLE_GALLERY_EVIDENCES);
    }
  };

  const loadCorrections = () => {
    try {
      const stored = localStorage.getItem('mission_corrections');
      if (stored) {
        setCorrections(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const pendingCorrections = useMemo(() => {
    return corrections.filter((c) => (c.status || '').toUpperCase() === 'PENDING');
  }, [corrections]);

  const handleResolveCorrection = (id: string) => {
    const updated = corrections.map((c) => (c.id === id ? { ...c, status: 'RESOLVED' } : c));
    setCorrections(updated);
    localStorage.setItem('mission_corrections', JSON.stringify(updated));
    window.dispatchEvent(new Event('global_system_updated'));
    toast.success('Sugerencia marcada como resuelta');
  };

  useEffect(() => {
    loadClassroomsData();
    loadGalleryEvidences();
    loadCorrections();

    const savedAnnouncements = localStorage.getItem('school_announcements');
    if (savedAnnouncements) {
      try {
        setAnnouncements(JSON.parse(savedAnnouncements));
      } catch (e) {
        console.error("Error leyendo anuncios", e);
      }
    }

    const handleUpdate = () => {
      loadClassroomsData();
      loadGalleryEvidences();
      loadCorrections();
      const storedAnn = localStorage.getItem('school_announcements');
      if (storedAnn) {
        try {
          setAnnouncements(JSON.parse(storedAnn));
        } catch (e) {
          console.error(e);
        }
      }
    };

    window.addEventListener('storage', handleUpdate);
    window.addEventListener('director_data_updated', handleUpdate);
    window.addEventListener('global_system_updated', handleUpdate);
    window.addEventListener('student_evidence_submitted', handleUpdate);
    window.addEventListener('mission_correction_submitted', handleUpdate);

    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('director_data_updated', handleUpdate);
      window.removeEventListener('global_system_updated', handleUpdate);
      window.removeEventListener('student_evidence_submitted', handleUpdate);
      window.removeEventListener('mission_correction_submitted', handleUpdate);
    };
  }, []);

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

  // ACCIÓN REQUERIMIENTO 1: Iniciar Nueva Temporada (Reinicia Puntos de Temporada a 0)
  const handleStartNewSeason = () => {
    try {
      const stored = localStorage.getItem('school_classrooms');
      let list = stored ? JSON.parse(stored) : classrooms;
      const updated = list.map((c: any) => ({
        ...c,
        puntosTemporada: 0,
      }));
      localStorage.setItem('school_classrooms', JSON.stringify(updated));
      setClassrooms(updated);
      window.dispatchEvent(new Event('global_system_updated'));
      window.dispatchEvent(new Event('director_data_updated'));
      toast.success('¡Nueva Temporada Iniciada!', {
        description: 'Los Puntos de Temporada se han reiniciado a 0. Los Puntos de Liga se conservan intactos.',
      });
    } catch (e) {
      console.error('Error al iniciar nueva temporada:', e);
    }
  };

  // ACCIÓN REQUERIMIENTO 1: Reiniciar Liga Anual (Reinicia Puntos de Temporada y Liga a 0)
  const handleResetFullLeague = () => {
    try {
      const stored = localStorage.getItem('school_classrooms');
      let list = stored ? JSON.parse(stored) : classrooms;
      const updated = list.map((c: any) => ({
        ...c,
        puntosTemporada: 0,
        puntosLiga: 0,
        points: 0,
      }));
      localStorage.setItem('school_classrooms', JSON.stringify(updated));
      setClassrooms(updated);
      window.dispatchEvent(new Event('global_system_updated'));
      window.dispatchEvent(new Event('director_data_updated'));
      toast.success('¡Liga Anual Reiniciada!', {
        description: 'Se han reiniciado los Puntos de Temporada y Puntos de Liga a 0 para el nuevo año lectivo.',
      });
    } catch (e) {
      console.error('Error al reiniciar la liga:', e);
    }
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
    window.dispatchEvent(new Event('global_system_updated'));

    setAnnouncementTitle('');
    setAnnouncementContent('');
    setAnnouncementPriority('media');
    toast.success('¡Anuncio publicado!', { description: 'El anuncio ya es visible en la plataforma.' });
  };

  const handleDeleteAnnouncement = (id: string) => {
    const updated = announcements.filter((item) => item.id !== id);
    setAnnouncements(updated);
    localStorage.setItem('school_announcements', JSON.stringify(updated));
    window.dispatchEvent(new Event('global_system_updated'));
    toast.info('Anuncio eliminado del sistema');
  };

  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'anuncios', label: 'Gestión Anuncios', icon: Megaphone },
    { id: 'parametros', label: 'Config. Temporada', icon: Settings },
    { id: 'salones', label: 'Salones de Clase', icon: Layers },
    { id: 'sugerencias', label: 'Sugerencias Misiones', icon: AlertCircle },
    { id: 'reportes', label: 'Reportes y Liga', icon: Trophy },
    { id: 'historial', label: 'Historial Sistema', icon: History },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans relative overflow-x-hidden">
      
      <aside className={`w-64 bg-[#0A0F24] text-white flex flex-col justify-between shrink-0 transition-transform duration-300 z-40 fixed md:sticky top-0 h-screen max-h-screen min-h-screen overflow-y-auto ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
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
                onClick={() => {
                  setActiveTab(item.id as any);
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
                {item.id === 'sugerencias' && pendingCorrections.length > 0 && (
                  <span className="ml-auto bg-amber-500 text-slate-950 font-black text-[10px] px-1.5 py-0.5 rounded-full">
                    {pendingCorrections.length}
                  </span>
                )}
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
              {/* Main Banner */}
              <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-xl">
                <div className="p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                  <div className="space-y-4 text-left max-w-lg">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-[10px] sm:text-xs font-extrabold uppercase">
                      ⚙️ PARÁMETROS GLOBALES
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">Configuración global de la Temporada 3</h2>
                    <p className="text-xs sm:text-sm text-indigo-100 font-medium">Administra las ligas activas, anuncios de inicio, salones y el multiplicador general de puntos.</p>
                    <div className="flex flex-wrap gap-3 pt-1">
                      <button onClick={() => setConfirmSeasonModalOpen(true)} className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        <span>Iniciar Nueva Temporada</span>
                      </button>
                      <button onClick={() => setActiveTab('parametros')} className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl transition-all backdrop-blur-md flex items-center gap-1.5">
                        <Settings className="w-4 h-4" />
                        <span>Ajustar Parámetros &gt;</span>
                      </button>
                    </div>
                  </div>
                  <BannerTrophy />
                </div>
              </section>

              {/* KPIs de Consola */}
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

              {/* REQUERIMIENTO 2 & 3: REEMPLAZO DE ACCESOS RÁPIDOS POR MÓDULO DE ANUNCIOS / FALLBACK GALERÍA DE EVIDENCIAS */}
              <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5 text-left">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        {announcements.length > 0 ? (
                          <>
                            <Megaphone className="w-6 h-6 text-pink-500" />
                            Anuncios Institucionales Activos
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-6 h-6 text-amber-500" />
                            Mural & Galería de Evidencias Recientes
                          </>
                        )}
                      </h3>
                      {announcements.length > 0 ? (
                        <span className="bg-pink-100 text-pink-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                          {announcements.length} publicados
                        </span>
                      ) : (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          📷 Evidencias en vivo
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 font-semibold font-sans mt-0.5">
                      {announcements.length > 0
                        ? 'Comunicados y avisos relevantes para la comunidad educativa'
                        : 'Sin anuncios activos actualmente. Mostrando los logros e imágenes de misiones recientes entregadas por los alumnos.'}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('anuncios')}
                    className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{announcements.length > 0 ? 'Gestionar Anuncios' : 'Publicar Nuevo Anuncio'}</span>
                  </button>
                </div>

                {/* RENDERIZADO CONDICIONAL DE ANUNCIOS VS GALERÍA */}
                {announcements.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {announcements.map((announcement) => {
                      const priorityColors = {
                        alta: 'bg-rose-50 border-rose-200 text-rose-800',
                        media: 'bg-amber-50 border-amber-200 text-amber-800',
                        baja: 'bg-emerald-50 border-emerald-200 text-emerald-800',
                      };
                      const colorClass = priorityColors[announcement.priority] || priorityColors.media;

                      return (
                        <div
                          key={announcement.id}
                          className={`p-5 rounded-2xl border ${colorClass} space-y-3 relative group transition-all shadow-sm hover:shadow-md`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-white/80 border border-slate-200 text-slate-700">
                              Prioridad {announcement.priority}
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold">{announcement.date}</span>
                          </div>

                          <div>
                            <h4 className="text-base font-black text-slate-900">{announcement.title}</h4>
                            <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">{announcement.content}</p>
                          </div>

                          <div className="flex justify-between items-center pt-2 border-t border-slate-200/50">
                            <span className="text-[10px] font-bold text-slate-400">Por: {announcement.author || 'Administración'}</span>
                            <button
                              onClick={() => handleDeleteAnnouncement(announcement.id)}
                              className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 opacity-80 hover:opacity-100"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Eliminar</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* GALERÍA DE EVIDENCIAS RECIENTES (FALLBACK) */
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {galleryEvidences.map((ev: any) => (
                      <div
                        key={ev.id}
                        className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col"
                      >
                        <div className="relative h-36 overflow-hidden bg-slate-900">
                          <img
                            src={ev.imageUrl}
                            alt={ev.missionTitle}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2 left-2 bg-slate-900/90 backdrop-blur-md text-amber-400 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-amber-400/30">
                            Salón {ev.classroomId}
                          </div>
                          <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md">
                            +{ev.points} pts
                          </div>
                        </div>

                        <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                          <div>
                            <h4 className="text-xs font-black text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                              {ev.missionTitle}
                            </h4>
                            <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                              Estudiante: <span className="font-bold text-slate-700">{ev.studentName}</span>
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-medium">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {ev.date}
                            </span>
                            <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                              ✔ Entregado
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                    <label className="text-xs font-bold text-slate-700">Contenido del Comunicado</label>
                    <textarea rows={3} placeholder="Escribe el cuerpo del mensaje..." value={announcementContent} onChange={(e) => setAnnouncementContent(e.target.value)} className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="px-5 py-2.5 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2">
                      <Send className="w-4 h-4" /> Publicar Anuncio Ahora
                    </button>
                  </div>
                </form>
              </section>

              <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h4 className="text-base font-black text-slate-900">Anuncios Publicados ({announcements.length})</h4>
                {announcements.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-xs font-semibold">
                    No hay anuncios vigentes. El Inicio mostrará la Galería de Evidencias como fallback automático.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {announcements.map((announcement) => (
                      <div key={announcement.id} className="p-4 bg-[#F8FAFC] border border-slate-100 rounded-2xl space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-slate-400">{announcement.date}</span>
                          <button onClick={() => handleDeleteAnnouncement(announcement.id)} className="text-xs text-rose-600 font-bold hover:underline flex items-center gap-1">
                            <Trash2 className="w-3.5 h-3.5" /> Eliminar
                          </button>
                        </div>
                        <h5 className="text-sm font-black text-slate-800">{announcement.title}</h5>
                        <p className="text-xs text-slate-600 font-medium">{announcement.content}</p>
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
                  <Settings className="w-6 h-6 text-indigo-500" /> Consola de Parámetros & Temporada
                </h3>
                <p className="text-xs text-slate-400 font-semibold">Establece multiplicadores, reinicios de temporada y reglas de liga</p>
              </div>

              {/* REQUERIMIENTO 1: Acciones de Reinicio de Temporada vs. Liga */}
              <div className="p-5 bg-gradient-to-r from-amber-500/10 to-indigo-500/10 border border-amber-500/30 rounded-2xl space-y-4">
                <div>
                  <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-amber-600" />
                    Gestión de Ciclos y Reinicios de Puntos
                  </h4>
                  <p className="text-xs text-slate-600 font-medium mt-1">
                    Desacoplamiento oficial: Reinicia el periodo académico sin perder el acumulado histórico anual.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    onClick={handleStartNewSeason}
                    className="p-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl shadow-md transition-all flex flex-col items-start gap-1"
                  >
                    <span className="flex items-center gap-1.5">
                      <RefreshCw className="w-4 h-4" /> Iniciar Nueva Temporada
                    </span>
                    <span className="text-[10px] font-bold opacity-80">Reinicia Puntos de Temporada a 0</span>
                  </button>

                  <button
                    onClick={handleResetFullLeague}
                    className="p-3.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-black rounded-xl shadow-md transition-all flex flex-col items-start gap-1"
                  >
                    <span className="flex items-center gap-1.5">
                      <RotateCcw className="w-4 h-4" /> Reiniciar Liga Anual
                    </span>
                    <span className="text-[10px] font-bold text-rose-100">Nuevo Año Lectivo (Liga = 0)</span>
                  </button>
                </div>
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
                  <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all shadow-md">
                    Guardar Cambios Parámetros
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
                  <p className="text-xs text-slate-400 font-semibold font-sans">Visualiza el puntaje de Temporada y Liga en tiempo real</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full animate-pulse">
                  ● En Vivo
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...classrooms]
                  .sort((a, b) => (b.puntosLiga ?? b.points) - (a.puntosLiga ?? a.points))
                  .map((classroom) => (
                  <div key={classroom.id} className="p-4 bg-[#F8FAFC] border border-slate-100 rounded-2xl shadow-sm hover:border-slate-200 transition-colors flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-black text-slate-800">{classroom.name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold">Director: {classroom.director} · Alumnos: {classroom.members}</p>
                      <p className="text-[10px] text-emerald-600 font-bold mt-1">✔ Aprobadas: {classroom.approvedMissions} | ❌ Rechazadas: {classroom.rejectedMissions}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="block text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-100">
                        Liga: {(classroom.puntosLiga ?? classroom.points).toLocaleString('es-CO')} pts
                      </span>
                      <span className="block text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                        Temp: {(classroom.puntosTemporada ?? 0).toLocaleString('es-CO')} pts
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'reportes' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left">
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Reportes Consolidados y Liga</h3>
                  <p className="text-xs text-slate-400 font-semibold">Auditoría global de puntos de liga y actividad escolar</p>
                </div>
                
                {/* REQUERIMIENTO 1: Selector de Tabla de Temporada vs. Tabla Oficial de Liga */}
                <div className="flex bg-[#F1F5F9] p-1 rounded-xl shrink-0">
                  <button
                    onClick={() => setRankingFilter('season')}
                    className={`px-4 py-2 text-xs font-extrabold rounded-lg transition-all ${
                      rankingFilter === 'season' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    Tabla de Temporada
                  </button>
                  <button
                    onClick={() => setRankingFilter('league')}
                    className={`px-4 py-2 text-xs font-extrabold rounded-lg transition-all ${
                      rankingFilter === 'league' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    Tabla Oficial de Liga
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-[#EEF2F6] rounded-2xl border border-slate-200/50 space-y-1">
                  <p className="text-[10px] font-bold uppercase text-slate-500">Puntos Totales de Liga</p>
                  <p className="text-xl font-black text-indigo-600">
                    {classrooms.reduce((acc, c) => acc + (c.puntosLiga ?? c.points), 0).toLocaleString('es-CO')} Pts
                  </p>
                </div>
                <div className="p-4 bg-[#EEF2F6] rounded-2xl border border-slate-200/50 space-y-1">
                  <p className="text-[10px] font-bold uppercase text-slate-500">Puntos Totales de Temporada</p>
                  <p className="text-xl font-black text-amber-600">
                    {classrooms.reduce((acc, c) => acc + (c.puntosTemporada ?? 0), 0).toLocaleString('es-CO')} Pts
                  </p>
                </div>
                <div className="p-4 bg-[#EEF2F6] rounded-2xl border border-slate-200/50 space-y-1">
                  <p className="text-[10px] font-bold uppercase text-slate-500">Misiones Aprobadas</p>
                  <p className="text-xl font-black text-emerald-600">
                    {classrooms.reduce((acc, c) => acc + c.approvedMissions, 0)} entregas
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-black text-slate-800 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  {rankingFilter === 'season' ? 'Tabla de Clasificación de la Temporada Actual' : 'Tabla Oficial de la Liga Anual Escolar'}
                </h4>
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden bg-[#F8FAFC]">
                  {[...classrooms]
                    .sort((a, b) => 
                      rankingFilter === 'season' 
                        ? (b.puntosTemporada ?? 0) - (a.puntosTemporada ?? 0)
                        : (b.puntosLiga ?? b.points) - (a.puntosLiga ?? a.points)
                    )
                    .map((item, index) => {
                      const displayPoints = rankingFilter === 'season' ? (item.puntosTemporada ?? 0) : (item.puntosLiga ?? item.points);
                      return (
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
                          <span className={`font-black text-sm ${rankingFilter === 'season' ? 'text-amber-600' : 'text-indigo-600'}`}>
                            {displayPoints.toLocaleString('es-CO')} pts
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </section>
          )}

          {activeTab === 'sugerencias' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left">
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-amber-500" />
                    Sugerencias y Reportes de Misiones
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold">
                    Feedback de estudiantes sobre guías, enlaces o inconsistencias en las misiones
                  </p>
                </div>
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                  {pendingCorrections.length} pendientes
                </span>
              </div>

              {corrections.length === 0 ? (
                <div className="text-center py-10 space-y-2 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-800">¡Sin sugerencias pendientes!</h4>
                  <p className="text-xs text-slate-400 font-semibold">No se han registrado observaciones de misiones por parte de alumnos.</p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {corrections.map((corr: any) => {
                    const isPending = (corr.status || '').toUpperCase() === 'PENDING';

                    return (
                      <div
                        key={corr.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          isPending ? 'bg-amber-50/50 border-amber-200' : 'bg-slate-50 border-slate-200 opacity-75'
                        }`}
                      >
                        <div className="space-y-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                              isPending ? 'bg-amber-500 text-slate-950' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {isPending ? 'Pendiente' : 'Atendida / Resuelta'}
                            </span>
                            <h4 className="text-sm font-black text-slate-800">{corr.missionTitle}</h4>
                          </div>
                          <p className="text-xs text-slate-600 font-medium">
                            Estudiante: <strong className="text-slate-800">{corr.studentName}</strong> (Salón {corr.classroomId})
                          </p>
                          <p className="text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/80 font-medium italic">
                            "{corr.feedback}"
                          </p>
                          <p className="text-[10px] text-slate-400 font-semibold">{corr.createdAt}</p>
                        </div>

                        {isPending && (
                          <button
                            onClick={() => handleResolveCorrection(corr.id)}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center gap-1.5"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Marcar como Resuelta
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
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
                    <p className="font-bold text-slate-800">Desacoplamiento de puntos Temporada vs Liga activado</p>
                    <p className="text-[10px] text-slate-400">Puntos de temporada reiniciables independientemente de la liga anual.</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold">Hoy</span>
                </div>
                <div className="p-3 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-slate-800">Sincronización de puntos en vivo habilitada</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Persistencia reactiva en localStorage y custom events.</p>
                  </div>
                  <span className="text-[10px] text-slate-400">Ayer</span>
                </div>
              </div>
            </section>
          )}

        </main>
      </div>

      {/* Modal de Confirmación para Iniciar Nueva Temporada */}
      {confirmSeasonModalOpen && (
        <div className="fixed inset-0 bg-[#020617]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="p-2.5 bg-amber-100 text-amber-700 rounded-2xl">
                <RefreshCw className="w-6 h-6 animate-spin-slow" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">¿Iniciar Nueva Temporada?</h3>
                <p className="text-xs text-slate-400 font-semibold">Acción Administrativa Global</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-2">
              <p className="font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                Advertencia de Impacto de Datos:
              </p>
              <p className="leading-relaxed">
                Esta acción reiniciará los <strong>Puntos de Temporada a 0</strong> para todos los salones. Los <strong>Puntos de Liga</strong> se mantendrán intactos.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmSeasonModalOpen(false)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  handleStartNewSeason();
                  setConfirmSeasonModalOpen(false);
                }}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                Sí, Iniciar Nueva Temporada
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};