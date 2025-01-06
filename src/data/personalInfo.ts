interface Experience {
    title: string;
    company: string;
    duration: string;
    description: string[];
  }
  
  interface Skills {
    frontend: string[];
    backend: string[];
    tools: string[];
  }
  
  interface SocialLinks {
    github: string;
    linkedin: string;
  }
  
  interface PersonalInfo {
    name: string;
    title: string;
    email: string;
    location: string;
    about: string;
    socialLinks: SocialLinks;
    skills: Skills;
    experience: Experience[];
  }
  
  export const personalInfo: PersonalInfo = {
    name: 'Niv Buskila',
    title: 'Software Developer',
    email: 'nivbuskila@icloud.com',
    location: 'Israel',
    about: `I'm a passionate software developer with a focus on web development and modern technologies. 
           I enjoy building efficient, scalable applications and learning new technologies.`,
    socialLinks: {
      github: 'https://github.com/NivBuskila',
      linkedin: 'https://www.linkedin.com/in/nivbuskila/', 
    },
    skills: {
      frontend: [
        'React',
        'TypeScript',
        'Next.js',
        'HTML5',
        'CSS3',
        'Tailwind CSS',
      ],
      backend: [
        'Node.js',
        'Express',
        'MongoDB',
        'RESTful APIs',
      ],
      tools: [
        'Git',
        'GitHub',
        'VS Code',
        'Docker',
        'CI/CD',
      ],
    },
    experience: [
      {
        title: 'Software Developer',
        company: '',
        duration: '',
        description: [
            '',
            '',
        ],
      },
     
    ],
  };