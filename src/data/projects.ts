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
      description: 'A modern, responsive portfolio website built with Next.js and Tailwind CSS.',
      tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      image: '/images/portfolio.jpg',
      github: 'https://github.com/NivBuskila/portfolio',
      demo: 'https://nivbuskila.vercel.app'
    },
    // {
    //   title: 'Project 2',
    //   description: 'Description of your second project.',
    //   tech: ['React', 'Node.js', 'MongoDB'],
    //   image: '/images/project2.jpg',
    //   github: 'https://github.com/yourusername/project2',
    //   demo: 'https://project2-demo.com'
    // },
    //
  ];