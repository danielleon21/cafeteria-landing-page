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
const sourcemaps = require("gulp-sourcemaps");
const cssnano = require("cssnano");

// Images
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

// compile gulp
function css(done) {
  // compile sass
  // 1. Identify the file
  // 2. Compile
  // save the .css file
  src("src/scss/app.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(dest("build/css"));
  done();
}

function images(done) {
  src("src/img/**/*")
    .pipe(imagemin({ optimizationLevel: 3 }))
    .pipe(dest("build/img"));
  done();
}

function webpVersion(done) {
  src("src/img/**/*.{png,jpg}").pipe(webp()).pipe(dest("build/img"));
  done();
}

function avifVersion(done) {
  const options = {
    quality: 50,
  };
  src("src/img/**/*.{png,jpg}").pipe(avif(options)).pipe(dest("build/img"));
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
exports.webpVersion = webpVersion;
exports.avifVersion = avifVersion;
exports.default = series(css, dev);

// Series - start a task, and after the task finish, start the next one
// Parallel - all task start at the same time.
