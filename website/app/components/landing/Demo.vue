<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import {landingConfig} from "~/config/landing";
</script>

<template>
    <section
        class="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 px-6 py-24">
        <div class="container mx-auto max-w-6xl">
            <div class="grid items-center gap-12 lg:grid-cols-2">
                <!-- Content -->
                <div class="text-white">
                    <h2 class="mb-6 text-4xl font-bold md:text-5xl">
                        {{ landingConfig.demo.title }}
                    </h2>
                    <p class="mb-8 text-xl leading-relaxed text-purple-100">
                        {{ landingConfig.demo.description }}
                    </p>

                    <!-- Features list -->
                    <ul class="mb-8 space-y-4">
                        <li
                            v-for="feature in landingConfig.demo.features"
                            :key="feature"
                            class="flex items-center">
                            <Icon
                                name="iconoir:check-circle"
                                class="mr-3 size-5 text-green-400" />
                            <span class="text-purple-100">{{ feature }}</span>
                        </li>
                    </ul>

                    <Button
                        size="lg"
                        class="transform bg-white px-8 py-4 text-lg font-semibold text-purple-900 shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-100"
                        as-child>
                        <a :href="landingConfig.demo.demoUrl">
                            {{ landingConfig.demo.cta }}
                        </a>
                    </Button>
                </div>

                <!-- Demo/Mockup -->
                <div class="relative">
                    <!-- Terminal-style demo mockup -->
                    <div
                        class="overflow-hidden rounded-2xl border border-gray-700 bg-gray-900 shadow-2xl">
                        <!-- Terminal header -->
                        <div
                            class="flex items-center space-x-2 bg-gray-800 px-4 py-3">
                            <div class="h-3 w-3 rounded-full bg-red-500"></div>
                            <div
                                class="h-3 w-3 rounded-full bg-yellow-500"></div>
                            <div
                                class="h-3 w-3 rounded-full bg-green-500"></div>
                            <span class="ml-4 text-sm text-gray-400"
                                >enklave-cli</span
                            >
                        </div>

                        <!-- Terminal content -->
                        <div class="p-6 font-mono text-sm text-green-400">
                            <div class="space-y-2">
                                <div>$ enklave encrypt --file secrets.json</div>
                                <div class="text-gray-500">
                                    # Encrypting with AES-256-GCM...
                                </div>
                                <div class="text-blue-400">
                                    ✓ File encrypted successfully
                                </div>
                                <div class="text-gray-500">
                                    # Encrypted data: fe4a7b...
                                </div>
                                <div class="mt-4">
                                    $ enklave share --to team@company.com
                                </div>
                                <div class="text-blue-400">
                                    ✓ Secure share link generated
                                </div>
                                <div class="text-gray-500">
                                    # Link: https://enklave.cloud/s/abc123
                                </div>
                                <div class="text-gray-500">
                                    # Expires: 7 days
                                </div>
                                <div class="animate-pulse">█</div>
                            </div>
                        </div>
                    </div>

                    <!-- Floating elements -->
                    <div
                        class="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-purple-500/20 blur-xl"></div>
                    <div
                        class="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-blue-500/20 blur-xl"></div>
                </div>
            </div>
        </div>
    </section>
</template>
