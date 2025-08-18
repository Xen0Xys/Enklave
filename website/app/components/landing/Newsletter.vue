<script setup lang="ts"></script>

<template>
    <section id="newsletter" class="bg-secondary py-20">
        <div
            class="flex w-full flex-col items-center justify-center px-10 text-center">
            <h2 class="text-3xl font-bold">Stay informed</h2>
            <p class="text-muted-foreground mt-2">
                Sign up for our newsletter to receive the latest news and
                updates.
            </p>
            <div class="mt-6 flex w-xl">
                <Input
                    type="email"
                    placeholder="Your email address"
                    class="flex-1" />
                <Button class="ml-2">Subscribe</Button>
            </div>
        </div>
    </section>
</template>
