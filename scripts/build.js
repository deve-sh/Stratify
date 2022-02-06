function buildPages(
	buildPath = "./build",
	silent = false,
	exitPostBuild = true
) {
	const readPagesDirectory = require("../helpers/readPagesDirectory");

	const markdownFiles = readPagesDirectory();

	const dirExists = require("../helpers/dirExists");
	const fs = require("fs");
	const path = require("path");

	const buildFolder = path.resolve(process.cwd(), buildPath);
	const publicFolder = path.resolve(process.cwd(), "./public");

	if (dirExists(buildFolder)) fs.rmSync(buildFolder, { recursive: true });
	fs.mkdirSync(buildFolder);

	if (markdownFiles.length) {
		const buildPage = require("../helpers/buildPage");
		for (let file of markdownFiles) buildPage(file, buildFolder);

		if (!silent) console.log("Finished Building Pages");
		if (!silent) console.log("Moving static assets to build directory");
		if (dirExists(publicFolder)) {
			// For all static assets
			const copyAllFolderContents = require("../helpers/copyAllFolderContents");
			copyAllFolderContents(publicFolder, buildFolder);
		}
	}

	if (!silent) console.log("Build successful");
	if (exitPostBuild) return process.exit(0); // Done building without any issues
}

module.exports = buildPages;
