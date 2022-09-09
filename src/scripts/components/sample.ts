export default () => ({
	init() {
		if (import.meta.env.DEV) {
			console.log("init component");
		}
	},
});
