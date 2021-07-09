module.exports = {
	eleventyNavigation: {
		parent: "サービス",
	},
	eleventyComputed: {
		eleventyNavigation: {
			key: (data) => data.title,
		},
	},
	layout: "service-single",
};
