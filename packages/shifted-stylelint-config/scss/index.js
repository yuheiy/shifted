"use strict";

module.exports = {
	extends: ["../css"],
	customSyntax: "postcss-scss",
	plugins: ["stylelint-scss"],
	rules: {
		"at-rule-no-unknown": null,
		"at-rule-empty-line-before": [
			"always",
			{
				except: ["blockless-after-same-name-blockless"],
				ignore: ["after-comment", "first-nested"],
				ignoreAtRules: ["else"],
			},
		],
		"order/order": [
			[
				"dollar-variables",
				{
					type: "at-rule",
					name: "extend",
				},
				{
					type: "at-rule",
					name: "include",
					hasBlock: false,
				},
				"custom-properties",
				"declarations",
				{
					type: "at-rule",
					name: "include",
					hasBlock: true,
				},
				"rules",
			],
		],
		"scss/at-extend-no-missing-placeholder": true,
		"scss/at-import-no-partial-leading-underscore": true,
		"scss/at-import-partial-extension": "never",
		"scss/at-mixin-argumentless-call-parentheses": "always",
		"scss/at-rule-no-unknown": true,
		"scss/dollar-variable-no-missing-interpolation": true,
		"scss/declaration-nested-properties": "never",
		"scss/dimension-no-non-numeric-values": true,
		"scss/selector-no-redundant-nesting-selector": true,
		"scss/selector-no-union-class-name": true,
		"scss/no-global-function-names": true,
	},
};
