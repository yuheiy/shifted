import { Application, Controller } from "@hotwired/stimulus";

export function waitForController(app: Application, element: Element, id: string) {
	return new Promise<Controller>((resolve) => {
		const check = () => {
			const ctrl = app.getControllerForElementAndIdentifier(element, id);
			if (ctrl) resolve(ctrl);
			else setTimeout(check);
		};

		check();
	});
}
