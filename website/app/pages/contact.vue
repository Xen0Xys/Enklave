<script setup lang="ts">
import {toast} from "vue-sonner";

definePageMeta({
    layout: "default",
});

useSeoMeta({
    title: "Contact Enklave - Get in Touch",
    description:
        "Contact the Enklave team for support, questions, or partnership opportunities. We're here to help with your family collaboration and digital organization needs.",
    ogTitle: "Contact Enklave - Get in Touch",
    ogDescription:
        "Contact the Enklave team for support, questions, or partnership opportunities. We're here to help with your family collaboration and digital organization needs.",
    ogUrl: "https://enklave.cloud/contact",
    twitterTitle: "Contact Enklave - Get in Touch",
    twitterDescription:
        "Contact the Enklave team for support, questions, or partnership opportunities. We're here to help with your family collaboration and digital organization needs.",
});

useSchemaOrg([
    {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact Enklave",
        description:
            "Get in touch with the Enklave team for support, questions, or partnership opportunities.",
        url: "https://enklave.cloud/contact",
    },
]);

const form = ref({
    name: "",
    email: "",
    subject: "",
    message: "",
});

const isLoading = ref(false);

const submitForm = async () => {
    isLoading.value = true;

    try {
        await useEnklaveApi("/contact", "POST", {
            body: form.value,
        });
        toast.success("Message sent successfully!", {
            description:
                "Thank you for contacting us. We'll get back to you as soon as possible.",
        });
        form.value = {
            name: "",
            email: "",
            subject: "",
            message: "",
        };
    } catch (err: any) {
        toast.error("Failed to send message", {
            description: err.message || "Please try again later.",
        });
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div
        class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <!-- Hero Section -->
        <section class="relative px-6 py-24 text-white">
            <div class="container mx-auto max-w-2xl text-center">
                <!-- Icon -->
                <div class="mb-8">
                    <div
                        class="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                        <Icon
                            name="iconoir:chat-bubble"
                            class="size-8 text-white" />
                    </div>
                </div>

                <h1 class="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
                    Contact Us
                </h1>
                <p
                    class="mx-auto max-w-2xl text-xl leading-relaxed text-purple-100">
                    Have a question or need support? We'd love to hear from you
                    and help your family get the most out of Enklave.
                </p>
            </div>

            <!-- Background decoration -->
            <div class="absolute inset-0 bg-gray-900 opacity-20"></div>
            <div
                class="absolute top-10 left-10 h-20 w-20 animate-pulse rounded-full bg-white/10 blur-xl"></div>
            <div
                class="absolute right-10 bottom-10 h-32 w-32 animate-pulse rounded-full bg-purple-500/20 blur-xl"></div>
        </section>

        <!-- Contact Form Section -->
        <section class="relative px-6 py-16">
            <div class="container mx-auto max-w-2xl">
                <div
                    class="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm md:p-12">
                    <form @submit.prevent="submitForm" class="space-y-6">
                        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label
                                    for="name"
                                    class="mb-2 block text-sm font-medium text-purple-100">
                                    Name *
                                </label>
                                <Input
                                    id="name"
                                    v-model="form.name"
                                    type="text"
                                    required
                                    :disabled="isLoading"
                                    placeholder="Your full name"
                                    class="w-full bg-white/90 text-gray-900 placeholder:text-gray-500 focus:bg-white" />
                            </div>
                            <div>
                                <label
                                    for="email"
                                    class="mb-2 block text-sm font-medium text-purple-100">
                                    Email *
                                </label>
                                <Input
                                    id="email"
                                    v-model="form.email"
                                    type="email"
                                    required
                                    :disabled="isLoading"
                                    placeholder="your.email@example.com"
                                    class="w-full bg-white/90 text-gray-900 placeholder:text-gray-500 focus:bg-white" />
                            </div>
                        </div>

                        <div>
                            <label
                                for="subject"
                                class="mb-2 block text-sm font-medium text-purple-100">
                                Subject *
                            </label>
                            <Input
                                id="subject"
                                v-model="form.subject"
                                type="text"
                                required
                                :disabled="isLoading"
                                placeholder="What is this regarding?"
                                class="w-full bg-white/90 text-gray-900 placeholder:text-gray-500 focus:bg-white" />
                        </div>

                        <div>
                            <label
                                for="message"
                                class="mb-2 block text-sm font-medium text-purple-100">
                                Message *
                            </label>
                            <Textarea
                                id="message"
                                v-model="form.message"
                                required
                                :disabled="isLoading"
                                placeholder="Tell us more about your inquiry..."
                                :rows="6"
                                class="w-full bg-white/90 text-gray-900 placeholder:text-gray-500 focus:bg-white" />
                        </div>

                        <div class="flex justify-end">
                            <Button
                                type="submit"
                                :disabled="isLoading"
                                class="transform bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-purple-700 hover:to-blue-700">
                                <Icon
                                    v-if="isLoading"
                                    name="iconoir:loading-clock"
                                    class="mr-2 size-4 animate-spin" />
                                <Icon
                                    v-else
                                    name="iconoir:send"
                                    class="mr-2 size-4" />
                                {{ isLoading ? "Sending..." : "Send Message" }}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>

        <!-- Support Options Section -->
        <section class="relative px-6 py-16 text-white">
            <div class="container mx-auto max-w-4xl">
                <div class="mb-12 text-center">
                    <h2 class="mb-4 text-3xl font-bold">
                        Other ways to reach us
                    </h2>
                    <p class="text-purple-100">
                        Choose the option that works best for you
                    </p>
                </div>

                <div class="grid gap-6 md:grid-cols-3">
                    <!-- GitHub Issues -->
                    <div
                        class="flex flex-col justify-between rounded-2xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm">
                        <div>
                            <Icon
                                name="iconoir:github"
                                class="mx-auto mb-4 size-12 text-purple-300" />
                            <h3 class="mb-2 text-lg font-semibold">
                                GitHub Issues
                            </h3>
                            <p class="mb-4 text-sm text-purple-100">
                                Report bugs or request features directly on our
                                GitHub repository
                            </p>
                        </div>
                        <Button
                            as-child
                            variant="outline"
                            class="border-white/20 text-purple-200 hover:bg-white/10">
                            <a
                                href="https://github.com/Xen0Xys/Enklave/issues"
                                target="_blank"
                                rel="noopener noreferrer">
                                Open Issue
                            </a>
                        </Button>
                    </div>

                    <!-- Community -->
                    <div
                        class="flex flex-col justify-between rounded-2xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm">
                        <div>
                            <Icon
                                name="iconoir:community"
                                class="mx-auto mb-4 size-12 text-purple-300" />
                            <h3 class="mb-2 text-lg font-semibold">
                                Community
                            </h3>
                            <p class="mb-4 text-sm text-purple-100">
                                Join our community discussions and get help from
                                other families
                            </p>
                        </div>
                        <Button
                            as-child
                            variant="outline"
                            class="border-white/20 text-purple-200 hover:bg-white/10">
                            <a
                                href="https://github.com/Xen0Xys/Enklave/discussions"
                                target="_blank"
                                rel="noopener noreferrer">
                                Join Discussion
                            </a>
                        </Button>
                    </div>

                    <!-- Documentation -->
                    <div
                        class="flex flex-col justify-between rounded-2xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm">
                        <div>
                            <Icon
                                name="iconoir:book"
                                class="mx-auto mb-4 size-12 text-purple-300" />
                            <h3 class="mb-2 text-lg font-semibold">
                                Documentation
                            </h3>
                            <p class="mb-4 text-sm text-purple-100">
                                Find answers in our comprehensive documentation
                                and guides
                            </p>
                        </div>
                        <Button
                            as-child
                            variant="outline"
                            class="border-white/20 text-purple-200 hover:bg-white/10">
                            <a
                                href="https://github.com/Xen0Xys/Enklave#readme"
                                target="_blank"
                                rel="noopener noreferrer">
                                Read Docs
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
@keyframes pulse {
    0%,
    100% {
        opacity: 0.4;
    }
    50% {
        opacity: 0.8;
    }
}

.animate-pulse {
    animation: pulse 3s ease-in-out infinite;
}
</style>
