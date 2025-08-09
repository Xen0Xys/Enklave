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

const avatarUrl = computed(() => {
    return userStore.user.avatarId
        ? `${runtimeConfig.public.apiBase}/users/avatar/${userStore.user.avatarId}`
        : "";
});

async function updateUsername() {
    if (newUsername.value.length < 3) {
        return toast.error(
            "Le nom d'utilisateur doit contenir au moins 3 caractères.",
        );
    }
    await userStore.updateUsername(newUsername.value);
}

async function updatePassword() {
    if (newPassword.value !== newPasswordConfirmation.value) {
        return toast.error("Les nouveaux mots de passe ne correspondent pas.");
    }
    if (newPassword.value.length < 8) {
        return toast.error(
            "Le nouveau mot de passe doit contenir au moins 8 caractères.",
        );
    }
    await userStore.updatePassword(currentPassword.value, newPassword.value);
    currentPassword.value = "";
    newPassword.value = "";
    newPasswordConfirmation.value = "";
}

async function onAvatarChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    await userStore.uploadAvatar(formData);
}
</script>

<template>
    <div class="container mx-auto flex flex-col gap-4">
        <h1 class="text-3xl font-bold">Paramètres</h1>
        <Card>
            <CardHeader>
                <CardTitle>Profil</CardTitle>
                <CardDescription>
                    Gérez les informations de votre profil.
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
                            <Button as="span">Changer l'avatar</Button>
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
                        <Label for="username">Nom d'utilisateur</Label>
                        <Input id="username" v-model="newUsername" />
                    </div>
                    <Button type="submit">Enregistrer les modifications</Button>
                </form>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Sécurité</CardTitle>
                <CardDescription
                    >Gérez les paramètres de sécurité de votre
                    compte.</CardDescription
                >
            </CardHeader>
            <CardContent>
                <form class="space-y-4" @submit.prevent="updatePassword">
                    <div class="space-y-2">
                        <Label for="current-password"
                            >Mot de passe actuel</Label
                        >
                        <Input
                            id="current-password"
                            type="password"
                            v-model="currentPassword" />
                    </div>
                    <div class="space-y-2">
                        <Label for="new-password">Nouveau mot de passe</Label>
                        <Input
                            id="new-password"
                            type="password"
                            v-model="newPassword" />
                    </div>
                    <div class="space-y-2">
                        <Label for="new-password-confirmation"
                            >Confirmer le nouveau mot de passe</Label
                        >
                        <Input
                            id="new-password-confirmation"
                            type="password"
                            v-model="newPasswordConfirmation" />
                    </div>
                    <Button type="submit">Changer le mot de passe</Button>
                </form>
            </CardContent>
        </Card>
    </div>
</template>
