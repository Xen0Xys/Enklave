<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
</script>

<template>
    <section class="py-20 text-center">
        <div class="w-full px-10 text-center">
            <h1 class="text-4xl font-bold tracking-tight lg:text-5xl">
                Secure your data. Take back control.
            </h1>
            <p class="text-muted-foreground mt-4 text-lg">
                Enklave is the open-source solution to protect your digital
                life. Simple, transparent and completely under your control.
            </p>
            <div class="mt-8 flex justify-center">
                <Button size="lg" as-child>
                    <NuxtLink to="/#pricing">Get started for free</NuxtLink>
                </Button>
            </div>
        </div>
    </section>
</template>
