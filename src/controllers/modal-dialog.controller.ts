import { controller, target } from "@github/catalyst";
import { CustomElement } from "@github/catalyst/lib/custom-element";

/**
 * @example
 * ```html
 * <body>
 *   ...
 *   <modal-dialog role="dialog" aria-label="キーワード検索" aria-modal="true">
 *     <button type="button" data-action="click:modal-dialog#close">閉じる</button>
 *     <form action="/search">
 *       <input name="q" type="search" data-target="modal-dialog.autoFocus" aria-label="キーワード">
 *       <button type="submit">検索</button>
 *     </form>
 *   </modal-dialog>
 * </body>
 * ```
 */
@controller
@restoreFocus
@autoFocus
@overlay
@preventScroll
@modal
@transition
export class ModalDialogElement extends HTMLElement {
	close() {
		this.remove();
	}
}

function restoreFocus(classObject: CustomElement) {
	const nodeToRestoreRefs = new WeakMap<HTMLElement, Element>();

	const connect = classObject.prototype.connectedCallback;
	classObject.prototype.connectedCallback = function (this: HTMLElement) {
		const nodeToRestore = document.activeElement;
		nodeToRestoreRefs.set(this, nodeToRestore);

		if (connect) connect.call(this);
	};

	const disconnect = classObject.prototype.disconnectedCallback;
	classObject.prototype.disconnectedCallback = function (this: HTMLElement) {
		const nodeToRestore = nodeToRestoreRefs.get(this);
		Promise.resolve().then(() => (nodeToRestore as HTMLElement).focus());

		if (disconnect) disconnect.call(this);
	};
}

function autoFocus(classObject: CustomElement) {
	target(classObject.prototype, "autoFocus");

	const connect = classObject.prototype.connectedCallback;
	classObject.prototype.connectedCallback = function (
		this: HTMLElement & { autoFocus?: Element }
	) {
		if (!this.autoFocus) {
			throw new Error(`<${this.localName}> must contain \`autoFocus\` target`);
		}

		(this.autoFocus as HTMLElement).focus({ preventScroll: true });
		if (document.activeElement !== this.autoFocus) {
			(this.autoFocus as HTMLElement).tabIndex = -1;
			(this.autoFocus as HTMLElement).focus({ preventScroll: true });
		}

		if (connect) connect.call(this);
	};
}

function overlay(classObject: CustomElement) {
	const checkKeyRefs = new WeakMap<
		HTMLElement,
		(event: KeyboardEvent) => void
	>();

	const connect = classObject.prototype.connectedCallback;
	classObject.prototype.connectedCallback = function (
		this: HTMLElement & { close: () => void }
	) {
		const checkKey = (event: KeyboardEvent) => {
			if (event.key == "Escape") {
				this.close();
			}
		};

		document.addEventListener("keydown", checkKey, true);
		checkKeyRefs.set(this, checkKey);

		if (connect) connect.call(this);
	};

	const disconnect = classObject.prototype.disconnectedCallback;
	classObject.prototype.disconnectedCallback = function (this: HTMLElement) {
		const checkKey = checkKeyRefs.get(this);
		document.removeEventListener("keydown", checkKey, true);

		if (disconnect) disconnect.call(this);
	};
}

function preventScroll(classObject: CustomElement) {
	const connect = classObject.prototype.connectedCallback;
	classObject.prototype.connectedCallback = function (this: HTMLElement) {
		document.body.style.overflow = "hidden";

		if (connect) connect.call(this);
	};

	const disconnect = classObject.prototype.disconnectedCallback;
	classObject.prototype.disconnectedCallback = function (this: HTMLElement) {
		document.body.style.overflow = "";

		if (disconnect) disconnect.call(this);
	};
}

function modal(classObject: CustomElement) {
	const elementsSetToInertRefs = new WeakMap<HTMLElement, Set<Element>>();

	const connect = classObject.prototype.connectedCallback;
	classObject.prototype.connectedCallback = function (this: HTMLElement) {
		let currentElement = this;

		while ((currentElement = currentElement.parentElement)) {
			for (const child of Array.from(currentElement.children)) {
				if (child.contains(this)) continue;
				if (!(child instanceof HTMLElement)) continue;
				if (child.inert) continue;

				child.inert = true;

				const elementsSetToInert =
					elementsSetToInertRefs.get(this) || new Set<Element>();
				elementsSetToInert.add(child);
				elementsSetToInertRefs.set(this, elementsSetToInert);
			}
		}

		if (connect) connect.call(this);
	};

	const disconnect = classObject.prototype.disconnectedCallback;
	classObject.prototype.disconnectedCallback = function (this: HTMLElement) {
		const elementsSetToInert = elementsSetToInertRefs.get(this);
		elementsSetToInert.forEach((element: HTMLElement) => {
			element.inert = false;
		});

		if (disconnect) disconnect.call(this);
	};
}

function transition(classObject: CustomElement) {
	const ENTER_CLASS = "is-transition-enter";
	const ENTER_ACTIVE_CLASS = "is-transition-enter-active";
	const LEAVE_CLASS = "is-transition-leave";
	const LEAVE_ACTIVE_CLASS = "is-transition-leave-active";

	const timeoutIdRefs = new WeakMap<HTMLElement, number>();

	const connect = classObject.prototype.connectedCallback;
	classObject.prototype.connectedCallback = function (this: HTMLElement) {
		// perform enter
		this.classList.add(ENTER_CLASS);
		forceReflow();
		this.classList.add(ENTER_ACTIVE_CLASS);

		onTransitionEnd(this, () => {
			this.classList.remove(ENTER_CLASS);
			this.classList.remove(ENTER_ACTIVE_CLASS);
		});

		if (connect) connect.call(this);
	};

	const close = classObject.prototype.close;
	classObject.prototype.close = function (this: HTMLElement) {
		// cleanup
		cancelNextCallback(this);
		this.classList.remove(ENTER_CLASS);
		this.classList.remove(ENTER_ACTIVE_CLASS);

		// perform leave
		this.classList.add(LEAVE_CLASS);
		forceReflow();
		this.classList.add(LEAVE_ACTIVE_CLASS);

		onTransitionEnd(this, () => {
			this.classList.remove(LEAVE_CLASS);
			this.classList.remove(LEAVE_ACTIVE_CLASS);
			close.call(this);
		});
	};

	function onTransitionEnd(element: HTMLElement, callback: () => void) {
		const computedStyle = getComputedStyle(element);
		const transitionDurationList = computedStyle.transitionDuration.split(", ");
		const transitionDelayList = computedStyle.transitionDelay.split(", ");

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
		const timeoutId = setTimeout(callback, timeout) as unknown as number;
		timeoutIdRefs.set(element, timeoutId);
	}

	function cancelNextCallback(element: HTMLElement) {
		const timeoutId = timeoutIdRefs.get(element);
		clearTimeout(timeoutId);
	}
}

function forceReflow() {
	document.documentElement.scrollTop;
}
