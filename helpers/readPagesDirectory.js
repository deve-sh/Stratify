const readPagesDirectory = () => {
	const fs = require("fs");
	const path = require("path");

	const files = fs.readdirSync(path.resolve(process.cwd(), "./pages"));
	return files.filter((fileName) => fileName.endsWith(".md"));
};

module.exports = readPagesDirectory;
