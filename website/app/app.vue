<script setup lang="ts">
useSeoMeta({
    htmlAttrs: {
        lang: "en",
    },
    viewport: "width=device-width, initial-scale=1",
    charset: "utf-8",
    // Default meta tags that can be overridden by pages
    title: "Enklave - Secure Password Manager & Digital Vault",
    description:
        "Enklave is a secure password manager and digital vault designed for teams and individuals. Protect your sensitive data with advanced encryption and seamless collaboration features.",
    author: "Enklave Team",
    publisher: "Enklave",
    formatDetection: "telephone=no",
    themeColor: [
        {content: "#7c3aed", media: "(prefers-color-scheme: light)"},
        {content: "#8b5cf6", media: "(prefers-color-scheme: dark)"},
    ],
    colorScheme: "light dark",
    robots: "index, follow",
    googlebot:
        "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    // Open Graph defaults
    ogType: "website",
    ogSiteName: "Enklave",
    ogLocale: "en_US",
    // Twitter defaults
    twitterCard: "summary_large_image",
    twitterSite: "@enklave", // Update with actual Twitter handle
});

useHead({
    link: [
        {rel: "icon", type: "image/x-icon", href: "/favicon.ico"},
        {rel: "canonical", href: "https://enklave.cloud"},
        {rel: "preconnect", href: "https://fonts.googleapis.com"},
        {rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: ""},
    ],
});
</script>

<template>
    <Html lang="en">
        <Head>
            <meta charset="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1" />
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        </Head>
        <Body>
            <NuxtLoadingIndicator />
            <NuxtLayout>
                <NuxtPage />
            </NuxtLayout>
        </Body>
    </Html>
</template>
