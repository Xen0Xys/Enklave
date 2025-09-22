<script setup lang="ts">
definePageMeta({
    layout: "default",
});

useSeoMeta({
    title: "Terms and Conditions of Sale - Enklave",
    description:
        "Terms and Conditions of Sale for Enklave subscriptions. Learn about pricing, payment processes, refund policy, and subscription terms.",
    ogTitle: "Terms and Conditions of Sale - Enklave",
    ogDescription:
        "Terms and Conditions of Sale for Enklave subscriptions. Learn about pricing, payment processes, refund policy, and subscription terms.",
    ogUrl: "https://enklave.cloud/terms-of-sale",
    twitterTitle: "Terms and Conditions of Sale - Enklave",
    twitterDescription:
        "Terms and Conditions of Sale for Enklave subscriptions. Learn about pricing, payment processes, refund policy, and subscription terms.",
});

useSchemaOrg([
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Terms and Conditions of Sale - Enklave",
        description:
            "Terms and Conditions of Sale for Enklave subscription services",
        url: "https://enklave.cloud/terms-of-sale",
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
                        class="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-blue-600 text-white">
                        <Icon name="iconoir:shopping-bag" class="size-8" />
                    </div>
                </div>
                <h1 class="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
                    Terms and Conditions of Sale
                </h1>
                <p class="text-muted-foreground mx-auto max-w-2xl text-lg">
                    These Terms and Conditions of Sale govern the purchase and
                    use of Enklave subscription services.
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
                    <h2>1. General Information</h2>
                    <p>
                        These Terms and Conditions of Sale ("Sales Terms")
                        govern the sale of subscription services for the Enklave
                        platform provided by Dotslash ("Company", "we", "us", or
                        "our"). These Sales Terms supplement and should be read
                        in conjunction with our Terms of Use.
                    </p>

                    <h2>2. Company Information</h2>
                    <div class="bg-muted rounded-lg p-4">
                        <p><strong>Company Name:</strong> Dotslash</p>
                        <p>
                            <strong>Contact Email:</strong> contact@dotslash.fr
                        </p>
                        <p><strong>Website:</strong> https://enklave.cloud</p>
                        <p>
                            <strong>Service:</strong> SaaS platform for family
                            collaboration and organization
                        </p>
                    </div>

                    <h2>3. Product Description</h2>
                    <h3>3.1 Service Overview</h3>
                    <p>
                        Enklave is a Software as a Service (SaaS) platform that
                        provides family collaboration and organization tools,
                        including but not limited to:
                    </p>
                    <ul>
                        <li>Secure file storage and sharing</li>
                        <li>Collaborative shopping lists</li>
                        <li>Family notes and organization tools</li>
                        <li>
                            Cross-platform access (web and desktop applications)
                        </li>
                        <li>Privacy-focused family data management</li>
                    </ul>
                    <h3>3.2 Subscription Plans</h3>
                    <p>
                        We offer various subscription plans with different
                        features and usage limits. Specific plan details,
                        features, and limitations are described on our pricing
                        page and during the subscription process.
                    </p>
                    <h3>3.3 Service Availability</h3>
                    <p>
                        Our services are provided on a subscription basis and
                        are accessible worldwide, subject to applicable laws and
                        regulations.
                    </p>

                    <h2>4. Pricing and Payments</h2>
                    <h3>4.1 Subscription Fees</h3>
                    <p>
                        Subscription fees are displayed on our pricing page and
                        during the checkout process. All prices are shown
                        inclusive of applicable taxes unless otherwise stated.
                        We reserve the right to change our pricing with advance
                        notice to existing subscribers.
                    </p>
                    <h3>4.2 Payment Methods</h3>
                    <p>
                        We accept various payment methods including major credit
                        cards and other payment processors as available. Payment
                        is processed through secure third-party payment
                        providers.
                    </p>
                    <h3>4.3 Billing Cycle</h3>
                    <p>
                        Subscription fees are billed in advance on a recurring
                        basis according to your chosen billing cycle (monthly,
                        annually, etc.). Your subscription will automatically
                        renew unless cancelled before the next billing cycle.
                    </p>
                    <h3>4.4 Tax Obligations</h3>
                    <p>
                        You are responsible for any applicable taxes, duties, or
                        governmental charges that may apply to your subscription
                        based on your location.
                    </p>

                    <h2>5. Payment Processing</h2>
                    <h3>5.1 Authorization</h3>
                    <p>
                        By providing payment information, you authorize us to
                        charge the applicable fees to your chosen payment
                        method. You represent that you have the legal right to
                        use the payment method provided.
                    </p>
                    <h3>5.2 Failed Payments</h3>
                    <p>
                        If a payment fails, we may attempt to process the
                        payment again. If payment continues to fail, we may
                        suspend or terminate your subscription after reasonable
                        notice.
                    </p>
                    <h3>5.3 Payment Disputes</h3>
                    <p>
                        If you believe there is an error in your billing, please
                        contact us at contact@dotslash.fr within 30 days of the
                        charge. We will investigate and resolve any legitimate
                        billing errors.
                    </p>

                    <h2>6. Free Trials and Promotional Offers</h2>
                    <h3>6.1 Free Trial Terms</h3>
                    <p>
                        We may offer free trials of our services. Free trials
                        are limited to new customers and may have restricted
                        features or usage limits. You may only use one free
                        trial per customer.
                    </p>
                    <h3>6.2 Trial Conversion</h3>
                    <p>
                        Unless you cancel before the end of your free trial
                        period, your trial will automatically convert to a paid
                        subscription and you will be charged the applicable
                        subscription fee.
                    </p>
                    <h3>6.3 Promotional Codes</h3>
                    <p>
                        Promotional codes and discounts may be subject to
                        additional terms and conditions, including expiration
                        dates and usage restrictions.
                    </p>

                    <h2>7. Subscription Management</h2>
                    <h3>7.1 Plan Changes</h3>
                    <p>
                        You may upgrade or downgrade your subscription plan at
                        any time through your account settings. Changes will
                        take effect at the next billing cycle unless otherwise
                        specified.
                    </p>
                    <h3>7.2 Cancellation</h3>
                    <p>
                        You may cancel your subscription at any time through
                        your account settings or by contacting us at
                        contact@dotslash.fr. Cancellation will take effect at
                        the end of your current billing period.
                    </p>
                    <h3>7.3 Account Suspension</h3>
                    <p>
                        We may suspend access to paid features if payment is
                        overdue or if you violate our Terms of Use.
                    </p>

                    <h2>8. Refund and Return Policy</h2>
                    <h3>8.1 Refund Eligibility</h3>
                    <p>We offer refunds under the following circumstances:</p>
                    <ul>
                        <li>
                            Service unavailability due to technical issues for
                            more than 48 consecutive hours
                        </li>
                        <li>Billing errors or unauthorized charges</li>
                        <li>
                            Cancellation within 14 days of initial subscription
                            purchase
                        </li>
                        <li>
                            As required by applicable consumer protection laws
                        </li>
                    </ul>
                    <h3>8.2 Refund Process</h3>
                    <p>
                        To request a refund, contact us at contact@dotslash.fr
                        with your account details and reason for the refund
                        request. We will review your request and respond within
                        5 business days. Approved refunds will be processed
                        within 10 business days.
                    </p>
                    <h3>8.3 Partial Refunds</h3>
                    <p>
                        For mid-cycle cancellations, we may provide partial
                        refunds calculated on a pro-rata basis at our
                        discretion.
                    </p>
                    <h3>8.4 No Refund Situations</h3>
                    <p>
                        Refunds will not be provided for subscription
                        cancellations due to Terms of Use violations or account
                        terminations for cause.
                    </p>

                    <h2>9. Delivery and Access</h2>
                    <h3>9.1 Service Delivery</h3>
                    <p>
                        As a digital service, Enklave is delivered
                        electronically through our web platform and
                        applications. Access is provided immediately upon
                        successful payment processing and account activation.
                    </p>
                    <h3>9.2 System Requirements</h3>
                    <p>
                        You are responsible for ensuring you have the necessary
                        hardware, software, and internet connection to access
                        our services. Minimum system requirements are available
                        on our website.
                    </p>

                    <h2>10. Warranties and Disclaimers</h2>
                    <h3>10.1 Service Warranty</h3>
                    <p>
                        We warrant that our services will substantially conform
                        to the published service descriptions. This warranty is
                        limited to the correction of defects or the provision of
                        a refund as described in our refund policy.
                    </p>
                    <h3>10.2 Disclaimer</h3>
                    <p>
                        Except as expressly stated herein, our services are
                        provided "as is" without warranties of any kind, either
                        express or implied, including but not limited to
                        warranties of merchantability, fitness for a particular
                        purpose, or non-infringement.
                    </p>
                    <h3>10.3 Data Backup</h3>
                    <p>
                        While we implement security measures to protect your
                        data, you are responsible for maintaining your own
                        backups of important information stored in our service.
                    </p>

                    <h2>11. Limitation of Liability for Sales</h2>
                    <p>
                        In addition to the limitations set forth in our Terms of
                        Use, our liability for any claims related to the
                        purchase of our services shall not exceed the total
                        amount paid by you for the specific service giving rise
                        to the claim during the twelve months preceding the
                        claim.
                    </p>

                    <h2>12. Consumer Rights</h2>
                    <h3>12.1 EU Consumer Rights</h3>
                    <p>
                        If you are a consumer located in the European Union, you
                        have certain rights under EU consumer protection laws,
                        including a 14-day withdrawal right for distance
                        contracts. These rights are in addition to any remedies
                        provided in these Sales Terms.
                    </p>
                    <h3>12.2 Other Jurisdictions</h3>
                    <p>
                        Consumers in other jurisdictions may have additional
                        rights under applicable consumer protection laws. These
                        Sales Terms do not limit any mandatory consumer rights
                        that cannot be excluded by agreement.
                    </p>

                    <h2>13. Force Majeure</h2>
                    <p>
                        We shall not be liable for any failure or delay in
                        performance under these Sales Terms that is due to fire,
                        flood, earthquake, elements of nature, acts of God, acts
                        of war, terrorism, riots, civil disorders, rebellions,
                        or other similar causes beyond our reasonable control.
                    </p>

                    <h2>14. Governing Law and Dispute Resolution</h2>
                    <h3>14.1 Governing Law</h3>
                    <p>
                        These Sales Terms are governed by French law. Any
                        disputes arising from the sale of our services will be
                        resolved according to French law and through French
                        courts.
                    </p>
                    <h3>14.2 Alternative Dispute Resolution</h3>
                    <p>
                        For consumer disputes, you may also access alternative
                        dispute resolution procedures as provided by applicable
                        consumer protection laws.
                    </p>

                    <h2>15. Modification of Sales Terms</h2>
                    <p>
                        We may modify these Sales Terms from time to time. We
                        will notify you of material changes by email or through
                        our platform. Changes will apply to future purchases and
                        renewals but will not affect existing subscription
                        periods unless required by law.
                    </p>

                    <h2>16. Contact Information</h2>
                    <p>
                        For questions about these Sales Terms, billing issues,
                        or refund requests, please contact us:
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
                            These Terms and Conditions of Sale, together with
                            our Terms of Use, constitute the complete agreement
                            between you and Dotslash regarding the purchase and
                            use of our subscription services.
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
