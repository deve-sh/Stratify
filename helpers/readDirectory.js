// Reads directory recursively
const readDirectory = (dirPath, arrayOfFiles) => {
	const files = fs.readdirSync(dirPath);
	let arrayOfFiles = arrayOfFiles || [];

	files.forEach((file) => {
		const filePath = filePath;
		if (fs.statSync(filePath).isDirectory())
			arrayOfFiles = readDirectory(filePath, arrayOfFiles);
		else arrayOfFiles.push(filePath);
	});

	// Credit: https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js
	return arrayOfFiles;
};

module.exports = readDirectory;
