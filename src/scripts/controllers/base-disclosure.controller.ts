import { Controller } from "@hotwired/stimulus";
import gsap from "gsap";

export default class extends Controller {
	static targets = ["button", "content"];
	buttonTarget: HTMLButtonElement;
	contentTarget: HTMLElement;

	toggle() {
		this.expanded = !this.expanded;
	}

	get expanded() {
		return this.buttonTarget.getAttribute("aria-expanded") === "true";
	}

	set expanded(value: boolean) {
		this.buttonTarget.setAttribute("aria-expanded", String(value));

		if (value) {
			slideDown(this.contentTarget);
		} else {
			slideUp(this.contentTarget);
		}
	}
}

function slideDown(element: HTMLElement) {
	gsap.killTweensOf(element, { height: true });

	element.style.setProperty("display", "block");
	element.style.setProperty("overflow", "hidden");
	element.style.setProperty("height", "0");

	gsap.to(element, {
		height: "auto",
		duration: 0.25,
		onComplete: () => {
			element.style.removeProperty("overflow");
			element.style.removeProperty("height");
		},
	});
}

function slideUp(element: HTMLElement) {
	gsap.killTweensOf(element, { height: true });

	element.style.setProperty("overflow", "hidden");

	gsap.to(element, {
		height: 0,
		duration: 0.2,
		onComplete: () => {
			element.style.setProperty("display", "none");
			element.style.removeProperty("overflow");
			element.style.removeProperty("height");
		},
	});
}
