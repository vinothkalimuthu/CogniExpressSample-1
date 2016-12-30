var gulp = require('gulp');
var nodemon = require('gulp-nodemon');


gulp.task('inject', function() {

    var wiredep = require('wiredep').stream;
    var options = {
        bowerJson: require('./bower.json'),
        directory: 'public/lib',
        ignorePath: '../../public/'
    }

    var gulpInject = require('gulp-inject');
    var sources = gulp.src(['./public/css/*.css', './public/js/*.js'], { read: false });
    var optionInject = {
        ignorePath: '/public/'
    }

    gulp.src('./src/views/*.html')
        .pipe(wiredep(options))
        .pipe(gulpInject(sources, optionInject))
        .pipe(gulp.dest('./src/views'));

});

var browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', function() {

    browserSync.init({
        server: "./src/views"
    });
    gulp.watch("./src/views/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['inject', 'serve'], function() {
    nodemon({
            script: 'app.js',
            ext: 'js',
            env: {
                port: 8095
            },
            ignore: ['./node_modules/**', './bower_components/**']
        })
        .on('restart', function() {
            console.log('Restarted server')
        })
});