---
to: "<%- locals.controller ? `src/components/${h.changeCase.param(name)}/${h.changeCase.param(name)}.controller.ts` : null %>"
---
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
}
