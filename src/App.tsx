import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Mic, 
  MicOff, 
  Sparkles, 
  Plane, 
  AlertTriangle, 
  Info,
  RefreshCw
} from 'lucide-react';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessageBubble } from './components/ChatMessageBubble';
import { QuickPrompts } from './components/QuickPrompts';
import { DossierModal } from './components/DossierModal';
import { ContactModal } from './components/ContactModal';
import { ChatMessage } from './types';
import { getLocalFallbackResponse } from './data/tripKnowledge';

const INITIAL_MESSAGE: ChatMessage = {
  id: 'init-1',
  role: 'assistant',
  content: `¡Hola! 👋 Soy **Faraón ZB**, el Asistente Virtual Oficial del **Grupo Zona de Baño** para el **Viaje de Convivencia Platinum 2026 a Egipto** (9 al 16 de octubre).

Estoy a tu entera disposición para resolver cualquier duda sobre:
• ✈️ **Vuelos y horarios** desde Madrid y Barcelona
• 🧳 **Equipaje permitido** y normativa de powerbanks
• 🚫 **Prohibición de drones** y walkie-talkies
• 💧 **Agua, botiquín y prevención médica**
• 🏛️ **Excursiones incluidas** (Abu Simbel, Pirámides, GEM, Alejandría...)
• 🏆 **Requisitos Platinum** y 2ª plaza de acompañante gratis

*¿Qué duda tienes sobre nuestro viaje? ¡Juntos somos más fuertes!* 🇪🇬✨`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Speech Recognition setup
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'es-ES';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Tu navegador no soporta reconocimiento de voz en este momento.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        setIsListening(false);
      }
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    setInputText('');
    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newUserMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: userTime,
    };

    // Temporary loading placeholder
    const loadingId = `bot-${Date.now()}`;
    const loadingMsg: ChatMessage = {
      id: loadingId,
      role: 'assistant',
      content: '',
      timestamp: userTime,
      isStreaming: true,
    };

    setMessages((prev) => [...prev, newUserMsg, loadingMsg]);
    setIsLoading(true);

    try {
      const historyPayload = messages
        .filter((m) => m.id !== 'init-1' && !m.isStreaming)
        .slice(-6)
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const replyContent = data.reply || getLocalFallbackResponse(query);
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingId
            ? { ...m, content: replyContent, isStreaming: false, timestamp: botTime }
            : m
        )
      );

      // Read aloud if speechEnabled is active
      if (speechEnabled && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const cleanText = replyContent
          .replace(/[*_#`~]/g, '')
          .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'es-ES';
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.warn('API call failed, switching to local knowledge base:', error);
      const fallbackReply = getLocalFallbackResponse(query);
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingId
            ? { ...m, content: fallbackReply, isStreaming: false, timestamp: botTime }
            : m
        )
      );
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleResetChat = () => {
    if (window.confirm('¿Deseas reiniciar la conversación con Faraón ZB?')) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setMessages([
        {
          ...INITIAL_MESSAGE,
          id: `init-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 text-slate-100 antialiased overflow-hidden">
      {/* Top Banner Notice: Official Travel Assistant */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-slate-950 px-4 py-1.5 text-center text-xs font-bold tracking-wide flex items-center justify-center gap-2 shadow-inner">
        <Sparkles className="w-3.5 h-3.5" />
        <span>VIAJE DE CONVIVENCIA PLATINUM 2026 • EGIPTO (9 AL 16 DE OCTUBRE)</span>
        <span className="hidden sm:inline opacity-80">| "Juntos somos más fuertes"</span>
      </div>

      {/* Header */}
      <ChatHeader
        onOpenDossier={() => setIsDossierOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onResetChat={handleResetChat}
        speechEnabled={speechEnabled}
        onToggleSpeech={() => setSpeechEnabled(!speechEnabled)}
      />

      {/* Chat Messages Container */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-w-4xl w-full mx-auto">
        {/* Important Travel Highlights Pill Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
          <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block">Fechas</span>
            <strong className="text-xs text-amber-300">09 - 16 Oct 2026</strong>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block">Aeropuertos</span>
            <strong className="text-xs text-slate-200">Madrid & Barcelona</strong>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block">Crucero Nilo</span>
            <strong className="text-xs text-slate-200">3N Motonave 5★</strong>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block">El Cairo</span>
            <strong className="text-xs text-amber-300">4N Hotel 5★ + GEM</strong>
          </div>
        </div>

        {/* Message stream */}
        {messages.map((message) => (
          <ChatMessageBubble
            key={message.id}
            message={message}
            onSelectPrompt={(p) => handleSendMessage(p)}
          />
        ))}

        <div ref={messagesEndRef} />
      </main>

      {/* Bottom Area: Quick chips + Input form */}
      <footer className="bg-slate-900/90 border-t border-slate-800 backdrop-blur-md px-3 sm:px-4 py-3 sticky bottom-0 z-20">
        <div className="max-w-4xl mx-auto space-y-2">
          {/* Quick Frequent Prompts */}
          <QuickPrompts
            onSelectPrompt={(query) => handleSendMessage(query)}
            disabled={isLoading}
          />

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            {/* Input */}
            <div className="relative flex-1">
              <input
                ref={inputRef}
                id="input-chat-message"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Pregunta a Faraón ZB sobre vuelos, equipaje, hoteles, salud..."
                disabled={isLoading}
                className="w-full bg-slate-950 border border-slate-700/80 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 rounded-2xl pl-4 pr-11 py-3 text-sm text-slate-100 placeholder-slate-400 outline-none transition-all shadow-inner disabled:opacity-50"
              />

              {/* Mic button inside input on the right */}
              <button
                type="button"
                id="btn-voice-input"
                onClick={toggleListening}
                className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
                    : 'text-slate-400 hover:text-amber-400 hover:bg-slate-800'
                }`}
                title={isListening ? 'Escuchando... clic para parar' : 'Dictar por voz'}
                aria-label="Dictar pregunta"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>

            {/* Send Button */}
            <button
              id="btn-send-message"
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="flex-shrink-0 p-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:scale-95 disabled:opacity-40 disabled:pointer-events-none text-slate-950 font-bold transition-all shadow-lg shadow-amber-500/20"
              aria-label="Enviar mensaje"
              title="Enviar pregunta"
            >
              {isLoading ? (
                <RefreshCw className="w-5 h-5 animate-spin text-slate-950" />
              ) : (
                <Send className="w-5 h-5 text-slate-950" />
              )}
            </button>
          </form>

          {/* Micro Legal / Guidance line */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-0.5">
            <span className="flex items-center gap-1 text-slate-400">
              <Info className="w-3 h-3 text-amber-400" />
              <span>Dossier Oficial Platinum 2026</span>
            </span>
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="text-amber-400/90 hover:text-amber-300 underline underline-offset-2 transition-colors"
            >
              ¿Dudas particulares? Central ZB
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <DossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        onAskSection={(question) => handleSendMessage(question)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
