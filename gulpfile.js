'use strict'


const gulp = require('gulp'),

      less =  require('gulp-less'),

      cssmin =  require('gulp-cssmin'),

      rev =  require('gulp-rev'),

      rename =  require('gulp-rename'),

      imagemin =  require('gulp-imagemin'),

      uglify =  require('gulp-uglify'),

      gulpIf =  require('gulp-if'),

      useref =  require('gulp-useref'),

      collector =  require('gulp-rev-collector');



//less文件转css 压缩css 添加后缀 改名
gulp.task('less',()=>{
    gulp.src('./public/less/*.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(rev())
        .pipe(gulp.dest('./replace/public/css'))
        .pipe(rev.manifest())
        .pipe(rename('css-manifest.json'))
        .pipe(gulp.dest('./replace/dev/'));
});

//图片压缩添加后缀

gulp.task('imagemin',()=>{
    gulp.src(['./public/images/**/*','./uploads/*'],{base:'./'})
        .pipe(imagemin())
        .pipe(rev())
        .pipe(gulp.dest('./replace/'))
        .pipe(rev.manifest())
        .pipe(rename('image-manifest.json'))
        .pipe(gulp.dest('./replace/dev/'));
});

//js压缩合并添加后缀

gulp.task('uglify',()=>{
   gulp.src('./index.html')
       .pipe(useref())
       .pipe(gulpIf('*.js',uglify()))
       .pipe(gulpIf('*.js',rev()))
       .pipe(gulp.dest('./replace/'))
       .pipe(rev.manifest())
       .pipe(rename('js-manifest.json'))
       .pipe(gulp.dest('./replace/dev'));
});


//其他处理
gulp.task('other',()=>{
    gulp.src(['./api/*','./script/*','./favicon.ico'],{base:'./'})
        .pipe(gulp.dest('./replace/'))
});


//替换

gulp.task('dev',()=>{
    gulp.src(['./replace/dev/*.json','./replace/index.html'])
        .pipe(collector())
        .pipe(gulp.dest('./replace/'))
});