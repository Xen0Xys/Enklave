<script setup lang="ts">
import {Sidebar, SidebarContent} from "~/components/ui/sidebar";

const pathname = useRoute().path;
const isActiveFunction = (path: string) => {
    return pathname === path;
};

const config = useRuntimeConfig();
const version = computed(() => {
    console.log("App version:", config.public.appVersion);
    return config.public.appVersion;
});
</script>

<template>
    <Sidebar>
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <div>
                            <div
                                class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                <Icon name="iconoir:apple-shortcuts"></Icon>
                            </div>
                            <div class="flex flex-col gap-0.5 leading-none">
                                <span class="font-semibold">Enklave</span>
                                <span>{{ version }}</span>
                            </div>
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Menu</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                as-child
                                :is-active="isActiveFunction('/')">
                                <NuxtLink to="/">
                                    <Icon name="iconoir:home"></Icon>
                                    <span>Dashboard</span>
                                </NuxtLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <SidebarUser />
        </SidebarFooter>
    </Sidebar>
</template>

<style scoped></style>
