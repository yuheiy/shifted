module.exports = (plop) => {
	plop.setGenerator("ct", {
		description: "component",
		prompts: [
			{
				type: "input",
				name: "name",
			},
			{
				type: "checkbox",
				name: "types",
				choices: [
					{
						name: "template",
						checked: false,
					},
					{
						name: "style",
						checked: true,
					},
				],
			},
		],
		actions: ({ types }) => {
			const result = [];

			if (types.includes("template")) {
				result.push({
					type: "add",
					path: "src/site/_includes/components/{{kebabCase name}}.pug",
					templateFile: "plop-templates/component/template.pug.hbs",
					skipIfExists: true,
				});
			}

			if (types.includes("style")) {
				result.push({
					type: "add",
					path: "src/assets/components/{{kebabCase name}}.scss",
					templateFile: "plop-templates/component/style.scss.hbs",
					skipIfExists: true,
				});
			}

			return result;
		},
	});

	plop.setGenerator("cr", {
		description: "controller",
		prompts: [
			{
				type: "input",
				name: "name",
			},
		],
		actions: [
			{
				type: "add",
				path: "src/assets/controllers/{{kebabCase name}}.ts",
				templateFile: "plop-templates/controller/controller.ts.hbs",
			},
		],
	});

	plop.setGenerator("p", {
		description: "page",
		prompts: [
			{
				type: "input",
				name: "path",
			},
		],
		actions: [
			{
				type: "add",
				path: "src/site/{{path}}.pug",
				templateFile: "plop-templates/page/template.pug.hbs",
				skipIfExists: true,
			},
			{
				type: "add",
				path: "src/site/{{path}}.yml",
				templateFile: "plop-templates/page/data.yml.hbs",
				skipIfExists: true,
			},
		],
	});
};
