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
      registerType: "autoUpdate", // App naye update par khud refresh ho jayega
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "Channel Management | ANG Growth", // Full Name
        short_name: "ANG Growth", // Home screen name
        description: "Channel Management Application",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone", // Browser UI hata dega (Native app jaisa dikhega)
        icons: [
          {
            src: "/pwa-192x192.png", // Ye images aapko banani hongi (Step 3 dekhein)
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable", // Android icon shape adopt karne ke liye
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
