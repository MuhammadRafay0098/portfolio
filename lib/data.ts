export const PERSONAL_INFO = {
  name: "Muhammad Rafay",
  profileImage: "/profilepic.jpg",
  location: "Kohat, Pakistan",
  degree: "BSCS, KUST — 2026",
  status: "Open to opportunities",
};

export const ROLES = [
  "Front-End Developer",
  "React & Next.js Engineer",
  "Building AI-powered web apps",
];

export const SOCIAL = {
  github: "https://github.com/MuhammadRafay0098",
  linkedin: "https://www.linkedin.com/in/muhammad-rafay-4761b0245/",
  twitter: "https://x.com/Muhammadrafay92",
  email: "rafay9363@gmail.com",
  phone: "+92 309 0945092",
  whatsapp:
    "https://wa.me/923090945092?text=Hi%20Muhammad%20Rafay,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!",
};

export const SKILLS: Record<string, string[]> = {
  Frontend: [
    "React.js",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "JavaScript",
    "HTML5 / CSS3",
  ],
  "Data & APIs": ["Firebase", "Supabase", "REST APIs"],
  Tools: [
    "Git / GitHub",
    "Vercel",
    "Netlify",
    "MS Word",
    "MS Excel",
    "PowerPoint",
  ],
};

export type Project = {
  title: string;
  tag: string;
  description: string;
  tech: string[];
  live?: string;
  code?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "NutriSmart",
    tag: "Final Year Project",
    description:
      "AI-based personalized diet and fitness planner. Full-stack app with an AI recommendation engine (Llama 3.3-70B via GROQ API) generating tailored nutrition and fitness plans.",
    tech: ["React.js", "TailwindCSS", "Firebase", "GROQ API"],
    code: SOCIAL.github,
  },
  {
    title: "Roiser E-commerce",
    tag: "Web App",
    description:
      "A modern e-commerce storefront built for smooth browsing and checkout flows, deployed on Vercel.",
    tech: [
      "React.js",
      "ReduxToolkit",
      "TailwindCSS",
      "ReactRouter",
      "ReactQuery",
      "Rest API",
    ],
    live: "https://roiser-ecommerce-by-mr.vercel.app/",
    code: SOCIAL.github,
  },
  {
    title: "The Wild Oasis",
    tag: "Admin Dashboard",
    description:
      "A cabin/hotel booking management dashboard for staff to handle bookings, guests, and cabins.",
    tech: ["React.js", "Supabase", "React Query"],
    live: "https://wild-oasis-by-m-r.vercel.app/",
    code: SOCIAL.github,
  },
  {
    title: "Forkify",
    tag: "Web App",
    description:
      "A recipe search and bookmarking app — search thousands of recipes, adjust servings, and save favorites.",
    tech: ["JavaScript", "REST API"],
    live: "https://forkify-mr09.netlify.app/",
    code: SOCIAL.github,
  },
];

export const EXPERIENCE = [
  {
    role: "Front-End Developer",
    org: "Uzair Tech (Software House)",
    time: "5 Months",
    points: [
      "Built and maintained responsive user interfaces using React.js and modern front-end tooling.",
      "Collaborated with the dev team translating designs into functional, production-ready pages.",
    ],
  },
  {
    role: "Academic Content & Composing Specialist / Tutor",
    org: "Ideal Public School & Private Tutoring, Kohat",
    time: "~5 Years, Part-Time",
    points: [
      "Composed, formatted, and designed structured examination papers and academic layouts using MS Word, Excel, and PowerPoint.",
      "Tutored students across multiple subjects alongside academic studies, managing timing and curriculum schedules.",
      "Built strong communication, precise document layout skills, and time-management balancing work and coursework.",
    ],
  },
];

export const NAV = ["About", "Skills", "Projects", "Experience", "Contact"];
