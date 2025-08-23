<script setup lang="ts">
import {toast} from "vue-sonner";

definePageMeta({
    layout: "default",
});

useSeoMeta({
    title: "Unsubscribe from Newsletter - Enklave",
    description:
        "Unsubscribe from Enklave newsletter updates. We're sorry to see you go, but you can easily unsubscribe from our mailing list here.",
    ogTitle: "Unsubscribe from Newsletter - Enklave",
    ogDescription:
        "Unsubscribe from Enklave newsletter updates. We're sorry to see you go, but you can easily unsubscribe from our mailing list here.",
    ogUrl: "https://enklave.cloud/unsubscribe",
    robots: "noindex, nofollow", // Don't index unsubscribe pages
});

const route = useRoute();
const email = ref("");
const isLoading = ref(false);
const isUnsubscribed = ref(false);

// Get email from query parameter if provided
onMounted(() => {
    if (route.query.email && typeof route.query.email === "string") {
        email.value = decodeURIComponent(route.query.email);
    }
});

const unsubscribe = async () => {
    if (!email.value) {
        toast.error("Email required", {
            description: "Please enter your email address to unsubscribe.",
        });
        return;
    }

    isLoading.value = true;

    try {
        await useEnklaveApi("/newsletter/unsubscribe", "DELETE", {
            body: {email: email.value},
        });
        toast.success("Successfully unsubscribed!", {
            description: "You have been removed from our newsletter list.",
        });
        isUnsubscribed.value = true;
        email.value = "";
    } catch (err: any) {
        toast.error("Unsubscribe failed", {
            description:
                err.message ||
                "Failed to unsubscribe. Please try again or contact support.",
        });
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="container mx-auto max-w-2xl px-4 py-16">
        <div class="mb-12 text-center">
            <h1 class="mb-4 text-4xl font-bold tracking-tight">
                Unsubscribe from Newsletter
            </h1>
            <p class="text-muted-foreground text-lg">
                We're sorry to see you go. Enter your email address below to
                unsubscribe from our newsletter.
            </p>
        </div>

        <div v-if="isUnsubscribed" class="text-center">
            <div
                class="mb-8 rounded-lg border border-green-200 bg-green-50 p-6 text-green-800">
                <h2 class="mb-2 text-lg font-semibold">
                    ✓ Unsubscribed Successfully
                </h2>
                <p>
                    You have been removed from our newsletter list. You will no
                    longer receive updates from us.
                </p>
            </div>
            <Button as-child>
                <NuxtLink to="/">Return to Homepage</NuxtLink>
            </Button>
        </div>

        <form v-else @submit.prevent="unsubscribe" class="space-y-6">
            <div>
                <label for="email" class="mb-2 block text-sm font-medium">
                    Email Address *
                </label>
                <Input
                    id="email"
                    v-model="email"
                    type="email"
                    required
                    :disabled="isLoading"
                    placeholder="your.email@example.com"
                    class="w-full" />
            </div>

            <div class="flex justify-center space-x-4">
                <Button
                    type="submit"
                    :disabled="isLoading || !email"
                    variant="destructive"
                    class="px-8">
                    {{ isLoading ? "Unsubscribing..." : "Unsubscribe" }}
                </Button>
                <Button as-child variant="outline">
                    <NuxtLink to="/">Cancel</NuxtLink>
                </Button>
            </div>
        </form>

        <div class="text-muted-foreground mt-8 text-center text-sm">
            <p>
                If you have any issues unsubscribing, please
                <NuxtLink to="/contact" class="text-primary hover:underline"
                    >contact our support team</NuxtLink
                >.
            </p>
        </div>
    </div>
</template>
