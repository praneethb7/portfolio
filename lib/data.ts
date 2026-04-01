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
  "Building cool stuff in Bengaluru",
]

export const SOCIAL_LINKS = [
  { label: "GitHub",   href: "https://github.com/praneethb7",                  icon: "github"   },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/praneeth-budati/",    icon: "linkedin" },
  { label: "LeetCode", href: "https://leetcode.com/u/praneethb7/",              icon: "code"     },
]

export const ABOUT_BIO = [
  "I'm a developer who builds things that work — fast, clean, and purposeful. My work spans full-stack web apps, mobile experiences, and AI-integrated platforms, each one built to solve a real problem rather than demonstrate a concept.",
  "I've shipped products used by hundreds of people, mentored students learning to code for the first time, and sat in rooms with CTOs and founders asking the hard questions. I write competitive code that ranks in the global top 4% on LeetCode, and I bring that same precision to everything I build.",
  "Currently based in Bengaluru, sharpening every edge.",
]

export const CURRENTLY = [
  { text: "Sophomore at Scaler School of Technology, Batch 2028" },
  { text: "Bronze Medalist — 3rd in Cohort CGPA" },
  { text: "LeetCode Knight, Max Rating 1905, Top 4% Globally" },
  { text: "Top 1500 Nationally — Google The Big Code 2026" },
  { text: "Bengaluru, India" },
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
    role: "Member, Placement Cell",
    org: "Scaler School of Technology",
    date: "Mar 2026 – Present",
    points: [
      "Active member of the SST Placement Cell, supporting student placement preparation and industry outreach",
    ],
  },
  {
    role: "Teaching Assistant (TA)",
    org: "Scaler School of Technology",
    date: "Jul 2025 – Present",
    points: [
      "Peer mentor to first-year students; weekly 1:1 sessions and group labs",
      "Facilitated continuous academic support and progress tracking",
    ],
  },
  {
    role: "President",
    org: "Leadership Development Club — SST",
    date: "Feb 2025 – Nov 2025",
    points: [
      "Directly mentored by the Vice President at Scaler School of Technology",
      "Led club initiatives focused on leadership, communication, and professional growth",
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
]

export interface Project {
  name: string
  description: string
  stack: string[]
  github: string
  live?: string
  gradient: string
  featured: boolean
  badge?: string
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
    badge: "Featured",
  },
  {
    name: "Google Calendar Agent",
    description:
      "High-fidelity Google Calendar web app built overnight with Claude Code — enables AI agents to interact with calendar data via REST API with real-time UI state rendering.",
    stack: ["Next.js", "Python", "FastAPI", "SQLite"],
    github: "https://github.com/praneethb7",
    gradient: "from-violet-900 via-purple-800 to-purple-900",
    featured: true,
    badge: "Built with Claude",
  },
  {
    name: "Little Kars",
    description:
      "Flutter mobile app that auto-detects driving and parking events using Bluetooth state + GPS signals. No manual input needed.",
    stack: ["Flutter", "Firebase", "Twilio", "Geolocator"],
    github: "https://github.com/praneethb7",
    gradient: "from-emerald-900 via-green-800 to-green-900",
    featured: true,
    badge: "Personal Project",
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
]

export interface SkillItem {
  name: string
  desc: string
}

export interface SkillCategory {
  label: string
  skills: SkillItem[]
}

export const SKILLS: SkillCategory[] = [
  {
    label: "Languages",
    skills: [
      { name: "TypeScript",  desc: "Typed JS superset" },
      { name: "JavaScript",  desc: "Dynamic web scripting" },
      { name: "Python",      desc: "AI/ML + scripting" },
      { name: "Java",        desc: "OOP fundamentals" },
      { name: "C++",         desc: "DSA & competitive programming" },
      { name: "Golang",      desc: "Systems + concurrency" },
      { name: "HTML",        desc: "Web markup" },
      { name: "CSS",         desc: "Styling & layout" },
    ],
  },
  {
    label: "Frameworks & Libraries",
    skills: [
      { name: "React.js",    desc: "UI component library" },
      { name: "Next.js",     desc: "Full-stack React framework" },
      { name: "Node.js",     desc: "Server-side JavaScript" },
      { name: "Express.js",  desc: "Minimal Node.js framework" },
      { name: "FastAPI",     desc: "Python async REST APIs" },
      { name: "Flutter",     desc: "Cross-platform mobile" },
      { name: "Tailwind CSS",desc: "Utility-first CSS" },
      { name: "NumPy",       desc: "Scientific computing" },
      { name: "Pandas",      desc: "Data manipulation" },
      { name: "scikit-learn",desc: "Classical ML library" },
    ],
  },
  {
    label: "Databases & Tools",
    skills: [
      { name: "MongoDB",    desc: "Document NoSQL DB" },
      { name: "MySQL",      desc: "Relational database" },
      { name: "SQLite",     desc: "Embedded SQL" },
      { name: "Firebase",   desc: "Google's app platform" },
      { name: "Git",        desc: "Version control" },
      { name: "Vercel",     desc: "Frontend deployment" },
      { name: "Linux",      desc: "Unix-based OS" },
      { name: "Docker",     desc: "Container platform" },
    ],
  },
  {
    label: "Concepts",
    skills: [
      { name: "RESTful APIs",          desc: "Stateless web APIs" },
      { name: "System Design",         desc: "Backend architecture" },
      { name: "Auth & Authorization",  desc: "JWT, OAuth flows" },
      { name: "DSA",                   desc: "Algorithms & data structures" },
      { name: "OOP",                   desc: "Object-oriented patterns" },
      { name: "Classical ML",          desc: "Supervised/unsupervised learning" },
      { name: "Data Visualization",    desc: "Charts & dashboards" },
    ],
  },
]

export interface Achievement {
  id: string
  label: string
  value: number
  suffix: string
  prefix?: string
  description: string
  accentColor: string
  subtext: string
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "leetcode",
    label: "LeetCode Rating",
    value: 1905,
    suffix: "",
    description: "Knight Rank",
    accentColor: "#FFA116",
    subtext: "Top 4% Globally · Knight Badge",
  },
  {
    id: "rank",
    label: "Cohort CGPA Rank",
    value: 3,
    suffix: "",
    prefix: "#",
    description: "Bronze Medalist",
    accentColor: "#FFD700",
    subtext: "3rd in Cohort CGPA · SST Batch 2028",
  },
  {
    id: "bigcode",
    label: "Google Big Code",
    value: 1500,
    suffix: "",
    description: "Top Nationally",
    accentColor: "#4285F4",
    subtext: "Google's The Big Code · 2026",
  },
  {
    id: "mentored",
    label: "Students Mentored",
    value: 300,
    suffix: "+",
    description: "Direct Impact",
    accentColor: "#5B7FFF",
    subtext: "AceNSET Platform + SST Teaching Assistant",
  },
]

export const ACHIEVEMENT_PILLS = [
  "LeetCode Knight",
  "Bronze Medalist",
  "Google Big Code — Top 1500",
  "Club President",
  "Teaching Assistant @ SST",
]
