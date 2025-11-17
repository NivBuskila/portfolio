# Portfolio Website - Codebase Guide for AI Assistants

This document provides a comprehensive overview of the portfolio website architecture, tech stack, and project organization to help AI assistants understand and work effectively with the codebase.

## Project Overview

A modern, fully-featured personal portfolio website built with Next.js 15, React 19, and TypeScript. Features include dark mode support, animated project showcase, contact form, performance optimization, and comprehensive SEO. The site achieves 100% PageSpeed Insights scores for Performance, SEO, and Best Practices.

**Repository**: https://github.com/NivBuskila/portfolio  
**Live Site**: https://nivbuskila.tech  
**Deployment**: Vercel

---

## Technology Stack

### Core Framework & Runtime
- **Next.js 15.5.4** - React metaframework with App Router (not Pages Router)
- **React 19.0.0** - UI library with latest hooks and features
- **TypeScript 5** - Type-safe JavaScript
- **Node.js** - Runtime (via Vercel deployment)

### Styling & Animations
- **Tailwind CSS 3.4.1** - Utility-first CSS framework with dark mode support
- **Framer Motion 11.16.1** - Animation library for motion components
- **PostCSS 8** - CSS processing pipeline
- **Custom CSS** - Global styles with animations, glassmorphism, and neon effects

### Forms & Validation
- **Formik 2.4.6** - Form state management
- **Yup 1.6.1** - Schema validation library
- **@emailjs/browser 4.4.1** - Email service for contact form

### UI Components & Icons
- **@heroicons/react 2.2.0** - SVG icon library (24px outline/solid)
- **@next/third-parties 15.3.4** - Third-party integrations (Google Analytics)

### SEO & Metadata
- **next-seo 6.6.0** - SEO component library
- **Structured Data (JSON-LD)** - Schema.org Person markup in layout.tsx
- **Open Graph & Twitter Cards** - Social media preview optimization
- **Canonical URLs** - Implemented in metadata

### Performance & Monitoring
- **@next/bundle-analyzer 14.0.0** - Bundle size analysis
- **react-intersection-observer 9.14.1** - Intersection Observer for scroll-based animations
- **Web Vitals** - Core Web Vitals monitoring with Google Analytics integration
- **Image Optimization** - Next.js Image component with WebP/AVIF formats

### Development Tools
- **ESLint 9** - Code linting with Next.js config
- **Prettier 3.4.2** - Code formatting
- **@types/react 19.0.2** - React type definitions
- **@types/node 20.17.11** - Node.js type definitions

---

## Project Structure

