import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/my-diary-app/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Diary App",
        short_name: "Diary",
        description: "A client-side diary PWA",
        theme_color: "#ffffff",
        start_url: "/my-diary-app/", // Ensure start_url points to the correct path
        display: "standalone", // Make sure it runs as a PWA
        background_color: "#ffffff",
        icons: [
          {
            src: "/my-diary-app/icon-192x192.png", // Adjust path for GitHub Pages
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/my-diary-app/icon-512x512.png", // Adjust path for GitHub Pages
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
