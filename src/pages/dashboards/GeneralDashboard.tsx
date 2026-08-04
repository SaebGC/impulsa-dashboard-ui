import React, { useState, useEffect } from 'react';
import { Header } from '../../components/ui/Header';
import {
  Trophy,
  Flame,
  Award,
  TrendingUp,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  Upload,
  PlusCircle,
  X,
  FileText,
  ShieldAlert,
  Sparkles,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { toast } from 'sonner';

interface Mission {
  id: string;
  type: 'comun' | 'especial' | 'epica' | 'legendaria' | 'relampago';
  badgeLabel: string;
  category: 'Ambiental' | 'Deportiva' | 'Académica' | 'Cultural' | 'Convivencia';
  title: string;
  description: string;
  timeRemaining: string;
  urgent?: boolean;
  rewardPoints: number;
  isEpicOrLegendary?: boolean;
  status: 'active' | 'in_review' | 'approved';
}

const INITIAL_MISSIONS: Mission[] = [
  {
    id: 'm1',
    type: 'comun',
    badgeLabel: 'Común',
    category: 'Ambiental',
    title: 'Reciclatón de aula',
    description: 'Recolecta y clasifica 15 kg de material reciclable durante la semana.',
    timeRemaining: '3 días 12 h',
    rewardPoints: 300,
    status: 'active',
  },
  {
    id: 'm2',
    type: 'especial',
    badgeLabel: 'Especial',
    category: 'Deportiva',
    title: 'Torneo relámpago de microfútbol',
    description: 'Inscribe un equipo mixto y participa en la fase de grupos intercursos.',
    timeRemaining: '5 días',
    rewardPoints: 650,
    status: 'active',
  },
  {
    id: 'm3',
    type: 'epica',
    badgeLabel: 'Épica',
    category: 'Académica',
    title: 'Feria de ciencia e innovación',
    description: 'Presenta un prototipo funcional con informe y sustentación ante el jurado.',
    timeRemaining: '12 días',
    rewardPoints: 1800,
    isEpicOrLegendary: true,
    status: 'active',
  },
  {
    id: 'm4',
    type: 'legendaria',
    badgeLabel: 'Legendaria',
    category: 'Cultural',
    title: 'Montaje artístico "Raíces vivas"',
    description: 'Puesta en escena de 20 minutos con guion original y participación de todo el salón.',
    timeRemaining: '21 días',
    rewardPoints: 3000,
    isEpicOrLegendary: true,
    status: 'active',
  },
  {
    id: 'm5',
    type: 'relampago',
    badgeLabel: '⚡ Relámpago',
    category: 'Convivencia',
    title: 'Aula impecable sorpresa',
    description: 'Inspección sorpresa de orden y aseo. Válida solo por hoy.',
    timeRemaining: '04 h 18 min',
    urgent: true,
    rewardPoints: 450,
    status: 'active',
  },
  {
    id: 'm6',
    type: 'comun',
    badgeLabel: 'Común',
    category: 'Ambiental',
    title: 'Punto verde del pasillo',
    description: 'Instalación y señalización del punto de acopio asignado al salón.',
    timeRemaining: 'En evaluación',
    rewardPoints: 250,
    status: 'in_review',
  },
];

const RANKING_SEASON = [
  { rank: 1, classroom: '11°B', points: '15.590', diff: '—', isFirst: true },
  { rank: 2, classroom: '10°A', points: '14.350', diff: '-1.240', isMe: true },
  { rank: 3, classroom: '9°C', points: '13.870', diff: '-1.720' },
  { rank: 4, classroom: '10°B', points: '12.410', diff: '-3.180' },
  { rank: 5, classroom: '8°A', points: '11.905', diff: '-3.685' },
  { rank: 6, classroom: '11°A', points: '10.240', diff: '-5.350' },
  { rank: 7, classroom: '9°A', points: '9.780', diff: '-5.810' },
];

const RANKING_LEAGUE = [
  { rank: 1, classroom: '9°C', points: '52.300', diff: '—', isFirst: true },
  { rank: 2, classroom: '10°A', points: '48.920', diff: '-3.380', isMe: true },
  { rank: 3, classroom: '11°B', points: '47.150', diff: '-5.150' },
  { rank: 4, classroom: '10°B', points: '43.880', diff: '-8.420' },
  { rank: 5, classroom: '11°A', points: '40.010', diff: '-12.290' },
  { rank: 6, classroom: '8°A', points: '38.460', diff: '-13.840' },
  { rank: 7, classroom: '9°A', points: '35.720', diff: '-16.580' },
];

export const GeneralDashboard: React.FC = () => {
  const [userRole, setUserRole] = useState<string>('Estudiante');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'season' | 'league'>('season');
  const [selectedSeason, setSelectedSeason] = useState<string>('s1');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  const [evidenceDesc, setEvidenceDesc] = useState<string>('');
  const [evidenceType, setEvidenceType] = useState<string>('Fotografías');
  const [responsibleName, setResponsibleName] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Missions state
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  const isAdmin = userRole === 'Administrador';
  const isTeacherOrDirector = userRole === 'Docente' || userRole === 'Director de Grupo' || isAdmin;
  const isStudent = userRole === 'Estudiante';

  // Open modal for uploading evidence
  const handleOpenEvidenceModal = (mission: Mission) => {
    setActiveMission(mission);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveMission(null);
    setEvidenceDesc('');
    setResponsibleName('');
    setSelectedFiles([]);
  };

  const handleEvidenceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMission) return;

    // Update status to in_review
    setMissions((prev) =>
      prev.map((m) => (m.id === activeMission.id ? { ...m, status: 'in_review' } : m))
    );

    toast.success('Evidencia enviada con éxito', {
      description: `La coordinación validará la evidencia de "${activeMission.title}" en máximo 48h.`,
    });

    handleCloseModal();
  };

  const handleValidateEvidence = (missionId: string) => {
    setMissions((prev) =>
      prev.map((m) => (m.id === missionId ? { ...m, status: 'approved' } : m))
    );
    toast.success('Evidencia validada y aprobada', {
      description: 'Los puntos han sido sumados al salón 10°A.',
    });
  };

  const handleCreateMission = () => {
    toast.info('Modo Creación de Misión', {
      description: 'Como docente/administrador, puedes configurar misiones en el panel académico.',
    });
  };

  // Filtered missions
  const filteredMissions = missions.filter((m) => {
    const matchesCategory =
      selectedCategory === 'todas' ||
      m.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      <Header title="Estadísticas y Tabla General de Liga" roleLabel={userRole} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        {/* Banner de Salón & Temporada */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 font-black text-xl text-white shadow-lg shadow-indigo-600/30">
              10A
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">Grado 10°A</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Tu Salón
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Director de grupo: <strong className="text-slate-300">Prof. García</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-950/70 border border-slate-800 rounded-xl px-3.5 py-2">
              <label htmlFor="season-select" className="text-xs text-slate-400 font-medium whitespace-nowrap">
                Temporada:
              </label>
              <select
                id="season-select"
                value={selectedSeason}
                disabled={!isAdmin}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className={`bg-transparent text-sm font-semibold text-slate-200 focus:outline-none ${
                  !isAdmin ? 'cursor-not-allowed opacity-90' : 'cursor-pointer'
                }`}
              >
                <option value="s1" className="bg-slate-900">Temporada 1 · Periodo 1</option>
                <option value="s2" className="bg-slate-900">Temporada 2 · Periodo 2</option>
                <option value="s3" className="bg-slate-900">Temporada 3 · Periodo 3</option>
                <option value="s4" className="bg-slate-900">Temporada 4 · Periodo 4</option>
              </select>
            </div>

            {isTeacherOrDirector && (
              <button
                onClick={handleCreateMission}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-indigo-600/20"
              >
                <PlusCircle className="w-4 h-4" />
                Crear Misión
              </button>
            )}
          </div>
        </div>

        {/* KPIs Principales */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6" aria-label="Métricas de Temporada y Liga">
          {/* Puntos de Temporada */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg hover:border-slate-700 transition-all">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Flame className="w-4 h-4 text-indigo-400" /> Puntos de Temporada
              </span>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Periodo 1
              </span>
            </div>
            <div>
              <p className="text-3xl font-black text-white">
                14.350 <span className="text-sm font-semibold text-slate-400">/ 20.000 pts</span>
              </p>
              <div className="w-full bg-slate-950 rounded-full h-2.5 mt-3 overflow-hidden border border-slate-800">
                <div className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500" style={{ width: '71.7%' }}></div>
              </div>
            </div>
            <ul className="text-xs space-y-1.5 text-slate-400 pt-1 border-t border-slate-800/80">
              <li className="flex justify-between">
                <span>Misiones de Aula:</span> <strong className="text-indigo-300">9.100 / 12.000</strong>
              </li>
              <li className="flex justify-between">
                <span>Institucionales:</span> <strong className="text-purple-300">5.250 / 8.000</strong>
              </li>
            </ul>
          </div>

          {/* Puntos de Liga */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg hover:border-slate-700 transition-all">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" /> Puntos de Liga
              </span>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Año lectivo
              </span>
            </div>
            <div>
              <p className="text-3xl font-black text-amber-400">
                48.920 <span className="text-xs font-semibold text-slate-400">pts acumulados</span>
              </p>
              <div className="w-full bg-slate-950 rounded-full h-2.5 mt-3 overflow-hidden border border-slate-800">
                <div className="bg-amber-400 h-2.5 rounded-full transition-all duration-500" style={{ width: '62%' }}></div>
              </div>
            </div>
            <div className="text-xs text-slate-400 pt-1 border-t border-slate-800/80 flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> +2.480 pts
              </span>
              <span>en los últimos 7 días</span>
            </div>
          </div>

          {/* Posición en Ranking */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg hover:border-slate-700 transition-all">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-emerald-400" /> Posición en Ranking
              </span>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Estable
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-3xl font-black">
                #2
              </div>
              <div className="space-y-0.5">
                <strong className="text-base font-bold text-white block">2.º de 18 salones</strong>
                <p className="text-xs text-slate-400">A <span className="text-emerald-300 font-semibold">1.240 pts</span> del 1.º puesto</p>
                <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  ▲ Subiste 1 posición
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Layout Principal: Misiones y Rankings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Izquierda / Central: Misiones Activas (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  Misiones Activas
                </h2>
                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar misión..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs placeholder:text-slate-500 text-slate-200 focus:outline-none focus:border-indigo-500 w-full sm:w-64"
                  />
                </div>
              </div>

              {/* Categorías (Filtros) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {['todas', 'Ambiental', 'Deportiva', 'Académica', 'Cultural', 'Convivencia'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
                      selectedCategory.toLowerCase() === cat.toLowerCase()
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Tarjetas de Misiones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredMissions.map((mission) => {
                const isReview = mission.status === 'in_review';
                const isApproved = mission.status === 'approved';

                return (
                  <div
                    key={mission.id}
                    className={`bg-slate-900/90 border rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-lg transition-all ${
                      mission.type === 'legendaria'
                        ? 'border-amber-500/40 bg-amber-950/10'
                        : mission.type === 'epica'
                        ? 'border-indigo-500/40 bg-indigo-950/10'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                            mission.type === 'legendaria'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                              : mission.type === 'epica'
                              ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                              : mission.type === 'relampago'
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                              : 'bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                        >
                          {mission.badgeLabel}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">{mission.category}</span>
                      </div>

                      <h3 className="text-base font-bold text-white">{mission.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{mission.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock className={`w-3.5 h-3.5 ${mission.urgent ? 'text-rose-400 animate-pulse' : 'text-slate-400'}`} />
                        <span className={mission.urgent ? 'text-rose-300 font-bold' : ''}>
                          {mission.timeRemaining}
                        </span>
                      </div>

                      <span className="text-xs font-black text-indigo-400">+{mission.rewardPoints} pts</span>
                    </div>

                    {/* Botones de Acción segun Rol y Estado */}
                    <div className="pt-2 flex items-center gap-2">
                      {isApproved ? (
                        <span className="w-full py-2 bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 text-xs font-semibold rounded-xl text-center flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Aprobada
                        </span>
                      ) : isReview ? (
                        <div className="w-full flex items-center justify-between gap-2">
                          <span className="py-2 px-3 bg-amber-950/50 text-amber-300 border border-amber-800/40 text-xs font-semibold rounded-xl flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> En Validación
                          </span>
                          {isTeacherOrDirector && (
                            <button
                              onClick={() => handleValidateEvidence(mission.id)}
                              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-colors"
                            >
                              Validar
                            </button>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => handleOpenEvidenceModal(mission)}
                          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1"
                        >
                          <Upload className="w-3.5 h-3.5" /> Subir Evidencias
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Banner Proyecto X */}
            <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/40 via-slate-900 to-indigo-950/50 p-6 shadow-2xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <span className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Evento Especial de Temporada
                  </span>
                  <h3 className="text-2xl font-black text-white">
                    Proyecto <span className="text-amber-400">X</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Cada salón propone una iniciativa de alto impacto institucional. La propuesta ganadora otorga un bono histórico de <strong className="text-amber-300">5.000 Puntos de Liga</strong>.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                  <button
                    onClick={() => toast.info('Postulación de Proyecto X', { description: 'Completa la propuesta para tu salón 10°A.' })}
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors text-center shadow-lg shadow-amber-500/20"
                  >
                    Postular Propuesta
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Rankings & Estado (1 col) */}
          <div className="space-y-6">
            {/* Tabla de Ranking */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" /> Ranking de Salones
                </h3>
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setActiveTab('season')}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                      activeTab === 'season' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Temporada
                  </button>
                  <button
                    onClick={() => setActiveTab('league')}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                      activeTab === 'league' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Liga
                  </button>
                </div>
              </div>

              {/* Tabla */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-800">
                      <th className="pb-2">#</th>
                      <th className="pb-2">Salón</th>
                      <th className="pb-2 text-right">Puntos</th>
                      <th className="pb-2 text-right">Dif 1.º</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {(activeTab === 'season' ? RANKING_SEASON : RANKING_LEAGUE).map((item) => (
                      <tr
                        key={item.rank}
                        className={`transition-colors ${
                          item.isMe ? 'bg-indigo-950/40 font-bold text-white' : 'hover:bg-slate-800/40 text-slate-300'
                        }`}
                      >
                        <td className="py-2.5 font-bold">
                          <span
                            className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] ${
                              item.rank === 1
                                ? 'bg-amber-500/20 text-amber-300 font-extrabold border border-amber-500/40'
                                : item.rank === 2
                                ? 'bg-slate-700 text-slate-200'
                                : 'text-slate-400'
                            }`}
                          >
                            {item.rank}
                          </span>
                        </td>
                        <td className="py-2.5 flex items-center gap-1.5">
                          {item.classroom}
                          {item.isMe && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              Tu salón
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 text-right font-semibold">{item.points}</td>
                        <td className="py-2.5 text-right text-slate-400">{item.diff}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Resumen de Validación */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-3">
              <h4 className="text-sm font-bold text-white">Estado de Validación del Salón</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex justify-between items-center p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="flex items-center gap-2 text-emerald-400 font-medium">
                    <CheckCircle2 className="w-4 h-4" /> Aprobadas
                  </span>
                  <strong className="text-white font-bold">12</strong>
                </li>
                <li className="flex justify-between items-center p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="flex items-center gap-2 text-amber-400 font-medium">
                    <Clock className="w-4 h-4" /> En Validación
                  </span>
                  <strong className="text-white font-bold">3</strong>
                </li>
                <li className="flex justify-between items-center p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="flex items-center gap-2 text-rose-400 font-medium">
                    <AlertCircle className="w-4 h-4" /> Rechazadas
                  </span>
                  <strong className="text-white font-bold">1</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Subir Evidencias */}
      {isModalOpen && activeMission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-5">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Subir Evidencias
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{activeMission.title}</h3>
                <p className="text-xs text-slate-400">{activeMission.category} · +{activeMission.rewardPoints} pts</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEvidenceSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Descripción de la evidencia
                </label>
                <textarea
                  required
                  rows={3}
                  value={evidenceDesc}
                  onChange={(e) => setEvidenceDesc(e.target.value)}
                  placeholder="Cuenta qué hizo el salón y cómo se cumplió la misión..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Tipo de evidencia</label>
                  <select
                    value={evidenceType}
                    onChange={(e) => setEvidenceType(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option>Fotografías</option>
                    <option>Video</option>
                    <option>Documento / informe</option>
                    <option>Enlace externo</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Responsable del salón</label>
                  <input
                    type="text"
                    required
                    value={responsibleName}
                    onChange={(e) => setResponsibleName(e.target.value)}
                    placeholder="Nombre del estudiante"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* File Dropzone */}
              <div className="border-2 border-dashed border-slate-800 rounded-2xl p-6 text-center space-y-2 hover:border-slate-700 transition-colors cursor-pointer bg-slate-950/40">
                <Upload className="w-6 h-6 text-indigo-400 mx-auto" />
                <p className="text-xs font-semibold text-slate-200">
                  Arrastra tus archivos o haz clic para seleccionarlos
                </p>
                <p className="text-[11px] text-slate-500">JPG, PNG, PDF o MP4 · máx. 25 MB</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                <span className="text-[11px] text-slate-500">
                  Validación en máx. 48 h
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors shadow-md shadow-indigo-600/20"
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
