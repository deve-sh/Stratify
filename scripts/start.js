// Check if there is a build folder, if yes, use the 'serve' package to serve it's content on a local server.
function start() {
	const path = require("path");
	const dirExists = require("../helpers/dirExists");

	if (dirExists(path.resolve(process.cwd(), "./build"))) {
		const { execSync } = require("child_process");
		execSync("npx serve build", { stdio: "inherit" });
	} else
		console.log(
			"There is no build folder. Run npm run build to build your pages."
		);
}

module.exports = start;
