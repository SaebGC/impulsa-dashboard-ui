import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import logoColegio from "../../assets/cologo.png";
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
  Flame,
  CheckCircle2,
  Clock,
  Upload,
  Info,
  Sparkles,
  LogOut,
  ThumbsUp,
  Flame as FlameIcon,
  MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';

// ==========================================
// CUSTOM VECTOR ARTWORK / SVGS (PREMIUM BRANDING)
// ==========================================

const ImpulsaLogo: React.FC = () => (
  <div className="flex items-center gap-3">
    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1e2e6e] border border-blue-400/30 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Golden Rocket pointing up-right */}
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
      {/* Glow background behind trophy */}
      <circle cx="100" cy="100" r="50" fill="#FBBF24" opacity="0.2" filter="blur(15px)" />

      {/* Confetti particles */}
      <circle cx="20" cy="50" r="3" fill="#3B82F6" className="animate-pulse" />
      <circle cx="175" cy="40" r="4.5" fill="#EC4899" />
      <rect x="35" y="85" width="7" height="4" rx="1.5" fill="#10B981" transform="rotate(18 35 85)" />
      <rect x="165" y="95" width="5.5" height="5.5" rx="1.5" fill="#F59E0B" transform="rotate(45 165 95)" />
      <path d="M155 55 L161 61 L153 63 Z" fill="#8B5CF6" />
      <path d="M28 115 L34 121 L31 113 Z" fill="#F97316" />
      <circle cx="100" cy="30" r="2.5" fill="#22C55E" />
      <circle cx="145" cy="140" r="3" fill="#EC4899" />

      {/* Pedestal base */}
      <path d="M60 148H140V163C140 165.2 138.2 167 136 167H64C61.8 167 60 165.2 60 163V148Z" fill="url(#pedestalGrad)" />
      <path d="M50 167H150V175C150 177.2 148.2 179 146 179H54C51.8 179 50 177.2 50 175V167Z" fill="#1e293b" />
      
      {/* Gold star on pedestal */}
      <path d="M100 152.5L102 156.5H106L102.8 158.7L104 162.7L100 160.5L96 162.7L97.2 158.7L94 156.5H98L100 152.5Z" fill="#F59E0B" />

      {/* Trophy Stem */}
      <path d="M92 115H108V148H92V115Z" fill="url(#goldGrad)" />
      <path d="M80 115H120V121H80V115Z" fill="url(#goldDarkGrad)" />

      {/* Trophy Cup Handles */}
      <path d="M60 65C45 65 45 95 60 95" stroke="url(#goldGrad)" strokeWidth="8" strokeLinecap="round" />
      <path d="M140 65C155 65 155 95 140 95" stroke="url(#goldGrad)" strokeWidth="8" strokeLinecap="round" />

      {/* Trophy Cup */}
      <path d="M60 48H140V90C140 112 122 130 100 130C78 130 60 112 60 90V48Z" fill="url(#goldGrad)" />
      {/* Inner cup shadow */}
      <path d="M64 51H136V62H64V51Z" fill="rgba(0,0,0,0.12)" />
      
      {/* Big Number '1' */}
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

const QuickAccessTargetSVG: React.FC = () => (
  <svg viewBox="0 0 120 120" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 shrink-0 transition-transform duration-300 hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="45" fill="white" stroke="#22C55E" strokeWidth="6" />
    <circle cx="60" cy="60" r="32" fill="#F0FDF4" stroke="#22C55E" strokeWidth="6" />
    <circle cx="60" cy="60" r="18" fill="white" stroke="#22C55E" strokeWidth="6" />
    <circle cx="60" cy="60" r="8" fill="#22C55E" />

    {/* Dart arrow */}
    <g transform="translate(60, 60) rotate(-45)">
      <line x1="0" y1="0" x2="48" y2="0" stroke="#EAB308" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="0" cy="0" r="3.5" fill="#EAB308" />
      <path d="M40 -6L50 -10L46 0L50 10L40 6Z" fill="#EF4444" />
      <line x1="40" y1="0" x2="46" y2="0" stroke="white" strokeWidth="1.5" />
    </g>
  </svg>
);

