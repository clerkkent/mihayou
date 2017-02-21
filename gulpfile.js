//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'); //本地安装gulp所用到的地方
var sass = require('gulp-sass');
var uglify = require("gulp-uglify");
var connect = require("gulp-connect");
var mincss = require("gulp-minify-css");
var minimg = require("gulp-imagemin");
var concat = require("gulp-concat");
//定义一个testLess任务（自定义任务名称）
gulp.task("concat", function() {
    gulp.src("src/js/module/**/*.js")
        .pipe(concat("common.js"))
        //.pipe(uglify())
        .pipe(gulp.dest('dis/js'))
        .pipe(connect.reload())
})

gulp.task('testSass', function() {
    gulp.src('src/sass/*.scss') //该任务针对的文件
        .pipe(sass()) //该任务调用的模块
        .pipe(mincss())
        .pipe(gulp.dest('src/css'))
        .pipe(connect.reload())
        //将会在src/css下生成index.css
});
gulp.task("minimages", function() {
    gulp.src("src/images/**/*")
        //.pipe(minimg())
        .pipe(gulp.dest("dis/images"))
        .pipe(connect.reload())
})
gulp.task("copy-index", function() {
    return gulp.src("src/**/*.html")
        .pipe(gulp.dest("dis"))
        .pipe(connect.reload())
})
gulp.task("copy-json", function() {
    return gulp.src("src/json/*")
        .pipe(gulp.dest("dis/json"))
        .pipe(connect.reload())
})
gulp.task("copy-js", function() {
        gulp.src("src/js/frame/**/*.js")
            .pipe(uglify())
            .pipe(gulp.dest("dis/js"))
            .pipe(connect.reload())
    })
    //编译css
gulp.task("copy-css", function() {
    gulp.src("src/css/*.css")
        .pipe(concat("common.css"))
        .pipe(gulp.dest("dis/css"))
        .pipe(connect.reload())
})
gulp.task("server", function() {
    connect.server({
        root: "dis",
        port: 8888,
        livereload: true
    })
})
gulp.task("watch", function() {
    gulp.watch("src/sass/*.scss", ["testSass"]);
    gulp.watch("src/css/*.css", ["copy-css"]);
    gulp.watch("src/js/**/*.js", ["concat", "copy-js"]);
    gulp.watch("src/**/*.html", ["copy-index"]);
    gulp.watch("src/json/*", ["copy-json"]);
    gulp.watch("src/images/**/*", ["minimages"]);
    //gulp.watch("dis/*",["server"]);
})
gulp.task('default', ['testSass', /*'elseTask',*/ "concat", 'copy-css', 'copy-js', 'copy-index', 'copy-json', 'minimages', "server", "watch"]); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径

//test git nonono