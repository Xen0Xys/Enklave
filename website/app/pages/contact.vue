<script setup lang="ts">
import {ref} from "vue";
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import {Textarea} from "@/components/ui/textarea";

definePageMeta({
    layout: "default",
});

const form = ref({
    name: "",
    email: "",
    subject: "",
    message: "",
});

const isLoading = ref(false);
const isSubmitted = ref(false);
const error = ref("");

const submitForm = async () => {
    isLoading.value = true;
    error.value = "";
    
    try {
        await useEnklaveApi("/contact", "POST", {
            body: form.value
        });
        isSubmitted.value = true;
        form.value = {
            name: "",
            email: "",
            subject: "",
            message: "",
        };
    } catch (err: any) {
        error.value = err.message || "Failed to send message. Please try again.";
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="container mx-auto max-w-2xl px-4 py-16">
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
            <p class="text-muted-foreground text-lg">
                Have a question or need support? We'd love to hear from you.
            </p>
        </div>

        <div v-if="isSubmitted" class="rounded-lg border border-green-200 bg-green-50 p-6 text-green-800 mb-8">
            <h2 class="font-semibold text-lg mb-2">✓ Message Sent Successfully!</h2>
            <p>Thank you for contacting us. We'll get back to you as soon as possible.</p>
        </div>

        <form v-else @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label for="name" class="block text-sm font-medium mb-2">
                        Name *
                    </label>
                    <Input
                        id="name"
                        v-model="form.name"
                        type="text"
                        required
                        :disabled="isLoading"
                        placeholder="Your full name"
                        class="w-full" />
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium mb-2">
                        Email *
                    </label>
                    <Input
                        id="email"
                        v-model="form.email"
                        type="email"
                        required
                        :disabled="isLoading"
                        placeholder="your.email@example.com"
                        class="w-full" />
                </div>
            </div>

            <div>
                <label for="subject" class="block text-sm font-medium mb-2">
                    Subject *
                </label>
                <Input
                    id="subject"
                    v-model="form.subject"
                    type="text"
                    required
                    :disabled="isLoading"
                    placeholder="What is this regarding?"
                    class="w-full" />
            </div>

            <div>
                <label for="message" class="block text-sm font-medium mb-2">
                    Message *
                </label>
                <Textarea
                    id="message"
                    v-model="form.message"
                    required
                    :disabled="isLoading"
                    placeholder="Tell us more about your inquiry..."
                    rows="6"
                    class="w-full" />
            </div>

            <div v-if="error" class="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
                <p class="text-sm">{{ error }}</p>
            </div>

            <div class="flex justify-end">
                <Button
                    type="submit"
                    :disabled="isLoading"
                    class="px-8">
                    {{ isLoading ? "Sending..." : "Send Message" }}
                </Button>
            </div>
        </form>
    </div>
</template>