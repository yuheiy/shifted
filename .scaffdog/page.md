---
name: page
root: .
output: .
questions:
    name: Please enter page name.
---

# `src/site/{{ inputs.name }}.pug`

```pug
extends /layouts/base

block main

```

# `src/site/{{ inputs.name }}.yml`

```yml
title: {{ inputs.name | kebab }}
description:

```
