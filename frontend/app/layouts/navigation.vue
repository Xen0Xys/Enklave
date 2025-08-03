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
                <header
                    class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger class="-ml-1" />
                    <Separator orientation="vertical" class="mr-2 max-h-6" />
                    <h3>Enklave</h3>
                </header>
                <div class="flex w-full grow flex-col p-2">
                    <slot />
                </div>
            </SidebarInset>
        </SidebarProvider>
    </default>
</template>

<style scoped></style>
