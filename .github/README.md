# GitHub Actions Workflows

## 📋 Overview

This project uses 3 GitHub Actions workflows for CI/CD:

### 1. **CI - Tests and Linting** (`ci.yml`)
**Runs on:** Every push to any branch + Pull Requests to main

**What it does:**
- ✅ Runs ESLint
- ✅ Runs all tests (25 tests)
- ✅ Builds the project
- ✅ Tests on Node.js 18 and 20

**Purpose:** Ensures code quality before merging

---

### 2. **Deploy Preview** (`deploy-preview.yml`)
**Runs on:** Pull Requests to main

**What it does:**
- 📝 Posts a comment on the PR
- 🔗 Provides preview deployment info
- ⏳ Tells you when preview is ready

**Purpose:** Review changes before merging to production

---

### 3. **Production Deployment** (`production-deploy.yml`)
**Runs on:** Push to `main` branch ONLY

**What it does:**
- ✅ Runs all tests
- ✅ Runs linter
- ✅ Builds for production
- 🚀 Notifies successful build
- 🏷️ Creates deployment tag

**Purpose:** Deploy to production (nivbuskila.tech)

---

## 🎯 How it works

### When you work on a feature branch:
```bash
git checkout -b feature/new-feature
# Make changes...
git push origin feature/new-feature
```
→ **CI runs** ✓ Tests + Lint + Build
→ **No deployment** (safe to experiment)

### When you create a Pull Request:
```bash
gh pr create --base main
```
→ **CI runs** ✓ Tests + Lint + Build
→ **Preview deployment** 🔗 Temporary preview URL
→ **PR comment** 📝 Deployment info

### When you merge to main:
```bash
git checkout main
git merge feature/new-feature
git push origin main
```
→ **Production deployment** 🚀 Live at nivbuskila.tech

---

## 🔧 Configuration

### Vercel Integration (Recommended)

The workflows work alongside Vercel's built-in deployment:

1. **GitHub Actions** → Runs tests/linting
2. **Vercel** → Handles actual deployment

**Setup:**
1. Connect repository to Vercel
2. Configure production branch: `main`
3. Enable automatic deployments
4. Vercel will deploy after GitHub Actions passes ✓

### Environment Variables

Add these in Vercel dashboard (not in GitHub Actions):
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

---

## 📊 Status Badges

Add to your main README.md:

```markdown
![CI](https://github.com/NivBuskila/portfolio/workflows/CI%20-%20Tests%20and%20Linting/badge.svg)
![Deploy](https://github.com/NivBuskila/portfolio/workflows/Production%20Deployment/badge.svg)
```

---

## 🛠️ Troubleshooting

### Workflow fails on build
- Check Node.js version (must be 18+)
- Verify all dependencies are in package.json
- Check for syntax errors

### Workflow doesn't trigger
- Verify `.github/workflows/` is in root directory
- Check branch name matches trigger condition
- Verify GitHub Actions is enabled for your repo

---

## 🎉 Summary

**Your setup:**
✅ Tests run on every branch
✅ Preview deploys for PRs
✅ Production deploys ONLY from main
✅ Safe workflow - can't accidentally deploy from feature branches

**Next steps:**
1. Push these workflows to GitHub
2. Create a PR to test preview deployment
3. Merge to main to deploy to production
