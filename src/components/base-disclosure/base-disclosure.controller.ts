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
		this.contentTarget.inert = !value;

		gsap.to(this.contentTarget, {
			height: value ? "auto" : 0,
			duration: value ? 0.25 : 0.2,
		});
	}
}
