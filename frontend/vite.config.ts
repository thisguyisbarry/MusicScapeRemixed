import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    remix({
      basename: "/",
      buildDirectory: "build",
      future: {
        /* any enabled future flags */
      },
      ignoredRouteFiles: ["**/*.css"],
      serverBuildFile: "index.js",
    }),
  ],
});
