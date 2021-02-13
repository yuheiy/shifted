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
			name: "sass-utilities",
			dependencies: [
				"src/assets/styles/utilities/*.scss",
				"!src/assets/styles/utilities/index.scss",
			],
			outputs: [
				{
					path: "src/assets/styles/utilities/index.scss",
					template: "src/assets/styles/utilities/index.scss.hbs",
				},
			],
		},
		{
			name: "sass-components",
			dependencies: [
				"src/assets/components/*.scss",
				"!src/assets/components/index.scss",
			],
			outputs: [
				{
					path: "src/assets/components/index.scss",
					template: "src/assets/components/index.scss.hbs",
				},
			],
		},
		{
			name: "stimulus-controllers",
			dependencies: [
				"src/assets/controllers/*.js",
				"!src/assets/controllers/index.js",
			],
			outputs: [
				{
					path: "src/assets/controllers/index.js",
					template: "src/assets/controllers/index.js.hbs",
				},
			],
		},
	],
};
