const assert = require("assert");
const importFresh = require("import-fresh");
const { DateTime } = require("luxon");
const urlFilter = require("@11ty/eleventy/src/Filters/Url");
const slugFilter = require("@11ty/eleventy/src/Filters/Slug");
const EleventyNavigation = require("@11ty/eleventy-navigation");

// The values in a following object are loaded *manually* by
// `src/site/_includes/setup.pug`.
module.exports = async () => {
	// Wait for webpack-manifest.json to be generated.
	const manifest = await waitFor(() => importFresh("../webpack-manifest.json"));

	return {
		// Universal filters are not accessible in Pug by default.
		// https://www.11ty.io/docs/filters/#universal-filters
		url: urlFilter,
		slug: slugFilter,

		// eleventy-navigation is only available in Nunjucks by default.
		// https://www.11ty.dev/docs/plugins/navigation/
		eleventyNavigation: EleventyNavigation.navigation.find,
		eleventyNavigationBreadcrumb: EleventyNavigation.navigation.findBreadcrumbs,

		DateTime,

		assetPath(key) {
			assert(
				key in manifest,
				`\`${key}\` does not exist in \`webpack-manifest.json\``
			);
			return manifest[key];
		},
	};
};

function waitFor(callback) {
	const interval = 100;

	return new Promise((resolve) => {
		const intervalId = setInterval(checkCallback, interval);
		checkCallback();

		function checkCallback() {
			try {
				resolve(callback());
				clearInterval(intervalId);
			} catch {}
		}
	});
}
