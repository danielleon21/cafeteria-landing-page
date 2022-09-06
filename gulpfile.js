// function task(done) {
//   console.log("From my first task...");
//   done();
// }

// // You have to name your task on exports functions and thats the name you will call them from terminal
// exports.firstTask = task;

// importing gulp
const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

// compile gulp
function css(done) {
  // compile sass
  // 1. Identify the file
  // 2. Compile
  // save the .css file
  src("src/scss/app.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest("build/css"));
  done();
}

function dev() {
  watch("src/scss/app.scss", css);
}

exports.css = css;
exports.dev = dev;
exports.default = parallel(css, dev);

// Series -
// Parallel -
