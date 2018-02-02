var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");
var cleanCSS = require("gulp-clean-css");
var sourcemaps = require("gulp-sourcemaps");
var del = require("del");
// var pump = require("pump");
var imageResize = require("gulp-image-resize");
var parallel = require("concurrent-transform");
// var os = require("os");

var paths = {
  scripts: "src/scripts/*.js",
  css: "src/styles/*.css",
  images: "src/img/**/*"
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task("clean", function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(["public"]);
});

// gulp.task("scripts", ["clean"], function(cb) {
//   // Minify and copy all JavaScript (except vendor scripts)
//   // with sourcemaps all the way down
//   pump(
//     [
//       gulp.src(paths.scripts),
//       uglify(),
//       concat("all.min.js"),
//       gulp.dest("build/js")
//     ],
//     cb
//   );
// });

gulp.task("minify-css", ["clean"], function() {
  return gulp
    .src(paths.css)
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(concat("style.min.css"))
    .pipe(gulp.dest("public/stylesheets"));
});

// Copy all static images
gulp.task("images", ["clean"], function() {
  return (gulp
      .src(paths.images)
      // Pass in options to the task
      .pipe(imagemin({ optimizationLevel: 7 }))
      .pipe(gulp.dest("public/img")) );
});

// gulp.task("screenshots-thumbnails", ["images"], function() {
//   return gulp
//     .src(paths.screenshots)
//     .pipe(
//       parallel(
//         imageResize({
//           width: 250,
//           height: 150,
//           crop: true,
//           upscale: false,
//           quality: 1
//         }),
//         os.cpus().length
//       )
//     )
//     .pipe(gulp.dest("build/img/screenshots/thumbnails"));
// });

// Rerun the task when a file changes
gulp.task("watch", function() {
  // gulp.watch(paths.scripts, ["scripts"]);
  gulp.watch(paths.css, ["minify-css"]);
  gulp.watch(paths.images, ["images"]);
});

// The default task (called when you run `gulp` from cli)
gulp.task("default", [
  "watch",
  // "scripts",
  "minify-css",
  "images"
  // "screenshots-thumbnails"
]);
