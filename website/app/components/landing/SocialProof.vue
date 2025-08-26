<script setup lang="ts">
import {landingConfig} from "~/config/landing";
</script>

<template>
    <section class="relative bg-white px-6 py-24 dark:bg-gray-800">
        <div class="container mx-auto max-w-6xl">
            <!-- Section header -->
            <div class="mb-16 text-center">
                <h2
                    class="mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl dark:from-white dark:to-gray-300">
                    {{ landingConfig.socialProof.title }}
                </h2>
                <p
                    class="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
                    {{ landingConfig.socialProof.description }}
                </p>
            </div>

            <!-- Stats grid -->
            <div class="mb-20 grid grid-cols-2 gap-8 md:grid-cols-4">
                <div
                    v-for="stat in landingConfig.socialProof.stats"
                    :key="stat.label"
                    class="group text-center">
                    <div class="mb-4">
                        <Icon
                            :name="stat.icon"
                            class="mx-auto size-8 text-purple-600 transition-transform duration-300 group-hover:scale-110 dark:text-purple-400" />
                    </div>
                    <div
                        class="mb-2 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                        {{ stat.value }}
                    </div>
                    <div class="text-muted-foreground">
                        {{ stat.label }}
                    </div>
                </div>
            </div>

            <!-- Testimonials -->
            <div class="grid gap-8 md:grid-cols-3">
                <div
                    v-for="(testimonial, index) in landingConfig.socialProof
                        .testimonials"
                    :key="testimonial.author"
                    class="rounded-2xl border border-gray-200 bg-gray-50 p-8 transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900"
                    :style="`animation-delay: ${index * 150}ms`">
                    <!-- Quote -->
                    <div class="mb-6">
                        <Icon
                            name="iconoir:quote"
                            class="mb-4 size-8 text-purple-600 dark:text-purple-400" />
                        <p
                            class="leading-relaxed text-gray-700 dark:text-gray-300">
                            "{{ testimonial.quote }}"
                        </p>
                    </div>

                    <!-- Author -->
                    <div class="flex items-center">
                        <div
                            class="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600">
                            <span class="text-lg font-semibold text-white">
                                {{
                                    testimonial.author
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                }}
                            </span>
                        </div>
                        <div>
                            <div
                                class="font-semibold text-gray-900 dark:text-white">
                                {{ testimonial.author }}
                            </div>
                            <div class="text-muted-foreground text-sm">
                                {{ testimonial.role }} at
                                {{ testimonial.company }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- GitHub CTA -->
            <div class="mt-16 text-center">
                <div
                    class="inline-flex items-center space-x-4 rounded-full border border-gray-200 bg-gray-100 px-6 py-3 dark:border-gray-700 dark:bg-gray-900">
                    <Icon
                        name="iconoir:github"
                        class="size-6 text-gray-700 dark:text-gray-300" />
                    <span class="text-gray-700 dark:text-gray-300"
                        >Star us on GitHub</span
                    >
                    <div
                        class="rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        {{ landingConfig.hero.githubStars }} ⭐
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
