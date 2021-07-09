module.exports = {
	preset: "ts-jest/presets/js-with-ts-esm",
	setupFiles: ["focus-visible", "wicg-inert"],
	testEnvironment: "jsdom",
	transformIgnorePatterns: ["node_modules/(?!@github/catalyst/)"],
};
