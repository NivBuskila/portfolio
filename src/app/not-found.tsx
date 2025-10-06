'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900 flex items-center justify-center px-4 transition-colors duration-500">
      {/* Animated Background Blobs */}
      <motion.div
        className="absolute w-96 h-96 bg-purple-200 dark:bg-purple-800/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 top-[-8rem] left-[-8rem]"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-pink-200 dark:bg-pink-800/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 bottom-[-8rem] right-[-8rem]"
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* 404 Number with Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 15,
            duration: 0.8,
          }}
          className="mb-8"
        >
          <h1 className="text-[150px] md:text-[200px] font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent leading-none">
            404
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-4 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track!
          </p>
        </motion.div>

        {/* Animated Search Icon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="inline-block"
          >
            <MagnifyingGlassIcon className="w-24 h-24 text-purple-500 dark:text-purple-400 mx-auto" />
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <HomeIcon className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Go Home</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-semibold rounded-full border-2 border-purple-600 dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Go Back</span>
          </button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 pt-8 border-t border-gray-300 dark:border-gray-700"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Quick Links:
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { name: 'Home', href: '/' },
              { name: 'About', href: '/about' },
              { name: 'Projects', href: '/projects' },
              { name: 'Contact', href: '/contact' },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-purple-600 dark:text-purple-400 hover:text-pink-600 dark:hover:text-pink-400 font-medium transition-colors duration-200 hover:underline"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
