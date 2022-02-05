const readPagesDirectory = () => {
	const fs = require("fs");
	const path = require("path");

	const readDirectory = require("./readDirectory");

	const files = readDirectory(path.resolve(process.cwd(), "./pages"));
	return files
		.filter((fileName) => fileName.endsWith(".md"))
		.map((fileName) => ({
			fileName,
			directory: (() => {
				const removedBasePath = fileName.split(process.cwd())[1];
				return removedBasePath
					.substr(0, removedBasePath.lastIndexOf("/"))
					.replace("\\pages", "");
			})(),
		}));
};

module.exports = readPagesDirectory;
