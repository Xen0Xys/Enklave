// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

// noinspection TypeScriptValidateTypes
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: {enabled: true},
    modules: [
        "@nuxt/icon",
        "shadcn-nuxt",
        "@nuxtjs/google-fonts",
        "@nuxtjs/seo",
        "@nuxt/content",
    ],
    css: ["./app/assets/css/tailwind.css"],
    vite: {
        plugins: [tailwindcss() as unknown as any],
    },
    shadcn: {
        prefix: "",
        componentDir: "./app/components/ui",
    },
    googleFonts: {
        families: {
            Sora: true,
            Inter: true,
            "JetBrains Mono": true,
        },
        display: "swap",
    },
    site: {
        url: "https://enklave.cloud",
        name: "Enklave",
        description:
            "Collaborative family and couple management software with secure file storage, shopping lists, and organization tools",
        defaultLocale: "en",
    },
    seo: {
        fallbackTitle: false,
    },
    sitemap: {
        enabled: true,
        urls: [
            {
                loc: "/",
                changefreq: "weekly",
                priority: 1.0,
            },
            {
                loc: "/contact",
                changefreq: "monthly",
                priority: 0.8,
            },
            {
                loc: "/whats-new",
                changefreq: "weekly",
                priority: 0.9,
            },
        ],
    },
    robots: {
        enabled: true,
        disallow: ["/admin", "/api", "/.env", "/.git"],
        allow: ["/", "/contact", "/whats-new", "/unsubscribe", "/newsletter/*"],
        sitemap: "https://enklave.cloud/sitemap.xml",
    },
    schemaOrg: {
        enabled: true,
    },
    runtimeConfig: {
        public: {
            apiBase:
                process.env.NUXT_PUBLIC_API_BASE || "https://api.enklave.cloud",
        },
    },
});
