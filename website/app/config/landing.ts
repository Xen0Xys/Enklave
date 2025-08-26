export const landingConfig = {
    hero: {
        title: "Secure your data. Take back control.",
        description:
            "Enklave is the open-source solution to protect your digital life. Simple, transparent and completely under your control.",
        cta: "Get started for free",
        githubUrl: "https://github.com/Xen0Xys/Enklave",
        githubStars: "2.1k",
        badge: "Open Source & Self-Hosted",
    },
    problem: {
        title: "Data breaches are happening every day",
        description:
            "Your sensitive data shouldn't be locked away in proprietary systems you can't trust or control.",
        painPoints: [
            {
                icon: "iconoir:warning-triangle",
                title: "Data Breaches",
                description:
                    "Corporate password managers get hacked, exposing millions of credentials",
            },
            {
                icon: "iconoir:eye-off",
                title: "No Transparency",
                description:
                    "Closed-source solutions hide how they handle your most sensitive data",
            },
            {
                icon: "iconoir:lock",
                title: "Vendor Lock-in",
                description:
                    "Your data trapped in proprietary formats with expensive migration costs",
            },
        ],
    },
    demo: {
        title: "See Enklave in action",
        description:
            "Experience end-to-end encryption that puts you in control",
        features: [
            "Zero-knowledge architecture",
            "Self-hosted deployment",
            "Open source transparency",
            "Enterprise-grade security",
        ],
        cta: "Try the Demo",
        demoUrl: "#demo",
    },
    features: {
        title: "Everything you need, and more",
        description:
            "Discover the features that make Enklave the ideal solution for secure data management.",
        items: [
            {
                icon: "iconoir:lock-key",
                title: "End-to-end encryption",
                description:
                    "AES-256-GCM encryption with client-side key derivation. Your data is encrypted before it leaves your device.",
            },
            {
                icon: "iconoir:share",
                title: "Secure sharing",
                description:
                    "Share encrypted data with granular permissions, expiration dates, and audit trails. Perfect for team workflows.",
            },
            {
                icon: "iconoir:laptop",
                title: "Cross-platform SDKs",
                description:
                    "Native libraries for JavaScript, Python, Go, and REST APIs. Integrate security into your existing stack.",
            },
            {
                icon: "iconoir:git-merge",
                title: "Version control",
                description:
                    "Git-like versioning for encrypted data with atomic operations and conflict resolution for teams.",
            },
            {
                icon: "iconoir:group",
                title: "Team management",
                description:
                    "RBAC with fine-grained permissions, SSO integration, and comprehensive audit logs for compliance.",
            },
            {
                icon: "iconoir:code",
                title: "Open Source & Self-Hosted",
                description:
                    "Deploy on your infrastructure with Docker/Kubernetes. Full source code transparency and security audits.",
            },
        ],
    },
    socialProof: {
        title: "Trusted by developers worldwide",
        description:
            "Join thousands of developers who trust Enklave with their most sensitive data",
        stats: [
            {
                value: "2.1k+",
                label: "GitHub Stars",
                icon: "iconoir:star",
            },
            {
                value: "50+",
                label: "Contributors",
                icon: "iconoir:group",
            },
            {
                value: "10k+",
                label: "Downloads",
                icon: "iconoir:download",
            },
            {
                value: "99.9%",
                label: "Uptime",
                icon: "iconoir:check-circle",
            },
        ],
        testimonials: [
            {
                quote: "Finally, a password manager I can trust. Being open-source means I can verify the security claims myself.",
                author: "Sarah Chen",
                role: "Senior Developer",
                company: "TechCorp",
                avatar: "/avatars/sarah.jpg",
            },
            {
                quote: "The self-hosting option gives us complete control over our sensitive data. Perfect for our security requirements.",
                author: "Miguel Rodriguez",
                role: "DevOps Engineer",
                company: "SecureStart",
                avatar: "/avatars/miguel.jpg",
            },
            {
                quote: "Clean API, excellent documentation, and the peace of mind that comes with open source. Enklave checks all boxes.",
                author: "Alex Thompson",
                role: "CTO",
                company: "DataFlow",
                avatar: "/avatars/alex.jpg",
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
        title: "Stay ahead of the curve",
        description:
            "Get security insights, technical deep-dives, and early access to new features. Join our developer community.",
        placeholder: "developer@company.com",
        cta: "Join the community",
        features: [
            "Monthly security insights and best practices",
            "Early access to beta features and APIs",
            "Technical deep-dives and implementation guides",
            "No spam, unsubscribe anytime",
        ],
        stats: {
            subscribers: "5,200+",
            frequency: "Monthly updates",
        },
    },
};
