# 📊 Analytics Dashboard - Documentation

## Overview

The Analytics Dashboard provides a visual interface to monitor portfolio performance metrics, including Web Vitals, traffic statistics, and user behavior.

**Access**: `/analytics`
**Demo Password**: `demo123`

---

## ⚠️ Security Status

### 🔴 **Current State: NOT PRODUCTION-READY**

This implementation is a **prototype/demo** with **client-side authentication only**.

#### What's NOT Secure:

1. **Password Check is Client-Side**
   - File: `src/components/analytics/AnalyticsDashboard.tsx:52`
   - Anyone can bypass by opening DevTools and setting `isAuthenticated = true`
   - Password stored in environment variable `NEXT_PUBLIC_*` is visible to all clients

2. **No Session Management**
   - No JWT tokens
   - No server-side validation
   - No expiration

3. **No Rate Limiting**
   - Unlimited login attempts
   - No brute-force protection

4. **Data Exposure**
   - All data visible in component state
   - No API authentication

---

## 📈 Data Sources

### ✅ Real Data

#### **Web Vitals** (Automatic)
- **Source**: `src/lib/performance.ts`
- **Storage**: `localStorage` key: `web-vitals-metrics`
- **Metrics Tracked**:
  - LCP (Largest Contentful Paint)
  - FID (First Input Delay)
  - CLS (Cumulative Layout Shift)
  - TTFB (Time to First Byte)
  - FCP (First Contentful Paint)

**How it works**:
1. User visits any page
2. Browser Performance API captures metrics
3. `reportWebVitals()` saves to localStorage (max 50 entries)
4. Dashboard reads from localStorage when authenticated

**File**: `src/lib/performance.ts:20-48`

### ❌ Mock Data (Hard-Coded)

#### **Traffic Statistics**
- Page Views: **Hard-coded** (1,243)
- Unique Visitors: **Hard-coded** (not tracked)
- Session Duration: **Hard-coded** ("2m 34s")

**File**: `src/components/analytics/AnalyticsDashboard.tsx:248-256`

#### **Top Pages**
- Home: 1,243 views
- Projects: 891 views
- About: 657 views
- Contact: 423 views

**File**: `src/components/analytics/AnalyticsDashboard.tsx:282-289`

---

## 🔧 How to Improve for Production

### Option 1: Simple Analytics (Recommended for Portfolio)

Use a third-party service (no backend needed):

#### **A. Google Analytics 4**
Already integrated! Check your GA4 dashboard at:
- https://analytics.google.com

**Benefits**:
- Free
- Real traffic data
- No backend needed
- Privacy-friendly options

#### **B. Vercel Analytics** (Recommended)
If deployed on Vercel:

```bash
npm install @vercel/analytics
```

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Benefits**:
- Automatic Web Vitals tracking
- Real-time data
- Privacy-compliant
- Beautiful dashboard

#### **C. Plausible / Umami / Fathom**
Privacy-focused alternatives:
- **Plausible**: $9/month, GDPR compliant
- **Umami**: Self-hosted, free
- **Fathom**: $14/month, privacy-first

---

### Option 2: Custom Analytics with Backend

For full control and real-time data:

#### **1. Add API Routes for Authentication**

Create: `src/app/api/analytics/auth/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.ANALYTICS_SECRET);

export async function POST(request: Request) {
  const { password } = await request.json();

  // Check password (use bcrypt in production)
  if (password !== process.env.ANALYTICS_PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  // Create JWT token
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(SECRET);

  const response = NextResponse.json({ success: true });
  response.cookies.set('analytics-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 86400, // 24 hours
  });

  return response;
}

export async function GET(request: Request) {
  const token = request.cookies.get('analytics-token')?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    await jwtVerify(token, SECRET);
    return NextResponse.json({ authenticated: true });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
```

#### **2. Add API Routes for Data**

Create: `src/app/api/analytics/metrics/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.ANALYTICS_SECRET);

async function isAuthenticated(request: Request) {
  const token = request.cookies.get('analytics-token')?.value;
  if (!token) return false;

  try {
    await jwtVerify(token, SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Fetch real data from database
  // This is where you'd connect to PostgreSQL/MongoDB/Supabase
  const metrics = {
    pageViews: 1243, // Replace with real query
    uniqueVisitors: 891,
    topPages: [
      { page: 'Home', views: 1243 },
      // ... fetch from database
    ],
  };

  return NextResponse.json(metrics);
}
```

#### **3. Add Database**

**Option A: Supabase (Recommended)**
```bash
npm install @supabase/supabase-js
```

**Option B: Prisma + PostgreSQL**
```bash
npm install prisma @prisma/client
npx prisma init
```

Create table:
```sql
CREATE TABLE analytics_events (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  page_path VARCHAR(255) NOT NULL,
  user_id VARCHAR(255),
  timestamp TIMESTAMP DEFAULT NOW(),
  metadata JSONB
);

CREATE INDEX idx_timestamp ON analytics_events(timestamp);
CREATE INDEX idx_page_path ON analytics_events(page_path);
```

