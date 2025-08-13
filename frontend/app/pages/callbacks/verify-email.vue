<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {useUserStore} from "~/stores/user.store";
import {onMounted, ref} from "vue";
import {toast} from "vue-sonner";
import {Button} from "~/components/ui/button";

definePageMeta({
    layout: "default",
});

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const verificationStatus = ref("Verifying your email...");
const showRetryButton = ref(false);

async function handleVerification() {
    showRetryButton.value = false;
    verificationStatus.value = "Verifying your email...";
    const token = route.query.token as string;
    if (token) {
        try {
            const verified = await userStore.verifyEmail(token);
            if (verified) {
                await router.push("/auth/login");
                return;
            } else {
                verificationStatus.value =
                    "Email verification failed. Please try again.";
                showRetryButton.value = true;
            }
        } catch (e: any) {
            verificationStatus.value =
                e.data?.message || e.message || "Email verification failed.";
            showRetryButton.value = true;
            toast.error("Email verification failed.", {
                description:
                    e.data?.message ||
                    e.message ||
                    "An unknown error occurred.",
            });
        }
    } else {
        verificationStatus.value = "No verification token found.";
        toast.error("No verification token found.");
        showRetryButton.value = true;
    }
}

onMounted(handleVerification);
</script>

<template>
    <div class="flex grow items-center justify-center">
        <div class="text-center">
            <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">
                Email Verification
            </h1>
            <p class="text-muted-foreground mt-4">
                {{ verificationStatus }}
            </p>
            <div class="mt-6 flex justify-center gap-4">
                <Button v-if="showRetryButton" @click="handleVerification">
                    Retry
                </Button>
                <Button
                    v-if="!verificationStatus.includes('successfully')"
                    as-child
                    variant="ghost">
                    <NuxtLink to="/auth/login"> Back to login </NuxtLink>
                </Button>
            </div>
        </div>
    </div>
</template>
