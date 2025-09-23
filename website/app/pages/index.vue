<script setup lang="ts">
// Use i18n composable for dynamic meta tags
const {t} = useI18n();

useSeoMeta({
    title: () => t("pages.home.title"),
    description: () => t("pages.home.description"),
    ogTitle: () => t("pages.home.title"),
    ogDescription: () => t("pages.home.description"),
    ogImage: "https://enklave.cloud/og-image.png",
    ogUrl: "https://enklave.cloud",
    twitterCard: "summary_large_image",
    twitterTitle: () => t("pages.home.title"),
    twitterDescription: () => t("pages.home.description"),
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
        description: () => t("pages.home.description"),
    }),
    defineWebSite({
        name: "Enklave",
        url: "https://enklave.cloud",
        description: () => t("pages.home.description"),
    }),
]);
</script>

<template>
    <div class="flex w-full flex-col">
        <LandingHero />
        <LandingProblem />
        <LandingDemo />
        <LandingFeatures />
        <LandingSocialProof />
        <LandingPricing />
        <LandingNewsletter />
    </div>
</template>
