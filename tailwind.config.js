const { fluidText, container } = require("./tailwind-plugins");

module.exports = {
	content: ["./src/**/*.{pug,md,js,ts}"],
	theme: {
		extend: {},
	},
	corePlugins: {
		container: false,
	},
	plugins: [fluidText, container],
};
