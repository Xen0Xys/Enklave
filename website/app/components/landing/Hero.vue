<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import {landingConfig} from "~/config/landing";
</script>

<template>
    <section class="py-20 text-center">
        <div class="container">
            <h1 class="text-4xl font-bold tracking-tight lg:text-5xl">
                {{ landingConfig.hero.title }}
            </h1>
            <p class="text-muted-foreground mt-4 text-lg">
                {{ landingConfig.hero.description }}
            </p>
            <div class="mt-8 flex justify-center">
                <Button size="lg" as-child>
                    <NuxtLink to="/#pricing">{{
                        landingConfig.hero.cta
                    }}</NuxtLink>
                </Button>
            </div>
        </div>
    </section>
</template>
