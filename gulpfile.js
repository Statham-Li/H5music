var gulp = require("gulp");
var imagemin = require("gulp-imagemin")
var htmlclean = require("gulp-htmlclean");
var uglify = require("gulp-uglify");
var stripDebug = require("gulp-strip-debug");
var concat = require("gulp-concat");
var deporder = require("gulp-deporder");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var connect = require("gulp-connect");
var folder = {
	src:"src/",/*代码文件夹*/
	dist:"dist/"/*目标文件夹*/
}

var devMode = process.env.NODE_ENV !== "production";


gulp.task("html",function(){
	var page = gulp.src(folder.src+"html/index.html")
				.pipe(connect.reload());
				if(!devMode){
					page.pipe(htmlclean());
				}
				/*判断当环境为生产环境时压缩代码，若为开发状态则不压缩
					production生产，dev开发
				*/
				page.pipe(gulp.dest(folder.dist+"html/"))/*流操作：变成文件流（2进制形式）优点，多次操作一个文件时不会一步生成一次文件，而是操作执行完一次生成*/
})

gulp.task("images",function(){
	gulp.src(folder.src+"images/*")
		.pipe(imagemin())
		.pipe(gulp.dest(folder.dist+"images/"))
})

gulp.task("JS",function(){
	var js = gulp.src(folder.src+"JS/*")
		
		js.pipe(connect.reload());
		if(!devMode){
			js.pipe(uglify())
			.pipe(stripDebug())
		}
		
		js.pipe(gulp.dest(folder.dist+"JS/"))
})

gulp.task("css",function(){
	var css = gulp.src(folder.src+"css/*")
	css.pipe(connect.reload()).pipe(less());
	var options = [autoprefixer()];
	if(!devMode){
		options.push(cssnano())
	}
	css.pipe(postcss(options))
	.pipe(gulp.dest(folder.dist + "css/"))
})

gulp.task("watch",function(){
	gulp.watch(folder.src+"html/*",["html"]);
	gulp.watch(folder.src+"images/*",["images"]);
	gulp.watch(folder.src+"JS/*",["JS"]);
	gulp.watch(folder.src+"css/*",["css"]);
})
/*内网穿透*/
/*开启服务器*/
gulp.task("server",function(){
	connect.server({
		port:"8080",
		livereload:true/*自动刷新*/
	});
})
gulp.task("default",["html","images","JS","css","watch","server"],function(){
	console.log(111);/*默认任务*/
});


/*postcss:前缀，压缩*/
/*
	gulp.src读取文件
	gulp.dest生成文件流
*/