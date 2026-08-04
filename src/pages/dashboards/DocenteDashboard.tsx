import React from 'react';
import { Header } from '../../components/ui/Header';
import { CheckSquare, PlusCircle } from 'lucide-react';

export const DocenteDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header title="Panel Académico Docente" roleLabel="Docente" />
      
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-indigo-400" />
              Asignar Tareas a Clases
            </h3>
            <form className="space-y-3">
              <input 
                type="text" 
                placeholder="Título de la tarea" 
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm placeholder:text-slate-500"
              />
              <textarea 
                placeholder="Descripción de la actividad" 
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm placeholder:text-slate-500 h-24"
              />
              <button type="button" className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 font-medium rounded-lg text-sm transition-colors">
                Publicar Asignación
              </button>
            </form>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-indigo-400" />
              Validación de Evidencias
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/50 flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold">Taller 1 - Estructuras de Datos</p>
                  <p className="text-xs text-slate-400">3 entregas pendientes</p>
                </div>
                <button className="px-3 py-1 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded text-xs font-semibold">
                  Validar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};