<script setup lang="ts">
import {Toaster} from "@/components/ui/sonner";
import "vue-sonner/style.css";
import {onMounted} from "vue";
import {useUserStore} from "~/stores/user.store";

onMounted(() => {
    const userStore = useUserStore();
    userStore.fetchCurrentUser();
});
</script>

<template>
    <NuxtLoadingIndicator />
    <Toaster richColors close-button />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
