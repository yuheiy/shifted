"use strict";

module.exports = {
	extends: [
		"stylelint-config-standard",
		"stylelint-config-prettier",
		"stylelint-config-recess-order",
	],
	rules: {
		"custom-property-pattern": null,
		"property-no-vendor-prefix": null,
		"rule-empty-line-before": [
			"always",
			{
				ignore: ["after-comment", "first-nested"],
			},
		],
		"selector-class-pattern": null,
	},
};
