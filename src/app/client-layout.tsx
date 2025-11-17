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
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