```
portfolio/
├── src/
│   ├── app/                          # Next.js App Router - Server/Client boundary
│   │   ├── layout.tsx               # Root layout with metadata, Google Analytics, theme initializer
│   │   ├── client-layout.tsx        # Client component with Navbar, Footer, ErrorBoundary
│   │   ├── page.tsx                 # Home page (/)
│   │   ├── globals.css              # Global styles, animations, CSS variables
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx             # About page (/about)
│   │   │
│   │   ├── contact/
│   │   │   └── page.tsx             # Contact page (/contact)
│   │   │
│   │   ├── projects/
│   │   │   └── page.tsx             # Projects page (/projects)
│   │   │
│   │   ├── tinyreminder-demo/
│   │   │   └── page.tsx             # TinyReminder demo page
│   │   │
│   │   ├── not-found.tsx            # Custom 404 page with animations
│   │   ├── reportWebVitals.ts       # Web Vitals reporting function
│   │   └── _app.tsx                 # Legacy Next.js app file (minimal)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx           # Navigation bar with theme toggle and mobile menu
│   │   │   ├── Footer.tsx           # Footer component
│   │   │   └── Layout.tsx           # Layout wrapper component
│   │   │
│   │   ├── home/
│   │   │   ├── Home.tsx             # Hero section with animated background blobs
│   │   │   └── SocialPreviewModal.tsx # Modal for GitHub/LinkedIn preview
│   │   │
│   │   ├── about/
│   │   │   ├── About.tsx            # About section with experience and education
│   │   │   └── SkillsVisualization.tsx # Animated skill bars by category
│   │   │
│   │   ├── projects/
│   │   │   ├── Projects.tsx         # Projects page with filtering and search
│   │   │   └── ProjectCard.tsx      # Individual project card component
│   │   │
│   │   ├── contact/
│   │   │   └── Contact.tsx          # Contact form with Formik, Yup, and EmailJS
│   │   │
│   │   ├── common/
│   │   │   ├── ErrorBoundary.tsx    # Error boundary with error fallback UI
│   │   │   └── LoadingSpinner.tsx   # Loading spinner component
│   │   │
│   │   └── animations/
│   │       └── FadeIn.tsx           # Reusable FadeIn animation component
│   │
│   ├── data/
│   │   ├── projects.ts             # Project data array with type definitions
│   │   └── personalInfo.ts         # Personal information, skills, experience, education
│   │
│   ├── hooks/
│   │   └── useTheme.ts             # Custom hook for dark mode with localStorage
│   │
│   ├── lib/
│   │   └── performance.ts          # Web Vitals monitoring and PerformanceObserver setup
│   │
│   └── next-seo.config.ts          # Centralized SEO configuration (if applicable)
│
├── public/
│   ├── images/                     # Static project and portfolio images
│   └── [favicons]                  # favicon.ico, favicon.svg, apple-touch-icon.png
│
├── Configuration Files
│   ├── package.json               # Dependencies and scripts
│   ├── tsconfig.json             # TypeScript compiler options with path aliases
│   ├── next.config.ts            # Next.js configuration (images, headers, security)
│   ├── tailwind.config.ts        # Tailwind CSS configuration with custom theme
│   ├── postcss.config.mjs        # PostCSS plugins (Tailwind)
│   ├── .eslintrc.json            # ESLint rules
│   ├── eslint.config.mjs         # ESLint config module
│   └── .prettierrc                # Prettier formatting rules
│
├── Documentation & Configuration
│   ├── README.md                  # Project overview and feature list
│   ├── SECURITY.md               # Security best practices and headers
│   ├── DEPLOYMENT_CHECKLIST.md   # Deployment preparation checklist
│   ├── CLAUDE.md                 # This file - AI assistant guide
│   ├── .env.example              # Environment variables template
│   ├── .gitignore                # Git ignore rules
│   └── .vscode/
│       └── settings.json         # VS Code settings
│
└── .git/                         # Git repository history
```

---

## Routing Structure

The portfolio uses **Next.js App Router** (not Pages Router). All routes are file-based:

| Route | File | Description |
|-------|------|-------------|
| `/` | `src/app/page.tsx` | Homepage with hero section and social links |
| `/about` | `src/app/about/page.tsx` | About section with experience, education, and skills |
| `/projects` | `src/app/projects/page.tsx` | Projects showcase with filtering and search |
| `/contact` | `src/app/contact/page.tsx` | Contact form with EmailJS integration |
| `/tinyreminder-demo` | `src/app/tinyreminder-demo/page.tsx` | Project demo page |
| `404` | `src/app/not-found.tsx` | Custom 404 error page with animations |

### Special Files

- **`src/app/layout.tsx`** - Root layout with Metadata API, theme initializer script, and GA4
- **`src/app/client-layout.tsx`** - Client component with ErrorBoundary, Navbar, Footer
- **`src/app/globals.css`** - Global styles (Tailwind directives + custom CSS)

---

## Styling Approach

### Tailwind CSS + Custom CSS

**Framework**: Tailwind CSS 3.4.1 with utility-first approach

**Key Configuration** (`tailwind.config.ts`):
- Dark mode: `class` strategy (toggle with `dark` class on `<html>`)
- Custom colors: `glassWhite`, `neonGreen`, `neonBlue`
- Custom animations: `gradient-x` (8s smooth gradient shift)
- Custom shadows: `neon` glow effect
- Backdrop blur: Extended with `xs` (2px)

