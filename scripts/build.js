const getPageTemplate = require("../helpers/getPageTemplate");

function buildPages() {
	const readPagesDirectory = require("../helpers/readPagesDirectory");

	const markdownFiles = readPagesDirectory();

	const dirExists = require("../helpers/dirExists");
	const fs = require("fs");
	const path = require("path");

	const buildFolder = path.resolve(process.cwd(), "./build");
	const publicFolder = path.resolve(process.cwd(), "./public");

	if (dirExists(buildFolder)) fs.rmSync(buildFolder, { recursive: true });
	fs.mkdirSync(buildFolder);

	if (markdownFiles.length) {
		const {
			marked: { parse: parseMarkdown },
		} = require("marked");

		for (let { fileName, directory } of markdownFiles) {
			const pageName = fileName
				.split(path.resolve(process.cwd(), "./pages"))[1] // Get the full file name for the markdown file
				.split(".md")[0] // Remove the .md extension;
				.replace("\\", "/"); // Remove opposite slashes from the path

			console.log("Building page: ", pageName.replace("\\", "/"));
			const markdownContent = fs.readFileSync(fileName, "utf-8");
			const convertedHTML = parseMarkdown(markdownContent);

			if (directory)
				fs.mkdirSync(`${buildFolder}${directory}`, { recursive: true });

			// Check if there is any template present for this page.
			const template = getPageTemplate(pageName);
			if (template)
				fs.writeFileSync(
					`${buildFolder}/${pageName}.html`,
					// Replace the  {{ content }} block with the converted markdown HTML
					template.replace("{{ content }}", convertedHTML)
				);
			else fs.writeFileSync(`${buildFolder}/${pageName}.html`, convertedHTML);
		}
		console.log("Finished Building Pages");
		console.log("Moving static assets to build directory");
		if (dirExists(publicFolder)) {
			// For all static assets
			const copyAllFolderContents = require("../helpers/copyAllFolderContents");
			copyAllFolderContents(publicFolder, buildFolder);
		}
	}

	console.log("Build successful");
	return process.exit(0); // Done building without any issues
}

module.exports = buildPages;
