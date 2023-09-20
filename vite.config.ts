import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vitest/config"

let PORT = 3000

if (process.env.PORT) {
    PORT = parseInt(process.env.PORT, 10)
}

export default defineConfig({
    plugins: [sveltekit()],
    test: {
        include: ["src/**/*.{test,spec}.{js,ts}"],
    },
    server: {
        port: PORT,
    },
    preview: {
        port: PORT,
        host: "0.0.0.0",
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "src/lib/style/base";`,
            },
        },
    },
})
