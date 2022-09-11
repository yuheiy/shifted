import "../styles/main.css";
import "focus-visible";
import Alpine from "alpinejs";
import focus from "@alpinejs/focus";
import ui from "@alpinejs/ui";
import components from "./components";
import stores from "./stores";

// https://vitejs.dev/guide/env-and-mode.html#env-variables
if (import.meta.env.DEV) {
	console.log({
		BASE_URL: import.meta.env.BASE_URL,
		PROD: import.meta.env.PROD,
		DEV: import.meta.env.DEV,
	});
}

Alpine.plugin(focus);
Alpine.plugin(ui);
Alpine.plugin(components);
Alpine.plugin(stores);

(window as any).Alpine = Alpine;
Alpine.start();
