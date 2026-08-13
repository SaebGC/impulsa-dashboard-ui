import React from 'react';
import { CheckCircle, Clock, ExternalLink, Eye, FileCheck, Image as ImageIcon, Link as LinkIcon, Type } from 'lucide-react';
import { Evidence } from '../../types/director';

interface PendingReviewsTabProps {
  pendingEvidences: Evidence[];
  onSelectEvidence: (evidence: Evidence) => void;
}

export const PendingReviewsTab: React.FC<PendingReviewsTabProps> = ({
  pendingEvidences,
  onSelectEvidence,
}) => {
  const getEvidenceBadge = (type: Evidence['evidenceType']) => {
    switch (type) {
      case 'link':
        return (
          <span className="flex items-center gap-1 text-xs text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-md font-medium">
            <LinkIcon className="w-3 h-3" /> Enlace
          </span>
        );
      case 'image':
        return (
          <span className="flex items-center gap-1 text-xs text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-md font-medium">
            <ImageIcon className="w-3 h-3" /> Imagen
          </span>
        );
      case 'text':
        return (
          <span className="flex items-center gap-1 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md font-medium">
            <Type className="w-3 h-3" /> Texto
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <span>Entregas por Validar</span>
          <span className="px-2 py-0.5 text-xs rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
            {pendingEvidences.length}
          </span>
        </h3>
      </div>

      {pendingEvidences.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-gray-900 border border-gray-800 text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
            <FileCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">¡Todo al día!</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-sm">
            No hay evidencias pendientes de revisión en este salón por el momento.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {pendingEvidences.map((evidence) => (
            <div
              key={evidence.id}
              className="p-4 rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold shrink-0 mt-0.5">
                  {evidence.studentName.charAt(0)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-white">{evidence.studentName}</h4>
                    {getEvidenceBadge(evidence.evidenceType)}
                  </div>
                  <p className="text-xs text-gray-400">
                    Misión: <span className="text-gray-200 font-medium">{evidence.missionTitle}</span>
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Entregado: {evidence.submittedAt}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => onSelectEvidence(evidence)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-md shadow-indigo-600/20 shrink-0 self-end sm:self-center"
              >
                <Eye className="w-4 h-4" />
                <span>Revisar Evidencia</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};