export interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string; // path in /public/images
  github: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    title: 'Personal Portfolio',
    description:
      'A modern, responsive portfolio website built with Next.js and Tailwind CSS, featuring dynamic content management and responsive design.',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    image: '/images/portfolio.png', // PNG
    github: 'https://github.com/NivBuskila/portfolio',
    demo: 'https://nivbuskila.engineer',
  },
  {
    title: 'TinyReminder',
    description:
      'Life-Saving Android App to prevent child neglect in vehicles with real-time alerts and family management.',
    tech: ['Java', 'Firebase', 'Google Maps API', 'Android SDK'],
    image: '/images/TinyReminder.png', // PNG
    github: 'https://github.com/NivBuskila/TinyReminder_LifeSavingApp',
  },
  {
    title: 'Universal Space Travel Manager',
    description:
      'CLI tool for managing interstellar travel with advanced search, file I/O, and modular C design.',
    tech: ['C', 'File I/O', 'Linux'],
    image: '/images/space-travel.jpg', // JPG
    github: 'https://github.com/NivBuskila/Universal_Space_Travel_Manager',
  },
  {
    title: 'AI Trip Advisor',
    description:
      'AI-powered web app providing personalized travel itineraries and destination previews.',
    tech: ['JavaScript', 'Node.js', 'Express.js', 'React', 'Google Maps API'],
    image: '/images/ai-trip.png', // PNG
    github: 'https://github.com/NivBuskila/AI_Trip_Advisor',
  },
];
