<script setup lang="ts">
definePageMeta({
    layout: "default",
});

const route = useRoute();
const slug = route.params.slug as string;

// Fetch the newsletter article
const {data: article} = await useAsyncData(`newsletter-${slug}`, () =>
    queryCollection("content").path(`/newsletter/${slug}`).first(),
);

if (!article.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "Newsletter article not found",
    });
}

useSeoMeta({
    title: `${article.value.title} - Enklave Newsletter`,
    description: article.value.description,
    ogTitle: `${article.value.title} - Enklave Newsletter`,
    ogDescription: article.value.description,
    ogUrl: `https://enklave.cloud/newsletter/${slug}`,
    twitterTitle: `${article.value.title} - Enklave Newsletter`,
    twitterDescription: article.value.description,
});

useSchemaOrg([
    defineArticle({
        headline: article.value.title,
        description: article.value.description,
        author: {
            name: article.value.meta.author,
        },
        datePublished: new Date(article.value.meta.date),
        dateModified: new Date(article.value.meta.date),
    }),
]);

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
        <!-- Header Section -->
        <section class="relative px-6 py-24 text-white">
            <div class="container mx-auto max-w-4xl">
                <!-- Back Navigation -->
                <div class="mb-8">
                    <NuxtLink
                        to="/#newsletter"
                        class="inline-flex items-center text-purple-300 transition-colors duration-200 hover:text-purple-200">
                        <Icon name="iconoir:arrow-left" class="mr-2 size-4" />
                        Back to Newsletter
                    </NuxtLink>
                </div>

                <!-- Article Header -->
                <div v-if="article" class="text-center">
                    <div
                        class="mb-6 flex flex-wrap items-center justify-center gap-4">
                        <span
                            class="rounded-full bg-purple-500/30 px-4 py-2 text-sm font-medium text-purple-100">
                            {{ article.category }}
                        </span>
                        <div class="flex items-center gap-2 text-purple-200">
                            <Icon name="iconoir:calendar" class="h-4 w-4" />
                            <time>
                                {{ formatDate(article.date) }}
                            </time>
                        </div>
                        <div
                            v-if="article.readTime"
                            class="flex items-center gap-2 text-purple-200">
                            <Icon name="iconoir:clock" class="h-4 w-4" />
                            <span>{{ article.readTime }}</span>
                        </div>
                    </div>
                    <h1 class="mb-6 text-4xl font-bold md:text-5xl">
                        {{ article.title }}
                    </h1>
                    <p
                        class="mx-auto max-w-2xl text-xl leading-relaxed text-purple-100">
                        {{ article.description }}
                    </p>
                    <div class="mt-6 flex items-center justify-center gap-2">
                        <Icon
                            name="iconoir:user"
                            class="h-4 w-4 text-purple-300" />
                        <span class="text-sm text-purple-200"
                            >By {{ article.author }}</span
                        >
                    </div>
                    <div
                        v-if="article.tags && article.tags.length"
                        class="mt-4 flex flex-wrap justify-center gap-2">
                        <span
                            v-for="tag in article.tags"
                            :key="tag"
                            class="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-200">
                            #{{ tag }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Background decoration -->
            <div class="absolute inset-0 bg-gray-900 opacity-20"></div>
            <div
                class="absolute top-10 left-10 h-20 w-20 animate-pulse rounded-full bg-white/10 blur-xl"></div>
            <div
                class="absolute right-10 bottom-10 h-32 w-32 animate-pulse rounded-full bg-purple-500/20 blur-xl"></div>
        </section>

        <!-- Article Content -->
        <section class="relative px-6 py-16">
            <div class="container mx-auto max-w-4xl">
                <div
                    class="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm md:p-12">
                    <article
                        class="prose prose-lg prose-invert prose-headings:text-white prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-purple-100 prose-p:leading-relaxed prose-a:text-purple-300 prose-a:underline hover:prose-a:text-purple-200 prose-strong:text-white prose-ul:text-purple-100 prose-ol:text-purple-100 prose-li:marker:text-purple-300 prose-blockquote:border-purple-500 prose-blockquote:text-purple-200 prose-code:text-purple-200 prose-code:bg-purple-500/20 prose-code:px-2 prose-code:py-1 prose-code:rounded mx-auto max-w-none">
                        <ContentRenderer v-if="article" :value="article" />
                    </article>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="relative px-6 py-16 text-white">
            <div class="container mx-auto max-w-2xl text-center">
                <div
                    class="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
                    <Icon
                        name="iconoir:community"
                        class="mx-auto mb-4 size-12 text-purple-300" />
                    <h2 class="mb-4 text-2xl font-bold">
                        Enjoyed this article?
                    </h2>
                    <p class="mb-6 text-purple-100">
                        Subscribe to our newsletter for more family organization
                        tips and product updates.
                    </p>
                    <Button
                        as-child
                        class="transform bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105">
                        <NuxtLink to="/#newsletter">
                            Subscribe to Newsletter
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
