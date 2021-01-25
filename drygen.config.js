module.exports = {
	rules: [
		{
			name: "pug-components",
			dependencies: [
				"src/site/_includes/components/*.pug",
				"!src/site/_includes/components/index.pug",
			],
			outputs: [
				{
					path: "src/site/_includes/components/index.pug",
					template: "src/site/_includes/components/index.pug.hbs",
				},
			],
		},
		{
			name: "sass-imports",
			dependencies: {
				utility: ["src/assets/styles/utilities/*.scss"],
				component: ["src/assets/components/*.scss"],
			},
			outputs: [
				{
					path: "src/assets/main.scss",
					template: "src/assets/main.scss.hbs",
				},
			],
		},
		{
			name: "stimulus-controllers",
			dependencies: [
				"src/assets/controllers/*.ts",
				"!src/assets/controllers/index.ts",
			],
			outputs: [
				{
					path: "src/assets/controllers/index.ts",
					template: "src/assets/controllers/index.ts.hbs",
				},
			],
		},
	],
};