const QuickAccessTrophySVG: React.FC = () => (
  <svg viewBox="0 0 120 120" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 shrink-0 transition-transform duration-300 hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M35 88H85V98H35V88Z" fill="#1E3A8A" />
    <path d="M42 80H78V88H42V80Z" fill="#2563EB" />
    <path d="M54 62H66V80H54V62Z" fill="#EAB308" />
    <path d="M38 38C26 38 26 56 38 56" stroke="#EAB308" strokeWidth="6" strokeLinecap="round" />
    <path d="M82 38C94 38 94 56 82 56" stroke="#EAB308" strokeWidth="6" strokeLinecap="round" />
    <path d="M38 26H82V54C82 66 70 78 60 78C50 78 38 66 38 54V26Z" fill="#F59E0B" />
    <path d="M42 29H78V36H42V29Z" fill="#FBBF24" />
    <path d="M25 20L27 24H31L28 26L29 30L25 28L21 30L22 26L19 24H23L25 20Z" fill="#FDE047" />
    <path d="M95 18L97 22H101L98 24L99 28L95 26L91 28L92 24L89 22H93L95 18Z" fill="#FDE047" />
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

// ==========================================
// MOCK DATA MATCHING USER PROMPT SPECIFICS
// ==========================================

interface ActivityItem {
  id: string;
  type: 'target' | 'trophy' | 'megaphone' | 'barchart' | 'crown';
  text: string;
  subtext: string;
  time: string;
  emoji: string;
  count: number;
  reacted?: boolean;
}

const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act1',
    type: 'target',
    text: 'Nueva misión disponible.',
    subtext: 'Misión: Guardianes del Agua',
    time: 'Hace 15 min',
    emoji: '🤩',
    count: 24,
  },
  {
    id: 'act2',
    type: 'trophy',
    text: '9-01 completó una misión épica.',
    subtext: 'Misión: Lectores Imparables',
    time: 'Hace 32 min',
    emoji: '🔥',
    count: 18,
  },
  {
    id: 'act3',
    type: 'megaphone',
    text: 'Nuevo anuncio institucional.',
    subtext: 'Día del Colegio – Actividades especiales',
    time: 'Hace 1 h',
    emoji: '👍',
    count: 31,
  },
  {
    id: 'act4',
    type: 'barchart',
    text: '10-02 subió al tercer lugar.',
    subtext: '¡Sigan así, lo están haciendo increíble!',
    time: 'Hace 2 h',
    emoji: '👏',
    count: 27,
  },
  {
    id: 'act5',
    type: 'crown',
    text: 'Un salón descubrió un título secreto.',
    subtext: '¿Quiénes serán los próximos?',
    time: 'Hace 3 h',
    emoji: '👀',
    count: 15,
  },
];

interface BannerSlide {
  tag: string;
  title: string;
  text: string;
  buttonText: string;
}

const BANNER_SLIDES: BannerSlide[] = [
  {
    tag: '⭐ NOVEDAD PRINCIPAL',
    title: '¡10-01 acaba de convertirse en líder de la temporada!',
    text: 'La competencia se pone cada vez más emocionante.',
    buttonText: 'Ver ranking >',
  },
  {
    tag: '⚡ RETO RELÁMPAGO',
    title: '¡Misión "Aula Limpia" sorpresa activa hoy!',
    text: 'Sube las fotos de tu salón ordenado y gana +450 pts directos.',
    buttonText: 'Subir evidencia >',
  },
  {
    tag: '🏆 HITO HISTÓRICO',
    title: '¡Proyecto X otorga 5.000 Puntos de Liga al ganador!',
    text: 'Prepara tu propuesta de impacto escolar y postúlala ya.',
    buttonText: 'Postular ahora >',
  },
  {
    tag: '📢 AVISO DE TEMPORADA',
    title: 'Quedan 18 días para el cierre de la Temporada 3',
    text: 'Asegura tu posición en la liga. ¡No dejes misiones pendientes!',
    buttonText: 'Ver misiones >',
  },
];

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

interface MissionItem {
  id: string;
  title: string;
  category: 'Ambiental' | 'Académica' | 'Cultural' | 'Convivencia';
  points: number;
  timeRemaining: string;
  status: 'active' | 'in_review' | 'completed';
  badge: string;
}

const INITIAL_MISSIONS: MissionItem[] = [
  {
    id: 'm1',
    title: 'Guardianes del Agua',
    category: 'Ambiental',
    points: 400,
    timeRemaining: '3 días',
    status: 'active',
    badge: 'Común',
  },
  {
    id: 'm2',
    title: 'Lectores Imparables',
    category: 'Académica',
    points: 1200,
    timeRemaining: '7 días',
    status: 'completed',
    badge: 'Épica',
  },
  {
    id: 'm3',
    title: 'Galería de Arte Reciclado',
    category: 'Cultural',
    points: 800,
    timeRemaining: '5 días',
    status: 'active',
    badge: 'Especial',
  },
  {
    id: 'm4',
    title: 'Aula Limpia y Ordenada',
    category: 'Convivencia',
    points: 450,
    timeRemaining: '12 horas',
    status: 'active',
    badge: '⚡ Relámpago',
  },
];

