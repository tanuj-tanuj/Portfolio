import { useState } from "react";
import { Award, Code2, Cpu, Database, Eye, Terminal, Globe, Layout, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SkillItem } from "../types";
import { useTheme } from "../context/ThemeContext";

export default function SkillsGrid() {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>({
    name: "TypeScript",
    category: "programming",
    level: 88,
    description: "Applied to build type-safe inventory screens, structures, and dashboard schemas reducing state-handling bugs."
  });
  const { accent, theme } = useTheme();

  const skills: SkillItem[] = [
    // Programming
    { name: "Python", category: "programming", level: 85, description: "Used for machine learning concepts, statistical safety calculations, and automated analysis scripting during Basis Laboratories internship." },
    { name: "TypeScript", category: "programming", level: 88, description: "Applied to build type-safe inventory screens, structures, and dashboard schemas reducing state-handling bugs." },
    { name: "C Language", category: "programming", level: 82, description: "Developed primary systems knowledge, algorithmic layouts, and memory-aware data structures at Mahindra University." },
    { name: "SQL", category: "programming", level: 90, description: "Crafted complex query sets, table structures, and mapped relational database models supporting student records & stock replenishments." },
    
    // Web Technologies
    { name: "React.js", category: "web", level: 91, description: "Constructed nested component SPAs, custom reactive states, with responsive layouts for Basis Laboratories Inventory projects." },
    { name: "Vite", category: "web", level: 85, description: "Leveraged for ultra-fast bundler builds, asset rendering optimization, and hot server setups on single-page web projects." },
    { name: "HTML & CSS", category: "web", level: 93, description: "Engineered detailed styling grids, dynamic viewports, responsive interfaces, and custom animation curves." },
    
    // Tools
    { name: "MongoDB", category: "tools", level: 80, description: "Implemented non-relational document storages and chemical coordinate schemas for Basis Laboratories database integrations." },
    { name: "GitHub", category: "tools", level: 87, description: "Employed for branch management, pipeline releases, coding repositories reviews, and asynchronous collaboration workflows." },
    { name: "Jupyter Notebook", category: "tools", level: 84, description: "Employed to test statistical models, stock-out probabilities, and data visualization analytics curves in Python." },
    { name: "Jira", category: "tools", level: 81, description: "Utilized for project sprints, bug reporting logs, development coordination, and workflow tracking at Mahindra University." },
    
    // Core Skills
    { name: "UI/UX Testing", category: "core", level: 92, description: "Drafted test scenarios, executing multi-browser usability flows to debug menu layouts and response margins." },
    { name: "Database Design", category: "core", level: 89, description: "Conceptualized relational schema architectures, safety-stock level calculations, and laboratory coordination maps." },
    { name: "Data Analysis", category: "core", level: 86, description: "Proposed digital safety variables, inventory forecast formulas, and parsed data points in excel as an intern." },
    { name: "Software Development", category: "core", level: 88, description: "Coordinated systems architectures and modular component models following agile methodologies." }
  ];

  const categories = [
    { id: "programming", label: "Languages", icon: Code2, color: "text-blue-400" },
    { id: "web", label: "Web Technologies", icon: Globe, color: "text-emerald-400" },
    { id: "tools", label: "Tools & Platforms", icon: Database, color: "text-purple-400" },
    { id: "core", label: "Core Expertise", icon: Award, color: "text-amber-400" }
  ];

  return (
    <section id="skills" className="py-20 px-6 bg-zinc-950 border-b border-zinc-900 scroll-mt-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center md:text-left mb-12">
          <p className={`font-mono text-xs uppercase tracking-widest ${theme.primaryText} font-bold mb-1`}>
            TECHNICAL ACUMEN
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Classified Skills & Practical Deployments
          </h2>
          <p className="font-sans text-zinc-400 text-sm mt-2 max-w-2xl leading-relaxed">
            Click on any individual capability to see exactly how Tanuj has applied that expertise in professional environments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Grid Panel: Modular skill categories (cols 8) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const catSkills = skills.filter((s) => s.category === cat.id);
              
              return (
                <div 
                  key={cat.id} 
                  className="bg-zinc-900/40 border border-zinc-900/80 rounded-xl p-5 hover:border-zinc-800 transition-colors"
                >
                  <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-zinc-805/40">
                    <IconComp className={`w-4 h-4 ${cat.color}`} />
                    <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-zinc-300">
                      {cat.label}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {catSkills.map((skill) => (
                      <div
                        key={skill.name}
                        onClick={() => setSelectedSkill(skill)}
                        className={`group cursor-pointer p-2.5 rounded-lg border transition-all ${
                          selectedSkill?.name === skill.name
                            ? `bg-zinc-800/80 ${theme.primaryBorder} text-white`
                            : "border-transparent bg-[#121214]/40 hover:bg-zinc-900/60"
                        }`}
                      >
                        <div className="flex items-center justify-between font-sans text-xs mb-1.5">
                          <span className={`${
                            selectedSkill?.name === skill.name ? "text-white font-bold" : "text-zinc-300 group-hover:text-white"
                          } transition-colors`}>
                            {skill.name}
                          </span>
                          <span className={`font-mono text-[9px] ${theme.primaryText} ${theme.badgeBg} px-2 py-0.5 rounded-full border ${theme.primaryBorder}`}>
                            {skill.level}%
                          </span>
                        </div>

                        {/* Slider indicator bar */}
                        <div className="w-full h-1 bg-zinc-950 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1 }}
                            className={`h-full bg-gradient-to-r ${accent === "purple" ? "from-purple-500 to-indigo-500" : accent === "blue" ? "from-blue-500 to-indigo-500" : "from-emerald-500 to-indigo-500"} rounded-full`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>

          {/* Right Panel: Selected Skill Context Viewer (cols 4) */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative overflow-hidden">
               <div className={`absolute top-0 right-0 w-24 h-24 ${theme.glowBg} rounded-full blur-xl`} />
              
              <div className="flex items-center gap-2 mb-4">
                <Terminal className={`w-4 h-4 ${theme.primaryText}`} />
                <span className={`font-mono text-[10px] uppercase tracking-widest ${theme.primaryText} font-semibold`}>
                  CONTEXTUAL ANALYTICS
                </span>
              </div>

              {selectedSkill ? (
                <div className="space-y-5">
                  <div>
                    <h4 className="font-sans font-extrabold text-2xl text-white tracking-tight leading-none flex items-center justify-between">
                      <span>{selectedSkill.name}</span>
                    </h4>
                    <span className="inline-block mt-2 px-2.5 py-0.5 rounded bg-zinc-950 text-zinc-400 font-mono text-[10px] uppercase tracking-widest border border-zinc-850">
                      {selectedSkill.category === "programming" && "Language Module"}
                      {selectedSkill.category === "web" && "Web Framework Engine"}
                      {selectedSkill.category === "tools" && "Deployment & Tool stack"}
                      {selectedSkill.category === "core" && "Systems Methodology"}
                    </span>
                  </div>

                  <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800 space-y-3">
                    <p className="font-sans text-xs text-zinc-300 leading-relaxed font-light">
                      {selectedSkill.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified on live resume data</span>
                    </div>
                  </div>

                  <div className={`p-3 ${accent === "purple" ? "bg-purple-500/5 border-purple-500/10" : accent === "blue" ? "bg-blue-500/5 border-blue-500/10" : "bg-emerald-500/5 border-emerald-500/10"} border rounded-lg`}>
                    <p className="font-mono text-zinc-500 text-[10px] leading-relaxed">
                      💡 Ask Tanuj's AI Twin about his familiarity with <span className={`${theme.primaryText} font-bold`}>{selectedSkill.name}</span> in the assistant panel below for immediate context!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center text-center">
                  <p className="font-sans text-zinc-500 text-xs text-center font-light">
                    Select any specific skill on the left to review its physical application context.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
