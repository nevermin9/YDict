import { resolve } from "path"
import { fileURLToPath } from "node:url"
import { vitePreprocess } from "@sveltejs/kit/vite"
import adapter from "@sveltejs/adapter-cloudflare"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const dirname = fileURLToPath(new URL(".", `${import.meta.url}`))

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter(),
        alias: {
            $api: resolve(dirname, "./src/api"),
        },
    },
}

export default config
