var gulp = require('gulp');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var jade = require('gulp-jade');

var stylus = require('gulp-stylus');
var nib = require('nib');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');

// Paths
var paths = {
  jadeEntry: './source/template/index.jade',
  jadePages: './source/templates/*.jade',
  jadeComponents: './source/templates/**/*.jade',
  stylusEntry: './source/stylus/style.styl',
  stylusComponents: './source/stylus/**/*.styl',
  jsEntry: './source/scripts/app.js',
  jsFiles: './source/scripts/**/*.js',
  imagesSource: 'source/images/**',
  fontsSource: 'source/fonts/**',
  iconsSource: 'source/icons/**',
  dataSource: 'source/data/**',
  data: 'site/data',
  fonts: 'site/fonts',
  icons: 'site/icons',
  images: 'site/images',
  css: './site/css',
  js: './site/js',
  html: './site'
};

// Jade Compile
gulp.task('jade2html', function() {
  gulp.src([paths.jadeEntry, paths.jadePages])
  .pipe(jade({
    pretty: false
  }))
  .pipe(reload({stream: true}))
  .pipe(gulp.dest(paths.html));
});

// Stylus Compile
gulp.task('stylus2css', function () {
  gulp.src([paths.stylusEntry])
  .pipe(stylus({
    use: [nib()],
    import: ['nib'],
    compress:true,
    'include css': true,
  }))
  .pipe(reload({stream: true}))
  .pipe(gulp.dest(paths.css));
});

// Javascripts Concat + Compress
gulp.task('scripts', function() {
  return gulp.src([paths.jsEntry, paths.jsFiles])
  .pipe(concat('app.js'))
  .pipe(uglify())
  .pipe(reload({stream: true}))
  .pipe(gulp.dest(paths.js));
});

// Minify Images
gulp.task('minimages', function(){
  gulp.src(paths.imagesSource)
  .pipe(newer(paths.images))
  .pipe(imagemin())
  .pipe(gulp.dest(paths.images));
});

// Move Font & Icon Folder
gulp.task('movefolders', [], function() {
  gulp.src(paths.fontsSource).pipe(gulp.dest(paths.fonts));
  gulp.src(paths.iconsSource).pipe(gulp.dest(paths.icons));
  gulp.src(paths.dataSource).pipe(gulp.dest(paths.data));
});

// Broser Sync
gulp.task('browser-sync', [], function() {
  browserSync({
    server: {
      baseDir: './site'
    },
    open: false
  });
});

// Watch Files
gulp.task('serve', ['jade2html', 'stylus2css', 'scripts', 'minimages', 'movefolders', 'browser-sync'],function() {
  gulp.watch([paths.jadeEntry,paths.jadePages, paths.jadeComponents], ['jade2html'], reload);
  gulp.watch([paths.stylusEntry,paths.stylusComponents], ['stylus2css'], reload);
  gulp.watch([paths.jsEntry,paths.jsFiles], ['scripts'], reload);
  gulp.watch(paths.imagesSource, ['minimages']);
  gulp.watch([paths.fontsSource, paths.iconsSource, paths.dataSource], ['movefolders']);
});
