import Projects from '@/components/projects/Projects';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects - React, Python, Java and Android Apps',
  description: 'View Niv Buskila\'s portfolio: Android apps, AI tools, web development projects. Built with React, Next.js, Python, Java and more.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Projects - React, Python, Java and Android Apps',
    description: 'View Niv Buskila\'s portfolio: Android apps, AI tools, web development projects. Built with React, Next.js, Python, Java and more.',
    url: 'https://nivbuskila.tech/projects',
  },
};

export default function ProjectsPage() {
  return <Projects />;
}