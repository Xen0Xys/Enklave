<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
</script>

<template>
    <section
        class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
        <!-- Background gradient -->
        <div
            class="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20"></div>

        <!-- Animated background elements -->
        <div class="absolute inset-0 overflow-hidden">
            <div
                class="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-purple-300 opacity-20 mix-blend-multiply blur-xl filter"></div>
            <div
                class="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-blue-300 opacity-20 mix-blend-multiply blur-xl filter"
                style="animation-delay: 2s"></div>
            <div
                class="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-pink-300 opacity-20 mix-blend-multiply blur-xl filter"
                style="animation-delay: 4s"></div>
        </div>

        <div class="relative z-10 container max-w-4xl">
            <!-- Logo Enklave -->
            <img
                src="/icon.webp"
                alt="Logo Enklave"
                class="mx-auto mb-4"
                style="max-width: 80px; height: auto" />

            <!-- Badge -->
            <div
                class="animate-fade-in mb-8 inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
                <Icon name="iconoir:code" class="mr-2 size-4" />
                {{ $t("hero.badge") }}
            </div>

            <!-- Main headline with gradient text -->
            <h1
                class="animate-fade-in mb-6 text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
                <span
                    class="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                    {{ $t("hero.title").split(".")[0] }}.
                </span>
                <br />
                <span class="text-gray-900 dark:text-white">
                    {{ $t("hero.title").split(".")[1] }}.
                </span>
            </h1>

            <!-- Enhanced description -->
            <p
                class="text-muted-foreground animate-fade-in-delay-1 mx-auto mt-6 max-w-3xl text-xl leading-relaxed md:text-2xl">
                {{ $t("hero.description") }}
            </p>

            <!-- Enhanced CTA section -->
            <div
                class="animate-fade-in-delay-2 mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                    size="lg"
                    class="transform bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-lg font-semibold shadow-lg shadow-purple-500/25 transition-all duration-200 hover:scale-105 hover:from-purple-700 hover:to-blue-700"
                    as-child>
                    <NuxtLink to="/#pricing">{{
                        $t("hero.cta")
                    }}</NuxtLink>
                </Button>

                <Button
                    variant="outline"
                    size="lg"
                    class="transform border-2 px-8 py-4 text-lg font-semibold transition-all duration-200 hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-800"
                    as-child>
                    <a
                        href="https://github.com/Xen0Xys/Enklave"
                        target="_blank"
                        rel="noopener">
                        <Icon name="iconoir:github" class="mr-2 size-5" />
                        {{ $t("hero.githubButton") }}
                    </a>
                </Button>
            </div>

            <!-- GitHub stats and trust indicators -->
            <div class="animate-fade-in-delay-3 mt-16">
                <p class="text-muted-foreground mb-6 text-sm">
                    {{ $t("hero.trustLine") }}
                </p>
                <div class="flex flex-wrap items-center justify-center gap-6">
                    <div
                        class="flex items-center space-x-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm dark:bg-gray-800/50">
                        <Icon
                            name="iconoir:star"
                            class="size-4 text-yellow-500" />
                        <span class="text-sm font-medium"
                            >2.1k+ {{ $t("hero.githubStars") }}</span
                        >
                    </div>
                    <div
                        class="flex items-center space-x-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm dark:bg-gray-800/50">
                        <Icon
                            name="iconoir:shield-check"
                            class="size-4 text-green-500" />
                        <span class="text-sm font-medium">{{
                            $t("hero.zeroTrust")
                        }}</span>
                    </div>
                    <div
                        class="flex items-center space-x-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm dark:bg-gray-800/50">
                        <Icon
                            name="iconoir:code"
                            class="size-4 text-blue-500" />
                        <span class="text-sm font-medium">{{
                            $t("hero.openSource")
                        }}</span>
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
