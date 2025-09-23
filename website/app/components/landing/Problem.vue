<script setup lang="ts">
</script>

<template>
    <section class="relative bg-gray-50 px-6 py-24 dark:bg-gray-900/50">
        <div class="container mx-auto max-w-6xl">
            <!-- Section header -->
            <div class="mb-16 text-center">
                <h2
                    class="mb-4 text-4xl font-bold text-red-600 md:text-5xl dark:text-red-400">
                    {{ $t("problem.title") }}
                </h2>
                <p
                    class="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed">
                    {{ $t("problem.description") }}
                </p>
            </div>

            <!-- Pain points grid -->
            <div class="grid gap-8 md:grid-cols-3">
                <div
                    class="group rounded-2xl border border-red-100 bg-white p-8 text-center transition-all duration-300 hover:border-red-200 dark:border-red-900/30 dark:bg-gray-800 dark:hover:border-red-800/50"
                    style="animation-delay: 0ms">
                    <!-- Icon -->
                    <div class="mb-6">
                        <div
                            class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 transition-transform duration-300 group-hover:scale-110 dark:bg-red-900/30">
                            <Icon
                                name="iconoir:multiple-pages"
                                class="size-8 text-red-600 dark:text-red-400" />
                        </div>
                    </div>

                    <!-- Content -->
                    <h3
                        class="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                        {{ $t("problem.painPoints.scattered.title") }}
                    </h3>
                    <p class="text-muted-foreground leading-relaxed">
                        {{ $t("problem.painPoints.scattered.description") }}
                    </p>
                </div>
                <div
                    class="group rounded-2xl border border-red-100 bg-white p-8 text-center transition-all duration-300 hover:border-red-200 dark:border-red-900/30 dark:bg-gray-800 dark:hover:border-red-800/50"
                    style="animation-delay: 150ms">
                    <!-- Icon -->
                    <div class="mb-6">
                        <div
                            class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 transition-transform duration-300 group-hover:scale-110 dark:bg-red-900/30">
                            <Icon
                                name="iconoir:cart"
                                class="size-8 text-red-600 dark:text-red-400" />
                        </div>
                    </div>

                    <!-- Content -->
                    <h3
                        class="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                        {{ $t("problem.painPoints.forgotten.title") }}
                    </h3>
                    <p class="text-muted-foreground leading-relaxed">
                        {{ $t("problem.painPoints.forgotten.description") }}
                    </p>
                </div>
                <div
                    class="group rounded-2xl border border-red-100 bg-white p-8 text-center transition-all duration-300 hover:border-red-200 dark:border-red-900/30 dark:bg-gray-800 dark:hover:border-red-800/50"
                    style="animation-delay: 300ms">
                    <!-- Icon -->
                    <div class="mb-6">
                        <div
                            class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 transition-transform duration-300 group-hover:scale-110 dark:bg-red-900/30">
                            <Icon
                                name="iconoir:privacy-policy"
                                class="size-8 text-red-600 dark:text-red-400" />
                        </div>
                    </div>

                    <!-- Content -->
                    <h3
                        class="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                        {{ $t("problem.painPoints.privacy.title") }}
                    </h3>
                    <p class="text-muted-foreground leading-relaxed">
                        {{ $t("problem.painPoints.privacy.description") }}
                    </p>
                </div>
            </div>

            <!-- Call to action -->
            <div class="mt-16 text-center">
                <p class="mb-6 text-lg text-gray-600 dark:text-gray-300">
                    {{ $t("problem.solution") }}
                </p>
                <div
                    class="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-red-500 to-purple-600"></div>
            </div>
        </div>
    </section>
</template>
