<script setup lang="ts">
// Fetch all newsletter articles
const {data: articles} = await useAsyncData("whats-new", () =>
    queryCollection("content").all(),
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
        class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <!-- Hero Section -->
        <section class="relative px-6 py-24 text-white">
            <div class="container mx-auto max-w-4xl text-center">
                <!-- App icon placeholder -->
                <div
                    class="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                    <Icon
                        name="iconoir:settings"
                        class="h-10 w-10 text-white" />
                </div>

                <h1 class="mb-6 text-5xl font-bold md:text-6xl">What's New</h1>
                <p
                    class="mx-auto max-w-2xl text-xl leading-relaxed text-purple-100">
                    Stay up to date with the latest features, improvements, and
                    changes to Enklave. See how we're making family
                    collaboration better every day.
                </p>
            </div>

            <!-- Background decoration -->
            <div class="absolute inset-0 bg-gray-900 opacity-20"></div>
            <div
                class="absolute top-10 left-10 h-20 w-20 animate-pulse rounded-full bg-white/10 blur-xl"></div>
            <div
                class="absolute right-10 bottom-10 h-32 w-32 animate-pulse rounded-full bg-purple-500/20 blur-xl"></div>
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
                        class="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
                        <div class="mb-6 flex items-center justify-between">
                            <span
                                class="rounded-full bg-purple-500/30 px-4 py-2 text-sm font-medium text-purple-100">
                                📰 {{ article.category }}
                            </span>
                            <time class="text-purple-200">
                                {{ formatDate(article.date) }}
                            </time>
                        </div>

                        <h2 class="mb-4 text-3xl font-bold text-white">
                            {{ article.title }}
                        </h2>
                        
                        <p class="mb-6 text-lg text-purple-100">
                            {{ article.description }}
                        </p>

                        <div class="mb-6 flex items-center gap-6 text-sm text-purple-300">
                            <div class="flex items-center gap-2">
                                <Icon name="iconoir:user" class="h-4 w-4" />
                                <span>By {{ article.author }}</span>
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
                                    class="rounded-full bg-blue-500/20 px-2 py-1 text-xs font-medium text-blue-200">
                                    #{{ tag }}
                                </span>
                            </div>
                        </div>

                        <!-- Full Article Content -->
                        <article
                            class="prose prose-lg prose-invert prose-headings:text-white prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-purple-100 prose-p:leading-relaxed prose-a:text-purple-300 prose-a:underline hover:prose-a:text-purple-200 prose-strong:text-white prose-ul:text-purple-100 prose-ol:text-purple-100 prose-li:marker:text-purple-300 prose-blockquote:border-purple-500 prose-blockquote:text-purple-200 prose-code:text-purple-200 prose-code:bg-purple-500/20 prose-code:px-2 prose-code:py-1 prose-code:rounded max-w-none">
                            <ContentRenderer :value="article" />
                        </article>
                    </div>

                    <!-- No articles message -->
                    <div
                        v-else
                        class="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm text-center">
                        <Icon
                            name="iconoir:journal-page"
                            class="mx-auto mb-4 h-12 w-12 text-purple-300" />
                        <h2 class="mb-4 text-2xl font-bold text-white">
                            No Updates Yet
                        </h2>
                        <p class="text-purple-200">
                            We're working on exciting updates for Enklave. 
                            Subscribe to our newsletter to be the first to know when new content is available!
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Newsletter Signup CTA -->
        <section class="relative px-6 py-16 text-white">
            <div class="container mx-auto max-w-2xl text-center">
                <div
                    class="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
                    <Icon
                        name="iconoir:community"
                        class="mx-auto mb-4 h-12 w-12 text-purple-300" />
                    <h2 class="mb-4 text-2xl font-bold">Stay in the loop</h2>
                    <p class="mb-6 text-purple-100">
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
</style>
