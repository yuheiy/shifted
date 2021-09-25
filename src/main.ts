import "focus-options-polyfill";
import "focus-visible";
import "wicg-inert";
import "./lib/smooth-scroll";
import "./lib/stimulus-autoloader";
import "./main.scss";

declare global {
	interface HTMLElement {
		inert: boolean;
	}
}

// https://vitejs.dev/guide/env-and-mode.html#env-variables
if (import.meta.env.DEV) {
	console.log({
		BASE_URL: import.meta.env.BASE_URL,
		PROD: import.meta.env.PROD,
		DEV: import.meta.env.DEV,
	});
}
