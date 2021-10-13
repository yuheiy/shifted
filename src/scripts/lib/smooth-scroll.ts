// https://standard.shiftbrain.com/blog/default-action-for-click-event-of-a-element

import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { forceFocus } from "./dom-utils";

gsap.registerPlugin(ScrollToPlugin);

window.addEventListener(
	"click",
	(event) => {
		const anchorElement = (
			event.target as HTMLElement
		).closest<HTMLAnchorElement>('a[href*="#"]');
		const anchorHash = anchorElement?.hash;

		if (!anchorHash) {
			return;
		}

		if (event.button === 0 && !isModifiedEvent(event)) {
			if (location.hash !== anchorHash) {
				history.pushState(null, "", anchorHash);
			}

			let target = document.querySelector<HTMLElement>(anchorHash);

			if (!target && anchorHash === "#top") {
				target = document.documentElement;
			}

			if (target) {
				scrollIntoView(target);
				forceFocus(target, { preventScroll: true });
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
