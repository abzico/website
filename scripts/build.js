/**
 * Build script that will be executed by `npm run build`
 */

const fs = require('fs');
const fsextra = require('fs-extra');
const replace = require('replace');
const uglifyjs = require('uglify-es');
const uglifycss = require('uglifycss');

// ensure that 'bulid' folder is created
fsextra.emptyDirSync('build');

// copy in all assets and .html
fsextra.copySync('assets', 'build/assets');
fsextra.copySync('images', 'build/images');
fsextra.copySync('index.html', 'build/index.html');
fsextra.copySync('favicon.ico', 'build/favicon.ico');

// uglify and minify main.js
var result = uglifyjs.minify({
	'main.js': fs.readFileSync('build/assets/js/main.js', 'utf8')
});
fs.writeFileSync('build/assets/js/main.min.js', result.code, 'utf8');

// uglify and minify main.css
result = uglifycss.processFiles(['build/assets/css/main.css']);
fs.writeFileSync('build/assets/css/main.min.css', result, 'utf8');

// remove input file from bulid folder
fsextra.removeSync('build/assets/js/main.js');
fsextra.removeSync('build/assets/css/main.css');

// sed js inclusion in index.html
replace({
	regex: '<link rel="stylesheet" href="assets/css/main.css" />',
	replacement: '<link rel="stylesheet" href="assets/css/main.min.css" />',
	paths: ['build/index.html'],
	recursive: false,
	silent: true
});
replace({
	regex: '<script src="assets/js/main.js"></script>',
	replacement: '<script src="assets/js/main.min.js"></script>',
	paths: ['build/index.html'],
	recursive: false,
	silent: true
});