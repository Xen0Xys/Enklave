<script setup lang="ts">
useSeoMeta({
    title: "Enklave - Collaborative family and couple management software.",
    description:
        "Enklave is a collaborative family and couple management software.",
    ogTitle: "Enklave - Collaborative family and couple management software.",
    ogDescription:
        "Enklave is a collaborative family and couple management software.",
    ogImage: "https://enklave.cloud/og-image.png",
    ogUrl: "https://enklave.cloud",
    twitterCard: "summary_large_image",
    twitterTitle:
        "Enklave - Collaborative family and couple management software.",
    twitterDescription:
        "Enklave is a collaborative family and couple management software.",
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
        description: "Collaborative family and couple management software.",
    }),
    defineWebSite({
        name: "Enklave",
        url: "https://enklave.cloud",
        description: "Collaborative family and couple management software.",
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
