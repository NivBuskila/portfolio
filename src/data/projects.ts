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
    title: 'Afeka ChatBot',
    description:
      'Multilingual RAG platform that answers academic regulation questions for Afeka students, achieving 3.67s average RAG analysis time and 6s overall user response time. Microservice architecture with React + TypeScript frontend, FastAPI gateway, Gemini API + LangChain AI service, Supabase authentication and SQL migrations, document management, and analytics dashboard.',
    tech: ['React', 'TypeScript', 'FastAPI', 'LangChain', 'Gemini API', 'Supabase', 'Microservices'],
    image: '/images/ai-trip.png',
    github: 'https://github.com/NivBuskila/afeka-chatbot',
  },
  {
    title: 'Face Recognition SDK',
    description:
      'Android library for real-time face detection, registration and verification, published on JitPack as production ready library. Backed by a Flask REST API for secure user management and comparison with JWT authentication and AWS Rekognition integration.',
    tech: ['Android SDK', 'RESTful APIs', 'Flask', 'AWS Rekognition', 'MongoDB', 'JWT'],
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
