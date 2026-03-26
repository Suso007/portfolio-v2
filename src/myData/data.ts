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
      "Express.js",
      "PostgreSQL",
      "MSSQL",
      "MongoDB",
      "REST APIs",
      "GraphQL",
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
      "AWS",
      "GCP",
      "CI/CD",
      "Git & GitHub",
      "Linux",
      "Vercel",
    ],
  },
];

// ----------------------------
// Work / Projects Section
// ----------------------------
export const projectsData = [
  {
    title: "Inloom",
    category: "E-Commerce Platform for Handmade Artists",
    tools: "Node.js, GraphQL (API design), PostgreSQL (relational data modeling), Next.js (SSR + frontend), WhatsApp Business API(OTP authentication, transactional messaging)",
    image: "/images/inloom.png",
    link: "https://inloom.in/",
  },
  {
    title: "Nextorg Solutions",
    category: "School Management System (Web + Mobile Platform) ",
    tools: "Node.js (backend services), GraphQL, Next.js (admin application), React Native (mobile apps), PostgreSQL (data management), Cashfree Payments (fee transactions), RBAC (access control), real-time notifications",
    image: "/images/nextorg.png",
    link: "https://school.nextorg.in/",
  },
  {
    title: "Biometric Data Collection Microservice",
    category: "Microservices",
    tools: "Node.js, Express (microservice framework), PostgreSQL/Any db configurable (storage + partitioning), Redis (queue broker), Bull Queue (async jobs, retries, recovery pipelines)",
    image: "/images/data-collector.png",
    link: "https://github.com/Suso007/biolog-collector",
  },
  {
    title: "AI-powered Product Mockup Image Generator",
    category: "AI-powered Product",
    tools: "Next.js (SSR + CSR hybrid), Google GenAI (Gemini 2.5 Flash Image), image processing pipelines, batch processing workflows",
    image: "/images/product-mockup.png",
    link: "https://github.com/Suso007/image-mockup",
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
