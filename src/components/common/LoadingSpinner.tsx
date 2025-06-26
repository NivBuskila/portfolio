'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  type?: 'spinner' | 'dots' | 'pulse' | 'wave';
  text?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  type = 'spinner',
  text = 'Loading...',
  fullScreen = false,
}) => {
  const renderSpinner = () => {
    switch (type) {
      case 'spinner':
        return (
          <motion.div
            className={`${sizeClasses[size]} border-4 border-purple-200 dark:border-purple-800 border-t-purple-500 dark:border-t-purple-400 rounded-full`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        );

      case 'dots':
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-5 h-5'} bg-purple-500 dark:bg-purple-400 rounded-full`}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <motion.div
            className={`${sizeClasses[size]} bg-purple-500 dark:bg-purple-400 rounded-full`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );

      case 'wave':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map((index) => (
              <motion.div
                key={index}
                className={`${size === 'sm' ? 'w-1 h-4' : size === 'md' ? 'w-1 h-8' : size === 'lg' ? 'w-2 h-12' : 'w-2 h-16'} bg-purple-500 dark:bg-purple-400 rounded-full`}
                animate={{
                  scaleY: [1, 2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.1,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      {renderSpinner()}
      {text && (
        <motion.p
          className="text-gray-600 dark:text-gray-400 text-sm font-medium transition-colors duration-500"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50 transition-colors duration-500">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 transition-colors duration-500"
        >
          {content}
        </motion.div>
      </div>
    );
  }

  return content;
};

export const PageLoader: React.FC<{ text?: string }> = ({ text = 'Loading page...' }) => (
  <LoadingSpinner size="lg" type="spinner" text={text} fullScreen />
);

export const ButtonLoader: React.FC = () => (
  <LoadingSpinner size="sm" type="spinner" />
);

export const InlineLoader: React.FC<{ text?: string }> = ({ text }) => (
  <div className="flex items-center justify-center py-8">
    <LoadingSpinner size="md" type="dots" text={text} />
  </div>
);

export default LoadingSpinner; 