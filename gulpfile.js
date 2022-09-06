// function task(done) {
//   console.log("From my first task...");
//   done();
// }

// // You have to name your task on exports functions and thats the name you will call them from terminal
// exports.firstTask = task;

// importing gulp
const { src, dest } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function css(done) {
  // compile sass
  // 1. Identify the file
  // 2. Compile
  // save the .css file
  src("src/scss/app.scss").pipe(sass()).pipe(dest("build/css"));
  done();
}

exports.css = css;
