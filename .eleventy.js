const httpProxy = require("http-proxy");
const prettier = require("prettier");
const pugIncludeGlob = require("pug-include-glob");
const config = require("./config");

let prettierOptions;

module.exports = (eleventyConfig) => {
	eleventyConfig.setUseGitIgnore(false);

	eleventyConfig.addCollection("news", (collection) => {
		return collection.getFilteredByGlob("src/site/pages/news/*.md");
	});

	eleventyConfig.addTransform("formatHTML", async (content, outputPath) => {
		if (outputPath?.endsWith(".html")) {
			return content;
		}

		if (!prettierOptions) {
			prettierOptions = await prettier.resolveConfig("test.html", {
				editorconfig: true,
			});
		}

		return prettier.format(content, {
			...prettierOptions,
			parser: "html",
		});
	});

	eleventyConfig.setBrowserSyncConfig({
		callbacks: {
			ready: function (_err, browserSync) {
				const proxy = httpProxy.createProxyServer();

				browserSync.addMiddleware("*", (req, res) => {
					proxy.web(req, res, { target: "http://localhost:5173" });
				});
			},
		},
	});

	global.f = eleventyConfig.javascriptFunctions;
	eleventyConfig.setPugOptions({
		globals: ["f"], // https://github.com/11ty/eleventy/issues/1523#issuecomment-733419587
		plugins: [pugIncludeGlob()],
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
