'use client';

import React from 'react';
import Link from 'next/link';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import HeartIcon from '@heroicons/react/24/solid/HeartIcon';
import { personalInfo } from '@/data/personalInfo';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      href: personalInfo.socialLinks.github,
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 
                  2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 
                  0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343
                  -.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 
                  1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 
                  2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113
                  -4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 
                  0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 
                  2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651 
                  .64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 
                  4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 
                  2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 
                  6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: personalInfo.socialLinks.linkedin,
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M19 0h-14c-2.761 0-5 2.239-5 
                  5v14c0 2.761 2.239 5 5 5h14c2.762 
                  0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 
                  19h-3v-11h3v11zm-1.5-12.268c-.966 
                  0-1.75-.79-1.75-1.764s.784-1.764 
                  1.75-1.764 1.75.79 1.75 1.764-.783 
                  1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0
                  -3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396
                  -2.586 7-2.777 7 2.476v6.759z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Email',
      href: `mailto:${personalInfo.email}`,
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 dark:from-purple-500/10 dark:to-blue-500/10" />

      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
              <span className="text-lg">👨‍💻</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md leading-relaxed transition-colors duration-500">
              Passionate full-stack developer creating innovative solutions and
              beautiful user experiences.
            </p>

            <div className="space-y-2 text-sm">
              <a
                href="mailto&#58;nivbuskila&#64;icloud&#46;com"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span
                  dangerouslySetInnerHTML={{
                    __html: 'nivbuskila&#64;icloud&#46;com',
                  }}
                />
              </a>
              {personalInfo.phone && (
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {personalInfo.phone}
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 transition-colors duration-500">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 transition-colors duration-500">
              Connect
            </h3>
            <div className="flex flex-col space-y-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 group"
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </span>
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm transition-colors duration-500">
            <span>&copy; {new Date().getFullYear()}</span>
            <span>{personalInfo.name}.</span>
            <span>Made with</span>
            <span>
              <HeartIcon className="h-4 w-4 text-red-500" />
            </span>
            <span>and Next.js</span>
          </div>

          <button
            onClick={scrollToTop}
            className="
              mt-4 md:mt-0
              flex items-center gap-2
              px-4 py-2
              bg-gradient-to-r from-purple-500 to-blue-500
              text-white text-sm font-medium
              rounded-full shadow-lg
              hover:shadow-xl hover:scale-105
              transition-all duration-300
            "
          >
            <ArrowUpIcon className="h-4 w-4" />
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
