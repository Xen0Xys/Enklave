<script setup lang="ts">
import {landingConfig} from "~/config/landing";
</script>

<template>
    <section
        id="features"
        class="relative bg-gradient-to-b from-gray-50 to-white px-6 py-24 dark:from-gray-900 dark:to-gray-800">
        <div class="container mx-auto max-w-6xl">
            <!-- Section header -->
            <div class="mb-16 text-center">
                <h2
                    class="mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl dark:from-white dark:to-gray-300">
                    {{ landingConfig.features.title }}
                </h2>
                <p
                    class="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
                    {{ landingConfig.features.description }}
                </p>
            </div>

            <!-- Features grid -->
            <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div
                    v-for="(feature, index) in landingConfig.features.items"
                    :key="feature.title"
                    class="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 dark:border-gray-700 dark:bg-gray-800"
                    :style="`animation-delay: ${index * 100}ms`">
                    <!-- Background gradient on hover -->
                    <div
                        class="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-teal-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                    <!-- Icon container with enhanced styling -->
                    <div class="relative z-10 mb-6">
                        <div
                            class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg transition-transform duration-300 group-hover:scale-110">
                            <Icon
                                :name="feature.icon"
                                class="size-8 text-white" />
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="relative z-10">
                        <h3
                            class="mb-3 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                            {{ feature.title }}
                        </h3>
                        <p class="text-muted-foreground leading-relaxed">
                            {{ feature.description }}
                        </p>
                    </div>

                    <!-- Decorative elements -->
                    <div
                        class="absolute top-4 right-4 h-8 w-8 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <div
                        class="absolute bottom-4 left-4 h-6 w-6 rounded-full bg-gradient-to-br from-blue-500/20 to-teal-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style="transition-delay: 100ms"></div>
                </div>
            </div>

            <!-- Bottom CTA -->
            <div class="mt-16 text-center">
                <p class="text-muted-foreground mb-6">
                    Ready to secure your digital life?
                </p>
                <Button
                    class="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 shadow-lg shadow-purple-500/25 hover:from-purple-700 hover:to-blue-700"
                    as-child>
                    <NuxtLink to="/#pricing">Start Free Today</NuxtLink>
                </Button>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Staggered animation for feature cards */
.grid > div {
    animation: slideUp 0.6s ease-out forwards;
    opacity: 0;
    transform: translateY(20px);
}

@keyframes slideUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
