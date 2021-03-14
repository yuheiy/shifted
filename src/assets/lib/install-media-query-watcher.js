// Pairs for `$mq-breakpoints` in `src/assets/styles/abstracts.scss`
const breakpoints = {
	sm: "(min-width: 36em)",
	md: "(min-width: 48em)",
	lg: "(min-width: 64em)",
	xl: "(min-width: 80em)",
};

export function installMediaQueryWatcher(
	breakpointOrMediaQueryString,
	onChange
) {
	const mediaQueryString =
		breakpointOrMediaQueryString in breakpoints
			? breakpoints[breakpointOrMediaQueryString]
			: breakpointOrMediaQueryString;
	const mediaQueryList = window.matchMedia(mediaQueryString);
	mediaQueryList.addEventListener("change", listener);
	onChange(mediaQueryList.matches);
	return uninstall;

	function listener(event) {
		onChange(event.matches);
	}

	function uninstall() {
		mediaQueryList.removeEventListener("change", listener);
	}
}
