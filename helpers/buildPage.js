const buildPage = ({ fileName, directory }, buildFolder) => {
	const path = require("path");
	const fs = require("fs");
	const parseMarkdown = require("./parseMarkdown");
	const getPageTemplate = require("./getPageTemplate");

	const pageName = fileName
		.split(path.resolve(process.cwd(), "./pages"))[1] // Get the full file name for the markdown file
		.split(".md")[0] // Remove the .md extension;
		.replace("\\", "/"); // Remove opposite slashes from the path

	console.log("Building page: ", pageName);
	const markdownContent = fs.readFileSync(fileName, "utf-8");
	const { html: convertedHTML, title = "" } = parseMarkdown(markdownContent);

	if (directory)
		fs.mkdirSync(`${buildFolder}${directory}`, { recursive: true });

	// Check if there is any template present for this page.
	const template = getPageTemplate(pageName);
	if (template)
		fs.writeFileSync(
			`${buildFolder}/${pageName}.html`,
			// Replace the  {{ content }} block with the converted markdown HTML
			template
				.replace("{{ content }}", convertedHTML)
				.replace("{{ title }}", title)
		);
	else fs.writeFileSync(`${buildFolder}/${pageName}.html`, convertedHTML);
};

module.exports = buildPage;
