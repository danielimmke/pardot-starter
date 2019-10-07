<div  align="center">

# Pardot Landing Page Template

**Updated 10/7/2019**

</div>

  

Pardot is a popular CRM, but I have found their resources for developers to be a bit lacking. To remedy this, I built this project as an easy way to modernize development of Pardot landing page templates. It allows you to use SASS and utilizes Gulp to spit all stylesheets and scripts inline onto the landing page. This is great for reducing HTTP requests and cutting down time if you are sick of having to do that manually to get styles to show up in the WYSIWYG editor or you hate having to use their content manager to upload things.

  

To learn more about the pain points this starter kit solves, read this [blog post](https://daniel.do/blog/pardot-starter-kit/).

  

## Installation

  

1. If you don't have it already, install [npm](https://www.npmjs.com/).

2. Clone the repo and type `npm install` to install all the packages.

3. From then on, type `gulp watch` to begin coding your landing page.

  

## Usage

* The folder you actually edit **HTML** in is the `/source/` folder. Once you save a file in that folder, Gulp will generate a corresponding file of the same name in the `/preview/` folder. Open that file to view your changes in the browser.

    * This project uses the [Nunjucks](https://mozilla.github.io/nunjucks/) templating engine, so you can separate sections into different files. Refer to the Nunjucks documentation for more advanced usage.

* To edit the **CSS** or **Javascript**, access `assets/scss/style.scss` and `assets/js/index.js` respectively. Refreshing the preview file should show these changes.

* When you're ready to get the final file to copy and paste into Pardot's admin area exit `gulp watch` and type `gulp build`. The script will generate a html files in the `/build/` with all the CSS and JS inline. You can copy that html directly into Pardot to "deploy" it.

  

Happy coding!