import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { Copy, Check, Volume2, Sparkles, AlertTriangle } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatMessageBubbleProps {
  message: ChatMessage;
  onSelectPrompt?: (prompt: string) => void;
}

export const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    // Strip markdown formatting for cleaner speech
    const cleanText = message.content
      .replace(/[*_#`~]/g, '')
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = 1.05;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      className={`flex w-full gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
      id={`msg-${message.id}`}
    >
      {/* Bot Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 pt-0.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-sm shadow-md shadow-amber-900/30 border border-amber-300/30 select-none">
            👑
          </div>
        </div>
      )}

      {/* Bubble Container */}
      <div
        className={`relative group max-w-[88%] sm:max-w-[78%] rounded-2xl p-4 shadow-md transition-all ${
          isUser
            ? 'bg-gradient-to-br from-amber-600/90 to-amber-700/90 text-amber-50 rounded-tr-xs border border-amber-400/30 shadow-amber-950/20'
            : 'bg-slate-900/95 text-slate-100 rounded-tl-xs border border-slate-800 shadow-slate-950/50 hover:border-slate-700/80'
        }`}
      >
        {/* Assistant Header Tag */}
        {!isUser && (
          <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-800/80">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Faraón ZB</span>
              <span className="text-[10px] text-slate-400 font-normal ml-1">• Asistente Oficial</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              {message.timestamp}
            </span>
          </div>
        )}

        {/* Content */}
        {message.isStreaming ? (
          <div className="flex items-center gap-2 py-2 text-amber-300 text-sm">
            <div className="flex gap-1.5 items-center">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-xs text-slate-400 ml-1">Faraón ZB está respondiendo...</span>
          </div>
        ) : (
          <div className="text-[14px] sm:text-[15px] leading-relaxed break-words space-y-2">
            <div className="prose prose-invert prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-strong:text-amber-300 max-w-none text-slate-200">
              <Markdown>{message.content}</Markdown>
            </div>
          </div>
        )}

        {/* Message Footer / Controls */}
        <div className={`flex items-center gap-2 mt-2.5 pt-1.5 text-[11px] ${
          isUser ? 'justify-end text-amber-200/70 border-t border-amber-600/30' : 'justify-between text-slate-400 border-t border-slate-800/60'
        }`}>
          {isUser ? (
            <span className="font-mono text-[10px]">{message.timestamp}</span>
          ) : (
            <>
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <span>Viaje Platinum Egipto 2026</span>
              </div>

              <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                {/* Speech read-aloud */}
                {'speechSynthesis' in window && (
                  <button
                    type="button"
                    onClick={handleSpeak}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isPlaying
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'hover:bg-slate-800 hover:text-slate-200 border-transparent'
                    }`}
                    title={isPlaying ? 'Detener lectura' : 'Escuchar respuesta en voz alta'}
                    aria-label="Escuchar respuesta"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Copy button */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-slate-200 transition-colors border border-transparent"
                  title="Copiar texto al portapapeles"
                  aria-label="Copiar mensaje"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
