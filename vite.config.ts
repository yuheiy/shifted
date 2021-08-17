import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import { config } from "./config";

export default defineConfig({
	base: config.pathPrefix,
	plugins: [visualizer()],
	esbuild: {
		keepNames: true,
	},
	logLevel: "warn",
	build: {
		rollupOptions: {
			input: "src/main.ts",
		},
		manifest: true,
		terserOptions: {
			// https://github.com/github/catalyst/issues/98
			keep_classnames: /Element$/,
		},
	},
});
