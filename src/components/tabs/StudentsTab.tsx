import React, { useState, useEffect } from 'react';
import { Search, Award, CheckCircle2, Users, ShieldAlert, Star, X, Sparkles, Crown } from 'lucide-react';
import { toast } from 'sonner';
import { FeaturedStudent } from '../../types/director';

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
  classroomId?: string;
  onFeaturedStudentChange?: () => void;
}

export const StudentsTab: React.FC<StudentsTabProps> = ({
  students,
  classroomId = '10-02',
  onFeaturedStudentChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Estado del Estudiante Destacado
  const [featuredStudent, setFeaturedStudent] = useState<FeaturedStudent | null>(null);
  const [selectedStudentForHighlight, setSelectedStudentForHighlight] = useState<Student | null>(null);
  const [highlightReason, setHighlightReason] = useState('');
  const [isHighlightModalOpen, setIsHighlightModalOpen] = useState(false);

  const loadFeaturedStudent = () => {
    try {
      const stored = localStorage.getItem('school_featured_students');
      if (stored) {
        const parsed = JSON.parse(stored);
        const list: FeaturedStudent[] = Array.isArray(parsed) ? parsed : [parsed];
        const found = list.find((item) => item.classroomId === classroomId) || null;
        setFeaturedStudent(found);
      } else {
        setFeaturedStudent(null);
      }
    } catch (e) {
      console.error('Error al leer school_featured_students:', e);
    }
  };

  useEffect(() => {
    loadFeaturedStudent();

    const handleUpdate = () => {
      loadFeaturedStudent();
    };

    window.addEventListener('storage', handleUpdate);
    window.addEventListener('featured_student_updated', handleUpdate);
    window.addEventListener('global_system_updated', handleUpdate);

    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('featured_student_updated', handleUpdate);
      window.removeEventListener('global_system_updated', handleUpdate);
    };
  }, [classroomId]);

  const handleSaveFeatured = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentForHighlight) return;

    const newFeatured: FeaturedStudent = {
      classroomId: classroomId,
      studentId: selectedStudentForHighlight.id,
      studentName: selectedStudentForHighlight.name,
      reason: highlightReason.trim() || 'Reconocido por su excelente desempeño y liderazgo en el salón.',
      updatedAt: 'Justo ahora',
    };

    try {
      const stored = localStorage.getItem('school_featured_students');
      let list: FeaturedStudent[] = [];
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          list = Array.isArray(parsed) ? parsed : [parsed];
        } catch (e) {
          console.error(e);
        }
      }

      const filtered = list.filter((item) => item.classroomId !== classroomId);
      const updatedList = [newFeatured, ...filtered];
      localStorage.setItem('school_featured_students', JSON.stringify(updatedList));
      setFeaturedStudent(newFeatured);
    } catch (e) {
      console.error('Error al guardar estudiante destacado:', e);
    }

    window.dispatchEvent(new Event('featured_student_updated'));
    window.dispatchEvent(new Event('global_system_updated'));

    toast.success(`⭐ ¡${selectedStudentForHighlight.name} ha sido destacado del salón!`, {
      description: `Motivo: "${newFeatured.reason}"`,
    });

    setIsHighlightModalOpen(false);
    setSelectedStudentForHighlight(null);
    setHighlightReason('');

    if (onFeaturedStudentChange) onFeaturedStudentChange();
  };

  const handleRemoveFeatured = (studentName: string) => {
    try {
      const stored = localStorage.getItem('school_featured_students');
      if (stored) {
        const parsed = JSON.parse(stored);
        let list: FeaturedStudent[] = Array.isArray(parsed) ? parsed : [parsed];
        list = list.filter((item) => item.classroomId !== classroomId);
        localStorage.setItem('school_featured_students', JSON.stringify(list));
      }
      setFeaturedStudent(null);
    } catch (e) {
      console.error('Error al eliminar estudiante destacado:', e);
    }

    window.dispatchEvent(new Event('featured_student_updated'));
    window.dispatchEvent(new Event('global_system_updated'));

    toast.info(`Se ha removido la mención de destacado para ${studentName}`);
    if (onFeaturedStudentChange) onFeaturedStudentChange();
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Banner de Estudiante Destacado Actual */}
      {featuredStudent && (
        <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 border-2 border-yellow-300/90 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-white/25 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-3.5 text-left relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-yellow-400 flex items-center justify-center font-black text-2xl shadow-lg border border-yellow-400/40 shrink-0">
              ⭐
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-900 text-yellow-400 tracking-wider flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  Estudiante Destacado Actual
                </span>
                <span className="text-[10px] font-bold text-slate-950 opacity-80">{featuredStudent.updatedAt}</span>
              </div>
              <h4 className="text-lg font-black text-slate-950 mt-1 flex items-center gap-1.5">
                {featuredStudent.studentName}
                <Crown className="w-4 h-4 text-amber-950 fill-amber-950" />
              </h4>
              <p className="text-xs text-slate-950 font-bold italic mt-0.5 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/60 inline-block shadow-xs">
                "{featuredStudent.reason}"
              </p>
            </div>
          </div>

          <button
            onClick={() => handleRemoveFeatured(featuredStudent.studentName)}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-yellow-400 border border-yellow-400/40 text-xs font-black rounded-xl transition-all shadow-md shrink-0 self-end sm:self-center relative z-10"
          >
            Quitar destacado
          </button>
        </div>
      )}

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
                  <th className="px-5 py-3.5">Progreso</th>
                  <th className="px-5 py-3.5 text-right">Mención de Honor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {filteredStudents.map((student) => {
                  const percentage =
                    student.totalMissions > 0
                      ? Math.round((student.completedMissions / student.totalMissions) * 100)
                      : 0;

                  const isFeatured = featuredStudent?.studentId === student.id || featuredStudent?.studentName === student.name;

                  return (
                    <tr key={student.id} className={`transition ${isFeatured ? 'bg-amber-500/10 hover:bg-amber-500/15' : 'hover:bg-gray-800/40'}`}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold shrink-0 border ${
                            isFeatured
                              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                              : 'bg-indigo-600/20 border-indigo-500/30 text-indigo-400'
                          }`}>
                            {isFeatured ? '⭐' : student.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm flex items-center gap-1.5">
                              <span>{student.name}</span>
                              {isFeatured && (
                                <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
                                  Destacado ⭐
                                </span>
                              )}
                            </p>
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

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-white">{percentage}%</span>
                          <div className="w-16 bg-gray-800 rounded-full h-2 overflow-hidden border border-gray-700">
                            <div
                              className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-right">
                        {isFeatured ? (
                          <button
                            onClick={() => handleRemoveFeatured(student.name)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold rounded-xl shadow-md transition-all"
                            title="Quitar reconocimiento"
                          >
                            <Star className="w-3.5 h-3.5 fill-slate-950" />
                            <span>Destacado</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedStudentForHighlight(student);
                              setHighlightReason('');
                              setIsHighlightModalOpen(true);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-amber-400 border border-amber-500/30 text-xs font-bold rounded-xl transition-all"
                            title="Destacar estudiante"
                          >
                            <Star className="w-3.5 h-3.5 text-amber-400" />
                            <span>Destacar</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal para ingresar Motivo de Mención de Honor */}
      {isHighlightModalOpen && selectedStudentForHighlight && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-amber-500/40 rounded-3xl p-6 max-w-md w-full text-left space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                  <Star className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Destacar Estudiante del Salón</h3>
                  <p className="text-xs text-amber-400 font-bold">{selectedStudentForHighlight.name}</p>
                </div>
              </div>
              <button
                onClick={() => setIsHighlightModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFeatured} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300">Motivo del reconocimiento</label>
                <textarea
                  rows={3}
                  required
                  value={highlightReason}
                  onChange={(e) => setHighlightReason(e.target.value)}
                  placeholder="Ej. Excelente desempeño ambiental, puntualidad en entregas y gran liderazgo colaborativo..."
                  className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsHighlightModalOpen(false)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-bold rounded-xl transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl shadow-md transition flex items-center gap-1.5"
                >
                  <Star className="w-4 h-4 fill-slate-950" />
                  <span>Guardar y Destacar</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};