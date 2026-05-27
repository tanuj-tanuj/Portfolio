import { useState, FormEvent } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Github, Linkedin, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../context/ThemeContext";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { accent, theme } = useTheme();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSending(true);
    // Simulate digital dispatching progress
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1800);
  };

  return (
    <section id="contact" className="py-20 px-6 bg-zinc-950 scroll-mt-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="mb-12 text-center md:text-left">
          <p className={`font-mono text-xs uppercase tracking-widest ${theme.primaryText} font-bold mb-1`}>
            ESTABLISH COMMUNICATION
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Contact & Digital Coordinates
          </h2>
          <p className="font-sans text-zinc-400 text-sm mt-2 max-w-2xl leading-relaxed">
            Reach out directly for summer internships, collaborations, or simply to chat about algorithms and pickleball!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info cards & links */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-zinc-900/60 border border-zinc-900 rounded-2xl p-6 space-y-6">
              <h3 className="font-sans font-bold text-white text-md">
                Direct Contact Metrics
              </h3>
              
              <div className="space-y-4">
                
                {/* Email 1 */}
                <div className="flex items-start gap-3.5">
                  <div className={`w-9 h-9 rounded-xl bg-zinc-950 border border-zinc-805 flex items-center justify-center ${theme.primaryText}`}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Academic Email</p>
                    <a href="mailto:se23ucse125@mahindrauniversity.edu.in" className={`font-sans text-xs text-white hover:${theme.primaryText} transition-colors`}>
                      se23ucse125@mahindrauniversity.edu.in
                    </a>
                  </div>
                </div>

                {/* Email 2 */}
                <div className="flex items-start gap-3.5">
                  <div className={`w-9 h-9 rounded-xl bg-zinc-950 border border-zinc-805 flex items-center justify-center ${theme.primaryText}`}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Personal Email</p>
                    <a href="mailto:tanujrao2006@gmail.com" className={`font-sans text-xs text-white hover:${theme.primaryText} transition-colors`}>
                      tanujrao2006@gmail.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-indigo-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Current Node Station</p>
                    <p className="font-sans text-xs text-white">
                      Hyderabad, India
                    </p>
                  </div>
                </div>

                {/* Secure Cell */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-emerald-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-bold">Direct Phone line</p>
                    <a href="tel:+919000263945" className="font-sans text-xs text-white hover:text-emerald-400 transition-colors">
                      +91 9000263945
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Profile directory paths */}
            <div className="bg-zinc-900/60 border border-zinc-900 rounded-2xl p-6 space-y-4">
              <h3 className="font-sans font-bold text-white text-md">
                Social Profile Nodes
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href="https://linkedin.com/in/tanuj-nimmala-b80a072a2/" 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className={`flex items-center gap-2.5 p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:${theme.primaryBorder} font-mono text-xs text-zinc-300 hover:text-white transition-all cursor-pointer`}
                >
                  <Linkedin className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>LinkedIn</span>
                </a>

                <a 
                  href="https://github.com/Tanuj283" 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className={`flex items-center gap-2.5 p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:${theme.primaryBorder} font-mono text-xs text-zinc-300 hover:text-white transition-all cursor-pointer`}
                >
                  <Github className="w-4 h-4 text-zinc-100 shrink-0" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Contact dispatcher form */}
          <div className="lg:col-span-7">
            <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-48 h-48 ${theme.glowBg} rounded-full blur-3xl pointer-events-none`} />
              
              {isSuccess ? (
                <AnimatePresence>
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center animate-bounce">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="font-sans font-bold text-2xl text-white">
                      Message Transmitted Successfully!
                    </h3>
                    <p className="font-sans text-xs text-zinc-400 max-w-sm leading-relaxed">
                      Your digital message payload has been securely compiled and simulated for dispatching to <strong>tanujrao2006@gmail.com</strong>. He will be alerted shortly!
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-5 py-2 rounded-lg bg-zinc-800 border border-zinc-700 hover:border-zinc-650 text-zinc-300 hover:text-white font-mono text-xs uppercase cursor-pointer"
                    >
                      Transmit New Message
                    </button>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-sans font-bold text-lg text-white">
                    Transmit a Digital Message Packet
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-bold">
                        Identifier / Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 bg-zinc-950 text-xs border border-zinc-800 hover:border-zinc-750 focus:border-current focus:${theme.primaryText} rounded-xl focus:outline-none text-white transition-colors`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-bold">
                        Sender Node / Email IP
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="johndoe@node.com"
                        className={`w-full px-4 py-3 bg-zinc-950 text-xs border border-zinc-805 hover:border-zinc-755 focus:border-current focus:${theme.primaryText} rounded-xl focus:outline-none text-white transition-colors`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-bold">
                      Message Payload Details
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Enter details here... I'm looking to discuss your inventory models or hire you..."
                      className={`w-full px-4 py-3 bg-zinc-950 text-xs border border-zinc-800 hover:border-zinc-750 focus:border-current focus:${theme.primaryText} rounded-xl focus:outline-none text-white transition-colors resize-none leading-relaxed`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className={`w-full py-3.5 bg-gradient-to-r ${theme.buttonGradient} text-white font-mono text-xs uppercase tracking-widest rounded-xl shadow-lg cursor-pointer transition-all flex items-center justify-center gap-2 border border-white/10 active:scale-[0.99] disabled:opacity-50`}
                  >
                    {isSending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Transmitting Node Packet...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Transmit Message
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* Outer credit details (humble, professional) */}
        <div className="mt-16 pt-8 border-t border-zinc-900 text-center font-mono text-[10px] text-zinc-500">
          <p>© {new Date().getFullYear()} Nimmala Tanuj. Built with React 19, TypeScript, Express, and Google Gemini API.</p>
        </div>

      </div>
    </section>
  );
}
