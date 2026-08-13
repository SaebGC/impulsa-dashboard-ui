import React from 'react';
import { Users, Target, Clock, Award, TrendingUp } from 'lucide-react';
import { ClassroomKPIs } from '../../types/director';

interface ClassroomMetricsProps {
  kpis: ClassroomKPIs;
}

export const ClassroomMetrics: React.FC<ClassroomMetricsProps> = ({ kpis }) => {
  const cards = [
    {
      title: 'Cumplimiento del Salón',
      value: `${kpis.completionRate}%`,
      subtitle: 'Tasa promedio de entrega',
      icon: TrendingUp,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
    {
      title: 'Estudiantes Inscritos',
      value: kpis.totalStudents,
      subtitle: `Pertenece a Salón ${kpis.classroomName}`,
      icon: Users,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
    },
    {
      title: 'Misiones Activas',
      value: kpis.activeMissions,
      subtitle: 'Publicadas en este salón',
      icon: Target,
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/10',
      borderColor: 'border-sky-500/20',
    },
    {
      title: 'Revisiones Pendientes',
      value: kpis.pendingReviews,
      subtitle: 'Por validar',
      icon: Clock,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
    {
      title: 'Puntos Otorgados',
      value: kpis.totalPointsAwarded.toLocaleString(),
      subtitle: 'Acumulado del grupo',
      icon: Award,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className={`p-4 rounded-2xl bg-gray-900 border ${card.borderColor} shadow-lg flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-400">{card.title}</span>
                <div className={`p-2 rounded-xl ${card.bgColor} ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <span className="text-2xl font-bold text-white tracking-tight">{card.value}</span>
                <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};