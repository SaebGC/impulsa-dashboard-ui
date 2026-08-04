import React from 'react';
import { Header } from '../../components/ui/Header';
import { Calendar, Layers, Settings, Users } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header title="Consola de Administración Global" roleLabel="Administrador" />
      
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-indigo-400">
              <Users className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase">Gestión Usuarios</span>
            </div>
            <p className="text-2xl font-bold">1,240</p>
            <p className="text-xs text-slate-400">Estudiantes y Docentes</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-indigo-400">
              <Layers className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase">Gestión Clases</span>
            </div>
            <p className="text-2xl font-bold">32</p>
            <p className="text-xs text-slate-400">Grupos Activos</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-indigo-400">
              <Calendar className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase">Temporadas</span>
            </div>
            <p className="text-2xl font-bold">Temporada 3</p>
            <p className="text-xs text-slate-400">Finaliza en 12 días</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-indigo-400">
              <Settings className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase">Config. Sistema</span>
            </div>
            <p className="text-2xl font-bold">OK</p>
            <p className="text-xs text-emerald-400 font-medium">Servicios Operativos</p>
          </div>
        </div>
      </main>
    </div>
  );
};