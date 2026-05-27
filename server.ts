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

// AI Assistant chat API endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

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
    res.json({ text: replyText });
  } catch (error: any) {
    console.error("Gemini API Error in /api/chat:", error);
    res.status(500).json({
      error: "Failed to connect to Nimmala Tanuj's AI Twin. Please make sure the GEMINI_API_KEY is configured in your secrets.",
      details: error.message,
    });
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
