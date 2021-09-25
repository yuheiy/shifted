import { Controller } from "@hotwired/stimulus";

/**
 * @example
 * ```html
 * <div role="dialog" aria-label="キーワード検索" aria-modal="true" data-controller="modal-dialog">
 *   <button type="button" data-action="modal-dialog#close">閉じる</button>
 *   <form action="/search">
 *     <input name="q" type="search" data-modal-dialog-target="autoFocus" aria-label="キーワード">
 *     <button type="submit">検索</button>
 *   </form>
 * </div>
 * ```
 */
export default class extends Controller {
	static targets = ["autoFocus"];
	autoFocusTarget: HTMLElement;

	connect() {
		useRestoreFocus(this);
		useAutoFocus(this);
		useOverlay(this);
		usePreventScroll(this);
		useModal(this);
		useTransition(this);
	}

	close() {
		this.element.remove();
	}
}

function useRestoreFocus(controller: Controller) {
	const nodeToRestore = document.activeElement;

	const controllerDisconnect = controller.disconnect.bind(controller);
	Object.assign(controller, {
		disconnect() {
			Promise.resolve().then(() => (nodeToRestore as HTMLElement).focus());

			controllerDisconnect();
		},
	});
}

function useAutoFocus({
	autoFocusTarget,
}: Controller & { autoFocusTarget: HTMLElement }) {
	autoFocusTarget.focus({ preventScroll: true });

	if (autoFocusTarget !== document.activeElement) {
		autoFocusTarget.tabIndex = -1;
		autoFocusTarget.focus({ preventScroll: true });
	}
}

function useOverlay(controller: Controller & { close: () => void }) {
	document.addEventListener("keydown", checkKey, true);

	const controllerDisconnect = controller.disconnect.bind(controller);
	Object.assign(controller, {
		disconnect() {
			document.removeEventListener("keydown", checkKey, true);

			controllerDisconnect();
		},
	});

	function checkKey(event: KeyboardEvent) {
		if (isFormField(event.target as HTMLElement)) return;

		if (event.key === "Escape") {
			controller.close();
		}
	}

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
}

function usePreventScroll(controller: Controller) {
	document.body.style.setProperty("overflow", "hidden");

	const controllerDisconnect = controller.disconnect.bind(controller);
	Object.assign(controller, {
		disconnect() {
			document.body.style.removeProperty("overflow");

			controllerDisconnect();
		},
	});
}

function useModal(controller: Controller) {
	const { element } = controller;

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

	const controllerDisconnect = controller.disconnect.bind(controller);
	Object.assign(controller, {
		disconnect() {
			for (const element of elementsSetToInert) {
				element.inert = false;
			}

			controllerDisconnect();
		},
	});
}

function useTransition(controller: Controller & { close: () => void }) {
	const { element } = controller;

	const ENTER_CLASS = "is-transition-enter";
	const ENTER_ACTIVE_CLASS = "is-transition-enter-active";
	const LEAVE_CLASS = "is-transition-leave";
	const LEAVE_ACTIVE_CLASS = "is-transition-leave-active";

	let timeoutId = null;

	// perform enter
	element.classList.add(ENTER_CLASS);
	forceReflow();
	element.classList.add(ENTER_ACTIVE_CLASS);

	onTransitionEnd(() => {
		element.classList.remove(ENTER_CLASS);
		element.classList.remove(ENTER_ACTIVE_CLASS);
	});

	const controllerClose = controller.close.bind(controller);
	Object.assign(controller, {
		close() {
			// cleanup
			cancelNextCallback();
			element.classList.remove(ENTER_CLASS);
			element.classList.remove(ENTER_ACTIVE_CLASS);

			// perform leave
			element.classList.add(LEAVE_CLASS);
			forceReflow();
			element.classList.add(LEAVE_ACTIVE_CLASS);

			onTransitionEnd(() => {
				element.classList.remove(LEAVE_CLASS);
				element.classList.remove(LEAVE_ACTIVE_CLASS);

				controllerClose();
			});
		},
	});

	function onTransitionEnd(callback: () => void) {
		const style = getComputedStyle(controller.element);
		const [transitionDurationList, transitionDelayList] = (
			["transition-duration", "transition-delay"] as const
		).map((property) => style.getPropertyValue(property).split(", "));

		while (transitionDurationList.length > transitionDelayList.length) {
			transitionDelayList.push("0s");
		}

		while (transitionDurationList.length < transitionDelayList.length) {
			transitionDurationList.push("0s");
		}

		const timeout = Math.max(
			...transitionDurationList.map((value, i) => {
				const duration = parseFloat(value);
				const delay = parseFloat(transitionDelayList[i]);
				return (duration + delay) * 1000;
			})
		);
		timeoutId = setTimeout(callback, timeout) as unknown as number;
	}

	function cancelNextCallback() {
		clearTimeout(timeoutId);
	}
}

function forceReflow() {
	document.documentElement.scrollTop;
}
