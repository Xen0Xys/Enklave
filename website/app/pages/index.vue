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
        <!-- I18n Demo Section -->
        <section class="bg-muted/50 py-16">
            <div class="container px-4 md:px-10">
                <div class="mx-auto max-w-4xl space-y-8">
                    <div class="text-center">
                        <h1 class="text-4xl font-bold tracking-tight">
                            {{ $t("hero.welcome") }}
                        </h1>
                        <p class="text-muted-foreground mt-4 text-xl">
                            {{ $t("hero.description") }}
                        </p>
                    </div>

                    <!-- Search Input Example -->
                    <div class="mx-auto max-w-md">
                        <input
                            type="search"
                            :placeholder="$t('hero.searchPlaceholder')"
                            class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" />
                    </div>

                    <!-- Navigation Link Example -->
                    <div class="flex justify-center gap-4">
                        <NuxtLink
                            to="/contact"
                            class="bg-primary text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md px-8 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
                            {{ $t("nav.contact") }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>

        <!-- Original Landing Components -->
        <LandingHero />
        <LandingProblem />
        <LandingDemo />
        <LandingFeatures />
        <LandingSocialProof />
        <LandingPricing />
        <LandingNewsletter />
    </div>
</template>
