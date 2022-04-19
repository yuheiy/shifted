import "../styles/main.css";
import "focus-options-polyfill";
import "focus-visible";
import "wicg-inert";
import "./stores";
import Alpine from "alpinejs";
import components from "./components";

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

Alpine.plugin(components);

(window as any).Alpine = Alpine;
Alpine.start();
