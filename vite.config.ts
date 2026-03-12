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

        // 🔹 FIX: standalone se uper battery/time dikhega,
        // fullscreen hatane se hide hona band ho jayega.
        display: "standalone",

        // 🔹 FIX: window-controls-overlay hataya taaki uper black bar na aaye
        display_override: ["standalone", "minimal-ui"],

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
            sizes: "192x192", // ⚠️ Ensure karein ye 192px ka hi ho
            type: "image/png",
          },
          {
            src: "logo.png",
            sizes: "512x512", // ⚠️ Ensure karein ye 512px ka hi ho
            type: "image/png",
            purpose: "any",
          },
          {
            src: "logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable", // 🔹 Android app icon shape ke liye
          },
        ],
        // 🔹 Shortcuts add karne se app icon par long press karne se menu aata hai
        shortcuts: [
          {
            name: "Dashboard",
            url: "/",
            icons: [{ src: "logo.png", sizes: "192x192" }],
          },
        ],
        screenshots: [
          {
            src: "screenshot-mobile.png",
            sizes: "1080x1920",
            type: "image/png",
            form_factor: "narrow",
            label: "Osylite Home",
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
