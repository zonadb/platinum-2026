import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Plane, 
  Briefcase, 
  ShieldCheck, 
  Sun, 
  Compass, 
  Award, 
  AlertTriangle, 
  MessageSquare,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { TRIP_SECTIONS } from '../data/tripKnowledge';
import { TripSection } from '../types';

interface DossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskSection: (question: string) => void;
}

const SECTION_ICONS: Record<string, React.ReactNode> = {
  Plane: <Plane className="w-5 h-5 text-sky-400" />,
  Briefcase: <Briefcase className="w-5 h-5 text-amber-400" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
  Sun: <Sun className="w-5 h-5 text-yellow-400" />,
  Compass: <Compass className="w-5 h-5 text-purple-400" />,
  Award: <Award className="w-5 h-5 text-amber-300" />,
};

export const DossierModal: React.FC<DossierModalProps> = ({
  isOpen,
  onClose,
  onAskSection,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredSections = TRIP_SECTIONS.filter(sec => {
    const term = searchTerm.toLowerCase();
    return (
      sec.title.toLowerCase().includes(term) ||
      sec.shortDesc.toLowerCase().includes(term) ||
      sec.details.some(d => d.toLowerCase().includes(term))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-amber-500/30 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl shadow-amber-950/30 overflow-hidden"
        id="dossier-modal-container"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                Dossier Oficial Platinum Egipto 2026
              </h2>
              <p className="text-xs text-slate-400">
                Grupo Zona de Baño • Del 9 al 16 de octubre de 2026
              </p>
            </div>
          </div>
          <button
            type="button"
            id="btn-close-dossier"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Cerrar dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search bar */}
        <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-900/50">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="input-dossier-search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar vuelos, maletas, drones, botiquín, hoteles..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950/70 border border-slate-800 focus:border-amber-500/50 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition-colors"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Content list */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {filteredSections.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm">
              No se han encontrado resultados para "{searchTerm}". Prueba con otra palabra clave.
            </div>
          ) : (
            filteredSections.map((sec) => (
              <div
                key={sec.id}
                id={`dossier-sec-${sec.id}`}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 hover:border-amber-500/30 transition-all space-y-3"
              >
                {/* Title & icon */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      {SECTION_ICONS[sec.icon] || <Sparkles className="w-4 h-4 text-amber-400" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-100 text-sm sm:text-base">
                        {sec.title}
                      </h3>
                      <p className="text-xs text-slate-400">{sec.shortDesc}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onAskSection(`Dime toda la información relevante sobre ${sec.title.toLowerCase()} para el viaje.`);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-medium border border-amber-500/30 transition-colors whitespace-nowrap"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span className="hidden sm:inline">Preguntar al bot</span>
                  </button>
                </div>

                {/* Critical Alert */}
                {sec.criticalAlert && (
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-200 text-xs leading-relaxed">
                    <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                    <div>{sec.criticalAlert}</div>
                  </div>
                )}

                {/* Details list */}
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                  {sec.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-amber-400/80 font-bold mt-0.5">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* Tips */}
                {sec.tips && (
                  <div className="text-[11px] sm:text-xs text-amber-300/80 italic pt-1 border-t border-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>{sec.tips}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>Lema: <strong className="text-amber-300 font-semibold">"Juntos somos más fuertes"</strong></span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
