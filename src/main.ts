import "focus-visible";
import "wicg-inert";
import "./main.scss";

declare global {
	interface HTMLElement {
		inert: boolean;
	}
}

// to prevent Vite’s syntax errors, assign to the variable
const _ = import.meta.globEager(
	"./{components,controllers}/**/*.controller.ts"
);

// https://vitejs.dev/guide/env-and-mode.html#env-variables
if (import.meta.env.DEV) {
	console.log({
		BASE_URL: import.meta.env.BASE_URL,
		PROD: import.meta.env.PROD,
		DEV: import.meta.env.DEV,
	});
}
