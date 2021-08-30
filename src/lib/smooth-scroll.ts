// https://standard.shiftbrain.com/blog/default-action-for-click-event-of-a-element

import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

window.addEventListener(
	"click",
	(event) => {
		const anchorElement = (
			event.target as HTMLElement
		).closest<HTMLAnchorElement>('a[href^="#"]');

		if (!anchorElement?.hash) {
			return;
		}

		if (event.button === 0 && !isModifiedEvent(event)) {
			history.pushState(null, "", anchorElement.hash);

			const target =
				document.querySelector<HTMLElement>(anchorElement.hash) ||
				(anchorElement.hash === "#top" && document.documentElement);

			if (target) {
				scrollIntoView(target);
				forceFocus(target);
				event.preventDefault();
			}
		}
	},
	{ capture: true }
);

function isModifiedEvent(event: MouseEvent) {
	return event.ctrlKey || event.shiftKey || event.altKey || event.metaKey;
}

function scrollIntoView(element: HTMLElement) {
	const style = getComputedStyle(element);

	gsap.to(window, {
		duration: 0.5,
		scrollTo: {
			...ScrollToPlugin.getOffset(element, window),
			offsetX: parseFloat((style as any).scrollMarginLeft),
			offsetY: parseFloat((style as any).scrollMarginTop),
		},
	});
}

function forceFocus(element: HTMLElement) {
	element.focus({ preventScroll: true });

	if (document.activeElement !== element) {
		element.tabIndex = -1;
		element.focus({ preventScroll: true });
	}
}
