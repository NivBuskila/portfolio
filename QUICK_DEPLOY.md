# 🚀 Quick Deploy Reference

## Current Status
- ✅ Branch: `claude/code-review-improvements-012r8mB3nMfr5GKiseZ2Wx63`
- ✅ All code pushed to GitHub
- ✅ Production build tested
- ✅ 25/25 tests passing

---

## Option 1: Deploy from Current Branch (Fastest)

### Steps:
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Select `NivBuskila/portfolio`
5. In "Production Branch" field, enter:
   ```
   claude/code-review-improvements-012r8mB3nMfr5GKiseZ2Wx63
   ```
6. Add Environment Variables (see below)
7. Click "Deploy"

### Environment Variables:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxx
```

### Add Custom Domain:
After deployment:
1. Go to Settings → Domains
2. Add: `nivbuskila.tech`
3. Add DNS records at your domain provider:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com

---

## Option 2: Deploy from Main (via PR)

### Steps:
1. Go to https://github.com/NivBuskila/portfolio
2. Click "Pull Requests" → "New Pull Request"
3. Base: main
4. Compare: `claude/code-review-improvements-012r8mB3nMfr5GKiseZ2Wx63`
5. Create & Merge PR
6. Go to Vercel and deploy from `main` branch

---

## After Deployment Checklist

- [ ] Site loads at nivbuskila.tech
- [ ] All pages work (/, /about, /projects, /contact)
- [ ] Contact form sends emails
- [ ] Dark mode toggles correctly
- [ ] PWA install prompt appears on mobile
- [ ] Google Analytics tracking works

---

## Troubleshooting

### Build fails in Vercel
- Check environment variables are set
- Review build logs for errors
- Verify Node.js version (18+)

### Domain not working
- Wait 24-48 hours for DNS propagation
- Verify DNS records are correct
- Check domain registrar settings

### Contact form not working
- Verify EmailJS environment variables
- Check EmailJS dashboard for errors
- Test with your email address first

---

## Support

If you need help:
1. Check Vercel deployment logs
2. Review [DEPLOYMENT.md](DEPLOYMENT.md)
3. Check [.github/README.md](.github/README.md) for CI/CD info

---

**Ready to go live!** Choose your option and deploy! 🎉
