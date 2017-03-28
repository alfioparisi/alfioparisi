var gulp = require("gulp"),
    rename = require("gulp-rename"),
    imageResize = require("gulp-image-resize"),
    imagemin = require("gulp-imagemin"),
    webp = require("gulp-webp"),
    uglify = require("gulp-uglify"),
    cleanCSS = require("gulp-clean-css"),
    critical = require("critical").stream;

//TODO: fix landing folders and concatenation
//minify .css
gulp.task("minify-css", function() {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename("main.min.css"))
    .pipe(gulp.dest('./min-css'));
});

//minify .js
gulp.task('compress', function () {
  // returns a Node.js stream, but no handling of error messages
  return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest('./min-js'));
});

//working properly!
var resizeTasks = [];

[200, 500, 1000, 1500].forEach(function(el) {
  var resize = "to " + el;
  gulp.task(resize, function() {
    return gulp.src("docs/img/*.jpg")
      .pipe(imageResize({
        width: el,
        height: el,
        imageMagick: true,
        upscale: true,
        quality: (function() {
          if (el > 1000) {
            return 0.7;
          } else {
            return 0.5;
          }
        })()
    }))
      .pipe(rename(function (path) { path.basename += "_" + el; }))
      .pipe(imagemin()) //compress
      .pipe(gulp.dest("docs/img-resp"))
      .pipe(webp()) //change format to webp
      .pipe(gulp.dest("docs/img-resp"));
  })
  resizeTasks.push(resize);
});

gulp.task("resize", resizeTasks);
