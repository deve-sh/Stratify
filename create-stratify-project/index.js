#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");

function generateError(errorMessage) {
	console.error(errorMessage);
	return process.exit(1);
}

const packageJSONContent = (appName = "") => `{
	"name": "${appName.replace(/\s/g, "_").toLowerCase()}",
	"version": "1.0.0",
	"description": "A simple tool to build out a static website using nothing but Markdown.",
	"main": "index.js",
	"scripts": {
	  "test": "echo \\"Error: no test specified\\" && exit 1",
	  "dev": "stratify dev",
	  "build": "stratify build",
	  "start": "stratify start"
	},
	"dependencies": {
		"stratify-web": "^1.0.0"
	},
	"keywords": [],
	"author": "",
	"license": "UNLICENSED"
}`;

const filesToGenerate = [
	{
		name: ".gitignore",
		content: "node_modules\n.env\nbuild\n.live\n",
	},
	{
		name: "package.json",
		content: ({ appName }) => packageJSONContent(appName),
	},
	{
		name: "pages/index.md",
		requiresFolder: "pages",
		content: ({ appName }) => `# This is a Sample Page

<!--
Title: ${appName}
-->

Populate this with content, run \`npm run dev\` to see this page change live.

To change the title of the page, just use the comment block in the source for this file.

Once you're done with working on the files, run \`npm run build\` to compile the entire directory to static HTML Files.

Run \`npm run start\` to serve the built output.`,
	},
	{
		name: "public/staticasset.md",
		requiresFolder: "public",
		content: `Keep your static assets like images, robots.txt, videos etc in this folder.`,
	},
	{
		name: "templates/index.html",
		requiresFolder: "templates",
		content: `<html>
	<head>
		<title>{{ title }}</title>
	</head>
	<body>
		<!-- This serves as a template for your file, 
			add stylesheets, 
			scripts or any other properties that you need common in your pages.
		-->
		{{ content }}
	</body>
</html>`,
	},
];

function generateStratifyProject() {
	let directoryName = process.argv[2];
	const appName = process.argv[3] || "stratify-boilerplate";

	if (!directoryName)
		return generateError(
			`Error: Please provide a directory name as the first command line argument.\n` +
				`Example: npx create-stratify-project directory-name\n`
		);

	directoryName = directoryName.replace("./", "");

	// Create directory for project
	const directory = `./${directoryName}`;

	if (fs.existsSync(directory))
		return generateError(
			"A directory with the specified name already exists. Please remove it first."
		);

	fs.mkdirSync(directory);
	// Write pre-requisite files to the directory.
	for (let file of filesToGenerate) {
		if (file.requiresFolder)
			fs.mkdirSync(`${directory}/${file.requiresFolder}`);
		fs.writeFileSync(
			`${directory}/${file.name}`,
			typeof file.content === "function"
				? file.content({ appName, directory })
				: file.content
		);
	}
	execSync(`cd ${directory}`);
	// Install dependencies
	execSync("npm install");
	// Initialize it as a git repositry
	execSync("git init");
	// Come back to the main folder
	execSync("cd ../");
	console.log("Successfully generated startify project.");
}

generateStratifyProject();
