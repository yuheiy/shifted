import AbortController from "abort-controller";
import afterFrame from "afterframe";
import { Controller } from "stimulus";
import invariant from "tiny-invariant";
import { waitForStyleToBeSet } from "../lib/wait-for-style-to-be-set";

export default class extends Controller {
	static targets = ["collapse"];
	static classes = ["collapsing"];

	disconnect() {
		if (this.controller) {
			this.controller.abort();
			this.controller = null;
		}
	}

	toggle(event) {
		this.controller?.abort();

		const triggerTarget = event.currentTarget;

		const isOpen = triggerTarget.getAttribute("aria-expanded") === "true";
		const nextIsOpen = !isOpen;

		triggerTarget.setAttribute("aria-expanded", nextIsOpen);
		this.collapseTarget.inert = !nextIsOpen;
		this.controller = new AbortController();
		this.slide(nextIsOpen, this.controller.signal);
	}

	async slide(shouldDown, signal) {
		this.collapseTarget.classList.add(this.collapsingClass);

		const height = {
			from: shouldDown ? "0px" : `${this.contentHeight}px`,
			to: shouldDown ? `${this.contentHeight}px` : "0px",
		};

		this.collapseTarget.style.height = height.from;

		// wait until the next frame for the transition to work
		await new Promise(afterFrame);

		this.collapseTarget.style.height = height.to;

		// wait for the transition to finish
		try {
			await waitForStyleToBeSet(this.collapseTarget, "height", height.to);
		} catch (error) {
			return;
		}

		if (signal.aborted) {
			return;
		}

		this.collapseTarget.style.height = "";

		this.collapseTarget.classList.remove(this.collapsingClass);
	}

	get contentHeight() {
		invariant(this.collapseTarget.children.length === 1);
		invariant(this.collapseTarget.firstElementChild instanceof HTMLElement);
		return this.collapseTarget.firstElementChild.offsetHeight;
	}
}
