// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

// noinspection TypeScriptValidateTypes
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: {enabled: true},
    modules: ["@nuxt/icon", "shadcn-nuxt"],
    css: ["./app/assets/css/tailwind.css"],
    vite: {
        plugins: [tailwindcss() as unknown as any],
    },
    shadcn: {
        prefix: "",
        componentDir: "./app/components/ui",
    },
});
