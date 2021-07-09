const fsPromises = require("fs/promises");
const path = require("path");

const isProd = process.env.ELEVENTY_ENV === "production";

const manifestPath = path.join(__dirname, "../../../dist/manifest.json");

module.exports = async () => {
	let result = null;

	if (isProd) {
		result = JSON.parse(await fsPromises.readFile(manifestPath));
	}

	return result;
};
