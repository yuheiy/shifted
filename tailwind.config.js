const { container, fluidText, kerning } = require("./tailwind-plugins");

module.exports = {
	content: ["./src/**/*.{pug,md,js,ts}"],
	theme: {
		extend: {},
	},
	corePlugins: {
		container: false,
	},
	plugins: [container, fluidText, kerning],
};
