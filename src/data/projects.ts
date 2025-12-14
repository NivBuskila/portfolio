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
    title: 'European Roulette Engine',
    description:
      'A full-stack European roulette game built with TypeScript, featuring a Phaser 3 frontend and Express backend with provably fair random number generation. Includes comprehensive testing, clean architecture, and accurate payout calculations.',
    tech: ['TypeScript', 'Phaser 3', 'Express', 'Node.js', 'Vite', 'Vitest', 'Jest'],
    image: '/images/roulette.png',
    github: 'https://github.com/NivBuskila/ts-roulette-engine',
  },
  {
    title: 'Afeka ChatBot',
    description:
      'Multilingual RAG platform that answers academic regulation questions for Afeka students, achieving 3.67s average RAG analysis time and 6s overall user response time. Microservice architecture with React + TypeScript frontend, FastAPI gateway, Gemini API + LangChain AI service, Supabase authentication and SQL migrations, document management, and analytics dashboard.',
    tech: ['React', 'TypeScript', 'FastAPI', 'LangChain', 'Gemini API', 'Supabase', 'Microservices'],
    image: '/images/APEX_PIC.jpg',
    github: 'https://github.com/NivBuskila/Afeka_ChatBot',
  },
  {
    title: 'Face Recognition API',
    description:
      'A robust and secure REST API service for facial recognition and user management, built with Flask and AWS Rekognition. Provides real-time face detection, user registration, verification, and advanced security features via JWT-based authentication and Swagger documentation.',
    tech: ['Python', 'Flask', 'MongoDB', 'AWS Rekognition', 'JWT', 'Swagger', 'Vercel'],
    image: '/images/face-recognition-project.jpg',
    github: 'https://github.com/NivBuskila/face-recognition-api',
  },
  {
    title: 'Face Recognition SDK',
    description:
      'An Android library providing face detection capabilities with a demonstration application. Facilitates user registration, verification, and comparison using ML Kit integration, published on JitPack as production ready library with clean modular architecture.',
    tech: ['Android SDK', 'Java', 'ML Kit', 'CameraX', 'Retrofit', 'JitPack'],
    image: '/images/face-recognition-project.jpg',
    github: 'https://github.com/NivBuskila/FaceRecognitionProject',
    demo: 'https://youtube.com/shorts/J1JMCjIWSPc?feature=share',
  },
  {
    title: 'TinyReminder',
    description:
      'Android application that helps ensure children are not left behind in vehicles. Based on event driven architecture with real-time alerts, live tracking, and family management features.',
    tech: ['Java', 'Firebase', 'Google Maps API', 'Android SDK'],
    image: '/images/TinyReminder.png',
    github: 'https://github.com/NivBuskila/TinyReminder_LifeSavingApp',
    demo: '/tinyreminder-demo',
  },
  {
    title: 'Personal Portfolio',
    description:
      'Responsive Next.js website with Tailwind CSS, enhanced SEO, and dynamic Framer Motion animations. Achieved 100% score in PageSpeed Insights for Performance, SEO and Best Practices.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'ESLint', 'Prettier', 'Formik/Yup', 'Vercel'],
    image: '/images/portfolio.png',
    github: 'https://github.com/NivBuskila/portfolio',
    demo: 'https://nivbuskila.tech',
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
    title: 'Universal Space Travel Manager',
    description:
      'CLI tool for managing interstellar travel with advanced search, file I/O, and modular C design.',
    tech: ['C', 'File I/O', 'Linux'],
    image: '/images/space-travel.jpg',
    github: 'https://github.com/NivBuskila/Universal_Space_Travel_Manager',
  },
];
