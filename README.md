# Portfolio Website

My personal portfolio website built with Next.js 15, React 19, and TypeScript. I wanted something that actually looks good and works well, so I built it from scratch with modern tools and proper engineering practices.

## Features

**Dark mode that actually works** - Respects system preferences and remembers your choice. The toggle is smooth and everything adapts properly.

**Project filtering and search** - Filter by technology, search by name, or browse by category. Much better than scrolling through an endless list.

**Proper contact form** - Built with Formik and Yup validation. Handles errors gracefully and gives real feedback. Uses Formspree for the backend.

**Animated skill bars** - Shows technical skills with animated progress bars. Much better than boring bullet points.

**Performance optimized** - Image optimization, lazy loading, proper caching headers. Loads fast and stays fast.

**Error boundaries** - When things break, users see a helpful error page instead of a white screen.

## Tech stack

**Frontend**: Next.js 15 with the new App Router, React 19, TypeScript
**Styling**: Tailwind CSS with custom animations
**Forms**: Formik + Yup validation
**Animations**: Framer Motion
**Icons**: Heroicons
**Deployment**: Vercel

## Project structure

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── about/             # About page components
│   ├── common/            # Shared components (ErrorBoundary, Loading, etc)
│   ├── contact/           # Contact form
│   ├── home/              # Homepage
│   ├── layout/            # Header, footer, navigation
│   └── projects/          # Projects page and filtering
├── data/                  # Personal info and projects data
├── hooks/                 # Custom React hooks
└── types/                 # TypeScript definitions
```

## Development notes

**Dark mode**: I use a custom hook that checks system preferences first, then falls back to localStorage. The class-based approach with CSS custom properties makes theming much cleaner than inline styles.

**Animations**: Framer Motion is great but can be overkill. I keep animations subtle and respect `prefers-reduced-motion` for accessibility.

**Performance**: Next.js handles most optimization automatically, but I added custom image optimization and proper caching headers in `next.config.ts`.

**Error handling**: The ErrorBoundary catches JavaScript errors and shows a recovery screen. Combined with proper form validation, users rarely see broken states.

## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build  
npm run start        # Run production build locally
npm run lint         # Check for code issues
npm run format       # Format code with Prettier
```

## Contact

Niv Buskila - nivbuskila@icloud.com
