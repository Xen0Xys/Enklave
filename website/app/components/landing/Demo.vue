<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
</script>

<template>
    <section
        class="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 px-6 py-24">
        <div class="container mx-auto max-w-6xl">
            <div class="grid items-center gap-12 lg:grid-cols-2">
                <!-- Content -->
                <div class="text-white">
                    <h2 class="mb-6 text-4xl font-bold md:text-5xl">
                        {{ $t("demo.title") }}
                    </h2>
                    <p class="mb-8 text-xl leading-relaxed text-purple-100">
                        {{ $t("demo.description") }}
                    </p>

                    <!-- Features list -->
                    <ul class="mb-8 space-y-4">
                        <li
                            v-for="(feature, index) in $t('demo.features')"
                            :key="index"
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
                        <a href="https://app.enklave.cloud">
                            {{ $t("demo.cta") }}
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
                            class="flex items-center justify-between border-b bg-gray-50 px-6 py-4">
                            <div class="flex items-center space-x-3">
                                <div
                                    class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600">
                                    <Icon
                                        name="iconoir:home"
                                        class="size-4 text-white" />
                                </div>
                                <span class="font-semibold text-gray-900">{{
                                    $t("demo.mockup.title")
                                }}</span>
                            </div>
                            <div class="flex space-x-2">
                                <div
                                    class="h-2 w-2 rounded-full bg-gray-300"></div>
                                <div
                                    class="h-2 w-2 rounded-full bg-gray-300"></div>
                                <div
                                    class="h-2 w-2 rounded-full bg-green-500"></div>
                            </div>
                        </div>

                        <!-- App content -->
                        <div class="space-y-4 p-6">
                            <!-- Recent files -->
                            <div class="space-y-2">
                                <h3 class="text-sm font-medium text-gray-600">
                                    {{ $t("demo.mockup.recentFiles") }}
                                </h3>
                                <div class="space-y-2">
                                    <div
                                        class="flex items-center space-x-3 rounded-lg bg-blue-50 p-2">
                                        <Icon
                                            name="iconoir:page"
                                            class="size-4 text-blue-600" />
                                        <span class="text-sm text-gray-900">{{
                                            $t("demo.mockup.files.0")
                                        }}</span>
                                        <span
                                            class="ml-auto text-xs text-gray-500"
                                            >{{
                                                $t("demo.mockup.timestamps.0")
                                            }}</span
                                        >
                                    </div>
                                    <div
                                        class="flex items-center space-x-3 rounded-lg bg-green-50 p-2">
                                        <Icon
                                            name="iconoir:folder"
                                            class="size-4 text-green-600" />
                                        <span class="text-sm text-gray-900">{{
                                            $t("demo.mockup.files.1")
                                        }}</span>
                                        <span
                                            class="ml-auto text-xs text-gray-500"
                                            >{{
                                                $t("demo.mockup.timestamps.1")
                                            }}</span
                                        >
                                    </div>
                                </div>
                            </div>

                            <!-- Shopping list -->
                            <div class="space-y-2">
                                <h3 class="text-sm font-medium text-gray-600">
                                    {{ $t("demo.mockup.shoppingList") }}
                                </h3>
                                <div class="space-y-1">
                                    <div class="flex items-center space-x-2">
                                        <div
                                            class="h-4 w-4 rounded border-2 border-purple-300"></div>
                                        <span class="text-sm text-gray-900">{{
                                            $t("demo.mockup.shoppingItems.0")
                                        }}</span>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <div
                                            class="flex h-4 w-4 items-center justify-center rounded border-2 border-purple-600 bg-purple-600">
                                            <Icon
                                                name="iconoir:check"
                                                class="size-2 text-white" />
                                        </div>
                                        <span
                                            class="text-sm text-gray-500 line-through"
                                            >{{
                                                $t("demo.mockup.shoppingItems.1")
                                            }}</span
                                        >
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <div
                                            class="h-4 w-4 rounded border-2 border-purple-300"></div>
                                        <span class="text-sm text-gray-900">{{
                                            $t("demo.mockup.shoppingItems.2")
                                        }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Status indicator -->
                            <div class="border-t border-gray-100 pt-2">
                                <div
                                    class="flex items-center justify-between text-xs text-gray-500">
                                    <span>{{
                                        $t("demo.mockup.status")
                                    }}</span>
                                    <div class="flex space-x-1">
                                        <div
                                            class="h-2 w-2 rounded-full bg-green-500"></div>
                                        <span>{{
                                            $t("demo.mockup.statusText")
                                        }}</span>
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
