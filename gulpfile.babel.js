import gulp from 'gulp';
import del from 'del';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import minimist from 'minimist';

const $ = require('gulp-load-plugins')();

/*****************************************************
 * 變數 block
 *****************************************************/
var envOptions = {
  string: 'env',
  default: { env: 'develop' },
};
var options = minimist(process.argv.slice(2), envOptions); // process.argv = [node, gulp.js, arg1, arg2, ...]
var envIsPro = options.env === 'production' || options.env == 'pro';

export function envNow(cb) {
  console.log(`env now is: ${options.env}, so envIsPro is ${envIsPro}`);
  console.log(options);
  cb();
}

/*****************************************************
 * 複製檔案 block
 *****************************************************/
// export function copyHTML() {
//   return gulp.src('./src/**/*.html').pipe(gulp.dest('./dist'));
// }

export function copyBsVar() {
  return gulp
    .src('./node_modules/bootstrap/scss/_variables.scss')
    .pipe(gulp.dest('./src/style/helper/'));
}

export function copy() {
  return gulp
    .src([
      './src/**/**',
      '!src/js/**/**',
      '!src/style/**/**',
      '!src/**/*.ejs',
      '!src/**/*.html',
    ])
    .pipe(gulp.dest('./dist'));
}

/*****************************************************
 * 清除暫存 block
 *****************************************************/
export function clean() {
  return del(['./dist', './.tmp']);
}

/*****************************************************
 * HTML 處理 block
 *****************************************************/
export function ejs() {
  return gulp
    .src('./src/**/*.html')
    .pipe($.plumber())
    .pipe($.frontMatter())
    .pipe(
      $.layout((file) => {
        return file.frontMatter;
      })
    )
    .pipe(gulp.dest('./dist'))
    .pipe($.if(!envIsPro, browserSync.stream()));
}

/*****************************************************
 * CSS 處理 block
 *****************************************************/
export function sass() {
  // PostCSS AutoPrefixer
  // const processors = [
  //   autoprefixer({
  //     browsers: ["last 5 version"]
  //   })
  // ];
  const processors = [autoprefixer()];

  return gulp
    .src(['./src/style/**/*.sass', './src/style/**/*.scss'])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe(
      $.sass({
        outputStyle: 'nested',
        includePaths: ['./node_modules/bootstrap/scss'],
      }).on('error', $.sass.logError)
    )
    .pipe($.postcss(processors))
    .pipe($.if(envIsPro, $.cleanCss()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/style'))
    .pipe($.if(!envIsPro, browserSync.stream()));
}

/*****************************************************
 *  JS 處理 block
 *****************************************************/
export function vendorJS() {
  return gulp
    .src('./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
    .pipe($.concat('vendor.js'))
    .pipe(gulp.dest('./dist/js'));
}

export function babel() {
  return gulp
    .src('./src/js/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe(
      $.babel({
        presets: ['@babel/env'],
      })
    )
    .pipe($.concat('all.js'))
    .pipe(
      $.if(
        envIsPro,
        $.uglify({
          compress: {
            drop_console: true,
          },
        })
      )
    )
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'))
    .pipe($.if(!envIsPro, browserSync.stream()));
}

/*****************************************************
 *  圖片處理 block
 *****************************************************/
export function imageMin() {
  return gulp
    .src('./src/assets/*')
    .pipe($.if(envIsPro, $.imagemin()))
    .pipe(gulp.dest('./dist/assets'))
    .pipe($.if(!envIsPro, browserSync.stream()));
}

/*****************************************************
 *  實時預覽 block
 *****************************************************/
export function browser() {
  browserSync.init({
    server: {
      baseDir: './dist',
      reloadDebounce: 2000,
    },
  });
}

export function watch() {
  gulp.watch(['./src/**/*.html', './src/**/*.ejs'], ejs);
  // gulp.watch(['./src/**/*.jade', './src/**/*.pug'], ['jade'])
  gulp.watch(['./src/style/**/*.sass', './src/style/**/*.scss'], sass);
  gulp.watch('./src/js/**/*.js', babel);
  console.log('watching file ~');
}

/*****************************************************
 *  指令 block
 *****************************************************/
exports.default = gulp.parallel(
  imageMin,
  babel,
  vendorJS,
  sass,
  ejs,
  browser,
  watch
);

// exports.default = gulp.series(
//   gulp.series(clean, copy),
//   gulp.parallel(vendorJS, babel, sass, ejs, imageMin, browser, watch)
// );

exports.build = gulp.series(
  gulp.series(clean, copy),
  gulp.parallel(vendorJS, babel, sass, ejs, imageMin)
);

// = gulp build --env production
exports.buildPro = gulp.series(
  (cb) => {
    envIsPro = true;
    cb();
  },
  gulp.series(clean, copy),
  gulp.parallel(vendorJS, babel, sass, ejs, imageMin)
);

function deploy() {
  return gulp.src('./dist/**/*').pipe($.ghPages());
}
exports.deploy = deploy;
