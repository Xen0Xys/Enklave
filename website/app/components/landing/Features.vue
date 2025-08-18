<script setup lang="ts"></script>

<template>
    <section id="features" class="bg-secondary flex w-full py-20">
        <div class="w-full px-10 text-center">
            <h2 class="text-center text-3xl font-bold">
                Everything you need, and more
            </h2>
            <p class="text-muted-foreground mt-2 text-center">
                Discover the features that make Enklave the ideal solution for
                secure data management.
            </p>
            <div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div
                    class="bg-background flex flex-col items-center rounded-lg border p-6 text-center">
                    <Icon name="lucide:lock" class="text-primary mb-4" />
                    <h3 class="text-xl font-semibold">End-to-end encryption</h3>
                    <p class="text-muted-foreground mt-2">
                        Your data is encrypted on your device before it's even
                        sent to our servers. No one but you can access it.
                    </p>
                </div>
                <div
                    class="bg-background flex flex-col items-center rounded-lg border p-6 text-center">
                    <Icon name="lucide:share-2" class="text-primary mb-4" />
                    <h3 class="text-xl font-semibold">Secure sharing</h3>
                    <p class="text-muted-foreground mt-2">
                        Share files and folders with confidence using secure
                        links, passwords, and expiration dates.
                    </p>
                </div>
                <div
                    class="bg-background flex flex-col items-center rounded-lg border p-6 text-center">
                    <Icon
                        name="lucide:laptop"
                        class="text-primary mb-4 h-10 w-10" />
                    <h3 class="text-xl font-semibold">Cross-platform access</h3>
                    <p class="text-muted-foreground mt-2">
                        Securely access your files from any device, whether it's
                        a computer, tablet, or smartphone.
                    </p>
                </div>
                <div
                    class="bg-background flex flex-col items-center rounded-lg border p-6 text-center">
                    <Icon
                        name="lucide:git-branch"
                        class="text-primary mb-4 h-10 w-10" />
                    <h3 class="text-xl font-semibold">Version control</h3>
                    <p class="text-muted-foreground mt-2">
                        Easily restore previous versions of your files so you
                        never lose your important work.
                    </p>
                </div>
                <div
                    class="bg-background flex flex-col items-center rounded-lg border p-6 text-center">
                    <Icon
                        name="lucide:users"
                        class="text-primary mb-4 h-10 w-10" />
                    <h3 class="text-xl font-semibold">Team management</h3>
                    <p class="text-muted-foreground mt-2">
                        Collaborate effectively by creating teams, managing
                        members, and assigning granular permissions.
                    </p>
                </div>
                <div
                    class="bg-background flex flex-col items-center rounded-lg border p-6 text-center">
                    <Icon
                        name="lucide:code"
                        class="text-primary mb-4 h-10 w-10" />
                    <h3 class="text-xl font-semibold">
                        Open Source and Transparent
                    </h3>
                    <p class="text-muted-foreground mt-2">
                        Our code is open to everyone. See for yourself how we
                        protect your data, with no black box.
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
