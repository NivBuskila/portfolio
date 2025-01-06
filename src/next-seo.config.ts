import type { NextSeoProps } from 'next-seo';

export const NEXT_SEO_DEFAULT: NextSeoProps = {
  title: 'Niv Buskila - Software Developer',
  description: 'Personal portfolio of Niv Buskila, a software developer specializing in web development and modern technologies.',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://NivBuskila.engineer/',
    siteName: 'Niv Buskila Portfolio',
    title: 'Niv Buskila - Software Developer',
    description: 'Personal portfolio of Niv Buskila, a software developer specializing in web development and modern technologies.',
    images: [
      {
        url: 'https://your-domain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Niv Buskila',
      },
    ],
  },
  
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180'
    },
    {
      rel: 'manifest',
      href: '/manifest.json'
    }
  ]
};