export function forceFocus(element: HTMLElement, focusOptions: FocusOptions = {}) {
	element.focus(focusOptions);

	if (document.activeElement !== element) {
		element.tabIndex = -1;
		element.focus(focusOptions);
	}
}
