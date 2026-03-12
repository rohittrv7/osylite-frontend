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
        id: "com.osylite.app",
        name: "Osylite",
        short_name: "Osylite",
        description:
          "Official Channel Management Application for the ANG Growth Ecosystem.",
        display: "standalone",
        display_override: ["fullscreen", "window-controls-overlay"],
        orientation: "portrait",
        background_color: "#000000",
        theme_color: "#000000",
        start_url: "/",
        scope: "/",
        dir: "ltr",
        lang: "en-US",
        categories: ["finance", "shopping", "utilities"],
        icons: [
          {
            src: "logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "screenshot-mobile.png",
            sizes: "1080x1920",
            type: "image/png",
            form_factor: "narrow",
            label: "Osylite Dashboard",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
