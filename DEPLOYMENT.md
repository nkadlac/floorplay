# Production Deployment Guide for FloorPlay.Agency

Your epoxy floor agency website is ready for production! Here's how to deploy it to your `floorplay.agency` domain.

## 🚀 Quick Deploy Options

### Option 1: Netlify (Recommended)
**Best for:** Easy setup, great performance, free tier

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - FloorPlay Agency website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/floorplay-agency
   git push -u origin main
   ```

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repo
   - Build settings are already configured in `netlify.toml`
   - Deploy automatically starts

3. **Configure Domain:**
   - In Netlify dashboard: Site settings → Domain management
   - Add custom domain: `floorplay.agency`
   - Follow DNS instructions to point your domain to Netlify

### Option 2: Vercel
**Best for:** Developer-friendly, excellent performance

1. **Push to GitHub** (same as above)
2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repo
   - Settings are pre-configured in `vercel.json`
   - Deploy automatically

3. **Configure Domain:**
   - In Vercel dashboard: Project → Domains
   - Add `floorplay.agency`
   - Update DNS as instructed

## 📋 Pre-Deployment Checklist

### ✅ Content Setup
- [ ] Add content to Sanity Studio (http://localhost:3333)
- [ ] Update business information in SEO settings
- [ ] Add real contact information and address
- [ ] Upload service images and before/after photos

### ✅ Business Information Updates
Update these in your Sanity Studio → SEO Settings:

```
Business Name: FloorPlay Agency
Phone: Your actual phone number
Address: Your actual business address
Service Areas: Your actual service areas
Business Hours: Your actual hours
Email: Your actual business email
```

### ✅ Domain Configuration
1. **DNS Settings** (at your domain registrar):
   ```
   Type: CNAME
   Name: www
   Value: (provided by Netlify/Vercel)
   
   Type: A
   Name: @
   Value: (provided by Netlify/Vercel)
   ```

2. **SSL Certificate**: Automatically handled by both platforms

## 🔧 Production Optimizations

### Performance
- ✅ CDN enabled for Sanity in production
- ✅ Astro static site generation
- ✅ Optimized images and assets
- ✅ Security headers configured

### SEO
- ✅ Structured data for local business
- ✅ Meta tags optimized
- ✅ Canonical URLs configured
- ✅ Sitemap generation ready

### Security
- ✅ HTTPS redirects
- ✅ Security headers
- ✅ XSS protection
- ✅ Content security policies

## 📊 Post-Deployment Setup

### 1. Google Analytics
1. Create GA4 property for floorplay.agency
2. Add tracking ID to Sanity Studio → SEO Settings
3. Verify tracking is working

### 2. Google Search Console
1. Add and verify floorplay.agency
2. Submit sitemap: `https://floorplay.agency/sitemap.xml`
3. Monitor indexing and performance

### 3. Google My Business
1. Create/claim your GMB listing
2. Ensure NAP (Name, Address, Phone) consistency
3. Add photos and business information

### 4. Local SEO
1. Submit to local directories
2. Build local citations
3. Get customer reviews

## 🆘 Troubleshooting

### Build Errors
- Check Node.js version (should be 18+)
- Verify all dependencies installed
- Check Sanity project ID is correct

### Domain Issues
- DNS propagation can take 24-48 hours
- Use DNS checker tools to verify settings
- Clear browser cache

### Content Not Loading
- Verify Sanity Studio is accessible
- Check project ID in config
- Ensure content is published

## 📞 Support Resources

- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Astro Docs**: [docs.astro.build](https://docs.astro.build)
- **Sanity Docs**: [sanity.io/docs](https://sanity.io/docs)

## 🎯 Next Steps After Deployment

1. **Add Content**: Populate your Sanity CMS with real content
2. **SEO Audit**: Use tools like Google PageSpeed Insights
3. **AI Chatbot**: Ready to integrate when you need it
4. **Analytics**: Monitor traffic and conversions
5. **Local Marketing**: Start building local citations and reviews

Your site is production-ready with:
- ✅ Professional design
- ✅ SEO optimization
- ✅ Mobile responsiveness  
- ✅ Content management system
- ✅ Fast performance
- ✅ Security best practices
