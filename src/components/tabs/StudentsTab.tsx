import React, { useState } from 'react';
import { Search, Award, CheckCircle2, Users, ShieldAlert } from 'lucide-react';

export interface Student {
  id: string;
  name: string;
  email: string;
  points: number;
  completedMissions: number;
  totalMissions: number;
  status: 'active' | 'warning' | 'inactive';
}

interface StudentsTabProps {
  students: Student[];
}

export const StudentsTab: React.FC<StudentsTabProps> = ({ students }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar estudiante por nombre o correo..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        <span className="text-xs text-gray-400 font-medium self-end sm:self-center">
          Total: <strong className="text-white">{filteredStudents.length}</strong> estudiantes
        </span>
      </div>

      {/* Table / List View */}
      {filteredStudents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-gray-900 border border-gray-800 text-center">
          <Users className="w-10 h-10 text-gray-600 mb-2" />
          <p className="text-sm font-semibold text-gray-300">No se encontraron estudiantes</p>
          <p className="text-xs text-gray-500 mt-1">Prueba filtrando con otro término de búsqueda.</p>
        </div>
      ) : (
        <div className="rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-gray-900/80 border-b border-gray-800 text-gray-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-5 py-3.5">Estudiante</th>
                  <th className="px-5 py-3.5">Estado</th>
                  <th className="px-5 py-3.5">Puntos</th>
                  <th className="px-5 py-3.5">Cumplimiento</th>
                  <th className="px-5 py-3.5 text-right">Progreso</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {filteredStudents.map((student) => {
                  const percentage =
                    student.totalMissions > 0
                      ? Math.round((student.completedMissions / student.totalMissions) * 100)
                      : 0;

                  return (
                    <tr key={student.id} className="hover:bg-gray-800/40 transition">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold shrink-0">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm">{student.name}</p>
                            <p className="text-gray-500 text-xs">{student.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        {student.status === 'active' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3" /> Al día
                          </span>
                        )}
                        {student.status === 'warning' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            <ShieldAlert className="w-3 h-3" /> Pendiente
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4 font-bold text-amber-400">
                        <div className="flex items-center gap-1">
                          <Award className="w-3.5 h-3.5" />
                          <span>{student.points} pts</span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-gray-300">
                        {student.completedMissions} / {student.totalMissions} misiones
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <span className="font-semibold text-white">{percentage}%</span>
                          <div className="w-20 bg-gray-800 rounded-full h-2 overflow-hidden border border-gray-700">
                            <div
                              className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};