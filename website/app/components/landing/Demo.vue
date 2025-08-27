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
                    <!-- Family app interface mockup -->
                    <div
                        class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
                        <!-- App header -->
                        <div
                            class="flex items-center justify-between bg-gray-50 px-6 py-4 border-b">
                            <div class="flex items-center space-x-3">
                                <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                                    <Icon name="iconoir:home" class="size-4 text-white" />
                                </div>
                                <span class="font-semibold text-gray-900">{{ landingConfig.demo.mockup?.title || 'The Smith Family' }}</span>
                            </div>
                            <div class="flex space-x-2">
                                <div class="h-2 w-2 rounded-full bg-gray-300"></div>
                                <div class="h-2 w-2 rounded-full bg-gray-300"></div>
                                <div class="h-2 w-2 rounded-full bg-green-500"></div>
                            </div>
                        </div>

                        <!-- App content -->
                        <div class="p-6 space-y-4">
                            <!-- Recent files -->
                            <div class="space-y-2">
                                <h3 class="text-sm font-medium text-gray-600">{{ landingConfig.demo.mockup?.sections?.recentFiles || 'Recent Files' }}</h3>
                                <div class="space-y-2">
                                    <div class="flex items-center space-x-3 p-2 rounded-lg bg-blue-50">
                                        <Icon name="iconoir:page" class="size-4 text-blue-600" />
                                        <span class="text-sm text-gray-900">{{ landingConfig.demo.mockup?.files?.[0] || 'Family_Budget_2025.pdf' }}</span>
                                        <span class="ml-auto text-xs text-gray-500">{{ landingConfig.demo.mockup?.timestamps?.[0] || '2 min ago' }}</span>
                                    </div>
                                    <div class="flex items-center space-x-3 p-2 rounded-lg bg-green-50">
                                        <Icon name="iconoir:folder" class="size-4 text-green-600" />
                                        <span class="text-sm text-gray-900">{{ landingConfig.demo.mockup?.files?.[1] || 'Kids School Documents' }}</span>
                                        <span class="ml-auto text-xs text-gray-500">{{ landingConfig.demo.mockup?.timestamps?.[1] || '1 hour ago' }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Shopping list -->
                            <div class="space-y-2">
                                <h3 class="text-sm font-medium text-gray-600">{{ landingConfig.demo.mockup?.sections?.shoppingList || 'Shopping List' }}</h3>
                                <div class="space-y-1">
                                    <div class="flex items-center space-x-2">
                                        <div class="h-4 w-4 rounded border-2 border-purple-300"></div>
                                        <span class="text-sm text-gray-900">{{ landingConfig.demo.mockup?.shoppingItems?.[0] || 'Organic milk' }}</span>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <div class="h-4 w-4 rounded border-2 border-purple-600 bg-purple-600 flex items-center justify-center">
                                            <Icon name="iconoir:check" class="size-2 text-white" />
                                        </div>
                                        <span class="text-sm text-gray-500 line-through">{{ landingConfig.demo.mockup?.shoppingItems?.[1] || 'Fresh bread' }}</span>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <div class="h-4 w-4 rounded border-2 border-purple-300"></div>
                                        <span class="text-sm text-gray-900">{{ landingConfig.demo.mockup?.shoppingItems?.[2] || 'Kids snacks' }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Status indicator -->
                            <div class="pt-2 border-t border-gray-100">
                                <div class="flex items-center justify-between text-xs text-gray-500">
                                    <span>{{ landingConfig.demo.mockup?.status || '✓ All family members connected' }}</span>
                                    <div class="flex space-x-1">
                                        <div class="h-2 w-2 rounded-full bg-green-500"></div>
                                        <span>{{ landingConfig.demo.mockup?.statusText || 'Secure' }}</span>
                                    </div>
                                </div>
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
