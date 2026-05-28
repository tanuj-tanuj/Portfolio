import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize GoogleGenAI SDK with the standard user-agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

app.use(express.json());

// Knowledge base representing Nimmala Tanuj's complete professional profile
const RESUME_DATA = {
  name: "Nimmala Tanuj",
  location: "Hyderabad, India",
  phone: "+91 9000263945",
  emails: ["se23ucse125@mahindrauniversity.edu.in", "tanujrao2006@gmail.com"],
  linkedin: "linkedin.com/in/tanuj-nimmala-b80a072a2/",
  github: "github.com/Tanuj283",
  education: [
    {
      institution: "Mahindra University",
      degree: "B.Tech in Computer Science Engineering",
      period: "Aug 2023 – Present",
      coursework: [
        "Data Structures",
        "DBMS",
        "Operating Systems",
        "Machine Learning",
        "Probability & Statistics",
        "Evolutionary Computing",
        "Quantum Computing",
      ],
    },
    {
      institution: "Exellencia Junior College",
      degree: "Intermediate (85%)",
      period: "2021 – 2023",
    },
    {
      institution: "FIITJEE World School",
      degree: "SSC (98%)",
      period: "2020 – 2021",
    },
  ],
  skills: {
    programming: ["Python", "C", "SQL", "TypeScript"],
    web: ["React.js", "HTML", "CSS", "Vite"],
    tools: ["MongoDB", "Jira", "Jupyter Notebook", "MS Excel", "GitHub"],
    core: [
      "Software Development",
      "UI/UX Testing",
      "Database Design",
      "Data Analysis",
    ],
  },
  projects: [
    {
      name: "Mahindra University Social Networking Application",
      period: "Jan 2026 – May 2026",
      organization: "Mahindra University",
      details: [
        "Performed functional and usability testing to identify bugs and UI inconsistencies.",
        "Designed and executed test cases for authentication and user interaction workflows.",
        "Collaborated with developers to document and resolve issues efficiently.",
        "Suggested UI/UX improvements to enhance navigation and user engagement.",
      ],
    },
    {
      name: "Inventory Management System",
      period: "Jun 2025 – Oct 2025",
      organization: "Basis Laboratories Pvt Ltd",
      details: [
        "Developed a responsive web application using React, TypeScript, and Vite.",
        "Built reusable components and multi-page navigation structure.",
        "Designed interfaces for materials, locations, leadership, and enquiry management.",
        "Used AI-assisted tools for faster development and debugging workflows.",
      ],
    },
  ],
  internships: [
    {
      role: "Data Analysis Intern",
      period: "Jun 2025 – Jul 2025",
      organization: "Basis Laboratories Pvt Ltd.",
      details: [
        "Proposed digital inventory tracking solutions, designed database workflows, and suggested AI-based stock optimization concepts.",
      ],
    },
  ],
  extracurriculars: {
    sports: ["Cricket", "Badminton", "Pickleball"],
    interests: ["Technology", "Software Development", "Artificial Intelligence"],
    volunteering: "Volunteered in university campus activities and student initiatives.",
  },
};

