import { controller, target } from "@github/catalyst";

const containerElement = document.querySelector("#js-overlay-container");

/**
 * @example
 * ```html
 * <modal-dialog-trigger>
 *   <button
 *     type="button"
 *     aria-haspopup="dialog"
 *     data-action="click:modal-dialog-trigger#open"
 *   >
 *     さらに詳しく
 *   </button>
 *   <template data-target="modal-dialog-trigger.template">
 *     <modal-dialog>
 *       ...
 *     </modal-dialog>
 *   </template>
 * </modal-dialog-trigger>
 * ```
 */
@controller
export class ModalDialogTriggerElement extends HTMLElement {
	@target template: HTMLTemplateElement;

	open() {
		const dialogNode = this.template.content.cloneNode(true);
		containerElement.append(dialogNode);
	}
}
