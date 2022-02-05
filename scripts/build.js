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

	console.log(markdownFiles);

	if (markdownFiles.length) {
		const {
			marked: { parse: parseMarkdown },
		} = require("marked");

		for (let { fileName, directory } of markdownFiles) {
			console.log("Building page: ", fileName);
			const markdownContent = fs.readFileSync(fileName, "utf-8");
			const convertedHTML = parseMarkdown(markdownContent);

			if (directory)
				fs.mkdirSync(`${buildFolder}${directory}`, { recursive: true });

			fs.writeFileSync(
				`${buildFolder}/${
					fileName
						.split(path.resolve(process.cwd(), "./pages"))[1] // Get the full file name for the markdown file
						.split(".md")[0] // Remove the .md extension
				}.html`,
				convertedHTML
			);
		}
		console.log("Finished Building Pages");
		console.log("Moving static assets to build directory");
		if (dirExists(publicFolder)) {
			// For all static assets
			const staticAssets = fs.readdirSync(publicFolder);
			for (let assetFile of staticAssets)
				fs.copyFileSync(
					`${publicFolder}/${assetFile}`,
					`${buildFolder}/${assetFile}`
				);
		}
	}

	console.log("Build successful");
	return process.exit(0); // Done building without any issues
}

module.exports = buildPages;
