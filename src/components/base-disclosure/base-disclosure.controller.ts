import { controller, target } from "@github/catalyst";
import gsap from "gsap";

@controller
export class CBaseDisclosureElement extends HTMLElement {
	@target button: HTMLButtonElement;
	@target content: HTMLElement;

	toggle() {
		this.expanded = !this.expanded;
	}

	get expanded() {
		return this.button.getAttribute("aria-expanded") === "true";
	}

	set expanded(value: boolean) {
		this.button.setAttribute("aria-expanded", String(value));
		this.content.inert = !value;

		gsap.to(this.content, {
			height: value ? "auto" : 0,
			duration: value ? 0.25 : 0.2,
		});
	}
}
