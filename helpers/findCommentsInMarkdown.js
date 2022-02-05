const findCommentsInMarkdown = (markdown = "") => {
	const regex = /^<!--\n((.|\n)*?)\n-->/gm;
	const commentMatches = markdown.match(regex);
	if (commentMatches)
		return commentMatches.map((match) =>
			match.replace("<!--\n", "").replace("\n-->", "").split(":")
		);
	else return null;
};

module.exports = findCommentsInMarkdown;
