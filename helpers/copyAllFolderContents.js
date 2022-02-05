const copyAllFolderContents = (source, desctination) => {
	const { copySync } = require("fs-extra");
	copySync(source, desctination, { overwrite: true, recursive: true });
	return true;
};

module.exports = copyAllFolderContents;
