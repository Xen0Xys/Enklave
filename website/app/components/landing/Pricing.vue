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
    <section id="pricing" class="relative py-24 px-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div class="container max-w-7xl mx-auto">
            <!-- Section header -->
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {{ landingConfig.pricing.title }}
                </h2>
                <p class="text-muted-foreground text-xl max-w-2xl mx-auto mb-8">
                    {{ landingConfig.pricing.description }}
                </p>
                <div class="inline-flex items-center bg-blue-50 dark:bg-blue-900/20 rounded-full px-6 py-3 border border-blue-200 dark:border-blue-800">
                    <Icon name="iconoir:gift" class="size-5 text-blue-600 mr-2" />
                    <span class="text-blue-800 dark:text-blue-200 font-medium">
                        {{ landingConfig.pricing.freePlanCta }}
                    </span>
                    <Button variant="link" class="ml-2 text-blue-600 dark:text-blue-400 p-0 h-auto font-semibold" as-child>
                        <NuxtLink to="https://app.enklave.cloud/register">{{
                            landingConfig.pricing.freePlanButton
                        }}</NuxtLink>
                    </Button>
                </div>
            </div>
            
            <!-- Pricing cards -->
            <div class="grid gap-8 md:grid-cols-3 mb-20">
                <Card
                    v-for="(plan, index) in landingConfig.pricing.plans"
                    :key="plan.title"
                    :class="[
                        'relative flex flex-col h-full transition-all duration-300 hover:scale-105',
                        plan.isPrimary ? 'border-purple-500 shadow-2xl shadow-purple-500/20 ring-2 ring-purple-500/20 transform scale-105' : 'border-gray-200 dark:border-gray-700 hover:shadow-xl'
                    ]"
                    :style="`animation-delay: ${index * 100}ms`">
                    
                    <!-- Popular badge -->
                    <div v-if="plan.isPrimary" class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div class="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                            Most Popular
                        </div>
                    </div>
                    
                    <CardHeader class="text-center pb-8">
                        <CardTitle class="text-2xl font-bold mb-2">{{ plan.title }}</CardTitle>
                        <CardDescription class="text-base">{{
                            plan.description
                        }}</CardDescription>
                    </CardHeader>
                    
                    <CardContent class="flex-grow">
                        <!-- Price display -->
                        <div class="text-center mb-8">
                            <div class="flex items-baseline justify-center">
                                <span class="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    {{ plan.price }}
                                </span>
                                <span
                                    v-if="plan.pricePeriod"
                                    class="text-muted-foreground text-lg font-medium ml-2">
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
                                <div class="flex-shrink-0 w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3">
                                    <Icon name="iconoir:check" class="size-3 text-green-600 dark:text-green-400" />
                                </div>
                                <span class="text-gray-700 dark:text-gray-300">{{ feature }}</span>
                            </li>
                        </ul>
                    </CardContent>
                    
                    <CardFooter class="pt-6">
                        <Button
                            class="w-full py-3 font-semibold"
                            as-child
                            :class="[
                                plan.isPrimary 
                                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25' 
                                    : ''
                            ]"
                            :variant="plan.price === 'Contact Us' ? 'outline' : plan.isPrimary ? 'default' : 'outline'">
                            <NuxtLink to="https://app.enklave.cloud/register">{{
                                plan.cta
                            }}</NuxtLink>
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            <!-- Features Comparison Table -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-xl">
                <div class="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
                    <h3 class="text-2xl font-bold text-white text-center">
                        {{ landingConfig.pricing.comparison.title }}
                    </h3>
                </div>
                
                <div class="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow class="bg-gray-50 dark:bg-gray-800/50">
                                <TableHead class="w-[300px] font-semibold text-gray-900 dark:text-white">Features</TableHead>
                                <TableHead class="text-center font-semibold text-gray-900 dark:text-white">Free</TableHead>
                                <TableHead class="text-center font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20">Family</TableHead>
                                <TableHead class="text-center font-semibold text-gray-900 dark:text-white">Pro</TableHead>
                                <TableHead class="text-center font-semibold text-gray-900 dark:text-white">Enterprise</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow
                                v-for="feature in features"
                                :key="feature.name"
                                class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <TableCell class="font-medium text-gray-900 dark:text-white">{{
                                    feature.name
                                }}</TableCell>
                                <TableCell class="text-center">
                                    <span v-if="feature.plans.free === true" class="text-green-600 text-lg">✔️</span>
                                    <span v-else-if="typeof feature.plans.free === 'string'" class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {{ feature.plans.free }}
                                    </span>
                                    <span v-else class="text-red-500 text-lg">❌</span>
                                </TableCell>
                                <TableCell class="text-center bg-purple-50/50 dark:bg-purple-900/10">
                                    <span v-if="feature.plans.family === true" class="text-green-600 text-lg">✔️</span>
                                    <span v-else-if="typeof feature.plans.family === 'string'" class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {{ feature.plans.family }}
                                    </span>
                                    <span v-else class="text-red-500 text-lg">❌</span>
                                </TableCell>
                                <TableCell class="text-center">
                                    <span v-if="feature.plans.pro === true" class="text-green-600 text-lg">✔️</span>
                                    <span v-else-if="typeof feature.plans.pro === 'string'" class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {{ feature.plans.pro }}
                                    </span>
                                    <span v-else class="text-red-500 text-lg">❌</span>
                                </TableCell>
                                <TableCell class="text-center">
                                    <span v-if="feature.plans.enterprise === true" class="text-green-600 text-lg">✔️</span>
                                    <span v-else-if="typeof feature.plans.enterprise === 'string'" class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {{ feature.plans.enterprise }}
                                    </span>
                                    <span v-else class="text-red-500 text-lg">❌</span>
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
