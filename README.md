# Pardot Landing Page Template


Pardot is a pretty popular CRM, but I have found their resources for developers to be a bit lacking. To remedy this, I built this project as an easy way to modernize development of Pardot landing page templates. It allows you to use SASS and utilizes Gulp to spit all stylesheets and scripts inline onto the landing page. This is great for reducing HTTP requests and cutting down time if you are sick of having to do that manually to get styles to show up in the WYSIWYG editor or you hate having to use their content manager to upload things.

It's very basic right now, I have a few big features I'm planning on implementing. Notably: A templating engine and if possible the ability to upload images to their content manager using their API.

## Installation

1. If you don't have it already, install [npm](https://www.npmjs.com/).
2. Clone the repo and type `npm install` to install all the packages.
3. From then on, just type `gulp watch` and code your landing page
4. The folder you actually edit code in is the `/source/` folder. This project uses the [Nunjucks](https://mozilla.github.io/nunjucks/) templating engine, so you can use template parts. To preview these changes, open the corresponding html file in the `/preview/` folder.
5. When you're ready to get the final file to copy and paste into Pardot's admin area exit `gulp watch` and type `gulp build`. The script will generate a html files in the `/build/` with all the CSS and JS inline.

Happy coding!