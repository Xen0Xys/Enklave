<script setup lang="ts">
defineProps<{
    error: {
        statusCode: number;
        statusMessage: string;
        message: string;
    };
}>();

useSeoMeta({
    title: "Page Not Found - Enklave",
    description:
        "The page you're looking for doesn't exist. Return to Enklave homepage to explore our secure password manager and digital vault features.",
    robots: "noindex, nofollow",
});

const handleError = () => clearError({redirect: "/"});
</script>

<template>
    <div class="flex min-h-screen flex-col items-center justify-center px-4">
        <div class="text-center">
            <h1 class="mb-4 text-6xl font-bold text-gray-900 dark:text-white">
                {{ error.statusCode }}
            </h1>
            <h2
                class="mb-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">
                {{ error.statusMessage || "Page Not Found" }}
            </h2>
            <p class="mb-8 max-w-md text-gray-600 dark:text-gray-400">
                {{
                    error.message ||
                    "The page you're looking for doesn't exist or has been moved."
                }}
            </p>
            <div class="space-x-4">
                <Button @click="handleError"> Return Home </Button>
                <Button variant="outline" @click="$router.go(-1)">
                    Go Back
                </Button>
            </div>
        </div>
    </div>
</template>
