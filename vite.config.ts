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

        // Native app experience ke liye zaroori
        display: "standalone",
        display_override: ["standalone", "minimal-ui"],
        orientation: "portrait-primary",

        background_color: "#000000",
        theme_color: "#000000",

        // Root slash aur query zaroori hai proper entry point detect karne ke liye
        start_url: "/?source=pwa",
        scope: "/",
        dir: "ltr",
        lang: "en-US",
        categories: ["finance", "shopping", "utilities"],

        // CRITICAL FIX: Ye browser ko batata hai ki Play Store ka wait mat karo,
        // seedha PWA install karo.
        prefer_related_applications: false,

        icons: [
          {
            // CRITICAL FIX: Images ke aage "/" lagana zaroori hai
            // Varna build ke baad manifest inko dhoond nahi pata aur app reject ho jata hai
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
            src: "/screenshot-mobile.png", // "/" added
            sizes: "1080x1920",
            type: "image/png",
            form_factor: "narrow",
            label: "Osylite Home",
          },
        ],
      },
      // Local testing ke liye devOptions on kar diye hain
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
    // Reference wala dedupe optimization
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },
  server: {
    port: 5174,
    strictPort: true,
    hmr: {
      host: "localhost",
      port: 5174,
      protocol: "ws",
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // App ko fast load karne ke liye smart chunk-splitting
        // Ye specific libraries ko alag bundle me daal dega taaki cache ho sake
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "vendor-react";
            if (id.includes("@reduxjs") || id.includes("react-redux"))
              return "vendor-redux";
            if (id.includes("socket.io-client")) return "vendor-socket";
            return "vendor"; // Baaki sab generic vendor file mein
          }
        },
      },
    },
  },
});
