const path = require("path");
const webpack = require("webpack");
const sass = require("sass");
const Fiber = require("fibers");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const {
	ECMAVersionValidatorPlugin,
} = require("ecma-version-validator-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const detectPort = require("detect-port");
const address = require("address");
const { pathPrefix } = require("./config");

module.exports = async (_env, { mode }) => {
	const isDev = mode !== "production";
	const port = isDev && (await detectPort(3000));
	const networkHost = port && `${address.ip()}:${port}`;

	const babelLoader = {
		loader: "babel-loader",
		options: {
			presets: [
				[
					"@babel/preset-env",
					{
						bugfixes: true,
						modules: false,
						useBuiltIns: "entry",
						corejs: 3,
					},
				],
			],
			plugins: [
				[
					"@babel/plugin-transform-runtime",
					{
						useESModules: true,
					},
				],
			],
			cacheDirectory: true,
		},
	};

	return {
		context: path.join(__dirname, "src", "assets"),
		entry: {
			main: "./main.ts",
			"polyfill-nomodule": "./polyfill-nomodule.ts",
		},
		output: {
			path: path.join(__dirname, "dist", "assets"),
			filename: isDev ? "[name].js" : "[name].[contenthash:8].js",
			chunkFilename: isDev
				? "[name].chunk.js"
				: "[name].chunk.[contenthash:8].js",
			publicPath: `${pathPrefix}/assets/`,
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					use: [
						babelLoader,
						{
							loader: "ts-loader",
							options: {
								transpileOnly: true,
							},
						},
					],
				},
				{
					test: /\.m?js$/,
					include: path.join(__dirname, "src", "assets"),
					use: babelLoader,
				},
				{
					test: /\.scss$/,
					use: [
						isDev ? "style-loader" : MiniCssExtractPlugin.loader,
						"css-loader",
						{
							loader: "postcss-loader",
							options: {
								postcssOptions: {
									plugins: [
										autoprefixer({
											cascade: false,
											grid: "autoplace",
										}),
									],
								},
							},
						},
						"resolve-url-loader",
						{
							loader: "sass-loader",
							options: {
								implementation: sass,
								sassOptions: {
									fiber: Fiber,
								},
								sourceMap: true, // required for resolve-url-loader
							},
						},
					],
				},
				{
					exclude: [/\.(ts|m?js)$/, /\.json$/, /\.scss$/],
					use: [
						{
							loader: "file-loader",
							options: {
								name: isDev
									? "[path][name].[ext]"
									: "[path][name].[contenthash:8].[ext]",
							},
						},
					],
				},
			],
		},
		resolve: {
			extensions: [".ts", ".mjs", ".js"],
		},
		devtool: isDev && "cheap-module-eval-source-map",
		optimization: {
			minimizer: [new TerserJSPlugin(), new CssMinimizerPlugin()],
		},
		plugins: [
			new webpack.DefinePlugin({
				"process.env.PATH_PREFIX": JSON.stringify(pathPrefix),
			}),
			new WebpackManifestPlugin({
				fileName: path.join(__dirname, "src", "site", "webpack-manifest.json"),
				writeToFileEmit: true,
			}),
			new ECMAVersionValidatorPlugin(),
			!isDev &&
				new MiniCssExtractPlugin({
					filename: "[name].[contenthash:8].css",
				}),
			process.env.ANALYZE === "true" &&
				!isDev &&
				new BundleAnalyzerPlugin({
					analyzerMode: "static",
					reportFilename: path.join(__dirname, "src", "assets", "analyze.html"),
				}),
		].filter(Boolean),
		devServer: {
			compress: true,
			clientLogLevel: "silent",
			overlay: true,
			hot: true,
			contentBase: path.join(__dirname, "dist"),
			contentBasePublicPath: pathPrefix || "/",
			watchContentBase: true,
			watchOptions: {
				poll: true,
			},
			transportMode: "ws",
			stats: "errors-warnings",
			host: "0.0.0.0",
			port,
			public: networkHost,
			after(app) {
				app.use(createRedirectServedPathMiddleware(pathPrefix));
			},
		},
	};
};

// https://github.com/facebook/create-react-app/blob/master/packages/react-dev-utils/redirectServedPathMiddleware.js
function createRedirectServedPathMiddleware(servedPath) {
	return function redirectServedPathMiddleware(req, res, next) {
		if (
			servedPath === "" ||
			req.url === servedPath ||
			req.url.startsWith(servedPath)
		) {
			next();
		} else {
			const newPath = path.posix.join(
				servedPath,
				req.path !== "/" ? req.path : ""
			);
			res.redirect(newPath);
		}
	};
}
