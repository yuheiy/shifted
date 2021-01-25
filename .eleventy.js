const yaml = require("js-yaml");
const { pathPrefix } = require("./config");

module.exports = (eleventyConfig) => {
	eleventyConfig.addDataExtension("yml", (contents) => {
		return yaml.load(contents);
	});

	eleventyConfig.addCollection("post", (collection) => {
		return collection.getFilteredByGlob("src/site/posts/*.md").sort((a, b) => {
			return a.inputPath.localeCompare(b.inputPath);
		});
	});

	eleventyConfig.addPassthroughCopy({ "src/static": "." });

	return {
		dir: {
			input: "src/site",
			output: "dist",
		},
		pathPrefix: `${pathPrefix}/`,
	};
};
