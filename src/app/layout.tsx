import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from './client-layout';
import { GoogleAnalytics } from '@next/third-parties/google';

// Using system fonts for reliability - Poppins loaded via CDN in head
const fontFamily = 'Poppins, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif';

export const metadata: Metadata = {
  metadataBase: new URL('https://nivbuskila.tech'),
  title: 'Niv Buskila - Full Stack Developer | Software Engineer',
  description:
    'Computer Science graduate and full stack developer specializing in React, Next.js, Python and Java. View my projects and connect for collaboration.',
  keywords: [
    'Niv Buskila',
    'Full Stack Developer',
    'React Developer',
    'Python Developer',
    'Java Developer',
    'Computer Science Graduate',
    'Web Development',
    'Mobile Development',
    'Portfolio',
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
  ],
  authors: [{ name: 'Niv Buskila' }],
  creator: 'Niv Buskila',
  alternates: {
    canonical: 'https://nivbuskila.tech',
  },
  openGraph: {
    title: 'Niv Buskila - Full Stack Developer | Software Engineer',
    description:
      'Computer Science graduate and full stack developer specializing in React, Next.js, Python and Java. View my projects and connect for collaboration.',
    url: 'https://nivbuskila.tech',
    siteName: 'Niv Buskila Portfolio',
    images: [
      {
        url: 'https://nivbuskila.tech/images/portfolio.png',
        width: 1200,
        height: 630,
        alt: 'Niv Buskila - Full Stack Developer Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Niv Buskila - Full Stack Developer Portfolio',
    description:
      'Computer Science graduate and full stack developer specializing in React, Next.js, Python and Java. View my projects.',
    images: ['https://nivbuskila.tech/images/portfolio.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Niv Buskila',
  jobTitle: 'Full Stack Developer',
  description:
    'Computer Science graduate and full stack developer specializing in React, Next.js, Python, Java, and mobile development',
  url: 'https://nivbuskila.tech',
  email: 'nivbuskila@icloud.com',
  sameAs: [
    'https://github.com/NivBuskila',
    'https://linkedin.com/in/nivbuskila',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Amazon',
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Afeka College of Engineering',
  },
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'Python',
    'Java',
    'JavaScript',
    'Node.js',
    'Web Development',
    'Mobile Development',
    'Software Engineering',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#9333ea" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Niv Buskila" />
        <meta name="mobile-web-app-capable" content="yes" />
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=s ? s === 'dark' : p; if(d){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-background text-foreground" style={{ fontFamily }}>
        <ClientLayout>{children}</ClientLayout>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
