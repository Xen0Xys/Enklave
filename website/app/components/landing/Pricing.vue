<script setup lang="ts">
const features = ref([
    {
        name: "Secure storage",
        plans: {
            free: "1 GB",
            family: "500 GB",
            pro: "1 TB",
            enterprise: "Unlimited",
        },
    },
    {
        name: "File and folder sharing",
        plans: {free: true, family: true, pro: true, enterprise: true},
    },
    {
        name: "Version control",
        plans: {free: false, family: true, pro: true, enterprise: true},
    },
    {
        name: "Advanced sharing permissions",
        plans: {free: false, family: true, pro: true, enterprise: true},
    },
    {
        name: "Cross-device access",
        plans: {
            free: "1 device",
            family: "10 devices",
            pro: "Unlimited",
            enterprise: "Unlimited",
        },
    },
    {
        name: "Team management & SSO",
        plans: {free: false, family: false, pro: true, enterprise: true},
    },
    {
        name: "Audit logs",
        plans: {free: false, family: false, pro: true, enterprise: true},
    },
    {
        name: "Customer support",
        plans: {
            free: "Community",
            family: "Priority",
            pro: "Dedicated 24/7",
            enterprise: "Dedicated 24/7",
        },
    },
]);
</script>

<template>
    <section id="pricing" class="py-20">
        <div class="w-full px-10 text-center">
            <h2 class="text-center text-3xl font-bold">
                Flexible pricing for everyone
            </h2>
            <p class="text-muted-foreground mt-2 text-center">
                Choose the plan that's right for you, start for free.
            </p>
            <div class="mt-8 text-center">
                <p class="text-muted-foreground">
                    Looking for the Free plan?
                    <Button variant="link" as-child
                        ><NuxtLink to="https://app.enklave.cloud/register"
                            >Create an account now</NuxtLink
                        ></Button
                    >
                </p>
            </div>
            <div class="mt-12 grid gap-8 md:grid-cols-3">
                <!-- Family Plan -->
                <Card class="border-primary">
                    <CardHeader>
                        <CardTitle>Family</CardTitle>
                        <CardDescription
                            >For advanced users and small
                            teams.</CardDescription
                        >
                    </CardHeader>
                    <CardContent class="grid grow gap-6">
                        <div class="text-4xl font-bold">
                            $4.99
                            <span
                                class="text-muted-foreground text-sm font-normal"
                                >/ month</span
                            >
                        </div>
                        <ul class="text-muted-foreground space-y-2 text-sm">
                            <li class="flex items-center text-left">
                                <span class="mr-2">✔️</span>Secure storage (500
                                GB)
                            </li>
                            <li class="flex items-center text-left">
                                <span class="mr-2">✔️</span>Advanced sharing
                                with permissions
                            </li>
                            <li class="flex items-center text-left">
                                <span class="mr-2">✔️</span>Access on 10 devices
                            </li>
                            <li class="flex items-center text-left">
                                <span class="mr-2">✔️</span>Priority support
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button class="w-full" as-child>
                            <NuxtLink to="https://app.enklave.cloud/register"
                                >Choose Family</NuxtLink
                            >
                        </Button>
                    </CardFooter>
                </Card>

                <!-- Pro Plan -->
                <Card>
                    <CardHeader>
                        <CardTitle>Pro</CardTitle>
                        <CardDescription
                            >For organizations that need security and control at
                            scale.</CardDescription
                        >
                    </CardHeader>
                    <CardContent class="grid grow gap-6">
                        <div class="text-4xl font-bold">
                            $9.99
                            <span
                                class="text-muted-foreground text-sm font-normal"
                                >/ month</span
                            >
                        </div>
                        <ul class="text-muted-foreground space-y-2 text-sm">
                            <li class="flex items-center text-left">
                                <span class="mr-2">✔️</span>Unlimited storage
                            </li>
                            <li class="flex items-center text-left">
                                <span class="mr-2">✔️</span>Team management &
                                SSO
                            </li>
                            <li class="flex items-center text-left">
                                <span class="mr-2">✔️</span>Audit logs
                            </li>
                            <li class="flex items-center text-left">
                                <span class="mr-2">✔️</span>Dedicated 24/7
                                support
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button class="w-full" as-child>
                            <NuxtLink to="https://app.enklave.cloud/register"
                                >Choose Pro</NuxtLink
                            >
                        </Button>
                    </CardFooter>
                </Card>

                <!-- Enterprise Plan -->
                <Card>
                    <CardHeader>
                        <CardTitle>Enterprise</CardTitle>
                        <CardDescription
                            >For organizations that need security and control at
                            scale.</CardDescription
                        >
                    </CardHeader>
                    <CardContent class="grid grow gap-6">
                        <div class="text-4xl font-bold">Contact Us</div>
                        <ul class="text-muted-foreground space-y-2 text-sm">
                            <li class="flex items-center text-left">
                                <span class="mr-2">✔️</span>Unlimited storage
                            </li>
                            <li class="flex items-center text-left">
                                <span class="mr-2">✔️</span>Team management &
                                SSO
                            </li>
                            <li class="flex items-center text-left">
                                <span class="mr-2">✔️</span>Audit logs
                            </li>
                            <li class="flex items-center text-left">
                                <span class="mr-2">✔️</span>Dedicated 24/7
                                support
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" class="w-full"
                            >Contact Us</Button
                        >
                    </CardFooter>
                </Card>
            </div>

            <!-- Features Comparison Table -->
            <div class="mt-16">
                <h3 class="mb-8 text-center text-2xl font-bold">
                    Compare features
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
