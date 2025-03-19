import { defineConfig } from 'vite'

export default defineConfig({
    base: '/ehr',
    server: {
        port: 8080
    },
    esbuild: { legalComments: 'none' }
})
