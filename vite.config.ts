import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:7070',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    build: {
        rollupOptions: {
            output: {
                // Ensure favicon and manifest files are copied correctly
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name?.endsWith('.webmanifest')) {
                        return '[name][extname]';
                    }
                    return 'assets/[name]-[hash][extname]';
                },
            },
        },
    },
});
