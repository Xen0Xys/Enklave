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
    <section id="pricing" class="flex flex-col items-center px-10 py-20">
        <div class="container">
            <h2 class="text-center text-3xl font-bold">
                {{ landingConfig.pricing.title }}
            </h2>
            <p class="text-muted-foreground mt-2 text-center">
                {{ landingConfig.pricing.description }}
            </p>
            <div class="mt-8 text-center">
                <p class="text-muted-foreground">
                    {{ landingConfig.pricing.freePlanCta }}
                    <Button variant="link" as-child
                        ><NuxtLink to="https://app.enklave.cloud/register">{{
                            landingConfig.pricing.freePlanButton
                        }}</NuxtLink></Button
                    >
                </p>
            </div>
            <div class="mt-12 grid gap-8 md:grid-cols-3">
                <!-- Pricing Plans -->
                <Card
                    v-for="plan in landingConfig.pricing.plans"
                    :key="plan.title"
                    :class="[
                        'flex',
                        'flex-col',
                        'h-full',
                        {'border-primary': plan.isPrimary},
                    ]">
                    <CardHeader>
                        <CardTitle>{{ plan.title }}</CardTitle>
                        <CardDescription>{{
                            plan.description
                        }}</CardDescription>
                    </CardHeader>
                    <CardContent class="grid flex-grow gap-6">
                        <div class="text-4xl font-bold">
                            {{ plan.price }}
                            <span
                                v-if="plan.pricePeriod"
                                class="text-muted-foreground text-sm font-normal"
                                >{{ plan.pricePeriod }}</span
                            >
                        </div>
                        <ul class="text-muted-foreground space-y-2 text-sm">
                            <li
                                v-for="feature in plan.features"
                                :key="feature"
                                class="flex items-center">
                                <span class="mr-2">✔️</span>{{ feature }}
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button
                            class="w-full"
                            as-child
                            :variant="
                                plan.price === 'Contact Us'
                                    ? 'outline'
                                    : 'default'
                            ">
                            <NuxtLink to="https://app.enklave.cloud/register">{{
                                plan.cta
                            }}</NuxtLink>
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            <!-- Features Comparison Table -->
            <div class="mt-16">
                <h3 class="mb-8 text-center text-2xl font-bold">
                    {{ landingConfig.pricing.comparison.title }}
                </h3>
                <div class="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead class="w-[300px]"
                                    >Features</TableHead
                                >
                                <TableHead class="text-center">Free</TableHead>
                                <TableHead class="text-center"
                                    >Family</TableHead
                                >
                                <TableHead class="text-center">Pro</TableHead>
                                <TableHead class="text-center"
                                    >Enterprise</TableHead
                                >
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow
                                v-for="feature in features"
                                :key="feature.name">
                                <TableCell class="font-medium">{{
                                    feature.name
                                }}</TableCell>
                                <TableCell class="text-center">
                                    <span v-if="feature.plans.free === true"
                                        >✔️</span
                                    >
                                    <span
                                        v-else-if="
                                            typeof feature.plans.free ===
                                            'string'
                                        ">
                                        {{ feature.plans.free }}
                                    </span>
                                    <span v-else>❌</span>
                                </TableCell>
                                <TableCell class="text-center">
                                    <span v-if="feature.plans.family === true"
                                        >✔️</span
                                    >
                                    <span
                                        v-else-if="
                                            typeof feature.plans.family ===
                                            'string'
                                        ">
                                        {{ feature.plans.family }}
                                    </span>
                                    <span v-else>❌</span>
                                </TableCell>
                                <TableCell class="text-center">
                                    <span v-if="feature.plans.pro === true"
                                        >✔️</span
                                    >
                                    <span
                                        v-else-if="
                                            typeof feature.plans.pro ===
                                            'string'
                                        ">
                                        {{ feature.plans.pro }}
                                    </span>
                                    <span v-else>❌</span>
                                </TableCell>
                                <TableCell class="text-center">
                                    <span
                                        v-if="feature.plans.enterprise === true"
                                        >✔️</span
                                    >
                                    <span
                                        v-else-if="
                                            typeof feature.plans.enterprise ===
                                            'string'
                                        ">
                                        {{ feature.plans.enterprise }}
                                    </span>
                                    <span v-else>❌</span>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    </section>
</template>
