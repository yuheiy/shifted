---
to: "<%- locals.controller ? `src/scripts/controllers/${h.changeCase.param(name)}.controller.ts` : null %>"
---
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
}
