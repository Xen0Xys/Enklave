<script setup lang="ts">
import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import Default from "~/layouts/default.vue";
import EnklaveSidebar from "~/components/sidebar/EnklaveSidebar.vue";
import {Separator} from "~/components/ui/separator";

const defaultOpen = useCookie<boolean>("sidebar_state");
</script>

<template>
    <default>
        <SidebarProvider :defaultOpen="defaultOpen">
            <EnklaveSidebar />
            <SidebarInset>
                <div class="flex h-full flex-col">
                    <header
                        class="bg-background flex h-16 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger class="-ml-1" />
                        <Separator
                            orientation="vertical"
                            class="mr-2 max-h-6" />
                        <h3>Enklave</h3>
                    </header>
                    <div class="flex flex-1 flex-col overflow-y-auto p-4">
                        <slot />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    </default>
</template>

<style scoped></style>
