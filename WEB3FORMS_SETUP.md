# Web3Forms Security Setup Guide

## 🔒 Recommended Security Configuration

After getting your Web3Forms access key, follow these steps to secure your contact form:

## Step 1: Access Your Dashboard

1. Go to [https://web3forms.com/](https://web3forms.com/)
2. Enter your **Access Key**: `25f68b4d-e9dd-4587-a2a2-9be05c78f497`
3. Click "Access Dashboard"

## Step 2: Configure Domain Restrictions

### Why This Matters
Domain restrictions prevent unauthorized websites from using your access key to send emails.

### How to Configure
1. In the dashboard, find **"Allowed Domains"** section
2. Add these domains:
   ```
   nivbuskila.tech
   localhost
   ```
3. Click **Save**

### Result
✅ Only your portfolio and localhost can send emails
❌ Other websites using your key will be blocked

## Step 3: Email Notifications

### Configure Where Emails Go
1. Find **"Email Notifications"** section
2. Enter your email address
3. Click **Save**

### Options
- **To Email**: Where contact form submissions are sent
- **CC/BCC**: Additional recipients (optional)
- **Subject Line**: Custom subject for notifications

## Step 4: Additional Security (Optional)

### Enable reCAPTCHA (v3)
- Adds invisible bot protection
- Requires Google reCAPTCHA v3 site key
- Already have honeypot, so this is optional

### Custom Redirect
- Set a custom "Thank You" page URL
- Currently: handled by React (recommended)

### Webhook Integration
- Send form data to external services
- Useful for CRM integration

## Step 5: Testing

### Test Your Form
1. Go to [http://localhost:3000/contact](http://localhost:3000/contact)
2. Fill out the form
3. Submit
4. Check your email inbox

### What to Check
- ✅ Email arrives within 1-2 minutes
- ✅ Sender name: "Your Name via Portfolio"
- ✅ Subject: "New Contact Form Message from Your Name"
- ✅ Reply-to address: User's email

## Step 6: Monitor Usage

### Dashboard Analytics
- **Total Submissions**: Track form usage
- **Spam Blocked**: See honeypot effectiveness
- **Rate Limits**: Monitor for abuse

### Free Tier Limits
- **250 submissions/month** (free plan)
- If exceeded, consider upgrading or alternative solution

## 🛡️ Security Checklist

- [ ] Domain restrictions configured
- [ ] Email notifications set to your address
- [ ] Tested form submission locally
- [ ] Tested form submission in production
- [ ] Verified spam blocking (honeypot working)
- [ ] Reviewed monthly usage limits

## 🚨 Troubleshooting

### Form Not Sending
1. Check browser console for errors
2. Verify access key in `.env.local`
3. Hard refresh browser (Ctrl+Shift+R)
4. Check Web3Forms dashboard for errors

### Emails Not Arriving
1. Check spam folder
2. Verify email address in Web3Forms dashboard
3. Check Web3Forms submission logs
4. Ensure monthly limit not exceeded

### Spam Issues
1. Honeypot field should block most bots
2. Enable reCAPTCHA if needed
3. Review submissions in Web3Forms dashboard
4. Adjust domain restrictions if unauthorized use detected

## 📊 Best Practices

### Regular Monitoring
- Check dashboard weekly for spam attempts
- Monitor submission counts
- Review blocked submissions

### Security Updates
- Keep domain list updated when deploying to new domains
- Rotate access key if compromised
- Enable email notifications for new features

### Performance
- Web3Forms has ~500-600ms latency (normal)
- Honeypot adds no noticeable delay
- Client-side sending is faster than server-side

## 🎯 Production Deployment

### Before Going Live

1. Update `.env.local` on Vercel:
   ```
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=25f68b4d-e9dd-4587-a2a2-9be05c78f497
   ```

2. Update domain restrictions:
   ```
   nivbuskila.tech
   www.nivbuskila.tech
   localhost
   ```

3. Test on production:
   - Submit test form
   - Verify email delivery
   - Check dashboard logs

## 📞 Support

- **Web3Forms Docs**: [https://docs.web3forms.com/](https://docs.web3forms.com/)
- **Support Email**: support@web3forms.com
- **GitHub Issues**: For portfolio-specific issues

---

**Last Updated**: January 22, 2025
**Access Key**: `25f68b4d-e9dd-4587-a2a2-9be05c78f497`
