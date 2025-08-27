<script setup lang="ts">
// Fetch all newsletter articles
const {data: articles} = await useAsyncData("whats-new", () =>
    queryCollection("content").all(),
);

useSeoMeta({
    title: "What's New - Enklave",
    description:
        "Stay up to date with the latest features, improvements, and changes to Enklave. See how we're making family collaboration better every day.",
});

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};
</script>

<template>
    <div
        class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <!-- Hero Section -->
        <section class="relative px-6 py-24 text-white">
            <div class="container mx-auto max-w-4xl text-center">
                <!-- App icon placeholder -->
                <div
                    class="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                    <Icon
                        name="iconoir:settings"
                        class="h-10 w-10 text-white" />
                </div>

                <h1 class="mb-6 text-5xl font-bold md:text-6xl">What's New</h1>
                <p
                    class="mx-auto max-w-2xl text-xl leading-relaxed text-purple-100">
                    Stay up to date with the latest features, improvements, and
                    changes to Enklave. See how we're making family
                    collaboration better every day.
                </p>
            </div>

            <!-- Background decoration -->
            <div class="absolute inset-0 bg-gray-900 opacity-20"></div>
            <div
                class="absolute top-10 left-10 h-20 w-20 animate-pulse rounded-full bg-white/10 blur-xl"></div>
            <div
                class="absolute right-10 bottom-10 h-32 w-32 animate-pulse rounded-full bg-purple-500/20 blur-xl"></div>
        </section>

        <!-- Updates Section -->
        <section class="relative px-6 py-16">
            <div class="container mx-auto max-w-6xl">
                <div class="grid gap-8">
                    <!-- Newsletter and Contact Features Update -->
                    <div
                        class="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
                        <div class="mb-6 flex items-center justify-between">
                            <span
                                class="rounded-full bg-green-500/30 px-4 py-2 text-sm font-medium text-green-100">
                                ✨ New Features
                            </span>
                            <time class="text-purple-200">
                                January 15, 2025 - v1.0.1-alpha
                            </time>
                        </div>

                        <h2 class="mb-4 text-3xl font-bold text-white">
                            Newsletter and Contact Features
                        </h2>

                        <div class="grid gap-6 md:grid-cols-2">
                            <div>
                                <h3
                                    class="mb-3 flex items-center text-lg font-semibold text-purple-100">
                                    <Icon
                                        name="iconoir:star"
                                        class="mr-2 h-5 w-5 text-yellow-400" />
                                    New Features
                                </h3>
                                <ul class="space-y-2 text-purple-200">
                                    <li class="flex items-start">
                                        <Icon
                                            name="iconoir:check"
                                            class="mt-0.5 mr-2 h-4 w-4 text-green-400" />
                                        <span
                                            >Working Newsletter: Subscribe to
                                            our newsletter directly from the
                                            website to receive updates</span
                                        >
                                    </li>
                                    <li class="flex items-start">
                                        <Icon
                                            name="iconoir:check"
                                            class="mt-0.5 mr-2 h-4 w-4 text-green-400" />
                                        <span
                                            >Contact Form: Get in touch with our
                                            team through the contact page</span
                                        >
                                    </li>
                                    <li class="flex items-start">
                                        <Icon
                                            name="iconoir:check"
                                            class="mt-0.5 mr-2 h-4 w-4 text-green-400" />
                                        <span
                                            >What's New Page: Stay informed
                                            about the latest updates and changes
                                            to our changelog</span
                                        >
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3
                                    class="mb-3 flex items-center text-lg font-semibold text-purple-100">
                                    <Icon
                                        name="iconoir:tools"
                                        class="mr-2 h-5 w-5 text-blue-400" />
                                    Improvements
                                </h3>
                                <ul class="space-y-2 text-purple-200">
                                    <li class="flex items-start">
                                        <Icon
                                            name="iconoir:check"
                                            class="mt-0.5 mr-2 h-4 w-4 text-green-400" />
                                        <span
                                            >Enhanced website navigation with
                                            contact page link</span
                                        >
                                    </li>
                                    <li class="flex items-start">
                                        <Icon
                                            name="iconoir:check"
                                            class="mt-0.5 mr-2 h-4 w-4 text-green-400" />
                                        <span
                                            >Improved user experience with form
                                            validation and feedback</span
                                        >
                                    </li>
                                    <li class="flex items-start">
                                        <Icon
                                            name="iconoir:check"
                                            class="mt-0.5 mr-2 h-4 w-4 text-green-400" />
                                        <span
                                            >Email notifications for contact
                                            form submissions</span
                                        >
                                    </li>
                                    <li class="flex items-start">
                                        <Icon
                                            name="iconoir:check"
                                            class="mt-0.5 mr-2 h-4 w-4 text-green-400" />
                                        <span
                                            >Responsive design for better mobile
                                            experience</span
                                        >
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="mt-8">
                            <h3
                                class="mb-3 flex items-center text-lg font-semibold text-purple-100">
                                <Icon
                                    name="iconoir:community"
                                    class="mr-2 h-5 w-5 text-purple-400" />
                                Newsletter
                            </h3>
                            <p class="mb-4 text-purple-200">
                                You can now subscribe to our newsletter at
                                <NuxtLink
                                    to="/#newsletter"
                                    class="font-medium text-purple-300 underline hover:text-purple-200">
                                    enklave.cloud/newsletter
                                </NuxtLink>
                                to receive:
                            </p>
                            <ul class="space-y-1 text-purple-200">
                                <li>
                                    • Product updates and new feature
                                    announcements
                                </li>
                                <li>
                                    • Family organization tips and best
                                    practices
                                </li>
                                <li>• Community highlights and use cases</li>
                            </ul>
                        </div>

                        <div class="mt-8">
                            <h3
                                class="mb-3 flex items-center text-lg font-semibold text-purple-100">
                                <Icon
                                    name="iconoir:mail"
                                    class="mr-2 h-5 w-5 text-green-400" />
                                Contact Us
                            </h3>
                            <p class="text-purple-200">
                                Have questions or need support? Visit our
                                <NuxtLink
                                    to="/contact"
                                    class="font-medium text-purple-300 underline hover:text-purple-200">
                                    contact page
                                </NuxtLink>
                                or:
                            </p>
                            <ul class="mt-2 space-y-1 text-purple-200">
                                <li>• Report bugs or issues</li>
                                <li>• Request new features</li>
                                <li>• Get technical support</li>
                                <li>• Provide feedback</li>
                            </ul>
                        </div>

                        <p class="mt-6 text-sm text-purple-300">
                            We're committed to providing excellent support and
                            building features that matter to our users.
                        </p>
                    </div>

                    <!-- Initial Release -->
                    <div
                        class="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
                        <div class="mb-6 flex items-center justify-between">
                            <span
                                class="rounded-full bg-blue-500/30 px-4 py-2 text-sm font-medium text-blue-100">
                                🎉 Initial Release
                            </span>
                            <time class="text-purple-200">
                                January 15, 2025 - v1.0.0 Alpha
                            </time>
                        </div>

                        <h2 class="mb-4 text-3xl font-bold text-white">
                            Version 1.0.0 Alpha - Initial Release
                        </h2>

                        <div class="grid gap-6 md:grid-cols-2">
                            <div>
                                <h3
                                    class="mb-3 flex items-center text-lg font-semibold text-purple-100">
                                    <Icon
                                        name="iconoir:star"
                                        class="mr-2 h-5 w-5 text-yellow-400" />
                                    New Features
                                </h3>
                                <ul class="space-y-2 text-purple-200">
                                    <li class="flex items-start">
                                        <Icon
                                            name="iconoir:check"
                                            class="mt-0.5 mr-2 h-4 w-4 text-green-400" />
                                        <span
                                            >End-to-end encryption: Your
                                            family's data is encrypted on your
                                            device before being sent to our
                                            servers</span
                                        >
                                    </li>
                                    <li class="flex items-start">
                                        <Icon
                                            name="iconoir:check"
                                            class="mt-0.5 mr-2 h-4 w-4 text-green-400" />
                                        <span
                                            >Secure file sharing: Share files
                                            and folders with family members
                                            using secure links and
                                            permissions</span
                                        >
                                    </li>
                                    <li class="flex items-start">
                                        <Icon
                                            name="iconoir:check"
                                            class="mt-0.5 mr-2 h-4 w-4 text-green-400" />
                                        <span
                                            >Cross-platform access: Access your
                                            files from any device - computer,
                                            tablet, or smartphone</span
                                        >
                                    </li>
                                    <li class="flex items-start">
                                        <Icon
                                            name="iconoir:check"
                                            class="mt-0.5 mr-2 h-4 w-4 text-green-400" />
                                        <span
                                            >Family management: Create family
                                            groups, manage members, and assign
                                            granular permissions</span
                                        >
                                    </li>
                                    <li class="flex items-start">
                                        <Icon
                                            name="iconoir:check"
                                            class="mt-0.5 mr-2 h-4 w-4 text-green-400" />
                                        <span
                                            >Newsletter subscription: Stay
                                            updated with the latest news and
                                            features</span
                                        >
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3
                                    class="mb-3 flex items-center text-lg font-semibold text-purple-100">
                                    <Icon
                                        name="iconoir:tools"
                                        class="mr-2 h-5 w-5 text-blue-400" />
                                    Technical Improvements
                                </h3>
                                <ul class="space-y-2 text-purple-200">
                                    <li class="flex items-start">
                                        <Icon
                                            name="iconoir:check"
                                            class="mt-0.5 mr-2 h-4 w-4 text-green-400" />
                                        <span
                                            >Built with modern TypeScript and
                                            Vue.js for the frontend</span
                                        >
                                    </li>
                                    <li class="flex items-start">
                                        <Icon
                                            name="iconoir:check"
                                            class="mt-0.5 mr-2 h-4 w-4 text-green-400" />
                                        <span
                                            >NestJS backend with comprehensive
                                            API endpoints</span
                                        >
                                    </li>
                                    <li class="flex items-start">
                                        <Icon
                                            name="iconoir:check"
                                            class="mt-0.5 mr-2 h-4 w-4 text-green-400" />
                                        <span
                                            >Prisma ORM for reliable database
                                            management</span
                                        >
                                    </li>
                                    <li class="flex items-start">
                                        <Icon
                                            name="iconoir:check"
                                            class="mt-0.5 mr-2 h-4 w-4 text-green-400" />
                                        <span
                                            >End-to-end encrypted file
                                            storage</span
                                        >
                                    </li>
                                    <li class="flex items-start">
                                        <Icon
                                            name="iconoir:check"
                                            class="mt-0.5 mr-2 h-4 w-4 text-green-400" />
                                        <span
                                            >Responsive design optimized for all
                                            devices</span
                                        >
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="mt-8">
                            <h3
                                class="mb-3 flex items-center text-lg font-semibold text-purple-100">
                                <Icon
                                    name="iconoir:rocket"
                                    class="mr-2 h-5 w-5 text-orange-400" />
                                Getting Started
                            </h3>
                            <div class="space-y-3 text-purple-200">
                                <p>
                                    1. Visit
                                    <span
                                        class="rounded bg-purple-500/30 px-2 py-1 font-mono text-sm">
                                        app.enklave.cloud
                                    </span>
                                    to create your family account
                                </p>
                                <p>2. Verify your email address</p>
                                <p>
                                    3. Start uploading and securing your family
                                    files
                                </p>
                                <p>
                                    4. Explore family features and secure
                                    sharing options
                                </p>
                            </div>
                        </div>

                        <p class="mt-6 text-sm text-purple-300">
                            This is just the beginning! We have many exciting
                            features planned for future releases.
                        </p>
                    </div>

                    <!-- Newsletter Articles -->
                    <div
                        v-for="article in articles"
                        :key="article.path"
                        v-if="articles && articles.length > 0"
                        class="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
                        <div class="mb-6 flex items-center justify-between">
                            <span
                                class="rounded-full bg-purple-500/30 px-4 py-2 text-sm font-medium text-purple-100">
                                📰 {{ article.category }}
                            </span>
                            <time class="text-purple-200">
                                {{ formatDate(article.date) }}
                            </time>
                        </div>

                        <h2 class="mb-4 text-3xl font-bold text-white">
                            {{ article.title }}
                        </h2>
                        
                        <p class="mb-6 text-lg text-purple-100">
                            {{ article.description }}
                        </p>

                        <div class="mb-6 flex items-center gap-6 text-sm text-purple-300">
                            <div class="flex items-center gap-2">
                                <Icon name="iconoir:user" class="h-4 w-4" />
                                <span>By {{ article.author }}</span>
                            </div>
                            <div
                                v-if="article.readTime"
                                class="flex items-center gap-2">
                                <Icon name="iconoir:clock" class="h-4 w-4" />
                                <span>{{ article.readTime }}</span>
                            </div>
                            <div
                                v-if="article.tags && article.tags.length"
                                class="flex flex-wrap gap-1">
                                <span
                                    v-for="tag in article.tags"
                                    :key="tag"
                                    class="rounded-full bg-blue-500/20 px-2 py-1 text-xs font-medium text-blue-200">
                                    #{{ tag }}
                                </span>
                            </div>
                        </div>

                        <!-- Full Article Content -->
                        <article
                            class="prose prose-lg prose-invert prose-headings:text-white prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-purple-100 prose-p:leading-relaxed prose-a:text-purple-300 prose-a:underline hover:prose-a:text-purple-200 prose-strong:text-white prose-ul:text-purple-100 prose-ol:text-purple-100 prose-li:marker:text-purple-300 prose-blockquote:border-purple-500 prose-blockquote:text-purple-200 prose-code:text-purple-200 prose-code:bg-purple-500/20 prose-code:px-2 prose-code:py-1 prose-code:rounded max-w-none">
                            <ContentRenderer :value="article" />
                        </article>
                    </div>
                </div>
            </div>
        </section>

        <!-- Newsletter Signup CTA -->
        <section class="relative px-6 py-16 text-white">
            <div class="container mx-auto max-w-2xl text-center">
                <div
                    class="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
                    <Icon
                        name="iconoir:community"
                        class="mx-auto mb-4 h-12 w-12 text-purple-300" />
                    <h2 class="mb-4 text-2xl font-bold">Stay in the loop</h2>
                    <p class="mb-6 text-purple-100">
                        Subscribe to our newsletter to get notified about new
                        features and updates as soon as they're released.
                    </p>
                    <Button
                        as-child
                        class="transform bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105">
                        <NuxtLink to="/#newsletter">
                            Subscribe to Updates
                        </NuxtLink>
                    </Button>
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
