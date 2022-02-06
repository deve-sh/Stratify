function setupDevServer() {
	console.log("Starting up dev server");
	const liveServer = require("live-server");

	// Setup initial build in .live folder
	const buildPages = require("./build");
	buildPages("./.live", true);

	// Initial build done.
	// Setup a change listener for listening to user's changes in the pages directory.
	const fs = require("fs");
	const path = require("path");
	fs.watch(
		path.resolve(process.cwd(), "./pages"),
		{ recursive: true },
		console.log
	);

	// Change listener setup, start the live server for changes in the .live directory.
	const liveServerParams = {
		port: 8181,
		host: "0.0.0.0",
		root: path.resolve(process.cwd(), "/.live"),
		open: true,
		file: "index.html",
		wait: 1000,
		logLevel: 2,
	};
	liveServer.start(liveServerParams);
}

module.exports = setupDevServer;
