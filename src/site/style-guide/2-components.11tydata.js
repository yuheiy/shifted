module.exports = {
	eleventyNavigation: {
		key: "Components",
		parent: "スタイルガイド",
		order: 2,
	},
	permalink: process.env.STYLE_GUIDE === "true" ? undefined : false,
	title: "Components",
	description: "todo",
};
