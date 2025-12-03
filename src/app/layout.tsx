import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';
import ClientLayout from './client-layout';
import { GoogleAnalytics } from '@next/third-parties/google';
import JsonLd from '@/components/seo/JsonLd';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL('https://nivbuskila.tech'),
  title: 'Niv Buskila - AI & Full Stack Developer',
  description:
    'Computer Science graduate and full stack developer specializing in AI agents, RAG systems, React, Next.js, and Python. View my projects and connect for collaboration.',
  keywords: [
    'Niv Buskila',
    'Full Stack Developer',
    'AI Engineer',
    'RAG Systems',
    'AI Agents',
    'React Developer',
    'Python Developer',
    'Java Developer',
    'Computer Science Graduate',
    'Web Development',
    'Software Engineer',
  ],
  authors: [{ name: 'Niv Buskila' }],
  creator: 'Niv Buskila',
  alternates: {
    canonical: 'https://nivbuskila.tech',
  },
  openGraph: {
    title: 'Niv Buskila - AI & Full Stack Developer',
    description:
      'Computer Science graduate and full stack developer specializing in AI agents, RAG systems, React, Next.js, and Python. View my projects and connect for collaboration.',
    url: 'https://nivbuskila.tech',
    siteName: 'Niv Buskila Portfolio',
    images: [
      {
        url: 'https://nivbuskila.tech/images/portfolio.png',
        width: 1200,
        height: 630,
        alt: 'Niv Buskila - AI & Full Stack Developer Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Niv Buskila - AI & Full Stack Developer',
    description:
      'Computer Science graduate and full stack developer specializing in AI agents, RAG systems, React, Next.js, and Python. View my projects.',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
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
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased text-foreground',
          inter.variable
        )}
      >
        <JsonLd />
        <ClientLayout>{children}</ClientLayout>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
