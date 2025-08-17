<script setup lang="ts">
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";
import {useSidebar} from "~/components/ui/sidebar";

const userStore = useUserStore();
const user = computed(() => userStore.user);
const runtimeConfig = useRuntimeConfig();

const avatarUrl = computed(() => {
    return user.value?.avatarId
        ? `${runtimeConfig.public.apiBase}/users/avatar/${user.value.avatarId}`
        : "";
});

const {isMobile} = useSidebar();
</script>

<template>
    <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <SidebarMenuButton
                        size="lg"
                        class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                        <Avatar class="h-8 w-8 rounded-lg">
                            <AvatarImage
                                v-if="avatarUrl"
                                :src="avatarUrl"
                                :alt="user?.username" />
                            <AvatarFallback class="rounded-lg">
                                {{ user?.username?.charAt(0).toUpperCase() }}
                            </AvatarFallback>
                        </Avatar>
                        <div
                            class="grid flex-1 text-left text-sm leading-tight">
                            <span class="truncate font-semibold">{{
                                user?.username
                            }}</span>
                            <span class="truncate text-xs">{{
                                user?.email
                            }}</span>
                        </div>
                        <Icon
                            name="iconoir:arrow-separate-vertical"
                            class="ml-auto size-4" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    :side="isMobile ? 'bottom' : 'right'"
                    align="end"
                    :side-offset="4">
                    <DropdownMenuLabel class="p-0 font-normal">
                        <div
                            class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar class="h-8 w-8 rounded-lg">
                                <AvatarImage
                                    v-if="avatarUrl"
                                    :src="avatarUrl"
                                    :alt="user?.username" />
                                <AvatarFallback class="rounded-lg">
                                    {{
                                        user?.username?.charAt(0).toUpperCase()
                                    }}
                                </AvatarFallback>
                            </Avatar>
                            <div
                                class="grid flex-1 text-left text-sm leading-tight">
                                <span class="truncate font-semibold">{{
                                    user?.username
                                }}</span>
                                <span class="truncate text-xs">{{
                                    user?.email
                                }}</span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Icon name="iconoir:sparks" />
                            Upgrade to Pro
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <NuxtLink to="/settings">
                            <DropdownMenuItem>
                                <Icon name="iconoir:settings" />
                                Settings
                            </DropdownMenuItem>
                        </NuxtLink>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem @click="userStore.logout()">
                        <Icon name="iconoir:log-out" />
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
</template>

<style scoped></style>
