---
to: "<%- locals.controller ? `src/components/${h.changeCase.param(name)}/${h.changeCase.param(name)}.controller.ts` : null %>"
---
import { controller } from "@github/catalyst";

@controller
export class C<%- h.changeCase.pascal(name) %>Element extends HTMLElement {
}
