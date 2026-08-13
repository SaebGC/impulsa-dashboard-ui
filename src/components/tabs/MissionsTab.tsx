import React, { useState } from 'react';
import { Plus, Target, Calendar, Award, Trash2, Link as LinkIcon, Image as ImageIcon, Type, Clock } from 'lucide-react';
import { Mission } from '../../types/director';

interface MissionsTabProps {
  missions: Mission[];
  onOpenCreateModal: () => void;
  onDeleteMission?: (id: string) => void;
}

export const MissionsTab: React.FC<MissionsTabProps> = ({
  missions,
  onOpenCreateModal,
  onDeleteMission,
}) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredMissions = missions.filter((mission) => {
    if (filter === 'active') return mission.status === 'active';
    if (filter === 'completed') return mission.status === 'completed';
    return true;
  });

  const getEvidenceIcon = (type: Mission['evidenceType']) => {
    switch (type) {
      case 'link':
        return <LinkIcon className="w-3.5 h-3.5" />;
      case 'image':
        return <ImageIcon className="w-3.5 h-3.5" />;
      case 'text':
        return <Type className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {(['all', 'active', 'completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
                filter === status
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-gray-200'
              }`}
            >
              {status === 'all' ? 'Todas' : status === 'active' ? 'Activas' : 'Finalizadas'}
            </button>
          ))}
        </div>

        <button
          onClick={onOpenCreateModal}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/25 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Misión</span>
        </button>
      </div>

      {/* Missions Grid */}
      {filteredMissions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-gray-900 border border-gray-800 text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No hay misiones registradas</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-sm">
            Crea la primera misión para este salón para empezar a asignar tareas y recompensas a tus estudiantes.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMissions.map((mission) => (
            <div
              key={mission.id}
              className="p-5 rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition shadow-lg flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                      mission.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-gray-800 text-gray-400 border-gray-700'
                    }`}
                  >
                    {mission.status === 'active' ? 'Activa' : 'Finalizada'}
                  </span>

                  <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-semibold bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                    {getEvidenceIcon(mission.evidenceType)}
                    <span className="capitalize">{mission.evidenceType}</span>
                  </div>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition">
                  {mission.title}
                </h4>
                <p className="text-xs text-gray-400 mt-1.5 line-clamp-3 leading-relaxed">
                  {mission.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <Award className="w-4 h-4" />
                  <span>+{mission.points} pts</span>
                </div>

                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  <span>{mission.dueDate}</span>
                </div>

                {onDeleteMission && (
                  <button
                    onClick={() => onDeleteMission(mission.id)}
                    className="p-1 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                    title="Eliminar misión"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};