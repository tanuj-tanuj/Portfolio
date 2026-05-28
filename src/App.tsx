import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, Phone, Calendar, MapPin, X, Printer, Circle, Heart, Download, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import ProjectShowcase from "./components/ProjectShowcase";
import SkillsGrid from "./components/SkillsGrid";
import ResumeTimeline from "./components/ResumeTimeline";
import ContactForm from "./components/ContactForm";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function MainApp() {
  const [activeSection, setActiveSection] = useState("about");
  const [showResumeModal, setShowResumeModal] = useState(false);
  const { accent, theme } = useTheme();

  // Loading / reloading animation states
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState("Initializing Core Modules...");

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setLoadingPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          const endTimer = setTimeout(() => {
            setIsLoading(false);
          }, 350);
          return 100;
        }

        const nextVal = prev + Math.floor(Math.random() * 8) + 4;
        const boundedVal = Math.min(nextVal, 100);

        if (boundedVal < 25) {
          setLoadingStatus("Retrieving Academic Records from MU...");
        } else if (boundedVal < 50) {
          setLoadingStatus("Compiling Professional Projects & Testing Matrix...");
        } else if (boundedVal < 75) {
          setLoadingStatus("Linking Relational Database & Secrets Modules...");
        } else if (boundedVal < 100) {
          setLoadingStatus("Formulating Secure Client Handshake...");
        } else {
          setLoadingStatus("Tanuj Portfolio Ready.");
        }

        return boundedVal;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Triggers a simulated file download of a beautifully formatted resume PDF representation
  const handleDownloadPdf = () => {
    const pdfContent = `%PDF-1.4
%âãÏÓ
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 595 842] /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
5 0 obj
<< /Length 400 >>
stream
BT
/F1 18 Tf
50 780 Td
(NIMMALA TANUJ - CSE B.TECH RESUME) Tj
/F1 11 Tf
0 -30 Td
(Hyderabad, India | se23ucse125@mahindrauniversity.edu.in) Tj
0 -20 Td
(Phone: +91 9000263945 | GitHub: github.com/Tanuj283) Tj
0 -40 Td
(EDUCATION:) Tj
0 -20 Td
(- Mahindra University: B.Tech in Computer Science Engineering [2023 - Present]) Tj
0 -20 Td
(- Exellencia Junior College: Intermediate [85%]) Tj
0 -20 Td
(- FIITJEE World School: SSC [98%]) Tj
0 -35 Td
(EXPERIENCE & PROJECTS:) Tj
0 -20 Td
(- Data Analysis Intern at Basis Laboratories [Jun-Jul 2025]) Tj
0 -20 Td
(- Laboratory Materials & Inventory Control System [Vite/TS/React]) Tj
0 -20 Td
(- Mahindra University Social App Quality Verification QA Lead) Tj
0 -35 Td
(TECHNICAL SKILLS:) Tj
0 -20 Td
(- Python, C, SQL, TypeScript, React.js, Vite, Tailwind CSS, MongoDB, Excel) Tj
0 -30 Td
(COMPETITIONS, ACTIVITIES & INTERESTS:) Tj
0 -20 Td
(- Cricket, Badminton, and Pickleball tournaments player) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000015 00000 n 
0000000064 00000 n 
0000000121 00000 n 
0000000250 00000 n 
0000000319 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
763
%%EOF`;

    const blob = new Blob([pdfContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Nimmala_Tanuj_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Smooth scroll callback action
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Quick anchor scrolling
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Monitor scrolling to dynamically update active header tab
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "skills", "projects", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const selectionClass = accent === "purple" 
    ? "selection:bg-purple-500/30" 
    : accent === "blue" 
      ? "selection:bg-blue-500/30" 
      : "selection:bg-emerald-500/30";

  return (
    <div className={`min-h-screen bg-black text-zinc-100 font-sans ${selectionClass} selection:text-white antialiased overflow-x-hidden relative`}>
      
      {/* Absolute floating Left Social utility rail (referencing first mock image) */}
      <div className="hidden md:flex flex-col items-center gap-6 fixed bottom-8 left-8 z-40">
        <div className="flex flex-col gap-4 bg-zinc-900/60 backdrop-blur-md border border-zinc-800 p-2.5 rounded-full shadow-xl">
          <a
            href="https://github.com/Tanuj283"
            target="_blank"
            rel="noreferrer noopener"
            className={`w-8 h-8 rounded-full hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:${theme.primaryText} transition-all hover:scale-110 cursor-pointer`}
            title="Nimmala Tanuj on GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/tanuj-nimmala-b80a072a2/"
            target="_blank"
            rel="noreferrer noopener"
            className={`w-8 h-8 rounded-full hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:${theme.primaryText} transition-all hover:scale-110 cursor-pointer`}
            title="Nimmala Tanuj on LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:tanujrao2006@gmail.com"
            className={`w-8 h-8 rounded-full hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:${theme.primaryText} transition-all hover:scale-110 cursor-pointer`}
            title="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
        <div className="w-[1.5px] h-16 bg-gradient-to-b from-zinc-800 to-transparent" />
      </div>

      {/* Main Page Layout Header */}
      <Navigation 
        activeSection={activeSection} 
        onNavigate={handleNavigate}
        onResumeClick={() => setShowResumeModal(true)}
      />

      <main className="max-w-7xl mx-auto pb-12 relative">
        {/* About Section incorporates Hero */}
        <div id="about" className="scroll-mt-24">
          <Hero 
            onNavigate={handleNavigate}
            onResumeClick={() => setShowResumeModal(true)}
          />
        </div>

        {/* Dynamic educational path list */}
        <ResumeTimeline />

        {/* Interactive Skills categorized blocks */}
        <SkillsGrid />

        {/* Sandboxed Projects visual simulation */}
        <ProjectShowcase />

        {/* Contact info and mail forms */}
        <ContactForm />
      </main>

      {/* Floating back-to-top indicator with manual animation re-trigger */}
      <div className="fixed bottom-8 right-8 z-40 flex items-center gap-2 bg-zinc-900/80 backdrop-blur-md border border-zinc-800/80 px-3.5 py-2 rounded-full text-[10px] font-mono text-zinc-400 hover:text-white transition-colors duration-300 shadow-2xl">
        <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500 animate-pulse" />
        <span>NODE CURRENT: HYD</span>
        <span className="w-[1px] h-3.5 bg-zinc-800" />
        <button 
          onClick={() => {
            setLoadingPercent(0);
            setIsLoading(true);
          }}
          className="hover:text-amber-400 focus:text-amber-400 active:scale-90 transition-all font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
          title="Re-run terminal loading animation"
        >
          <RefreshCw className="w-2.5 h-2.5 animate-[spin_4s_linear_infinite]" />
          <span>REBOOT</span>
        </button>
      </div>

      {/* Immersive Start Loading Matrix Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.5, ease: "easeInOut" } }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6 text-zinc-100 overflow-hidden select-none"
          >
            {/* Glowing grids background inside preloader */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(9,9,11,0.2)_0%,rgba(0,0,0,1)_100%)] pointer-events-none" />
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full ${accent === "purple" ? "bg-purple-900/10" : accent === "blue" ? "bg-blue-900/10" : "bg-emerald-900/10"} blur-[100px] pointer-events-none`} />

            {/* Micro-tech frame panel */}
            <motion.div 
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-md bg-zinc-950/85 border border-zinc-900 p-8 rounded-2xl shadow-2xl backdrop-blur-md flex flex-col space-y-6"
            >
              {/* Header panel */}
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${accent === "purple" ? "bg-purple-500" : accent === "blue" ? "bg-blue-500" : "bg-emerald-500"} animate-ping`} />
                  <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">Terminal Boot Sequence</span>
                </div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase">Sec. Auth: active</span>
              </div>

              {/* Dynamic Terminal Data readout */}
              <div className="space-y-3 font-mono text-xs text-zinc-400">
                <div className="flex justify-between items-center bg-zinc-900/40 border border-zinc-900/20 px-3 py-1.5 rounded-lg">
                  <span className="text-zinc-550">TARGET:</span>
                  <span className="text-zinc-200">Nimmala Tanuj</span>
                </div>
                <div className="flex justify-between items-center bg-zinc-900/40 border border-zinc-900/20 px-3 py-1.5 rounded-lg">
                  <span className="text-zinc-550">DEPT:</span>
                  <span className="text-zinc-200">B.Tech CSE QA & Dev</span>
                </div>
                <div className="flex justify-between items-center bg-zinc-900/40 border border-zinc-900/20 px-3 py-1.5 rounded-lg min-h-[36px]">
                  <span className="text-zinc-550">STATUS:</span>
                  <span className={`font-semibold text-right ${accent === "purple" ? "text-purple-400" : accent === "blue" ? "text-blue-400" : "text-emerald-400"}`}>{loadingStatus}</span>
                </div>
              </div>

              {/* Centered large animated percent indicator */}
              <div className="flex flex-col items-center justify-center py-4 relative">
                <div className="relative flex items-center justify-center">
                  {/* Circular orbit loader track */}
                  <div className="w-24 h-24 rounded-full border border-zinc-900" />
                  <div className={`absolute inset-0 rounded-full border border-t-2 ${accent === "purple" ? "border-t-purple-500" : accent === "blue" ? "border-t-blue-500" : "border-t-emerald-500"} animate-spin`} style={{ animationDuration: '1.2s' }} />
                  
                  {/* Core percent figure */}
                  <span className="absolute font-sans font-black text-2xl text-white tracking-widest leading-none">
                    {loadingPercent}%
                  </span>
                </div>
              </div>

              {/* Progress bar scale representation */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>DEPLOYED PAYLOAD</span>
                  <span>{loadingPercent}/100 MB</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-850 p-[1px]">
                  <motion.div 
                    className={`h-full rounded-full bg-gradient-to-r ${accent === "purple" ? "from-purple-500 to-indigo-500" : accent === "blue" ? "from-blue-500 to-indigo-500" : "from-emerald-500 to-indigo-500"}`}
                    style={{ width: `${loadingPercent}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Interactive Skip prompt */}
              <div className="pt-2 text-center">
                <button
                  onClick={() => setIsLoading(false)}
                  className="font-mono text-[9px] text-zinc-400 hover:text-white transition-colors duration-300 uppercase tracking-wider cursor-pointer border border-zinc-900 hover:border-zinc-800 px-3/5 py-2 rounded-lg"
                >
                  Bypass Sequence (Skip Loading)
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive printable Resume modal */}
      <AnimatePresence>
        {showResumeModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            
            {/* Animating Card Frame */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl bg-[#121214] border border-zinc-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
            >
              
              {/* Modal controls */}
              <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
                <span className="font-mono text-xs text-zinc-400 flex items-center gap-2">
                  <Printer className={`w-3.5 h-3.5 ${theme.primaryText}`} />
                  Printable Resume Preview (A4 Optimized)
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownloadPdf}
                    className={`px-3 py-1.5 bg-gradient-to-r ${theme.buttonGradient} text-white font-mono text-[11px] rounded-lg border ${theme.primaryBorder} active:scale-[0.97] transition-all flex items-center gap-1 cursor-pointer shadow-md shadow-zinc-950/20`}
                    title="Simulate secure resume document stream download"
                  >
                    <Download className="w-3 h-3 text-white/95" />
                    <span>Download PDF</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-250 hover:text-white font-mono text-[11px] rounded-lg border border-zinc-700 active:scale-[0.97] transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Printer className="w-3 h-3" />
                    <span>Print</span>
                  </button>
                  <button
                    onClick={() => setShowResumeModal(false)}
                    className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Printable sheet container */}
              <div className="flex-grow p-6 md:p-10 overflow-y-auto bg-white text-zinc-950 text-sans leading-relaxed print-sheet hover:shadow-inner print:p-0 print:m-0 print:border-none">
                
                {/* Header info */}
                <div className="text-center space-y-2 border-b-2 border-zinc-800 pb-6 mb-6">
                  <h2 className="text-3xl font-extrabold font-sans tracking-tight text-zinc-900">
                    Nimmala Tanuj
                  </h2>
                  <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-[11px] text-zinc-600">
                    <span>Hyderabad, India</span>
                    <span>|</span>
                    <span>+91 9000263945</span>
                    <span>|</span>
                    <a href="mailto:se23ucse125@mahindrauniversity.edu.in" className="underline hover:text-zinc-900">
                      se23ucse125@mahindrauniversity.edu.in
                    </a>
                    <span>|</span>
                    <a href="mailto:tanujrao2006@gmail.com" className="underline hover:text-zinc-900">
                      tanujrao2006@gmail.com
                    </a>
                  </div>
                  <div className="flex justify-center gap-4 pt-1 font-mono text-[10px] text-zinc-500">
                    <span>linkedin.com/in/tanuj-nimmala-b80a072a2/</span>
                    <span>•</span>
                    <span>github.com/Tanuj283</span>
                  </div>
                </div>

                {/* Subgrid content details */}
                <div className="space-y-6 text-xs text-zinc-800 print:text-[10px]">
                  
                  {/* EDUCATION */}
                  <div className="space-y-2.5">
                    <h3 className="text-sm font-extrabold font-sans text-zinc-900 uppercase tracking-wider border-b border-zinc-300 pb-1 flex items-center gap-2">
                       Education
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-zinc-900">Mahindra University</p>
                          <p className="font-sans font-medium text-zinc-700">B.Tech in Computer Science Engineering</p>
                          <p className="text-zinc-500 font-sans italic mt-1 leading-normal">
                            Relevant Coursework: Data Structures, DBMS, Operating Systems, Machine Learning, Probability & Statistics, Evolutionary Computing, Quantum Computing
                          </p>
                        </div>
                        <p className="font-mono text-[11px] text-zinc-600 shrink-0 select-none">Aug 2023 – Present</p>
                      </div>

                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-zinc-900">Exellencia Junior College</p>
                          <p className="font-sans text-zinc-700">Intermediate state board (85%)</p>
                        </div>
                        <p className="font-mono text-[11px] text-zinc-600 shrink-0 select-none">2021 – 2023</p>
                      </div>

                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-zinc-900">FIITJEE World School</p>
                          <p className="font-sans text-zinc-700">Secondary School Certificate SSC (98%)</p>
                        </div>
                        <p className="font-mono text-[11px] text-zinc-600 shrink-0 select-none">2020 – 2021</p>
                      </div>
                    </div>
                  </div>

                  {/* SKILLS */}
                  <div className="space-y-2.5">
                    <h3 className="text-sm font-extrabold font-sans text-zinc-900 uppercase tracking-wider border-b border-zinc-300 pb-1">
                      Professional Skills
                    </h3>
                    <div className="space-y-1.5 font-sans leading-normal">
                      <p><strong className="text-zinc-900">Programming Languages:</strong> Python, C, SQL, TypeScript</p>
                      <p><strong className="text-zinc-900">Web Technologies:</strong> React.js, HTML, CSS, Vite, Tailwind CSS</p>
                      <p><strong className="text-zinc-900">Tools & Platforms:</strong> MongoDB, Jira, Jupyter Notebook, MS Excel, GitHub</p>
                      <p><strong className="text-zinc-900">Core Expertise:</strong> Software Development, UI/UX Testing, Database Design, Data Analysis</p>
                    </div>
                  </div>

                  {/* PROJECTS */}
                  <div className="space-y-2.5">
                    <h3 className="text-sm font-extrabold font-sans text-zinc-900 uppercase tracking-wider border-b border-zinc-300 pb-1">
                      Key Projects & Collaborations
                    </h3>
                    
                    <div className="space-y-4">
                      
                      {/* MU social */}
                      <div>
                        <div className="flex justify-between items-start">
                          <p className="font-bold text-zinc-900">Mahindra University Social Networking Application</p>
                          <p className="font-mono text-[11px] text-zinc-600 shrink-0">Jan 2026 – May 2026</p>
                        </div>
                        <span className="text-[10px] text-zinc-500 font-sans block mb-1">Collaborator | Mahindra University QA Lab</span>
                        <ul className="list-disc pl-5 space-y-1 mt-1 font-sans text-zinc-700 leading-normal">
                          <li>Performed functional and usability testing to identify critical bugs and viewport UI inconsistencies.</li>
                          <li>Designed and executed 45+ distinct test cases for verification of user auth logins and data updates.</li>
                          <li>Worked hand-in-hand with core engineers to record and resolve code blocks within timelines.</li>
                          <li>Suggested vital styling improvements to simplify profile layouts and improve student engagement.</li>
                        </ul>
                      </div>

                      {/* Inventory sys */}
                      <div>
                        <div className="flex justify-between items-start">
                          <p className="font-bold text-zinc-900">Laboratory Materials & Inventory Management System</p>
                          <p className="font-mono text-[11px] text-zinc-600 shrink-0">Jun 2025 – Oct 2025</p>
                        </div>
                        <span className="text-[10px] text-zinc-500 font-sans block mb-1">Developer | Basis Laboratories Pvt Ltd</span>
                        <ul className="list-disc pl-5 space-y-1 mt-1 font-sans text-zinc-700 leading-normal">
                          <li>Developed a fully modular responsive SPA controller utilizing React, TypeScript and the Vite stack.</li>
                          <li>Built robust, type-secured UI elements which halved frontend coding redundancies.</li>
                          <li>Constructed visual dashboards plotting layout chemical placements, cost listings, and user levels.</li>
                          <li>Employed AI-assisted development tooling to fast-track syntax tests and pipeline validations.</li>
                        </ul>
                      </div>

                    </div>
                  </div>

                  {/* INTERNSHIP */}
                  <div className="space-y-2.5">
                    <h3 className="text-sm font-extrabold font-sans text-zinc-900 uppercase tracking-wider border-b border-zinc-300 pb-1">
                      Professional Experience
                    </h3>
                    
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-zinc-900">Data Analysis & Warehouse Intern</p>
                        <p className="font-sans text-zinc-700 font-semibold text-[11px]">Basis Laboratories Pvt Ltd.</p>
                        <ul className="list-disc pl-5 space-y-1 mt-1.5 font-sans text-zinc-700 leading-normal">
                          <li>Research and proposed digital coordinate models to mapping materials and physical research stock bins.</li>
                          <li>Conceptualized streamlined relational schema diagrams to facilitate active weekly laboratory stock replenishment.</li>
                          <li>Designed a safety stock forecasting multiplier concept using Excel and python to reduce critical stock-outs.</li>
                        </ul>
                      </div>
                      <p className="font-mono text-[11px] text-zinc-600 shrink-0">Jun 2025 – Jul 2025</p>
                    </div>
                  </div>

                  {/* EXTRA-CURRICULAR */}
                  <div className="space-y-2.5">
                    <h3 className="text-sm font-extrabold font-sans text-zinc-900 uppercase tracking-wider border-b border-zinc-300 pb-1">
                      Activities & Extracurriculars
                    </h3>
                    <div className="space-y-1.5 font-sans leading-normal">
                      <p><strong className="text-zinc-900">Sports & Athletics:</strong> Cricket, Badminton, Pickleball</p>
                      <p><strong className="text-zinc-900">Emerging Interests:</strong> Technological systems development, relational database schemas, software testing, AI twin modules</p>
                      <p><strong className="text-zinc-900">Service:</strong> Energetically volunteered in university tech symposia and engineering campus outreach networks</p>
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom bar of modal */}
              <div className="p-4 bg-zinc-950 border-t border-zinc-805 flex items-center justify-between font-mono text-[10px] text-zinc-500">
                <span>Verified Resume Data | Code: NIMMALA_TANUJ_CV_V2</span>
                <span>Type Escape key to dismiss</span>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
