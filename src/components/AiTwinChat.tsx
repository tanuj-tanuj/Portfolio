import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, RefreshCcw, HelpCircle, Terminal, Cpu, Sparkles, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "../types";
import { useTheme } from "../context/ThemeContext";

// Customized high-fidelity animated digital bot component exactly matching magenta cosmic aesthetic
function AnimatedBotHead({ isThinking, accent, theme }: { isThinking: boolean; accent: string; theme: any }) {
  return (
    <div className="relative w-11 h-11 flex items-center justify-center select-none">
      {/* Expanding neural glow rings */}
      <motion.div
        animate={{
          scale: isThinking ? [1, 1.45, 1] : [1, 1.15, 1],
          opacity: isThinking ? [0.2, 0.6, 0.2] : [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: isThinking ? 1.0 : 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute inset-0 rounded-xl bg-gradient-to-tr ${accent === 'purple' ? 'from-purple-500 via-pink-500' : accent === 'blue' ? 'from-blue-500 via-cyan-500' : 'from-emerald-500 via-teal-500'} to-indigo-500 filter blur-[2px]`}
      />
      
      {/* Core Bot Shell with floating hover physics */}
      <motion.div
        animate={{
          y: isThinking ? [0, -3.5, 0] : [0, -1.8, 0],
          rotate: isThinking ? [-4, 4, -4] : [0, 0.5, 0],
        }}
        transition={{
          duration: 2.0,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`relative z-10 w-8.5 h-8.5 bg-zinc-950 border ${theme.primaryBorder} rounded-xl flex items-center justify-center shadow-lg`}
      >
        <svg viewBox="0 0 40 40" className="w-6.5 h-6.5">
          <defs>
            <linearGradient id="glow-bot-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent === 'purple' ? '#f472b6' : accent === 'blue' ? '#22d3ee' : '#34d399'} />
              <stop offset="100%" stopColor={accent === 'purple' ? '#a78bfa' : accent === 'blue' ? '#3b82f6' : '#10b981'} />
            </linearGradient>
          </defs>

          {/* Antennas */}
          <line x1="20" y1="12" x2="20" y2="5" stroke="url(#glow-bot-face)" strokeWidth="2.2" />
          <circle cx="20" cy="4" r="2.5" fill={isThinking ? (accent === 'purple' ? '#ec4899' : accent === 'blue' ? '#06b6d4' : '#14b8a6') : (accent === 'purple' ? '#a855f7' : accent === 'blue' ? '#3b82f6' : '#10b981')}>
            {isThinking && <animate attributeName="opacity" values="1;0.2;1" dur="0.8s" repeatCount="indefinite" />}
          </circle>

          {/* Screws */}
          <rect x="2" y="15" width="2" height="8" rx="1" fill="#71717a" />
          <rect x="36" y="15" width="2" height="8" rx="1" fill="#71717a" />

          {/* Shell face boundary */}
          <rect x="5" y="10" width="30" height="21" rx="6" fill="#09090b" stroke="url(#glow-bot-face)" strokeWidth="1.5" />

          {/* Glowing Leds */}
          <circle cx="13" cy="18" r="2.2" fill={isThinking ? (accent === 'purple' ? '#ec4899' : accent === 'blue' ? '#06b6d4' : '#14b8a6') : '#818cf8'}>
            <animate attributeName="r" values={isThinking ? "2.2;1.0;2.2" : "2.2;2.2"} dur="1.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="27" cy="18" r="2.2" fill={isThinking ? (accent === 'purple' ? '#ec4899' : accent === 'blue' ? '#06b6d4' : '#14b8a6') : '#818cf8'}>
            <animate attributeName="r" values={isThinking ? "2.2;1.0;2.2" : "2.2;2.2"} dur="1.2s" repeatCount="indefinite" />
          </circle>

          {/* Equalizer speech wave */}
          {isThinking ? (
            <path d="M 11 25 L 15 22 L 20 28 L 24 22 L 29 25" stroke={accent === 'purple' ? '#ec4899' : accent === 'blue' ? '#06b6d4' : '#14b8a6'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          ) : (
            <rect x="13" y="24" width="14" height="2" rx="1" fill={accent === 'purple' ? '#a855f7' : accent === 'blue' ? '#4f46e5' : '#10b981'} />
          )}
        </svg>
      </motion.div>
    </div>
  );
}

export default function AiTwinChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { accent, theme } = useTheme();
  
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Set up initial message and voices
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "model",
        text: "Hello! I am Nimmala Tanuj's AI Twin, trained on his complete academic coursework, projects, and Basis Laboratories experiences. Ask me anything about his technical competence, skills, or sports interests — I'm ready to interview!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    // Cleanup speech on unmount
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Set up voice change listener for best compatibility
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const handleVoicesChanged = () => {};
      window.speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);
      return () => {
        window.speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
      };
    }
  }, []);

  // Text-To-Speech engine with markdown cleaning
  const speakText = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    // Flush current speaking queues
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    if (isMuted) return;

    // Clean markdown characters so speech sounds incredibly natural
    const cleanText = text
      .replace(/\*\*([^*]+)\*\*/g, "$1") // Bold inline
      .replace(/\*([^*]+)\*/g, "$1")     // Italic inline
      .replace(/#+\s+/g, "")             // Headers marks
      .replace(/-\s+/g, "")              // List dots
      .replace(/`([^`]+)`/g, "$1")       // Block quotes/inline syntax
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Pick top premium English/avatar voice
    const voices = window.speechSynthesis.getVoices();
    const premiumVoice = voices.find(
      (v) => v.lang.includes("en-US") || v.lang.includes("en-GB")
    );
    if (premiumVoice) {
      utterance.voice = premiumVoice;
    }

    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    activeUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Auto-scroll to lowest message visible within the dialogue container
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Suggested quick-prompt chips
  const suggestedPrompts = [
    "What was his role at Basis Laboratories?",
    "Which courses did he take at Mahindra University?",
    "Is his focus React/TypeScript or AI/Python?",
    "What sports does Tanuj play?",
    "How can I contact Tanuj?"
  ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    setApiError(null);

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Pass the complete dialogue history formatted correctly for Gemini API processing
      const historyPayload = messages
        .filter(m => m.id !== "welcome")
        .map(m => ({
          role: m.role,
          text: m.text
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: text,
          history: historyPayload
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      const twinReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, twinReply]);
      
      // Auto-speak response if not muted
      speakText(data.text);
    } catch (err: any) {
      console.error("AI Twin connection error:", err);
      setApiError(
        err.message || 
        "The server is missing a valid GEMINI_API_KEY environment variable. Head to Secrets panel in Studio Settings to verify."
      );
    } finally {
      setIsTyping(false);
    }
  };

  const clearChatHistory = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    
    setMessages([
      {
        id: "welcome",
        role: "model",
        text: "Dialogue rebooted. Ask me anything about Nimmala Tanuj's background — from machine learning algorithms to his pickleball matches!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setApiError(null);
  };

  return (
    <section id="ai-assistant" className="py-20 px-6 bg-zinc-950 border-b border-zinc-900 scroll-mt-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Module Header */}
        <div className="text-center mb-8">
          <p className={`font-mono text-xs uppercase tracking-widest ${theme.primaryText} font-bold mb-1`}>
            INTELLIGENT AGENT INTERACTION
          </p>
          <div className="flex items-center justify-center gap-2">
            <h2 className="font-sans text-3xl font-extrabold text-white tracking-tight">
              Interview Tanuj's AI Twin
            </h2>
            <span className={`px-2 py-0.5 ${theme.badgeBg} border ${theme.primaryBorder} ${theme.primaryText} font-mono text-[9px] rounded-full uppercase tracking-wider animate-pulse`}>
              Gemini Virtualized Active
            </span>
          </div>
          <p className="font-sans text-zinc-400 text-sm mt-2 leading-relaxed">
            Interact with a server-side Gemini powered digital avatar programmed with his exact credentials.
          </p>
        </div>

        {/* Primary Messenger Screen Box */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl h-[550px] relative">
          
          {/* Glowing dynamic background lights to match magenta cosmic aesthetic */}
          <div className={`absolute top-0 left-1/3 w-72 h-72 ${theme.glowBg} rounded-full blur-3xl pointer-events-none`} />
          <div className={`absolute bottom-10 right-10 w-64 h-64 ${theme.glowBg} rounded-full blur-3xl pointer-events-none`} />

          {/* Top Status Bar indicator */}
          <div className="bg-zinc-950/80 px-6 py-4 border-b border-zinc-850 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <AnimatedBotHead isThinking={isTyping || isSpeaking} accent={accent} theme={theme} />
              <div>
                <h4 className="font-sans text-xs font-bold text-white flex items-center gap-1.5 leading-none">
                  Tanuj_Agent_v2
                  <span className={`w-2 h-2 rounded-full ${isTyping ? "bg-pink-400 animate-ping" : isSpeaking ? "bg-purple-400 animate-bounce" : "bg-emerald-400 animate-pulse"} inline-block`} />
                </h4>
                <p className="font-mono text-[9px] text-zinc-500 mt-1 leading-none uppercase">
                  {isTyping ? (
                    "COMPILE PROCESS_ACTIVE"
                  ) : isSpeaking ? (
                    <span className="text-pink-450 text-pink-450 font-bold animate-pulse">🔊 COGNITIVE_SPEECH_STREAM_ACTIVE</span>
                  ) : (
                    "CONNECTED TO SECURE_COGNITIVE_NODE"
                  )}
                </p>
              </div>
            </div>
                  <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const newMuted = !isMuted;
                  setIsMuted(newMuted);
                  if (newMuted && typeof window !== "undefined" && window.speechSynthesis) {
                    window.speechSynthesis.cancel();
                    setIsSpeaking(false);
                  }
                }}
                title={isMuted ? "Unmute speech voice" : "Mute speech voice"}
                className={`p-1.5 rounded-lg border w-auto flex items-center gap-1.5 transition-all cursor-pointer ${
                  isMuted 
                    ? "bg-rose-950/20 border-rose-500/20 text-rose-400 hover:text-rose-300"
                    : `${theme.badgeBg} ${theme.primaryBorder} ${theme.primaryText} hover:opacity-90`
                }`}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? `animate-bounce ${accent === 'purple' ? 'text-pink-400' : accent === 'blue' ? 'text-cyan-400' : 'text-teal-400'}` : ""}`} />
                )}
                <span className="font-mono text-[9px] uppercase font-bold hidden sm:inline">
                  {isMuted ? "Voiceless" : "Voice On"}
                </span>
              </button>

              <button
                type="button"
                onClick={clearChatHistory}
                title="Reset conversation state"
                className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer flex items-center gap-1"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span className="font-mono text-[9px] uppercase font-bold hidden sm:inline">Reboot</span>
              </button>
            </div>
          </div>

          {/* Dialogue Space */}
          <div ref={chatContainerRef} className="flex-grow p-6 overflow-y-auto space-y-4 bg-zinc-900/40 relative z-10">
            <AnimatePresence initial={false}>
              
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  key={msg.id} 
                  className={`flex gap-3 max-w-[85%] ${
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  
                  {/* Left profile nodes - animated */}
                  <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs border transition-colors ${
                    msg.role === "user" 
                      ? "bg-indigo-950/40 border-indigo-500/30 text-indigo-400" 
                      : `${theme.badgeBg} ${theme.primaryBorder} ${theme.primaryText}`
                  }`}>
                    {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5 animate-pulse" />}
                  </div>

                  {/* Bubble content */}
                  <div>
                    <div className={`p-4 rounded-2xl text-xs font-sans leading-relaxed whitespace-pre-line shadow-md relative ${
                      msg.role === "user" 
                        ? "bg-indigo-950/30 text-zinc-100 rounded-tr-none border border-indigo-500/20" 
                        : "bg-zinc-905 bg-zinc-900 text-zinc-200 rounded-tl-none border border-zinc-800"
                    }`}>
                      {msg.text}
                    </div>
                    
                    <div className={`flex items-center gap-2 mt-1.5 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}>
                      <span className="font-mono text-[8px] text-zinc-500">
                        {msg.timestamp}
                      </span>
                      {msg.role === "model" && (
                        <button
                          type="button"
                          onClick={() => speakText(msg.text)}
                          className={`text-zinc-500 hover:${theme.primaryText} active:scale-[0.93] flex items-center gap-0.5 cursor-pointer transition-all bg-zinc-900/40 hover:${theme.badgeBg} px-1.5 py-0.5 rounded border border-zinc-800/60 hover:${theme.primaryBorder}`}
                          title="Speak answer out loud"
                        >
                          <Volume2 className={`w-2.5 h-2.5 ${theme.primaryText}`} />
                          <span className="font-mono text-[8px] uppercase tracking-wider">Speak</span>
                        </button>
                      )}
                    </div>
                  </div>

                </motion.div>
              ))}

              {/* Typing indicator inside dialog */}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3 mr-auto max-w-[85%]"
                >
                  <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs border ${theme.badgeBg} ${theme.primaryBorder} ${theme.primaryText} animate-spin`}>
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-4 bg-zinc-900 text-zinc-400 rounded-2xl rounded-tl-none border border-zinc-800/80 flex items-center gap-1.5 shadow-md">
                    <span className="font-mono text-[10px] text-zinc-500 mr-1">THINKING</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${accent === 'purple' ? 'bg-purple-500' : accent === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'} animate-[bounce_1s_infinite_100ms]`} />
                    <span className={`w-1.5 h-1.5 rounded-full ${accent === 'purple' ? 'bg-purple-500' : accent === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'} animate-[bounce_1s_infinite_200ms]`} />
                    <span className={`w-1.5 h-1.5 rounded-full ${accent === 'purple' ? 'bg-purple-500' : accent === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'} animate-[bounce_1s_infinite_300ms]`} />
                  </div>
                </motion.div>
              )}

              {/* Failover and API warning */}
              {apiError && (
                <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl text-xs text-rose-300 flex items-start gap-3 mt-4">
                  <Terminal className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-mono text-[10px] uppercase font-bold text-rose-400">
                      GEMINI_API_KEY Missing Alert (Secure Mode)
                    </p>
                    <p className="font-sans leading-relaxed">
                      {apiError}
                    </p>
                    <div className="pt-2 text-zinc-400 text-[10px] leading-relaxed">
                      💡 <strong>Quick Fix:</strong> Click <strong>Settings &gt; Secrets</strong> in AI Studio and append <code>GEMINI_API_KEY</code> with your real key. No custom client-side form is created to protect security.
                    </div>
                  </div>
                </div>
              )}

            </AnimatePresence>
          </div>

          {/* Quick chip selector toolbar */}
          <div className="bg-zinc-950/40 px-6 py-2.5 border-t border-zinc-850/60 overflow-x-auto whitespace-nowrap flex gap-2 items-center relative z-10">
            <span className="font-mono text-[8px] text-zinc-500 uppercase shrink-0">Suggestions:</span>
            {suggestedPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                disabled={isTyping}
                className={`px-2.5 py-1 text-[10px] bg-zinc-900/85 hover:${theme.badgeBg} border border-zinc-800 hover:${theme.primaryBorder} text-zinc-400 hover:text-white rounded-full transition-all cursor-pointer inline-block`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* User Text inputs and actions */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputMessage);
            }}
            className="p-4 bg-zinc-950 border-t border-zinc-850/80 flex items-center gap-2 relative z-10"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isTyping}
              placeholder="Query Tanuj's background... (e.g. Is he familiar with TypeScript?)"
              className={`flex-grow px-4 py-3 bg-zinc-900 text-zinc-200 border border-zinc-800 focus:border-current focus:${theme.primaryText} rounded-xl focus:outline-none text-xs transition-colors`}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className={`w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r ${theme.buttonGradient} text-white transition-all disabled:opacity-40 disabled:bg-none disabled:bg-zinc-800 cursor-pointer border border-white/10`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
