import React from 'react';
import { Header } from '../../components/ui/Header';
import { FileCheck, FolderPlus } from 'lucide-react';

export const DirectorDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header title="Gestión de Dirección" roleLabel="Director de Grupo" />
      
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Gestión de Misiones de Clase</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-semibold transition-colors">
            <FolderPlus className="w-4 h-4" /> Crear Nueva Misión
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-indigo-400" />
            Revisión de Evidencias Presentadas
          </h3>
          <div className="divide-y divide-slate-800">
            {[
              { id: 1, student: 'Juan Pérez', mission: 'Informe Semanal', date: 'Hoy, 10:30 AM' },
              { id: 2, student: 'María Gómez', mission: 'Reto de Lógica', date: 'Ayer' },
            ].map((item) => (
              <div key={item.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-slate-200">{item.student}</p>
                  <p className="text-xs text-slate-400">{item.mission} • {item.date}</p>
                </div>
                <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium rounded-lg border border-slate-700 transition-colors">
                  Revisar Evidencia
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};