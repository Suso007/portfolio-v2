import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // three.js alone is ~600kB and changes only when the dependency is
    // upgraded. Splitting the big third-party libraries into their own chunks
    // keeps them cached across deploys instead of being invalidated every time
    // a component changes.
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-three": ["three", "three-stdlib"],
          "vendor-gsap": [
            "gsap",
            "gsap/ScrollTrigger",
            "gsap/ScrollSmoother",
            "gsap/SplitText",
            "@gsap/react",
          ],
          "vendor-react": ["react", "react-dom", "react/jsx-runtime"],
        },
      },
    },
    // The three.js chunk is deliberately over the 500kB default and is loaded
    // lazily; warning about it on every build is just noise.
    chunkSizeWarningLimit: 700,
  },
});
