const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const watchify = require('watchify');
const uglify = require('gulp-uglify');
const tsify = require('tsify');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');

const paths = {
  pages: ['src/*.html'],
};

const watchedBrowserify = watchify(
  browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {},
  }).plugin(tsify)
);

gulp.task('copy-html', () => gulp.src(paths.pages).pipe(gulp.dest('dist')));

function babelifyAndBundle() {
  return watchedBrowserify
    .transform('babelify', {
      presets: ['es2015'],
      extensions: ['.ts'],
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
}

gulp.task('default', gulp.series('copy-html', babelifyAndBundle));

watchedBrowserify.on('update', babelifyAndBundle);
watchedBrowserify.on('log', gutil.log);
