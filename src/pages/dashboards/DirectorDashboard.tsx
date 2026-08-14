import React, { useState, useEffect, useMemo } from 'react';
import logoColegio from "../../assets/cologo.png";
import logoImpulsa from "../../assets/logo-impulsa.png";
import { useNavigate } from '@tanstack/react-router';
import {
  Home,
  Trophy,
  Shield,
  History,
  Bell,
  ChevronRight,
  Menu,
  X,
  Star,
  Megaphone,
  Award,
  CheckCircle2,
  Clock,
  LogOut,
  CheckSquare,
  AlertCircle,
  Target,
  Plus,
  Eye,
  Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner';
import { CreateMissionModal } from '../../components/modals/CreateMissionModal';
import { MissionsTab } from '../../components/tabs/MissionsTab';
import { StudentsTab } from '../../components/tabs/StudentsTab';

// ==========================================
// TIPOS Y DATOS COMPARTIDOS DEL MÓDULO DIRECTOR
// Se usan los tipos/datos ya definidos en el proyecto en vez de
// interfaces locales sueltas, para que todo el módulo quede conectado.
// ==========================================
import { ClassroomKPIs, Evidence, Mission } from '../../types/director';
import {
  CLASSROOM_ID,
  mockClassroomKPIs,
  mockEvidences,
  mockMissions,
  mockStudents,
} from '../../data/directorMockData';

// ==========================================
// TIPOS LOCALES (propios de esta vista, no forman parte del contrato
// compartido en types/director.ts)
// ==========================================

interface Announcement {
  id: string;
  title: string;
  content?: string;
  message?: string;
  date: string;
  priority?: 'alta' | 'media' | 'baja' | 'high' | 'medium' | 'low';
  author?: string;
}

interface HistoryEntry {
  id: string;
  title: string;
  details: string;
  time: string;
  type: 'approved' | 'rejected';
}

const INITIAL_HISTORY: HistoryEntry[] = [
  {
    id: 'h1',
    title: 'Misión: Lectores Imparables Aprobada',
    details: 'Evaluador: Yaritza Tirado · Sumó +1200 pts a 10-02',
    time: 'Hace 32 min',
    type: 'approved'
  },
  {
    id: 'h2',
    title: 'Misión: Reciclaje Masivo Rechazada',
    details: 'Evaluador: Yaritza Tirado · Foto ilegible enviada por alumno',
    time: 'Ayer, 4:15 PM',
    type: 'rejected'
  }
];

// ==========================================
// LOCALSTORAGE KEYS (persistencia del panel del director)
// ==========================================
const LS_MISSIONS_KEY = 'director_missions';
const LS_EVIDENCES_KEY = 'director_evidences';
const LS_KPIS_KEY = 'director_kpis';
const LS_HISTORY_LOG_KEY = 'director_history_log';

// ==========================================
// HELPERS DE INICIALIZACIÓN PEREZOSA (lazy init)
// Cada helper intenta leer de localStorage; si no existe o falla el parseo,
// cae de vuelta a los datos de directorMockData.ts (o al historial local).
// ==========================================
const loadMissions = (): Mission[] => {
  try {
    const stored = localStorage.getItem('school_missions') || localStorage.getItem(LS_MISSIONS_KEY);
    if (stored) return JSON.parse(stored) as Mission[];
  } catch (e) {
    console.error('Error al parsear director_missions de localStorage:', e);
  }
  return mockMissions;
};

const loadEvidences = (): Evidence[] => {
  try {
    const stored = localStorage.getItem(LS_EVIDENCES_KEY) || localStorage.getItem('director_submissions');
    if (stored) return JSON.parse(stored) as Evidence[];
  } catch (e) {
    console.error('Error al parsear director_evidences de localStorage:', e);
  }
  return mockEvidences;
};

const loadKpis = (): ClassroomKPIs => {
  try {
    const stored = localStorage.getItem(LS_KPIS_KEY);
    if (stored) return JSON.parse(stored) as ClassroomKPIs;
  } catch (e) {
    console.error('Error al parsear director_kpis de localStorage:', e);
  }
  return mockClassroomKPIs;
};

const loadHistoryLog = (): HistoryEntry[] => {
  try {
    const stored = localStorage.getItem(LS_HISTORY_LOG_KEY);
    if (stored) return JSON.parse(stored) as HistoryEntry[];
  } catch (e) {
    console.error('Error al parsear director_history_log de localStorage:', e);
  }
  return INITIAL_HISTORY;
};

// ==========================================
// HELPERS DE NORMALIZACIÓN DE STATUS
// El tipo Evidence acepta mayúsculas y minúsculas ('PENDING' | 'pending'),
// así que esta función evita comparaciones frágiles en toda la vista.
// ==========================================
const isEvidencePending = (evidence: Evidence): boolean =>
  evidence.status.toUpperCase() === 'PENDING';

// ==========================================
// CUSTOM VECTOR ARTWORK / SVGS
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
      <rect x="165" y="95" width="5.5" height="5.5" rx="1.5" fill="#F59E0B" transform="rotate(45 165 95)" />
      <path d="M155 55 L161 61 L153 63 Z" fill="#8B5CF6" />

      <path d="M60 148H140V163C140 165.2 138.2 167 136 167H64C61.8 167 60 165.2 60 163V148Z" fill="url(#pedestalGrad)" />
      <path d="M50 167H150V175C150 177.2 148.2 179 146 179H54C51.8 179 50 177.2 50 175V167Z" fill="#1e293b" />
      <path d="M100 152.5L102 156.5H106L102.8 158.7L104 162.7L100 160.5L96 162.7L97.2 158.7L94 156.5H98L100 152.5Z" fill="#F59E0B" />

      <path d="M92 115H108V148H92V115Z" fill="url(#goldGrad)" />
      <path d="M80 115H120V121H80V115Z" fill="url(#goldDarkGrad)" />

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
const syncClassroomWithAdmin = (classroomId: string, pointsToAdd: number, isApproval: boolean) => {
  // 1. Leer los salones guardados
  const stored = localStorage.getItem('school_classrooms');
  let classrooms = [];
  if (stored) {
    try {
      classrooms = JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing school_classrooms', e);
    }
  }

  if (!classrooms || classrooms.length === 0) {
    classrooms = [
      { id: '10-02', name: '10-02 Los Invencibles', grade: '10°', director: 'Yaritza Tirado', puntosTemporada: 4200, puntosLiga: 12700, points: 12700, approvedMissions: 40, rejectedMissions: 5, members: 28 },
      { id: '10-01', name: '10-01 Líderes', grade: '10°', director: 'Sofía Rincón', puntosTemporada: 3100, puntosLiga: 9210, points: 9210, approvedMissions: 45, rejectedMissions: 3, members: 30 },
      { id: '09-01', name: '09-01 Exploradores', grade: '9°', director: 'Jorge Salazar', puntosTemporada: 2500, puntosLiga: 7850, points: 7850, approvedMissions: 32, rejectedMissions: 8, members: 26 },
      { id: '11-02', name: '11-02 Los Imparables', grade: '11°', director: 'Marta Pérez', puntosTemporada: 3800, puntosLiga: 8980, points: 8980, approvedMissions: 38, rejectedMissions: 2, members: 25 },
    ];
  }

  // 2. Buscar el salón del director y actualizar sus datos
  const updatedClassrooms = classrooms.map((item: any) => {
    if (item.id === classroomId) {
      const currentTemp = item.puntosTemporada ?? (item.points || 0);
      const currentLiga = item.puntosLiga ?? (item.points || 0);
      return {
        ...item,
        puntosTemporada: currentTemp + pointsToAdd,
        puntosLiga: currentLiga + pointsToAdd,
        points: currentLiga + pointsToAdd,
        approvedMissions: isApproval ? item.approvedMissions + 1 : item.approvedMissions,
        rejectedMissions: !isApproval ? item.rejectedMissions + 1 : item.rejectedMissions,
      };
    }
    return item;
  });

  // 3. Guardar el nuevo listado en localStorage
  localStorage.setItem('school_classrooms', JSON.stringify(updatedClassrooms));

  // 4. Emitir eventos globales de sincronización
  window.dispatchEvent(new Event('director_data_updated'));
  window.dispatchEvent(new Event('global_system_updated'));
};


// ==========================================
// MAIN COMPONENT
// ==========================================

export const DirectorDashboard: React.FC = () => {
  const navigate = useNavigate();

  // State Management
  const [activeTab, setActiveTab] = useState<'inicio' | 'evidencias' | 'misiones' | 'salon' | 'ranking' | 'sugerencias' | 'historial'>('inicio');
  const [isCreateMissionOpen, setIsCreateMissionOpen] = useState<boolean>(false);

  // Inicialización perezosa: se lee de localStorage una sola vez al montar.
  // Si no hay nada guardado (primera visita), se usan los datos de directorMockData.ts.
  const [missions, setMissions] = useState<Mission[]>(loadMissions);
  const [evidences, setEvidences] = useState<Evidence[]>(loadEvidences);
  const [kpis, setKpis] = useState<ClassroomKPIs>(loadKpis);
  const [historyLog, setHistoryLog] = useState<HistoryEntry[]>(loadHistoryLog);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [bannerIndex, setBannerIndex] = useState<number>(0);
  const [rankingFilter, setRankingFilter] = useState<'season' | 'league'>('season');
  const [previewImageModal, setPreviewImageModal] = useState<{ imageUrl: string; evidence: Evidence } | null>(null);

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

  // ==========================================
  // SINCRONIZACIÓN AUTOMÁTICA CON LOCALSTORAGE
  // Cada vez que cambian misiones, evidencias, KPIs o el historial,
  // se vuelven a escribir en localStorage para que sobrevivan a un
  // recargue de página o cierre de sesión.
  // ==========================================
  useEffect(() => {
    try {
      localStorage.setItem(LS_MISSIONS_KEY, JSON.stringify(missions));
    } catch (e) {
      console.error('Error al guardar director_missions en localStorage:', e);
    }
  }, [missions]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_EVIDENCES_KEY, JSON.stringify(evidences));
    } catch (e) {
      console.error('Error al guardar director_evidences en localStorage:', e);
    }
  }, [evidences]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KPIS_KEY, JSON.stringify(kpis));
    } catch (e) {
      console.error('Error al guardar director_kpis en localStorage:', e);
    }
  }, [kpis]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_HISTORY_LOG_KEY, JSON.stringify(historyLog));
    } catch (e) {
      console.error('Error al guardar director_history_log en localStorage:', e);
    }
  }, [historyLog]);

  // Lectura de Anuncios Publicados desde Administración
  useEffect(() => {
    const fetchAnnouncements = () => {
      const stored = localStorage.getItem('school_announcements');
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as Announcement[];
          setAnnouncements(parsed);
        } catch (e) {
          console.error("Error al parsear los anuncios de localStorage:", e);
        }
      }
    };

      fetchAnnouncements();
    loadCorrections();
    window.addEventListener('storage', fetchAnnouncements);
    window.addEventListener('storage', loadCorrections);
    window.addEventListener('mission_correction_submitted', loadCorrections);
    window.addEventListener('global_system_updated', loadCorrections);
    return () => {
      window.removeEventListener('storage', fetchAnnouncements);
      window.removeEventListener('storage', loadCorrections);
      window.removeEventListener('mission_correction_submitted', loadCorrections);
      window.removeEventListener('global_system_updated', loadCorrections);
    };
  }, []);

  // Escuchar misiones y evidencias en tiempo real
  useEffect(() => {
    const fetchMissionsAndEvidences = () => {
      const updatedMissions = loadMissions();
      setMissions(updatedMissions);

      const updatedEvidences = loadEvidences();
      setEvidences(updatedEvidences);
      const pendingCount = updatedEvidences.filter(isEvidencePending).length;
      setKpis((prev) => ({
        ...prev,
        pendingReviews: pendingCount,
      }));
    };

    fetchMissionsAndEvidences();

    window.addEventListener('storage', fetchMissionsAndEvidences);
    window.addEventListener('mission_created', fetchMissionsAndEvidences);
    window.addEventListener('student_evidence_submitted', fetchMissionsAndEvidences);
    window.addEventListener('global_system_updated', fetchMissionsAndEvidences);

    return () => {
      window.removeEventListener('storage', fetchMissionsAndEvidences);
      window.removeEventListener('mission_created', fetchMissionsAndEvidences);
      window.removeEventListener('student_evidence_submitted', fetchMissionsAndEvidences);
      window.removeEventListener('global_system_updated', fetchMissionsAndEvidences);
    };
  }, []);

  const [classrooms, setClassrooms] = useState<any[]>(() => {
    const stored = localStorage.getItem('school_classrooms');
    return stored ? JSON.parse(stored) : [
      { id: '10-02', name: '10-02 Los Invencibles', grade: '10°', director: 'Yaritza Tirado', points: 12700, approvedMissions: 40, rejectedMissions: 5, members: 28 },
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
          const list = JSON.parse(stored);
          setClassrooms(list);
          const myClassroom = list.find((c: any) => c.id === CLASSROOM_ID);
          if (myClassroom) {
            setKpis((prev) => ({
              ...prev,
              totalPointsAwarded: myClassroom.points,
            }));
          }
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

  // Evidencias pendientes por revisar (derivado, no se persiste aparte)
  const pendingEvidences = useMemo(
    () => evidences.filter(isEvidencePending),
    [evidences]
  );

  // Puntaje del salón: viene directo del estado de salones compartido
  const classroomPoints = useMemo(() => {
    const found = classrooms.find((c: any) => c.id === CLASSROOM_ID);
    return found ? found.points : kpis.totalPointsAwarded;
  }, [classrooms, kpis.totalPointsAwarded]);

  // Recálculo dinámico de Leaderboard en base a los salones compartidos
  const seasonLeaderboard = useMemo(() => {
    return [...classrooms]
      .sort((a, b) => (b.puntosTemporada ?? (b.points || 0)) - (a.puntosTemporada ?? (a.points || 0)))
      .map((item: any, idx: number) => ({
        classroom: item.id || item.name,
        points: item.puntosTemporada ?? (item.points || 0),
        isMe: item.id === CLASSROOM_ID,
        rank: idx + 1,
      }));
  }, [classrooms]);

  const leagueLeaderboard = useMemo(() => {
    return [...classrooms]
      .sort((a, b) => (b.puntosLiga ?? (b.points || 0)) - (a.puntosLiga ?? (a.points || 0)))
      .map((item: any, idx: number) => ({
        classroom: item.id || item.name,
        points: item.puntosLiga ?? (item.points || 0),
        isMe: item.id === CLASSROOM_ID,
        rank: idx + 1,
      }));
  }, [classrooms]);

  const currentRank = useMemo(() => {
    const found = seasonLeaderboard.find((item) => item.isMe);
    return found ? found.rank : 1;
  }, [seasonLeaderboard]);

  const leaderClassroom = useMemo(() => {
    const top = seasonLeaderboard[0];
    return top ? top.classroom : '10-01';
  }, [seasonLeaderboard]);

  const bannerSlides = useMemo(() => [
    {
      tag: '📢 PANEL DE TUTORÍA',
      title: `¡Tu salón ${CLASSROOM_ID} está en el Puesto #${currentRank} de la temporada!`,
      text: `El salón ${leaderClassroom} encabeza el primer lugar con ${(seasonLeaderboard[0]?.points || 0).toLocaleString('es-CO')} pts.`,
      buttonText: 'Ver evidencias pendientes >',
    },
    {
      tag: '🔥 COMPETENCIA INTERCURSOS',
      title: `¡${CLASSROOM_ID} acumula ${classroomPoints.toLocaleString('es-CO')} pts!`,
      text: 'Incentiva a tu clase a realizar la misión ambiental activa.',
      buttonText: 'Ver misiones activas >',
    },
  ], [currentRank, classroomPoints, leaderClassroom, seasonLeaderboard]);

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev: number) => (prev + 1) % bannerSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [bannerSlides.length]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    // Nota: las claves director_missions, director_evidences, director_kpis
    // y director_history_log NO se borran aquí a propósito, para que el
    // estado persista aunque el usuario cierre sesión y vuelva a entrar.
    toast.success('Sesión cerrada con éxito');
    navigate({ to: '/login' });
  };

  // Busca los puntos de la misión asociada a una evidencia
  const getMissionForEvidence = (evidence: Evidence): Mission | undefined =>
    missions.find((m: Mission) => m.id === evidence.missionId);

  // Lógica funcional de Aprobación
  const handleApprove = (evidence: Evidence) => {
    const earnedPoints = missions.find((m: Mission) => m.id === evidence.missionId)?.points ?? (evidence as any).points ?? 0;

    const updatedEvidences = evidences.map((e: Evidence) =>
      e.id === evidence.id ? { ...e, status: 'APPROVED' as const } : e
    );
    setEvidences(updatedEvidences);

    try {
      localStorage.setItem('school_submissions', JSON.stringify(updatedEvidences));
      localStorage.setItem(LS_EVIDENCES_KEY, JSON.stringify(updatedEvidences));
      localStorage.setItem('director_submissions', JSON.stringify(updatedEvidences));
    } catch (e) {
      console.error('Error saving evidences on approve:', e);
    }

    // Actualizar estado de la misión a COMPLETED
    const targetMissionId = evidence.missionId;
    const targetMissionTitle = evidence.missionTitle;
    const updatedMissions = missions.map((m: Mission) => {
      if (m.id === targetMissionId || m.title === targetMissionTitle) {
        return { ...m, status: 'COMPLETED' as const };
      }
      return m;
    });
    setMissions(updatedMissions);
    try {
      localStorage.setItem('school_missions', JSON.stringify(updatedMissions));
      localStorage.setItem(LS_MISSIONS_KEY, JSON.stringify(updatedMissions));
    } catch (e) {
      console.error('Error updating mission status on approve:', e);
    }

    setKpis((prev: ClassroomKPIs) => ({
      ...prev,
      pendingReviews: Math.max(0, prev.pendingReviews - 1),
      totalPointsAwarded: prev.totalPointsAwarded + earnedPoints,
    }));

    // Registrar en Historial
    setHistoryLog((prev: HistoryEntry[]) => [
      {
        id: `h_${Date.now()}`,
        title: `Misión: ${evidence.missionTitle} Aprobada (${evidence.studentName})`,
        details: `Evaluador: Yaritza Tirado · Sumó +${earnedPoints} pts a ${CLASSROOM_ID}`,
        time: 'Justo ahora',
        type: 'approved'
      },
      ...prev
    ]);

    syncClassroomWithAdmin(CLASSROOM_ID, earnedPoints, true);

    window.dispatchEvent(new Event('global_system_updated'));
    window.dispatchEvent(new Event('student_evidence_submitted'));
    window.dispatchEvent(new Event('mission_created'));
    window.dispatchEvent(new Event('director_data_updated'));

    toast.success(`Evidencia de ${evidence.studentName} aprobada`, {
      description: `Se han sumado +${earnedPoints} puntos al salón ${CLASSROOM_ID} y finalizado la misión.`,
    });
  };

  // Lógica funcional de Rechazo
  const handleReject = (evidence: Evidence) => {
    const updatedEvidences = evidences.map((e: Evidence) =>
      e.id === evidence.id ? { ...e, status: 'REJECTED' as const } : e
    );
    setEvidences(updatedEvidences);

    try {
      localStorage.setItem('school_submissions', JSON.stringify(updatedEvidences));
      localStorage.setItem(LS_EVIDENCES_KEY, JSON.stringify(updatedEvidences));
      localStorage.setItem('director_submissions', JSON.stringify(updatedEvidences));
    } catch (e) {
      console.error('Error saving evidences on reject:', e);
    }

    setKpis((prev: ClassroomKPIs) => ({
      ...prev,
      pendingReviews: Math.max(0, prev.pendingReviews - 1),
    }));

    // Registrar en Historial
    setHistoryLog((prev: HistoryEntry[]) => [
      {
        id: `h_${Date.now()}`,
        title: `Misión: ${evidence.missionTitle} Rechazada (${evidence.studentName})`,
        details: 'Evaluador: Yaritza Tirado · Evidencia no cumple con los criterios',
        time: 'Justo ahora',
        type: 'rejected'
      },
      ...prev
    ]);

    syncClassroomWithAdmin(CLASSROOM_ID, 0, false);

    window.dispatchEvent(new Event('global_system_updated'));
    window.dispatchEvent(new Event('student_evidence_submitted'));
    window.dispatchEvent(new Event('mission_created'));
    window.dispatchEvent(new Event('director_data_updated'));

    toast.error(`Evidencia de ${evidence.studentName} rechazada`, {
      description: 'Se ha notificado al estudiante para corregir la entrega.',
    });
  };

  const handleCreateMission = (missionData: Omit<Mission, 'id' | 'classroomId' | 'status'>) => {
    const newMission: Mission = {
      id: `mis_${Date.now()}`,
      title: missionData.title,
      description: missionData.description,
      points: Number(missionData.points),
      dueDate: missionData.dueDate,
      evidenceType: missionData.evidenceType || 'link',
      classroomId: CLASSROOM_ID,
      status: 'ACTIVE',
    };

    const updatedMissions = [newMission, ...missions];
    setMissions(updatedMissions);

    try {
      localStorage.setItem('school_missions', JSON.stringify(updatedMissions));
      localStorage.setItem(LS_MISSIONS_KEY, JSON.stringify(updatedMissions));
    } catch (e) {
      console.error('Error guardando misiones en localStorage:', e);
    }

    window.dispatchEvent(new Event('mission_created'));
    toast.success('¡Misión creada y publicada para los estudiantes!');
  };

  const handleDeleteMission = (id: string) => {
    const updated = missions.filter((m) => m.id !== id);
    setMissions(updated);
    try {
      localStorage.setItem('school_missions', JSON.stringify(updated));
      localStorage.setItem(LS_MISSIONS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error al borrar misión:', e);
    }
    window.dispatchEvent(new Event('mission_created'));
    toast.success('Misión eliminada');
  };

  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'evidencias', label: 'Revisar Evidencias', icon: CheckSquare },
    { id: 'misiones', label: 'Misiones del Salón', icon: Target },
    { id: 'salon', label: 'Mi salón', icon: Shield },
    { id: 'ranking', label: 'Ranking', icon: Trophy },
    { id: 'sugerencias', label: 'Sugerencias Misiones', icon: AlertCircle },
    { id: 'historial', label: 'Historial', icon: History },
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
                {item.id === 'evidencias' && pendingEvidences.length > 0 && (
                  <span className="ml-auto bg-[#EF4444] text-white font-extrabold text-[10px] px-1.5 py-0.5 rounded-full">
                    {pendingEvidences.length}
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
              Termina en 18 días
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-t border-blue-900/30 bg-[#070B1E]">
          <div className="flex items-center gap-3">
            <SchoolCrest className="w-9 h-9" />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-white truncate">Yaritza Tirado</h4>
              <p className="text-[10px] text-slate-400 font-semibold truncate">Director de {CLASSROOM_ID}</p>
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
                ¡Buenos días! Prof. Yaritza
              </h1>
              <span className="text-lg animate-bounce">👋</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-900">{CLASSROOM_ID}: {classroomPoints.toLocaleString('es-CO')} pts</p>
              <p className="text-[10px] font-semibold text-emerald-600">Puesto #{currentRank} en Ranking</p>
            </div>
            <SchoolCrest className="w-8 h-8" />
          </div>
        </header>

        <main className="flex-1 p-6 space-y-8 max-w-6xl mx-auto w-full overflow-y-auto">
          
          {/* TAB 1: INICIO */}
          {activeTab === 'inicio' && (
            <>
              {/* Banner Carousel */}
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
                      onClick={() => setActiveTab(bannerIndex === 0 ? 'evidencias' : 'salon')}
                      className="px-5 py-2.5 bg-white text-indigo-700 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md hover:bg-slate-50"
                    >
                      {bannerSlides[bannerIndex]?.buttonText}
                    </button>
                  </div>
                  <BannerTrophy />
                </div>
              </section>

              {/* SECCIÓN DE ANUNCIOS INSTITUCIONALES */}
              <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-left space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-amber-500" />
                    Comunicados de Administración
                  </h3>
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                    {announcements.length} {announcements.length === 1 ? 'anuncio' : 'anuncios'}
                  </span>
                </div>

                {announcements.length === 0 ? (
                  <div className="p-6 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                    <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs text-slate-500 font-semibold">No hay comunicados oficiales publicados por la administración en este momento.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {announcements.map((item) => {
                      const priority = item.priority?.toLowerCase() || 'baja';
                      const badgeColors = 
                        priority === 'alta' || priority === 'high' 
                          ? 'bg-rose-100 text-rose-700 border-rose-200'
                          : priority === 'media' || priority === 'medium'
                          ? 'bg-amber-100 text-amber-700 border-amber-200'
                          : 'bg-blue-100 text-blue-700 border-blue-200';

                      return (
                        <div 
                          key={item.id} 
                          className="p-4 bg-[#F8FAFC] border border-slate-200/80 rounded-2xl hover:border-indigo-200 transition-all space-y-2 flex flex-col justify-between"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${badgeColors}`}>
                                Prioridad {priority}
                              </span>
                              <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {item.date}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900 leading-snug">{item.title}</h4>
                            <p className="text-xs text-slate-600 font-medium line-clamp-3">
                              {item.content || item.message}
                            </p>
                          </div>
                          {item.author && (
                            <p className="text-[10px] text-slate-400 font-semibold pt-2 border-t border-slate-100">
                              Publicado por: {item.author}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              {/* Accesos Rápidos */}
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
                        Hay {pendingEvidences.length} evidencias de tus estudiantes pendientes de validación.
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
                      <h4 className="text-base font-black text-[#1A4B8E]">Mi salón {CLASSROOM_ID}</h4>
                      <p className="text-xs text-blue-700/80 font-semibold leading-normal">
                        Consulta la historia, el puntaje ({classroomPoints.toLocaleString('es-CO')} pts) y estadísticas.
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
                        {CLASSROOM_ID} ocupa la posición #{currentRank} en el ranking general.
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

              {/* Actividad Reciente */}
              <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-left">
                <h3 className="text-lg font-black text-[#0A0F24] mb-4">Última actividad del grupo {CLASSROOM_ID}</h3>
                <div className="space-y-3.5">
                  <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] border border-slate-100 rounded-2xl">
                    <div className="w-9 h-9 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-800">Puntaje global actualizado: {classroomPoints.toLocaleString('es-CO')} pts</p>
                      <p className="text-[10px] text-slate-400">Salón {CLASSROOM_ID} · Puesto #{currentRank} en la tabla institucional</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] border border-slate-100 rounded-2xl">
                    <div className="w-9 h-9 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-800">Misiones validadas en la sesión</p>
                      <p className="text-[10px] text-slate-400">{historyLog.length} acciones registradas en el historial</p>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* TAB 2: EVIDENCIAS */}
          {activeTab === 'evidencias' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left">
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <CheckSquare className="w-6 h-6 text-green-500" />
                    Revisión de Evidencias Presentadas ({CLASSROOM_ID})
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold">Aprueba o rechaza evidencias para actualizar el puntaje general del salón</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1.5 rounded-xl text-xs font-bold self-start">
                  Total del salón: {classroomPoints.toLocaleString('es-CO')} pts
                </div>
              </div>

              {pendingEvidences.length === 0 ? (
                <div className="text-center py-12 space-y-3 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-800">¡Todo al día!</h4>
                  <p className="text-xs text-slate-400 font-semibold">No hay evidencias pendientes por evaluar en tu salón.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 border border-slate-200/60 rounded-2xl overflow-hidden bg-[#F8FAFC]">
                  {pendingEvidences.map((evidence: Evidence) => {
                    const mission = getMissionForEvidence(evidence);
                    const points = mission?.points ?? (evidence as any).points ?? 0;
                    const submittedDate = evidence.submittedAt || (evidence as any).date || 'Justo ahora';
                    const imageUrl = (evidence as any).imageUrl || ((evidence as any).content?.startsWith?.('data:image') ? (evidence as any).content : undefined);
                    const category = (evidence as any).category;

                    return (
                      <div key={evidence.id} className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-colors hover:bg-slate-50">
                        <div className="flex items-start gap-3">
                          {imageUrl && (
                            <div
                              onClick={() => setPreviewImageModal({ imageUrl, evidence })}
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
                              <p className="text-sm font-bold text-slate-800">{evidence.studentName}</p>
                              {category && (
                                <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                                  {category}
                                </span>
                              )}
                              <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                                +{points} pts
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 font-semibold">
                              Misión: <strong className="text-indigo-600 font-bold">{evidence.missionTitle}</strong>
                            </p>
                            {evidence.content && !evidence.content.startsWith('data:image') && (
                              <p className="text-xs text-slate-600 font-medium italic">"{evidence.content}"</p>
                            )}
                            <p className="text-[10px] text-slate-400">Entregado: {submittedDate}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {imageUrl && (
                            <button
                              type="button"
                              onClick={() => setPreviewImageModal({ imageUrl, evidence })}
                              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Ver Foto
                            </button>
                          )}
                          <button
                            onClick={() => handleReject(evidence)}
                            className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold rounded-xl transition-all"
                          >
                            Rechazar
                          </button>
                          <button
                            onClick={() => handleApprove(evidence)}
                            className="px-3.5 py-2 bg-green-600 hover:bg-green-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Aprobar (+{points} pts)
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          )}

          {/* TAB 3: MI SALÓN */}
          {activeTab === 'salon' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Detalles del Salón Tutorado ({CLASSROOM_ID})</h3>
                <p className="text-xs text-slate-400 font-semibold">Monitorea el rendimiento y avance acumulado del grupo</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-5 bg-[#F8FAFC] rounded-2xl border border-slate-100 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500">Puntaje Temporada 3</span>
                    <span className="text-xs font-black text-amber-600">{classroomPoints.toLocaleString('es-CO')} pts</span>
                  </div>
                  <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                    <div 
                      className="bg-amber-400 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min(100, (classroomPoints / 10000) * 100)}%` }} 
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Ubicado en la posición <strong>#{currentRank}</strong> a nivel institucional frente a una meta de 10.000 pts.
                  </p>
                </div>

                <div className="p-5 bg-[#F8FAFC] rounded-2xl border border-slate-100 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500">Alumnos Activos</span>
                    <span className="text-xs font-bold text-blue-600">{kpis.totalStudents} Estudiantes</span>
                  </div>
                  <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${Math.min(100, kpis.completionRate)}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">{kpis.completionRate}% de los alumnos han completado al menos 1 misión esta temporada.</p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-4">
                <div>
                  <h4 className="text-base font-black text-slate-900">Listado de Estudiantes del Salón ({CLASSROOM_ID})</h4>
                  <p className="text-xs text-slate-400 font-semibold font-sans">
                    Destaca a un estudiante estrella para otorgarle la mención honorífica en tiempo real
                  </p>
                </div>
                <StudentsTab students={mockStudents as any} classroomId={CLASSROOM_ID} />
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
                  <p className="text-xs text-slate-400 font-semibold">Tutor Yaritza Tirado · {CLASSROOM_ID}</p>
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
                {(rankingFilter === 'season' ? seasonLeaderboard : leagueLeaderboard).map((item) => (
                  <div
                    key={item.classroom}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      item.isMe 
                        ? 'bg-[#E8F0FE] border-blue-400 shadow-sm' 
                        : 'bg-[#F8FAFC] border-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3 text-left">
                      <span className={`w-8 h-8 rounded-full text-xs font-black flex items-center justify-center ${
                        item.rank === 1 ? 'bg-amber-400 text-amber-950' :
                        item.rank === 2 ? 'bg-slate-300 text-slate-800' :
                        item.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        #{item.rank}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">
                          Grado {item.classroom} {item.isMe && '(Mi Salón)'}
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
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Historial de Validaciones</h3>
                <p className="text-xs text-slate-400 font-semibold font-sans">Registro de misiones aprobadas o rechazadas históricamente por este tutor</p>
              </div>

              <div className="relative pl-6 border-l border-slate-100 space-y-6">
                {historyLog.map((log) => (
                  <div key={log.id} className="relative">
                    <span className={`absolute -left-[35px] top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm ${
                      log.type === 'approved' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'
                    }`}>
                      {log.type === 'approved' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-800">{log.title}</h4>
                      <p className="text-[11px] text-slate-500 font-medium">{log.details}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'misiones' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left">
              <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Target className="w-6 h-6 text-indigo-500" />
                    Misiones y Desafíos del Salón ({CLASSROOM_ID})
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold font-sans">Publica y gestiona misiones activas para que los alumnos envíen evidencias</p>
                </div>
                <button
                  onClick={() => setIsCreateMissionOpen(true)}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Nueva Misión
                </button>
              </div>

              <MissionsTab
                missions={missions}
                onOpenCreateModal={() => setIsCreateMissionOpen(true)}
                onDeleteMission={handleDeleteMission}
                classroomId={CLASSROOM_ID}
                totalStudents={kpis.totalStudents}
              />
            </section>
          )}

        </main>

        <CreateMissionModal
          isOpen={isCreateMissionOpen}
          onClose={() => setIsCreateMissionOpen(false)}
          onCreateMission={handleCreateMission}
        />
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
                  {previewImageModal.evidence.missionTitle}
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  Estudiante: <strong className="text-slate-800">{previewImageModal.evidence.studentName}</strong> · Salón {CLASSROOM_ID}
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

            {previewImageModal.evidence.content && !previewImageModal.evidence.content.startsWith('data:image') && (
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                "{previewImageModal.evidence.content}"
              </p>
            )}

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  handleReject(previewImageModal.evidence);
                  setPreviewImageModal(null);
                }}
                className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold rounded-xl transition-all"
              >
                Rechazar
              </button>
              <button
                type="button"
                onClick={() => {
                  handleApprove(previewImageModal.evidence);
                  setPreviewImageModal(null);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                Aprobar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectorDashboard;