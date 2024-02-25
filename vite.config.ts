import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      minify: false,
      manifest: {
        name: "Samadhi",
        icons: [
          {
            src: "/icon.svg",
            sizes: "any",
          },
        ],
        start_url: "/",
        display: "standalone",
        theme_color: "#0F172A",
        background_color: "#0F172A",
        lang: "en",
        scope: "/",
      },
    }),
  ],
});