#### **4. Track Page Views**

Create: `src/hooks/usePageTracking.ts`

```typescript
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function usePageTracking() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'page_view',
        path: pathname,
        timestamp: Date.now(),
      }),
    }).catch(console.error);
  }, [pathname]);
}
```

Use in `app/client-layout.tsx`:
```tsx
'use client';
import { usePageTracking } from '@/hooks/usePageTracking';

export default function ClientLayout({ children }) {
  usePageTracking(); // Track all page views

  return <>{children}</>;
}
```

#### **5. Add Rate Limiting**

```bash
npm install @upstash/ratelimit @upstash/redis
```

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '10 m'), // 5 attempts per 10 minutes
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again later.' },
      { status: 429 }
    );
  }

  // ... rest of login logic
}
```

---

## 🎯 Quick Start Guide

### For Development (Current Setup)

1. **Start the dev server**:
   ```bash
   npm run dev
   ```

2. **Visit the dashboard**:
   - Navigate to `http://localhost:3000/analytics`
   - Enter password: `demo123`

3. **View Web Vitals**:
   - Browse the site normally
   - Metrics will populate in localStorage
   - Refresh dashboard to see updated data

### For Production (with Real Analytics)

**Easiest**: Use Vercel Analytics

1. Deploy to Vercel
2. Enable Analytics in dashboard
3. Install package: `npm install @vercel/analytics`
4. Add `<Analytics />` to layout
5. View data at vercel.com/analytics

**Total time**: 5 minutes ⚡

---

## 📊 Environment Variables

### Required for Current Demo

```env
# .env.local
NEXT_PUBLIC_ANALYTICS_PASSWORD=demo123  # ⚠️ NOT secure (client-side)
```

### Required for Production

```env
# Server-side only (NOT NEXT_PUBLIC_*)
ANALYTICS_SECRET=your-super-secret-key-min-32-chars
ANALYTICS_PASSWORD=your-hashed-password

# Database (choose one)
DATABASE_URL=postgresql://...
# OR
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

---

## 🔐 Security Checklist for Production

- [ ] Move password check to server-side API route
- [ ] Use JWT tokens for session management
- [ ] Implement rate limiting (5 attempts per 10 min)
- [ ] Hash passwords with bcrypt/argon2
- [ ] Use httpOnly cookies for tokens
- [ ] Add CSRF protection
- [ ] Implement 2FA (optional but recommended)
- [ ] Use environment variables without `NEXT_PUBLIC_*` prefix
- [ ] Add IP-based rate limiting
- [ ] Log all authentication attempts
- [ ] Add session timeout (24 hours)
- [ ] Implement logout functionality
- [ ] Use HTTPS only
- [ ] Add security headers (already done ✅)

---

## 📝 Files to Review

| File | Purpose | Security Level |
|------|---------|----------------|
| `src/components/analytics/AnalyticsDashboard.tsx` | Main dashboard UI | 🔴 Client-side auth |
| `src/app/analytics/page.tsx` | Route configuration | ✅ Metadata OK |
| `src/lib/performance.ts` | Web Vitals tracking | ✅ Safe |
| `.env.local` | Environment variables | 🔴 NEXT_PUBLIC_ exposed |

---

## 🚀 Recommended Next Steps

### Immediate (for demo purposes):
1. ✅ Web Vitals tracking works
2. ✅ Dashboard UI complete
3. ⚠️ Acknowledge security limitations

### Short-term (for production):
1. **Option A**: Use Vercel Analytics (5 min setup)
2. **Option B**: Use Google Analytics (already integrated)
3. **Option C**: Use Plausible/Umami (privacy-focused)

### Long-term (if you need custom analytics):
1. Implement server-side authentication
2. Add database for real traffic tracking
3. Create API routes for data fetching
4. Add rate limiting
5. Implement proper session management

---

## 💡 Tips

- **For portfolio purposes**: The current demo with Web Vitals is fine. Add a note in interviews: "This is a demo with client-side auth for showcase purposes. In production, I would use [Vercel Analytics / proper JWT auth]."

- **For learning**: Implementing proper auth is a great portfolio project itself! Consider building it as a separate "Analytics Platform" project.

- **For privacy**: Consider using privacy-focused analytics (Plausible, Fathom) to respect user privacy and comply with GDPR.

---

## 🆘 Troubleshooting

### No Web Vitals Data?
1. Browse the site normally (home, about, projects)
2. Open DevTools → Application → Local Storage
3. Check for `web-vitals-metrics` key
4. If empty, check Console for errors

### Dashboard shows old data?
- Clear localStorage: `localStorage.clear()`
- Or delete specific key: `localStorage.removeItem('web-vitals-metrics')`

### Can't login?
- Default password: `demo123`
- Or set: `NEXT_PUBLIC_ANALYTICS_PASSWORD` in `.env.local`
- Remember: This is NOT secure for production!

---

**Created**: January 2025
**Author**: Niv Buskila
**Status**: Demo/Prototype (Not Production-Ready)
**License**: MIT
