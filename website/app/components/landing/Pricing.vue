<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {landingConfig} from "~/config/landing";

const features = landingConfig.pricing.comparison.features;
</script>

<template>
    <section
        id="pricing"
        class="relative bg-gradient-to-b from-white to-gray-50 px-6 py-24 dark:from-gray-800 dark:to-gray-900">
        <div class="container mx-auto max-w-7xl">
            <!-- Section header -->
            <div class="mb-16 text-center">
                <h2
                    class="mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl dark:from-white dark:to-gray-300">
                    {{ landingConfig.pricing.title }}
                </h2>
                <p class="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
                    {{ landingConfig.pricing.description }}
                </p>
                <div
                    class="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-6 py-3 dark:border-blue-800 dark:bg-blue-900/20">
                    <Icon
                        name="iconoir:gift"
                        class="mr-2 size-5 text-blue-600" />
                    <span class="font-medium text-blue-800 dark:text-blue-200">
                        {{ landingConfig.pricing.freePlanCta }}
                    </span>
                    <Button
                        variant="link"
                        class="ml-2 h-auto p-0 font-semibold text-blue-600 dark:text-blue-400"
                        as-child>
                        <NuxtLink to="https://app.enklave.cloud/register">{{
                            landingConfig.pricing.freePlanButton
                        }}</NuxtLink>
                    </Button>
                </div>
            </div>

            <!-- Pricing cards -->
            <div class="mb-20 grid gap-8 md:grid-cols-3">
                <Card
                    v-for="(plan, index) in landingConfig.pricing.plans"
                    :key="plan.title"
                    :class="[
                        'relative flex h-full flex-col transition-all duration-300 hover:scale-105',
                        plan.isPrimary
                            ? 'scale-105 transform border-purple-500 shadow-2xl ring-2 shadow-purple-500/20 ring-purple-500/20'
                            : 'border-gray-200 hover:shadow-xl dark:border-gray-700',
                    ]"
                    :style="`animation-delay: ${index * 100}ms`">
                    <!-- Popular badge -->
                    <div
                        v-if="plan.isPrimary"
                        class="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                        <div
                            class="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                            Most Popular
                        </div>
                    </div>

                    <CardHeader class="pb-8 text-center">
                        <CardTitle class="mb-2 text-2xl font-bold">{{
                            plan.title
                        }}</CardTitle>
                        <CardDescription class="text-base">{{
                            plan.description
                        }}</CardDescription>
                    </CardHeader>

                    <CardContent class="flex-grow">
                        <!-- Price display -->
                        <div class="mb-8 text-center">
                            <div class="flex items-baseline justify-center">
                                <span
                                    class="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-5xl font-bold text-transparent">
                                    {{ plan.price }}
                                </span>
                                <span
                                    v-if="plan.pricePeriod"
                                    class="text-muted-foreground ml-2 text-lg font-medium">
                                    {{ plan.pricePeriod }}
                                </span>
                            </div>
                        </div>

                        <!-- Features list -->
                        <ul class="space-y-4">
                            <li
                                v-for="feature in plan.features"
                                :key="feature"
                                class="flex items-center text-sm">
                                <div
                                    class="mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                    <Icon
                                        name="iconoir:check"
                                        class="size-3 text-green-600 dark:text-green-400" />
                                </div>
                                <span
                                    class="text-gray-700 dark:text-gray-300"
                                    >{{ feature }}</span
                                >
                            </li>
                        </ul>
                    </CardContent>

                    <CardFooter class="pt-6">
                        <Button
                            class="w-full py-3 font-semibold"
                            as-child
                            :class="[
                                plan.isPrimary
                                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/25 hover:from-purple-700 hover:to-blue-700'
                                    : '',
                            ]"
                            :variant="
                                plan.price === 'Contact Us'
                                    ? 'outline'
                                    : plan.isPrimary
                                      ? 'default'
                                      : 'outline'
                            ">
                            <NuxtLink to="https://app.enklave.cloud/register">{{
                                plan.cta
                            }}</NuxtLink>
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            <!-- Features Comparison Table -->
            <div
                class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
                <div
                    class="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
                    <h3 class="text-center text-2xl font-bold text-white">
                        {{ landingConfig.pricing.comparison.title }}
                    </h3>
                </div>

                <div class="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow class="bg-gray-50 dark:bg-gray-800/50">
                                <TableHead
                                    class="w-[300px] font-semibold text-gray-900 dark:text-white"
                                    >Features</TableHead
                                >
                                <TableHead
                                    class="text-center font-semibold text-gray-900 dark:text-white"
                                    >Free</TableHead
                                >
                                <TableHead
                                    class="bg-purple-50 text-center font-semibold text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
                                    >Family</TableHead
                                >
                                <TableHead
                                    class="text-center font-semibold text-gray-900 dark:text-white"
                                    >Pro</TableHead
                                >
                                <TableHead
                                    class="text-center font-semibold text-gray-900 dark:text-white"
                                    >Enterprise</TableHead
                                >
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow
                                v-for="feature in features"
                                :key="feature.name"
                                class="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <TableCell
                                    class="font-medium text-gray-900 dark:text-white"
                                    >{{ feature.name }}</TableCell
                                >
                                <TableCell class="text-center">
                                    <span
                                        v-if="feature.plans.free === true"
                                        class="text-lg text-green-600"
                                        >✔️</span
                                    >
                                    <span
                                        v-else-if="
                                            typeof feature.plans.free ===
                                            'string'
                                        "
                                        class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {{ feature.plans.free }}
                                    </span>
                                    <span v-else class="text-lg text-red-500"
                                        >❌</span
                                    >
                                </TableCell>
                                <TableCell
                                    class="bg-purple-50/50 text-center dark:bg-purple-900/10">
                                    <span
                                        v-if="feature.plans.family === true"
                                        class="text-lg text-green-600"
                                        >✔️</span
                                    >
                                    <span
                                        v-else-if="
                                            typeof feature.plans.family ===
                                            'string'
                                        "
                                        class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {{ feature.plans.family }}
                                    </span>
                                    <span v-else class="text-lg text-red-500"
                                        >❌</span
                                    >
                                </TableCell>
                                <TableCell class="text-center">
                                    <span
                                        v-if="feature.plans.pro === true"
                                        class="text-lg text-green-600"
                                        >✔️</span
                                    >
                                    <span
                                        v-else-if="
                                            typeof feature.plans.pro ===
                                            'string'
                                        "
                                        class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {{ feature.plans.pro }}
                                    </span>
                                    <span v-else class="text-lg text-red-500"
                                        >❌</span
                                    >
                                </TableCell>
                                <TableCell class="text-center">
                                    <span
                                        v-if="feature.plans.enterprise === true"
                                        class="text-lg text-green-600"
                                        >✔️</span
                                    >
                                    <span
                                        v-else-if="
                                            typeof feature.plans.enterprise ===
                                            'string'
                                        "
                                        class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {{ feature.plans.enterprise }}
                                    </span>
                                    <span v-else class="text-lg text-red-500"
                                        >❌</span
                                    >
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Card animation */
.grid > div {
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
    transform: translateY(20px);
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
