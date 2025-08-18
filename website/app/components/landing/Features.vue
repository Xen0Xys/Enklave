<script setup lang="ts">
import {landingConfig} from "~/config/landing";
</script>

<template>
    <section id="features" class="bg-secondary py-20">
        <div class="container">
            <h2 class="text-center text-3xl font-bold">
                {{ landingConfig.features.title }}
            </h2>
            <p class="text-muted-foreground mt-2 text-center">
                {{ landingConfig.features.description }}
            </p>
            <div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div
                    v-for="feature in landingConfig.features.items"
                    :key="feature.title"
                    class="bg-background flex flex-col items-center rounded-lg border p-6 text-center">
                    <Icon
                        :name="feature.icon"
                        class="text-primary mb-4 h-32 w-32" />
                    <h3 class="text-xl font-semibold">{{ feature.title }}</h3>
                    <p class="text-muted-foreground mt-2">
                        {{ feature.description }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