const SYSTEM_INSTRUCTION = `
You are the AI Twin / Resume Assistant of Nimmala Tanuj.
Your goal is to answer questions from potential recruiters, peers, and visitors about Tanuj's background, skills, education, projects, and experiences with outstanding precision, professional charm, and helpfulness.

Here is the authentic resume data for Nimmala Tanuj:
- Primary Contact: Hyderabad, India | +91 9000263945 | se23ucse125@mahindrauniversity.edu.in | tanujrao2006@gmail.com
- Profile Links: LinkedIn: ${RESUME_DATA.linkedin} | GitHub: ${RESUME_DATA.github}
- Education:
  * Mahindra University (B.Tech in Computer Science Engineering, Aug 2023 - Present) - studying Data Structures, DBMS, OS, ML, Probability & Stats, Evolutionary Computing, Quantum Computing.
  * Exellencia Junior College (Intermediate, 85%, 2021-2023)
  * FIITJEE World School (SSC, 98%, 2020-2021)
- Skills:
  * Programming Languages: Python, C, SQL, TypeScript
  * Web Technologies: React.js, HTML, CSS, Vite
  * Tools & Platforms: MongoDB, Jira, Jupyter Notebook, MS Excel, GitHub
  * Core Skills: Software Development, UI/UX Testing, Database Design, Data Analysis
- Projects:
  * Mahindra University Social Networking Application (Jan 2026 – May 2026): Usability testing, bug finding, test cases, developer collaboration, and UI/UX design suggestions.
  * Inventory Management System (Jun 2025 – Oct 2025) at Basis Laboratories: Dynamic responsive dashboard using React, TypeScript, Vite. Reusable elements, material/leadership control interfaces. Integrated AI-assisted development tools.
- Internship:
  * Data Analysis Intern (Jun 2025 – Jul 2025) at Basis Laboratories Pvt Ltd: Proposed digital tracking networks, stock optimization algorithms, database workflows.
- Extra-Curriculars:
  * Sports: Cricket, Badminton, Pickleball
  * Interests: Emerging Tech, Software Dev, Artificial Intelligence
  * Campus Volunteering

Guidelines for your responses:
1. Speak in safety, helpfulness, and style. Address Tanuj in the third person (e.g. "Tanuj's expertise is in...", "He designed...") or in the first person representing his digital proxy ("As Tanuj's AI Twin, I can tell you that we..."). Keep it very engaging and friendly.
2. Be brief, professional, and scannable. Use Markdown styling (bold, bullets) for clean presentation.
3. If asked about contact info, provide his emails or phone number.
4. If asked about something not in his resume (e.g., his favorite food, or non-technical experiences), answer humorously or adaptively and gently steer them back to his primary technical skills, project portfolio, or cricket/pickleball interests.
5. Never invent false details or claim she/he knows languages/technologies not explicitly mentioned in the resume (e.g. don't say he is an expert in Rust or AWS if not listed). Always remain completely honest!
`;

