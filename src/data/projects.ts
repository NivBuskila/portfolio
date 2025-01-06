export interface Project {
    title: string;
    description: string;
    tech: string[];
    image: string;
    github: string;
    demo?: string;
  }
  
  export const projects: Project[] = [
    {
      title: 'Personal Portfolio',
      description: 'A modern, responsive portfolio website built with Next.js and Tailwind CSS, featuring dynamic content management and responsive design.',
      tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      image: '/images/portfolio.jpg',
      github: 'https://github.com/NivBuskila/portfolio',
      demo: 'https://nivbuskila.engineer'
    },
    {
      title: 'Project 2',
      description: 'Your second project description here...',
      tech: ['React', 'Node.js', 'MongoDB'],
      image: '/images/project2.jpg',
      github: 'https://github.com/NivBuskila/project2',
      demo: 'https://your-demo-link.com'
    }
  ];