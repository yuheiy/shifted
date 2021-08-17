// https://standard.shiftbrain.com/blog/default-action-for-click-event-of-a-element

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
				target.scrollIntoView({ behavior: "smooth", block: "start" });
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

function forceFocus(element: HTMLElement) {
	element.focus({ preventScroll: true });

	if (document.activeElement !== element) {
		element.tabIndex = -1;
		element.focus({ preventScroll: true });
	}
}
