import React from 'react';
import { 
  Plane, 
  AlertTriangle, 
  Briefcase, 
  ShieldCheck, 
  MapPin, 
  Hotel, 
  Award, 
  Sun,
  ChevronRight
} from 'lucide-react';
import { QUICK_TOPICS } from '../data/tripKnowledge';

interface QuickPromptsProps {
  onSelectPrompt: (query: string) => void;
  disabled?: boolean;
}

const ICONS: Record<string, React.ReactNode> = {
  Plane: <Plane className="w-3.5 h-3.5" />,
  AlertTriangle: <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />,
  Briefcase: <Briefcase className="w-3.5 h-3.5 text-amber-400" />,
  ShieldCheck: <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />,
  MapPin: <MapPin className="w-3.5 h-3.5 text-emerald-400" />,
  Hotel: <Hotel className="w-3.5 h-3.5 text-indigo-400" />,
  Award: <Award className="w-3.5 h-3.5 text-amber-300" />,
  Sun: <Sun className="w-3.5 h-3.5 text-yellow-400" />,
};

export const QuickPrompts: React.FC<QuickPromptsProps> = ({ onSelectPrompt, disabled }) => {
  return (
    <div className="w-full py-2">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          Preguntas frecuentes de socios MZB
        </span>
        <span className="text-[11px] text-slate-400">Toca para consultar</span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none snap-x">
        {QUICK_TOPICS.map((topic) => (
          <button
            key={topic.id}
            id={`quick-topic-${topic.id}`}
            type="button"
            disabled={disabled}
            onClick={() => onSelectPrompt(topic.query)}
            className="flex-shrink-0 snap-start inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 active:scale-95 border border-slate-700/80 hover:border-amber-500/40 text-xs text-slate-200 hover:text-white transition-all shadow-sm disabled:opacity-50 disabled:pointer-events-none group"
          >
            <span className="p-1 rounded-lg bg-slate-900/80 group-hover:bg-amber-500/20 transition-colors">
              {ICONS[topic.icon] || <ChevronRight className="w-3 h-3" />}
            </span>
            <span className="font-medium whitespace-nowrap">{topic.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
