"use strict";

module.exports = {
	extends: [
		"stylelint-config-standard",
		"stylelint-config-prettier",
		"stylelint-config-recess-order",
	],
	rules: {
		"rule-empty-line-before": [
			"always",
			{
				ignore: ["after-comment", "first-nested"],
			},
		],
	},
};
