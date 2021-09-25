import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import { config } from "./config";

export default defineConfig({
	base: config.pathPrefix,
	plugins: [visualizer()],
	logLevel: "warn",
	build: {
		rollupOptions: {
			input: "src/main.ts",
		},
		manifest: true,
	},
});
