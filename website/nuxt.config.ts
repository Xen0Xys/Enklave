// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

// noinspection TypeScriptValidateTypes
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: {enabled: true},
    modules: ["@nuxt/icon", "shadcn-nuxt", "@nuxtjs/seo"],
    css: ["./app/assets/css/tailwind.css"],
    vite: {
        plugins: [tailwindcss() as unknown as any],
    },
    shadcn: {
        prefix: "",
        componentDir: "./app/components/ui",
    },
    // SEO Configuration
    site: {
        url: "https://enklave.cloud",
        name: "Enklave",
        description: "Secure password manager and digital vault for teams and individuals",
        defaultLocale: "en",
    },
    seo: {
        fallbackTitle: false, // Use page-specific titles instead of appending site name
    },
    sitemap: {
        enabled: true,
        strictNuxtContentPaths: true,
        urls: [
            {
                loc: '/',
                changefreq: 'weekly',
                priority: 1.0
            },
            {
                loc: '/contact',
                changefreq: 'monthly',
                priority: 0.8
            },
            {
                loc: '/whats-new',
                changefreq: 'weekly',
                priority: 0.9
            }
        ]
    },
    robots: {
        enabled: true,
        disallow: ['/admin', '/api', '/.env', '/.git'],
        allow: ['/', '/contact', '/whats-new', '/unsubscribe'],
        sitemap: 'https://enklave.cloud/sitemap.xml'
    },
    schemaOrg: {
        enabled: true,
    },
    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE || "https://api.enklave.cloud",
            gtagId: process.env.NUXT_PUBLIC_GTAG_ID || '', // Google Analytics ID
        },
    },
});
