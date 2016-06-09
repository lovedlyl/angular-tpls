var gulp = require("gulp");
var pug = require("gulp-pug");
var plumber = require("gulp-plumber");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
var stream = browserSync.stream;
var concat = require("gulp-concat");
var imgMin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var jsonMin = require("gulp-json-minify");
var util = require("gulp-util");
var sass = require("gulp-ruby-sass");
var cssMin = require("gulp-clean-css");
var rename = require("gulp-rename");
// 保证顺序加载文件，.module.js文件先加载
var order = require("gulp-order");
// 自动添加CSS前缀
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');

// 使用库文件
var lib = function() {
    // js库
    gulp.src(["bower_components/angular/angular.min.js",
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-resource/angular-resource.js'
        ])
        .pipe(concat("lib.js"))
        .pipe(gulp.dest("dist/js"));
    // css库
    gulp.src(["bower_components/bootstrap/dist/css/bootstrap.min.css"])
        .pipe(concat("lib.css"))
        .pipe(gulp.dest("dist/css"));
};

// pug 文件转译,引入文件使用"_"开头，不编译
var html = function() {
    gulp.src(["app/**/*.pug"])
        .pipe(plumber())
        .pipe(pug({ pretty: false }))
        .pipe(gulp.dest("dist"))
        .pipe(plumber.stop())
        .pipe(stream());
    // console.log("convent html\n");
    // // 模板文件,默认都放在dist/templates目录下
    // gulp.src(["app/**/*.template.pug", "!app/*.pug"])
    //     .pipe(plumber())
    //     .pipe(pug({ pretty: false }))
    //     // .pipe(rename({dirname: ""}))
    //     .pipe(gulp.dest("dist"))
    //     .pipe(plumber.stop())
    //     .pipe(stream())
};



// 合并压缩js文件
var js = function() {
    // 过滤测试文件
    gulp.src(["app/**/*.js", "!app/**/*.e2e.js", "!app/**/*.spec.js"])
        .pipe(plumber())
        // .pipe(rename({ dirname: "" }))
        .pipe(order(["**/*.module.js",
            "*core/**/*.js",
            "*.config.js",
            "**/**/.service.js"
        ]))
        .pipe(concat("index.js"))
        // .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
        .pipe(plumber.stop())
        .pipe(stream())
        // 测试文件
    gulp.src(["app/**/*.e2e.js"])
        .pipe(gulp.dest("test/e2e"))
    gulp.src(["app/**/*.spec.js"])
        .pipe(gulp.dest("test/unit"))
};


// json文件
var json = function() {
    gulp.src("app/**/*.json")
        .pipe(jsonMin())
        .pipe(gulp.dest("dist"))
        // .pipe(stream());
};

// sass 文件转译
var css = function() {
    return sass("app/**/*.sass")
        .pipe(concat("main.css"))
        .pipe(cssMin())
        // 添加前缀
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer({ browsers: ['last 2 versions'] })]))
        .pipe(sourcemaps.write('.'))
        // ....
        .pipe(gulp.dest('dist/css'))
        .pipe(stream())
};

var img = function() {
    gulp.src("app/**/*.jpg")
        .pipe(imgMin())
        .pipe(gulp.dest("dist"))
};
var tasks = { lib: lib, html: html, js: js, json: json, css: css, img: img };
for (var key in tasks) {
    var task = tasks[key];
    task();
    console.log(key);
    gulp.task(key, task);
}


gulp.task("default", function() {
    browserSync.init({
        server: "dist"
    });
    gulp.watch(["app/**/*.pug"], ["html", browserSync.reload]);
    gulp.watch("app/**/*.sass", ["css", browserSync.reload]);
    gulp.watch(["app/**/*.js"], ["js", browserSync.reload]);
    gulp.watch(["app/**/*.json"], ["json", browserSync.reload]);
    gulp.watch("dist/**/*html").on("change", browserSync.reload);
});
