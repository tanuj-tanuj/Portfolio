export interface Project {
  id: string;
  name: string;
  organization: string;
  period: string;
  description: string;
  details: string[];
  tech: string[];
  interactiveType: "social-app" | "inventory-manager" | "data-analyst";
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  description?: string;
}

export interface SkillItem {
  name: string;
  category: "programming" | "web" | "tools" | "core";
  level: number; // Percentage level for UI visual charts
  description: string;
}
