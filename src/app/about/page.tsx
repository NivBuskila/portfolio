import About from '@/components/about/About';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Niv Buskila - Skills and Experience',
  description:
    'Learn about Niv Buskila - Computer Science graduate from Afeka College working at Amazon. Expertise in React, Python, Java and more.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Niv Buskila - Skills and Experience',
    description:
      'Learn about Niv Buskila - Computer Science graduate from Afeka College working at Amazon. Expertise in React, Python, Java and more.',
    url: 'https://nivbuskila.tech/about',
  },
};

export default function AboutPage() {
  return <About />;
}
