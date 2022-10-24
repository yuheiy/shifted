import { Alpine } from "alpinejs";
import camelCase from "camelcase";

export default function (Alpine: Alpine) {
	const modules = import.meta.glob<Parameters<typeof Alpine.data>[1]>("./*.ts", {
		import: "default",
		eager: true,
	});

	for (const [path, module] of Object.entries(modules)) {
		const base = path.split("/").at(-1);
		const name = base.split(".").slice(0, -1).join(".");
		Alpine.data(camelCase(name), module);
	}
}
