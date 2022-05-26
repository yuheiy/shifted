const plugin = require("tailwindcss/plugin");

const container = plugin(function ({ addComponents }) {
	addComponents({
		".container": {
			boxSizing: "content-box",
			maxWidth: "80rem",
			marginRight: "auto",
			marginLeft: "auto",
			paddingRight: "1.25rem",
			paddingLeft: "1.25rem",
		},
	});
});

const rem = (px) => `${px / 16}rem`;

// https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/
const getFluidSize = (minSize, maxSize, minWidth = 640, maxWidth = 1280) => {
	const v = (100 * (maxSize - minSize)) / (maxWidth - minWidth);
	const r = (minWidth * maxSize - maxWidth * minSize) / (minWidth - maxWidth);

	return `clamp(${rem(minSize)}, ${v.toPrecision(3)}vw + ${rem(r.toPrecision(3))}, ${rem(
		maxSize
	)})`;
};

const fluidText = plugin(function ({ matchUtilities }) {
	matchUtilities({
		"fluid-text": (value) => {
			const [minSize, maxSize] = value.split(",").map((v) => {
				const matched = /^(\d+)px$/.exec(v);
				if (!matched) {
					throw new Error(`"${v}" is not a valid value`);
				}
				return Number(matched[1]);
			});

			return {
				"font-size": getFluidSize(minSize, maxSize),
			};
		},
	});
});

const kerning = plugin(function ({ addUtilities }) {
	addUtilities({
		".kerning": {
			fontKerning: "auto",
			fontFeatureSettings: `"palt"`,
		},
		".not-kerning": {
			fontKerning: "none",
			fontFeatureSettings: "normal",
		},
	});
});

module.exports = {
	container,
	fluidText,
	kerning,
};
