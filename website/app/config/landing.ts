export const landingConfig = {
    hero: {
        title: "Simplify your family's digital life",
        description:
            "Enklave is the collaborative family and couple management software that helps you organize, share, and manage your daily life together.",
        cta: "Get started for free",
        githubUrl: "https://github.com/Xen0Xys/Enklave",
        githubStars: "2.1k",
        badge: "Open Source & Self-Hosted",
    },
    problem: {
        title: "Family coordination is getting harder",
        description:
            "Managing family life across multiple apps and platforms creates chaos. Important documents get lost, shopping lists are forgotten, and communication breaks down.",
        painPoints: [
            {
                icon: "iconoir:multiple-pages",
                title: "Scattered Information",
                description:
                    "Photos, documents, and notes spread across different apps and devices",
            },
            {
                icon: "iconoir:shopping-cart",
                title: "Forgotten Tasks",
                description:
                    "Shopping lists, appointments, and family tasks get lost in messaging apps",
            },
            {
                icon: "iconoir:privacy-policy",
                title: "Privacy Concerns",
                description:
                    "Your family's personal data stored on servers you don't control",
            },
        ],
    },
    demo: {
        title: "See Enklave in action",
        description:
            "Experience how Enklave brings your family together in one secure platform",
        features: [
            "Secure file storage and sharing",
            "Collaborative shopping lists",
            "Family notes and organization",
            "Cross-platform access",
        ],
        cta: "Try the Demo",
        demoUrl: "#demo",
        mockup: {
            title: "The Smith Family",
            sections: {
                recentFiles: "Recent Files",
                shoppingList: "Shopping List",
            },
            files: [
                "Family_Budget_2025.pdf",
                "Kids School Documents",
            ],
            timestamps: [
                "2 min ago",
                "1 hour ago",
            ],
            shoppingItems: [
                "Organic milk",
                "Fresh bread",
                "Kids snacks",
            ],
            status: "✓ All family members connected",
            statusText: "Secure",
        },
    },
    features: {
        title: "Everything your family needs, in one place",
        description:
            "Discover the features that make Enklave the perfect solution for family collaboration and organization.",
        items: [
            {
                icon: "iconoir:folder",
                title: "Secure file storage",
                description:
                    "Store and organize important family documents, photos, and media with end-to-end encryption and organized folder structures.",
            },
            {
                icon: "iconoir:list",
                title: "Shared shopping lists",
                description:
                    "Create and share shopping lists with family members. Real-time updates ensure everyone stays in sync.",
            },
            {
                icon: "iconoir:notes",
                title: "Family notes",
                description:
                    "Keep track of important information, schedules, and reminders that everyone in the family can access.",
            },
            {
                icon: "iconoir:share-android",
                title: "Smart sharing",
                description:
                    "Share files and information with specific family members with granular permissions and access controls.",
            },
            {
                icon: "iconoir:laptop",
                title: "Cross-platform access",
                description:
                    "Access your family's information from any device - web browser, desktop app, or mobile (coming soon).",
            },
            {
                icon: "iconoir:home-secure",
                title: "Privacy & Security",
                description:
                    "Self-host on your own infrastructure with full source code transparency. Your family data stays private.",
            },
        ],
    },
    socialProof: {
        title: "Trusted by families worldwide",
        description:
            "Join families who have simplified their digital life with Enklave",
        stats: [
            {
                value: "2.1k+",
                label: "GitHub Stars",
                icon: "iconoir:star",
            },
            {
                value: "500+",
                label: "Families",
                icon: "iconoir:home",
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
                quote: "Finally, a place to keep all our family documents organized and secure. No more searching through dozens of apps.",
                author: "Sarah Chen",
                role: "Mother of 3",
                company: "Toronto, Canada",
                avatar: "/avatars/sarah.jpg",
            },
            {
                quote: "The shopping lists feature has revolutionized our grocery shopping. Everyone can add items and we never forget anything.",
                author: "Miguel Rodriguez",
                role: "Father",
                company: "Barcelona, Spain",
                avatar: "/avatars/miguel.jpg",
            },
            {
                quote: "Being able to self-host gives us peace of mind that our family's private information stays private.",
                author: "Alex Thompson",
                role: "Family",
                company: "Austin, Texas",
                avatar: "/avatars/alex.jpg",
            },
        ],
    },
    pricing: {
        title: "Flexible pricing for every family",
        description: "Choose the plan that's right for your family, start for free.",
        freePlanCta: "Looking for the Free plan?",
        freePlanButton: "Create an account now",
        plans: [
            {
                title: "Family",
                description: "Perfect for families and couples getting started.",
                price: "$4.99",
                pricePeriod: "/ month",
                isPrimary: true,
                features: [
                    "Secure storage (500 GB)",
                    "Unlimited shopping lists & notes",
                    "Access on 10 devices",
                    "Email support",
                ],
                cta: "Choose Family",
            },
            {
                title: "Pro",
                description:
                    "For larger families that need more storage and features.",
                price: "$9.99",
                pricePeriod: "/ month",
                isPrimary: false,
                features: [
                    "Unlimited storage",
                    "Advanced sharing controls",
                    "Priority support",
                    "Custom backup schedules",
                ],
                cta: "Choose Pro",
            },
            {
                title: "Self-Hosted",
                description:
                    "Deploy Enklave on your own infrastructure for complete control.",
                price: "Free",
                isPrimary: false,
                features: [
                    "Full source code access",
                    "Unlimited storage",
                    "Complete privacy control",
                    "Community support",
                ],
                cta: "Get Started",
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
                        pro: "Unlimited",
                        selfhosted: "Unlimited",
                    },
                },
                {
                    name: "File and folder sharing",
                    plans: {
                        free: true,
                        family: true,
                        pro: true,
                        selfhosted: true,
                    },
                },
                {
                    name: "Shopping lists & notes",
                    plans: {
                        free: "Limited",
                        family: "Unlimited",
                        pro: "Unlimited",
                        selfhosted: "Unlimited",
                    },
                },
                {
                    name: "Advanced sharing permissions",
                    plans: {
                        free: false,
                        family: true,
                        pro: true,
                        selfhosted: true,
                    },
                },
                {
                    name: "Cross-device access",
                    plans: {
                        free: "3 devices",
                        family: "10 devices",
                        pro: "Unlimited",
                        selfhosted: "Unlimited",
                    },
                },
                {
                    name: "Custom backup schedules",
                    plans: {
                        free: false,
                        family: false,
                        pro: true,
                        selfhosted: true,
                    },
                },
                {
                    name: "Self-hosting",
                    plans: {
                        free: false,
                        family: false,
                        pro: false,
                        selfhosted: true,
                    },
                },
                {
                    name: "Customer support",
                    plans: {
                        free: "Community",
                        family: "Email",
                        pro: "Priority",
                        selfhosted: "Community",
                    },
                },
            ],
        },
    },
    newsletter: {
        title: "Stay connected with your family",
        description:
            "Get family organization tips, product updates, and early access to new features. Join our community of organized families.",
        placeholder: "family@example.com",
        cta: "Join the community",
        features: [
            "Monthly family organization tips and best practices",
            "Early access to new features and updates",
            "Family-friendly tutorials and guides",
            "No spam, unsubscribe anytime",
        ],
        stats: {
            subscribers: "5,200+",
            subscribersLabel: "families",
            frequency: "Monthly updates",
        },
        additionalStats: {
            stat1Label: "Family subscribers",
            stat2Value: "Monthly",
            stat2Label: "Organization tips",
            stat3Value: "Early",
            stat3Label: "Feature access",
        },
    },
};
