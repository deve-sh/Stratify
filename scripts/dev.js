const buildPage = require("../helpers/buildPage");

async function setupDevServer() {
	console.log("Starting up dev server");
	const liveServer = require("live-server");

	const port = parseInt(process.argv[3]) || 8181;

	// Setup initial build in .live folder
	const buildPages = require("./build");
	await buildPages("./.live", true, false);

	// Initial build done.
	// Setup a change listener for listening to user's changes in the pages directory.
	const fs = require("fs");
	const path = require("path");
	const buildFolder = path.resolve(process.cwd(), "./.live");

	// For debouncing
	let lastFileChanged = null;
	let lastFileChangeTime = null;

	try {
		fs.watch(
			path.resolve(process.cwd(), "./pages"),
			{ recursive: true }, // Listen to all internal pages
			(type, fileName) => {
				// Only rebuild this page
				if (type === "change") {
					// Simple debouncing to check if there aren't duplicate file changes.
					if (
						lastFileChanged === fileName &&
						lastFileChangeTime &&
						new Date().getTime() - lastFileChangeTime.getTime() < 150
					)
						return;
					lastFileChangeTime = new Date();
					lastFileChanged = fileName;

					// Only build the page that has very recently been changed
					return buildPage(
						{
							fileName: path.resolve(process.cwd(), "./pages", `./${fileName}`),
							directory: "",
						},
						buildFolder
					);
				}
				console.warn(
					"Renames or deletions for pages require a dev server restart."
				);
				process.exit(1);
			}
		);
	} catch (_) {
		// On linux, recursive watch is not supported. Hence this causes script crashes.
	}

	// Change listener setup, start the live server for changes in the .live directory.
	console.log(
		"Starting up Live Server, just make changes to your pages and reload your browser window if you don't immediately see them"
	);
	const liveServerParams = {
		port,
		host: "0.0.0.0",
		root: path.resolve(process.cwd(), "./.live"),
		open: true,
		wait: 1000,
		logLevel: 1,
	};
	liveServer.start(liveServerParams);
}

module.exports = setupDevServer;
