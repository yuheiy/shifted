---
name: component
root: .
output: .
questions:
    name: Please enter component name.
---

# `src/site/_includes/components/{{ inputs.name | kebab }}.pug`

```pug
mixin {{ inputs.name | kebab }}(props = {})
	-
		props = Object.assign({
		}, props);

	.{{ inputs.name | kebab }}&attributes(attributes)

```

# `src/assets/components/{{ inputs.name | kebab }}.scss`

```scss
@use "../styles/abstracts" as *;

.{{ inputs.name | kebab }} {
}

.{{ inputs.name | kebab }}__ {
}

```
