<script setup lang="ts">
// Fetch all newsletter articles
const {data: articles} = await useAsyncData("whats-new", async () =>
    (await queryCollection("newsletter").all()).reverse(),
);

useSeoMeta({
    title: "What's New - Enklave",
    description:
        "Stay up to date with the latest features, improvements, and changes to Enklave. See how we're making family collaboration better every day.",
});

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};
</script>

<template>
    <div
        class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
        <!-- Hero Section -->
        <section class="relative px-6 py-24">
            <div class="container mx-auto max-w-4xl text-center">
                <!-- Background decoration -->
                <div class="absolute inset-0 overflow-hidden">
                    <div
                        class="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-purple-300 opacity-20 mix-blend-multiply blur-xl filter dark:bg-purple-600"></div>
                    <div
                        class="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-blue-300 opacity-20 mix-blend-multiply blur-xl filter dark:bg-blue-600"
                        style="animation-delay: 2s"></div>
                    <div
                        class="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-pink-300 opacity-20 mix-blend-multiply blur-xl filter dark:bg-pink-600"
                        style="animation-delay: 4s"></div>
                </div>

                <!-- Content -->
                <div class="relative z-10">
                    <!-- App icon placeholder -->
                    <div
                        class="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm dark:bg-gray-800/50">
                        <Icon
                            name="iconoir:settings"
                            class="h-10 w-10 text-purple-600 dark:text-purple-400" />
                    </div>

                    <h1 class="mb-6 text-5xl font-bold md:text-6xl">
                        What's New
                    </h1>
                    <p
                        class="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
                        Stay up to date with the latest features, improvements,
                        and changes to Enklave. See how we're making family
                        collaboration better every day.
                    </p>
                </div>
            </div>
        </section>

        <!-- Newsletter Articles Section -->
        <section class="relative px-6 py-16">
            <div class="container mx-auto max-w-6xl">
                <div class="grid gap-8">
                    <!-- Newsletter Articles -->
                    <div
                        v-if="articles && articles.length > 0"
                        v-for="article in articles"
                        :key="article.path"
                        class="bg-card text-card-foreground rounded-2xl border p-8 shadow-lg">
                        <div class="mb-6 flex items-center justify-between">
                            <span
                                class="bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium">
                                📰 {{ article.category }}
                            </span>
                            <time class="text-muted-foreground">
                                {{ formatDate(article.meta.date as string) }}
                            </time>
                        </div>

                        <h2 class="mb-4 text-3xl font-bold">
                            {{ article.title }}
                        </h2>

                        <p class="text-muted-foreground mb-6 text-lg">
                            {{ article.description }}
                        </p>

                        <div
                            class="text-muted-foreground mb-6 flex items-center gap-6 text-sm">
                            <div class="flex items-center gap-2">
                                <Icon name="iconoir:user" class="h-4 w-4" />
                                <span
                                    >By
                                    {{ article.meta.author as string }}</span
                                >
                            </div>
                            <div
                                v-if="article.readTime"
                                class="flex items-center gap-2">
                                <Icon name="iconoir:clock" class="h-4 w-4" />
                                <span>{{ article.readTime }}</span>
                            </div>
                            <div
                                v-if="article.tags && article.tags.length"
                                class="flex flex-wrap gap-1">
                                <span
                                    v-for="tag in article.tags"
                                    :key="tag"
                                    class="bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs font-medium">
                                    #{{ tag }}
                                </span>
                            </div>
                        </div>

                        <!-- Full Article Content -->
                        <article
                            class="prose dark:prose-invert prose-lg max-w-none">
                            <ContentRenderer :value="article" />
                        </article>
                    </div>

                    <!-- No articles message -->
                    <div
                        v-else
                        class="bg-card text-card-foreground rounded-2xl border p-8 text-center shadow-lg">
                        <Icon
                            name="iconoir:journal-page"
                            class="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                        <h2 class="mb-4 text-2xl font-bold">No Updates Yet</h2>
                        <p class="text-muted-foreground">
                            We're working on exciting updates for Enklave.
                            Subscribe to our newsletter to be the first to know
                            when new content is available!
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Newsletter Signup CTA -->
        <section class="relative px-6 py-16">
            <div class="container mx-auto max-w-2xl text-center">
                <div
                    class="bg-card text-card-foreground rounded-2xl border p-8 shadow-lg">
                    <Icon
                        name="iconoir:community"
                        class="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                    <h2 class="mb-4 text-2xl font-bold">Stay in the loop</h2>
                    <p class="text-muted-foreground mb-6">
                        Subscribe to our newsletter to get notified about new
                        features and updates as soon as they're released.
                    </p>
                    <Button
                        as-child
                        class="transform bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105">
                        <NuxtLink to="/#newsletter">
                            Subscribe to Updates
                        </NuxtLink>
                    </Button>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0%,
    100% {
        opacity: 0.4;
    }
    50% {
        opacity: 0.8;
    }
}

.animate-pulse {
    animation: pulse 3s ease-in-out infinite;
}

/* Custom prose styling for what's-new page */
.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3),
.prose :deep(h4),
.prose :deep(h5),
.prose :deep(h6) {
    margin-top: 1rem;
}

.prose :deep(h1:first-child),
.prose :deep(h2:first-child),
.prose :deep(h3:first-child),
.prose :deep(h4:first-child),
.prose :deep(h5:first-child),
.prose :deep(h6:first-child) {
    margin-top: 0;
}

.prose :deep(h1) {
    margin-top: 1.5rem;
}

.prose :deep(h1:first-child) {
    margin-top: 0;
}

.prose :deep(li) {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
}

.prose :deep(ul),
.prose :deep(ol) {
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.prose :deep(li::marker) {
    color: hsl(var(--muted-foreground));
}
</style>
