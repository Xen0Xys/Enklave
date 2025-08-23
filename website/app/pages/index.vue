<script setup lang="ts">
useSeoMeta({
    title: "Enklave - Secure Password Manager & Digital Vault",
    description:
        "Enklave is a secure password manager and digital vault designed for teams and individuals. Protect your sensitive data with advanced encryption and seamless collaboration features.",
    ogTitle: "Enklave - Secure Password Manager & Digital Vault",
    ogDescription:
        "Enklave is a secure password manager and digital vault designed for teams and individuals. Protect your sensitive data with advanced encryption and seamless collaboration features.",
    ogImage: "https://enklave.cloud/og-image.png",
    ogUrl: "https://enklave.cloud",
    twitterCard: "summary_large_image",
    twitterTitle: "Enklave - Secure Password Manager & Digital Vault",
    twitterDescription:
        "Enklave is a secure password manager and digital vault designed for teams and individuals. Protect your sensitive data with advanced encryption and seamless collaboration features.",
    twitterImage: "https://enklave.cloud/og-image.png",
});

useSchemaOrg([
    defineOrganization({
        name: "Enklave",
        url: "https://enklave.cloud",
        logo: "https://enklave.cloud/logo.png",
        sameAs: [
            // Add social media links when available
        ],
        description:
            "Secure password manager and digital vault for teams and individuals",
    }),
    defineWebSite({
        name: "Enklave",
        url: "https://enklave.cloud",
        description:
            "Secure password manager and digital vault for teams and individuals",
    }),
]);
</script>

<template>
    <div class="flex w-full flex-col">
        <LandingHero />
        <LandingFeatures />
        <LandingPricing />
        <LandingNewsletter />
    </div>
</template>
