export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
]

export const ROLES = [
  "Full Stack Developer",
  "Competitive Programmer",
  "Knight on LeetCode, Sophomore IRL",
  "Building cool stuff in Bengaluru ☕",
]

export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/praneethb7",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/praneeth-budati/",
    icon: "linkedin",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/praneethb7/",
    icon: "code",
  },
]

export const ABOUT_BIO = [
  "I'm a sophomore at Scaler School of Technology — a 4-year residential CS program in Bengaluru delivered by engineers from Google, Meta, Uber, and more, with a BSc in CS from BITS Pilani.",
  "I build full-stack products that solve real problems — from geolocation-powered worker discovery platforms to AI calendar agents. Outside of shipping, I'm a Teaching Assistant, a club president, and a Knight-ranked competitive programmer in the top 4% on LeetCode.",
  "I led Super Mentor sessions with CTOs and startup founders, including the former CTO of Blinkit. I'm always learning, always building.",
]

export const CURRENTLY = [
  { icon: "🎓", text: "Sophomore @ SST (Batch of 2028)" },
  { icon: "🏆", text: "Bronze Medalist — Ranked 3rd in CGPA" },
  { icon: "⚔️", text: "Knight on LeetCode | Max Rating: 1905 | Top 4%" },
  { icon: "🌍", text: "Top 1500 Nationwide — Google's The Big Code 2026" },
  { icon: "📍", text: "Bengaluru, India" },
]

export const TECH_MARQUEE = [
  "TypeScript", "JavaScript", "React", "Next.js", "Node.js",
  "Python", "Go", "Flutter", "MongoDB", "Firebase",
  "Tailwind", "Git", "Vercel", "FastAPI", "Docker",
]

export interface ExperienceEntry {
  role: string
  org: string
  date: string
  points: string[]
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Teaching Assistant (TA)",
    org: "Scaler School of Technology",
    date: "Jul 2025 – Present",
    points: [
      "Peer mentor to first-year students; weekly 1:1 sessions and group labs",
      "Facilitated continuous academic support and tracking",
    ],
  },
  {
    role: "Full-Stack Developer & Mentor",
    org: "AceNSET (EdTech Platform)",
    date: "Jan 2025 – Sep 2025",
    points: [
      "Built full-stack EdTech platform with React (TS), Tailwind, ShadCN UI",
      "Integrated real-time analytics dashboards and optimized performance",
      "Led community outreach as SST Ambassador for 300+ aspirants",
    ],
  },
  {
    role: "Host, Super Mentor Sessions",
    org: "SST Campus",
    date: "May 2025 – Nov 2025",
    points: [
      "Led sessions with CTOs, founders, and leaders (incl. ex-CTO of Blinkit)",
      "Strengthened students' exposure to real-world engineering and startups",
    ],
  },
]

export interface Project {
  name: string
  description: string
  stack: string[]
  github: string
  live?: string
  gradient: string
  featured: boolean
}

export const PROJECTS: Project[] = [
  {
    name: "gigUp",
    description:
      "Full-stack worker discovery platform with AI-powered profile generation via Google Gemini, JWT auth, geolocation search, and voice-to-text onboarding.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Gemini AI"],
    github: "https://github.com/praneethb7",
    gradient: "from-blue-900 via-blue-800 to-indigo-900",
    featured: true,
  },
  {
    name: "Google Calendar Agent",
    description:
      "High-fidelity Google Calendar web app built overnight with Claude Code — enables AI agents to interact with calendar data via REST API with real-time UI state rendering.",
    stack: ["Next.js", "Python", "FastAPI", "SQLite"],
    github: "https://github.com/praneethb7",
    gradient: "from-violet-900 via-purple-800 to-purple-900",
    featured: true,
  },
  {
    name: "AceNSET",
    description:
      "Full-stack EdTech platform with real-time analytics dashboards for NSET aspirants. Used in production for 300+ students.",
    stack: ["React", "TypeScript", "Tailwind CSS", "ShadCN UI"],
    github: "https://github.com/praneethb7/AceNSET",
    gradient: "from-cyan-900 via-teal-800 to-teal-900",
    featured: false,
  },
  {
    name: "Little Kars",
    description:
      "Flutter mobile app that auto-detects driving and parking events using Bluetooth state + GPS signals. No manual input needed.",
    stack: ["Flutter", "Firebase", "Twilio", "Geolocator"],
    github: "https://github.com/praneethb7",
    gradient: "from-emerald-900 via-green-800 to-green-900",
    featured: false,
  },
]

export interface SkillCategory {
  label: string
  skills: string[]
}

export const SKILLS: SkillCategory[] = [
  {
    label: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "Java", "C++", "Golang", "HTML", "CSS"],
  },
  {
    label: "Frameworks & Libraries",
    skills: [
      "React.js", "Next.js", "Node.js", "Express.js", "FastAPI",
      "React Native", "Flutter", "Tailwind CSS", "NumPy", "Pandas", "scikit-learn",
    ],
  },
  {
    label: "Databases & Tools",
    skills: [
      "MongoDB", "MySQL", "SQLite", "Git", "GitHub", "Firebase",
      "Linux", "Vercel", "Netlify", "Jupyter Notebook",
    ],
  },
  {
    label: "Concepts",
    skills: [
      "RESTful APIs", "Backend System Design", "Auth & Authorization",
      "DSA", "OOP", "Classical ML", "Statistical Analysis", "Data Visualization",
    ],
  },
]

export interface Achievement {
  label: string
  value: number
  suffix: string
  prefix?: string
  description: string
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    label: "LeetCode Rating",
    value: 1905,
    suffix: "",
    description: "Knight Rank · Top 4% Globally",
  },
  {
    label: "Batch CGPA Rank",
    value: 3,
    suffix: "",
    prefix: "#",
    description: "Bronze Medalist · SST Batch 2028",
  },
  {
    label: "Google Big Code",
    value: 1500,
    suffix: "+",
    description: "Top 1500 Nationally · 2026",
  },
  {
    label: "Students Mentored",
    value: 300,
    suffix: "+",
    description: "AceNSET + TA @ SST",
  },
]

export const ACHIEVEMENT_PILLS = [
  "🥉 Bronze Medalist — SST Batch of 2028",
  "⚔️ LeetCode Knight — Top 4% Globally",
  "🌐 Top 1500 — Google's The Big Code 2026",
  "🎙️ Club President — Leadership Development Club",
  "🧑‍🏫 Teaching Assistant @ SST",
]
