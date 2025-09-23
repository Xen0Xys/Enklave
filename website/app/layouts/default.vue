<script setup lang="ts">
import "vue-sonner/style.css";
</script>

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
                            :aria-label="$t('nav.openMenu')">
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
                                ><span>{{
                                    $t("nav.features")
                                }}</span></SheetClose
                            ></NuxtLink
                        >
                        <NuxtLink to="/#pricing"
                            ><SheetClose as-child
                                ><span>{{
                                    $t("nav.pricing")
                                }}</span></SheetClose
                            ></NuxtLink
                        >
                        <NuxtLink to="/#newsletter"
                            ><SheetClose as-child
                                ><span>{{
                                    $t("nav.newsletter")
                                }}</span></SheetClose
                            ></NuxtLink
                        >
                        <NuxtLink to="/whats-new"
                            ><SheetClose as-child
                                ><span>{{
                                    $t("nav.whatsNew")
                                }}</span></SheetClose
                            ></NuxtLink
                        >
                        <NuxtLink to="/contact"
                            ><SheetClose as-child
                                ><span>{{
                                    $t("nav.contact")
                                }}</span></SheetClose
                            ></NuxtLink
                        >
                        <SheetClose as-child>
                            <Button as-child class="mt-4 w-full">
                                <a
                                    href="https://app.enklave.cloud"
                                    :aria-label="$t('nav.accessApp')"
                                    >{{ $t("nav.goToApp") }}</a
                                >
                            </Button>
                        </SheetClose>
                    </SheetContent>
                </Sheet>
                <nav
                    class="hidden items-center space-x-6 text-sm font-medium md:flex">
                    <NuxtLink to="/#features">{{
                        $t("nav.features")
                    }}</NuxtLink>
                    <NuxtLink to="/#pricing">{{ $t("nav.pricing") }}</NuxtLink>
                    <NuxtLink to="/#newsletter">{{
                        $t("nav.newsletter")
                    }}</NuxtLink>
                    <NuxtLink to="/whats-new">{{
                        $t("nav.whatsNew")
                    }}</NuxtLink>
                    <NuxtLink to="/contact">{{ $t("nav.contact") }}</NuxtLink>
                </nav>
                <div class="flex flex-1 items-center justify-end space-x-4">
                    <LanguageSwitcher />
                    <Button as-child>
                        <a
                            href="https://app.enklave.cloud"
                            :aria-label="$t('nav.accessApp')"
                            >{{ $t("nav.goToApp") }}</a
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
                    © {{ new Date().getFullYear() }} Enklave.
                    {{ $t("footer.copyright") }}
                </p>
                <nav class="flex gap-4 text-sm">
                    <NuxtLink
                        to="/terms-of-use"
                        class="text-muted-foreground hover:text-foreground transition-colors">
                        {{ $t("footer.termsOfUse") }}
                    </NuxtLink>
                    <NuxtLink
                        to="/terms-of-sale"
                        class="text-muted-foreground hover:text-foreground transition-colors">
                        {{ $t("footer.termsOfSale") }}
                    </NuxtLink>
                </nav>
            </div>
        </footer>
        <ClientOnly>
            <Toaster />
        </ClientOnly>
    </div>
</template>

<style scoped></style>
