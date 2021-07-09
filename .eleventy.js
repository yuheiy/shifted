const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { nanoid } = require("nanoid");
const { config } = require("./config");
const { formatHTML } = require("./src/site/transforms/format-html");

module.exports = (eleventyConfig) => {
	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	eleventyConfig.setUseGitIgnore(false);

	eleventyConfig.addFilter("id", nanoid);

	eleventyConfig.addCollection("service", (collection) => {
		return collection
			.getFilteredByGlob("src/site/pages/services/*.md")
			.sort((a, b) => a.inputPath.localeCompare(b.inputPath));
	});

	eleventyConfig.addTransform("formatHTML", formatHTML);

	eleventyConfig.addWatchTarget("src/components/components.pug");

	eleventyConfig.setBrowserSyncConfig({
		server: null, // override
		proxy: "localhost:3000",
		serveStatic: [
			{
				route: config.pathPrefix.slice(0, -1),
				dir: "dist",
			},
		],
		ui: false,
		ghostMode: false,
	});

	// https://github.com/11ty/eleventy/issues/1523#issuecomment-733419587
	global.f = eleventyConfig.javascriptFunctions;
	eleventyConfig.setPugOptions({
		globals: ["f"],
	});

	return {
		dir: {
			input: "src/site/pages",
			includes: "../includes",
			layouts: "../layouts",
			data: "../data",
			output: "dist",
		},
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		pathPrefix: config.pathPrefix,
	};
};
