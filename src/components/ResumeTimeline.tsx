import { useState } from "react";
import { GraduationCap, BookOpen, ChevronRight, Binary, Award, ShieldAlert, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { EducationItem } from "../types";
import { useTheme } from "../context/ThemeContext";

export default function ResumeTimeline() {
  const [activeCourse, setActiveCourse] = useState<string>("DBMS");
  const { accent, theme } = useTheme();

  const education: EducationItem[] = [
    {
      institution: "Mahindra University",
      degree: "B.Tech in Computer Science Engineering",
      period: "Aug 2023 – Present",
      description: "Focusing on systems programming, algorithmic foundations, machine intelligence models, database schemas, and advanced distributed operations."
    },
    {
      institution: "Exellencia Junior College",
      degree: "Intermediate State Board (85%)",
      period: "2021 – 2023",
      description: "Rigorous focus on advanced mathematics, physics, and computing science structures."
    },
    {
      institution: "FIITJEE World School",
      degree: "Secondary School Certificate SSC (98%)",
      period: "2020 – 2021",
      description: "Consistent academic excellence representing national science frameworks."
    }
  ];

  // Map courses from resume into custom high-quality descriptors of skill applications
  const courseDescriptions: { [key: string]: { summary: string; tech: string[]; relevance: string } } = {
    "Data Structures": {
      summary: "Theoretical and physical implementation of linear & non-linear nodes (linked lists, trees, graphs, heaps) optimized for timing efficiency.",
      tech: ["C Language", "Big-O Notation", "Trees & Graphs"],
      relevance: "Formed the logic compiler foundations for designing scalable React widgets and custom stock optimizer equations."
    },
    "DBMS": {
      summary: "Database management, Normalization (1NF to BCNF), indexing metrics, ACID properties, standard SQL, and Non-Structured queries.",
      tech: ["SQL", "Relational Algebra", "Indexing"],
      relevance: "Successfully applied during the Basis Laboratories internship to model complex warehouse replenishment cycles."
    },
    "Operating Systems": {
      summary: "Process scheduling, thread managers, virtual memory metrics, paging constraints, and concurrent race-condition handling.",
      tech: ["Process Scheduling", "Thread Pools", "Mutex"],
      relevance: "Essential for understanding React’s event-loop structures and Node's server architectures."
    },
    "Machine Learning": {
      summary: "Statistical algorithms, Supervised vs Unsupervised frameworks, regressors, neural networks, and spatial regression variables.",
      tech: ["Python", "scikit-learn", "Regression"],
      relevance: "Laid the groundwork for stock replenishment calculations and digital forecasts."
    },
    "Probability & Statistics": {
      summary: "Stochastic probability distributions, variance standardizations, hypotheses, and predictive analytics margins.",
      tech: ["Hypothesis Testing", "Bayes Rule", "Probability Curves"],
      relevance: "Critical for computing safety buffers and risk multipliers for product stockouts."
    },
    "Evolutionary Computing": {
      summary: "Genetic algorithms, selection methodologies, mutations, and population fitness optimizations.",
      tech: ["Genetic Algorithms", "Fitness Scoring", "Optimization"],
      relevance: "Enables programmatic problem-solving for routing, delivery channels, and resource placement issues."
    },
    "Quantum Computing": {
      summary: "Quantum bits, state superpositions, quantum logic gates, entanglement matrices, and fundamental quantum math.",
      tech: ["Qubits", "Quantum Gates", "Superposition"],
      relevance: "Explores future-proof computing concepts, security cryptographic models, and data security standards."
    }
  };

  return (
    <section id="about" className="py-20 px-6 bg-zinc-950 border-b border-zinc-900 scroll-mt-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="mb-12 text-center md:text-left">
          <p className={`font-mono text-xs uppercase tracking-widest ${theme.primaryText} font-bold mb-1`}>
            ACADEMIC PATHWAY
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Academic Legacy & Core Coursework
          </h2>
          <p className="font-sans text-zinc-400 text-sm mt-2 max-w-2xl leading-relaxed">
            Exploring academic coordinates at Mahindra University and specialized engineering coursework.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Academic timeline nodes (cols 6) */}
          <div className="lg:col-span-6 relative border-l-2 border-zinc-800 ml-4 pl-8 space-y-12">
            {education.map((edu, index) => (
              <div key={index} className="relative group">
                
                {/* Timeline node icon */}
                <div className={`absolute -left-[45px] top-0 w-8 h-8 rounded-full bg-zinc-900 border border-zinc-850 group-hover:${theme.primaryBorder.split(" ")[0]} flex items-center justify-center transition-colors`}>
                  <GraduationCap className={`w-4 h-4 ${theme.primaryText}`} />
                </div>

                {/* Content card */}
                <div className="space-y-2">
                  <span className={`font-mono text-xs ${theme.primaryText} font-bold`}>
                    {edu.period}
                  </span>
                  <h3 className={`font-sans text-lg font-bold text-white group-hover:${theme.primaryText} transition-colors`}>
                    {edu.institution}
                  </h3>
                  <p className="font-mono text-xs text-zinc-400">
                    {edu.degree}
                  </p>
                  <p className="font-sans text-xs text-zinc-500 leading-relaxed max-w-md pt-1">
                    {edu.description}
                  </p>
                </div>

              </div>
            ))}
          </div>

          {/* Right Column: Mahindra University Coursework browser (cols 6) */}
          <div className="lg:col-span-6 bg-zinc-900/60 border border-zinc-900 rounded-2xl p-6 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 ${theme.glowBg} rounded-full blur-2xl`} />
            
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className={`w-4 h-4 ${theme.primaryText}`} />
              <h3 className="font-mono text-xs uppercase tracking-widest font-extrabold text-zinc-300">
                CSE Coursework Explorer
              </h3>
            </div>
            
            <p className="font-sans text-xs text-zinc-400 mb-6 leading-relaxed">
              Click on any coursework block of <strong>Mahindra University</strong> to examine its context and relevance inside Tanuj's toolset.
            </p>

            {/* Flat Grid Chips of Courses */}
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.keys(courseDescriptions).map((course) => (
                <button
                  key={course}
                  onClick={() => setActiveCourse(course)}
                  className={`px-3 py-2 rounded-lg font-mono text-xs uppercase tracking-wider border transition-all cursor-pointer ${
                    activeCourse === course
                      ? `${theme.badgeBg} ${theme.primaryText} ${theme.primaryBorder} font-bold`
                      : "bg-[#121214]/60 text-zinc-400 border-transparent hover:text-zinc-200"
                  }`}
                >
                  {course}
                </button>
              ))}
            </div>

            {/* Course Card Explanations */}
            <AnimatePresence mode="wait">
              {activeCourse && courseDescriptions[activeCourse] && (
                <motion.div
                  key={activeCourse}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="bg-black/40 border border-zinc-800 p-5 rounded-xl space-y-4"
                >
                  <div>
                    <h4 className="font-sans font-bold text-white text-md flex items-center gap-1.5">
                      <Binary className={`w-4 h-4 ${theme.primaryText}`} />
                      {activeCourse}
                    </h4>
                    <p className="font-sans text-xs text-zinc-400 leading-relaxed mt-2.5 font-light">
                      {courseDescriptions[activeCourse].summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-zinc-850/60 pt-4">
                    
                    {/* Topics bullet list */}
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold mb-1.5">
                        TOPICS STUDIED
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {courseDescriptions[activeCourse].tech.map((t, i) => (
                          <span 
                            key={i} 
                            className="bg-zinc-900 px-2 py-0.5 border border-zinc-850 font-mono text-[9px] text-zinc-300 rounded uppercase"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Personal application relevance */}
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold mb-1">
                        PRACTICAL APPLICATIONS
                      </p>
                      <p className="font-sans text-[11px] text-zinc-400 leading-normal">
                        {courseDescriptions[activeCourse].relevance}
                      </p>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
