'use client';

import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  /**
   * Color scheme: 'purple' for purple-blue gradient, 'green' for green-blue
   */
  colorScheme?: 'purple' | 'green';
  /**
   * Intensity: 'low' for subtle, 'medium' for default, 'high' for vibrant
   */
  intensity?: 'low' | 'medium' | 'high';
}

export default function AnimatedBackground({
  colorScheme = 'purple',
  intensity = 'medium',
}: AnimatedBackgroundProps) {
  // Color configurations
  const colors = {
    purple: {
      blob1: 'from-purple-400 to-pink-400',
      blob2: 'from-blue-400 to-purple-400',
    },
    green: {
      blob1: 'from-green-400 to-blue-400',
      blob2: 'from-teal-400 to-green-400',
    },
  };

  // Opacity based on intensity
  const opacities = {
    low: 'opacity-20',
    medium: 'opacity-30',
    high: 'opacity-40',
  };

  const selectedColors = colors[colorScheme];
  const opacity = opacities[intensity];

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Blob 1 */}
      <motion.div
        className={`absolute -left-20 top-20 h-72 w-72 rounded-full bg-gradient-to-br ${selectedColors.blob1} blur-3xl will-change-transform ${opacity}`}
        animate={{
          x: [0, 40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Blob 2 */}
      <motion.div
        className={`absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-gradient-to-br ${selectedColors.blob2} blur-3xl will-change-transform ${opacity}`}
        animate={{
          x: [0, -50, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}
