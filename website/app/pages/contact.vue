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
const { success, error: showError } = useToast();

const submitForm = async () => {
    isLoading.value = true;
    
    try {
        await useEnklaveApi("/contact", "POST", {
            body: form.value
        });
        success("Message sent successfully!", "Thank you for contacting us. We'll get back to you as soon as possible.");
        form.value = {
            name: "",
            email: "",
            subject: "",
            message: "",
        };
    } catch (err: any) {
        showError("Failed to send message", err.message || "Please try again later.");
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

        <form @submit.prevent="submitForm" class="space-y-6">
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
                    :rows="6"
                    class="w-full" />
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