**Global CSS** (`src/app/globals.css`):
- CSS custom properties (variables) for light/dark themes
- Custom animations:
  - `blob` - Morphing blob animation (8s)
  - `float` - Floating motion (3s)
  - `pulse-glow` - Scaling glow effect (2s)
  - `gradient-shift` - Background gradient animation (4s)
  - `slide-in` - Entrance animation
  - `fade-in` - Opacity transition
  - `loading` - Skeleton loading animation
  - `slide-in` / `fade-in` - Entrance animations

- Utility classes:
  - `.glass` / `.glass-strong` - Glassmorphism with backdrop blur
  - `.gradient-text` / `.gradient-text-animated` - Text gradients
  - `.neon-glow` / `.neon-box` - Neon effects
  - `.hover-lift` / `.hover-glow` - Hover interactions
  - `.animate-blob`, `.animate-float`, `.animate-pulse-glow`, `.animate-gradient`
  - `.animation-delay-1000/2000/3000` - Stagger animations
  - `.skeleton` - Loading skeleton animation
  - `.scroll-animate` / `.scroll-animate.in-view` - Scroll-triggered animations

**Dark Mode Implementation**:
- CSS custom properties for light and dark themes
- Dual strategy: `:root` with `@media (prefers-color-scheme: dark)` + `.dark` class selector
- Theme toggle controlled by `useTheme` hook
- Class applied to `<html>` element

**Key Colors** (Light Theme):
- Background: `#ffffff`
- Foreground: `#171717`
- Accent Purple: `#8b5cf6`
- Accent Blue: `#3b82f6`
- Accent Pink: `#ec4899`

**Key Colors** (Dark Theme):
- Background: `#0f172a`
- Foreground: `#f1f5f9`

---

## Component Organization

### Layout Components (`src/components/layout/`)

**Navbar.tsx** (Client Component)
- Sticky navigation bar with responsive design
- Links: Home, About, Projects, Contact
- Theme toggle button (Sun/Moon icons from Heroicons)
- Mobile menu with hamburger icon
- Active link highlighting with purple accent
- Glass morphism with backdrop blur
- Uses `usePathname()` for active route detection
- Uses custom `useTheme` hook for dark mode

**Footer.tsx**
- Footer with social links and contact info
- Responsive layout
- Links to GitHub and LinkedIn

**Layout.tsx** (Client Component)
- Wraps children with ErrorBoundary
- Flex layout: Navbar > main (flex-grow) > Footer
- Initializes performance monitoring on mount

### Home Components (`src/components/home/`)

**Home.tsx**
- Hero section with animated gradient background blobs
- Title: "Niv Buskila - Full Stack Developer"
- Subheading with professional description
- CTA buttons: "View My Work" → `/projects`, "Let's Connect" → `/contact`
- Social preview modal trigger
- Animated blob backgrounds with Framer Motion
- Responsive typography and spacing

**SocialPreviewModal.tsx** (Client Component)
- Modal displaying GitHub and LinkedIn profiles
- GitHub: Shows avatar, bio, followers, repos count
- LinkedIn: Shows headline, connections, profile link
- Fetches profile data from APIs (if implemented)
- Close button and overlay

### About Components (`src/components/about/`)

**About.tsx**
- Experience section (Job title, company, duration, description)
- Education section (Degree, school, duration)
- Uses data from `personalInfo.ts`
- Animated entrance with Framer Motion
- Responsive grid layout

**SkillsVisualization.tsx**
- Skills organized by category (Frontend, Backend, Mobile, AI, etc.)
- Animated progress bars or skill tags
- Visual representation of proficiency
- Uses data from `personalInfo.ts` skills object
- Responsive grid layout

### Projects Components (`src/components/projects/`)

**Projects.tsx**
- Project listing with filtering and search
- Filter categories: All, Frontend, Backend, Mobile, AI/ML
- Search input for project titles and technologies
- Uses `useMemo` for optimized filtering
- Displays filtered projects via map
- Animated entrance and exits with AnimatePresence

**ProjectCard.tsx**
- Card component for individual projects
- Displays: Project title, description, tech tags, image
- Links: GitHub repo link, demo link (if available)
- Hover effects with lift animation
- Responsive layout

