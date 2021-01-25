declare namespace NodeJS {
	interface ProcessEnv {
		readonly NODE_ENV: "development" | "production" | "test";
		readonly PATH_PREFIX: string;
	}
}

declare module "*.jpg" {
	const src: string;
	export default src;
}

declare module "*.jpeg" {
	const src: string;
	export default src;
}

declare module "*.png" {
	const src: string;
	export default src;
}

declare module "*.gif" {
	const src: string;
	export default src;
}

declare module "*.eot" {
	const src: string;
	export default src;
}

declare module "*.otf" {
	const src: string;
	export default src;
}

declare module "*.webp" {
	const src: string;
	export default src;
}

declare module "*.svg" {
	const src: string;
	export default src;
}

declare module "*.ttf" {
	const src: string;
	export default src;
}

declare module "*.woff" {
	const src: string;
	export default src;
}

declare module "*.woff2" {
	const src: string;
	export default src;
}

declare module "*.mp4" {
	const src: string;
	export default src;
}

declare module "*.webm" {
	const src: string;
	export default src;
}

declare module "*.wav" {
	const src: string;
	export default src;
}

declare module "*.mp3" {
	const src: string;
	export default src;
}

declare module "*.m4a" {
	const src: string;
	export default src;
}

declare module "*.aac" {
	const src: string;
	export default src;
}

declare module "*.oga" {
	const src: string;
	export default src;
}
