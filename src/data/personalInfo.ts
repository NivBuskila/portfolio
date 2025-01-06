export interface Experience {
    title: string;
    company: string;
    duration: string;
    description: string[];
  }
  
  export interface Skills {
    frontend: string[];
    backend: string[];
    tools: string[];
  }
  
  export interface SocialLinks {
    github: string;
    linkedin: string;
  }
  
  export interface PersonalInfo {
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
    about: `I am a passionate software developer focused on creating elegant solutions to complex problems. I enjoy building efficient, scalable applications and learning new technologies.`,
    socialLinks: {
      github: 'https://github.com/NivBuskila',
      linkedin: 'https://linkedin.com/in/nivbuskila' 
    },
    skills: {
      frontend: [
        'React',
        'TypeScript',
        'Next.js',
        'HTML5',
        'CSS3',
        'Tailwind CSS'
      ],
      backend: [
        'Node.js',
        'Express',
        'MongoDB',
        'RESTful APIs'
      ],
      tools: [
        'Git',
        'GitHub',
        'VS Code',
        'Docker',
        'CI/CD'
      ]
    },
    experience: [
      {
        title: 'Software Developer',
        company: 'Your Company',
        duration: '2023 - Present',
        description: [
          'Developed and maintained various web applications using React and Node.js',
          'Collaborated with cross-functional teams to deliver high-quality software solutions',
          'Implemented new features and optimized existing ones for better performance'
        ]
      }
    ]
  };