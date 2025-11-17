'use client';

import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { initPerformanceObserver } from '@/lib/performance';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize performance monitoring
    const cleanup = initPerformanceObserver();
    return cleanup;
  }, []);

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-purple-600 focus:text-white focus:rounded-lg focus:font-medium focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main id="main-content" className="flex-grow">{children}</main>
          <Footer />
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

