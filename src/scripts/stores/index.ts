import { Alpine } from "alpinejs";
import camelCase from "camelcase";

export default function (Alpine: Alpine) {
	const modules = import.meta.glob<() => Parameters<typeof Alpine.store>[1]>("./*.ts", {
		import: "default",
		eager: true,
	});

	for (const [path, module] of Object.entries(modules)) {
		const base = path.split("/").pop();
		const name = base.split(".").slice(0, -1).join(".");
		Alpine.store(camelCase(name), module());
	}
}
