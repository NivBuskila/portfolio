// tailwind.config.ts
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // צבעים מותאמים
        glassWhite: 'rgba(255, 255, 255, 0.25)',
        neonGreen: '#39FF14',
        neonBlue: '#00E7FF',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        neon: '0 0 15px rgba(57,255,20, 0.6)', // לדוגמה ניאון ירוק
      },
      // אנימציית Gradient משתנה
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
      },
    },
  },
  plugins: [],
};