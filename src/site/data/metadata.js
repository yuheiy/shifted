module.exports = {
	domain: "example.com",
	encoding: "UTF-8",
	lang: "ja",
	get locale() {
		return `${this.lang}_${this.region}`;
	},
	region: "JP",
	scheme: "https",
	sitemapPath: "/sitemap.xml",
	siteTitle: "shifted",
	get siteUrl() {
		return `${this.scheme}://${this.domain}`;
	},
	tagline: "静的サイト構築のためのフロントエンド開発環境",
};
