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
        class="relative py-24 px-6 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        
        <!-- Background decoration -->
        <div class="absolute inset-0 bg-gray-900 opacity-20"></div>
        
        <!-- Floating elements -->
        <div class="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div class="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse" style="animation-delay: 2s;"></div>
        <div class="absolute top-1/2 right-1/4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse" style="animation-delay: 4s;"></div>
        
        <div class="container mx-auto max-w-4xl text-center relative z-10">
            <!-- Icon -->
            <div class="mb-8">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <Icon name="iconoir:mail" class="size-8 text-white" />
                </div>
            </div>
            
            <!-- Heading -->
            <h2 class="text-4xl md:text-5xl font-bold mb-6">
                {{ landingConfig.newsletter.title }}
            </h2>
            <p class="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                {{ landingConfig.newsletter.description }}
            </p>

            <!-- Newsletter form -->
            <div class="max-w-lg mx-auto">
                <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
                    <div class="flex flex-col sm:flex-row gap-2">
                        <Input
                            v-model="email"
                            type="email"
                            :placeholder="landingConfig.newsletter.placeholder"
                            class="flex-1 bg-white/90 backdrop-blur-sm border-0 text-gray-900 placeholder:text-gray-500 focus:bg-white transition-all duration-200"
                            :disabled="isLoading"
                            @keyup.enter="subscribe" />
                        <Button
                            class="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-0"
                            :disabled="isLoading || !email"
                            @click="subscribe">
                            <Icon v-if="isLoading" name="iconoir:loading-clock" class="size-4 mr-2 animate-spin" />
                            <Icon v-else name="iconoir:send" class="size-4 mr-2" />
                            {{ isLoading ? "Subscribing..." : landingConfig.newsletter.cta }}
                        </Button>
                    </div>
                </div>
                
                <!-- Trust indicators -->
                <div class="flex justify-center items-center gap-6 mt-8 text-sm text-blue-200">
                    <div class="flex items-center gap-2">
                        <Icon name="iconoir:shield-check" class="size-4" />
                        <span>No spam, ever</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon name="iconoir:mouse-button-left" class="size-4" />
                        <span>One-click unsubscribe</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon name="iconoir:calendar" class="size-4" />
                        <span>Monthly updates</span>
                    </div>
                </div>
            </div>
            
            <!-- Additional info -->
            <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div class="space-y-2">
                    <div class="text-3xl font-bold text-blue-300">5K+</div>
                    <div class="text-blue-200">Active subscribers</div>
                </div>
                <div class="space-y-2">
                    <div class="text-3xl font-bold text-purple-300">Monthly</div>
                    <div class="text-blue-200">Security insights</div>
                </div>
                <div class="space-y-2">
                    <div class="text-3xl font-bold text-teal-300">Latest</div>
                    <div class="text-blue-200">Feature updates</div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
@keyframes pulse {
    0%, 100% {
        opacity: 0.4;
    }
    50% {
        opacity: 0.8;
    }
}

.animate-pulse {
    animation: pulse 3s ease-in-out infinite;
}
</style>
