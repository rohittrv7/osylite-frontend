import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa"; // 1. Import added

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // 2. PWA Plugin Configuration
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "logo.png"], // logo.png yahan add karein
      manifest: {
        name: "Channel Management | ANG Growth",
        short_name: "ANG Growth",
        description:
          "Official Channel Management Application for the ANG Growth Ecosystem providing secure management tools.",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "/logo.png", // Aapne public mein logo.png rakha hai toh wahi use karein
            sizes: "192x192", // Lekin yaad rahe file ka size 192x192 ya 512x512 ho
            type: "image/png",
          },
          {
            src: "/logo.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
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
