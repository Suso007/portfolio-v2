import React from "react";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import * as DiIcons from "react-icons/di";
import "./styles/TechStack.css"; // Ensure this path matches your CSS file

// --- Types ---
export interface TechItem {
    name: string;
    icon: string;
    color: string;
}

interface Category {
    title: string;
    items: TechItem[];
    radiusClass: string;
}

// --- Your Data ---
export const techStackIcons: TechItem[] = [
    { name: "HTML", icon: "FaHtml5", color: "#E34F26" },
    { name: "CSS", icon: "FaCss3", color: "#264DE4" },
    { name: "React", icon: "SiReact", color: "#61DAFB" },
    { name: "Next.js", icon: "SiNextdotjs", color: "#ffffff" },
    { name: "Angular", icon: "SiAngular", color: "#DD0031" },
    { name: "TypeScript", icon: "SiTypescript", color: "#3178C6" },
    { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E" },
    { name: "Node.js", icon: "SiNodedotjs", color: "#339933" },
    { name: "Express", icon: "SiExpress", color: "#E0234E" },
    { name: "ASP.NET", icon: "SiDotnet", color: "#6c488aff" },
    { name: "GraphQL", icon: "SiGraphql", color: "#E10098" },
    { name: "MongoDB", icon: "SiMongodb", color: "#47A248" },
    { name: "PostgreSQL", icon: "SiPostgresql", color: "#336791" },
    { name: "MSSQL", icon: "DiMsqlServer", color: "#336791" },
    { name: "Docker", icon: "SiDocker", color: "#2496ED" },
    { name: "AWS", icon: "FaAws", color: "#FF9900" },
    { name: "GCP", icon: "SiGooglecloud", color: "#4285F4" },
    { name: "Git", icon: "SiGit", color: "#F05032" },
    { name: "Prisma", icon: "SiPrisma", color: "#95999eff" },
    { name: "Supabase", icon: "SiSupabase", color: "#217325ff" },

];

// Grouping your data into the 4 quadrants with custom CSS radius classes
const technologyData: Category[] = [
    {
        title: "Frontend",
        radiusClass: "quadrant-tl", // Top Left quadrant
        items: techStackIcons.filter((t) =>
            ["HTML", "CSS", "React", "Next.js", "JavaScript", "TypeScript"].includes(t.name)
        ),
    },
    {
        title: "Backend",
        radiusClass: "quadrant-tr", // Top Right quadrant
        items: techStackIcons.filter((t) =>
            ["Node.js", "Express", "ASP.NET", "GraphQL"].includes(t.name)
        ),
    },
    {
        title: "Database",
        radiusClass: "quadrant-bl", // Bottom Left quadrant
        items: techStackIcons.filter((t) =>
            ["MongoDB", "PostgreSQL", "MSSQL"].includes(t.name)
        ),
    },
    {
        title: "DevOps & Tools",
        radiusClass: "quadrant-br", // Bottom Right quadrant
        items: techStackIcons.filter((t) =>
            ["Docker", "AWS", "GCP", "Git", "Prisma", "Supabase"].includes(t.name)
        ),
    },
];

// Helper to dynamically render icons from strings in TypeScript
const IconComponent: React.FC<{ iconName: string; color: string; size: number }> = ({
    iconName,
    color,
    size,
}) => {
    const Si = SiIcons as Record<string, React.ElementType>;
    const Fa = FaIcons as Record<string, React.ElementType>;
    const Di = DiIcons as Record<string, React.ElementType>;

    const Icon = Si[iconName] || Fa[iconName] || Di[iconName];
    return Icon ? <Icon color={color} size={size} /> : null;
};

// --- Component ---
export default function StackOfTechnology() {
    return (
        <div className="tech-stack-container">
            <div className="tech-stack-wrapper">

                {/* Grid Layout for the 4 Quadrants */}
                <div className="tech-stack-grid">
                    {technologyData.map((category) => (
                        <div
                            key={category.title}
                            className={`quadrant-card ${category.radiusClass}`}
                        >
                            {/* Category Title Badge */}
                            <div className="category-badge">
                                <span className="category-title">
                                    {category.title}
                                </span>
                            </div>

                            {/* Tech Stack Icons Grid */}
                            <div className="icons-grid">
                                {category.items.map((tech) => (
                                    <div key={tech.name} className="icon-item">
                                        <div className="icon-svg-wrapper">
                                            <IconComponent
                                                iconName={tech.icon}
                                                color={tech.color}
                                                size={36}
                                            />
                                        </div>
                                        <span className="icon-name">
                                            {tech.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Central Overlay Text */}
                {/* Masks the intersection and holds the title */}
                <div className="central-circle">
                    <h2 className="central-text">
                        Stack Of
                        <br />
                        Technology
                    </h2>
                </div>

            </div>
        </div>
    );
}