'use client';

import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      const stored = localStorage.getItem('theme') as Theme;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (stored && (stored === 'light' || stored === 'dark')) {
        setTheme(stored);
        document.documentElement.classList.toggle('dark', stored === 'dark');
      } else if (prefersDark) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      }
    } catch (error) {
      // localStorage might be disabled (private mode) or full
      // Fallback to system preference
      if (process.env.NODE_ENV === 'development') {
        console.warn('Theme persistence unavailable:', error);
      }
      try {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
        if (prefersDark) {
          document.documentElement.classList.add('dark');
        }
      } catch {
        // Ultimate fallback: light theme
        setTheme('light');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    try {
      localStorage.setItem('theme', newTheme);
    } catch (error) {
      // localStorage not available, theme will reset on refresh
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to persist theme preference:', error);
      }
    }

    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return { theme, toggleTheme, mounted };
}; 