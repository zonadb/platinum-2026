import React from 'react';
import { Sparkles, BookOpen, RotateCcw, PhoneCall, Volume2, VolumeX } from 'lucide-react';

interface ChatHeaderProps {
  onOpenDossier: () => void;
  onOpenContact: () => void;
  onResetChat: () => void;
  speechEnabled: boolean;
  onToggleSpeech: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  onOpenDossier,
  onOpenContact,
  onResetChat,
  speechEnabled,
  onToggleSpeech,
}) => {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-amber-500/20 px-4 py-3 sticky top-0 z-30 shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Avatar & Identity */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative flex-shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 p-[2px] shadow-md shadow-amber-500/20">
              <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center overflow-hidden text-lg select-none">
                👑
              </div>
            </div>
            <span
              className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 ring-1 ring-emerald-400/50"
              title="Faraón ZB en línea"
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-slate-100 text-base sm:text-lg tracking-tight truncate flex items-center gap-1.5">
                <span>Faraón ZB</span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <Sparkles className="w-2.5 h-2.5" />
                  Platinum 2026
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 truncate flex items-center gap-1.5">
              <span>Grupo Zona de Baño</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-300/80 font-medium">Egipto (9-16 Oct)</span>
            </p>
          </div>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* TTS Toggle */}
          <button
            id="btn-toggle-speech"
            type="button"
            onClick={onToggleSpeech}
            className={`p-2 rounded-xl transition-all border ${
              speechEnabled
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-400 shadow-sm'
                : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/70 text-slate-400 hover:text-slate-200'
            }`}
            title={speechEnabled ? 'Voz activada (clic para desactivar)' : 'Activar lectura por voz'}
            aria-label="Alternar audio"
          >
            {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Dossier button */}
          <button
            id="btn-open-dossier"
            type="button"
            onClick={onOpenDossier}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700/80 hover:border-amber-500/40 text-xs font-medium text-slate-200 transition-all shadow-sm"
            title="Consultar datos clave y dossier del viaje"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Dossier Viaje</span>
          </button>

          {/* Contact Central */}
          <button
            id="btn-open-contact"
            type="button"
            onClick={onOpenContact}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-medium text-amber-300 transition-all shadow-sm"
            title="Contactar con la Central de Zona de Baño"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Central ZB</span>
          </button>

          {/* Reset Chat */}
          <button
            id="btn-reset-chat"
            type="button"
            onClick={onResetChat}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 text-slate-400 hover:text-slate-200 transition-all"
            title="Reiniciar conversación"
            aria-label="Reiniciar conversación"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
