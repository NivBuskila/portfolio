import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import ClientLayout from './client-layout';
import { GoogleAnalytics } from '@next/third-parties/google';

const poppins = Poppins({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Niv Buskila - Full Stack Developer | React, Python, Java Portfolio',
  description: 'Niv Buskila - Computer Science student and junior software developer specializing in React, Next.js, Python, Java, and mobile development. View my projects including Android apps, web development, and AI tools. Available for internships and collaboration opportunities.',
  keywords: ['Niv Buskila', 'Full Stack Developer', 'React Developer', 'Python Developer', 'Java Developer', 'Computer Science Student', 'Web Development', 'Mobile Development', 'Portfolio', 'Software Engineer', 'Frontend Developer', 'Backend Developer'],
  authors: [{ name: 'Niv Buskila' }],
  creator: 'Niv Buskila',
  openGraph: {
    title: 'Niv Buskila - Full Stack Developer Portfolio',
    description: 'Computer Science student and junior software developer specializing in React, Next.js, Python, Java, and mobile development. View my projects and get in touch for collaboration opportunities.',
    url: 'https://nivbuskila.tech',
    siteName: 'Niv Buskila Portfolio',
    // images: [
    //   {
    //     url: '/og-image.png',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Niv Buskila - Full Stack Developer Portfolio',
    //   },
    // ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Niv Buskila - Full Stack Developer Portfolio',
    description: 'Computer Science student and junior software developer. View my React, Python, and Java projects.',
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
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Niv Buskila",
  "jobTitle": "Full Stack Developer",
  "description": "Computer Science student and junior software developer specializing in React, Next.js, Python, Java, and mobile development",
  "url": "https://nivbuskila.tech",
  "email": "nivbuskila@icloud.com",
  "sameAs": [
    "https://github.com/NivBuskila",
    "https://linkedin.com/in/nivbuskila"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Amazon Security Team"
  },
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Afeka College of Engineering"
  },
  "knowsAbout": [
    "React", "Next.js", "TypeScript", "Python", "Java", "JavaScript", "Node.js", "Web Development", "Mobile Development", "Software Engineering"
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=s ? s === 'dark' : p; if(d){document.documentElement.classList.add('dark');}}catch(e){}})();`
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${poppins.className} bg-background text-foreground`}>
        <ClientLayout>
          {children}
        </ClientLayout>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
