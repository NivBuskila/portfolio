import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Niv Buskila - Get In Touch',
  description: 'Contact Niv Buskila for collaboration, internship opportunities, or project inquiries. Available for React, Python and Java development.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Niv Buskila - Get In Touch',
    description: 'Contact Niv Buskila for collaboration, internship opportunities, or project inquiries. Available for React, Python and Java development.',
    url: 'https://nivbuskila.tech/contact',
  },
};

const Contact = dynamic(() => import('@/components/contact/Contact'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" type="spinner" text="Loading contact form..." />
    </div>
  ),
});

export default function ContactPage() {
  return <Contact />;
}