<script setup lang="ts">
interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface Props {
    items: BreadcrumbItem[];
}

defineProps<Props>();

const generateBreadcrumbSchema = (items: BreadcrumbItem[]) => {
    const listItems = items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        ...(item.href && { item: `https://enklave.cloud${item.href}` }),
    }));

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: listItems,
    };
};
</script>

<template>
    <nav aria-label="Breadcrumb" class="mb-6">
        <ol class="flex items-center space-x-2 text-sm text-muted-foreground">
            <li v-for="(item, index) in items" :key="index" class="flex items-center">
                <template v-if="index > 0">
                    <Icon name="iconoir:nav-arrow-right" class="mx-2 size-4" />
                </template>
                <template v-if="item.href">
                    <NuxtLink :to="item.href" class="hover:text-foreground transition-colors">
                        {{ item.label }}
                    </NuxtLink>
                </template>
                <template v-else>
                    <span class="text-foreground font-medium">{{ item.label }}</span>
                </template>
            </li>
        </ol>
        
        <!-- Schema.org structured data -->
        <script type="application/ld+json">
            {{ JSON.stringify(generateBreadcrumbSchema(items)) }}
        </script>
    </nav>
</template>