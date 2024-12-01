import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from 'tailwindcss';
import svgr from 'vite-plugin-svgr';
// import { VitePWA } from 'vite-plugin-pwa'
import path from 'path';
const host = process.env.TAURI_DEV_HOST;

// https://vite.dev/config/
export default defineConfig({
  clearScreen: false,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    svgr(),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
    //   devOptions: {
    //     enabled: process.env.NODE_ENV !== "production", // Enable the PWA during development
    //   },
    //   manifest: {
    //     name: 'JS Runner',
    //     short_name: 'A typescript/javascript playground',
    //     description: 'A typescript/javascript playground',
    //     theme_color: '#1e293b',
    //     display: "fullscreen",
    //     start_url: "/",
    //     icons: [
    //       {
    //         src: 'pwa-64x64.png',
    //         sizes: '64x64',
    //         type: 'image/png'
    //       },
    //       {
    //         src: 'pwa-192x192.png',
    //         sizes: '192x192',
    //         type: 'image/png'
    //       },
    //       {
    //         src: 'pwa-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //         purpose: 'any'
    //       },
    //       {
    //         src: 'maskable-icon-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //         purpose: 'maskable'
    //       }
    //     ],
    //   }
    // })
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    target: 'esnext', // Ensures native support for WebAssembly
  },
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
  },
});

//
//
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
//
// // @ts-expect-error process is a nodejs global
// const host = process.env.TAURI_DEV_HOST;
//
// // https://vitejs.dev/config/
// export default defineConfig(async () => ({
//   plugins: [react()],
//
//   // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
//   //
//   // 1. prevent vite from obscuring rust errors
//   clearScreen: false,
//   // 2. tauri expects a fixed port, fail if that port is not available
//   server: {
//     port: 1420,
//     strictPort: true,
//     host: host || false,
//     hmr: host
//       ? {
//         protocol: "ws",
//         host,
//         port: 1421,
//       }
//       : undefined,
//     watch: {
//       // 3. tell vite to ignore watching `src-tauri`
//       ignored: ["**/src-tauri/**"],
//     },
//   },
// }));
