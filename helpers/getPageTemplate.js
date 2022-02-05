const getPageTemplate = (pageName) => {
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

	if (fs.existsSync(pageProbableTemplatePath))
		return fs.readFileSync(pageProbableTemplatePath, "utf8");
	if (fs.existsSync(defaultTemplatePath))
		return fs.readFileSync(defaultTemplatePath, "utf8");
	return null;
};

module.exports = getPageTemplate;
