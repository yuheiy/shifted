const isProd = process.env.ELEVENTY_ENV === "production";

let environment = "dev";

if (isProd) {
	environment = "prod";
}

module.exports = environment;
