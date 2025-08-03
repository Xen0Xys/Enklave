<script setup lang="ts">
const isOpen = ref(false);
const navigation = [
    {name: "Home", href: "#"},
    {name: "Features", href: "#"},
    {name: "Pricing", href: "#"},
    {name: "About", href: "#"},
];
</script>
<template>
    <section class="relative flex w-full items-center bg-white p-4">
        <div class="container w-full px-4 md:px-6 lg:px-8">
            <nav class="flex items-center justify-between">
                <div class="flex items-center gap-8">
                    <span class="text-2xl font-bold">Logo</span>
                    <!-- Navigation pour le bureau -->
                    <div class="hidden items-center gap-8 md:flex">
                        <a
                            v-for="item in navigation"
                            :key="item.name"
                            :href="item.href"
                            class="text-gray-600 hover:text-gray-900">
                            {{ item.name }}
                        </a>
                    </div>
                </div>

                <div class="hidden md:flex">
                    <Button>Sign In</Button>
                </div>

                <div class="md:hidden">
                    <Button variant="ghost" @click="isOpen = !isOpen">
                        <Icon
                            name="iconoir:menu"
                            v-if="!isOpen"
                            class="h-6 w-6"></Icon>
                        <Icon name="iconoir:xmark" v-else class="size-6"></Icon>
                    </Button>
                </div>
            </nav>
            <div
                v-if="isOpen"
                class="absolute top-full left-0 w-full border-b border-gray-200 bg-white py-4 md:hidden">
                <div class="container mx-auto px-4">
                    <div class="flex flex-col space-y-4">
                        <a
                            v-for="item in navigation"
                            :key="item.name"
                            :href="item.href"
                            class="text-gray-600 hover:text-gray-900">
                            {{ item.name }}
                        </a>
                        <Button class="w-full">Sign In</Button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped></style>
