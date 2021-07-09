---
to: src/controllers/<%- h.changeCase.param(name) %>.controller.ts
---
import { controller } from "@github/catalyst";

@controller
export class <%- h.changeCase.pascal(name) %>Element extends HTMLElement {
}
