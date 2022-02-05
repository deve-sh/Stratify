const readPagesDirectory = () => {
	const fs = require("fs");
	const path = require("path");

	const readDirectory = require("./readDirectory");

	const files = readDirectory(path.resolve(process.cwd(), "./pages"));
	return files.filter((fileName) => fileName.endsWith(".md"));
};

module.exports = readPagesDirectory;
