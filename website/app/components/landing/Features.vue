<script setup lang="ts">
import {landingConfig} from "~/config/landing";
</script>

<template>
    <section
        id="features"
        class="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-24 px-6">
        <div class="container max-w-6xl mx-auto">
            <!-- Section header -->
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {{ landingConfig.features.title }}
                </h2>
                <p class="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
                    {{ landingConfig.features.description }}
                </p>
            </div>
            
            <!-- Features grid -->
            <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div
                    v-for="(feature, index) in landingConfig.features.items"
                    :key="feature.title"
                    class="group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
                    :style="`animation-delay: ${index * 100}ms`">
                    
                    <!-- Background gradient on hover -->
                    <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    
                    <!-- Icon container with enhanced styling -->
                    <div class="relative z-10 mb-6">
                        <div class="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Icon
                                :name="feature.icon"
                                class="text-white size-8" />
                        </div>
                    </div>
                    
                    <!-- Content -->
                    <div class="relative z-10">
                        <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                            {{ feature.title }}
                        </h3>
                        <p class="text-muted-foreground leading-relaxed">
                            {{ feature.description }}
                        </p>
                    </div>
                    
                    <!-- Decorative elements -->
                    <div class="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div class="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style="transition-delay: 100ms;"></div>
                </div>
            </div>
            
            <!-- Bottom CTA -->
            <div class="text-center mt-16">
                <p class="text-muted-foreground mb-6">Ready to secure your digital life?</p>
                <Button class="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25" as-child>
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
