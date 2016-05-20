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
var cssMin = require("gulp-clean-css");
// 将pug文件转换为html文件
var convertPug = function() {
    gulp.src("src/index.pug")
        .pipe(plumber())
        .pipe(pug({ pretty: false }))
        .pipe(plumber.stop())
        .pipe(gulp.dest("dist"))
        .pipe(stream());

    gulp.src("src/templates/**/*.pug")
        .pipe(plumber())
        .pipe(pug({ pretty: false }))
        .pipe(plumber.stop())
        .pipe(gulp.dest("dist/templates"))
        .pipe(stream())
};
convertPug();
gulp.task("convertPug", convertPug);


// 合并库文件
var lib = function() {
    // 样式
    gulp.src(["bower_components/bootstrap/dist/css/bootstrap.min.css"])
        // .pipe(concat("bootstrap.css"))
        .pipe(gulp.dest("dist/styles"));
    // 字体文件
    gulp.src(["bower_components/bootstrap/dist/fonts/*"])
        .pipe(gulp.dest("dist/fonts"))

    // 脚本
    gulp.src(["bower_components/angular/angular.min.js",
            "bower_components/angular-route/angular-route.min.js",
            // "bower_components/jquery/dist/jquery.min.js",
            // "bower_components/bootstrap/dist/js/bootstrap.min.js"
        ])
        .pipe(concat("lib.js"))
        .pipe(gulp.dest("dist/scripts"))
}

lib();
gulp.task("lib", lib);

// 脚本
var scripts = function() {
    gulp.src("src/scripts/**/*.js")
        .pipe(concat("app.js"))
        .pipe(plumber())
        .pipe(uglify())
        .pipe(plumber.stop())
        .pipe(gulp.dest("dist/scripts"))
        .pipe(stream())
}

scripts();
gulp.task("scripts", scripts);


var styles = function() {
    gulp.src("src/styles/**/*.css")
        .pipe(concat("main.css"))
        .pipe(cssMin())
        .pipe(gulp.dest("dist/styles"))
        .pipe(stream())
};
styles();
gulp.task("styles", styles);

// 压缩JSON文件
var json = function() {
    gulp.src("src/data/**/*.json")
        .pipe(plumber())
        .pipe(jsonMin())
        .pipe(plumber.stop())
        .pipe(gulp.dest("dist/data"))
        .on('error', util.log)
        .pipe(stream())
};
json();
gulp.task("json", json);


// 图片压缩
var images = function() {
    gulp.src("src/images/*")
        .pipe(imageMin())
        .pipe(gulp.dest("dist/images"))
}
images();
gulp.task("images", images);


gulp.task("default", function() {
    browserSync.init({
        server: "dist"
    });

    gulp.watch(["src/*.pug", "src/templates/**/*.pug"], ["convertPug", browserSync.reload]);
    // gulp.watch(["dist/*.html", "dist/templates/*.html"]).on("change", browserSync.reload);
    
    gulp.watch("src/styles/**/*.css", ["styles", browserSync.reload]);
    gulp.watch("src/scripts/**/*.js", ["scripts", browserSync.reload]);
    gulp.watch("src/images/**/*.*", ["images", browserSync.reload]);

    gulp.watch("src/data/**/*.json", ["json", browserSync.reload]);

})
