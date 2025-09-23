<script setup lang="ts">
import {toast} from "vue-sonner";

const email = ref("");
const isLoading = ref(false);

// Make newsletter content optional to avoid server errors
const recentPosts = ref([]);

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
        class="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 px-6 py-24 text-white">
        <!-- Background decoration -->
        <div class="absolute inset-0 bg-gray-900 opacity-20"></div>

        <!-- Floating elements -->
        <div
            class="absolute top-10 left-10 h-20 w-20 animate-pulse rounded-full bg-white/10 blur-xl"></div>
        <div
            class="absolute right-10 bottom-10 h-32 w-32 animate-pulse rounded-full bg-purple-500/20 blur-xl"
            style="animation-delay: 2s"></div>
        <div
            class="absolute top-1/2 right-1/4 h-16 w-16 animate-pulse rounded-full bg-blue-500/20 blur-xl"
            style="animation-delay: 4s"></div>

        <div class="relative z-10 container mx-auto max-w-4xl text-center">
            <!-- Icon -->
            <div class="mb-8">
                <div
                    class="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                    <Icon name="iconoir:community" class="size-8 text-white" />
                </div>
            </div>

            <!-- Heading -->
            <h2 class="mb-6 text-4xl font-bold md:text-5xl">
                {{ $t("newsletter.title") }}
            </h2>
            <p
                class="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-blue-100 md:text-2xl">
                {{ $t("newsletter.description") }}
            </p>

            <!-- Features grid -->
            <div class="mx-auto mb-8 grid max-w-3xl gap-4 md:grid-cols-2">
                <div
                    v-for="(feature, index) in $t('newsletter.features')"
                    :key="index"
                    class="flex items-center rounded-lg bg-white/10 p-4 text-left backdrop-blur-sm">
                    <Icon
                        name="iconoir:check-circle"
                        class="mr-3 size-5 flex-shrink-0 text-green-400" />
                    <span class="text-purple-100">{{ feature }}</span>
                </div>
            </div>

            <!-- Recent newsletter content -->
            <div
                v-if="recentPosts && recentPosts.length > 0"
                class="mx-auto mt-16 max-w-4xl">
                <h3 class="mb-8 text-center text-2xl font-semibold text-white">
                    Recent Newsletter Articles
                </h3>
                <div class="grid gap-6 md:grid-cols-3">
                    <div
                        v-for="post in recentPosts"
                        :key="post._path"
                        class="rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all duration-200 hover:bg-white/20">
                        <div class="mb-3 flex items-center justify-between">
                            <span
                                class="rounded-full bg-purple-500/30 px-3 py-1 text-xs font-medium text-purple-100">
                                {{ post.category }}
                            </span>
                            <time class="text-xs text-blue-200">
                                {{ new Date(post.date).toLocaleDateString() }}
                            </time>
                        </div>
                        <h4 class="mb-2 font-semibold text-white">
                            {{ post.title }}
                        </h4>
                        <p class="text-sm text-blue-100">
                            {{ post.description }}
                        </p>
                        <NuxtLink
                            :to="`/newsletter${post._path}`"
                            class="mt-4 inline-flex items-center text-sm font-medium text-purple-300 hover:text-purple-200">
                            Read more
                            <Icon
                                name="iconoir:arrow-right"
                                class="ml-1 size-3" />
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <!-- Newsletter form -->
            <div class="mx-auto max-w-lg">
                <div
                    class="rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-sm">
                    <div class="flex flex-col gap-2 sm:flex-row">
                        <Input
                            v-model="email"
                            type="email"
                            :placeholder="$t('newsletter.placeholder')"
                            class="flex-1 border-0 bg-white/90 text-gray-900 backdrop-blur-sm transition-all duration-200 placeholder:text-gray-500 focus:bg-white"
                            :disabled="isLoading"
                            @keyup.enter="subscribe" />
                        <Button
                            class="transform border-0 bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-purple-700 hover:to-blue-700 hover:shadow-xl"
                            :disabled="isLoading || !email"
                            @click="subscribe">
                            <Icon
                                v-if="isLoading"
                                name="iconoir:loading-clock"
                                class="mr-2 size-4 animate-spin" />
                            <Icon
                                v-else
                                name="iconoir:send"
                                class="mr-2 size-4" />
                            {{
                                isLoading
                                    ? "Subscribing..."
                                    : $t("newsletter.cta")
                            }}
                        </Button>
                    </div>
                </div>

                <!-- Trust indicators -->
                <div
                    class="mt-8 flex items-center justify-center gap-6 text-sm text-blue-200">
                    <div class="flex items-center gap-2">
                        <Icon name="iconoir:group" class="size-4" />
                        <span
                            >5,200+
                            {{ $t("newsletter.stats.families") }}</span
                        >
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon name="iconoir:calendar" class="size-4" />
                        <span>{{ $t("newsletter.stats.frequency") }}</span>
                    </div>
                </div>
            </div>

            <!-- Additional info -->
            <div
                class="mt-16 grid grid-cols-1 gap-8 text-center md:grid-cols-3">
                <div class="space-y-2">
                    <div class="text-3xl font-bold text-blue-300">
                        5,200+
                    </div>
                    <div class="text-blue-200">
                        {{ $t("newsletter.stats.familySubscribers") }}
                    </div>
                </div>
                <div class="space-y-2">
                    <div class="text-3xl font-bold text-purple-300">
                        Monthly
                    </div>
                    <div class="text-blue-200">
                        {{ $t("newsletter.stats.organizationTips") }}
                    </div>
                </div>
                <div class="space-y-2">
                    <div class="text-3xl font-bold text-teal-300">
                        Early
                    </div>
                    <div class="text-blue-200">
                        {{ $t("newsletter.stats.featureAccess") }}
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
@keyframes pulse {
    0%,
    100% {
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
