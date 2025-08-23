export const landingConfig = {
    hero: {
        title: "Secure your data. Take back control.",
        description:
            "Enklave is the open-source solution to protect your digital life. Simple, transparent and completely under your control.",
        cta: "Get started for free",
    },
    features: {
        title: "Everything you need, and more",
        description:
            "Discover the features that make Enklave the ideal solution for secure data management.",
        items: [
            {
                icon: "lucide:lock",
                title: "End-to-end encryption",
                description:
                    "Your data is encrypted on your device before it's even sent to our servers. No one but you can access it.",
            },
            {
                icon: "lucide:share-2",
                title: "Secure sharing",
                description:
                    "Share files and folders with confidence using secure links, passwords, and expiration dates.",
            },
            {
                icon: "lucide:laptop",
                title: "Cross-platform access",
                description:
                    "Securely access your files from any device, whether it's a computer, tablet, or smartphone.",
            },
            {
                icon: "lucide:git-branch",
                title: "Version control",
                description:
                    "Easily restore previous versions of your files so you never lose your important work.",
            },
            {
                icon: "lucide:users",
                title: "Team management",
                description:
                    "Collaborate effectively by creating teams, managing members, and assigning granular permissions.",
            },
            {
                icon: "lucide:code",
                title: "Open Source and Transparent",
                description:
                    "Our code is open to everyone. See for yourself how we protect your data, with no black box.",
            },
        ],
    },
    pricing: {
        title: "Flexible pricing for everyone",
        description: "Choose the plan that's right for you, start for free.",
        freePlanCta: "Looking for the Free plan?",
        freePlanButton: "Create an account now",
        plans: [
            {
                title: "Family",
                description: "For advanced users and small teams.",
                price: "$4.99",
                pricePeriod: "/ month",
                isPrimary: true,
                features: [
                    "Secure storage (500 GB)",
                    "Advanced sharing with permissions",
                    "Access on 10 devices",
                    "Priority support",
                ],
                cta: "Choose Family",
            },
            {
                title: "Pro",
                description:
                    "For organizations that need security and control at scale.",
                price: "$9.99",
                pricePeriod: "/ month",
                isPrimary: false,
                features: [
                    "Unlimited storage",
                    "Team management & SSO",
                    "Audit logs",
                    "Dedicated 24/7 support",
                ],
                cta: "Choose Pro",
            },
            {
                title: "Enterprise",
                description:
                    "For organizations that need security and control at scale.",
                price: "Contact Us",
                isPrimary: false,
                features: [
                    "Unlimited storage",
                    "Team management & SSO",
                    "Audit logs",
                    "Dedicated 24/7 support",
                ],
                cta: "Contact Us",
            },
        ],
        comparison: {
            title: "Compare features",
            features: [
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
                    plans: {
                        free: true,
                        family: true,
                        pro: true,
                        enterprise: true,
                    },
                },
                {
                    name: "Version control",
                    plans: {
                        free: false,
                        family: true,
                        pro: true,
                        enterprise: true,
                    },
                },
                {
                    name: "Advanced sharing permissions",
                    plans: {
                        free: false,
                        family: true,
                        pro: true,
                        enterprise: true,
                    },
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
                    plans: {
                        free: false,
                        family: false,
                        pro: true,
                        enterprise: true,
                    },
                },
                {
                    name: "Audit logs",
                    plans: {
                        free: false,
                        family: false,
                        pro: true,
                        enterprise: true,
                    },
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
            ],
        },
    },
    newsletter: {
        title: "Stay informed",
        description:
            "Sign up for our newsletter to receive the latest news and updates.",
        placeholder: "Your email address",
        cta: "Subscribe",
    },
};