const loadStudentMissions = (): MissionItem[] => {
  try {
    const schoolMissionsRaw = localStorage.getItem('school_missions') || localStorage.getItem('director_missions');
    const storedMissions = localStorage.getItem('student_missions');
    const storedEvidencesRaw = localStorage.getItem('school_submissions') || localStorage.getItem('director_evidences') || localStorage.getItem('director_submissions');
    
    let baseMissions: MissionItem[] = INITIAL_MISSIONS;

    if (schoolMissionsRaw) {
      try {
        const parsedSchool = JSON.parse(schoolMissionsRaw);
        if (Array.isArray(parsedSchool) && parsedSchool.length > 0) {
          baseMissions = parsedSchool.map((m: any) => ({
            id: m.id || `mis_${Date.now()}`,
            title: m.title || 'Misión sin título',
            description: m.description || '',
            category: m.category || 'Ambiental',
            points: Number(m.points) || 100,
            timeRemaining: m.dueDate ? `Límite: ${m.dueDate}` : (m.timeRemaining || 'Activa'),
            status: (m.status === 'ACTIVE' || m.status === 'active') ? 'active' as const : (m.status === 'completed' ? 'completed' as const : 'active' as const),
            badge: m.badge || 'Desafío',
          }));
        }
      } catch (e) {
        console.error('Error parseando school_missions:', e);
      }
    } else if (storedMissions) {
      try {
        baseMissions = JSON.parse(storedMissions) as MissionItem[];
      } catch (e) {
        console.error('Error parseando student_missions:', e);
      }
    }

    if (storedEvidencesRaw) {
      try {
        const evidences = JSON.parse(storedEvidencesRaw);
        baseMissions = baseMissions.map((mission: MissionItem) => {
          const ev = evidences.find((e: any) => e.missionId === mission.id);
          if (!ev) return mission;
          const statusUpper = (ev.status || '').toUpperCase();
          if (statusUpper === 'APPROVED') {
            return { ...mission, status: 'completed' as const };
          } else if (statusUpper === 'PENDING') {
            return { ...mission, status: 'in_review' as const };
          } else if (statusUpper === 'REJECTED') {
            return { ...mission, status: 'active' as const };
          }
          return mission;
        });
      } catch (e) {
        console.error('Error parseando evidencias:', e);
      }
    }

    return baseMissions;
  } catch (e) {
    console.error('Error al parsear misiones de localStorage:', e);
  }
  return INITIAL_MISSIONS;
};

