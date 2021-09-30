import "focus-options-polyfill";
import "focus-visible";
import "wicg-inert";
import "./main.scss";
import "./scripts/lib/smooth-scroll";
import "./scripts/lib/stimulus-autoloader";

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
