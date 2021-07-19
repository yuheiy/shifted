const prettier = require("prettier");

let prettierOptions;

async function formatHTML(content, outputPath) {
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
}

module.exports = {
	formatHTML,
};
