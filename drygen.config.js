/**
 * @type {import("drygen").UserConfig}
 */
module.exports = {
	rules: [
		{
			name: "pug/components",
			dependencies: [
				"src/site/includes/components/*.pug",
				"!src/site/includes/components/.components.pug",
			],
			outputs: [
				{
					path: "src/site/includes/components/.components.pug",
					template: "src/site/includes/components/.components.pug.ejs",
				},
			],
		},
	],
};
