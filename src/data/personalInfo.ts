export interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string[];
}

export interface Education {
  degree: string;
  school: string;
  duration: string;
}

export interface Skills {
  frontend: string[];
  backend: string[];
  tools: string[];
  languages: string[];
  frameworks: string[];
}

export interface SocialLinks {
  github: string;
  linkedin: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  about: string;
  socialLinks: SocialLinks;
  skills: Skills;
  experience: Experience[];
  education: Education[];
}

export const personalInfo: PersonalInfo = {
  name: 'Niv Buskila',
  title: 'Computer Science Graduate & Full Stack Developer',
  email: 'nivbuskila@icloud.com',
  phone: '',
  about: `Computer Science graduate who turns ideas into production ready AI and full stack products. Delivered 3.67s RAG response times, over 90% accuracy, and built cloud scale microservice platforms. Comfortable with the entire development lifecycle: architecture, coding, CI/CD, observability and metrics. Skilled in Java, Python, JavaScript, and C with experience across web, mobile and cloud. Seeking Full Stack Developer, Backend Developer and AI Engineer positions.`,
  socialLinks: {
    github: 'https://github.com/NivBuskila',
    linkedin: 'https://www.linkedin.com/in/nivbuskila/',
  },
  skills: {
    frontend: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'HTML/CSS', 'JavaScript'],
    backend: ['Python', 'Java', 'FastAPI', 'Flask', 'Node.js', 'RESTful APIs', 'Microservices'],
    languages: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'Hebrew (Native)', 'English (Fluent)'],
    frameworks: ['React', 'Next.js', 'FastAPI', 'Flask', 'Android SDK', 'LangChain', 'Framer Motion'],
    tools: ['Git', 'Firebase', 'Supabase', 'MongoDB', 'AWS Rekognition', 'Google Maps API', 'Gemini API', 'JWT', 'ESLint', 'Prettier', 'Formik/Yup', 'Vercel', 'CI/CD'],
  },
  experience: [
    {
      title: 'Security Team Lead',
      company: 'Amazon Security Team',
      duration: '2021 - Present',
      description: [
        'Safeguarded 1,200+ Amazon employees and visitors by delivering front line customer facing security',
        'Proactively monitored surveillance systems and investigated security incidents',
        'Compiled detailed reports and managed emergency response procedures',
        'Led security team operations and coordinated with management during critical situations',
      ],
    },
  ],
  education: [
    {
      degree: 'B.Sc. in Computer Science',
      school: 'Afeka College of Engineering',
      duration: '2022 - 2025',
    },
  ],
};
