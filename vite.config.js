import { execSync } from "node:child_process";
import { resolve } from "node:path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from "rollup-plugin-visualizer";
import { VitePWA } from 'vite-plugin-pwa'
import EnvironmentPlugin from "vite-plugin-environment";

let faviconURL = '/LYF-LOGO.jpg'

let hash = "";

try {
  hash = execSync("git rev-parse --short HEAD").toString().trim();
} catch (error) {
  hash = "DEVELOPMENT";
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin({
      COMMIT_HASH: hash,
    }),
    VitePWA({
      registerType: 'autoUpdate', // autoUpdate | interactive | manual
      // add this to cache all the imports
      workbox: { globPatterns: ["**/*"] },
      // add this to cache all the
      // static assets in the public folder
      includeAssets: ["**/*"],
      manifest: {
        theme_color: '#ffffff',
        icons: [
          {
            src: faviconURL,
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: faviconURL,
            sizes: '512x512',
            type: 'image/jpg'
          }
        ]
      }
    })
  ],
  build: {
    target: "esnext",
    assetsDir: "",
    rollupOptions: {
      plugins: [visualizer()],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or "modern", "legacy"
        importers: [
          // ...
        ],
      },
    },
  },
  resolve: {
    alias: {
      "@app": resolve(__dirname, "./src"),
      "@pages": resolve(__dirname, "./src/pages"),
      "@components": resolve(__dirname, "./src/components"),
      "@core": resolve(__dirname, "./src/core"),
      "@layouts": resolve(__dirname, "./src/layouts"),
    },
  },
})