export const EstudianteDashboard: React.FC = () => {
  const navigate = useNavigate();

  // State Management
  const [activeTab, setActiveTab] = useState<'inicio' | 'ranking' | 'salon' | 'misiones' | 'historial'>('inicio');
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [bannerIndex, setBannerIndex] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [rankingFilter, setRankingFilter] = useState<'season' | 'league'>('season');
  const [missionsList, setMissionsList] = useState<MissionItem[]>(loadStudentMissions);
  
  // Evidence Modal State
  const [selectedMission, setSelectedMission] = useState<MissionItem | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [evidenceText, setEvidenceText] = useState<string>('');

  // Persistir cambios en missionsList en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('student_missions', JSON.stringify(missionsList));
    } catch (e) {
      console.error('Error al guardar student_missions en localStorage:', e);
    }
  }, [missionsList]);

  const [classrooms, setClassrooms] = useState<any[]>(() => {
    const stored = localStorage.getItem('school_classrooms');
    return stored ? JSON.parse(stored) : [
      { id: '10-02', name: '10-02 Los Invencibles', grade: '10°', director: 'Carlos Mendoza', points: 12700, approvedMissions: 40, rejectedMissions: 5, members: 28 },
      { id: '10-01', name: '10-01 Líderes', grade: '10°', director: 'Sofía Rincón', points: 9210, approvedMissions: 45, rejectedMissions: 3, members: 30 },
      { id: '09-01', name: '09-01 Exploradores', grade: '9°', director: 'Jorge Salazar', points: 7850, approvedMissions: 32, rejectedMissions: 8, members: 26 },
      { id: '11-02', name: '11-02 Los Imparables', grade: '11°', director: 'Marta Pérez', points: 8980, approvedMissions: 38, rejectedMissions: 2, members: 25 },
    ];
  });

  const sortedClassrooms = useMemo(() => {
    return [...classrooms].sort((a: any, b: any) => b.points - a.points);
  }, [classrooms]);

  const myClassroom = useMemo(() => {
    return classrooms.find((c: any) => c.id === '10-02') || {
      id: '10-02',
      name: '10-02 Los Invencibles',
      points: 12700,
      approvedMissions: 40,
      rejectedMissions: 5,
    };
  }, [classrooms]);

  const myClassroomPoints = myClassroom.points;
  const myClassroomApprovedMissions = myClassroom.approvedMissions ?? 40;

  const myClassroomRank = useMemo(() => {
    const idx = sortedClassrooms.findIndex((c: any) => c.id === '10-02');
    return idx >= 0 ? idx + 1 : 1;
  }, [sortedClassrooms]);

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

  // Escuchar cuando el director crea misiones, aprueba/rechaza evidencias o cambia el localStorage
  useEffect(() => {
    const syncMissionsWithStorage = () => {
      setMissionsList(loadStudentMissions());
    };

    window.addEventListener('storage', syncMissionsWithStorage);
    window.addEventListener('mission_created', syncMissionsWithStorage);
    window.addEventListener('director_data_updated', syncMissionsWithStorage);
    window.addEventListener('student_evidence_submitted', syncMissionsWithStorage);
    window.addEventListener('global_system_updated', syncMissionsWithStorage);

    return () => {
      window.removeEventListener('storage', syncMissionsWithStorage);
      window.removeEventListener('mission_created', syncMissionsWithStorage);
      window.removeEventListener('director_data_updated', syncMissionsWithStorage);
      window.removeEventListener('student_evidence_submitted', syncMissionsWithStorage);
      window.removeEventListener('global_system_updated', syncMissionsWithStorage);
    };
  }, []);

  // Auto-play banner slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    toast.success('Sesión cerrada con éxito');
    navigate({ to: '/login' });
  };

  // Toggle user reaction increments
  const handleReact = (id: string) => {
    setActivities((prev) =>
      prev.map((act) => {
        if (act.id === id) {
          const reacted = !act.reacted;
          return {
            ...act,
            reacted,
            count: reacted ? act.count + 1 : act.count - 1,
          };
        }
        return act;
      })
    );
    toast.success('Reacción actualizada');
  };

  const handleOpenEvidenceModal = (mission: MissionItem) => {
    setSelectedMission(mission);
    setModalOpen(true);
  };

  const handleEvidenceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMission) return;
    
    // Set mission status to "in_review"
    setMissionsList((prev) =>
      prev.map((m) => (m.id === selectedMission.id ? { ...m, status: 'in_review' } : m))
    );

    const newSubmission = {
      id: `sub_${Date.now()}`,
      studentName: 'Juan Pérez',
      studentId: 'std_1',
      missionId: selectedMission.id,
      missionTitle: selectedMission.title,
      content: evidenceText || 'Evidencia enviada por el estudiante',
      submittedAt: 'Justo ahora',
      date: 'Justo ahora',
      evidenceType: 'text' as const,
      points: selectedMission.points,
      status: 'PENDING'
    };

    try {
      const existingRaw = localStorage.getItem('school_submissions') || localStorage.getItem('director_evidences') || localStorage.getItem('director_submissions');
      let existingList = [];
      if (existingRaw) {
        try {
          existingList = JSON.parse(existingRaw);
        } catch (err) {
          console.error('Error al parsear evidencias existentes de localStorage:', err);
        }
      }
      const updatedList = [newSubmission, ...existingList];
      localStorage.setItem('school_submissions', JSON.stringify(updatedList));
      localStorage.setItem('director_evidences', JSON.stringify(updatedList));
      localStorage.setItem('director_submissions', JSON.stringify(updatedList));
    } catch (err) {
      console.error('Error al guardar evidencia en localStorage:', err);
    }

    // Disparar evento global para actualización en tiempo real en los Dashboards del Director y Docente
    window.dispatchEvent(new Event('student_evidence_submitted'));
    window.dispatchEvent(new Event('global_system_updated'));
    
    toast.success('¡Evidencia enviada con éxito!', {
      description: 'El docente y director revisarán y validarán tu evidencia pronto.',
    });
    setModalOpen(false);
    setEvidenceText('');
  };

  // Sidebar Menu Items Definition
  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'ranking', label: 'Ranking', icon: Trophy },
    { id: 'salon', label: 'Mi salón', icon: Shield },
    { id: 'misiones', label: 'Misiones', icon: Target },
    { id: 'historial', label: 'Historial', icon: History },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans relative overflow-x-hidden">
      
      {/* ==========================================
          1. SIDEBAR (Deep Blue, Fixed Left)
          ========================================== */}
      <aside
        className={`w-64 bg-[#0A0F24] text-white flex flex-col justify-between shrink-0 transition-transform duration-300 z-40
          fixed md:sticky top-0 h-screen
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Top Branding Section */}
        <div className="p-6 border-b border-blue-900/30 flex items-center justify-between">
          <ImpulsaLogo />
          {/* Close Sidebar button on Mobile */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden p-1.5 rounded-lg bg-blue-950 text-blue-300 hover:text-white"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Section */}
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

        {/* Bottom Section (Purple Box) */}
        <div className="px-4 py-2 border-t border-blue-900/30">
          <div className="bg-[#1E1145] border border-purple-500/30 rounded-xl p-4 text-center shadow-md relative overflow-hidden group">
            {/* Ambient Purple Light Flare */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:scale-150 transition-all duration-500" />
            <div className="flex justify-center mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-900/50 border border-purple-500/30">
                <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
              </div>
            </div>
            <h4 className="text-xs font-bold text-white tracking-wide">Temporada 3</h4>
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
              <h4 className="text-xs font-bold text-white truncate leading-snug">10-02 Los Invencibles</h4>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-[11px] text-yellow-400 font-black">{myClassroomPoints.toLocaleString('es-CO')} pts</span>
              </div>
            </div>
            {/* Quick Logout Button */}
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900/40 transition-colors shrink-0"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for Mobile Sidebar */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-[#030712]/50 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* ==========================================
          2. MAIN CONTENT AREA (White Background)
          ========================================== */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          {/* Mobile hamburger menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
              aria-label="Abrir menú"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  ¡Buenos días! 10-02
                </h1>
                <span className="flex gap-0.5 text-base sm:text-lg animate-bounce duration-1000">👋👋</span>
              </div>
              <p className="text-xs text-slate-400 font-medium md:block hidden">Panel de Estudiante · Temporada activa</p>
            </div>
          </div>

          {/* Right Header items */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                toast.info('Tienes 3 notificaciones pendientes de revisión.');
              }}
              className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors group"
            >
              <Bell className="w-5 h-5 text-slate-600 group-hover:rotate-12 transition-transform" />
              <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-[#EF4444] text-[9px] text-white font-extrabold flex items-center justify-center rounded-full border-2 border-white">
                3
              </span>
            </button>
            
            <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
              <SchoolCrest className="w-8 h-8" />
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-slate-900 leading-tight">Colegio Mayor</p>
                <p className="text-[10px] font-semibold text-slate-400">Liga Superior</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic content rendering based on activeTab */}
        <main className="flex-1 p-6 space-y-8 max-w-6xl mx-auto w-full overflow-y-auto">
          
          {/* TAB 1: INICIO */}
          {activeTab === 'inicio' && (
            <>
              {/* Main Banner (Blue/Purple Gradient) */}
              <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-xl shadow-blue-500/10">
                {/* Ambient glow details inside banner */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 left-10 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />

                <div className="p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                 <div className="space-y-4 text-left max-w-lg">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-[10px] sm:text-xs font-extrabold tracking-wide uppercase">
                      {/* Se agregó ?. aquí */}
                      {BANNER_SLIDES[bannerIndex]?.tag} 
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight transition-all duration-300">
                      {/* Se agregó ?. aquí */}
                      {BANNER_SLIDES[bannerIndex]?.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-indigo-100 font-medium">
                      {/* Se agregó ?. aquí */}
                      {BANNER_SLIDES[bannerIndex]?.text}
                    </p>
                    <button
                      onClick={() => {
                        if (bannerIndex === 0) setActiveTab('ranking');
                        else if (bannerIndex === 1) setActiveTab('misiones');
                        else if (bannerIndex === 2) toast.info('Propuesta abierta para 10-02.');
                        else setActiveTab('misiones');
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-indigo-50 text-indigo-700 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
                    >
                      {/* Se agregó ?. aquí */}
                      <span>{BANNER_SLIDES[bannerIndex]?.buttonText}</span>
                    </button>
                </div>


                  <BannerTrophy />
                </div>

                {/* Pagination Dots */}
                <div className="pb-4 flex justify-center gap-2">
                  {BANNER_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setBannerIndex(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        bannerIndex === idx ? 'w-6 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/60'
                      }`}
                      aria-label={`Ir al banner ${idx + 1}`}
                    />
                  ))}
                </div>
              </section>

              {/* Actividad Reciente */}
              <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">Actividad reciente</h3>
                  <button
                    onClick={() => {
                      toast.info('Mostrando todo el historial de eventos.');
                      setActiveTab('historial');
                    }}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-0.5"
                  >
                    <span>Ver todas</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Activity List */}
                <div className="space-y-4">
                  {activities.map((act) => {
                    // Colored circular background map based on activity type
                    const iconStyle = {
                      target: { bg: 'bg-[#10B981]/10 text-[#10B981]', icon: Target },
                      trophy: { bg: 'bg-[#F59E0B]/10 text-[#F59E0B]', icon: Trophy },
                      megaphone: { bg: 'bg-[#8B5CF6]/10 text-[#8B5CF6]', icon: Megaphone },
                      barchart: { bg: 'bg-[#3B82F6]/10 text-[#3B82F6]', icon: BarChart3 },
                      crown: { bg: 'bg-[#EF4444]/10 text-[#EF4444]', icon: Crown },
                    }[act.type];

                    const IconComponent = iconStyle.icon;

                    return (
                      <div
                        key={act.id}
                        className="flex items-center justify-between p-3.5 bg-[#F8FAFC] border border-slate-100 rounded-2xl hover:border-slate-200 transition-all group"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          {/* Circular color badge icon */}
                          <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center ${iconStyle.bg} shadow-inner`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          
                          {/* Text description */}
                          <div className="text-left min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                              {act.text}
                            </h4>
                            <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate mt-0.5">
                              {act.subtext}
                            </p>
                          </div>
                        </div>

                        {/* Right Section: Time & Emojis */}
                        <div className="flex items-center gap-4 shrink-0 pl-2">
                          <span className="text-[10px] sm:text-xs text-slate-400 font-semibold whitespace-nowrap">
                            {act.time}
                          </span>
                          
                          {/* Emoji pill counter button */}
                          <button
                            onClick={() => handleReact(act.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all
                              ${act.reacted
                                ? 'bg-indigo-50 border-indigo-200 text-indigo-600 scale-105'
                                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                              }
                            `}
                          >
                            <span>{act.emoji}</span>
                            <span className="text-[11px]">{act.count}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Accesos rápidos */}
              <section className="space-y-4">
                <h3 className="text-lg font-black text-slate-900 tracking-tight text-left">Accesos rápidos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* Card 1: Misiones */}
                  <div className="bg-[#EBF7EE] border border-green-200 rounded-3xl p-5 flex flex-col justify-between items-start text-left min-h-[160px] relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                    <div className="absolute top-2 right-2 opacity-80 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                      <QuickAccessTargetSVG />
                    </div>
                    <div className="relative z-10 max-w-[65%] space-y-1.5">
                      <h4 className="text-base font-black text-[#1E4D2B]">Ver misiones</h4>
                      <p className="text-xs text-green-700/80 font-semibold leading-normal">
                        Descubre lo que pueden lograr.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('misiones')}
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-[#22C55E] hover:bg-[#16A34A] text-white transition-all shadow-md active:scale-95 group-hover:translate-x-1"
                      aria-label="Ir a misiones"
                    >
                      <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Card 2: Ranking */}
                  <div className="bg-[#FEF7E0] border border-yellow-200 rounded-3xl p-5 flex flex-col justify-between items-start text-left min-h-[160px] relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                    <div className="absolute top-2 right-2 opacity-80 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <QuickAccessTrophySVG />
                    </div>
                    <div className="relative z-10 max-w-[65%] space-y-1.5">
                      <h4 className="text-base font-black text-[#855B14]">Ir al ranking</h4>
                      <p className="text-xs text-yellow-800/80 font-semibold leading-normal">
                        Mira cómo va la competencia.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('ranking')}
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-[#EAB308] hover:bg-[#CA8A04] text-white transition-all shadow-md active:scale-95 group-hover:translate-x-1"
                      aria-label="Ir al ranking"
                    >
                      <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Card 3: Mi salón */}
                  <div className="bg-[#E8F0FE] border border-blue-200 rounded-3xl p-5 flex flex-col justify-between items-start text-left min-h-[160px] relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                    <div className="absolute top-2 right-2 opacity-80 group-hover:scale-110 transition-all duration-300">
                      <QuickAccessShieldSVG />
                    </div>
                    <div className="relative z-10 max-w-[65%] space-y-1.5">
                      <h4 className="text-base font-black text-[#1A4B8E]">Mi salón</h4>
                      <p className="text-xs text-blue-700/80 font-semibold leading-normal">
                        Conoce la historia de nuestro salón.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('salon')}
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-[#3B82F6] hover:bg-[#2563EB] text-white transition-all shadow-md active:scale-95 group-hover:translate-x-1"
                      aria-label="Ir a mi salón"
                    >
                      <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* TAB 2: RANKING */}
          {activeTab === 'ranking' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="text-left">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    Tabla de Competencia
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold">Temporada 3 · Los mejores colegios</p>
                </div>
                
                {/* Ranking toggle buttons */}
                <div className="flex bg-[#F1F5F9] p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setRankingFilter('season')}
                    className={`px-4 py-2 text-xs font-extrabold rounded-lg transition-all ${
                      rankingFilter === 'season'
                        ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/50'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Puntos Temporada
                  </button>
                  <button
                    onClick={() => setRankingFilter('league')}
                    className={`px-4 py-2 text-xs font-extrabold rounded-lg transition-all ${
                      rankingFilter === 'league'
                        ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/50'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Puntos de Liga
                  </button>
                </div>
              </div>

              {/* Leaderboard Table list */}
              <div className="space-y-3">
                {sortedClassrooms.map((item: any, index: number) => {
                  const rank = index + 1;
                  const isMe = item.id === '10-02';
                  const isLeader = index === 0;
                  const displayPoints = rankingFilter === 'season' ? item.points : item.points + 10000;

                  return (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all
                        ${isMe
                          ? 'bg-[#E8F0FE] border-blue-300 ring-2 ring-blue-400/20'
                          : 'bg-[#F8FAFC] border-slate-100 hover:border-slate-200'
                        }
                      `}
                    >
                      <div className="flex items-center gap-4 text-left">
                        {/* Rank Indicator */}
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shadow-inner
                          ${rank === 1 ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' : ''}
                          ${rank === 2 ? 'bg-slate-200 text-slate-700' : ''}
                          ${rank === 3 ? 'bg-amber-100 text-amber-800' : ''}
                          ${rank > 3 ? 'bg-slate-100 text-slate-500' : ''}
                        `}>
                          #{rank}
                        </span>

                        <div>
                          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                            <span>Grado {item.name || item.id}</span>
                            {isMe && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-600 text-white font-extrabold">
                                Tu salón
                              </span>
                            )}
                            {isLeader && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-400 text-yellow-950 font-black">
                                Líder 👑
                              </span>
                            )}
                          </h4>
                          <p className="text-[11px] text-slate-400 font-semibold">Colegio Mayor Primario</p>
                        </div>
                      </div>

                      <span className="text-sm font-black text-slate-800 pr-2">
                        {displayPoints.toLocaleString('es-CO')} pts
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Informative tips box */}
              <div className="flex gap-3 p-4 bg-[#EEF2F6] rounded-2xl border border-slate-200/50 text-left">
                <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-500 leading-relaxed">
                  <strong>Regla de clasificación:</strong> Los puntos de temporada se reinician al finalizar cada periodo (18 días restantes). Los puntos de liga se acumulan a lo largo de todo el ciclo escolar académico para declarar al campeón de liga.
                </p>
              </div>
            </section>
          )}

          {/* TAB 3: MI SALÓN */}
          {activeTab === 'salon' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                  Salón 10-02 - Los Invencibles
                </h3>
                <p className="text-xs text-slate-400 font-semibold">Tutor a cargo: Lic. Carlos Mendoza</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-[#F8FAFC] border border-slate-100 p-5 rounded-2xl">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400">Total Puntos Temporada</span>
                  <h4 className="text-2xl font-black text-slate-900 mt-1">{myClassroomPoints.toLocaleString('es-CO')} pts</h4>
                  <div className="w-full bg-slate-200 h-2 rounded-full mt-3 overflow-hidden">
                    <div
                      className="bg-yellow-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (myClassroomPoints / 10000) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">Meta mensual: 10.000 pts · Posición #{myClassroomRank}</p>
                </div>
                
                <div className="bg-[#F8FAFC] border border-slate-100 p-5 rounded-2xl">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400">Puntos de Liga Totales</span>
                  <h4 className="text-2xl font-black text-slate-900 mt-1">{(myClassroomPoints + 28000).toLocaleString('es-CO')} LP</h4>
                  <div className="w-full bg-slate-200 h-2 rounded-full mt-3 overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, ((myClassroomPoints + 28000) / 50000) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">Acumulado anual · {myClassroomApprovedMissions} misiones aprobadas</p>
                </div>

                <div className="bg-[#F8FAFC] border border-slate-100 p-5 rounded-2xl">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400">Títulos Descubiertos</span>
                  <h4 className="text-2xl font-black text-slate-900 mt-1">{myClassroomApprovedMissions > 40 ? '4 Títulos' : '3 Secretos'}</h4>
                  <div className="flex gap-1.5 mt-3.5">
                    <span className="text-base" title="Guardianes Eco">🌱</span>
                    <span className="text-base" title="Lectores Pro">📚</span>
                    <span className="text-base" title="Salón Impecable">✨</span>
                    {myClassroomApprovedMissions > 40 && <span className="text-base" title="Líderes de Desafío">🏆</span>}
                  </div>
                </div>
              </div>

              {/* Members List */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-800">Mejores Aportadores del Salón</h4>
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden bg-[#F8FAFC]">
                  {[
                    { name: 'Diana Valderrama', points: '+1.450 pts', badge: '🎖️ MVP Ambiental' },
                    { name: 'Felipe Ordóñez', points: '+1.200 pts', badge: '🎓 Experto Lector' },
                    { name: 'Sofía Pinzón', points: '+950 pts', badge: '⚡ Colaboradora Activa' },
                  ].map((member, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3.5">
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-slate-800">{member.name}</p>
                        <span className="text-[10px] font-bold text-indigo-500">{member.badge}</span>
                      </div>
                      <span className="text-xs font-black text-emerald-600">{member.points}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* TAB 4: MISIONES */}
          {activeTab === 'misiones' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Target className="w-6 h-6 text-emerald-500" />
                  Misiones de Temporada
                </h3>
                <p className="text-xs text-slate-400 font-semibold">Completa las tareas de tu salón para sumar puntos colectivos</p>
              </div>

              {/* Missions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {missionsList.map((mission) => {
                  const isActive = mission.status === 'active';
                  const isReview = mission.status === 'in_review';
                  const isCompleted = mission.status === 'completed';

                  return (
                    <div
                      key={mission.id}
                      className="bg-[#F8FAFC] border border-slate-100 p-5 rounded-2xl flex flex-col justify-between min-h-[180px] shadow-sm hover:border-slate-200 transition-all"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-200/50 text-slate-500">
                            {mission.badge}
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold">
                            {mission.category}
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-black text-slate-800 leading-tight">
                          {mission.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 font-medium">
                          Gana <span className="text-indigo-600 font-bold">+{mission.points} pts</span> de temporada.
                        </p>
                      </div>

                      {/* Bottom action container */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-400 font-bold">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{mission.timeRemaining}</span>
                        </div>

                        {isActive && (
                          <button
                            onClick={() => handleOpenEvidenceModal(mission)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-50 text-white text-[11px] font-bold rounded-xl transition-all shadow-sm shadow-indigo-600/10"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Subir evidencia</span>
                          </button>
                        )}

                        {isReview && (
                          <span className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-bold rounded-xl">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Evaluando</span>
                          </span>
                        )}

                        {isCompleted && (
                          <span className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold rounded-xl">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Aprobado</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* TAB 5: HISTORIAL */}
          {activeTab === 'historial' && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <History className="w-6 h-6 text-slate-600" />
                  Historial de Logros del Salón
                </h3>
                <p className="text-xs text-slate-400 font-semibold">Listado cronológico de misiones aprobadas y eventos</p>
              </div>

              {/* Timeline layout */}
              <div className="relative pl-6 border-l border-slate-100 space-y-8">
                {[
                  {
                    title: 'Misión Épica: Lectores Imparables Aprobada',
                    points: '+1200 Pts',
                    desc: 'Salón completó la lectura de 30 libros en el mes académico.',
                    date: 'Hace 32 min',
                    icon: CheckCircle2,
                    color: 'text-emerald-500 bg-emerald-50',
                  },
                  {
                    title: 'Subimos a 3.er Puesto en Temporada',
                    points: 'Hito de Salón',
                    desc: 'Logramos superar a 9-01 tras sumar los puntos de reciclaje.',
                    date: 'Hace 2 horas',
                    icon: Award,
                    color: 'text-indigo-500 bg-indigo-50',
                  },
                  {
                    title: 'Bono de Participación en Día del Colegio',
                    points: '+400 Pts',
                    desc: 'Salón participó activamente en los eventos deportivos intercursos.',
                    date: 'Ayer',
                    icon: Star,
                    color: 'text-amber-500 bg-amber-50',
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="relative">
                      {/* Timeline dot */}
                      <span className={`absolute -left-[35px] top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white ${item.color} shadow-sm`}>
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-1">
                        <div>
                          <h4 className="text-xs sm:text-sm font-black text-slate-800 leading-tight">
                            {item.title}
                          </h4>
                          <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">
                            {item.desc}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[11px] sm:text-xs font-black text-slate-800 block">
                            {item.points}
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold">
                            {item.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-6 text-center shrink-0">
          <p className="text-xs sm:text-sm text-slate-500 font-semibold flex items-center justify-center gap-1">
            <span>Impulsa lo mejor de ti. Impulsa a tu salón.</span>
            <span className="text-rose-500 animate-pulse">❤️</span>
            <span className="text-blue-500 shrink-0">🚀</span>
          </p>
        </footer>

      </div>

      {/* ==========================================
          3. EVIDENCE UPLOAD MODAL
          ========================================== */}
      {modalOpen && selectedMission && (
        <div className="fixed inset-0 bg-[#020617]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Subir Evidencias
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1.5 leading-snug">
                  {selectedMission.title}
                </h3>
                <p className="text-xs text-slate-400 font-semibold">
                  Misión {selectedMission.badge} · +{selectedMission.points} pts
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEvidenceSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Descripción del cumplimiento
                </label>
                <textarea
                  required
                  rows={3}
                  value={evidenceText}
                  onChange={(e) => setEvidenceText(e.target.value)}
                  placeholder="Explica detalladamente cómo tu salón completó la misión..."
                  className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Drag zone mock */}
              <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-5 text-center bg-[#F8FAFC]/50 hover:bg-indigo-50/10 transition-colors cursor-pointer space-y-2">
                <Upload className="w-6 h-6 text-indigo-500 mx-auto" />
                <p className="text-xs font-bold text-slate-700">Arrastra fotos o haz clic para subir</p>
                <p className="text-[10px] text-slate-400">JPG, PNG o PDF · Máximo 15 MB</p>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 font-medium">Revisión docente en máx 48h</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-indigo-600/10"
                  >
                    Enviar Evidencia
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};