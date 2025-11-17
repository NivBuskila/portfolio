# Portfolio Website

![CI](https://github.com/NivBuskila/portfolio/workflows/CI%20-%20Tests%20and%20Linting/badge.svg)
![Production Deploy](https://github.com/NivBuskila/portfolio/workflows/Production%20Deployment/badge.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tests](https://img.shields.io/badge/tests-25%20passing-brightgreen)

My personal portfolio website built with Next.js 15, React 19, and TypeScript. I wanted something that actually looks good and works well, so I built it from scratch with modern tools and proper engineering practices.

## 🎯 Live Site

**Production**: [nivbuskila.tech](https://nivbuskila.tech)

## Features

**Dark mode that actually works** - Respects system preferences and remembers your choice. The toggle is smooth and everything adapts properly.

**Project filtering and search** - Filter by technology, search by name, or browse by category. Much better than scrolling through an endless list.

**Proper contact form** - Built with Formik and Yup validation. Handles errors gracefully and gives real feedback. Uses Formspree for the backend.

**Animated skill bars** - Shows technical skills with animated progress bars. Much better than boring bullet points.

**Performance optimized** - Image optimization, lazy loading, proper caching headers. PWA support with offline capabilities. Loads fast and stays fast.

**Error boundaries** - When things break, users see a helpful error page instead of a white screen.

**Comprehensive testing** - 25 tests covering critical components with Jest and React Testing Library.

**CI/CD Pipeline** - Automated testing and deployment with GitHub Actions. Safe deployments from main branch only.

## Tech stack

**Frontend**: Next.js 15 with the new App Router, React 19, TypeScript
**Styling**: Tailwind CSS with custom animations
**Forms**: Formik + Yup validation
**Email**: EmailJS integration
**Animations**: Framer Motion
**Icons**: Heroicons
**Testing**: Jest + React Testing Library (25 tests)
**PWA**: next-pwa with service workers
**Analytics**: Google Analytics
**CI/CD**: GitHub Actions
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
npm run dev            # Development server
npm run build          # Production build
npm run start          # Run production build locally
npm run lint           # Check for code issues
npm run format         # Format code with Prettier
npm test               # Run tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Generate coverage report
npm run analyze        # Analyze bundle size
```

## Development

### Quick Start
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test
```

### Testing
```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

**Quick deploy:**
```bash
# Run automated deployment checks
./deploy.sh

# Or manually:
git checkout main
git merge your-branch
git push origin main  # Triggers GitHub Actions + Vercel deployment
```

## CI/CD Pipeline

This project uses GitHub Actions for automated testing and deployment:

- **CI Workflow**: Runs tests and linting on all branches
- **Preview Deployments**: Automatic preview URLs for pull requests
- **Production Deployment**: Deploys to nivbuskila.tech on push to main

See [.github/README.md](.github/README.md) for workflow details.

## Documentation

- **[CLAUDE.md](CLAUDE.md)** - Complete technical documentation
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment guide
- **[.github/README.md](.github/README.md)** - CI/CD workflows

## Performance

- **Build time**: ~12 seconds
- **Response times**: 2-7ms
- **Bundle size**: 102KB shared + page-specific
- **Tests**: 25/25 passing
- **PWA**: ✓ Offline support enabled

## Contact

Niv Buskila - nivbuskila@icloud.com
GitHub: [@NivBuskila](https://github.com/NivBuskila)
LinkedIn: [nivbuskila](https://linkedin.com/in/nivbuskila)
