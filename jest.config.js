module.exports = {
	moduleNameMapper: {
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/src/assets/test/__mocks__/file-mock.js",
	},
	setupFiles: ["<rootDir>/src/assets/test/setup.js"],
};
