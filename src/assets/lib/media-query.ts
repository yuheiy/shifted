// Pairs for `$mq-breakpoints` in `src/assets/styles/abstracts.scss`
const breakpoints = {
	sm: "(min-width: 36em)",
	md: "(min-width: 48em)",
	lg: "(min-width: 64em)",
	xl: "(min-width: 80em)",
};

export function installMediaQueryWatcher(
	breakpointOrMediaQueryString: keyof typeof breakpoints | string,
	onChange: (matches: boolean) => void
) {
	const mediaQueryString =
		breakpointOrMediaQueryString in breakpoints
			? breakpoints[breakpointOrMediaQueryString as keyof typeof breakpoints]
			: breakpointOrMediaQueryString;
	const mediaQueryList = window.matchMedia(mediaQueryString);
	mediaQueryList.addEventListener("change", listener);
	onChange(mediaQueryList.matches);
	return uninstall;

	function listener(event: MediaQueryListEvent) {
		onChange(event.matches);
	}

	function uninstall() {
		mediaQueryList.removeEventListener("change", listener);
	}
}
