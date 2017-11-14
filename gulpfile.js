// gulpfile.js

// Define variables.
var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync').create();
var cleancss     = require('gulp-clean-css');
var concat       = require('gulp-concat');
var del          = require('del');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var imagemin     = require('gulp-imagemin');
var notify       = require('gulp-notify');
var postcss      = require('gulp-postcss');
var rename       = require('gulp-rename');
var run          = require('gulp-run');
var runSequence  = require('run-sequence');
var sass         = require('gulp-ruby-sass');
var babel        = require('gulp-babel');
var uglify       = require('gulp-uglify');
var ghPages      = require('gulp-gh-pages');

// Include paths file.
var paths = require('./_assets/gulp_config/paths');

// Uses Sass compiler to process styles, adds vendor prefixes, minifies, then
// outputs file to the appropriate location.
gulp.task('build:styles:main', function() {
    return sass(paths.sassFiles + '/style.scss', {
        style: 'compressed',
        trace: true,
        loadPath: [paths.sassFiles]
    }).pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(cleancss())
        .pipe(gulp.dest(paths.jekyllCssFiles))
        .pipe(gulp.dest(paths.siteCssFiles))
        .pipe(browserSync.stream())
        .on('error', gutil.log);
});

// Builds all styles.
gulp.task('build:styles', ['build:styles:main']);

// Deletes CSS.
gulp.task('clean:styles', function() {
    return del([paths.jekyllCssFiles + 'main.css',
        paths.siteCssFiles + 'main.css',
    ]);
});

// Concatenates and uglifies global JS files and outputs result to the
// appropriate location.
 gulp.task('build:scripts', function() {
     return gulp.src([
         paths.jsFiles + paths.jsPattern,
         paths.jsFiles + '/*.js'
     ])
        .pipe(concat('main.js'))
        .pipe(babel().on('error', function(e){
          console.log(e);
        }))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(uglify().on('error', function(e){
          console.log(e);
        }))
        .pipe(gulp.dest(paths.jekyllJsFiles))
        .pipe(gulp.dest(paths.siteJsFiles))
        .on('error', gutil.log);
});


gulp.task('clean:scripts', function() {
    return del([paths.jekyllJsFiles + 'main.js', paths.siteJsFiles + 'main.js']);
});

 // Optimizes and copies image files.
gulp.task('build:images', function() {
    return gulp.src(paths.imageFilesGlob)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.jekyllImageFiles))
        .pipe(gulp.dest(paths.siteImageFiles))
        .pipe(browserSync.stream());
});

// Deletes processed images.
gulp.task('clean:images', function() {
    return del([paths.jekyllImageFiles, paths.siteImageFiles], {force:true});
});


// Build


// Runs jekyll build command.
gulp.task('build:jekyll', function() {
    var shellCommand = 'bundle exec jekyll build --config _config.yml';

    return gulp.src('')
        .pipe(run(shellCommand))
        .on('error', gutil.log);
});

// Runs jekyll build command using test config.
gulp.task('build:jekyll:test', function() {
    // var shellCommand = 'bundle exec jekyll build --config _config.yml,_config.test.yml';
    var shellCommand = 'bundle exec jekyll build --config _config.yml';

    return gulp.src('')
        .pipe(run(shellCommand))
        .on('error', gutil.log);
});

// Runs jekyll build command using local config.
gulp.task('build:jekyll:local', function() {
    // var shellCommand = 'bundle exec jekyll build --config _config.yml,_config.test.yml,_config.dev.yml';
    var shellCommand = 'bundle exec jekyll build --config _config.yml';

    return gulp.src('')
        .pipe(run(shellCommand))
        .on('error', gutil.log);
});

// Runs jekyll build command using local config.
gulp.task('build:jekyll:production', function() {
    // var shellCommand = 'bundle exec jekyll build --config _config.yml,_config.test.yml,_config.dev.yml';
    var shellCommand = 'bundle exec jekyll build --config _config.production.yml';

    return gulp.src('')
        .pipe(run(shellCommand))
        .on('error', gutil.log);
});

// Deletes the entire _site directory.
gulp.task('clean:jekyll', function() {
    return(del(['_site']));
});

// Main clean task.
// Deletes _site directory and processed assets.
gulp.task('clean', ['clean:jekyll',
    'clean:images',
    'clean:scripts',
    'clean:styles']);

// Builds site anew.
gulp.task('build', function(callback) {
    runSequence('clean',
        ['build:scripts', 'build:images', 'build:styles'],
        'build:jekyll',
        callback);
});

// Builds site anew using test config.
gulp.task('build:test', function(callback) {
    runSequence('clean',
        ['build:scripts', 'build:images', 'build:styles'],
        'build:jekyll:test',
        callback);
});

// Builds site anew using local config.
gulp.task('build:local', function(callback) {
    runSequence('clean', 'clean:images',
        ['build:scripts', 'build:images', 'build:styles'],
        'build:jekyll:local',
        callback);
});

gulp.task('build:production', function(callback) {
    runSequence('clean', 'clean:images',
        ['build:scripts', 'build:images', 'build:styles'],
        'build:jekyll:production',
        callback);
});

// Default Task: builds site.
gulp.task('default', ['build']);

// Deploy

gulp.task('deploy', ['build:production'], function() {
  return gulp.src(['./_site/**/*', './README.md'])
    .pipe(ghPages({ branch: "master" }));
});


// Watch


// Special tasks for building and then reloading BrowserSync.
gulp.task('build:jekyll:watch', ['build:jekyll:local'], function(callback) {
    browserSync.reload();
    callback();
});

gulp.task('build:scripts:watch', ['build:scripts'], function(callback) {
    browserSync.reload();
    callback();
});

// Static Server + watching files.
// Note: passing anything besides hard-coded literal paths with globs doesn't
// seem to work with gulp.watch().
gulp.task('serve', ['build:local'], function() {

    browserSync.init({
        server: paths.siteDir,
        ghostMode: false, // Toggle to mirror clicks, reloads etc. (performance)
        logFileChanges: true,
        logLevel: 'debug',
        open: true        // Toggle to automatically open page when starting.
    });

    // Watch site settings.
    gulp.watch(['_config.yml'], ['build:jekyll:watch']);

    // Watch .scss files; changes are piped to browserSync.
    gulp.watch('_assets/styles/**/*.scss', ['build:styles']);

    // Watch .js files.
    gulp.watch('_assets/js/**/*.js', ['build:scripts:watch']);

    // Watch image files; changes are piped to browserSync.
    gulp.watch('_assets/img/**/*', ['build:images']);

    // Watch posts.
    gulp.watch('_posts/**/*.+(md|markdown|MD)', ['build:jekyll:watch']);

    // Watch drafts if --drafts flag was passed.
    if (module.exports.drafts) {
        gulp.watch('_drafts/*.+(md|markdown|MD)', ['build:jekyll:watch']);
    }

    // Watch html and markdown files.
    gulp.watch(['**/*.+(html|md|markdown|MD)', '!_site/**/*.*'], ['build:jekyll:watch']);

    // Watch RSS feed XML file.
    gulp.watch('feed.xml', ['build:jekyll:watch']);

    // Watch data files.
    gulp.watch('_data/**.*+(yml|yaml|csv|json)', ['build:jekyll:watch']);

    // Watch favicon.png.
    gulp.watch('favicon.png', ['build:jekyll:watch']);
});
