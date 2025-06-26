'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      return <DefaultErrorFallback error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ 
  error, 
  resetError 
}: { 
  error?: Error; 
  resetError: () => void; 
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50 dark:from-gray-900 dark:to-red-900 flex items-center justify-center px-4 transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-6"
        >
          🚫
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-500">
          Oops! Something went wrong
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed transition-colors duration-500">
          We encountered an unexpected error. Don&apos;t worry, it&apos;s not your fault!
        </p>

        {process.env.NODE_ENV === 'development' && error && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              Error Details (Development)
            </summary>
            <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs text-red-600 dark:text-red-400 overflow-auto transition-colors duration-500">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}

        <div className="space-y-3">
          <motion.button
            onClick={resetError}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              w-full px-6 py-3
              bg-gradient-to-r from-red-500 to-orange-500
              text-white font-medium rounded-full
              shadow-lg hover:shadow-xl
              transition-all duration-300
            "
          >
            Try Again
          </motion.button>
          
          <motion.button
            onClick={() => window.location.href = '/'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              w-full px-6 py-3
              bg-white dark:bg-gray-800
              text-gray-700 dark:text-gray-300
              font-medium rounded-full
              border border-gray-300 dark:border-gray-600
              shadow-lg hover:shadow-xl
              transition-all duration-300
            "
          >
            Go Home
          </motion.button>
        </div>

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-500">
          If this problem persists, please{' '}
          <a
            href="mailto:nivbuskila@icloud.com"
            className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 underline transition-colors"
          >
            contact me
          </a>
        </p>
      </motion.div>
    </div>
  );
}

export default ErrorBoundary; 