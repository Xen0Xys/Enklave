<script setup lang="ts">
definePageMeta({
    layout: "default",
});

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
- Security tips and best practices
- Community highlights and use cases

## 📞 Contact Us

Have questions or need support? Visit our [contact page](/contact) to:
- Report bugs or issues
- Request new features
- Get technical support
- Provide feedback

We're committed to providing excellent support and building features that matter to our users.
        `
    },
    {
        title: "Version 1.0.0 Alpha - Initial Release",
        date: "2025-01-15",
        version: "1.0.0-alpha.0",
        type: "major",
        content: `
## ✨ New Features

- **End-to-end encryption**: Your data is encrypted on your device before being sent to our servers
- **Secure file sharing**: Share files and folders with confidence using secure links and permissions
- **Cross-platform access**: Access your files from any device - computer, tablet, or smartphone
- **Version control**: Restore previous versions of your files easily
- **Team management**: Create teams, manage members, and assign granular permissions
- **Newsletter subscription**: Stay updated with the latest news and features

## 🛠️ Technical Improvements

- Built with modern TypeScript and Vue.js for the frontend
- NestJS backend with comprehensive API endpoints
- Prisma ORM for reliable database management
- End-to-end encrypted file storage
- Responsive design optimized for all devices

## 🚀 Getting Started

1. Visit [app.enklave.cloud](https://app.enklave.cloud) to create your account
2. Verify your email address
3. Start uploading and securing your files
4. Explore team features and secure sharing options

This is just the beginning! We have many exciting features planned for future releases.
        `
    }
];

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const getTypeColor = (type: string) => {
    switch (type) {
        case 'major':
            return 'bg-red-100 text-red-800 border-red-200';
        case 'minor':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'patch':
            return 'bg-green-100 text-green-800 border-green-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

const renderMarkdown = (content: string) => {
    // Simple markdown rendering for headers, lists, and links
    return content
        .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mt-6 mb-3">$1</h2>')
        .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
        .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-blue-600 underline hover:no-underline">$1</a>')
        .replace(/\n\n/g, '</p><p class="mb-4">')
        .replace(/^(.+)$/gm, '<p class="mb-4">$1</p>')
        .replace(/<\/p><p class="mb-4"><h2/g, '</p><h2')
        .replace(/<\/h2><p class="mb-4">/g, '</h2>')
        .replace(/<\/p><p class="mb-4"><li/g, '<ul class="list-disc pl-6 space-y-1"><li')
        .replace(/<\/li><p class="mb-4">/g, '</li></ul>');
};
</script>

<template>
    <div class="container mx-auto max-w-4xl px-4 py-16">
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold tracking-tight mb-4">What's New</h1>
            <p class="text-muted-foreground text-lg">
                Stay up to date with the latest features, improvements, and changes to Enklave.
            </p>
        </div>

        <div class="space-y-8">
            <article
                v-for="post in posts"
                :key="post.title"
                class="border rounded-lg p-6 bg-card">
                <header class="mb-4">
                    <div class="flex items-center gap-3 mb-2">
                        <h2 class="text-2xl font-semibold">{{ post.title }}</h2>
                        <span
                            v-if="post.type"
                            :class="getTypeColor(post.type)"
                            class="px-2 py-1 text-xs font-medium rounded-full border">
                            {{ post.type }}
                        </span>
                    </div>
                    <div class="flex items-center gap-4 text-sm text-muted-foreground">
                        <time :datetime="post.date">
                            {{ formatDate(post.date) }}
                        </time>
                        <span v-if="post.version" class="font-mono">
                            v{{ post.version }}
                        </span>
                    </div>
                </header>
                
                <div class="max-w-none" v-html="renderMarkdown(post.content)"></div>
            </article>
        </div>
    </div>
</template>