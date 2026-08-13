import React, { useState } from 'react';
import { X, Calendar, Award, FileText, Link as LinkIcon, Image as ImageIcon, Type, AlertCircle } from 'lucide-react';
import { EvidenceType, Mission } from '../../types/director';

interface CreateMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateMission: (mission: Omit<Mission, 'id' | 'classroomId' | 'status'>) => void;
}

export const CreateMissionModal: React.FC<CreateMissionModalProps> = ({
  isOpen,
  onClose,
  onCreateMission,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState<number>(100);
  const [dueDate, setDueDate] = useState('');
  const [evidenceType, setEvidenceType] = useState<EvidenceType>('link');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !dueDate) {
      setError('Por favor completa todos los campos obligatorios.');
      return;
    }

    onCreateMission({
      title: title.trim(),
      description: description.trim(),
      points: Number(points) || 50,
      dueDate,
      evidenceType,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPoints(100);
    setDueDate('');
    setEvidenceType('link');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl bg-gray-900 border border-gray-800 shadow-2xl overflow-hidden text-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-900/50">
          <div>
            <h3 className="text-lg font-bold text-white">Nueva Misión</h3>
            <p className="text-xs text-indigo-400 font-medium">Asignación automática a: Salón 10-02</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Título de la Misión *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Taller de Algoritmos"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Descripción *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Instrucciones detalladas de la tarea..."
              className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                Recompensa (Puntos) *
              </label>
              <div className="relative">
                <Award className="w-4 h-4 absolute left-3 top-3 text-amber-400" />
                <input
                  type="number"
                  min="10"
                  max="1000"
                  step="10"
                  value={points}
                  onChange={(e) => setPoints(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                Fecha Límite *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Tipo de Evidencia Requerida
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'link', label: 'Enlace', icon: LinkIcon },
                { id: 'image', label: 'Imagen', icon: ImageIcon },
                { id: 'text', label: 'Texto', icon: Type },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setEvidenceType(id as EvidenceType)}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-sm font-medium transition ${
                    evidenceType === id
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                      : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/25"
            >
              Publicar Misión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};