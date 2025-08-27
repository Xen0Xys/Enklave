<script setup lang="ts">
definePageMeta({
    layout: "default",
});

useSeoMeta({
    title: "What's New - Enklave Changelog",
    description:
        "Stay up to date with the latest Enklave features, improvements, and security updates. See what's new in our family collaboration platform.",
    ogTitle: "What's New - Enklave Changelog",
    ogDescription:
        "Stay up to date with the latest Enklave features, improvements, and security updates. See what's new in our family collaboration platform.",
    ogUrl: "https://enklave.cloud/whats-new",
    twitterTitle: "What's New - Enklave Changelog",
    twitterDescription:
        "Stay up to date with the latest Enklave features, improvements, and security updates. See what's new in our family collaboration platform.",
});

useSchemaOrg([
    defineWebPage({
        "@type": "AboutPage",
        name: "What's New - Enklave Changelog",
        description: "Latest updates and changes to the Enklave platform",
    }),
]);

// Static changelog data
const posts = [
    {
        title: "Newsletter and Contact Features",
        date: "2025-01-15",
        version: "1.0.1-alpha",
        type: "minor",
        content: `
## ✨ New Features

- **Working Newsletter**: Subscribe to our newsletter directly from the website to receive updates
- **Contact Form**: Get in touch with our team through the new contact page
- **What's New Page**: Stay informed about the latest updates and changes with our changelog

## 🔧 Improvements

- Enhanced website navigation with contact page link
- Improved user experience with form validation and feedback
- Email notifications for contact form submissions
- Responsive design for better mobile experience

## 📧 Newsletter

You can now subscribe to our newsletter at [enklave.cloud/#newsletter](https://enklave.cloud/#newsletter) to receive:
- Product updates and new feature announcements
- Family organization tips and best practices
- Community highlights and use cases

## 📞 Contact Us

Have questions or need support? Visit our [contact page](/contact) to:
- Report bugs or issues
- Request new features
- Get technical support
- Provide feedback

We're committed to providing excellent support and building features that matter to our users.
        `,
    },
    {
        title: "Version 1.0.0 Alpha - Initial Release",
        date: "2025-01-15",
        version: "1.0.0-alpha.0",
        type: "major",
        content: `
## ✨ New Features

- **End-to-end encryption**: Your family's data is encrypted on your device before being sent to our servers
- **Secure file sharing**: Share files and folders with family members using secure links and permissions
- **Cross-platform access**: Access your files from any device - computer, tablet, or smartphone
- **Version control**: Restore previous versions of your files easily
- **Family management**: Create family groups, manage members, and assign granular permissions
- **Newsletter subscription**: Stay updated with the latest news and features

## 🛠️ Technical Improvements

- Built with modern TypeScript and Vue.js for the frontend
- NestJS backend with comprehensive API endpoints
- Prisma ORM for reliable database management
- End-to-end encrypted file storage
- Responsive design optimized for all devices

## 🚀 Getting Started

1. Visit [app.enklave.cloud](https://app.enklave.cloud) to create your family account
2. Verify your email address
3. Start uploading and securing your family files
4. Explore family features and secure sharing options

This is just the beginning! We have many exciting features planned for future releases.
        `,
    },
];

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const getTypeColor = (type: string) => {
    switch (type) {
        case "major":
            return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
        case "minor":
            return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800";
        case "patch":
            return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
        default:
            return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-800";
    }
};

const renderMarkdown = (content: string) => {
    // Simple markdown rendering for headers, lists, and links
    return content
        .replace(
            /^## (.+)$/gm,
            '<h2 class="text-xl font-semibold mt-6 mb-3 text-white">$1</h2>',
        )
        .replace(/^- (.+)$/gm, '<li class="ml-4 text-purple-100">$1</li>')
        .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
        .replace(
            /\[(.+?)\]\((.+?)\)/g,
            '<a href="$2" class="text-purple-300 underline hover:text-purple-200 transition-colors duration-200">$1</a>',
        )
        .replace(/\n\n/g, '</p><p class="mb-4 text-purple-100">')
        .replace(/^(.+)$/gm, '<p class="mb-4 text-purple-100">$1</p>')
        .replace(/<\/p><p class="mb-4 text-purple-100"><h2/g, "</p><h2")
        .replace(/<\/h2><p class="mb-4 text-purple-100">/g, "</h2>")
        .replace(
            /<\/p><p class="mb-4 text-purple-100"><li/g,
            '<ul class="list-disc pl-6 space-y-1 mb-4"><li',
        )
        .replace(/<\/li><p class="mb-4 text-purple-100">/g, "</li></ul>");
};
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <!-- Hero Section -->
        <section class="relative px-6 py-24 text-white">
            <div class="container mx-auto max-w-4xl text-center">
                <!-- Icon -->
                <div class="mb-8">
                    <div
                        class="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                        <Icon name="iconoir:clock-rotate-right" class="size-8 text-white" />
                    </div>
                </div>

                <h1 class="mb-6 text-4xl font-bold tracking-tight md:text-5xl">What's New</h1>
                <p class="mx-auto max-w-2xl text-xl leading-relaxed text-purple-100">
                    Stay up to date with the latest features, improvements, and
                    changes to Enklave. See how we're making family collaboration better every day.
                </p>
            </div>

            <!-- Background decoration -->
            <div class="absolute inset-0 bg-gray-900 opacity-20"></div>
            <div class="absolute top-10 left-10 h-20 w-20 animate-pulse rounded-full bg-white/10 blur-xl"></div>
            <div class="absolute right-10 bottom-10 h-32 w-32 animate-pulse rounded-full bg-purple-500/20 blur-xl"></div>
        </section>

        <!-- Changelog Content -->
        <section class="relative px-6 py-16">
            <div class="container mx-auto max-w-4xl">
                <div class="space-y-8">
                    <article
                        v-for="post in posts"
                        :key="post.title"
                        class="overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm">
                        <div class="p-8">
                            <header class="mb-6">
                                <div class="mb-4 flex items-center gap-3">
                                    <h2 class="text-2xl font-semibold text-white">{{ post.title }}</h2>
                                    <span
                                        v-if="post.type"
                                        :class="getTypeColor(post.type)"
                                        class="rounded-full border px-3 py-1 text-xs font-medium">
                                        {{ post.type }}
                                    </span>
                                </div>
                                <div
                                    class="flex items-center gap-4 text-sm text-purple-200">
                                    <time :datetime="post.date">
                                        {{ formatDate(post.date) }}
                                    </time>
                                    <span v-if="post.version" class="font-mono text-purple-300">
                                        v{{ post.version }}
                                    </span>
                                </div>
                            </header>

                            <div
                                class="max-w-none"
                                v-html="renderMarkdown(post.content)"></div>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="relative px-6 py-16 text-white">
            <div class="container mx-auto max-w-2xl text-center">
                <div class="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
                    <Icon name="iconoir:bell" class="mx-auto mb-4 size-12 text-purple-300" />
                    <h2 class="mb-4 text-2xl font-bold">Stay in the loop</h2>
                    <p class="mb-6 text-purple-100">
                        Subscribe to our newsletter to get notified about new features and updates as soon as they're released.
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
    0%, 100% {
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