### Contact Components (`src/components/contact/`)

**Contact.tsx** (Client Component)
- Contact form with three fields: Name, Email, Message
- Form validation using Formik + Yup schema:
  - Name: 2-50 characters
  - Email: Valid email format
  - Message: 10-1000 characters
- Integrates with EmailJS service
- Success/error notifications with animations
- Loading state with spinning animation
- Real-time character counter for message field
- Fallback email contact information
- Error details displayed in development mode
- Analytics tracking on form submit
- Animated form fields with staggered entrance

### Common Components (`src/components/common/`)

**ErrorBoundary.tsx** (Class Component)
- React error boundary for catching JavaScript errors
- Default error UI with emoji animation
- Shows error stack in development mode
- Buttons: "Try Again" (reset error), "Go Home" (navigate to home)
- Contact fallback with email link
- Customizable fallback component via props
- Uses Framer Motion for animations

**LoadingSpinner.tsx**
- Spinning loader component
- Used for async operations
- Animated with Framer Motion

### Animation Components (`src/components/animations/`)

**FadeIn.tsx** (Reusable Client Component)
- Generic fade-in animation wrapper
- Props:
  - `children`: React node to animate
  - `delay`: Animation delay in seconds (default: 0)
  - `direction`: Direction of entrance ('up', 'down', 'left', 'right')
  - `duration`: Animation duration in seconds (default: 0.5)
  - `className`: Custom CSS classes
- Smooth easing curve: `[0.4, 0, 0.2, 1]` (custom cubic-bezier)
- Used throughout components for consistent animations

---

## Data Management

### `src/data/projects.ts`

Exports array of project objects with TypeScript interface:

```typescript
interface Project {
  title: string;           // Project name
  description: string;     // Full description
  tech: string[];         // Technology tags
  image: string;          // Image path (public/images/)
  github: string;         // GitHub repository URL
  demo?: string;          // Optional demo URL
}
```

Current projects include:
- Afeka ChatBot (RAG, LangChain, Gemini API)
- Face Recognition API (Flask, AWS Rekognition)
- Face Recognition SDK (Android, ML Kit)
- TinyReminder (Android, Firebase, Maps API)
- Personal Portfolio (Next.js, Tailwind)
- AI Trip Advisor (Node.js, React, Maps API)
- Space Travel Manager (C, CLI)

### `src/data/personalInfo.ts`

Comprehensive personal data structure with interfaces:
- **Name, Title, Email, Phone, About**
- **Social Links**: GitHub, LinkedIn URLs
- **Skills** (8 categories):
  - Languages, Frontend, Backend, Frameworks
  - Databases, Cloud, Mobile, AI/ML, Tools
- **Experience**: Array of job experiences with descriptions
- **Education**: Array of degrees with school and duration

Used across components for dynamic content rendering.

---

## Custom Hooks

### `src/hooks/useTheme.ts`

Custom React hook for dark mode management:

```typescript
const { theme, toggleTheme, mounted } = useTheme();
```

**Features**:
- Returns `theme` ('light' | 'dark')
- `toggleTheme()` function to toggle between modes
- `mounted` flag to prevent hydration mismatch
- Persists preference to localStorage
- Checks system preference via `window.matchMedia('(prefers-color-scheme: dark)')`
- Graceful fallback if localStorage unavailable (private browsing)
- Applies/removes `dark` class on `<html>` element
- Error handling for localStorage access issues
- Development logging for troubleshooting

**Usage**:
- Applied in Navbar for theme toggle button
- Used to conditionally render Sun/Moon icons
- Respects `mounted` to prevent hydration errors

---

## Performance & Optimization

### `src/lib/performance.ts`

Web Vitals monitoring and performance analysis:

**Key Functions**:

1. **`reportWebVitals(metric)`**
   - Sends metrics to Google Analytics via `window.gtag`
   - Logs metrics in development mode
   - Provides performance rating (good/needs-improvement/poor)

