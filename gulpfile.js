var gulp = require('gulp');
var ts = require('gulp-typescript');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge2');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var replace = require('gulp-replace');
var runSequence = require('gulp-run-sequence');
var clean = require('gulp-clean');
var del = require('del');
var minifyCss = require('gulp-minify-css');
var KarmaServer = require('karma').Server;
var remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');
var exec = require('child_process').exec;
var gp = require('gulp-protractor');
var protractor = gp.protractor;
var join = require('path').join;
var concat = require('gulp-concat');

var tsProject = ts.createProject('./src/tsconfig.json');

function startBrowserSync() {
  browserSync.init({
    server: './public',
    notify: false,
    ghostMode: {
      clicks: true,
      forms: true,
      scroll: true
    }
  });
}

gulp.task('copy-external-modules', function () {
  del.sync(['public/**']);
  return gulp.src([
    'node_modules/angular2/bundles/angular2-polyfills.min.js',
    'node_modules/es6-shim/es6-shim.min.js',
    'node_modules/systemjs/dist/system.js',
    'node_modules/rxjs/bundles/Rx.min.js',
    'node_modules/angular2/bundles/angular2.min.js',
    'node_modules/angular2/bundles/router.js',
    'node_modules/angular2/bundles/http.min.js',
    'node_modules/systemjs/dist/system-polyfills.js',
    'src/system.conf.js',
    'src/system.import.js',
  ])
    .pipe(gulp.dest('public/lib'))
});

gulp.task('compile-ts', function () {
  var tsResult = gulp.src(['./src/**/*.ts', './src/**/*.spec.ts'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));

  return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
    tsResult.dts.pipe(gulp.dest('public')),
    tsResult.js
      .pipe(sourcemaps.write('./', {
            sourceRoot: __dirname + '/src'
        }))
      .pipe(gulp.dest('public'))
  ]);
});

gulp.task('templates', function () {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./public'))
})

gulp.task('sass', function () {
  return gulp.src('./src/sass/main.scss')
    .pipe(sourcemaps.init()) // avoid in production
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write()) // avoid in production
  // minify
    .pipe(gulp.dest('./public/css'))
    .pipe(
      browserSync.reload({
        stream: true
      }));
});

gulp.task('assets', function () {
  return gulp.src('./src/assets/**/*')
    .pipe(gulp.dest('./public/assets'))
})

gulp.task('index', function () {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./public'))
    .pipe(
      browserSync.reload({
        stream: true
      }));
});

gulp.task('build', ['copy-external-modules', 'compile-ts', 'templates', 'sass', 'assets', 'index']);

gulp.task('watch', ['build'], function () {
  startBrowserSync();
  gulp.watch('./src/index.html', ['index']);
  gulp.watch('./src/app/**/*.html', ['templates']).on('change', browserSync.reload);
  gulp.watch('./src/**/*.ts', ['compile-ts']).on('change', browserSync.reload);
  gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('test:unit', function (done) {
	new KarmaServer({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, function() {
    exec('node_modules/.bin/remap-istanbul -i coverage/coverage-final.json -o coverage -t html');
  }).start();
});

gulp.task('test:e2e', function() {
  // exec('node_modules/.bin/webdriver-manager update --standalone');
  // exec('node_modules/.bin/webdriver-manager start');
  startBrowserSync();
  var args = ['--baseUrl', 'http://127.0.0.1:3000'];
  return gulp.src(["./src/**/*.e2e.ts"])
    .pipe(protractor({
      configFile: "protractor.conf.js",
      action: 'run',
      args: args
    })
    ).on('end', function(c) {
      process.exit();
    });
});

gulp.task('test', ['build', 'test:unit', 'test:e2e']);



const PROD_NPM_DEPENDENCIES = [
  { src: 'systemjs/dist/system-polyfills.src.js', inject: 'shims' },
  { src: 'reflect-metadata/Reflect.js', inject: 'shims' },
  { src: 'es6-shim/es6-shim.min.js', inject: 'shims' },
  { src: 'systemjs/dist/system.js', inject: 'shims' },
  { src: 'angular2/bundles/angular2-polyfills.min.js', inject: 'libs' }
];


gulp.task('compile', function() {
  // var tsResult = gulp.src(['./src/**/*.ts', './src/**/*.spec.ts'])
  //   .pipe(plumber())
  //   .pipe(sourcemaps.init())
  //   .pipe(ts(tsProject));

  // return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
  //   tsResult.dts.pipe(gulp.dest('public')),
  //   tsResult.js
  //     .pipe(sourcemaps.write('./', {
  //           sourceRoot: __dirname + '/src'
  //       }))
  //     .pipe(gulp.dest('public'))
  // ]);
  
    var src = [
      'typings/browser.d.ts',
      join('src/**/*.ts'),
      '!' + join('src/**/*.spec.ts'),
      '!' + join('src/**/*.e2e.ts')
    ];
    
    var result = gulp.src(src)
      .pipe(plumber())
      // .pipe(inlineNg2Template(INLINE_OPTIONS))
      .pipe(ts(tsProject));

    return result.js
      // .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest('compile'));
});
