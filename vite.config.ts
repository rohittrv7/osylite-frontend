import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "logo.png"],
      manifest: {
        id: "com.osylite.app.v1",
        name: "Osylite",
        short_name: "Osylite",
        description:
          "Official Channel Management Application for the ANG Growth Ecosystem.",

        theme_color: "#000000",
        background_color: "#000000",

        // 🔥 CRITICAL FIX: Ye app ko native app ki tarah full-screen open karega bina URL bar ke
        display: "standalone",
        display_override: [
          "window-controls-overlay",
          "standalone",
          "minimal-ui",
        ],
        orientation: "portrait-primary",

        scope: "/",
        start_url: "/?source=pwa",
        dir: "ltr",
        lang: "en-US",
        categories: ["finance", "shopping", "utilities"],
        prefer_related_applications: false,
        icons: [
          {
            src: "/logo.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        shortcuts: [
          {
            name: "Dashboard",
            short_name: "Dashboard",
            url: "/?source=shortcut",
            icons: [{ src: "/logo.png", sizes: "192x192" }],
          },
        ],
        screenshots: [
          {
            src: "/screenshot-mobile.png",
            sizes: "1080x1920",
            type: "image/png",
            form_factor: "narrow",
            label: "Osylite Home",
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      host: "localhost",
      port: 5173,
      protocol: "ws",
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    // Note: Yahan 'manualChunks' use nahi kiya hai taaki purana 'Activity undefined' wala white screen issue dobara na aaye. Vite khud smartly chunks bana lega.
  },
});
