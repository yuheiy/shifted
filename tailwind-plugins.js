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

const kerning = plugin(function ({ addUtilities }) {
	addUtilities({
		".kerning": {
			fontKerning: "auto",
			fontFeatureSettings: "'palt'",
		},
		".not-kerning": {
			fontKerning: "none",
			fontFeatureSettings: "normal",
		},
	});
});

module.exports = {
	container,
	kerning,
};
