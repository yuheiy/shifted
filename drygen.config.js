/**
 * @type {import("drygen").UserConfig}
 */
module.exports = {
	rules: [
		{
			name: "pug/components",
			dependencies: [
				"src/components/**/*.pug",
				"!src/components/components.pug",
			],
			outputs: [
				{
					path: "src/components/components.pug",
					template: "src/components/components.pug.ejs",
				},
			],
		},
		{
			name: "scss/components",
			dependencies: [
				"src/components/**/*.scss",
				"!src/components/components.scss",
			],
			outputs: [
				{
					path: "src/components/components.scss",
					template: "src/styles/import.scss.ejs",
				},
			],
		},
		...["settings", "tools", "objects", "scopes", "themes"].map((type) => ({
			name: `scss/${type}`,
			dependencies: [
				`src/styles/${type}/**/*.scss`,
				`!src/styles/${type}.scss`,
			],
			outputs: [
				{
					path: `src/styles/${type}.scss`,
					template: "src/styles/import.scss.ejs",
				},
			],
		})),
	],
};
