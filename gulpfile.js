// function task(done) {
//   console.log("From my first task...");
//   done();
// }

// // You have to name your task on exports functions and thats the name you will call them from terminal
// exports.firstTask = task;

// importing gulp
// CSS
const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

// Images
const imagemin = require("gulp-imagemin");

// compile gulp
function css(done) {
  // compile sass
  // 1. Identify the file
  // 2. Compile
  // save the .css file
  src("src/scss/app.scss")
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(dest("build/css"));
  done();
}

function images(done) {
  src("src/img/**/*")
    .pipe(imagemin({ optimizationLevel: 3 }))
    .pipe(dest("build/img"));
  done();
}

function dev() {
  watch("src/scss/**/*.scss", css);
  watch("src/img/**/*", images);
  //watch("src/scss/app.scss", css);
}

exports.css = css;
exports.dev = dev;
exports.images = images;
exports.default = parallel(images, css, dev);

// Series - start a task, and after the task finish, start the next one
// Parallel - all task start at the same time.
