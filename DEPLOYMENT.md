# 🚀 Deployment Guide - nivbuskila.tech

## ✅ Pre-Deployment Status

Your portfolio is **100% ready for production**!

### Current Status
- ✅ Production build: **Success**
- ✅ All tests: **25/25 passing**
- ✅ ESLint: **0 errors**
- ✅ Performance: **2-7ms response times**
- ✅ PWA: **Active with offline support**
- ✅ SEO: **Optimized (sitemap, robots.txt)**
- ✅ Git: **Clean working tree**

---

## 🎯 Deployment Options

### Option 1: Vercel (Recommended) ⭐

**Why Vercel?**
- Built for Next.js (created by the same team)
- Zero configuration needed
- Automatic deployments from GitHub
- Free tier is generous
- Edge network globally
- Built-in analytics

#### Steps:

1. **Push your code to GitHub:**
   ```bash
   # If you haven't pushed to a main branch yet:
   git checkout -b main
   git merge claude/code-review-improvements-012r8mB3nMfr5GKiseZ2Wx63
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/in with GitHub
   - Click "New Project"
   - Import your `NivBuskila/portfolio` repository
   - Vercel will auto-detect Next.js ✓

3. **Configure Environment Variables:**

   In Vercel dashboard → Settings → Environment Variables, add:

   ```
   NEXT_PUBLIC_GA_ID=your-google-analytics-id
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your-service-id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your-template-id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your-public-key
   ```

4. **Configure Custom Domain:**
   - Go to Settings → Domains
   - Add `nivbuskila.tech`
   - Add DNS records at your domain provider:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21

     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

5. **Deploy:**
   - Click "Deploy"
   - Wait ~2 minutes
   - Your site will be live at `nivbuskila.tech` 🎉

---

### Option 2: Netlify

#### Steps:

1. **Push to GitHub** (same as Option 1)

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

3. **Build Settings:**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

4. **Environment Variables:**
   Add the same variables as in Vercel (Settings → Environment variables)

5. **Custom Domain:**
   - Go to Domain settings
   - Add custom domain `nivbuskila.tech`
   - Follow DNS configuration instructions

---

### Option 3: Self-Hosted (VPS/Docker)

#### Prerequisites:
- VPS with Node.js 18+ (DigitalOcean, AWS, etc.)
- Domain pointing to your VPS

#### Steps:

1. **On your VPS:**
   ```bash
   # Install Node.js 18+
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Clone repository
   git clone https://github.com/NivBuskila/portfolio.git
   cd portfolio

   # Install dependencies
   npm ci

   # Build
   npm run build

   # Start with PM2 (process manager)
   npm install -g pm2
   pm2 start npm --name "portfolio" -- start
   pm2 save
   pm2 startup
   ```

2. **Setup Nginx reverse proxy:**
   ```nginx
   server {
       listen 80;
       server_name nivbuskila.tech www.nivbuskila.tech;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. **Setup SSL with Let's Encrypt:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d nivbuskila.tech -d www.nivbuskila.tech
   ```

---

## 🔧 Post-Deployment Checklist

After deployment, verify:

- [ ] Homepage loads: `https://nivbuskila.tech`
- [ ] All pages work:
  - [ ] `/about`
  - [ ] `/projects`
  - [ ] `/contact`
- [ ] PWA works:
  - [ ] `/manifest.json` loads
  - [ ] Service worker registered
  - [ ] "Install app" prompt appears on mobile
- [ ] SEO files:
  - [ ] `/robots.txt` accessible
  - [ ] `/sitemap.xml` valid XML
- [ ] Contact form:
  - [ ] EmailJS working
  - [ ] Receives emails correctly
- [ ] Analytics:
  - [ ] Google Analytics tracking
  - [ ] Events firing correctly
- [ ] Performance:
  - [ ] Run Lighthouse audit (aim for 90+ scores)
  - [ ] Check Core Web Vitals

---

## 📊 Monitoring & Analytics

### 1. Vercel Analytics (if using Vercel)
- Automatic - no setup needed
- View in Vercel dashboard

### 2. Google Analytics
Already configured with `NEXT_PUBLIC_GA_ID`

### 3. Google Search Console
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `nivbuskila.tech`
3. Verify ownership (DNS or HTML tag)
4. Submit sitemap: `https://nivbuskila.tech/sitemap.xml`

---

## 🔄 Continuous Deployment

### Automatic Deployments (Vercel/Netlify)

Once connected, every push to `main` triggers automatic deployment:

```bash
# Make changes
git add .
git commit -m "feat: update portfolio content"
git push origin main

# Vercel/Netlify automatically:
# 1. Detects push
# 2. Runs build
# 3. Deploys if successful
# 4. Sends deployment notification
```

### Preview Deployments

Every PR gets a unique preview URL:
- Vercel: `portfolio-git-branch-name.vercel.app`
- Netlify: `branch-name--portfolio.netlify.app`

---

## 🐛 Troubleshooting

### Build Fails

**Issue:** "Module not found"
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules .next
npm ci
npm run build
```

**Issue:** "Environment variable not set"
```bash
# Solution: Add missing env vars in deployment platform
# Check NEXT_PUBLIC_* variables are set
```

### Runtime Errors

**Issue:** "500 Server Error"
- Check deployment logs
- Verify environment variables
- Check Next.js server logs

### Slow Performance

**Issue:** High TTFB (Time to First Byte)
- Enable Edge Functions (Vercel)
- Enable caching headers (already configured in next.config.ts)
- Use CDN (automatic on Vercel/Netlify)

---

## 📝 Environment Variables Reference

Required for production:

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS Service | `service_xxxxxx` |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS Template | `template_xxxxxx` |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS Public Key | `xxxxxxxxxxxxxx` |

---

## 🎉 You're Ready!

Your portfolio has been optimized and tested. Choose your deployment platform and go live!

**Recommended:** Start with Vercel for the easiest deployment experience.

---

## 📞 Need Help?

If you encounter issues:
1. Check deployment platform docs (Vercel/Netlify)
2. Review deployment logs
3. Check this repository's issues
4. Review CLAUDE.md for technical details

Good luck with your deployment! 🚀
