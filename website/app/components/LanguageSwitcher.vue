<script setup lang="ts">
import {useI18n} from "#i18n";
import {Button} from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";

const {locale, locales} = useI18n();
const switchLocalePath = useSwitchLocalePath();

// Get available locales (excluding current)
const availableLocales = computed(() => {
    return locales.value.filter((i) => i.code !== locale.value);
});
</script>

<template>
    <Sheet>
        <SheetTrigger as-child>
            <Button variant="ghost" size="sm" class="gap-2">
                <Icon name="iconoir:language" class="h-4 w-4" />
                <span class="sr-only sm:not-sr-only">{{
                    $t(`language.current`, {lang: locale})
                }}</span>
                <span class="hidden sm:inline">{{ locale.toUpperCase() }}</span>
            </Button>
        </SheetTrigger>
        <SheetContent side="right" class="w-64">
            <div class="space-y-4 pt-6">
                <h3 class="text-lg font-semibold">
                    {{ $t("language.current", {lang: locale}) }}
                </h3>
                <div class="space-y-2">
                    <SheetClose
                        v-for="availableLocale in availableLocales"
                        :key="availableLocale.code"
                        as-child>
                        <NuxtLink
                            :to="switchLocalePath(availableLocale.code)"
                            :aria-label="
                                $t('language.switchTo', {
                                    lang: availableLocale.name,
                                })
                            "
                            class="hover:bg-muted flex w-full cursor-pointer items-center gap-2 rounded-md p-3 text-left transition-colors">
                            <Icon name="iconoir:language" class="h-4 w-4" />
                            <span>{{ availableLocale.name }}</span>
                        </NuxtLink>
                    </SheetClose>
                </div>
            </div>
        </SheetContent>
    </Sheet>
</template>
