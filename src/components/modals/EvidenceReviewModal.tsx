import React, { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle, ExternalLink, MessageSquare, AlertCircle, User, FileText } from 'lucide-react';
import { Evidence } from '../../types/director';

interface EvidenceReviewModalProps {
  evidence: Evidence | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (evidenceId: string, feedback?: string) => void;
  onReject: (evidenceId: string, feedback: string) => void;
}

export const EvidenceReviewModal: React.FC<EvidenceReviewModalProps> = ({
  evidence,
  isOpen,
  onClose,
  onApprove,
  onReject,
}) => {
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (evidence) {
      setFeedback(evidence.feedback || '');
      setError('');
    }
  }, [evidence]);

  if (!isOpen || !evidence) return null;

  const handleReject = () => {
    if (!feedback.trim()) {
      setError('Debes ingresar una retroalimentación para explicar el motivo del rechazo.');
      return;
    }
    onReject(evidence.id, feedback.trim());
    onClose();
  };

  const handleApprove = () => {
    onApprove(evidence.id, feedback.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl bg-gray-900 border border-gray-800 shadow-2xl overflow-hidden text-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-900/50">
          <div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Salón 10-02
            </span>
            <h3 className="text-lg font-bold text-white mt-1">Revisar Evidencia</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Student & Mission Info */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-800/60 border border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
                {evidence.studentName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{evidence.studentName}</p>
                <p className="text-xs text-gray-400">{evidence.missionTitle}</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">{evidence.submittedAt}</span>
          </div>

          {/* Submission Preview */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Contenido Entregado
            </label>

            {evidence.evidenceType === 'link' && (
              <a
                href={evidence.content}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-gray-800 border border-gray-700 text-indigo-400 hover:text-indigo-300 hover:border-indigo-500 transition group"
              >
                <span className="text-sm truncate mr-2">{evidence.content}</span>
                <ExternalLink className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </a>
            )}

            {evidence.evidenceType === 'image' && (
              <div className="rounded-xl overflow-hidden border border-gray-700 bg-gray-800 max-h-56 flex items-center justify-center">
                <img
                  src={evidence.content}
                  alt="Evidencia entregada"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {evidence.evidenceType === 'text' && (
              <div className="p-4 rounded-xl bg-gray-800 border border-gray-700 text-sm text-gray-200 leading-relaxed max-h-48 overflow-y-auto">
                <p>"{evidence.content}"</p>
              </div>
            )}
          </div>

          {/* Feedback Section */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Retroalimentación para el alumno
            </label>
            <div className="relative">
              <MessageSquare className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
              <textarea
                rows={3}
                value={feedback}
                onChange={(e) => {
                  setFeedback(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Escribe comentarios, felicitaciones o las razones si vas a rechazar la entrega..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition resize-none text-sm"
              />
            </div>
            {error && (
              <div className="flex items-center gap-1.5 mt-2 text-xs text-rose-400">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
            <button
              type="button"
              onClick={handleReject}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition"
            >
              <XCircle className="w-4 h-4" />
              <span>Rechazar</span>
            </button>

            <button
              type="button"
              onClick={handleApprove}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-lg shadow-emerald-600/20"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Aprobar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};