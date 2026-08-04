import React from 'react';
import { Header } from '../../components/ui/Header';
import { Award, BookOpen, CheckCircle2, Flame } from 'lucide-react';

export const EstudianteDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header title="Panel Estudiantil" roleLabel="Estudiante" />
      
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-blue-600/20 text-blue-400 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Clase Actual</p>
              <h3 className="text-lg font-bold">11° Grado - Grupo A</h3>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-amber-600/20 text-amber-400 rounded-lg">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Season Points</p>
              <h3 className="text-2xl font-extrabold text-amber-400">1,450 PTS</h3>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-lg">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">League Points</p>
              <h3 className="text-2xl font-extrabold text-indigo-400">820 LP</h3>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-400" />
            Misiones Activas
          </h2>
          <div className="space-y-3">
            {[
              { id: 1, title: 'Proyecto de Programación React', exp: '+300 PTS', status: 'En Progreso' },
              { id: 2, title: 'Lectura de Algoritmos Complejos', exp: '+150 PTS', status: 'Pendiente' },
            ].map((mission) => (
              <div key={mission.id} className="flex justify-between items-center p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <div>
                  <h4 className="font-semibold text-slate-200">{mission.title}</h4>
                  <span className="text-xs text-indigo-400 font-semibold">{mission.exp}</span>
                </div>
                <span className="px-3 py-1 bg-indigo-950 text-indigo-300 text-xs rounded-full border border-indigo-800/50">
                  {mission.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};