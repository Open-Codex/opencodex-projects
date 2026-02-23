import { Timestamp } from "firebase/firestore";

export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  readme: string;
  category: string;
  skill: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export type ProjectFormData = Omit<Project, "id" | "status" | "createdAt">;

export interface Category {
  id?: string;
  slug: string;
  label: string;
  icon: string;
}

export interface Skill {
  id?: string;
  slug: string;
  label: string;
}



export const CATEGORY_SEO: Record<
  string,
  { title: string; description: string }
> = {
  home: {
    title: "OpenCodex Projects | Find Open Source Projects to Contribute",
    description:
      "Discover the best open-source projects to contribute to. Filter by language, tech stack, and difficulty to start your coding journey.",
  },
  "web-development": {
    title: "Web Development | Open Source Projects",
    description:
      "Advanced projects for debugging, refactoring, and software architecture.",
  },
  "mobile-development": {
    title: "Mobile App Projects | Open Source Contributions",
    description: "Explore open-source mobile projects for Android, iOS, Flutter, and React Native. Help build the next big app.",
  },
  "ai-machine-learning": {
    title: "AI & Machine Learning | Open Source Code",
    description: "Contribute to open-source AI models, machine learning libraries, and data science tools. Start building the future.",
  },
  "devops-infrastructure": {
    title: "DevOps & Infrastructure | Open Source Tools",
    description: "Discover projects related to cloud computing, CI/CD pipelines, Docker, Kubernetes, and automation tools.",
  },
  "cybersecurity": {
    title: "Cybersecurity | Open Source Security Tools",
    description: "Contribute to security-focused open-source projects, from pentesting tools to encryption and privacy software.",
  },
  "data-science": {
    title: "Data Science & Analytics | Open Source Projects",
    description: "Find projects focused on data visualization, processing, and statistical analysis. Collaborate on data-driven code.",
  },
  "game-development": {
    title: "Game Development | Open Source Engines & Assets",
    description: "Join the open-source game dev community. Contribute to engines, frameworks, and tools for game creation.",
  },
  "embedded-systems": {
    title: "Embedded Systems | Low-Level Open Source",
    description: "Explore low-level programming projects, IoT devices, and firmware in C, C++, and Rust.",
  },
  "operating-systems": {
    title: "Operating Systems | Open Source Kernel & OS",
    description: "Contribute to the core of computing. Find open-source kernels, drivers, and system-level software.",
  },
  "developer-tools": {
    title: "Developer Tools | Open Source Productivity",
    description: "Improve the developer workflow by contributing to CLI tools, IDE plugins, and development utilities.",
  },
};
