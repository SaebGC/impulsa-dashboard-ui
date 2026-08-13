import React from 'react';
import { School, Users, Target, CheckCircle, BarChart2 } from 'lucide-react';
import { TabType } from '../../types/director';

interface ClassroomHeaderProps {
  directorName?: string;
  classroomId?: string;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  pendingReviewsCount: number;
}

export const ClassroomHeader: React.FC<ClassroomHeaderProps> = ({
  directorName = 'Director de Grupo',
  classroomId = '10-02',
  activeTab,
  onTabChange,
  pendingReviewsCount,
}) => {
  const tabs = [
    { id: 'metrics' as TabType, label: 'Métricas', icon: BarChart2 },
    { id: 'missions' as TabType, label: 'Misiones', icon: Target },
    {
      id: 'reviews' as TabType,
      label: 'Revisiones',
      icon: CheckCircle,
      badge: pendingReviewsCount > 0 ? pendingReviewsCount : null,
    },
    { id: 'students' as TabType, label: 'Estudiantes', icon: Users },
  ];

  return (
    <header className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-gray-900 via-indigo-950/40 to-gray-900 border border-gray-800 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <School className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">{directorName}</h1>
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Salón {classroomId}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Gestión académica y seguimiento de evidencias exclusivas de este salón.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-800 overflow-x-auto pb-1">
        {tabs.map(({ id, label, icon: Icon, badge }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition whitespace-nowrap ${
              activeTab === id
                ? 'bg-indigo-600/20 border border-indigo-500/40 text-indigo-300'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
            {badge && (
              <span className="ml-1 px-1.5 py-0.5 text-xs font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </header>
  );
};