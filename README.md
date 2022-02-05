# Stratify

A simple tool to build out a static website using nothing but Markdown. Useful for static blog sites and feeds.

### Get Started

```
npm i -g stratify-web
```

### Create a New Project

```bash
create-stratify-project <Directory Path> <App Name>
cd <Directory Path>
```

This creates a simple project at the directory path.

### Editing Your Pages

Use the `pages` folder to make changes to your pages. They support comments, all markdown is rendered to static HTML at build time.

```markdown
pages/index.md -> index.html post build
pages/subpages/subpage.md -> subpages/subpage.html post build

<!--
Supports HTML style Comments
-->

To change the title of the page, just add this to the top of the file.

<!--
Title: Page Title
-->
```

### Templates

There will be inevitably times when you want to add new stylesheets to the project, or include external scripts, in those cases, the power of plain HTML can come in handy. You can use the template pre-provided in the `templates` directory or create new ones for each page.

If you have a page `post-1.md`, you can create a `templates/post-1.html` file and it will be picked up, if a matching template name is not found, the builder defaults to the `templates/index.html` file. If no templates are found, the html output generated is a simple conversion of the markdown to HTML.

An example of a template is:

```html
<html>
	<head>
		<title>{{ title }}</title>
		<!-- Add your desired stylesheets here -->
	</head>
	<body>
		<!-- This serves as a template for your file, 
			add stylesheets, 
			scripts or any other properties that you need common in your pages.
		-->
		{{ content }}
	</body>
</html>
```

`{{ title }}` and `{{ content }}` are dynamically replaced with the title and content of the page at build time, support for more dynamic fields coming soon.

### Static Assets

Put your static assets like images, videos and other files in the `public` folder. They are automatically moved to the build output and are available in the same directory as the finally built pages.

### Building your project

```bash
stratify build
```

This compiles your markdown pages to HTML and puts them in the `build` folder. This folder can then be served through a CDN or hosting provider like Vercel, Netlify since it's completely static.

### Serving Build Output

Once the build for your project is complete, you can run:

```bash
stratify start
```

It internally uses [serve](https://npmjs.com/serve) to serve the build output.

### Running the dev server

The dev server has hot reloading enabled for development ease. Run the following command:

```bash
stratify dev
```

### Contribution & Issues

[Raise an issue](https://github.com/deve-sh/stratify/issues/new)

[Create a Pull Request](https://github.com/deve-sh/stratify/compare)

Contributions and feedback is welcome, this is a weekend project built out of curiousity, any good changes will be merged.
