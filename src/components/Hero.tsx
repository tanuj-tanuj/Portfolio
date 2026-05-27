import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Database, Star, Briefcase, GraduationCap, MapPin, Sparkles, AlertCircle } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface HeroProps {
  onNavigate: (section: string) => void;
  onResumeClick: () => void;
}

type FaceExpression = "smile" | "cool" | "surprised" | "wink";

export default function Hero({ onNavigate, onResumeClick }: HeroProps) {
  const [hoveredOrb, setHoveredOrb] = useState<string | null>(null);
  const [expression, setExpression] = useState<FaceExpression>("smile");
  const [isBlinking, setIsBlinking] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { accent, theme } = useTheme();

  // Floating skill nodes around the center
  const orbs = [
    { id: "typescript", x: 20, y: 22, color: "from-blue-400 to-indigo-505", name: "TypeScript", icon: "TS", desc: "For secure, typed high-scale applications" },
    { id: "react", x: 78, y: 18, color: "from-cyan-400 to-blue-500", name: "React / ViteJS", icon: "⚛", desc: "Constructing modular interfaces at speed" },
    { id: "python", x: 12, y: 72, color: "from-yellow-400 to-green-500", name: "Python", icon: "PY", desc: "Engine for machine learning & complex data workflows" },
    { id: "sql", x: 80, y: 68, color: "from-purple-500 to-pink-500", name: "SQL / Database", icon: "SQL", desc: "Expertise in schemas, relational, and MongoDB structures" },
  ];

  // Periodic physical blinking loop
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3805);
    return () => clearInterval(interval);
  }, []);

  // Capture mouse activity to calculate proportional eye and face shift coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Get pointer coordinates relative to center (-1 to +1 range)
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Proportional translations
  const pupilX = mousePos.x * 4.5;
  const pupilY = mousePos.y * 3.0;
  const headX = mousePos.x * 2.5;
  const headY = mousePos.y * 1.5;
  const eyebrowYShift = expression === "surprised" ? -4 : expression === "cool" ? 2 : 0;

  // Toggle expression presets
  const cycleExpression = () => {
    const sequence: FaceExpression[] = ["smile", "cool", "surprised", "wink"];
    const currentIndex = sequence.indexOf(expression);
    const nextIndex = (currentIndex + 1) % sequence.length;
    setExpression(sequence[nextIndex]);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 px-6 border-b border-zinc-900">
      {/* Absolute Cosmic Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Decorative Radial Aurora Glowing Orbs */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full ${accent === "purple" ? "bg-indigo-900/10" : accent === "blue" ? "bg-blue-900/10" : "bg-emerald-900/10"} blur-[120px] pointer-events-none`} />
      <div className={`absolute top-1/2 right-1/4 w-[280px] h-[280px] rounded-full ${accent === "purple" ? "bg-pink-500/5" : accent === "blue" ? "bg-cyan-500/5" : "bg-teal-500/5"} blur-[90px] pointer-events-none`} />
      <div className={`absolute bottom-10 right-2 w-[220px] h-[220px] rounded-full ${theme.glowBg} blur-[80px] pointer-events-none`} />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Copywriter Typography and Badges */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          
          {/* Quick Info Chip */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${theme.pingBg} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.pingBg}`}></span>
            </span>
            <span className="font-mono text-xs text-zinc-300">Available for Summer Internship placements</span>
          </div>

          {/* Heading with styled typeface */}
          <div className="space-y-2">
            <p className={`font-mono text-xs uppercase tracking-[0.3em] ${theme.primaryText}/80 font-semibold`}>
              HELLO! I'M
            </p>
            <h1 className="font-sans text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-none">
              NIMMALA <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientFrom} to-indigo-400`}>
                TANUJ
              </span>
            </h1>
          </div>

          {/* Interactive Stack overlays matching screen guidelines */}
          <div className="relative mt-2">
            <h2 className="font-sans text-xl md:text-3xl text-zinc-400 lowercase tracking-tight leading-none">
              a computer science student,
            </h2>
            <div className="relative inline-block mt-2">
              {/* Stacked visual effect from the reference slide: Creative Designer / Developer overlay */}
              <span className="absolute -top-4 left-0 font-sans text-5xl md:text-7xl font-bold text-zinc-900/30 select-none uppercase tracking-widest font-extrabold">
                SYSTEMS
              </span>
              <span className="relative z-10 font-sans text-3xl md:text-5xl font-extrabold text-white tracking-wide uppercase">
                DEVELOPER
              </span>
            </div>
          </div>

          <p className="font-sans text-sm md:text-base text-zinc-400 max-w-xl leading-relaxed mt-4">
            Undergrad at <span className="text-white font-medium">Mahindra University</span> specializing in Fullstack Web Applications, Algorithms, and UI/UX Testing. Crafting elegant data models and blazing fast interfaces with optimized stock algorithms.
          </p>          {/* Quick Context Highlights */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md bg-zinc-900/40 border border-zinc-900 p-4 rounded-xl font-mono text-xs mt-2 text-zinc-400">
            <div className="flex items-center gap-2">
              <GraduationCap className={`w-4 h-4 ${theme.primaryText}`} />
              <span>Mahindra University</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span>Hyderabad, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              <span>SQL & MongoDB</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400" />
              <span>98% Grade Average SSC</span>
            </div>
          </div>

          {/* Interactive CTA buttons */}
          <div className="flex items-center gap-4 mt-4 w-full sm:w-auto">
            <button
              onClick={() => onNavigate("ai-assistant")}
              className={`px-6 py-3 bg-gradient-to-r ${theme.buttonGradient} text-white font-sans font-semibold text-xs md:text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-black/30 active:scale-[0.98] transition-all cursor-pointer flex-1 sm:flex-none text-center border ${theme.primaryBorder}`}
            >
              Consult AI twin
            </button>
            <button
              onClick={() => onNavigate("projects")}
              className={`px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:${theme.primaryText} font-mono text-xs md:text-sm uppercase tracking-wider rounded-xl border border-zinc-800 hover:border-zinc-700 active:scale-[0.98] transition-all cursor-pointer flex-1 sm:flex-none text-center`}
            >
              Browse Works
            </button>
          </div>
        </div>

        {/* Right Side: High-polish custom interactive Claymorphic SVG Canvas Avatar representation */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center min-h-[420px]">
          
          {/* Main Visual Frame */}
          <div 
            onClick={cycleExpression}
            className={`relative w-[320px] h-[320px] md:w-[380px] md:h-[380px] bg-gradient-to-tr ${accent === "purple" ? "from-purple-950/30" : accent === "blue" ? "from-blue-950/30" : "from-emerald-950/30"} to-zinc-950 rounded-full border border-zinc-800/80 flex items-center justify-center shadow-2xl ${accent === "purple" ? "shadow-purple-500/10" : accent === "blue" ? "shadow-blue-500/10" : "shadow-emerald-500/10"} overflow-visible cursor-pointer group active:scale-[0.99] transition-transform`}
            title="Click to cycle Tanuj's expression!"
          >
            
            {/* Spinning code aura orbits */}
            <div className={`absolute inset-0 border ${theme.primaryBorder} border-dashed rounded-full animate-[spin_55s_linear_infinite]`} />
            <div className="absolute -inset-4 border border-zinc-700/15 border-dashed rounded-full animate-[spin_35s_linear_infinite_reverse]" />
            
            {/* Outer dynamic ambient rim glow mirroring uploaded visual look */}
            <div className={`absolute inset-2 bg-gradient-to-tr ${theme.gradientFrom}/10 to-transparent blur-md rounded-full pointer-events-none group-hover:opacity-100 opacity-60 transition-opacity`} />

            {/* Clay-style custom Avatar character represented as an interactive physical vector graphic */}
            <div className="relative z-10 w-4/5 h-4/5 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-full h-full select-none">
                {/* Background soft lighting */}
                <defs>
                  <radialGradient id="g-back" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="0.45" />
                    <stop offset="60%" stopColor="#c084fc" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#121214" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="g-shirt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="#09090b" />
                  </linearGradient>
                  <linearGradient id="g-skin" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f4f4f5" />
                    <stop offset="50%" stopColor="#e4e4e7" />
                    <stop offset="100%" stopColor="#b1b1b6" />
                  </linearGradient>
                  <linearGradient id="g-hair" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1e1b4b" />
                    <stop offset="100%" stopColor="#09090b" />
                  </linearGradient>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.5" />
                  </filter>
                </defs>

                {/* Ambient dynamic radial illumination */}
                <circle cx="100" cy="100" r="90" fill="url(#g-back)" />

                {/* Torso & Collar - follows mouse slightly */}
                <g style={{ transform: `translate(${headX * 0.4}px, ${headY * 0.3}px)` }} className="transition-transform duration-300">
                  <path d="M 50,195 Q 100,140 150,195 Z" fill="url(#g-shirt)" />
                  <ellipse cx="100" cy="148" rx="22" ry="7" fill="#312e81" />
                  <ellipse cx="100" cy="145" rx="18" ry="5" fill="#1e1b4b" />
                </g>

                {/* Neck & Head Base group with coordinated relative look-at translations */}
                <g style={{ transform: `translate(${headX}px, ${headY}px)` }} className="transition-transform duration-200">
                  
                  {/* Neck */}
                  <rect x="88" y="115" width="24" height="32" rx="4" fill="url(#g-skin)" />

                  {/* Ears (Behind head base) */}
                  <g className="transition-all duration-300">
                    <circle cx="62" cy="92" r="12" fill="url(#g-skin)" />
                    <circle cx="62" cy="92" r="7" fill="#d4d4d8" />
                    <circle cx="138" cy="92" r="12" fill="url(#g-skin)" />
                    <circle cx="138" cy="92" r="7" fill="#d4d4d8" />
                  </g>

                  {/* Head Base */}
                  <path d="M 65,85 Q 65,130 100,130 Q 135,130 135,85 Q 135,55 100,55 Q 65,55 65,85" fill="url(#g-skin)" filter="url(#shadow)" />

                  {/* Stylized Clay Black Hair and Sideburns */}
                  <path d="M 64,80 Q 60,65 70,52 Q 85,38 100,42 Q 120,38 130,52 Q 138,62 136,80 Q 132,80 131,70 Q 120,60 100,60 Q 80,60 69,70 Q 66,78 64,80 Z" fill="url(#g-hair)" />
                  
                  {/* Hair fringe strands */}
                  <path d="M 72,55 Q 100,62 105,53 Q 110,65 130,58" stroke="#312e81" strokeWidth="3" strokeLinecap="round" fill="none" />

                  {/* Interactive Eyes Section (Dynamic Blinking and pupil look tracking) */}
                  <g>
                    {/* Left Eye White ellipse - blinks by reducing height */}
                    <ellipse cx="84" cy="88" rx="8" ry={isBlinking ? 0.3 : expression === "cool" ? 4.5 : expression === "surprised" ? 8 : 6} fill="#ffffff" className="transition-all duration-100" />
                    
                    {/* Right Eye White ellipse - blinks or closes for wink */}
                    <ellipse 
                      cx="116" 
                      cy="88" 
                      rx="8" 
                      ry={isBlinking || expression === "wink" ? 0.3 : expression === "cool" ? 4.5 : expression === "surprised" ? 8 : 6} 
                      fill="#ffffff" 
                      className="transition-all duration-100" 
                    />

                    {/* Irises & Pupils - invisible when fully blinked closed */}
                    <g opacity={isBlinking ? 0 : 1} className="transition-opacity duration-75">
                      
                      {/* Left Iris (Includes relative mouse offset translations) */}
                      <g style={{ transform: `translate(${pupilX}px, ${pupilY}px)` }} className="transition-all duration-200">
                        <circle cx="84" cy="88" r="4.2" fill="#4f46e5" />
                        <circle cx="84.2" cy="87" r="1.5" fill="#1e1b4b" />
                        {/* Catchlight */}
                        <circle cx="82.5" cy="85.5" r="1.3" fill="#ffffff" />
                      </g>

                      {/* Right Iris (Includes relative mouse offset, hidden if winking) */}
                      <g 
                        opacity={expression === "wink" ? 0 : 1} 
                        style={{ transform: `translate(${pupilX}px, ${pupilY}px)` }} 
                        className="transition-all duration-200"
                      >
                        <circle cx="116" cy="88" r="4.2" fill="#4f46e5" />
                        <circle cx="116.2" cy="87" r="1.5" fill="#1e1b4b" />
                        {/* Catchlight */}
                        <circle cx="114.5" cy="85.5" r="1.3" fill="#ffffff" />
                      </g>

                    </g>
                    
                    {/* Wink horizontal resting line when winking */}
                    {expression === "wink" && (
                      <path d="M 108,88 Q 116,92 124,88" stroke="#312e81" strokeWidth="2" strokeLinecap="round" fill="none" />
                    )}
                  </g>

                  {/* Thick cool eyebrows - reacts to cursor and expressions */}
                  <g style={{ transform: `translateY(${eyebrowYShift}px)` }} className="transition-transform duration-300">
                    {/* Left eyebrow slants down for cool expression */}
                    <path 
                      d={expression === "cool" ? "M 74,80 Q 84,81 90,83" : "M 74,78 Q 84,76 90,81"} 
                      stroke="#09090b" 
                      strokeWidth="3.2" 
                      strokeLinecap="round" 
                      fill="none" 
                    />
                    {/* Right eyebrow slants down for cool expression */}
                    <path 
                      d={expression === "cool" ? "M 126,80 Q 116,81 110,83" : "M 126,78 Q 116,76 110,81"} 
                      stroke="#09090b" 
                      strokeWidth="3.2" 
                      strokeLinecap="round" 
                      fill="none" 
                    />
                  </g>

                  {/* Cute nose - shifts with head perspective */}
                  <path 
                    d="M 97,94 Q 100,105 103,94" 
                    stroke="#b1b1b6" 
                    strokeWidth="2.8" 
                    strokeLinecap="round" 
                    fill="none" 
                    style={{ transform: `translateX(${headX * 0.4}px)` }}
                    className="transition-transform duration-300"
                  />

                  {/* Mouth expressions */}
                  <g className="transition-all duration-300">
                    {expression === "smile" && (
                      <path d="M 88,110 Q 100,118 112,110" stroke="#4f46e5" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                    )}
                    {expression === "cool" && (
                      <path d="M 89,112 Q 100,113 111,112" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" fill="none" />
                    )}
                    {expression === "surprised" && (
                      <circle cx="100" cy="113" r="5" fill="none" stroke="#4f46e5" strokeWidth="2.8" />
                    )}
                    {expression === "wink" && (
                      <path d="M 89,109 Q 100,118 111,111" stroke="#ec4899" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                    )}
                  </g>

                  {/* High tech glow headset bar */}
                  <path d="M 52,90 Q 100,32 148,90" stroke={accent === "purple" ? "#ec4899" : accent === "blue" ? "#22d3ee" : "#34d399"} strokeWidth="2" strokeDasharray="5,5" fill="none" opacity="0.6"/>
                </g>
              </svg>
            </div>

            {/* Orbiting Tech Floating Orbs */}
            {orbs.map((orb) => (
              <div
                key={orb.id}
                className="absolute cursor-pointer group"
                style={{ left: `${orb.x}%`, top: `${orb.y}%` }}
                onMouseEnter={() => setHoveredOrb(orb.id)}
                onMouseLeave={() => setHoveredOrb(null)}
              >
                <div className={`relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${orb.color} text-zinc-950 font-bold font-mono text-xs shadow-lg shadow-purple-900/10 border border-white/20 transition-all duration-300 transform group-hover:scale-125 group-hover:rotate-12`}>
                  {orb.icon}

                  {/* Ripple Pulse wave effect */}
                  <span className="absolute -inset-1 rounded-xl bg-inherit opacity-20 group-hover:animate-ping pointer-events-none" />
                </div>

                {/* Expanded text hover tooltip */}
                <AnimatePresence>
                  {hoveredOrb === orb.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 15 }}
                      className="absolute z-35 bottom-12 -left-20 w-48 p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 shadow-xl"
                    >
                      <h4 className="font-sans font-bold text-xs text-white flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        {orb.name}
                      </h4>
                      <p className="font-mono text-[10px] text-zinc-400 mt-1 leading-tight">
                        {orb.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Interactive controls info text */}
          <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-zinc-500 bg-zinc-900/30 border border-zinc-900/60 rounded-full px-4 py-1.5 animate-pulse">
            <span className={`w-1.5 h-1.5 rounded-full ${theme.pingBg} animate-ping`} />
            <span>Expression: <strong className="text-zinc-300 uppercase">{expression}</strong> (Click head to toggle!)</span>
          </div>

          {/* Prompt info chip near Avatar node */}
          <div className="absolute bottom-2 right-2 bg-zinc-900/60 border border-zinc-800/80 rounded-lg px-2.5 py-1 text-zinc-500 font-mono text-[9px] flex items-center gap-1 hover:text-white transition-colors cursor-help">
            <Terminal className={`w-2.5 h-2.5 ${theme.primaryText}`} /> CLAY_PERSPECTIVE_TRACKING: OK
          </div>
        </div>

      </div>
    </section>
  );
}
