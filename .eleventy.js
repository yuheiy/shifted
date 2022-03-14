const { randomUUID } = require("crypto");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const httpProxy = require("http-proxy");
const prettier = require("prettier");
const config = require("./config");

let prettierOptions;

module.exports = (eleventyConfig) => {
	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	eleventyConfig.setUseGitIgnore(false);

	eleventyConfig.addFilter("id", randomUUID);

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
		callbacks: {
			ready: function (_err, browserSync) {
				const proxy = httpProxy.createProxyServer();

				browserSync.addMiddleware("*", (req, res) => {
					proxy.web(req, res, { target: "http://localhost:3000" });
				});
			},
		},
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
