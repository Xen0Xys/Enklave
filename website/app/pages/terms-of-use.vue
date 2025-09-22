<script setup lang="ts">
definePageMeta({
    layout: "default",
});

useSeoMeta({
    title: "Terms of Use - Enklave",
    description:
        "Terms of Use for Enklave - your family collaboration platform. Learn about user responsibilities, intellectual property rights, and service terms.",
    ogTitle: "Terms of Use - Enklave",
    ogDescription:
        "Terms of Use for Enklave - your family collaboration platform. Learn about user responsibilities, intellectual property rights, and service terms.",
    ogUrl: "https://enklave.cloud/terms-of-use",
    twitterTitle: "Terms of Use - Enklave",
    twitterDescription:
        "Terms of Use for Enklave - your family collaboration platform. Learn about user responsibilities, intellectual property rights, and service terms.",
});

useSchemaOrg([
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Terms of Use - Enklave",
        description: "Terms of Use for Enklave family collaboration platform",
        url: "https://enklave.cloud/terms-of-use",
    },
]);
</script>

<template>
    <div
        class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
        <!-- Hero Section -->
        <section class="relative px-6 py-24">
            <div class="container mx-auto max-w-4xl text-center">
                <div class="mb-8">
                    <div
                        class="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                        <Icon name="iconoir:privacy-policy" class="size-8" />
                    </div>
                </div>
                <h1 class="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
                    Terms of Use
                </h1>
                <p class="text-muted-foreground mx-auto max-w-2xl text-lg">
                    These Terms of Use govern your access to and use of the
                    Enklave platform and services.
                </p>
                <p class="text-muted-foreground mt-4 text-sm">
                    Last updated:
                    {{
                        new Date().toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })
                    }}
                </p>
            </div>
        </section>

        <!-- Content Section -->
        <section class="relative px-6 py-16">
            <div class="container mx-auto max-w-4xl">
                <div
                    class="bg-card text-card-foreground prose prose-gray dark:prose-invert max-w-none rounded-2xl border p-8 shadow-lg md:p-12">
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using the Enklave platform ("Service"),
                        operated by Dotslash ("Company", "we", "us", or "our"),
                        you agree to be bound by these Terms of Use ("Terms").
                        If you do not agree to these Terms, please do not use
                        our Service.
                    </p>

                    <h2>2. Description of Service</h2>
                    <p>
                        Enklave is a collaborative family and couple management
                        platform that provides secure file storage, shopping
                        lists, organization tools, and other family coordination
                        features. Our Service is designed to help families
                        organize their digital lives in a secure and private
                        environment.
                    </p>

                    <h2>3. User Accounts and Registration</h2>
                    <h3>3.1 Account Creation</h3>
                    <p>
                        To use certain features of our Service, you must create
                        an account. You agree to provide accurate, current, and
                        complete information during registration and to update
                        such information to keep it accurate, current, and
                        complete.
                    </p>
                    <h3>3.2 Account Security</h3>
                    <p>
                        You are responsible for maintaining the confidentiality
                        of your account credentials and for all activities that
                        occur under your account. You agree to notify us
                        immediately of any unauthorized use of your account.
                    </p>
                    <h3>3.3 Account Suspension</h3>
                    <p>
                        We reserve the right to suspend or terminate your
                        account if you violate these Terms or engage in any
                        activity that we deem harmful to our Service or other
                        users.
                    </p>

                    <h2>4. User Responsibilities and Conduct</h2>
                    <h3>4.1 Acceptable Use</h3>
                    <p>
                        You agree to use our Service only for lawful purposes
                        and in accordance with these Terms. You agree not to:
                    </p>
                    <ul>
                        <li>
                            Use the Service in any way that violates applicable
                            laws or regulations
                        </li>
                        <li>
                            Upload, store, or share content that is illegal,
                            harmful, threatening, abusive, or violates others'
                            rights
                        </li>
                        <li>
                            Attempt to gain unauthorized access to our systems
                            or other users' accounts
                        </li>
                        <li>
                            Interfere with or disrupt the Service or servers
                            connected to the Service
                        </li>
                        <li>
                            Use the Service to transmit spam, viruses, or other
                            malicious code
                        </li>
                        <li>
                            Impersonate any person or entity or misrepresent
                            your affiliation with any person or entity
                        </li>
                    </ul>
                    <h3>4.2 Content Responsibility</h3>
                    <p>
                        You are solely responsible for all content you upload,
                        store, or share through our Service. You represent and
                        warrant that you have all necessary rights to the
                        content you provide.
                    </p>

                    <h2>5. Intellectual Property Rights</h2>
                    <h3>5.1 Our Intellectual Property</h3>
                    <p>
                        The Service and its original content, features, and
                        functionality are and will remain the exclusive property
                        of Dotslash and its licensors. The Service is protected
                        by copyright, trademark, and other laws.
                    </p>
                    <h3>5.2 Your Content</h3>
                    <p>
                        You retain ownership of any content you submit, post, or
                        display on or through the Service. By submitting content
                        to our Service, you grant us a non-exclusive, worldwide,
                        royalty-free license to use, store, and process your
                        content solely for the purpose of providing the Service
                        to you.
                    </p>
                    <h3>5.3 Feedback</h3>
                    <p>
                        Any feedback, comments, or suggestions you provide
                        regarding our Service may be used by us without any
                        obligation to compensate you.
                    </p>

                    <h2>6. Privacy and Data Protection</h2>
                    <p>
                        Your privacy is important to us. Our collection and use
                        of personal information is governed by our Privacy
                        Policy, which is incorporated into these Terms by
                        reference. We are committed to protecting your personal
                        data in accordance with applicable data protection laws,
                        including the General Data Protection Regulation (GDPR).
                    </p>

                    <h2>7. Service Availability and Modifications</h2>
                    <h3>7.1 Service Availability</h3>
                    <p>
                        We strive to maintain the availability of our Service,
                        but we do not guarantee that the Service will be
                        available at all times. We may experience interruptions
                        due to maintenance, updates, or technical issues.
                    </p>
                    <h3>7.2 Service Modifications</h3>
                    <p>
                        We reserve the right to modify, suspend, or discontinue
                        any part of our Service at any time with or without
                        notice. We will not be liable for any modification,
                        suspension, or discontinuation of the Service.
                    </p>

                    <h2>8. Account Termination</h2>
                    <h3>8.1 Termination by You</h3>
                    <p>
                        You may terminate your account at any time by contacting
                        us at contact@dotslash.fr. Upon termination, your right
                        to use the Service will cease immediately.
                    </p>
                    <h3>8.2 Termination by Us</h3>
                    <p>
                        We may terminate or suspend your account and access to
                        the Service immediately, without prior notice, if you
                        breach these Terms or engage in conduct that we
                        determine to be harmful to our Service or other users.
                    </p>
                    <h3>8.3 Effects of Termination</h3>
                    <p>
                        Upon termination, you will lose access to your account
                        and all associated data. We may, but are not obligated
                        to, provide you with a reasonable opportunity to
                        retrieve your data before permanent deletion.
                    </p>

                    <h2>9. Limitation of Liability</h2>
                    <p>
                        To the maximum extent permitted by applicable law, in no
                        event shall Dotslash, its affiliates, directors,
                        employees, or agents be liable for any indirect,
                        incidental, special, consequential, or punitive damages,
                        including without limitation, loss of profits, data,
                        use, goodwill, or other intangible losses, resulting
                        from your use of the Service.
                    </p>
                    <p>
                        Our total liability to you for any claim arising out of
                        or relating to these Terms or your use of the Service
                        shall not exceed the amount you paid us for the Service
                        in the twelve months preceding the claim.
                    </p>

                    <h2>10. Indemnification</h2>
                    <p>
                        You agree to defend, indemnify, and hold harmless
                        Dotslash and its affiliates, directors, employees, and
                        agents from and against any claims, damages,
                        obligations, losses, liabilities, costs, or debt arising
                        from your use of the Service or violation of these
                        Terms.
                    </p>

                    <h2>11. Dispute Resolution</h2>
                    <h3>11.1 Governing Law</h3>
                    <p>
                        These Terms shall be governed by and construed in
                        accordance with the laws of France, without regard to
                        its conflict of law provisions.
                    </p>
                    <h3>11.2 Jurisdiction</h3>
                    <p>
                        Any disputes arising out of or relating to these Terms
                        or the Service shall be subject to the exclusive
                        jurisdiction of the French courts.
                    </p>
                    <h3>11.3 Dispute Resolution Process</h3>
                    <p>
                        Before filing any formal legal proceedings, you agree to
                        first attempt to resolve any disputes through direct
                        communication with us by contacting contact@dotslash.fr.
                    </p>

                    <h2>12. Severability</h2>
                    <p>
                        If any provision of these Terms is found to be
                        unenforceable or invalid, that provision will be limited
                        or eliminated to the minimum extent necessary so that
                        these Terms will otherwise remain in full force and
                        effect.
                    </p>

                    <h2>13. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these Terms at any time.
                        We will notify users of any material changes by posting
                        the updated Terms on our website and updating the "Last
                        updated" date. Your continued use of the Service after
                        such modifications constitutes acceptance of the updated
                        Terms.
                    </p>

                    <h2>14. Contact Information</h2>
                    <p>
                        If you have any questions about these Terms, please
                        contact us at:
                    </p>
                    <div class="bg-muted rounded-lg p-4">
                        <p class="mb-2">
                            <strong>Dotslash</strong>
                        </p>
                        <p class="mb-2">Email: contact@dotslash.fr</p>
                        <p>Website: https://enklave.cloud</p>
                    </div>

                    <div class="border-border mt-8 border-t pt-8">
                        <p class="text-muted-foreground text-sm">
                            These Terms of Use constitute the entire agreement
                            between you and Dotslash regarding the use of our
                            Service and supersede all prior agreements and
                            understandings.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.prose h2 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
}

.prose h3 {
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;
}

.prose p {
    margin-top: 1rem;
    margin-bottom: 1rem;
    line-height: 1.7;
}

.prose ul {
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding-left: 1.5rem;
}

.prose li {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}
</style>
