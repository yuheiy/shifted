const { container, fluidText, kerning } = require("./tailwind-plugins");

/** @type {import('tailwindcss/types').Config} */
module.exports = {
	content: ["./src/**/*.{pug,md,js,ts}"],
	future: {
		hoverOnlyWhenSupported: true,
	},
	theme: {
		extend: {},
	},
	corePlugins: {
		container: false,
	},
	plugins: [container, fluidText, kerning],
};
