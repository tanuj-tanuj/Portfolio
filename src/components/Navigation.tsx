import { useState } from "react";
import { Download, Terminal, Circle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme, AccentColor } from "../context/ThemeContext";

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onResumeClick: () => void;
}

export default function Navigation({ activeSection, onNavigate, onResumeClick }: NavigationProps) {
  const sections = ["about", "skills", "projects", "ai-assistant", "contact"];
  const { accent, setAccent, theme } = useTheme();

  const themes: { id: AccentColor; label: string; colorClass: string; bgClass: string; dotColor: string }[] = [
    { id: "purple", label: "Midnight Purple", colorClass: "text-purple-400", bgClass: "bg-purple-500", dotColor: "#a855f7" },
    { id: "blue", label: "Electric Blue", colorClass: "text-blue-400", bgClass: "bg-blue-500", dotColor: "#3b82f6" },
    { id: "emerald", label: "Vibrant Emerald", colorClass: "text-emerald-400", bgClass: "bg-emerald-500", dotColor: "#10b981" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-zinc-900/80 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo and Status indicator */}
        <div 
          onClick={() => onNavigate("about")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 transition-all duration-300">
            <span className={`font-mono text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientFrom} to-indigo-400`}>NT</span>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${theme.pingBg} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${theme.pingBg}`}></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className={`font-sans font-bold tracking-tight text-white text-base group-hover:${theme.primaryText} transition-colors`}>
                Nimmala Tanuj
              </h1>
              <div 
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 bg-zinc-900 border border-zinc-800/80 p-0.5 rounded-full px-1.5" 
                title="Switch accent theme color"
              >
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setAccent(t.id);
                    }}
                    title={`Switch to ${t.label}`}
                    className={`w-3 h-3 rounded-full transition-all duration-300 relative cursor-pointer flex items-center justify-center ${t.bgClass} ${
                      accent === t.id 
                        ? "scale-110 ring-1 ring-white/80 ring-offset-0.5 ring-offset-zinc-950" 
                        : "opacity-45 hover:opacity-90 hover:scale-105"
                    }`}
                  >
                    {accent === t.id && (
                      <span className="absolute w-0.5 h-0.5 bg-white rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest flex items-center gap-1">
              <Terminal className="w-2.5 h-2.5" /> B.Tech CSE Portfolio
            </p>
          </div>
        </div>

        {/* Central Physical Info Badge */}
        <div className="hidden lg:flex items-center gap-2 bg-zinc-900/40 border border-zinc-800/60 rounded-full px-4 py-1.5 font-mono text-xs text-zinc-400">
          <Circle className={`w-2 h-2 fill-current ${theme.primaryText} animate-pulse`} />
          <span className="text-zinc-500">Active Node:</span>
          <a 
            href="mailto:tanujrao2006@gmail.com" 
            className={`hover:${theme.primaryText} transition-colors underline decoration-zinc-700`}
          >
            tanujrao2006@gmail.com
          </a>
        </div>

        {/* Global Nav Targets & Theme Selector */}
        <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-center">

          <nav className="flex items-center bg-zinc-900/60 border border-zinc-800/40 p-1 rounded-full">
            {sections.map((sec) => (
              <button
                key={sec}
                onClick={() => onNavigate(sec)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium font-sans uppercase tracking-wider transition-all duration-300 ${
                  activeSection === sec
                    ? "text-white font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {activeSection === sec && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-zinc-800 rounded-full border border-zinc-700/50"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {sec === "ai-assistant" ? "AI Twin 🤖" : sec.replace("-", " ")}
                </span>
              </button>
            ))}
          </nav>

          {/* Quick Resume Link */}
          <button
            onClick={onResumeClick}
            className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${theme.buttonGradient} text-white font-sans font-medium text-xs rounded-full shadow-lg shadow-black/30 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer border ${theme.primaryBorder}`}
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Get Resume</span>
          </button>
        </div>
      </div>
    </header>
  );
}

