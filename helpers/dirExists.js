const dirExists = (directory) => {
	const { existsSync } = require("fs");
	return existsSync(directory);
};

module.exports = dirExists;
