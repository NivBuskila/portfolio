'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { personalInfo } from '@/data/personalInfo';
import SocialPreviewModal from './SocialPreviewModal';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'github' | 'linkedin'>('github');
  return (
    <div
      className="
        relative
        min-h-screen
        bg-gradient-to-b
        from-pink-100
        to-blue-50
        dark:from-gray-900
        dark:to-purple-900
        overflow-hidden
        flex
        items-center
        transition-colors
        duration-500
      "
    >
      <motion.div
        className="
          absolute
          w-96
          h-96
          bg-pink-200
          dark:bg-purple-800/30
          rounded-full
          mix-blend-multiply
          filter
          blur-3xl
          opacity-50
          top-[-8rem]
          left-[-8rem]
          z-0
        "
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
      />

      <motion.div
        className="
          absolute
          w-96
          h-96
          bg-blue-200
          dark:bg-blue-800/30
          rounded-full
          mix-blend-multiply
          filter
          blur-3xl
          opacity-50
          bottom-[-8rem]
          right-[-8rem]
          z-0
        "
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
      />

      <div
        className="
          relative
          z-10
          w-full
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          flex
          flex-col
          md:flex-row
          items-center
          md:items-start
        "
      >
        <motion.div className="flex-1 mt-10 md:mt-32">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 dark:text-white transition-colors duration-500">
            Hi, I&apos;m{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-400 dark:to-blue-400">
              {personalInfo.name}
            </span>{' '}
            - Full Stack Developer
          </h1>

          <h2 className="mt-4 text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-300 transition-colors duration-500">
            {personalInfo.title}
          </h2>

          <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed transition-colors duration-500">
            {personalInfo.about}
          </p>

          <div className="mt-6 text-base text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed transition-colors duration-500">
            <p>
              I&apos;m a Computer Science graduate from Afeka College of
              Engineering currently working at Amazon. My expertise spans across
              modern web technologies, mobile development, and backend systems.
              I specialize in building scalable applications using React,
              Next.js, TypeScript, Python, and Java.
            </p>
            <p className="mt-4">
              Explore my{' '}
              <Link
                href="/projects"
                className="text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 underline font-medium"
              >
                portfolio projects
              </Link>{' '}
              including Android apps, AI tools, and full-stack web applications.
              Learn more{' '}
              <Link
                href="/about"
                className="text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 underline font-medium"
              >
                about my experience
              </Link>{' '}
              and technical skills, or{' '}
              <Link
                href="/contact"
                className="text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 underline font-medium"
              >
                get in touch
              </Link>{' '}
              for collaboration opportunities and internships.
            </p>
            <p className="mt-4">
              I specialize in creating responsive user interfaces with React and
              Next.js, building RESTful APIs, and deploying on cloud platforms
              like AWS and Vercel. My work showcases modern development
              practices and clean, maintainable code.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/projects"
              className="
                inline-flex
                items-center
                justify-center
                px-8
                py-3
                text-base
                font-medium
                rounded-full
                bg-gradient-to-r
                from-purple-400
                to-blue-400
                dark:from-purple-500
                dark:to-blue-500
                text-white
                shadow-lg
                hover:shadow-xl
                hover:scale-105
                transition-all
                duration-300
              "
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="
                inline-flex
                items-center
                justify-center
                px-8
                py-3
                text-base
                font-medium
                rounded-full
                bg-white
                dark:bg-gray-800
                text-gray-700
                dark:text-gray-200
                border
                border-gray-200
                dark:border-gray-600
                shadow-sm
                hover:bg-gray-50
                dark:hover:bg-gray-700
                hover:scale-105
                transition-all
                duration-300
              "
            >
              Contact Me
            </Link>
          </div>

          <div className="mt-8 mb-16 flex gap-6 justify-end">
            <button
              onClick={() => {
                setModalType('github');
                setShowModal(true);
              }}
              className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors transform hover:scale-110 cursor-pointer"
              aria-label="View GitHub Profile"
            >
              <svg
                className="h-12 w-12"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2
                  6.484 2 12.017c0 4.425 2.865
                  8.18 6.839 9.504.5.092.682-.217.682-.483
                  0-.237-.008-.868-.013-1.703
                  -2.782.605-3.369-1.343-3.369-1.343
                  -.454-1.158-1.11-1.466-1.11-1.466
                  -.908-.62.069-.608.069-.608
                  1.003.07 1.531 1.032 1.531 1.032
                  .892 1.53 2.341 1.088 2.91.832
                  .092-.647.35-1.088.636-1.338
                  -2.22-.253-4.555-1.113-4.555-4.951
                  0-1.093.39-1.988 1.029-2.688
                  -.103-.253-.446-1.272.098-2.65
                  0 0 .84-.27 2.75 1.026A9.564 9.564
                  0 0112 6.844c.85.004 1.705.115
                  2.504.337 1.909-1.296 2.747-1.027
                  2.747-1.027.546 1.379.202 2.398.1 2.651
                  .64.7 1.028 1.595 1.028 2.688
                  0 3.848-2.339 4.695-4.566 4.943
                  .359.309.678.92.678 1.855
                  0 1.338-.012 2.419-.012 2.747
                  0 .268.18.58.688.482A10.019
                  10.019 0 0022 12.017C22 6.484
                  17.522 2 12 2z"
                />
              </svg>
            </button>
            <button
              onClick={() => {
                setModalType('linkedin');
                setShowModal(true);
              }}
              className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors transform hover:scale-110 cursor-pointer"
              aria-label="View LinkedIn Profile"
            >
              <svg
                className="h-12 w-12"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 0h-14c-2.761 0-5
                  2.239-5 5v14c0 2.761 2.239
                  5 5 5h14c2.762 0 5-2.239
                  5-5v-14c0-2.761-2.238-5
                  -5-5zm-11 19h-3v-11h3v11zm
                  -1.5-12.268c-.966 0-1.75
                  -.79-1.75-1.764s.784-1.764
                  1.75-1.764 1.75.79 1.75
                  1.764-.783 1.764-1.75
                  1.764zm13.5 12.268h-3v-5.604
                  c0-3.368-4-3.113-4 0v5.604h-3
                  v-11h3v1.765c1.396-2.586
                  7-2.777 7 2.476v6.759z"
                />
              </svg>
            </button>
          </div>

          <SocialPreviewModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            type={modalType}
            username="NivBuskila"
          />
        </motion.div>
      </div>
    </div>
  );
}
