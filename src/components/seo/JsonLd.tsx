import { personalInfo } from '@/data/personalInfo';

export default function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    url: 'https://nivbuskila.tech',
    image: 'https://nivbuskila.tech/images/portfolio.png',
    sameAs: [
      personalInfo.socialLinks.github,
      personalInfo.socialLinks.linkedin,
    ],
    jobTitle: personalInfo.title,
    description: personalInfo.about,
    email: personalInfo.email,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
