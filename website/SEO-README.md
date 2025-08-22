# Enklave Website - SEO Configuration

## Environment Variables (for production)

# Google Analytics ID (optional)
NUXT_PUBLIC_GTAG_ID=G-XXXXXXXXXX

# API Base URL
NUXT_PUBLIC_API_BASE=https://api.enklave.cloud

## SEO Features Implemented

✅ **Meta Tags & Open Graph**
- Page-specific titles and descriptions
- Open Graph tags for social media sharing
- Twitter Card metadata
- Canonical URLs
- Language attributes

✅ **Structured Data (Schema.org)**
- Organization schema
- WebSite schema
- ContactPage schema
- Breadcrumb schema

✅ **Technical SEO**
- Sitemap.xml generation
- Enhanced robots.txt
- 404 error page
- Proper HTML structure with lang attribute
- Responsive meta viewport

✅ **Content SEO**
- Proper heading hierarchy (H1-H4)
- Breadcrumb navigation
- Semantic HTML structure

✅ **Analytics Integration**
- Google Analytics 4 ready (requires GTAG_ID)
- Custom plugin for flexible setup

## Image Assets

The following placeholder images need to be replaced with actual branded assets:

- `/public/og-image.png` - Open Graph image (1200x630px recommended)
- `/public/logo.png` - Company logo for structured data

## URL Structure

- Homepage: `/` - Main landing page
- Contact: `/contact` - Contact form with structured data
- Changelog: `/whats-new` - Updates and news
- Unsubscribe: `/unsubscribe` - Newsletter unsubscribe (noindex)

## Sitemap

Automatically generated at `/sitemap.xml` containing all public pages with proper priority and changefreq settings.

## Performance

- Modern Nuxt 4 with Nitro for optimal loading
- Minimal JavaScript for SEO content
- Image optimization ready
- Font optimization with system fallbacks