import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type AccentColor = "purple" | "blue" | "emerald";

export interface ThemeConfig {
  accent: AccentColor;
  primaryText: string;
  primaryTextHover: string;
  primaryBg: string;
  primaryBgHover: string;
  primaryBorder: string;
  primaryBorderHover: string;
  glowBg: string;
  glowBgStrong: string;
  gradientFrom: string;
  gradientTo: string;
  buttonGradient: string;
  focusBorder: string;
  neutralAccent: string;
  pingBg: string;
  speechText: string;
  badgeBg: string;
  cardHighlight: string;
}

export interface ThemeContextType {
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  theme: ThemeConfig;
}

const THEME_MAP: Record<AccentColor, ThemeConfig> = {
  purple: {
    accent: "purple",
    primaryText: "text-purple-400",
    primaryTextHover: "hover:text-purple-300",
    primaryBg: "bg-purple-600",
    primaryBgHover: "hover:bg-purple-500",
    primaryBorder: "border-purple-500/30",
    primaryBorderHover: "hover:border-purple-500/50",
    glowBg: "bg-purple-500/5",
    glowBgStrong: "bg-purple-500/10",
    gradientFrom: "from-purple-500",
    gradientTo: "to-pink-500",
    buttonGradient: "from-purple-600 via-purple-650 to-indigo-600 hover:from-purple-500 hover:to-indigo-500",
    focusBorder: "focus:border-purple-500/50",
    neutralAccent: "text-[#a855f7]",
    pingBg: "bg-pink-400",
    speechText: "text-pink-400",
    badgeBg: "bg-purple-500/10",
    cardHighlight: "hover:border-purple-500/40",
  },
  blue: {
    accent: "blue",
    primaryText: "text-blue-400",
    primaryTextHover: "hover:text-blue-300",
    primaryBg: "bg-blue-600",
    primaryBgHover: "hover:bg-blue-500",
    primaryBorder: "border-blue-500/30",
    primaryBorderHover: "hover:border-blue-500/50",
    glowBg: "bg-blue-500/5",
    glowBgStrong: "bg-blue-500/10",
    gradientFrom: "from-blue-500",
    gradientTo: "to-cyan-500",
    buttonGradient: "from-blue-600 via-blue-650 to-indigo-600 hover:from-blue-500 hover:to-indigo-505 hover:to-indigo-500",
    focusBorder: "focus:border-blue-500/50",
    neutralAccent: "text-blue-400",
    pingBg: "bg-cyan-400",
    speechText: "text-cyan-400",
    badgeBg: "bg-blue-500/10",
    cardHighlight: "hover:border-blue-500/40",
  },
  emerald: {
    accent: "emerald",
    primaryText: "text-emerald-400",
    primaryTextHover: "hover:text-emerald-300",
    primaryBg: "bg-emerald-600",
    primaryBgHover: "hover:bg-emerald-500",
    primaryBorder: "border-emerald-500/30",
    primaryBorderHover: "hover:border-emerald-500/50",
    glowBg: "bg-emerald-500/5",
    glowBgStrong: "bg-emerald-500/10",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-500",
    buttonGradient: "from-emerald-600 via-emerald-650 to-teal-600 hover:from-emerald-500 hover:to-teal-500",
    focusBorder: "focus:border-emerald-500/50",
    neutralAccent: "text-emerald-400",
    pingBg: "bg-teal-400",
    speechText: "text-teal-400",
    badgeBg: "bg-emerald-500/10",
    cardHighlight: "hover:border-emerald-500/40",
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [accent, setAccentState] = useState<AccentColor>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio-accent");
      if (saved === "purple" || saved === "blue" || saved === "emerald") {
        return saved;
      }
    }
    return "purple";
  });

  const setAccent = (newAccent: AccentColor) => {
    setAccentState(newAccent);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-accent", newAccent);
    }
  };

  const theme = THEME_MAP[accent];

  return (
    <ThemeContext.Provider value={{ accent, setAccent, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
