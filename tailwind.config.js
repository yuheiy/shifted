const plugin = require("tailwindcss/plugin");

const autoGrid = plugin(
	function ({ matchComponents, theme }) {
		const values = theme("autoGrid.cell");

		matchComponents(
			{
				"auto-grid": (value) => ({
					"--tw-auto-grid-cell": value,
					display: "grid",
					gridTemplateColumns:
						"repeat(auto-fill, minmax(min(var(--tw-auto-grid-cell), 100%), 1fr))",
					gap: theme("autoGrid.spacing"),
				}),
			},
			{ values }
		);
	},
	{
		theme: {
			autoGrid: {
				cell: {
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
				spacing: "1rem",
			},
		},
		variants: {
			autoGrid: ["responsive"],
		},
	}
);

const centered = plugin(
	function ({ addComponents, theme }) {
		addComponents({
			".centered": {
				boxSizing: "content-box",
				maxWidth: theme("centered.maxWidth"),
				marginRight: "auto",
				marginLeft: "auto",
				paddingRight: theme("centered.spacing"),
				paddingLeft: theme("centered.spacing"),
			},
		});
	},
	{
		theme: {
			centered: {
				maxWidth: "80rem",
				spacing: "1rem",
			},
		},
	}
);

const cluster = plugin(
	function ({ addComponents, theme }) {
		addComponents({
			".cluster": {
				display: "flex",
				flexWrap: "wrap",
				gap: theme("cluster.spacing"),
			},
		});
	},
	{
		theme: {
			cluster: {
				spacing: "1rem",
			},
		},
	}
);

const switcher = plugin(
	function ({ matchComponents, theme }) {
		const values = theme("switcher.threshold");

		matchComponents(
			{
				switcher: (value) => ({
					"--tw-switcher-threshold": value,
					display: "flex",
					flexWrap: "wrap",
					gap: theme("switcher.spacing"),
					"> :where(*)": {
						flexBasis: "calc((var(--tw-switcher-threshold) - 100%) * 999)",
						flexGrow: 1,
					},
				}),
			},
			{ values }
		);
	},
	{
		theme: {
			switcher: {
				threshold: {
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
				spacing: "1rem",
			},
		},
		variants: {
			switcher: ["responsive"],
		},
	}
);

const withSidebar = plugin(
	function ({ addComponents, theme }) {
		const baseStyles = {
			display: "flex",
			flexWrap: "wrap",
			gap: theme("withSidebar.spacing"),
		};

		const sidebarStyles = {
			flexGrow: 1,
		};

		const contentStyles = {
			flexBasis: 0,
			flexGrow: 999,
			minWidth: theme("withSidebar.contentMinWidth"),
		};

		addComponents({
			".with-sidebar-left": {
				...baseStyles,
				"> :where(:first-child)": sidebarStyles,
				"> :where(:last-child)": contentStyles,
			},
			".with-sidebar-right": {
				...baseStyles,
				"> :where(:first-child)": contentStyles,
				"> :where(:last-child)": sidebarStyles,
			},
		});
	},
	{
		theme: {
			withSidebar: {
				contentMinWidth: "50%",
				spacing: "1rem",
			},
		},
	}
);

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
