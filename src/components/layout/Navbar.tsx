'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import SunIcon from '@heroicons/react/24/outline/SunIcon';
import MoonIcon from '@heroicons/react/24/outline/MoonIcon';
import { useTheme } from '@/hooks/useTheme';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useTheme();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white/98 shadow-sm dark:bg-gray-900/98 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                NB
              </span>
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium transition-all duration-300
                  ${
                    isActive(item.href)
                      ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                      : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:border-gray-300 dark:hover:!text-white dark:hover:border-gray-600'
                  }`}
              >
                {item.name}
              </Link>
            ))}
            
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-3 rounded-lg text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <SunIcon className="h-6 w-6" />
                ) : (
                  <MoonIcon className="h-6 w-6" />
                )}
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2 sm:hidden">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-3 rounded-lg text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <SunIcon className="h-6 w-6" />
                ) : (
                  <MoonIcon className="h-6 w-6" />
                )}
              </button>
            )}
            <button
              type="button"
              className="inline-flex items-center justify-center p-3 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-purple-400 dark:hover:bg-gray-800 transition-all duration-300"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-7 w-7" />
              ) : (
                <Bars3Icon className="block h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                className={`block pl-3 pr-4 py-3 border-l-4 text-base font-medium transition-all duration-300
                  ${
                    isActive(item.href)
                      ? 'bg-purple-50 border-purple-500 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                      : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300 dark:hover:!text-white dark:hover:border-gray-600 dark:hover:bg-gray-800/50'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
