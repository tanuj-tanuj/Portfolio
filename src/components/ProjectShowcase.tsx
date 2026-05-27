import { useState } from "react";
import { 
  FolderGit, 
  Terminal, 
  Play, 
  RefreshCcw, 
  CheckCircle, 
  Building2, 
  Calendar, 
  Tag, 
  Cpu, 
  Sliders, 
  TrendingUp, 
  AlertCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";
import { useTheme } from "../context/ThemeContext";

export default function ProjectShowcase() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("mu-social");
  const { accent, theme } = useTheme();
  
  // Terminal logs state for MU Social App simulator
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "System standby. Click 'RUN AUTOMATED INTEGRATION TEST' to start audit...",
  ]);
  const [isRunningTest, setIsRunningTest] = useState(false);

  // Inventory optimizer variables for Basis Labs simulation
  const [safetyStockDays, setSafetyStockDays] = useState<number>(14);
  const [monthlyDemandVolume, setMonthlyDemandVolume] = useState<number>(450);
  const [supplierLeadTime, setSupplierLeadTime] = useState<number>(5);

  const projects: Project[] = [
    {
      id: "mu-social",
      name: "Mahindra University Social Networking Application",
      organization: "Mahindra University",
      period: "Jan 2026 – May 2026",
      description: "Dedicated testing & user engineering deployment focused on quality assurance, test case compilation, and usability optimization for the campus-wide social framework.",
      details: [
        "Performed intensive functional and usability testing across multiple browser devices to flag critical auth and notification bugs.",
        "Designed and executed 45+ written test cases focusing on secured password routing and multi-user interaction protocols.",
        "Coordinated with core backend engineers to report database errors, reducing resolve times by 25%.",
        "Pioneered critical UI/UX improvements including viewport adjustments, rounded menu items, and fluid scroll anchors to boost mobile conversion."
      ],
      tech: ["Manual & Automated Testing", "UI/UX Audits", "Bug Documentation", "Collaborative Workflows"],
      interactiveType: "social-app"
    },
    {
      id: "inventory-sys",
      name: "Basis Labs Inventory Management System",
      organization: "Basis Laboratories Pvt Ltd",
      period: "Jun 2025 – Oct 2025",
      description: "A high-performance full-stack inventory controller built to manage research materials, location hierarchies, and B2B vendor inquiries with automated AI helpers.",
      details: [
        "Crafted a rapid responsive SPA using React, modern TypeScript, and the Vite compilation suite.",
        "Constructed structured, type-safe reusable widgets, saving 35% of frontend coding overhead.",
        "Engineered visual dashboards detailing chemicals, room placement, and laboratory lead controls.",
        "Utilized modern AI copilot tooling for rapid debugger runs and continuous-integration validation."
      ],
      tech: ["React.js", "TypeScript", "Vite", "MongoDB", "Tailwind CSS"],
      interactiveType: "inventory-manager"
    },
    {
      id: "data-intern",
      name: "Data Analysis & Stock Safety Internship",
      organization: "Basis Laboratories Pvt Ltd.",
      period: "Jun 2025 – Jul 2025",
      description: "Data intelligence intern role proposing digital tracking workflows and AI-driven stock safety stock parameters.",
      details: [
        "Proposed cloud-integrated scanning coordinates to map physical inventory storage units accurately.",
        "Mapped high-integrity database relational workflows supporting dynamic laboratory replenishment cycles.",
        "Designed a smart statistical inventory forecasting concept to reduce stockouts by 18% during peak periods."
      ],
      tech: ["Data Analytics", "Probability & Stats", "Database Schema Design", "Python", "MS Excel"],
      interactiveType: "data-analyst"
    }
  ];

  // Run the MU Social Networking test case simulator
  const startUsabilitySuite = async () => {
    if (isRunningTest) return;
    setIsRunningTest(true);
    setTerminalLogs(["[INFO] Initiating MU Social App automation audit thread..."]);
    
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    
    await sleep(650);
    setTerminalLogs(prev => [...prev, "[OK] Found testing schema config. Loading auth scenarios..."]);
    
    await sleep(700);
    setTerminalLogs(prev => [...prev, "[RUN] Testing user authentication password hashes... [STATUS: 15/15 SECURE]"]);
    
    await sleep(800);
    setTerminalLogs(prev => [...prev, "[WARNING] Found UI/UX layout padding conflicts on smaller mobile viewports (index 124px margin overlapping)."]);
    
    await sleep(750);
    setTerminalLogs(prev => [...prev, "[PATCH] Applying fluid grid media-queries to profile panels..."]);
    
    await sleep(900);
    setTerminalLogs(prev => [
      ...prev,
      "[SUCCESS] Patch verified. Tested navigation lag: 8ms. UI accessibility check: 100% compliant.",
      "----------------------------------------------------------------",
      "🎉 Usability optimization successful! All test modules passed on 0 errors."
    ]);
    setIsRunningTest(false);
  };

  // Calculations for Basis Labs Forecast optimizer
  const calculatedSafetyStock = Math.ceil((monthlyDemandVolume / 30) * supplierLeadTime + (safetyStockDays * 1.5));
  const holdingRiskCost = calculatedSafetyStock * 12; // visual estimation
  const potentialStockoutRisk = Math.max(0, Math.floor(100 - (safetyStockDays * 4.5) - (calculatedSafetyStock / 3)));

  const currentProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  return (
    <section id="projects" className="py-20 px-6 bg-zinc-950 border-b border-zinc-900 scroll-mt-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className={`font-mono text-xs uppercase tracking-widest ${theme.primaryText} font-bold mb-1`}>
              ENGINEERING SANDBOX
            </p>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Selected Projects & Simulations
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 p-1.5 rounded-full">
            {projects.map((proj) => (
              <button
                key={proj.id}
                onClick={() => setSelectedProjectId(proj.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  selectedProjectId === proj.id
                    ? `${theme.badgeBg} ${theme.primaryText} border ${theme.primaryBorder}`
                    : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                }`}
              >
                {proj.id === "mu-social" ? "MU Social App" : proj.id === "inventory-sys" ? "Inventory SPA" : "Analytics Intern"}
              </button>
            ))}
          </div>
        </div>

        {/* Major Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Description and details (cols 7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-zinc-900/60 border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-32 h-32 ${theme.glowBg} rounded-full blur-2xl`} />
              
              {/* Org. Name and Calendar Period */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500">
                <span className="flex items-center gap-1.5 text-zinc-400 bg-zinc-900 border border-zinc-800/80 px-2.5 py-1 rounded-full">
                  <Building2 className={`w-3.5 h-3.5 ${theme.primaryText}`} />
                  {currentProject.organization}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  {currentProject.period}
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="font-sans text-2xl font-bold text-white leading-tight">
                  {currentProject.name}
                </h3>
                <p className="font-sans text-zinc-400 text-sm mt-3 leading-relaxed">
                  {currentProject.description}
                </p>
              </div>

              {/* Technologies list */}
              <div className="flex flex-wrap gap-2 pt-2">
                {currentProject.tech.map((t, idx) => (
                  <span 
                    key={idx}
                    className="px-2.5 py-1 bg-zinc-950/80 border border-zinc-800 text-zinc-300 rounded font-mono text-[10px] uppercase tracking-wider flex items-center gap-1"
                  >
                    <Tag className={`w-2.5 h-2.5 ${theme.primaryText}`} />
                    {t}
                  </span>
                ))}
              </div>

              {/* Highlight Bullets */}
              <div className="border-t border-zinc-800/60 pt-6 space-y-3.5">
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">
                  CORE TASKS & CONTRIBUTIONS
                </h4>
                {currentProject.details.map((bullet, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className={`w-4 h-4 ${theme.primaryText} shrink-0 mt-0.5`} />
                    <p className="font-sans text-sm text-zinc-300 leading-relaxed">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Immersive Interactive Sandbox Simulator (cols 5) */}
          <div className="lg:col-span-5 h-full">
            <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 h-full flex flex-col justify-between space-y-6">
              
              {/* Header Box */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className={`w-4 h-4 ${theme.primaryText} animate-pulse`} />
                  <span className={`font-mono text-xs uppercase tracking-widest ${theme.primaryText} font-semibold`}>
                    Interactive Sandbox Module
                  </span>
                </div>
                <h4 className="font-sans font-bold text-white text-md">
                  {currentProject.interactiveType === "social-app" && "MU Autotesting Verification Console"}
                  {currentProject.interactiveType === "inventory-manager" && "React Stock Level Tracker"}
                  {currentProject.interactiveType === "data-analyst" && "AI-Driven Safety Stock Optimization Calculator"}
                </h4>
                <p className="font-sans text-xs text-zinc-400 mt-1 leading-relaxed">
                  {currentProject.interactiveType === "social-app" && "Trigger automated usability test runs to discover padding irregularities."}
                  {currentProject.interactiveType === "inventory-manager" && "Add test chemical materials and watch the dynamic state update."}
                  {currentProject.interactiveType === "data-analyst" && "Fine-tune lead cycles and safety days to simulate the ideal warehouse configuration."}
                </p>
              </div>

              {/* Interactive Widget Display based on project */}
              <div className="bg-zinc-950 border border-zinc-800/60 rounded-xl p-4 flex-grow min-h-[220px] flex flex-col justify-center">
                
                {/* 1. SOCIAL APP SIMULATOR (Console terminal) */}
                {currentProject.interactiveType === "social-app" && (
                  <div className="flex flex-col h-full justify-between space-y-4">
                    <div className="flex-grow bg-black p-3.5 rounded-lg border border-zinc-800 font-mono text-[11px] text-zinc-400 space-y-1.5 h-44 overflow-y-auto leading-normal">
                      {terminalLogs.map((log, i) => (
                        <div 
                          key={i} 
                          className={log.startsWith("[SUCCESS]") ? "text-emerald-400" : log.startsWith("[WARNING]") ? "text-amber-400" : "text-zinc-400"}
                        >
                          {log}
                        </div>
                      ))}
                    </div>
                    
                    <button
                      onClick={startUsabilitySuite}
                      disabled={isRunningTest}
                      className={`w-full py-2.5 rounded-lg font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        isRunningTest 
                          ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
                          : `${theme.badgeBg} ${theme.primaryText} hover:opacity-90 border ${theme.primaryBorder}`
                      }`}
                    >
                      {isRunningTest ? (
                        <>
                          <RefreshCcw className="w-3.5 h-3.5 animate-spin" />
                          Testing UI Anchors...
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          Run Automated Integrations
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* 2. INVENTORY MANAGER (Item builder) */}
                {currentProject.interactiveType === "inventory-manager" && (
                  <div className="space-y-4">
                    <div className="bg-black p-3.5 rounded-lg border border-zinc-800 space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-400">Chemical Compound ID</span>
                        <span className={`${theme.primaryText}`}>#BL-8921-TS</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-400">Quantity</span>
                        <span className="text-zinc-200">140 Liters</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-400">Storage Coordinates</span>
                        <span className="text-zinc-200">Suite-4, Cold Room B</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-300">Status</span>
                        <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                          STABLE SAFETY BUFFER
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                      <Sliders className={`w-3.5 h-3.5 ${theme.primaryText}`} />
                      <span>Simulates React/TypeScript state updates</span>
                    </div>
                  </div>
                )}

                {/* 3. DATA ANALYST (Visual slider optimizer) */}
                {currentProject.interactiveType === "data-analyst" && (
                  <div className="space-y-4">
                    
                    {/* Live Metric result dashboard */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-black/80 border border-zinc-800 p-2.5 rounded-lg text-center">
                        <p className="font-mono text-[9px] text-zinc-500">SAFETY STOCK</p>
                        <p className="font-sans font-extrabold text-white text-lg mt-0.5">{calculatedSafetyStock} units</p>
                      </div>
                      <div className="bg-black/80 border border-zinc-800 p-2.5 rounded-lg text-center">
                        <p className="font-mono text-[9px] text-zinc-500">HOLDING COST</p>
                        <p className={`font-sans font-extrabold ${theme.primaryText} text-lg mt-0.5`}>${holdingRiskCost}/yr</p>
                      </div>
                      <div className="bg-black/80 border border-zinc-800 p-2.5 rounded-lg text-center">
                        <p className="font-mono text-[9px] text-zinc-500">STOCKOUT RISK</p>
                        <p className={`font-sans font-extrabold text-lg mt-0.5 ${potentialStockoutRisk > 40 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {potentialStockoutRisk}%
                        </p>
                      </div>
                    </div>

                    {/* Adjustable Interactive Sliders */}
                    <div className="space-y-3 pt-2 text-xs">
                      <div>
                        <div className="flex items-center justify-between mb-1 font-mono text-zinc-400">
                          <span className="text-[11px]">Safety Buffer Days ({safetyStockDays})</span>
                          <span className={`@values ${theme.primaryText} font-bold`}>14d optimal</span>
                        </div>
                        <input 
                          type="range" 
                          min="2" 
                          max="30" 
                          value={safetyStockDays} 
                          onChange={(e) => setSafetyStockDays(parseInt(e.target.value))}
                          className={`w-full h-1 bg-zinc-800 accent-${accent === "purple" ? "purple" : accent === "blue" ? "blue" : "emerald"}-500 rounded-lg appearance-none cursor-pointer`}
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1 font-mono text-zinc-400">
                          <span className="text-[11px]">Supplier Cycle Lead Time ({supplierLeadTime}d)</span>
                        </div>
                        <input 
                          type="range" 
                          min="1" 
                          max="15" 
                          value={supplierLeadTime} 
                          onChange={(e) => setSupplierLeadTime(parseInt(e.target.value))}
                          className={`w-full h-1 bg-zinc-800 accent-${accent === "purple" ? "purple" : accent === "blue" ? "blue" : "emerald"}-500 rounded-lg appearance-none cursor-pointer`}
                        />
                      </div>
                    </div>

                    <div className="bg-zinc-900/60 p-2.5 rounded-lg flex items-start gap-2 border border-zinc-800">
                      <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-[10px] font-mono text-zinc-400 leading-normal">
                        Using safety-multiplier formulas proposed by Tanuj. Holding fees are minimized when safety buffer is aligned near <span className="text-white">14 days</span>.
                      </p>
                    </div>

                  </div>
                )}

              </div>

              {/* Bottom badge */}
              <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-900 flex items-center justify-between font-mono text-[10px] text-zinc-500">
                <span className="flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> Client Sandbox Node</span>
                <span className="text-zinc-600">STATE: VERIFIED_READY</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
