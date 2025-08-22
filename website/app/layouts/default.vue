<script setup lang="ts"></script>

<template>
    <div class="flex min-h-screen flex-col">
        <header
            class="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
            <div class="flex h-14 w-full items-center px-4 md:px-10">
                <NuxtLink
                    to="/"
                    class="mr-6 hidden items-center space-x-2 md:flex">
                    <span class="font-bold">Enklave</span>
                </NuxtLink>
                <Sheet>
                    <SheetTrigger as-child>
                        <Button
                            variant="ghost"
                            size="icon"
                            class="md:hidden"
                            aria-label="Ouvrir le menu de navigation">
                            <Icon name="iconoir:menu" class="size-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" class="p-4">
                        <SheetHeader>
                            <SheetTitle class="border-b-0 pb-0"
                                >Enklave</SheetTitle
                            >
                        </SheetHeader>
                        <NuxtLink to="/#features"
                            ><SheetClose as-child
                                ><span>Features</span></SheetClose
                            ></NuxtLink
                        >
                        <NuxtLink to="/#pricing"
                            ><SheetClose as-child
                                ><span>Pricing</span></SheetClose
                            ></NuxtLink
                        >
                        <NuxtLink to="/#newsletter"
                            ><SheetClose as-child
                                ><span>Newsletter</span></SheetClose
                            ></NuxtLink
                        >
                        <NuxtLink to="/whats-new"
                            ><SheetClose as-child
                                ><span>What's New</span></SheetClose
                            ></NuxtLink
                        >
                        <NuxtLink to="/contact"
                            ><SheetClose as-child
                                ><span>Contact</span></SheetClose
                            ></NuxtLink
                        >
                        <SheetClose as-child>
                            <Button as-child class="mt-4 w-full">
                                <a
                                    href="https://app.enklave.cloud"
                                    aria-label="Accéder à l'application Enklave"
                                    >Go to App</a
                                >
                            </Button>
                        </SheetClose>
                    </SheetContent>
                </Sheet>
                <nav
                    class="hidden items-center space-x-6 text-sm font-medium md:flex">
                    <NuxtLink to="/#features">Features</NuxtLink>
                    <NuxtLink to="/#pricing">Pricing</NuxtLink>
                    <NuxtLink to="/#newsletter">Newsletter</NuxtLink>
                    <NuxtLink to="/whats-new">What's New</NuxtLink>
                    <NuxtLink to="/contact">Contact</NuxtLink>
                </nav>
                <div class="flex flex-1 items-center justify-end space-x-4">
                    <Button as-child>
                        <a
                            href="https://app.enklave.cloud"
                            aria-label="Accéder à l'application Enklave"
                            >Go to App</a
                        >
                    </Button>
                </div>
            </div>
        </header>
        <main class="flex-1">
            <slot />
        </main>
        <footer class="border-t py-6 md:py-0">
            <div
                class="container flex flex-col items-center justify-between gap-4 px-4 md:h-24 md:flex-row md:px-10">
                <p class="text-muted-foreground text-sm">
                    © {{ new Date().getFullYear() }} Enklave. All rights
                    reserved.
                </p>
            </div>
        </footer>
    </div>
</template>

<style scoped></style>
