const plugin = require("tailwindcss/plugin");

const autoGrid = plugin(({ addComponents, matchUtilities, theme }) => {
	addComponents({
		".auto-grid": {
			"--tw-auto-grid-cell": "24rem",
			display: "grid",
			gridTemplateColumns: "repeat(auto-fill, minmax(min(var(--tw-auto-grid-cell), 100%), 1fr))",
			gap: theme("spacing.4"),
		},
	});

	matchUtilities(
		{
			"auto-grid": (value) => ({
				"--tw-auto-grid-cell": value,
			}),
		},
		{
			values: {
				"3xs": "16rem",
				"2xs": "18rem",
				xs: "20rem",
				sm: "24rem",
				md: "28rem",
				lg: "32rem",
				xl: "36rem",
				"2xl": "42rem",
				"3xl": "48rem",
				"4xl": "56rem",
				"5xl": "64rem",
				"6xl": "72rem",
				"7xl": "80rem",
			},
		}
	);
});

const cluster = plugin(({ addComponents, theme }) => {
	addComponents({
		".cluster": {
			display: "flex",
			flexWrap: "wrap",
			gap: theme("spacing.4"),
		},
	});
});

const switcher = plugin(({ addComponents, matchUtilities, theme }) => {
	addComponents({
		".switcher": {
			"--tw-switcher-threshold": "32rem",
			display: "flex",
			flexWrap: "wrap",
			gap: theme("spacing.4"),
			"& > :where(*)": {
				flexBasis: "calc((var(--tw-switcher-threshold) - 100%) * 999)",
				flexGrow: 1,
			},
		},
	});

	matchUtilities(
		{
			switcher: (value) => ({
				"--tw-switcher-threshold": value,
			}),
		},
		{
			values: {
				"3xs": "16rem",
				"2xs": "18rem",
				xs: "20rem",
				sm: "24rem",
				md: "28rem",
				lg: "32rem",
				xl: "36rem",
				"2xl": "42rem",
				"3xl": "48rem",
				"4xl": "56rem",
				"5xl": "64rem",
				"6xl": "72rem",
				"7xl": "80rem",
			},
		}
	);
});

const wrapper = plugin(({ addComponents, theme }) => {
	addComponents({
		".wrapper": {
			maxWidth: "80rem",
			marginRight: "auto",
			marginLeft: "auto",
			paddingRight: theme("spacing.4"),
			paddingLeft: theme("spacing.4"),
		},
	});
});

module.exports = {
	content: ["./src/**/*.{pug,ts}"],
	theme: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/aspect-ratio"),
		require("@tailwindcss/line-clamp"),
		require("tailwindcss-aria-attributes"),
		autoGrid,
		cluster,
		switcher,
		wrapper,
	],
};
