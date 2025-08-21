<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import {landingConfig} from "~/config/landing";
</script>

<template>
    <section
        id="newsletter"
        class="bg-secondary flex flex-col items-center px-10 py-20">
        <div
            class="container mx-auto flex max-w-2xl flex-col items-center text-center">
            <h2 class="text-3xl font-bold">
                {{ landingConfig.newsletter.title }}
            </h2>
            <p class="text-muted-foreground mt-2">
                {{ landingConfig.newsletter.description }}
            </p>
            <div class="mt-6 flex w-sm md:w-lg">
                <Input
                    type="email"
                    :placeholder="landingConfig.newsletter.placeholder"
                    class="flex-1" />
                <Button class="ml-2">{{ landingConfig.newsletter.cta }}</Button>
            </div>
        </div>
    </section>
</template>
