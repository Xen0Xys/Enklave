import {defineContentConfig, defineCollection} from "@nuxt/content";

export default defineContentConfig({
    collections: {
        newsletter: defineCollection({
            source: "newsletter/**/*.md",
            type: "page",
        }),
    },
});
