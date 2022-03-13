const { autoGrid, centered, cluster, switcher, withSidebar } = require("./tailwind-plugins");

module.exports = {
	content: ["./src/**/*.{pug,md,js,ts}"],
	theme: {
		extend: {},
	},
	plugins: [
		require("tailwindcss-aria-attributes"),
		require("@tailwindcss/aspect-ratio"),
		require("@tailwindcss/line-clamp"),
		autoGrid,
		centered,
		cluster,
		switcher,
		withSidebar,
	],
};
