const fsPromises = require("fs/promises");

const isProd = process.env.ELEVENTY_ENV === "production";

module.exports = async () => {
	let result = null;

	if (isProd) {
		result = JSON.parse(await fsPromises.readFile("dist/manifest.json"));
	}

	return result;
};
