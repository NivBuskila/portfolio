# 🔐 Security Best Practices

This document outlines the security measures implemented in this portfolio website.

## Environment Variables

### Setup Instructions

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your actual values:
   - **Google Analytics**: Get your GA4 Measurement ID from https://analytics.google.com/
   - **EmailJS**: Get your credentials from https://www.emailjs.com/

3. **NEVER commit `.env.local` to git!** It's already in `.gitignore`.

### For Deployment (Vercel)

Add these environment variables in your Vercel project settings:
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

## Security Headers

The following security headers are configured in `next.config.ts`:

- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-Frame-Options**: Prevents clickjacking attacks
- **X-XSS-Protection**: Enables browser XSS protection
- **Referrer-Policy**: Controls referrer information
- **Permissions-Policy**: Blocks unnecessary browser features
- **Strict-Transport-Security**: Enforces HTTPS
- **X-DNS-Prefetch-Control**: Optimizes DNS prefetching

## Content Security

- ✅ No hardcoded API keys or secrets
- ✅ Input validation on all forms
- ✅ Email sanitization
- ✅ Error messages don't expose sensitive information
- ✅ No console.logs in production build

## Dependencies

Keep dependencies updated:
```bash
npm audit
npm audit fix
```

## Testing Security

### Local Testing
```bash
npm run build
npm run start
```

### Production Security Scan
After deploying, test your security headers:
- https://securityheaders.com/
- https://observatory.mozilla.org/

## Public Information

The following information is intentionally public:
- Email: nivbuskila@icloud.com (for professional contact)
- GitHub profile
- LinkedIn profile
- Work experience and education

This is standard for a professional portfolio website.

## Reporting Security Issues

If you find a security vulnerability, please email me directly at nivbuskila@icloud.com instead of opening a public issue.

## Regular Maintenance

- [ ] Monthly: Run `npm audit` and update dependencies
- [ ] Quarterly: Review security headers and best practices
- [ ] After each Next.js release: Update and test
