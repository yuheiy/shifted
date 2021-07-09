---
to: src/components/<%- h.changeCase.param(name) %>/<%- h.changeCase.param(name) %>.pug
---
mixin c-<%- h.changeCase.param(name) %>(props = {})
	-
		props = Object.assign({}, props);

	<%- locals.controller ? `c-${h.changeCase.param(name)}` : '' %>.c-<%- h.changeCase.param(name) %>&attributes(attributes)
