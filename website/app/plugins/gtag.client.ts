export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const gtagId = config.public.gtagId;

    // Only load Google Analytics if ID is provided
    if (!gtagId) return;

    // Load Google Analytics script
    useHead({
        script: [
            {
                src: `https://www.googletagmanager.com/gtag/js?id=${gtagId}`,
                async: true,
            },
            {
                innerHTML: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gtagId}', {
                        page_title: document.title,
                        page_location: window.location.href
                    });
                `,
            },
        ],
    });

    // Provide gtag function globally
    if (process.client) {
        nuxtApp.provide('gtag', (...args: any[]) => {
            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag(...args);
            }
        });
    }
});