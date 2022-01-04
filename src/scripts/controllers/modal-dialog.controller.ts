import { Controller } from "@hotwired/stimulus";
import { useTransition } from "stimulus-use";
import { forceFocus } from "../lib/dom-utils";

/**
 * @example
 * ```html
 * <div
 *   class="opacity-0 scale-95"
 *   role="dialog"
 *   aria-label="キーワード検索"
 *   aria-modal="true"
 *   data-controller="modal-dialog"
 *   data-transition-enter-active="transition duration-300",
 *   data-transition-enter-from="opacity-0 scale-95",
 *   data-transition-enter-to="opacity-100 scale-100",
 *   data-transition-leave-active="transition duration-300",
 *   data-transition-leave-from="opacity-100 scale-100",
 *   data-transition-leave-to="opacity-0 scale-95"
 *  >
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

	// extended by useTransition
	enter: () => Promise<void>;
	leave: () => Promise<void>;

	connect() {
		useRestoreFocus(this);
		useOverlay(this);
		usePreventScroll(this);
		useModal(this);

		useTransition(this as any, {
			element: this.element,
			preserveOriginalClass: false,
		});
		this.enter();

		forceFocus(this.autoFocusTarget, { preventScroll: true });
	}

	async close() {
		await this.leave();
		this.element.remove();
	}
}

function useRestoreFocus(controller: Controller) {
	const nodeToRestore = document.activeElement;

	const controllerDisconnect = controller.disconnect.bind(controller);
	Object.assign(controller, {
		disconnect() {
			Promise.resolve().then(() => {
				(nodeToRestore as HTMLElement).focus({ preventScroll: true });
			});

			controllerDisconnect();
		},
	});
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
}

function isFormField(element: HTMLElement): boolean {
	const name = element.nodeName.toLowerCase();
	const type = (element.getAttribute("type") || "").toLowerCase();
	return (
		name === "select" ||
		name === "textarea" ||
		(name === "input" && type !== "submit" && type !== "reset" && type !== "checkbox" && type !== "radio") ||
		element.isContentEditable
	);
}

function usePreventScroll(controller: Controller) {
	document.body.style.setProperty("overflow-y", "hidden");

	const controllerDisconnect = controller.disconnect.bind(controller);
	Object.assign(controller, {
		disconnect() {
			document.body.style.removeProperty("overflow-y");

			controllerDisconnect();
		},
	});
}

function useModal(controller: Controller) {
	const activateOutside = inactivateOutside(controller.element as HTMLElement);

	const controllerDisconnect = controller.disconnect.bind(controller);
	Object.assign(controller, {
		disconnect() {
			activateOutside();

			controllerDisconnect();
		},
	});
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
