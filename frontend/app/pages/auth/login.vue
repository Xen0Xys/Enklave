<script setup lang="ts">
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input";
import {ref} from "vue";
import {useUserStore} from "~/stores/user.store";

definePageMeta({
    layout: "default",
});

const email = ref("");
const password = ref("");
const userStore = useUserStore();

function onSubmit(e: Event) {
    e.preventDefault();
    userStore.login(email.value, password.value);
}
</script>

<template>
    <div class="flex grow items-center justify-between">
        <div class="flex w-full items-center justify-center md:w-1/2">
            <div class="w-full max-w-[330px] px-5">
                <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">
                    Log in
                </h1>
                <p class="text-muted-foreground mt-1">
                    Enter your email & password to log in.
                </p>

                <form class="mt-10" @submit="onSubmit">
                    <fieldset class="grid gap-5">
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
                            <Button class="w-full" type="submit">
                                Log in
                            </Button>
                        </div>
                    </fieldset>
                </form>
                <p class="mt-8 text-sm">
                    <NuxtLink
                        class="text-primary font-semibold underline-offset-2 hover:underline"
                        to="#"
                        >Forgot password?</NuxtLink
                    >
                </p>
                <p class="text-muted-foreground mt-4 text-sm">
                    Don't have an account?
                    <NuxtLink
                        class="text-primary font-semibold underline-offset-2 hover:underline"
                        to="/auth/register"
                        >Create account</NuxtLink
                    >
                </p>
            </div>
        </div>
        <div class="hidden h-screen md:block md:w-1/2 lg:w-1/2">
            <img
                src="/images/auth-background.webp"
                alt="Login form image"
                class="size-full object-cover" />
        </div>
    </div>
</template>

<style scoped></style>
