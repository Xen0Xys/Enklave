<script setup lang="ts">
import {landingConfig} from "~/config/landing";
import {toast} from "vue-sonner";

const email = ref("");
const isLoading = ref(false);

const subscribe = async () => {
    if (!email.value) return;

    isLoading.value = true;

    try {
        await useEnklaveApi("/newsletter/subscribe", "POST", {
            body: {email: email.value},
        });
        toast.success("Successfully subscribed!", {
            description: "Thank you for subscribing to our newsletter.",
        });
        email.value = "";
    } catch (err: any) {
        toast.error("Subscription failed", {
            description:
                err.message || "Failed to subscribe. Please try again.",
        });
    } finally {
        isLoading.value = false;
    }
};
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

            <div class="mt-6 w-full max-w-md">
                <div class="flex">
                    <Input
                        v-model="email"
                        type="email"
                        :placeholder="landingConfig.newsletter.placeholder"
                        class="flex-1"
                        :disabled="isLoading"
                        @keyup.enter="subscribe" />
                    <Button
                        class="ml-2"
                        :disabled="isLoading || !email"
                        @click="subscribe">
                        {{ isLoading ? "..." : landingConfig.newsletter.cta }}
                    </Button>
                </div>
            </div>
        </div>
    </section>
</template>
