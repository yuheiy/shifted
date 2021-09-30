import { Controller } from "@hotwired/stimulus";

const containerElement = document.querySelector("#js-overlay-container");

/**
 * @example
 * ```html
 * <div data-controller="modal-dialog-trigger">
 *   <button
 *     type="button"
 *     aria-haspopup="dialog"
 *     data-action="modal-dialog-trigger#open"
 *   >
 *     さらに詳しく
 *   </button>
 *   <template data-modal-dialog-trigger-target="template">
 *     <div data-controller="modal-dialog">
 *       ...
 *     </div>
 *   </template>
 * </div>
 * ```
 */
export default class extends Controller {
	static targets = ["template"];
	templateTarget: HTMLTemplateElement;

	open() {
		const dialogNode = this.templateTarget.content.cloneNode(true);
		containerElement.append(dialogNode);
	}
}