2. **`initPerformanceObserver()`**
   - Sets up PerformanceObserver for real-time metrics
   - Monitors:
     - LCP (Largest Contentful Paint)
     - FID (First Input Delay)
     - CLS (Cumulative Layout Shift)
   - Returns cleanup function to disconnect observers
   - Gracefully handles unsupported browsers

**Performance Thresholds**:
- **FCP**: good ≤ 1800ms, poor > 3000ms
- **LCP**: good ≤ 2500ms, poor > 4000ms
- **FID**: good ≤ 100ms, poor > 300ms
- **CLS**: good ≤ 0.1, poor > 0.25
- **TTFB**: good ≤ 800ms, poor > 1800ms

**Optimization Settings** (`next.config.ts`):
- Image formats: WebP and AVIF (automatic fallback to original)
- Minimum cache TTL: 60 seconds
- Device sizes: 640, 750, 828, 1080, 1200, 1920px
- Image sizes: 16, 32, 48, 64, 96, 128, 256, 384px
- Compression: Enabled
- React Strict Mode: Enabled
- Package imports optimization for @heroicons/react

---

## Configuration Files

### `tsconfig.json`

- **Target**: ES2020
- **Module**: ESNext
- **Strict Mode**: Enabled (`strict: true`)
- **JSX**: preserve (Next.js handles JSX)
- **Path Aliases**: `@/*` → `src/*`
- **Isolated Modules**: Enabled
- **Skip Library Check**: Enabled

### `tailwind.config.ts`

