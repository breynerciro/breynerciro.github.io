export const personalInfo = {
  name: "Breyner Ismael Ciro Otero",
  title: "Ingeniero de Sistemas | Backend & Full-Stack Developer",
  email: "breynerismael@gmail.com",
  github: "https://github.com/breynerciro",
  githubHandle: "github.com/breynerciro",
  linkedin: "https://linkedin.com/in/breyner-ciro-38011330b",
  linkedinHandle: "linkedin.com/in/breyner-ciro",
  summary:
    "Ingeniero de Sistemas especializado en desarrollo Backend y Full-Stack, con experiencia en el diseño, desarrollo e implementación de aplicaciones robustas y escalables. Experto en Java (17+), Node.js y arquitectura de microservicios. Sólida trayectoria en el trabajo con bases de datos relacionales y no relacionales, consumo de APIs REST y aplicación de metodologías ágiles (Scrum). Enfocado en el ciclo de vida del desarrollo de software (SDLC) y buenas prácticas de codificación para entregar soluciones de alto impacto empresarial.",
};

export const skills = [
  {
    category: "Backend & Arquitectura",
    items: ["Java (17+)", "Node.js", "NestJS", "Express", "FastAPI", "APIs RESTful", "Microservicios", "OOP"],
    icon: "⚙️",
  },
  {
    category: "Bases de Datos",
    items: ["MySQL", "PostgreSQL", "SQL Server", "MongoDB", "Redis", "Firebase"],
    icon: "🗄️",
  },
  {
    category: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "JavaScript"],
    icon: "🎨",
  },
  {
    category: "DevOps & Metodologías",
    items: ["Git", "Docker", "AWS", "Jenkins", "Scrum", "Unit Testing", "Clean Code"],
    icon: "🚀",
  },
];

export const experience = [
  {
    title: "Desarrollador Full-Stack Independiente",
    company: "Cardiodiagnóstico Putumayo",
    date: "2024",
    tasks: [
      "Desarrollo de plataforma web, gestionando la comunicación cliente-servidor de forma eficiente.",
      "Consumo de APIs externas (Gmail, WhatsApp) mediante servicios backend en TypeScript.",
    ],
  },
  {
    title: "Desarrollador Junior Full-Stack",
    company: "Arrival Tech S.A.",
    date: "Julio 2024",
    tasks: [
      "Desarrollo de arquitectura modular para aplicaciones multiplataforma.",
      "Implementación de servicios backend robustos utilizando Python (FastAPI).",
    ],
  },
];

export const projects = [
  {
    name: "WORKIO — Sistema de reserva de espacios de coworking",
    stack: [
      // Backend
      "Node.js", "TypeScript", "Express.js", "PostgreSQL", "JWT", "Zod",
      // Frontend
      "React", "Vite", "Tailwind CSS", "React Router",
    ],
    description:
      "Plataforma web responsive para la gestión y reserva de espacios de coworking en Bogotá, desarrollada en la Universidad Nacional de Colombia bajo metodología SCRUM. Backend: API RESTful con Node.js/Express y TypeScript, autenticación JWT, validación con Zod y base de datos PostgreSQL. Frontend: SPA en React + Vite con TypeScript, manejo de roles, panel de administración e integración con pasarelas de pago. Desplegado en producción en Netlify.",
    github: "https://github.com/breynerciro/FRONTEND-WORKIO",
    githubBackend: "https://github.com/Daniel1309-gon/BACKEND-WORKIO",
    live: "https://workio-un.netlify.app",
  },
];

export const education = [
  {
    title: "Ingeniería de Sistemas y Computación",
    institution: "Universidad Nacional de Colombia",
    date: "2018 – 2026",
    details: [],
  },
  {
    title: "Calidad de Software",
    institution: "Universidad Nacional de Colombia",
    date: "Junio 2026",
    details: ["Intensidad: 64 horas. Modalidad virtual."],
  },
  {
    title: "Ingeniería de Software Basada en la Nube",
    institution: "Universidad Nacional de Colombia",
    date: "Abril 2026",
    details: ["Intensidad: 64 horas. Modalidad virtual."],
  },
];
