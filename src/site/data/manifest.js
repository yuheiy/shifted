const fsPromises = require("node:fs/promises");

module.exports = async () => {
	let result = null;

	if (process.env.ELEVENTY_ENV === "production") {
		result = JSON.parse(await fsPromises.readFile("dist/manifest.json"));
	}

	return result;
};
