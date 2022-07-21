/**
 * @type {import("drygen").UserConfig}
 */
module.exports = {
	rules: [
		{
			name: "mixins/.mixins.pug",
			dependencies: ["src/site/includes/mixins/*.pug", "!src/site/includes/mixins/.mixins.pug"],
			outputs: [
				{
					path: "src/site/includes/mixins/.mixins.pug",
					template: "src/site/includes/mixins/.mixins.pug.ejs",
				},
			],
		},
		{
			name: "components/index.ts",
			dependencies: ["src/scripts/components/*.ts", "!src/scripts/components/index.ts"],
			outputs: [
				{
					path: "src/scripts/components/index.ts",
					template: "src/scripts/components/index.ts.ejs",
				},
			],
		},
		{
			name: "stores/index.ts",
			dependencies: ["src/scripts/stores/*.ts", "!src/scripts/stores/index.ts"],
			outputs: [
				{
					path: "src/scripts/stores/index.ts",
					template: "src/scripts/stores/index.ts.ejs",
				},
			],
		},
	],
};
