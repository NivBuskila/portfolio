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
  title: 'Computer Science Student & Junior Software Developer',
  email: 'nivbuskila@icloud.com',
  phone: '+972-54-3597115',
  about: `Highly motivated Computer Science student with hands-on experience developing full-stack solutions from mobile apps to backend services using diverse programming languages and frameworks. Driven by a passion for solving complex problems, optimizing performance, and continuously exploring cutting edge technologies in software development.`,
  socialLinks: {
    github: 'https://github.com/NivBuskila',
    linkedin: 'https://www.linkedin.com/in/nivbuskila/',
  },
  skills: {
    frontend: ['React'],
    backend: ['Node.js', 'Flask', 'Firebase'],
    languages: ['Java', 'C', 'JavaScript', 'Python'],
    frameworks: ['React', 'Node.js', 'AWS Rekognition', 'Android SDK', 'ML Kit'],
    tools: ['Git', 'Linux', 'CameraX', 'MongoDB', 'Google Maps API'],
  },
  experience: [
    {
      title: 'Security Team Coordinator',
      company: 'Amazon Security Team',
      duration: '2021 - Present',
      description: [
        'Provided customer service to Amazon employees and visitors',
        'Monitored security systems, investigated incidents, and prepared detailed reports',
        'Managed emergency response procedures and trained in advanced protocols',
        "Developed teamwork and leadership skills by effectively managing the team in the manager's absence",
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
