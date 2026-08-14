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
  PlusCircle,
  CheckSquare,
  Users,
  Eye,
  AlertCircle,
  ShieldAlert
} from 'lucide-react';
import { toast } from 'sonner';
import { StudentsTab } from '../../components/tabs/StudentsTab';
import { mockStudents } from '../../data/directorMockData';

// ==========================================
// CUSTOM VECTOR ARTWORK / SVGS (PREMIUM BRANDING)
// ==========================================

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
const QuickAccessPlusSVG: React.FC = () => (
  <svg viewBox="0 0 120 120" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 shrink-0 transition-transform duration-300 hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="45" fill="white" stroke="#22C55E" strokeWidth="5" />
    <line x1="60" y1="35" x2="60" y2="85" stroke="#22C55E" strokeWidth="8" strokeLinecap="round" />
    <line x1="35" y1="60" x2="85" y2="60" stroke="#22C55E" strokeWidth="8" strokeLinecap="round" />
  </svg>
);

const QuickAccessChecklistSVG: React.FC = () => (
  <svg viewBox="0 0 120 120" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 shrink-0 transition-transform duration-300 hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="25" y="20" width="70" height="80" rx="8" fill="white" stroke="#2563EB" strokeWidth="5" />
    <line x1="45" y1="40" x2="75" y2="40" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
    <line x1="45" y1="60" x2="75" y2="60" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
    <line x1="45" y1="80" x2="65" y2="80" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
    <circle cx="35" cy="40" r="4" fill="#2563EB" />
    <circle cx="35" cy="60" r="4" fill="#2563EB" />
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

// Mock pending assignments
interface TaskSubmission {
  id: string;
  className: string;
  taskTitle: string;
  pendingCount: number;
}

const INITIAL_TASK_SUBMISSIONS: TaskSubmission[] = [
  { id: 'ts1', className: '10-02 Los Invencibles', taskTitle: 'Taller 1 - Estructuras de Datos', pendingCount: 3 },
  { id: 'ts2', className: '09-01 Los Exploradores', taskTitle: 'Reciclaje de Aula', pendingCount: 2 },
  { id: 'ts3', className: '11-02 Los Imparables', taskTitle: 'Informe Semanal Ambiental', pendingCount: 1 },
];

export const DocenteDashboard: React.FC = () => {
  const navigate = useNavigate();

  // State Management
  const [activeTab, setActiveTab] = useState<'inicio' | 'crear' | 'validar' | 'alumnos' | 'ranking' | 'sugerencias' | 'historial'>('inicio');
  const [taskSubmissions, setTaskSubmissions] = useState<TaskSubmission[]>(INITIAL_TASK_SUBMISSIONS);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [bannerIndex, setBannerIndex] = useState<number>(0);
  const [rankingFilter, setRankingFilter] = useState<'season' | 'league'>('season');
  const [previewImageModal, setPreviewImageModal] = useState<{ imageUrl: string; submission: any } | null>(null);

  const [corrections, setCorrections] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem('mission_corrections');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  const pendingCorrections = useMemo(() => {
    return corrections.filter((c) => (c.status || '').toUpperCase() === 'PENDING');
  }, [corrections]);

  // Form State
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDesc, setTaskDesc] = useState<string>('');
  const [taskClass, setTaskClass] = useState<string>('10-02');
  const [taskPoints, setTaskPoints] = useState<string>('300');
  const [isMandatory, setIsMandatory] = useState<boolean>(false);

  const [classrooms, setClassrooms] = useState<any[]>(() => {
    const stored = localStorage.getItem('school_classrooms');
    return stored ? JSON.parse(stored) : [
      { id: '10-02', name: '10-02 Los Invencibles', grade: '10°', director: 'Yaritza Tirado', puntosTemporada: 4200, puntosLiga: 12700, points: 12700, approvedMissions: 40, rejectedMissions: 5, members: 28 },
      { id: '10-01', name: '10-01 Líderes', grade: '10°', director: 'Sofía Rincón', puntosTemporada: 3100, puntosLiga: 9210, points: 9210, approvedMissions: 45, rejectedMissions: 3, members: 30 },
      { id: '09-01', name: '09-01 Exploradores', grade: '9°', director: 'Jorge Salazar', puntosTemporada: 2500, puntosLiga: 7850, points: 7850, approvedMissions: 32, rejectedMissions: 8, members: 26 },
      { id: '11-02', name: '11-02 Los Imparables', grade: '11°', director: 'Marta Pérez', puntosTemporada: 3800, puntosLiga: 8980, points: 8980, approvedMissions: 38, rejectedMissions: 2, members: 25 },
    ];
  });

  const loadCorrections = () => {
    try {
      const stored = localStorage.getItem('mission_corrections');
      if (stored) setCorrections(JSON.parse(stored));
    } catch (e) {
      console.error(e);
    }
  };

  const handleResolveCorrection = (id: string) => {
    const updated = corrections.map((c) => (c.id === id ? { ...c, status: 'RESOLVED' } : c));
    setCorrections(updated);
    localStorage.setItem('mission_corrections', JSON.stringify(updated));
    window.dispatchEvent(new Event('global_system_updated'));
    toast.success('Sugerencia marcada como resuelta');
  };

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
    loadCorrections();
    
    const handleGlobalUpdates = () => {
      loadSharedClassrooms();
      loadCorrections();
    };

    window.addEventListener('storage', handleGlobalUpdates);
    window.addEventListener('global_system_updated', handleGlobalUpdates);
    window.addEventListener('director_data_updated', handleGlobalUpdates);
    window.addEventListener('season_updated', handleGlobalUpdates);
    window.addEventListener('mission_correction_submitted', handleGlobalUpdates);

    return () => {
      window.removeEventListener('storage', handleGlobalUpdates);
      window.removeEventListener('global_system_updated', handleGlobalUpdates);
      window.removeEventListener('director_data_updated', handleGlobalUpdates);
      window.removeEventListener('season_updated', handleGlobalUpdates);
      window.removeEventListener('mission_correction_submitted', handleGlobalUpdates);
    };
  }, []);

  const seasonLeaderboard = useMemo(() => {
    return [...classrooms]
      .sort((a: any, b: any) => (b.puntosTemporada ?? (b.points || 0)) - (a.puntosTemporada ?? (a.points || 0)))
      .map((item: any, idx: number) => ({
        id: item.id || item.name,
        name: item.name || item.id,
        points: item.puntosTemporada ?? (item.points || 0),
        isMe: item.id === '10-02',
        rank: idx + 1,
      }));
  }, [classrooms]);

  const leagueLeaderboard = useMemo(() => {
    return [...classrooms]
      .sort((a: any, b: any) => (b.puntosLiga ?? (b.points || 0)) - (a.puntosLiga ?? (a.points || 0)))
      .map((item: any, idx: number) => ({
        id: item.id || item.name,
        name: item.name || item.id,
        points: item.puntosLiga ?? (item.points || 0),
        isMe: item.id === '10-02',
        rank: idx + 1,
      }));
  }, [classrooms]);

  const displayedLeaderboard = useMemo(() => {
    return rankingFilter === 'season' ? seasonLeaderboard : leagueLeaderboard;
  }, [rankingFilter, seasonLeaderboard, leagueLeaderboard]);

  const leaderClassroom = useMemo(() => {
    const top = seasonLeaderboard[0];
    return top ? top.name : '10-01 Líderes';
  }, [seasonLeaderboard]);

  const bannerSlides = useMemo(() => [
    {
      tag: '🎓 GESTIÓN ACADÉMICA',
      title: `¡El salón ${leaderClassroom} va liderando la temporada actual!`,
      text: 'Diseña nuevos retos curriculares para impulsar el aprendizaje de tus salones.',
      buttonText: 'Crear nueva misión >',
    },
    {
      tag: '⚡ EVALUACIÓN',
      title: 'Hay entregas de misiones listas para validar',
      text: 'Consulta los informes cargados por los alumnos y otorga puntos de liga.',
      buttonText: 'Validar evidencias >',
    },
  ], [leaderClassroom]);

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % bannerSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [bannerSlides.length]);

  const [submissions, setSubmissions] = useState<any[]>(() => {
    const stored = localStorage.getItem('school_submissions') || localStorage.getItem('director_evidences');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: 'sub_demo_1',
        studentName: 'Juan Pérez',
        studentId: 'std_1',
        missionId: 'mis_1',
        missionTitle: 'Taller 1 - Estructuras de Datos',
        content: 'Repositorio GitHub y documentación enviada por el alumno',
        submittedAt: 'Hace 15 min',
        date: 'Hace 15 min',
        evidenceType: 'link',
        points: 300,
        classroomId: '10-02',
        status: 'PENDING'
      },
      {
        id: 'sub_demo_2',
        studentName: 'Sofía Pinzón',
        studentId: 'std_2',
        missionId: 'mis_2',
        missionTitle: 'Reciclaje Masivo',
        content: 'Foto de bolsas ecológicas en el punto limpio',
        submittedAt: 'Hace 1 hora',
        date: 'Hace 1 hora',
        evidenceType: 'image',
        points: 400,
        classroomId: '10-02',
        status: 'PENDING'
      }
    ];
  });

  const pendingSubmissions = React.useMemo(() => {
    return submissions.filter((s: any) => (s.status || '').toUpperCase() === 'PENDING');
  }, [submissions]);

  useEffect(() => {
    const loadSubmissionsData = () => {
      const stored = localStorage.getItem('school_submissions') || localStorage.getItem('director_evidences');
      if (stored) {
        try {
          setSubmissions(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    };
    loadSubmissionsData();

    window.addEventListener('storage', loadSubmissionsData);
    window.addEventListener('student_evidence_submitted', loadSubmissionsData);
    window.addEventListener('director_data_updated', loadSubmissionsData);
    window.addEventListener('global_system_updated', loadSubmissionsData);

    return () => {
      window.removeEventListener('storage', loadSubmissionsData);
      window.removeEventListener('student_evidence_submitted', loadSubmissionsData);
      window.removeEventListener('director_data_updated', loadSubmissionsData);
      window.removeEventListener('global_system_updated', loadSubmissionsData);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    toast.success('Sesión cerrada con éxito');
    navigate({ to: '/login' });
  };

  const handlePublishAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle || !taskDesc) {
      toast.error('Completa los campos obligatorios');
      return;
    }

    const newMission = {
      id: `mis_${Date.now()}`,
      title: taskTitle.trim(),
      description: taskDesc.trim(),
      points: Number(taskPoints),
      dueDate: 'En 7 días',
      evidenceType: 'link' as const,
      classroomId: taskClass,
      status: 'ACTIVE',
      category: 'Académica' as const,
      badge: 'Desafío Docente',
      isMandatory: isMandatory,
    };

    try {
      const storedMissionsRaw = localStorage.getItem('school_missions') || localStorage.getItem('director_missions');
      let existing: any[] = [];
      if (storedMissionsRaw) {
        try {
          existing = JSON.parse(storedMissionsRaw);
        } catch (err) {
          console.error(err);
        }
      }
      const updatedMissions = [newMission, ...existing];
      localStorage.setItem('school_missions', JSON.stringify(updatedMissions));
      localStorage.setItem('director_missions', JSON.stringify(updatedMissions));
    } catch (err) {
      console.error('Error al guardar misión en localStorage:', err);
    }

    window.dispatchEvent(new Event('mission_created'));
    window.dispatchEvent(new Event('global_system_updated'));

    toast.success('Nueva misión publicada', {
      description: `Misión "${taskTitle}" asignada al grupo ${taskClass} por +${taskPoints} pts${isMandatory ? ' (Obligatoria)' : ''}.`,
    });
    setTaskTitle('');
    setTaskDesc('');
    setIsMandatory(false);
  };

  const handleVerifySubmission = (submissionId: string, classroomId: string = '10-02', points: number = 300) => {
    try {
      const stored = localStorage.getItem('school_submissions') || localStorage.getItem('director_evidences');
      let currentSubmissions = stored ? JSON.parse(stored) : submissions;

      const target = currentSubmissions.find((s: any) => s.id === submissionId);
      const pointsToAdd = target?.points ? Number(target.points) : points;
      const targetClassroom = target?.classroomId || classroomId;
      const targetMissionId = target?.missionId;
      const targetMissionTitle = target?.missionTitle || target?.taskTitle;

      const updatedSubmissions = currentSubmissions.map((sub: any) => 
        sub.id === submissionId ? { ...sub, status: 'APPROVED' } : sub
      );

      setSubmissions(updatedSubmissions);
      localStorage.setItem('school_submissions', JSON.stringify(updatedSubmissions));
      localStorage.setItem('director_evidences', JSON.stringify(updatedSubmissions));
      localStorage.setItem('director_submissions', JSON.stringify(updatedSubmissions));

      // Update mission status in 'school_missions' and 'director_missions'
      const storedMissionsRaw = localStorage.getItem('school_missions') || localStorage.getItem('director_missions');
      if (storedMissionsRaw) {
        try {
          const missionsList = JSON.parse(storedMissionsRaw);
          const updatedMissions = missionsList.map((m: any) => {
            if (m.id === targetMissionId || m.title === targetMissionTitle) {
              return { ...m, status: 'COMPLETED' };
            }
            return m;
          });
          localStorage.setItem('school_missions', JSON.stringify(updatedMissions));
          localStorage.setItem('director_missions', JSON.stringify(updatedMissions));
        } catch (e) {
          console.error('Error updating mission status:', e);
        }
      }

      // Update classroom points in 'school_classrooms'
      const storedClassrooms = localStorage.getItem('school_classrooms');
      let classroomsList = storedClassrooms ? JSON.parse(storedClassrooms) : classrooms;
      const updatedClassrooms = classroomsList.map((c: any) => {
        if (c.id === targetClassroom || c.id === '10-02') {
          const currentTemp = c.puntosTemporada ?? (c.points || 0);
          const currentLiga = c.puntosLiga ?? (c.points || 0);
          return {
            ...c,
            puntosTemporada: currentTemp + pointsToAdd,
            puntosLiga: currentLiga + pointsToAdd,
            points: currentLiga + pointsToAdd,
            approvedMissions: (c.approvedMissions || 0) + 1
          };
        }
        return c;
      });
      localStorage.setItem('school_classrooms', JSON.stringify(updatedClassrooms));
      setClassrooms(updatedClassrooms);

      window.dispatchEvent(new Event('director_data_updated'));
      window.dispatchEvent(new Event('global_system_updated'));
      window.dispatchEvent(new Event('student_evidence_submitted'));
      window.dispatchEvent(new Event('mission_created'));

      toast.success('Evidencia validada', {
        description: `Se han sumado +${pointsToAdd} pts al salón ${targetClassroom} y finalizado la misión.`,
      });
    } catch (e) {
      console.error('Error al validar evidencia', e);
    }
  };

  const handleRejectSubmission = (submissionId: string) => {
    try {
      const stored = localStorage.getItem('school_submissions') || localStorage.getItem('director_evidences');
      let currentSubmissions = stored ? JSON.parse(stored) : submissions;

      const updatedSubmissions = currentSubmissions.map((sub: any) => 
        sub.id === submissionId ? { ...sub, status: 'REJECTED' } : sub
      );

      setSubmissions(updatedSubmissions);
      localStorage.setItem('school_submissions', JSON.stringify(updatedSubmissions));
      localStorage.setItem('director_evidences', JSON.stringify(updatedSubmissions));
      localStorage.setItem('director_submissions', JSON.stringify(updatedSubmissions));

      window.dispatchEvent(new Event('director_data_updated'));
      window.dispatchEvent(new Event('global_system_updated'));
      window.dispatchEvent(new Event('student_evidence_submitted'));
      window.dispatchEvent(new Event('mission_created'));

      toast.error('Evidencia rechazada', {
        description: 'Se notificó al estudiante para reintentar la entrega.',
      });
    } catch (e) {
      console.error('Error al rechazar evidencia', e);
    }
  };

  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'crear', label: 'Crear Misión', icon: PlusCircle },
    { id: 'validar', label: 'Validar Entregas', icon: CheckSquare },
    { id: 'alumnos', label: 'Estudiantes del Salón', icon: Users },
    { id: 'ranking', label: 'Tablas de Liga', icon: Trophy },
    { id: 'sugerencias', label: 'Sugerencias Misiones', icon: AlertCircle },
    { id: 'historial', label: 'Historial Docente', icon: History },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans relative overflow-x-hidden">
      
      {/* 1. SIDEBAR */}
      <aside
        className={`w-64 bg-[#0A0F24] text-white flex flex-col justify-between shrink-0 transition-transform duration-300 z-40 fixed md:sticky top-0 h-screen max-h-screen min-h-screen overflow-y-auto ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
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
                {item.id === 'validar' && pendingSubmissions.length > 0 && (
                  <span className="ml-auto bg-[#EF4444] text-white font-extrabold text-[10px] px-1.5 py-0.5 rounded-full">
                    {pendingSubmissions.length}
                  </span>
                )}
                {item.id === 'sugerencias' && pendingCorrections.length > 0 && (
                  <span className="ml-auto bg-amber-500 text-slate-950 font-black text-[10px] px-1.5 py-0.5 rounded-full">
                    {pendingCorrections.length}
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
              Termina en 18 days
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-t border-blue-900/30 bg-[#070B1E]">
          <div className="flex items-center gap-3">
            <SchoolCrest className="w-9 h-9" />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-white truncate">Prof. García</h4>
              <p className="text-[10px] text-slate-400 font-semibold truncate">Área de Tecnología</p>
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
                ¡Buenos días! Prof. García
              </h1>
              <span className="text-lg animate-bounce">👋👋</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <SchoolCrest className="w-8 h-8" />
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-slate-900">Colegio Mayor</p>
              <p className="text-[10px] font-semibold text-slate-400">Docente Académico</p>
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
                      {bannerSlides[bannerIndex]?.tag}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                      {bannerSlides[bannerIndex]?.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-indigo-100 font-medium">
                      {bannerSlides[bannerIndex]?.text}
                    </p>
                    <button
                      onClick={() => setActiveTab(bannerIndex === 0 ? 'crear' : 'validar')}
                      className="px-5 py-2.5 bg-white text-indigo-700 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md"
                    >
                      {bannerSlides[bannerIndex]?.buttonText}
                    </button>
                  </div>
                  <BannerTrophy />
                </div>
              </section>


              {/* Quick Access */}
              <section className="space-y-4">
                <h3 className="text-lg font-black text-slate-900 tracking-tight text-left">Accesos rápidos de docente</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="bg-[#EBF7EE] border border-green-200 rounded-3xl p-5 flex flex-col justify-between items-start text-left min-h-[160px] relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                    <div className="absolute top-2 right-2 opacity-80 group-hover:scale-105 transition-all">
                      <QuickAccessPlusSVG />
                    </div>
                    <div className="relative z-10 max-w-[65%] space-y-1.5">
                      <h4 className="text-base font-black text-[#1E4D2B]">Crear misión</h4>
                      <p className="text-xs text-green-700/80 font-semibold leading-normal">
                        Asigna un nuevo reto o tarea académica a los salones.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('crear')}
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-[#22C55E] text-white transition-all group-hover:translate-x-1"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="bg-[#E8F0FE] border border-blue-200 rounded-3xl p-5 flex flex-col justify-between items-start text-left min-h-[160px] relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                    <div className="absolute top-2 right-2 opacity-80 group-hover:scale-105 transition-all">
                      <QuickAccessChecklistSVG />
                    </div>
                    <div className="relative z-10 max-w-[65%] space-y-1.5">
                      <h4 className="text-base font-black text-[#1A4B8E]">Validar evidencias</h4>
                      <p className="text-xs text-blue-700/80 font-semibold leading-normal">
                        Califica y valida las evidencias enviadas por los grados escolares.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('validar')}
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
                      <h4 className="text-base font-black text-[#855B14]">Liga escolar</h4>
                      <p className="text-xs text-yellow-800/80 font-semibold leading-normal">
                        Consulta cómo va la competencia general del colegio.
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
            </>
          )}

          {/* TAB 2: CREAR MISIÓN */}
          {activeTab === 'crear' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left max-w-2xl mx-auto">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <PlusCircle className="w-6 h-6 text-emerald-500" />
                  Publicar Nueva Misión de Salón
                </h3>
                <p className="text-xs text-slate-400 font-semibold">Configura un reto académico que sume puntos de temporada</p>
              </div>

              <form onSubmit={handlePublishAssignment} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Título de la misión</label>
                  <input
                    type="text"
                    required
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="Ej. Taller 2 - Algoritmos de Ordenamiento"
                    className="w-full p-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Instrucciones / Descripción</label>
                  <textarea
                    required
                    rows={4}
                    value={taskDesc}
                    onChange={(e) => setTaskDesc(e.target.value)}
                    placeholder="Especifica los entregables, las normas del salón y el criterio de éxito..."
                    className="w-full p-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Grado Asignado</label>
                    <select
                      value={taskClass}
                      onChange={(e) => setTaskClass(e.target.value)}
                      className="w-full p-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-slate-800"
                    >
                      <option value="10-02">10-02 Los Invencibles</option>
                      <option value="10-01">10-01 Líderes</option>
                      <option value="09-01">09-01 Exploradores</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Puntos Recompensa</label>
                    <select
                      value={taskPoints}
                      onChange={(e) => setTaskPoints(e.target.value)}
                      className="w-full p-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-slate-800"
                    >
                      <option value="150">+150 pts (Fácil)</option>
                      <option value="300">+300 pts (Normal)</option>
                      <option value="450">+450 pts (Complejo)</option>
                      <option value="1000">+1000 pts (Épica)</option>
                    </select>
                  </div>
                </div>

                {/* Mandatory Mission Toggle Switch */}
                <div className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <div className="space-y-0.5 text-left">
                    <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 cursor-pointer">
                      <ShieldAlert className="w-4 h-4 text-rose-500" />
                      Misión Obligatoria (Mandatory Mission)
                    </label>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Las misiones obligatorias no se pueden rechazar ni ignorar por los estudiantes.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isMandatory}
                    onChange={(e) => setIsMandatory(e.target.checked)}
                    className="w-5 h-5 accent-indigo-600 rounded cursor-pointer shrink-0 mt-0.5"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-[0.98]"
                >
                  Publicar Misión Escolar
                </button>
              </form>
            </section>
          )}

          {/* TAB 3: VALIDAR ENTREGAS */}
          {activeTab === 'validar' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <CheckSquare className="w-6 h-6 text-blue-600" />
                  Validación de Entregas Pendientes
                </h3>
                <p className="text-xs text-slate-400 font-semibold font-sans">Otorga los puntos una vez revisada la evidencia del salón</p>
              </div>

              {pendingSubmissions.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-800">¡Limpieza total!</h4>
                  <p className="text-xs text-slate-400 font-semibold">No quedan evidencias académicas pendientes de revisión.</p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {pendingSubmissions.map((ts: any) => {
                    const imageUrl = ts.imageUrl || (ts.content?.startsWith?.('data:image') ? ts.content : undefined);

                    return (
                      <div
                        key={ts.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#F8FAFC] border border-slate-100 rounded-2xl hover:border-slate-200 transition-colors gap-4"
                      >
                        <div className="flex items-start gap-3 text-left">
                          {imageUrl && (
                            <div
                              onClick={() => setPreviewImageModal({ imageUrl, submission: ts })}
                              className="relative group shrink-0 cursor-pointer overflow-hidden rounded-xl border border-slate-200 shadow-sm"
                              title="Ver foto a pantalla completa"
                            >
                              <img
                                src={imageUrl}
                                alt="Foto evidencia"
                                className="w-16 h-16 object-cover group-hover:scale-105 transition-transform duration-200"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <Eye className="w-5 h-5 text-white drop-shadow-md" />
                              </div>
                            </div>
                          )}

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-black text-slate-800">{ts.missionTitle || ts.taskTitle || 'Misión Escolar'}</h4>
                              {ts.category && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
                                  {ts.category}
                                </span>
                              )}
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold">
                                +{ts.points || 300} pts
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 font-medium">Estudiante: <span className="font-bold">{ts.studentName || 'Alumno'}</span> ({ts.classroomId || ts.className || '10-02'})</p>
                            {ts.content && !ts.content.startsWith('data:image') && (
                              <p className="text-xs text-slate-500 italic bg-white p-2 rounded-lg border border-slate-100 mt-1">"{ts.content}"</p>
                            )}
                            <p className="text-[10px] text-slate-400 font-semibold">{ts.submittedAt || ts.date || 'Hace un momento'}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 shrink-0">
                          {imageUrl && (
                            <button
                              type="button"
                              onClick={() => setPreviewImageModal({ imageUrl, submission: ts })}
                              className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1"
                            >
                              <Eye className="w-4 h-4" />
                              Ver Foto
                            </button>
                          )}
                          <button
                            onClick={() => handleRejectSubmission(ts.id)}
                            className="px-3.5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold rounded-xl transition-all"
                          >
                            Rechazar
                          </button>
                          <button
                            onClick={() => handleVerifySubmission(ts.id, ts.classroomId || ts.className || '10-02', ts.points || 300)}
                            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Validar y Sumar Puntos
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          )}

          {/* TAB 4: ALUMNOS / ESTUDIANTES */}
          {activeTab === 'alumnos' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Users className="w-6 h-6 text-indigo-600" />
                  Gestión de Alumnos y Reconocimientos (10-02)
                </h3>
                <p className="text-xs text-slate-400 font-semibold font-sans">
                  Monitorea el avance individual y otorga la mención de "Estudiante Destacado" en tiempo real
                </p>
              </div>

              <StudentsTab students={mockStudents as any} classroomId="10-02" />
            </section>
          )}

          {/* TAB 4: LIGAS */}
          {activeTab === 'ranking' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="text-left">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    Tabla General Escolar
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold font-sans">Consola Académica de Liga en Tiempo Real</p>
                </div>
                
                <div className="flex bg-[#F1F5F9] p-1 rounded-xl">
                  <button
                    onClick={() => setRankingFilter('season')}
                    className={`px-4 py-2 text-xs font-extrabold rounded-lg transition-all ${
                      rankingFilter === 'season' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Tabla de Temporada
                  </button>
                  <button
                    onClick={() => setRankingFilter('league')}
                    className={`px-4 py-2 text-xs font-extrabold rounded-lg transition-all ${
                      rankingFilter === 'league' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Tabla Oficial de la Liga
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {displayedLeaderboard.map((item: any) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      item.isMe 
                        ? 'bg-[#E8F0FE] border-blue-400 shadow-sm' 
                        : 'bg-[#F8FAFC] border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 text-left">
                      <span className={`w-8 h-8 rounded-full text-xs font-black flex items-center justify-center ${
                        item.rank === 1 ? 'bg-amber-400 text-amber-950 shadow-sm' :
                        item.rank === 2 ? 'bg-slate-300 text-slate-800' :
                        item.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        #{item.rank}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">
                          Grado {item.name} {item.isMe && '(Mi Salón)'}
                        </h4>
                        {item.isMe && (
                          <span className="text-[10px] text-blue-600 font-extrabold">Actualizado en vivo</span>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-black text-slate-800">
                      {item.points.toLocaleString('es-CO')} pts
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TAB: SUGERENCIAS / REPORTES */}
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

          {/* TAB 5: HISTORIAL */}
          {activeTab === 'historial' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Historial de Misiones Creadas</h3>
                <p className="text-xs text-slate-400 font-semibold font-sans">Retos publicados en el presente ciclo escolar</p>
              </div>

              <div className="space-y-3.5">
                <div className="p-4 bg-[#F8FAFC] border border-slate-100 rounded-2xl">
                  <h4 className="text-sm font-black text-slate-800">Taller 1 - Estructuras de Datos</h4>
                  <p className="text-[11px] text-slate-500 mt-1">Asignado a: 10-02 · Recompensa: +300 pts · Publicado hace 1 semana</p>
                </div>
                <div className="p-4 bg-[#F8FAFC] border border-slate-100 rounded-2xl">
                  <h4 className="text-sm font-black text-slate-800">Cuestionario - Impacto Ambiental</h4>
                  <p className="text-[11px] text-slate-500 mt-1">Asignado a: 09-01 · Recompensa: +150 pts · Publicado hace 2 semanas</p>
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

      {/* Lightbox Modal para vista previa de imagen en pantalla completa */}
      {previewImageModal && (
        <div className="fixed inset-0 bg-[#020617]/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Evidencia Fotográfica
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1 leading-snug">
                  {previewImageModal.submission.missionTitle || previewImageModal.submission.taskTitle || 'Misión Escolar'}
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  Estudiante: <strong className="text-slate-800">{previewImageModal.submission.studentName || 'Alumno'}</strong> · Salón {previewImageModal.submission.classroomId || '10-02'} · Recompensa: <strong className="text-indigo-600">+{previewImageModal.submission.points || 300} pts</strong>
                </p>
              </div>
              <button
                onClick={() => setPreviewImageModal(null)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
                aria-label="Cerrar vista previa"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 max-h-[60vh] flex items-center justify-center">
              <img
                src={previewImageModal.imageUrl}
                alt="Evidencia fotográfica a pantalla completa"
                className="w-full h-auto max-h-[60vh] object-contain"
              />
            </div>

            {previewImageModal.submission.content && !previewImageModal.submission.content.startsWith('data:image') && (
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                "{previewImageModal.submission.content}"
              </p>
            )}

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setPreviewImageModal(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={() => {
                  handleVerifySubmission(previewImageModal.submission.id, previewImageModal.submission.classroomId || '10-02', previewImageModal.submission.points || 300);
                  setPreviewImageModal(null);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                Validar y Sumar Puntos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};