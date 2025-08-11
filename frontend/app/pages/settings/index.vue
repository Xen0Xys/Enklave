<script setup lang="ts">
import {ref} from "vue";
import {useUserStore} from "~/stores/user.store";
import {toast} from "vue-sonner";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Avatar, AvatarImage} from "@/components/ui/avatar";

definePageMeta({
    layout: "navigation",
});

const userStore = useUserStore();

const newUsername = ref(userStore.user?.username ?? "");
const currentPassword = ref("");
const newPassword = ref("");
const newPasswordConfirmation = ref("");
const runtimeConfig = useRuntimeConfig();

const isUpdatingUsername = ref(false);
const isUpdatingPassword = ref(false);
const isUploadingAvatar = ref(false);

const avatarUrl = computed(() => {
    return userStore.user.avatarId
        ? `${runtimeConfig.public.apiBase}/users/avatar/${userStore.user.avatarId}`
        : "";
});

async function updateUsername() {
    if (newUsername.value.length < 3)
        return toast.error("Username must be at least 3 characters long.");
    try {
        await userStore.updateUsername(newUsername.value);
    } finally {
        isUpdatingUsername.value = false;
    }
}

async function updatePassword() {
    if (newPassword.value !== newPasswordConfirmation.value)
        return toast.error("The new passwords do not match.");
    if (newPassword.value.length < 8)
        return toast.error(
            "The new password must be at least 8 characters long.",
        );
    isUpdatingPassword.value = true;
    try {
        await userStore.updatePassword(
            currentPassword.value,
            newPassword.value,
        );
        currentPassword.value = "";
        newPassword.value = "";
        newPasswordConfirmation.value = "";
    } finally {
        isUpdatingPassword.value = false;
    }
}

async function onAvatarChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    isUploadingAvatar.value = true;
    try {
        await userStore.uploadAvatar(formData);
    } finally {
        isUploadingAvatar.value = false;
    }
}
</script>

<template>
    <div class="container mx-auto flex flex-col gap-4">
        <h1 class="text-3xl font-bold">Settings</h1>
        <Card>
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                    Manage your profile information.
                </CardDescription>
            </CardHeader>
            <CardContent class="space-y-6">
                <div class="flex items-center gap-4">
                    <Avatar class="h-20 w-20">
                        <AvatarImage :src="avatarUrl" alt="Avatar" />
                        <AvatarFallback>
                            {{
                                userStore.user?.username
                                    ?.charAt(0)
                                    .toUpperCase()
                            }}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <Label for="avatar-upload" class="cursor-pointer">
                            <Button as="span" :disabled="isUploadingAvatar"
                                >Change avatar</Button
                            >
                        </Label>
                        <input
                            id="avatar-upload"
                            type="file"
                            class="hidden"
                            accept="image/*"
                            @change="onAvatarChange" />
                    </div>
                </div>
                <form class="space-y-4" @submit.prevent="updateUsername">
                    <div class="space-y-2">
                        <Label for="username">Username</Label>
                        <Input id="username" v-model="newUsername" />
                    </div>
                    <Button type="submit" :disabled="isUpdatingUsername"
                        >Save changes</Button
                    >
                </form>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription
                    >Manage your account's security settings.</CardDescription
                >
            </CardHeader>
            <CardContent>
                <form class="space-y-4" @submit.prevent="updatePassword">
                    <div class="space-y-2">
                        <Label for="current-password">Current password</Label>
                        <Input
                            id="current-password"
                            type="password"
                            v-model="currentPassword" />
                    </div>
                    <div class="space-y-2">
                        <Label for="new-password">New password</Label>
                        <Input
                            id="new-password"
                            type="password"
                            v-model="newPassword" />
                    </div>
                    <div class="space-y-2">
                        <Label for="new-password-confirmation"
                            >Confirm new password</Label
                        >
                        <Input
                            id="new-password-confirmation"
                            type="password"
                            v-model="newPasswordConfirmation" />
                    </div>
                    <Button type="submit" :disabled="isUpdatingPassword"
                        >Change password</Button
                    >
                </form>
            </CardContent>
        </Card>
    </div>
</template>
