const { container, kerning } = require("./tailwind-plugins");

/** @type {import('tailwindcss/types').Config} */
module.exports = {
	content: ["./src/**/*.{pug,md,js,ts}"],
	future: {
		hoverOnlyWhenSupported: true,
	},
	theme: {
		extend: {
			fontFamily: {
				sans: ["sans-serif"],
				serif: ["serif"],
			},
		},
	},
	corePlugins: {
		container: false,
	},
	plugins: [container, kerning],
};
