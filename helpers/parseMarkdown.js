const parseMarkdown = (markdown) => {
	const { marked } = require("marked");

	const convertedHTML = marked.parse(markdown, {
		langPrefix: "codeblock hljs language-",
	});

	const findCommentsInMarkdown = require("./findCommentsInMarkdown");

	const comments = findCommentsInMarkdown(markdown);

	const pageTitleFromMarkdown = "";
	for (let comment of comments) {
		if (comment.includes("Title: "))
			pageTitleFromMarkdown = comment.split("Title: ")[1];
	}

	return { html: convertedHTML, comments, title: pageTitleFromMarkdown };
};

module.exports = parseMarkdown;
