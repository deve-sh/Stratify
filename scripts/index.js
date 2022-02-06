#!/usr/bin/env node

const commandType = process.argv[2];

if (!commandType || !["dev", "build", "start"].includes(commandType))
	return console.log("Use stratify dev/build/start for appropriate action.");

if (commandType === "dev") {
	// Start the dev server, with live reloading for changes in the 'pages' directory.
	const dev = require("./dev");
	dev();
} else if (commandType === "build") {
	// Build the pages directory and generate a 'build' folder.
	const build = require("./build");
	build();
} else if (commandType === "start") {
	// Check if there is a build folder, if yes, use the 'serve' package to serve it's content on a local server.
	const start = require("./start");
	start();
}
