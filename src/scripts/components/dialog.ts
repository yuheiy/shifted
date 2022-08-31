export default () => ({
	isOpen: false,

	init() {
		let nodeToRestore;
		this.$watch("isOpen", (value) => {
			if (value) {
				nodeToRestore = document.activeElement;
			} else {
				nodeToRestore.focus({ preventScroll: true });
				nodeToRestore = null;
			}
		});

		this.checkKey = (event) => {
			if (isFormField(event.target as HTMLElement)) return;

			if (event.key === "Escape") {
				this.$data.isOpen = false;
			}
		};
		document.addEventListener("keydown", this.checkKey, true);
	},

	destroy() {
		document.removeEventListener("keydown", this.checkKey);

		if (this.activateOutside) {
			this.activateOutside();
		}
	},

	root: {
		["x-effect"]() {
			if (this.isOpen) {
				document.body.style.setProperty("overflow", "hidden");
			} else {
				document.body.style.removeProperty("overflow");
			}

			if (this.isOpen) {
				this.$nextTick(() => {
					this.activateOutside = inactivateOutside(this.$el);
				});
				return;
			}

			if (this.activateOutside) {
				this.activateOutside();
				this.activateOutside = null;
			}
		},
	},

	autoFocus: {
		["x-effect"]() {
			if (this.isOpen) {
				this.$nextTick(() => forceFocus(this.$el, { preventScroll: true }));
			}
		},
	},
});

function isFormField(element: HTMLElement): boolean {
	const name = element.nodeName.toLowerCase();
	const type = (element.getAttribute("type") || "").toLowerCase();
	return (
		name === "select" ||
		name === "textarea" ||
		(name === "input" &&
			type !== "submit" &&
			type !== "reset" &&
			type !== "checkbox" &&
			type !== "radio") ||
		element.isContentEditable
	);
}

function inactivateOutside(element: HTMLElement) {
	const elementsSetToInert = new Set<HTMLElement>();
	let currentElement = element;

	while ((currentElement = currentElement.parentElement)) {
		for (const child of Array.from(currentElement.children)) {
			if (child.contains(element)) continue;
			if (!(child instanceof HTMLElement)) continue;
			if (child.inert) continue;

			child.inert = true;
			elementsSetToInert.add(child);
		}
	}

	return function activateOutside() {
		for (const element of elementsSetToInert) {
			element.inert = false;
		}
	};
}

function forceFocus(element: HTMLElement, focusOptions: FocusOptions = {}) {
	element.focus(focusOptions);

	if (document.activeElement !== element) {
		element.tabIndex = -1;
		element.focus(focusOptions);
	}
}
