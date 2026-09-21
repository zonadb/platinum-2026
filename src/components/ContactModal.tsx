import React from 'react';
import { X, Phone, Mail, Building, Clock, Sparkles } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-amber-500/30 rounded-3xl w-full max-w-md p-6 shadow-2xl shadow-amber-950/40 text-slate-100 space-y-5"
        id="contact-modal-container"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-100">Central Grupo Zona de Baño</h3>
              <p className="text-xs text-amber-400/90 font-medium">Atención a Socios MZB Platinum</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Para consultas personalizadas sobre tu reserva de viaje, facturación neta, puntos ZB Aquanatur acumulados o peticiones especiales de vuelo:
        </p>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-900 text-amber-400">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Teléfono Central</div>
              <div className="font-semibold text-slate-100">+34 91 000 00 00 / WhatsApp MZB</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-900 text-amber-400">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Correo Electrónico</div>
              <div className="font-semibold text-slate-100">viajes@zonadebano.com</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-900 text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Horario de Atención</div>
              <div className="font-semibold text-slate-100">Lunes a Viernes: 08:30 - 18:30 h</div>
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs text-amber-300 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Viaje de Convivencia Platinum 2026</span>
          </div>
          <p className="text-[11px] text-slate-400 italic">"Juntos somos más fuertes"</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-amber-500/20"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};
