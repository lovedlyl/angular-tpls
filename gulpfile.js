var gulp = require("gulp");
var pug = require("gulp-pug");
var plumber = require("gulp-plumber");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
var stream = browserSync.stream;
var concat = require("gulp-concat");
var imageMin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var jsonMin = require("gulp-json-minify");
var util = require("gulp-util");
var sass = require("gulp-ruby-sass");
var cssMin = require("gulp-clean-css");
var rename = require("gulp-rename");

// 使用库文件
var lib = function() {
    // js库
    gulp.src(["bower_components/angular/angular.min.js"])
        .pipe(concat("lib.js"))
        .pipe(gulp.dest("dist/js"));
    // css库
    gulp.src(["bower_components/bootstrap/dist/css/bootstrap-theme.min.css"])
        .pipe(concat("lib.css"))
        .pipe(gulp.dest("dist/css"));
};

// pug 文件转译,引入文件使用"_"开头，不编译
var html = function() {
    gulp.src(["app/*.pug", "!app/_*.pug"])
        .pipe(plumber())
        .pipe(pug({ pretty: false }))
        .pipe(gulp.dest("dist"))
        .pipe(plumber.stop())
        .pipe(stream());
};



// 合并压缩js文件
var js = function() {
    gulp.src(["app/js/**/*.js"])
        .pipe(plumber())
        .pipe(concat("index.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
        .pipe(plumber.stop())
        .pipe(stream())
};


// sass 文件转译
var css = function() {
    return sass('app/sass/**/*.sass')
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
        .pipe(concat("main.css"))
        .pipe(cssMin())
        .pipe(gulp.dest('dist/css'))
        .pipe(stream())
};

var tasks = {lib: lib, html: html, js: js, css: css};
for(var key in tasks){
	var task = tasks[key];
	task();
	console.log(key);
	gulp.task(key, task);
}


gulp.task("default", function() {
    browserSync.init({
        server: "dist"
    });
    gulp.watch(["app/*.pug"], ["html", browserSync.reload]);
    gulp.watch("app/sass/**/*.sass", ["css", browserSync.reload]);
    gulp.watch(["app/js/**/*.js"], ["js", browserSync.reload]);
});
