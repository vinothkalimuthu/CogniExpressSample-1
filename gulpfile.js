var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', function() {
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