# Monitoring & Analytics Setup Guide

This document explains how to set up error monitoring, analytics, and alerting for the wedding website.

## Overview

The website uses two monitoring solutions:
- **Sentry** - Error tracking, performance monitoring, and alerting
- **Cloudflare Web Analytics** - Privacy-focused visitor tracking (page views, unique visitors)

## 1. Sentry Setup (Error Monitoring & Alerts)

### 1.1 Create a Sentry Account

1. Go to [sentry.io](https://sentry.io/signup/)
2. Sign up for a free account (up to 5,000 errors/month)
3. Create a new project:
   - Platform: **Vue**
   - Project name: `wedding-website`

### 1.2 Get Your Sentry DSN

1. After creating the project, you'll see your **DSN** (Data Source Name)
2. It looks like: `https://abc123@o123456.ingest.sentry.io/7654321`
3. Copy this value - you'll need it for the next step

### 1.3 Configure GitHub Secret

1. Go to your GitHub repository settings
2. Navigate to: **Settings → Secrets and variables → Actions**
3. Click **New repository secret**
4. Name: `VITE_SENTRY_DSN`
5. Value: Paste your Sentry DSN
6. Click **Add secret**

### 1.4 Local Development (Optional)

To test Sentry locally:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Sentry DSN:
   ```bash
   VITE_SENTRY_DSN=https://your-actual-dsn@sentry.io/your-project-id
   ```

**Note:** The `.env` file is gitignored and won't be committed. Sentry only runs in production by default, but having the DSN locally can help test the integration.

### 1.5 Upload Source Maps (for better error debugging)

The project is configured to generate hidden source maps in production. To upload them to Sentry for better stack traces:

1. Install Sentry CLI:
   ```bash
   npm install --save-dev @sentry/vite-plugin
   ```

2. Update `vite.config.ts` to include the Sentry plugin (optional - for automatic source map upload):
   ```typescript
   import { sentryVitePlugin } from '@sentry/vite-plugin'

   export default defineConfig(({ mode }) => {
     return {
       // ... existing config
       build: {
         sourcemap: mode === 'production' ? 'hidden' : true,
       },
       plugins: [
         vue(),
         mode === 'production' && sentryVitePlugin({
           org: 'your-org',
           project: 'wedding-website',
           authToken: process.env.SENTRY_AUTH_TOKEN,
         }),
       ].filter(Boolean),
     }
   })
   ```

3. Add `SENTRY_AUTH_TOKEN` to GitHub secrets

**Note:** This is optional. Sentry will still capture errors without source maps, but stack traces will show minified code.

## 2. Sentry Alert Configuration

### 2.1 Email Alerts (Free)

1. Go to your Sentry project
2. Click **Alerts** in the left sidebar
3. Click **Create Alert**
4. Choose **Issues**
5. Configure the alert:
   - **When**: An event is seen
   - **If**: Any of these conditions match
   - **Then**: Send a notification to your email

### 2.2 SMS Alerts via Email-to-SMS (Free)

Most carriers offer email-to-SMS gateways:

- **AT&T**: `phonenumber@txt.att.net`
- **Verizon**: `phonenumber@vtext.com`
- **T-Mobile**: `phonenumber@tmomail.net`
- **Sprint**: `phonenumber@messaging.sprintpcs.com`

To set up:
1. In Sentry alerts, add your carrier's email-to-SMS address
2. Example: `5551234567@txt.att.net`

### 2.3 SMS Alerts via Webhook + Twilio (Paid)

For more reliable SMS alerts:

1. Sign up for [Twilio](https://www.twilio.com/) (paid service, ~$0.0075/SMS)
2. Get your Twilio phone number, Account SID, and Auth Token
3. Create a webhook endpoint (e.g., using Cloudflare Workers or Vercel)
4. In Sentry:
   - Go to **Settings → Integrations**
   - Add a **Webhook** integration
   - Configure it to call your Twilio webhook
5. Your webhook should:
   - Receive Sentry alert payload
   - Call Twilio API to send SMS

### 2.4 Alert Conditions

Recommended alert rules:

1. **Critical Errors** (immediate alert)
   - When: Error count > 5 in 1 minute
   - Condition: Error level = 'error' or 'fatal'
   - Action: Send SMS + Email

2. **New Issues** (daily digest)
   - When: A new issue is created
   - Action: Send email

3. **High Error Rate** (warning)
   - When: Error count > 50 in 1 hour
   - Action: Send email

## 3. Cloudflare Web Analytics Setup

### 3.1 Create Cloudflare Account

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Sign up for a free account
3. Navigate to **Analytics → Web Analytics**

### 3.2 Add Your Site

1. Click **Add a site**
2. Enter your site name: `josephandkaitlyn.com`
3. Copy the JavaScript snippet (it will look like):
   ```html
   <script defer src='https://static.cloudflareinsights.com/beacon.min.js'
           data-cf-beacon='{"token": "abc123xyz456"}'></script>
   ```

### 3.3 Update index.html

1. Open `/index.html`
2. Find the Cloudflare Web Analytics comment (around line 34)
3. Uncomment the script tag and replace `YOUR_CLOUDFLARE_TOKEN` with your actual token:
   ```html
   <!-- Cloudflare Web Analytics -->
   <script defer src='https://static.cloudflareinsights.com/beacon.min.js'
           data-cf-beacon='{"token": "your-actual-token"}'></script>
   ```

### 3.4 Deploy and Verify

1. Commit and push your changes
2. Wait for GitHub Actions to deploy
3. Visit your Cloudflare dashboard to see analytics

## 4. Monitoring Dashboard

### 4.1 Sentry Dashboard

Access at: `https://sentry.io/organizations/your-org/projects/wedding-website/`

**Key Metrics:**
- **Issues** - Unique errors grouped by stack trace
- **Performance** - Page load times, component render times
- **Releases** - Track errors by deployment version
- **User Feedback** - Session replays for errors

**Useful Views:**
- **Issues → All Issues** - See all errors
- **Performance → Web Vitals** - Core Web Vitals (LCP, FID, CLS)
- **Replays** - Watch user sessions with errors

### 4.2 Cloudflare Dashboard

Access at: `https://dash.cloudflare.com → Analytics → Web Analytics`

**Key Metrics:**
- **Page Views** - Total visits
- **Unique Visitors** - Distinct users (by browser fingerprint)
- **Top Pages** - Most visited pages
- **Referrers** - Where visitors come from
- **Browsers & Devices** - User device statistics

## 5. Testing the Setup

### 5.1 Test Sentry Error Tracking

1. Trigger a test error in development:
   ```typescript
   // Add this temporarily to any component
   throw new Error('Test Sentry error')
   ```

2. Check Sentry dashboard to verify the error appears

3. Remove the test error

### 5.2 Test Cloudflare Analytics

1. Visit your deployed site
2. Wait 5-10 minutes
3. Check Cloudflare dashboard for the page view

## 6. Understanding the Data

### 6.1 Sentry Breadcrumbs

The app tracks these breadcrumbs (helpful for debugging):
- `Google Maps script already loaded` - Maps API was cached
- `Google Maps script loading, queuing request` - Multiple components loading maps
- `Starting Google Maps script load` - Initial map load
- `Google Maps script loaded successfully` - Map loaded
- `Google Maps script failed to load` - Map loading error

### 6.2 Error Context

When errors occur, Sentry captures:
- **Stack trace** - Where the error occurred
- **User session** - What the user was doing (if replay enabled)
- **Device info** - Browser, OS, screen size
- **Route** - Which page they were on
- **Custom context** - Any additional data we logged

### 6.3 Privacy Considerations

**Cloudflare Web Analytics:**
- No cookies used
- No personal data collected
- No cross-site tracking
- GDPR compliant

**Sentry:**
- Does not collect PII by default
- Session replays mask sensitive inputs (configurable)
- Can anonymize IP addresses
- GDPR compliant with proper configuration

## 7. Maintenance

### 7.1 Monthly Checks

- Review Sentry issues and fix recurring errors
- Check Cloudflare analytics for unusual traffic patterns
- Verify alerts are working (test error threshold)

### 7.2 Before Major Changes

- Create a new Sentry release tag
- Monitor error rates after deployment
- Check for new errors in Sentry

### 7.3 Free Tier Limits

**Sentry:**
- 5,000 errors per month
- 10,000 performance transactions per month
- 50 replays per month
- If you exceed limits, oldest data is dropped

**Cloudflare Web Analytics:**
- Unlimited page views
- Unlimited visitors
- Data retained for 6 months

## 8. Troubleshooting

### Sentry not capturing errors

1. Check that `VITE_SENTRY_DSN` is set in GitHub secrets
2. Verify the site is in production mode (`import.meta.env.PROD === true`)
3. Check browser console for Sentry initialization errors
4. Ensure source maps are being generated

### Cloudflare Analytics not showing data

1. Verify the script tag is in `index.html` and uncommented
2. Check that the token is correct
3. Wait 5-10 minutes for data to appear
4. Check browser console for JavaScript errors blocking the beacon

### Alerts not working

1. Verify alert rules are enabled in Sentry
2. Check your email spam folder
3. For SMS: verify carrier email-to-SMS address is correct
4. Test alerts manually in Sentry (Alert Rules → Test)

## 9. Additional Resources

- [Sentry Vue Documentation](https://docs.sentry.io/platforms/javascript/guides/vue/)
- [Cloudflare Web Analytics Docs](https://developers.cloudflare.com/analytics/web-analytics/)
- [Sentry Alert Configuration](https://docs.sentry.io/product/alerts/)
- [Twilio SMS API](https://www.twilio.com/docs/sms) (for advanced SMS alerts)

## 10. Cost Summary

**Free Tier (Recommended):**
- Sentry: $0/month (5k errors)
- Cloudflare: $0/month (unlimited)
- Email alerts: $0
- Email-to-SMS: $0

**Paid Options:**
- Sentry Team: $29/month (50k errors, more features)
- Twilio SMS: ~$0.0075/SMS + ~$1/month for phone number