- **Dark Mode**: Class-based (`darkMode: 'class'`)
- **Content**: src/pages/**, src/components/**, src/app/**
- **Custom Theme**:
  - Colors: `glassWhite`, `neonGreen`, `neonBlue`
  - Backdrop blur: `xs` variant (2px)
  - Box shadow: `neon` glow effect
  - Keyframes: `gradient-x` animation
  - Animation: `gradient-x` (8s ease infinite)

### `next.config.ts`

Key features:
- **Image Optimization**:
  - Formats: WebP, AVIF (with fallback)
  - Device sizes and responsive image sizes
  - Remote patterns: via.placeholder.com, avatars.githubusercontent.com
  - Minimum cache: 60 seconds

- **Security Headers** (applies to all routes):
  - `X-Content-Type-Options: nosniff` - Prevent MIME sniffing
  - `X-Frame-Options: DENY` - Prevent clickjacking
  - `X-XSS-Protection: 1; mode=block` - Enable browser XSS filter
  - `Referrer-Policy: strict-origin-when-cross-origin` - Control referrer data
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()` - Disable unnecessary permissions
  - `X-DNS-Prefetch-Control: on` - Enable DNS prefetching
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains` - Force HTTPS

- **React Strict Mode**: Enabled
- **Bundle Analyzer**: Enabled via `ANALYZE=true` environment variable
- **ESLint**: Not ignored during builds
- **TypeScript**: Not ignored during builds

### `.eslintrc.json`

- Extends: `next/core-web-vitals`
- Custom rules:
  - `react/no-unescaped-entities: off` - Allow special characters in JSX
  - `@typescript-eslint/no-unused-vars` - Allow underscore-prefixed unused variables

### `.prettierrc`

- Semi-colons: Enabled
- Trailing commas: ES5 style
- Single quotes: Enabled
- Tab width: 2 spaces
- No tabs (spaces only)

### `postcss.config.mjs`

- Plugin: `tailwindcss` (for processing Tailwind directives)

---

## Build & Development Workflows

### Package.json Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `next dev` | Start development server (port 3000) |
| `build` | `next build` | Create production build |
| `start` | `next start` | Start production server locally |
| `lint` | `next lint` | Run ESLint on codebase |
| `format` | `prettier --write .` | Format code with Prettier |
| `analyze` | `ANALYZE=true npm run build` | Build with bundle size analysis |

### Development Workflow

1. **Setup**:
   ```bash
   npm install
   cp .env.example .env.local
   # Fill in environment variables (Google Analytics, EmailJS)
   ```

2. **Development**:
   ```bash
   npm run dev
   # Opens http://localhost:3000
   ```

3. **Code Quality**:
   ```bash
   npm run lint    # Check code issues
   npm run format  # Auto-format code
   ```

4. **Build & Test**:
   ```bash
   npm run build   # Production build
   npm run start   # Run production build locally
   npm run analyze # Analyze bundle size
   ```

### Environment Variables (`.env.local`)

- `NEXT_PUBLIC_GA_ID` - Google Analytics 4 Measurement ID
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID` - EmailJS service ID
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` - EmailJS template ID
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` - EmailJS public key

⚠️ **Security**: Never commit `.env.local`. Use `.env.example` as template.

---

## Features & Functionality

### Dark Mode
- Reads system preference via `prefers-color-scheme` media query
- Persists user choice to localStorage
- Manual toggle via Navbar button (Sun/Moon icons)
- Smooth transitions between themes (300ms)
- Works across all pages and components

### Form Validation
**Contact Form**:
- Real-time validation with Formik
- Yup schema validation
- Field validation:
  - Name: 2-50 characters (required)
  - Email: Valid format (required)
  - Message: 10-1000 characters (required)
- Error messages displayed inline
- Character counter for message field
- Disabled submit button if invalid

### Email Integration
- **Service**: EmailJS (free email service)
- **Configuration**: Via environment variables
- **Error Handling**: Graceful fallback to manual contact information
- **Success/Error Notifications**: Animated toast-like messages
- **Analytics**: Track form submissions (success/error) to Google Analytics

### Project Filtering & Search
- **Filter Categories**: All, Frontend, Backend, Mobile, AI/ML
- **Search**: Case-insensitive across project names, descriptions, and technologies
- **Filtering Logic**: useMemo for optimized re-renders
- **Tech Detection**: Matches technologies in `project.tech` array

### Animations
- **Entrance**: Fade-in animations with staggered delays
- **Hover Effects**: Lift animation (translateY -5px), scale up, glow
- **Animated Backgrounds**: Blob animations on hero sections
- **Loading States**: Spinning animation on submit button
- **Transitions**: 300-500ms smooth easing
- **Respects Motion Preferences**: `prefers-reduced-motion` media query

### SEO Optimization
- **Metadata API**: Title, description, keywords, authors, creator
- **Structured Data**: JSON-LD Person schema in root layout
- **Open Graph**: og:title, og:description, og:image, og:url, og:type
- **Twitter Cards**: Card type "summary_large_image" with image
- **Canonical URL**: Set to main domain
- **Robots Meta**: index: true, follow: true with additional GoogleBot rules
- **Icons**: favicon.ico, favicon.svg, apple-touch-icon

---

## Testing

**Current Status**: No unit or integration tests configured

### Recommended Setup (for future implementation)

- **Framework**: Jest + React Testing Library
- **E2E Testing**: Playwright or Cypress
- **Coverage Target**: 80%+

---

## Recent Commits & Development History

Latest commits (from `git log`):
1. **899fe2e** - fix: clean up whitespace in NotFound and useTheme components
2. **2fdcd4e** - feat: implement custom 404 Not Found page with animations
3. **38d4c29** - fix: clean up whitespace in SocialPreviewModal component
4. **012410b** - feat: add SocialPreviewModal for GitHub/LinkedIn preview
5. **cd81912** - fix: improve text formatting in Home component

---

## Security Measures

### Headers (configured in `next.config.ts`)
✅ Content-Type protection  
✅ Clickjacking prevention  
✅ XSS protection  
✅ Referrer policy  
✅ Permissions policy  
✅ HSTS enforcement  

### Input Validation
✅ Formik + Yup validation on contact form  
✅ Email sanitization  
✅ Error messages don't expose sensitive info  

### Environment Variables
✅ All secrets in `.env.local` (not committed)  
✅ `NEXT_PUBLIC_*` only used for non-sensitive data  
✅ `.env.example` provided as template  

### Dependencies
✅ No hardcoded API keys  
✅ Regular `npm audit` recommended  
✅ Up-to-date packages

---

## Deployment

### Vercel
The project is designed for Vercel deployment:
1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Auto-deploy on push to main branch
4. Automatic HTTPS and security headers

### Local Production Build
```bash
npm run build      # Create .next directory
npm run start      # Serve production build locally
```

---

## Common Tasks & Patterns

### Adding a New Page
1. Create `src/app/[route]/page.tsx`
2. Import/export component
3. Page automatically routes to `/[route]`

### Adding a Project
1. Edit `src/data/projects.ts`
2. Add new object to `projects` array
3. Include: title, description, tech[], image, github, demo?

### Updating Personal Info
1. Edit `src/data/personalInfo.ts`
2. Update: experience[], education[], skills
3. Changes reflect across About, Home, Contact pages

### Adding Animation
1. Import `motion` from `framer-motion`
2. Wrap element with `<motion.div>`
3. Use `initial`, `animate`, `transition` props
4. Or use `<FadeIn>` wrapper component for consistency

### Styling New Component
1. Use Tailwind utility classes (primary method)
2. For custom animations, add to `src/app/globals.css`
3. For component-specific styles, use inline `className` (preferred in Next.js)
4. Support dark mode via `dark:` prefix

### Theme Toggle
```typescript
const { theme, toggleTheme, mounted } = useTheme();
if (!mounted) return null; // Prevent hydration mismatch
return (
  <button onClick={toggleTheme}>
    {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
  </button>
);
```

---

## Troubleshooting

### Hydration Mismatch Error
- Caused by server-side HTML vs client-side React mismatch
- **Solution**: Use `mounted` flag from `useTheme` or similar
- Prevents rendering until client-side is ready

### Dark Mode Not Persisting
- Check localStorage is enabled in browser
- Theme initializer script in `layout.tsx` runs before React hydration
- Verify `useTheme` hook implementation

### Performance Issues
- Check bundle size: `npm run analyze`
- Review Web Vitals in Google Analytics
- Use `<Image>` component instead of `<img>`
- Lazy load components with `dynamic()` from Next.js

### Email Form Not Sending
- Verify EmailJS environment variables are set
- Check EmailJS dashboard for quota/rate limits
- Review browser console for error messages
- Test in development mode for more detailed errors

---

## File Size & Performance Metrics

**Target Scores** (Achieved):
- PageSpeed Insights: 100% (Performance, SEO, Best Practices)
- Lighthouse: All green
- Bundle Size: Optimized with tree-shaking and code splitting

---

## Dependencies at a Glance

| Package | Version | Purpose |
|---------|---------|---------|
| next | 15.5.4 | React framework |
| react | 19.0.0 | UI library |
| typescript | 5 | Type safety |
| tailwindcss | 3.4.1 | Styling |
| framer-motion | 11.16.1 | Animations |
| formik | 2.4.6 | Form management |
| yup | 1.6.1 | Validation |
| @emailjs/browser | 4.4.1 | Email service |
| @heroicons/react | 2.2.0 | Icons |
| react-intersection-observer | 9.14.1 | Scroll detection |
| next-seo | 6.6.0 | SEO optimization |

---

## Contributing & Best Practices

- **Code Style**: ESLint + Prettier enforced
- **Component Pattern**: Functional components with hooks
- **Naming**: PascalCase for components, camelCase for variables/functions
- **Imports**: Use `@/` alias for imports from `src/`
- **Comments**: JSDoc style for functions, inline for complex logic
- **Accessibility**: ARIA labels, semantic HTML, focus management
- **Performance**: Memoization for expensive computations, lazy loading

---

## Quick Reference

**Entry Point**: `src/app/layout.tsx` (root layout)  
**Main Component**: `src/app/client-layout.tsx` (wraps all routes)  
**Styles**: `src/app/globals.css` + Tailwind utilities  
**Data**: `src/data/` (projects, personalInfo)  
**Hooks**: `src/hooks/` (useTheme)  
**Utils**: `src/lib/` (performance monitoring)  

---

*Last Updated: November 17, 2024*
*Portfolio Version: 0.1.0*
*Next.js Version: 15.5.4*
*React Version: 19.0.0*
