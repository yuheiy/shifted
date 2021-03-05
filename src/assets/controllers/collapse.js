import afterFrame from "afterframe";
import { Controller } from "stimulus";
import invariant from "tiny-invariant";

const htmlClasses = {
	COLLAPSING: "collapse--collapsing",
};

export default class extends Controller {
	static targets = ["button", "root"];

	toggle() {
		this.rootTarget.classList.add(htmlClasses.COLLAPSING);
		if (this.isShown) {
			this.rootTarget.style.height = `${this.contentHeight}px`;
			afterFrame(() => {
				this.rootTarget.style.height = "0px";
			});
		} else {
			this.rootTarget.style.height = "0px";
			afterFrame(() => {
				this.rootTarget.style.height = `${this.contentHeight}px`;
			});
		}
		this.isShown = !this.isShown;
	}

	postprocess() {
		this.rootTarget.classList.remove(htmlClasses.COLLAPSING);
		this.rootTarget.style.height = "";
	}

	get isShown() {
		return !this.rootTarget.inert;
	}

	set isShown(value) {
		this.buttonTarget.setAttribute("aria-expanded", String(value));
		this.rootTarget.inert = !value;
	}

	get contentHeight() {
		invariant(this.rootTarget.children.length === 1);
		invariant(this.rootTarget.firstElementChild instanceof HTMLElement);
		return this.rootTarget.firstElementChild.offsetHeight;
	}
}
