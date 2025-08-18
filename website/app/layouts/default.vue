<script setup lang="ts"></script>

<template>
    <div class="flex min-h-screen flex-col">
        <header
            class="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
            <div class="flex h-14 w-full px-10">
                <NuxtLink to="/" class="mr-6 flex items-center space-x-2">
                    <span class="font-bold">Enklave</span>
                </NuxtLink>
                <nav class="flex items-center space-x-6 text-sm font-medium">
                    <NuxtLink to="/#features">Features</NuxtLink>
                    <NuxtLink to="/#pricing">Pricing</NuxtLink>
                    <NuxtLink to="/#newsletter">Newsletter</NuxtLink>
                </nav>
                <div class="flex flex-1 items-center justify-end space-x-4">
                    <Button as-child>
                        <a href="https://app.enklave.cloud">Go to App</a>
                    </Button>
                </div>
            </div>
        </header>
        <main class="flex-1">
            <slot />
        </main>
        <footer class="border-t py-6 md:py-0">
            <div
                class="container flex flex-col items-center justify-between gap-4 px-10 md:h-24 md:flex-row">
                <p class="text-muted-foreground text-sm">
                    © {{ new Date().getFullYear() }} Enklave. All rights
                    reserved.
                </p>
            </div>
        </footer>
    </div>
</template>
