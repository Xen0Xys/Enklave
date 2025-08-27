<script setup lang="ts">
// Fetch all newsletter articles
const {data: articles} = await useAsyncData("whats-new", () =>
    queryCollection("content").all(),
);

useSeoMeta({
    title: "What's New - Enklave",
    description:
        "Découvrez les dernières nouveautés et mises à jour d'Enklave.",
});
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="mb-8 text-4xl font-bold">What's New</h1>
        <div class="grid gap-8">
            <div
                v-for="article in articles"
                :key="article.path"
                class="rounded-lg p-6 shadow-md">
                <h2 class="mb-2 text-2xl font-bold">{{ article.title }}</h2>
                <p class="mb-4 text-gray-500">{{ article.description }}</p>
                <NuxtLink
                    :to="article.path"
                    class="text-primary font-semibold hover:underline">
                    Lire la suite
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