function getOfflineFallbackResponse(message: string): string {
  const query = message.toLowerCase();
  
  const prefix = `⚠️ **Offline Intelligent Fallback Active** (Please configure GEMINI_API_KEY inside AI Studio Secrets for open-ended conversation).\n\n`;

  if (query.includes("hello") || query.includes("hi") || query.includes("hey") || query.includes("greet") || query.includes("twin")) {
    return prefix + `Hello! I am Tanuj's Digital Proxy Assistant. 

Even while running in local offline mode, I have fully compiled index parameters concerning Tanuj's credentials. Ask me details on his:
- 💻 **Engineering Skills:** React, TypeScript, Python, SQL
- 🎓 **Education:** Mahindra University B.Tech
- 💼 **Projects & Experience:** Basis Laboratories Intern, Social Networking App Tester
- 🏏 **Sports and Activities:** Cricket, Badminton, Pickleball
- 📞 **Contact Channels**`;
  }

  if (query.includes("contact") || query.includes("email") || query.includes("phone") || query.includes("reach") || query.includes("linkedin") || query.includes("github") || query.includes("call")) {
    return prefix + `Here is how you can directly establish communication with Tanuj:

- 📧 **Personal Email:** [tanujrao2006@gmail.com](mailto:tanujrao2006@gmail.com)
- 📧 **University Email:** [se23ucse125@mahindrauniversity.edu.in](mailto:se23ucse125@mahindrauniversity.edu.in)
- 📞 **Mobile Contact:** [+91 9000263945](tel:+919000263945)
- 💼 **LinkedIn Profile:** [linkedin.com/in/tanuj-nimmala-b80a072a2/](https://linkedin.com/in/tanuj-nimmala-b80a072a2/)
- 💻 **GitHub Repository:** [github.com/Tanuj283](https://github.com/Tanuj283)`;
  }

  if (query.includes("skill") || query.includes("programming") || query.includes("language") || query.includes("python") || query.includes("typescript") || query.includes("react") || query.includes("c ") || query.includes("sql") || query.includes("database") || query.includes("mongodb")) {
    return prefix + `Tanuj's engineered skill matrix includes:

- **Programming Languages:** Python, TypeScript/JavaScript, C, and SQL.
- **Web Architectures:** React.js, Vite, HTML5, and CSS3 / Tailwind.
- **Enterprise Databases:** SQL Server, MongoDB, and DBMS Design.
- **Development Productivity:** GitHub, Jira, Jupyter Notebooks, and MS Excel.
- **Core Operations:** UI/UX functional testing, database schema mapping, custom algorithms, and data structures.`;
  }

  if (query.includes("project") || query.includes("social") || query.includes("inventory") || query.includes("basis") || query.includes("laboratories") || query.includes("intern") || query.includes("experience") || query.includes("work")) {
    return prefix + `Tanuj has contributed critical milestones in empirical development:

1. **Mahindra University Social App (Jan 2026 – May 2026):** Served as UI/UX tester. Authored system workflows, documented UI inconsistencies, and mapped out comprehensive user verification tests.
2. **Inventory Management Dashboard (Jun 2025 – Oct 2025):** Crafted high-fidelity interactive systems utilizing React, TypeScript, and Vite during his time with Basis Laboratories.
3. **Data Analysis Internship (Basis Laboratories - Jun 2025):** Proposed database schemas, safety buffer variables, and mathematical stock optimization algorithms to safeguard holding risks.`;
  }

  if (query.includes("education") || query.includes("mahindra") || query.includes("university") || query.includes("college") || query.includes("school") || query.includes("coursework") || query.includes("gpa") || query.includes("score")) {
    return prefix + `Tanuj's academic checkpoints:

- 🎓 **B.Tech in Computer Science Engineering** (2023 – Present) | **Mahindra University**
  * *Coursework:* Data Structures, Operating Systems, DBMS, Machine Learning, Applied Statistics, Quantum Computing, Evolutionary Systems.
- 🏫 **Intermediate (85%)** (2021 – 2023) | **Exellencia Junior College**
- 🏫 **SSC (98%)** (2020 – 2021) | **FIITJEE World School**`;
  }

  if (query.includes("sports") || query.includes("cricket") || query.includes("badminton") || query.includes("pickleball") || query.includes("hobby") || query.includes("hobbies") || query.includes("interest") || query.includes("volunteer")) {
    return prefix + `Beyond compiling code, Tanuj is highly dynamic:

- 🏏 **Athletics:** He is passionate about playing **Cricket**, **Badminton**, and the fast-growing racket sport **Pickleball**!
- 🎨 **Technical Curiosities:** Deeply interested in Generative AI, client-side web frameworks, and smart automation systems.
- 🤝 **Community presence:** Active participant and helper in student volunteer operations at Mahindra University.`;
  }

  return prefix + `I am Tanuj's Digital Twin (Offline Mode). Your query did not trigger specific local keywords, but here is a summarized directory of his portfolio:

- **Biography:** B.Tech Computer Science student at Mahindra University (Hyderabad).
- **Core Stack:** Python, SQL, C, TypeScript, React.js.
- **Specialty:** Front-end interactive layouts, UI/UX test suites, and database designs.
- **Quick Command:** Type **skills**, **projects**, or **contact** for deeper, dedicated readouts.

*(Provide a standard \`GEMINI_API_KEY\` in Settings > Secrets to unlock genuine AI dialog!)*`;
}

// AI Assistant chat API endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    // Check if the API key is not configured or is a placeholder/empty
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === "" || process.env.GEMINI_API_KEY.includes("YOUR_")) {
      console.log("No GEMINI_API_KEY configured. Returning helpful offline response.");
      const replyText = getOfflineFallbackResponse(message);
      return res.json({ text: replyText });
    }

    try {
      // Call Gemini API utilizing the recommended gemini-3.5-flash model
      const chatContents = [];
      if (history && Array.isArray(history)) {
        for (const msg of history) {
          chatContents.push({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.text }],
          });
        }
      }
      chatContents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: chatContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "I was unable to formulate an answer. How else can I assist you with Tanuj's resume?";
      return res.json({ text: replyText });
    } catch (apiError: any) {
      console.warn("Gemini API call failed, falling back to cached response:", apiError.message);
      const fallbackText = getOfflineFallbackResponse(message);
      return res.json({ text: fallbackText });
    }
  } catch (error: any) {
    console.error("Critical server error in /api/chat:", error);
    const fallbackText = getOfflineFallbackResponse(req.body?.message || "");
    return res.json({ text: fallbackText });
  }
});

// Serve resume data directly if the frontend wants to consume it
app.get("/api/resume", (req, res) => {
  res.json(RESUME_DATA);
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully started at http://localhost:${PORT}`);
  });
}

startServer();
