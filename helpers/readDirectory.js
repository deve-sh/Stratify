// Reads directory recursively
const readDirectory = (dirPath, arrayOfFiles) => {
	const fs = require("fs");
	const path = require("path");

	const files = fs.readdirSync(dirPath);
	arrayOfFiles = arrayOfFiles || [];

	files.forEach((file) => {
		const filePath = dirPath + "/" + file;
		if (fs.statSync(filePath).isDirectory())
			arrayOfFiles = readDirectory(
				path.resolve(process.cwd(), filePath),
				arrayOfFiles
			);
		else arrayOfFiles.push(filePath);
	});

	// Credit: https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js
	return arrayOfFiles;
};

module.exports = readDirectory;
