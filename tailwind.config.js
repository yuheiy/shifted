const { autoGrid, centered, cluster, switcher, withSidebar } = require("./tailwind-plugins");

module.exports = {
	content: ["./src/**/*.{pug,md,js,ts}"],
	theme: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/aspect-ratio"),
		autoGrid,
		centered,
		cluster,
		switcher,
		withSidebar,
	],
};
