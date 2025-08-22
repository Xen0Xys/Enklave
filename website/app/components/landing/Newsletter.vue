<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import {landingConfig} from "~/config/landing";
import {ref} from "vue";

const email = ref("");
const isLoading = ref(false);
const isSubscribed = ref(false);
const error = ref("");

const subscribe = async () => {
    if (!email.value) return;
    
    isLoading.value = true;
    error.value = "";
    
    try {
        await useEnklaveApi("/newsletter/subscribe", "POST", {
            body: { email: email.value }
        });
        isSubscribed.value = true;
        email.value = "";
    } catch (err: any) {
        error.value = err.message || "Failed to subscribe. Please try again.";
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
            
            <div v-if="isSubscribed" class="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
                <p class="font-medium">✓ Successfully subscribed!</p>
                <p class="text-sm">Thank you for subscribing to our newsletter.</p>
            </div>
            
            <div v-else class="mt-6 w-full max-w-md">
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
                
                <p v-if="error" class="mt-2 text-sm text-red-600">
                    {{ error }}
                </p>
            </div>
        </div>
    </section>
</template>
