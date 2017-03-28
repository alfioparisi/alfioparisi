var gulp = require("gulp"),
    rename = require("gulp-rename"),
    imageResize = require("gulp-image-resize"),
    imagemin = require("gulp-imagemin"),
    webp = require("gulp-webp"),
    uglify = require("gulp-uglify"),
    cleanCSS = require("gulp-clean-css"),
    concat = require("gulp-concat"),
    critical = require("critical").stream;

//minify .css
gulp.task("minify-css", function() {
  return gulp.src('docs/css/style.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('dist/css'));
});

//minify .js
gulp.task('compress', function () {
  // returns a Node.js stream, but no handling of error messages
  return gulp.src('docs/js/*.js')
    .pipe(uglify())
    .pipe(rename("perfmatters.min.js"))
    .pipe(gulp.dest('dist/js'));
});

// Generate & Inline Critical-path CSS
gulp.task('critical', function () {
    return gulp.src('dist/*.html')
        .pipe(critical({base: 'dist/', inline: true, css: ['dist/css/style.min.css']}))
        .pipe(gulp.dest('dist/'));
});

//resize images
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
