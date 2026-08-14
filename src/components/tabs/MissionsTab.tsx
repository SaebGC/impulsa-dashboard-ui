import React, { useState, useMemo } from 'react';
import {
  Plus,
  Target,
  Calendar,
  Award,
  Trash2,
  Link as LinkIcon,
  Image as ImageIcon,
  Type,
  Clock,
  CheckCircle2,
  ShieldAlert,
  Users,
  Archive,
  CheckSquare
} from 'lucide-react';
import { Mission } from '../../types/director';

interface MissionsTabProps {
  missions: Mission[];
  onOpenCreateModal: () => void;
  onDeleteMission?: (id: string) => void;
  classroomId?: string;
  totalStudents?: number;
}

export const MissionsTab: React.FC<MissionsTabProps> = ({
  missions,
  onOpenCreateModal,
  onDeleteMission,
  classroomId = '10-02',
  totalStudents = 28,
}) => {
  const [activeTabFilter, setActiveTabFilter] = useState<'active' | 'completed' | 'all'>('active');

  // Filter missions belonging to this specific classroom
  const classroomMissions = useMemo(() => {
    return missions.filter(
      (m: any) => !m.classroomId || m.classroomId === classroomId
    );
  }, [missions, classroomId]);

  // Active missions helper
  const isMissionActive = (status?: string) => {
    const s = (status || '').toUpperCase();
    return s === 'ACTIVE' || s === 'IN_PROGRESS';
  };

  const activeMissions = useMemo(() => {
    return classroomMissions.filter((m) => isMissionActive(m.status));
  }, [classroomMissions]);

  const finishedMissions = useMemo(() => {
    return classroomMissions.filter((m) => !isMissionActive(m.status));
  }, [classroomMissions]);

  const displayedMissions = useMemo(() => {
    if (activeTabFilter === 'active') return activeMissions;
    if (activeTabFilter === 'completed') return finishedMissions;
    return classroomMissions;
  }, [activeTabFilter, activeMissions, finishedMissions, classroomMissions]);

  // Dynamic calculation of completed students per mission from localStorage
  const getCompletedStudentCount = (missionId: string, missionTitle: string) => {
    try {
      const stored =
        localStorage.getItem('school_submissions') ||
        localStorage.getItem('director_evidences');
      if (!stored) return 0;
      const submissions = JSON.parse(stored);
      const matches = submissions.filter(
        (s: any) =>
          (s.missionId === missionId || s.missionTitle === missionTitle) &&
          (s.classroomId === classroomId || !s.classroomId) &&
          (s.status || '').toUpperCase() === 'APPROVED'
      );
      const uniqueStudents = new Set(
        matches.map((s: any) => s.studentId || s.studentName)
      );
      return uniqueStudents.size;
    } catch (e) {
      return 0;
    }
  };

  const getEvidenceIcon = (type?: Mission['evidenceType']) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="w-3.5 h-3.5" />;
      case 'text':
        return <Type className="w-3.5 h-3.5" />;
      case 'link':
      default:
        return <LinkIcon className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Interactive Tabs / Filter Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTabFilter('active')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTabFilter === 'active'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Misiones Activas</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                activeTabFilter === 'active'
                  ? 'bg-white/20 text-white'
                  : 'bg-indigo-100 text-indigo-700'
              }`}
            >
              {activeMissions.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTabFilter('completed')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTabFilter === 'completed'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Finalizadas</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                activeTabFilter === 'completed'
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {finishedMissions.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTabFilter('all')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTabFilter === 'all'
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            Todas ({classroomMissions.length})
          </button>
        </div>

        <button
          type="button"
          onClick={onOpenCreateModal}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-md shadow-indigo-600/20 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Misión</span>
        </button>
      </div>

      {/* Missions Grid */}
      {displayedMissions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mx-auto">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">
            {activeTabFilter === 'active'
              ? 'No hay misiones activas en este salón'
              : activeTabFilter === 'completed'
              ? 'No hay misiones finalizadas'
              : 'No hay misiones registradas'}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm">
            Asigna nuevos retos académicos o comunitarios a tus alumnos del grupo {classroomId}.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedMissions.map((mission: any) => {
            const isActive = isMissionActive(mission.status);
            const completedCount = getCompletedStudentCount(mission.id, mission.title);
            const category = mission.category || 'Académica';

            return (
              <div
                key={mission.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition shadow-sm hover:shadow-md flex flex-col justify-between group space-y-4 text-left"
              >
                <div className="space-y-2">
                  {/* Header Badges */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {category}
                      </span>
                      {mission.isMandatory && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-rose-100 text-rose-700 border border-rose-200/80 flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3 text-rose-600 shrink-0" />
                          Obligatoria
                        </span>
                      )}
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {isActive ? (
                        <>
                          <Clock className="w-3 h-3 text-emerald-600" />
                          Activa
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-slate-500" />
                          Finalizada
                        </>
                      )}
                    </span>
                  </div>

                  {/* Mission Title */}
                  <h4 className="text-base font-black text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors">
                    {mission.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {mission.description}
                  </p>
                </div>

                {/* Mission Details & Stats */}
                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1 font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-100">
                      <Award className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>+{mission.points} pts</span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{mission.dueDate || 'En 7 días'}</span>
                    </div>
                  </div>

                  {/* Submission Statistics */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-bold">
                      <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>
                        {completedCount}/{totalStudents} Estudiantes completaron
                      </span>
                    </div>

                    {onDeleteMission && (
                      <button
                        type="button"
                        onClick={() => onDeleteMission(mission.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Eliminar misión"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};