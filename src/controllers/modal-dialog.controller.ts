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
		nodeToRestoreRefs.set(this, document.activeElement);

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

		(this.autoFocus as HTMLElement).focus();
		if (document.activeElement !== this.autoFocus) {
			(this.autoFocus as HTMLElement).tabIndex = -1;
			(this.autoFocus as HTMLElement).focus();
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
		Array.from(document.body.children).forEach((element: HTMLElement) => {
			if (element === this) {
				return;
			}

			if (element.inert) {
				return;
			}

			element.inert = true;

			if (!elementsSetToInertRefs.has(this)) {
				elementsSetToInertRefs.set(this, new Set());
			}
			const elementsSetToInert = elementsSetToInertRefs.get(this);
			elementsSetToInert.add(element);
		});

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
		const timeout = Math.max(
			...getComputedStyle(element)
				.transition.split(", ")
				.map((value) => {
					const [, duration, , delay] = value.split(" ");
					return (parseFloat(duration) + parseFloat(delay)) * 1000;
				})
		);
		timeoutIdRefs.set(
			element,
			setTimeout(callback, timeout) as unknown as number
		);
	}

	function cancelNextCallback(element: HTMLElement) {
		const timeoutId = timeoutIdRefs.get(element);
		clearTimeout(timeoutId);
	}
}

function forceReflow() {
	document.documentElement.scrollTop;
}
