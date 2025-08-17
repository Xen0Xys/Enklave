// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import * as fs from "fs";

const pkg = JSON.parse(fs.readFileSync("../package.json", "utf-8"));

// noinspection TypeScriptValidateTypes
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: {enabled: true},
    modules: ["@nuxt/icon", "shadcn-nuxt", "@pinia/nuxt", "@nuxtjs/color-mode"],
    vite: {
        plugins: [tailwindcss() as unknown as any],
        clearScreen: false,
        envPrefix: ["VITE_", "TAURI_"],
        server: {
            strictPort: true,
            hmr: {
                protocol: "ws",
                host: "0.0.0.0",
                port: 5183,
            },
        },
    },
    css: ["./app/assets/css/tailwind.css"],
    shadcn: {
        prefix: "",
        componentDir: "./app/components/ui",
    },
    runtimeConfig: {
        public: {
            apiBase: "",
            appVersion: pkg.version,
        },
    },
    colorMode: {
        classSuffix: "",
    },
});
