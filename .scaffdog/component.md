---
name: component
root: .
output: .
questions:
    name: Please enter component name.
---

# `src/site/_includes/components/{{ inputs.name | kebab }}.pug`

```pug
mixin c-{{ inputs.name | kebab }}(props = {})
	-
		props = Object.assign({
		}, props);

	.c-{{ inputs.name | kebab }}&attributes(attributes)

```

# `src/assets/components/{{ inputs.name | kebab }}.scss`

```scss
@use "../styles/abstracts" as *;

.c-{{ inputs.name | kebab }} {
}

.c-{{ inputs.name | kebab }}__ {
}

```
