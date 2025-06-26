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
    description:
      'A modern, responsive portfolio website built with Next.js and Tailwind CSS, featuring dynamic content management and responsive design.',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    image: '/images/portfolio.png',
    github: 'https://github.com/NivBuskila/portfolio',
    demo: 'https://nivbuskila.tech',
  },
  {
    title: 'TinyReminder',
    description:
      'Life-Saving Android App to prevent child neglect in vehicles with real-time alerts and family management.',
    tech: ['Java', 'Firebase', 'Google Maps API', 'Android SDK'],
    image: '/images/TinyReminder.png',
    github: 'https://github.com/NivBuskila/TinyReminder_LifeSavingApp',
  },
  {
    title: 'Universal Space Travel Manager',
    description:
      'CLI tool for managing interstellar travel with advanced search, file I/O, and modular C design.',
    tech: ['C', 'File I/O', 'Linux'],
    image: '/images/space-travel.jpg',
    github: 'https://github.com/NivBuskila/Universal_Space_Travel_Manager',
  },
  {
    title: 'AI Trip Advisor',
    description:
      'AI-powered web app providing personalized travel itineraries and destination previews using AI generated photos.',
    tech: ['JavaScript', 'Node.js', 'Express.js', 'React', 'Google Maps API'],
    image: '/images/ai-trip.png',
    github: 'https://github.com/NivBuskila/AI_Trip_Advisor',
  },
  {
    title: 'Face Recognition API',
    description:
      'A robust and secure REST API service for facial recognition and user management, built with Flask and AWS Rekognition. Provides real-time face detection, user registration, verification, and advanced security features via JWT-based authentication and more.',
    tech: ['Python', 'Flask', 'MongoDB', 'AWS Rekognition', 'JWT', 'Swagger'],
    image: '/images/face-recognition-project.jpg',
    github: 'https://github.com/NivBuskila/face-recognition-api',
  },
  {
    title: 'Face Recognition Project (Android)',
    description:
      'An Android library providing face recognition capabilities with a demonstration application. Facilitates user registration, verification, and comparison, with a clean architecture, ML Kit integration, and secure credential storage.',
    tech: ['Java', 'Android SDK', 'ML Kit', 'CameraX', 'Retrofit'],
    image: '/images/face-recognition-project.jpg',
    github: 'https://github.com/NivBuskila/FaceRecognitionProject',
    demo: 'https://youtube.com/shorts/J1JMCjIWSPc?feature=share',
  },
];
