<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import {landingConfig} from "~/config/landing";
</script>

<template>
    <section class="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center overflow-hidden">
        <!-- Background gradient -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20"></div>
        
        <!-- Animated background elements -->
        <div class="absolute inset-0 overflow-hidden">
            <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style="animation-delay: 2s;"></div>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style="animation-delay: 4s;"></div>
        </div>

        <div class="container relative z-10 max-w-4xl">
            <!-- Main headline with gradient text -->
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in">
                <span class="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                    {{ landingConfig.hero.title.split('.')[0] }}.
                </span>
                <br>
                <span class="text-gray-900 dark:text-white">
                    {{ landingConfig.hero.title.split('.')[1] }}.
                </span>
            </h1>
            
            <!-- Enhanced description -->
            <p class="text-muted-foreground mt-6 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed animate-fade-in-delay-1">
                {{ landingConfig.hero.description }}
            </p>
            
            <!-- Enhanced CTA section -->
            <div class="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay-2">
                <Button size="lg" class="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25 transform hover:scale-105 transition-all duration-200" as-child>
                    <NuxtLink to="/#pricing">{{
                        landingConfig.hero.cta
                    }}</NuxtLink>
                </Button>
                
                        <Button variant="outline" size="lg" class="px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transform hover:scale-105 transition-all duration-200" as-child>
                    <a href="https://github.com/Xen0Xys/Enklave" target="_blank" rel="noopener">
                        <Icon name="iconoir:github" class="mr-2 size-5" />
                        View on GitHub
                    </a>
                </Button>
            </div>
            
            <!-- Trust indicators -->
            <div class="mt-16 animate-fade-in-delay-3">
                <p class="text-sm text-muted-foreground mb-6">Trusted by developers and security professionals</p>
                <div class="flex justify-center items-center gap-8 opacity-60">
                    <div class="flex items-center gap-2">
                        <Icon name="iconoir:shield-check" class="size-5 text-green-600" />
                        <span class="text-sm font-medium">End-to-End Encrypted</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon name="iconoir:code" class="size-5 text-blue-600" />
                        <span class="text-sm font-medium">Open Source</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon name="iconoir:flash" class="size-5 text-purple-600" />
                        <span class="text-sm font-medium">Lightning Fast</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
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

.animate-fade-in {
    animation: fade-in 0.8s ease-out;
}

.animate-fade-in-delay-1 {
    animation: fade-in 0.8s ease-out 0.2s both;
}

.animate-fade-in-delay-2 {
    animation: fade-in 0.8s ease-out 0.4s both;
}

.animate-fade-in-delay-3 {
    animation: fade-in 0.8s ease-out 0.6s both;
}
</style>
