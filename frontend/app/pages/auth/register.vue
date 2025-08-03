<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input";
import {useUserStore} from "~/stores/user.store";

definePageMeta({
    layout: "default",
});

const username = ref("");
const email = ref("");
const password = ref("");
const loading = ref(false);
const userStore = useUserStore();
const router = useRouter();

async function onSubmit(e: Event) {
    e.preventDefault();
    loading.value = true;
    try {
        await userStore.register(username.value, email.value, password.value);
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="flex grow items-center justify-between">
        <div class="flex w-full items-center justify-center md:w-1/2">
            <div class="w-full max-w-[330px] px-5">
                <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">
                    Register
                </h1>
                <p class="text-muted-foreground mt-1">
                    Create your account to access the platform.
                </p>
                <form class="mt-10" @submit="onSubmit">
                    <fieldset class="grid gap-5">
                        <div class="grid w-full max-w-sm items-center gap-1.5">
                            <Label for="username">Username</Label>
                            <Input
                                label="Nom d'utilisateur"
                                type="text"
                                name="username"
                                placeholder="Your username"
                                v-model="username" />
                        </div>
                        <div class="grid w-full max-w-sm items-center gap-1.5">
                            <Label for="email">Email</Label>
                            <Input
                                label="Email"
                                type="email"
                                name="email"
                                placeholder="john@example.com"
                                v-model="email" />
                        </div>
                        <div class="grid w-full max-w-sm items-center gap-1.5">
                            <Label for="password">Password</Label>
                            <Input
                                label="Password"
                                type="password"
                                name="password"
                                v-model="password" />
                        </div>
                        <div>
                            <Button
                                class="w-full"
                                type="submit"
                                :disabled="loading">
                                Register
                            </Button>
                        </div>
                    </fieldset>
                </form>
                <p class="text-muted-foreground mt-4 text-sm">
                    Already have an account?
                    <NuxtLink
                        class="text-primary font-semibold underline-offset-2 hover:underline"
                        to="/auth/login"
                        >Log in</NuxtLink
                    >
                </p>
            </div>
        </div>
        <div class="hidden h-screen md:block md:w-1/2 lg:w-1/2">
            <img
                src="/images/auth-background.webp"
                alt="Register form image"
                class="size-full object-cover" />
        </div>
    </div>
</template>

<style scoped></style>
