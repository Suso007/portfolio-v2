// ============================================================
// CENTRALIZED PROFILE DATA
// Edit this file to update content across all components
// ============================================================

// ----------------------------
// Personal Info
// ----------------------------
export const profile = {
  firstName: "SUSOVAN",
  lastName: "PAL",
  initials: "SP",
  fullName: "Susovan Pal",
  title: "Full Stack",
  roles: ["Developer", "Engineer"],
  email: "susovanpal9000980@gmail.com",
  phone: "91 6291825006",
  resumeUrl: "/resume.pdf",
  copyrightYear: new Date().getFullYear().toString(),
};

// ----------------------------
// Social Links
// ----------------------------
export const socialLinks = {
  github: "https://github.com/Suso007",
  linkedin: "https://www.linkedin.com/in/susovan-pal-009a42304",
  twitter: "https://x.com/pal_susovan7",
  instagram: "https://www.instagram.com/susovanpal007",
};

// Social icon links (used in SocialIcons component with icon library)
export const socialIconLinks = {
  github: "https://github.com/Suso007",
  linkedin: "https://www.linkedin.com/in/susovan-pal-009a42304",
  twitter: "https://x.com/pal_susovan7",
  instagram: "https://www.instagram.com/susovanpal007",
};

// ----------------------------
// About Section
// ----------------------------
export const aboutData = {
  description:
    `Passionate about building web applications thats actually work well and solve real problems. Highly skilled in programming design,
      development, and implementation of functional specifications. I’m always learning new tools and approaches because technology
      moves fast, and I find it exciting to apply fresh ideas to deliver solutions that users find valuable and easy to use.`,
};

// ----------------------------
// Career / Experience Section
// ----------------------------
export const careerData = [
  {
    role: "IT & Google Workspace Admin",
    company: "Ecovista Industries Pvt. Ltd.",
    year: "2024",
    description:
      "Designed and developed cross-departmental business operation workflows. Built solutions for data collection, storage, and analysis utilizing Google Workspace, Google Apps Script, and GCP cloud tools.",
  },
  {
    role: "MIS-Executive",
    company: "Hemraj Industries Pvt. Ltd.",
    year: "2024",
    description:
      "Optimized data-flow workflows and automated custom report generation using Looker Studio. Developed end-to-end automation for the data collection and reporting process using Google Apps Script.",
  },
  {
    role: "Full Stack Developer",
    company: "Inrec Productive Research Solutions and Services Pvt. Ltd",
    year: "2025",
    description:
      "Redesigned the Attendance Management system using React.js and .NET Core. Developed a Hostel Attendance app integrated with Hikvision biometric devices. Engineered an AMC Management system using Node.js, GraphQL, and Next.js with CI/CD deployment, and built SEO-optimized commercial websites.",
  },
];

// ----------------------------
// What I Do Section
// ----------------------------
export const whatIDoData = [
  {
    title: "FRONTEND",
    subtitle: "Building Interactive UIs",
    description:
      "Crafting performant, responsive interfaces with modern frameworks. From SPAs to micro-frontends, I deliver pixel-perfect experiences that users love.",
    skills: [
      "React.js",
      "Angular",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Material UI",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "BACKEND",
    subtitle: "Scalable Server Architecture",
    description:
      "Designing robust REST APIs and microservices. From CMS platforms to complex business logic, I build backends that scale reliably under load.",
    skills: [
      "Node.js",
      "NestJS",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "REST APIs",
      "Microservices",
    ],
  },
  {
    title: "DEVOPS",
    subtitle: "Cloud & Infrastructure",
    description:
      "Setting up CI/CD pipelines, containerized deployments, and cloud infrastructure. I ensure apps are production-ready, observable, and easy to maintain.",
    skills: [
      "Docker",
      "Kubernetes",
      "AWS",
      "Git & GitHub",
      "GitHub Actions",
      "Linux",
      "Nginx",
      "Vercel",
    ],
  },
];

// ----------------------------
// Work / Projects Section
// ----------------------------
export const projectsData = [
  {
    title: "Solid Starters",
    category: "Low-Code / No-Code Platform",
    tools: "Angular, Next.js, NestJS, MongoDB",
    image: "/images/Solidx.png",
  },
  {
    title: "Radix",
    category: "E-Commerce Platform",
    tools: "Angular, Next.js, NestJS, CMS",
    image: "/images/radix.png",
  },
  {
    title: "Bond Cancellation",
    category: "Import-Export Automation",
    tools: "Angular, Next.js, NestJS, Workflow Engine",
    image: "/images/bond.png",
  },
  {
    title: "Sapphire",
    category: "CRM Platform",
    tools: "AngularJS, NestJS, PostgreSQL",
    image: "/images/sapphire.png",
  },
  {
    title: "Mpro",
    category: "Insurance Operations Platform",
    tools: "React.js, Node.js, MongoDB, Microservices",
    image: "/images/Maxlife.png",
  },
];

// ----------------------------
// Contact Section
// ----------------------------
export const contactData = {
  email: profile.email,
  phone: profile.phone,
  education: "Bachelor of Computer Applications (BCA)",
  university: "Lovely Professional University",
  year: "2024-2026",
};

// ----------------------------
// Tech Stack — Icon-based (name, react-icons key, brand color)
// ----------------------------
export const techStackIcons = [
  { name: "React", icon: "SiReact", color: "#61DAFB" },
  { name: "Next.js", icon: "SiNextdotjs", color: "#ffffff" },
  { name: "Angular", icon: "SiAngular", color: "#DD0031" },
  { name: "TypeScript", icon: "SiTypescript", color: "#3178C6" },
  { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E" },
  { name: "Node.js", icon: "SiNodedotjs", color: "#339933" },
  { name: "NestJS", icon: "SiNestjs", color: "#E0234E" },
  { name: "MongoDB", icon: "SiMongodb", color: "#47A248" },
  { name: "PostgreSQL", icon: "SiPostgresql", color: "#336791" },
  { name: "Docker", icon: "SiDocker", color: "#2496ED" },
  { name: "AWS", icon: "FaAws", color: "#FF9900" },
  { name: "Git", icon: "SiGit", color: "#F05032" },
];
