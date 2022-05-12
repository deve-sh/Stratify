const getPageTemplate = (pageName, environmentVariables = {}) => {
	const fs = require("fs");
	const path = require("path");

	const pageProbableTemplatePath = path.resolve(
		process.cwd(),
		`./templates/${pageName}.html`
	);
	const defaultTemplatePath = path.resolve(
		process.cwd(),
		`./templates/index.html`
	);

	let pageTemplateContent = null;
	if (fs.existsSync(pageProbableTemplatePath))
		pageTemplateContent = fs.readFileSync(pageProbableTemplatePath, "utf8");
	if (fs.existsSync(defaultTemplatePath))
		pageTemplateContent = fs.readFileSync(defaultTemplatePath, "utf8");
	if (pageTemplateContent) {
		// Check for environment variables and replace occurrences of 'process.env.STRATIFY_APP_' with the original environment variable values.
		for (let variableName of Object.keys(environmentVariables || {})) {
			if (variableName.startsWith("STRATIFY_APP_")) {
				// \b for whole-word searches as process.env.STRATIFY_APP_ENV and
				// process.env.STRATIFY_APP_ENV2 will be replaced by value of process.env.STRATIFY_APP_ENV without it.
				const variableNameRegex = new RegExp(
					`\\bprocess.env.${variableName}\\b`,
					"g"
				);
				pageTemplateContent = pageTemplateContent.replace(
					variableNameRegex,
					environmentVariables[variableName]
				);
			}
		}
		return pageTemplateContent;
	}
	return null;
};

module.exports = getPageTemplate;
