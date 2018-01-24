/**
 * Build script that will be executed by `npm run build`
 */

const fs = require('fs');
const fsextra = require('fs-extra');
const replace = require('replace');
const uglifyjs = require('uglify-es');
const uglifycss = require('uglifycss');

// ensure that '_site' folder is created
fsextra.emptyDirSync('_site');

// copy in all assets and .html
fsextra.copySync('assets', '_site/assets');
fsextra.copySync('images', '_site/images');
fsextra.copySync('index.html', '_site/index.html');
fsextra.copySync('favicon.ico', '_site/favicon.ico');

// uglify and minify main.js
var result = uglifyjs.minify({
	'main.js': fs.readFileSync('_site/assets/js/main.js', 'utf8')
});
fs.writeFileSync('_site/assets/js/main.min.js', result.code, 'utf8');

// uglify and minify main.css
result = uglifycss.processFiles(['_site/assets/css/main.css']);
fs.writeFileSync('_site/assets/css/main.min.css', result, 'utf8');

// remove input file from bulid folder
fsextra.removeSync('_site/assets/js/main.js');
fsextra.removeSync('_site/assets/css/main.css');

// sed js inclusion in index.html
replace({
	regex: '<link rel="stylesheet" href="assets/css/main.css" />',
	replacement: '<link rel="stylesheet" href="assets/css/main.min.css" />',
	paths: ['_site/index.html'],
	recursive: false,
	silent: true
});
replace({
	regex: '<script src="assets/js/main.js"></script>',
	replacement: '<script src="assets/js/main.min.js"></script>',
	paths: ['_site/index.html'],
	recursive: false,
	silent: true
});
