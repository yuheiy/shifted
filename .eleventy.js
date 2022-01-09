const { randomUUID } = require("crypto");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const prettier = require("prettier");
const config = require("./config");

let prettierOptions;

module.exports = (eleventyConfig) => {
	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	eleventyConfig.setUseGitIgnore(false);

	eleventyConfig.addFilter("uuid", randomUUID);

	eleventyConfig.addCollection("service", (collection) => {
		return collection
			.getFilteredByGlob("src/site/pages/services/*.md")
			.sort((a, b) => a.inputPath.localeCompare(b.inputPath));
	});

	eleventyConfig.addTransform("formatHTML", async (content, outputPath) => {
		if (outputPath?.endsWith(".html")) {
			if (!prettierOptions) {
				prettierOptions = await prettier.resolveConfig("test.html", {
					editorconfig: true,
				});
			}

			return prettier.format(content, {
				...prettierOptions,
				parser: "html",
			});
		}

		return content;
	});

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
