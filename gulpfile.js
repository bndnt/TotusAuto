// ========================= Setings folders =================================

const project_folder = 'dist'; //require("path").basename(__dirname)
const source_folder = 'src';

// ===========================================================================
// =========================== Setings Path ==================================

const path = {
  build: {
    html: project_folder + '/',
    php: project_folder + '/php/',
    css: project_folder + '/css/',
    js: project_folder + '/js/',
    img: project_folder + '/img/',
    fonts: project_folder + '/fonts/',
  },
  src: {
    html: source_folder + '/html/*.html',
    php: source_folder + '/php/**/*.php',
    css: source_folder + '/scss/style.scss',
    js: source_folder + '/js/**/*.js',
    img: [
      source_folder + '/img/**/*.+(png|jpg|gif|ico|webp|svg)',
      '!' + source_folder + '/img/sprite.svg',
    ],
    fonts: source_folder + '/fonts/*.+(otf|ttf|woff|woff2)',
    svg: source_folder + '/img/svg/*.svg',
  },
  watch: {
    html: source_folder + '/**/*.html',
    php: source_folder + '/php/**/*.php',
    css: source_folder + '/scss/**/*.scss',
    js: source_folder + '/js/**/*.js',
    img: source_folder + '/img/**/*.+(png|jpg|gif|ico|webp|svg)',
    svg: source_folder + '/img/svg/*.svg',
  },
  clean: './' + project_folder + '/',
};

// ===========================================================================
// =========================== Gulp plugins ==================================

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const fileInclude = require('gulp-file-include');
const prettyHtml = require('gulp-pretty-html');
const scss = require('gulp-sass');
const autoPrefixer = require('gulp-autoprefixer');
const groupMedia = require('gulp-group-css-media-queries');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const cheerio = require('gulp-cheerio');
const svgSprite = require('gulp-svg-sprite');
const babel = require('gulp-babel');
const ghPages = require('gulp-gh-pages');
const realFavicon = require('gulp-real-favicon');
const del = require('del');
const fs = require('fs');
// const webp = require('gulp-webp');
// const webphtml = require('gulp-webp-html');
// const webpcss = require('gulp-webpcss');

// ===========================================================================
// ============================= All Setings =================================

gulp.task('html', function () {
  // setting html
  return (
    gulp
      .src(path.src.html)
      .pipe(
        fileInclude({
          prefix: '@',
          basepath: '@file',
        }),
      )
      // .pipe(webphtml())
      .pipe(
        prettyHtml({
          indent_size: 3,
        }),
      )
      .pipe(gulp.dest(path.build.html))
      .pipe(browserSync.stream())
  );
});

gulp.task('php', function () {
  // setting html
  return gulp.src(path.src.php).pipe(gulp.dest(path.build.php)).pipe(browserSync.stream());
});

gulp.task('css', function () {
  // setting css
  return (
    gulp
      .src(path.src.css)
      .pipe(
        scss({
          outputStyle: 'expanded', //compressed
        }),
      )
      .pipe(groupMedia())
      .pipe(
        autoPrefixer({
          //overrideBrowserslist: ["defaults"],
          cascade: true,
        }),
      )
      // .pipe(webpcss())
      .pipe(cleanCss())
      .pipe(
        rename({
          extname: '.min.css',
        }),
      )
      .pipe(gulp.dest(path.build.css))
      .pipe(browserSync.stream())
  );
});

gulp.task('js', function () {
  // setting js
  return gulp
    .src(path.src.js)
    .pipe(
      fileInclude({
        prefix: '@',
        basepath: '@file',
      }),
    )
    .pipe(concat('main.js'))
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      }),
    )
    .pipe(uglify())
    .pipe(
      rename({
        extname: '.min.js',
      }),
    )
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.stream());
});

gulp.task('img', function () {
  // setting image
  return (
    gulp
      .src(path.src.img)
      // .pipe(
      //   webp({
      //     quality: 70,
      //   }),
      // )
      .pipe(gulp.dest(path.build.img))
      .pipe(gulp.src(path.src.img))
      .pipe(
        imagemin({
          progressive: true,
          svgoPlugins: [{ removeViewBox: true }],
          interlaced: true,
          optimizationLevel: 4, // 0 to 7
        }),
      )
      .pipe(gulp.dest(path.build.img))
      .pipe(browserSync.stream())
  );
});

gulp.task('fonts', async function () {
  // setting fonts
  return gulp.src(path.src.fonts).pipe(gulp.dest(path.build.fonts));
});

gulp.task('svg', function () {
  // "gulp svg"
  return gulp
    .src(path.src.svg)
    .pipe(
      cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
          $('[viewBox]').removeAttr('viewBox');
          $('[opacity]').removeAttr('opacity');
        },
      }),
    )
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: '../sprite.svg',
            example: true,
          },
        },
      }),
    )
    .pipe(gulp.dest(path.build.img));
});

gulp.task('browser-sync', function () {
  // setting browser
  browserSync.init({
    server: {
      baseDir: './' + project_folder + '/',
    },
    port: 3000,
    notify: false,
  });
});

gulp.task('clean', function () {
  // setting clean
  return del(path.clean);
});

var FAVICON_DATA_FILE = 'favicon.json';

gulp.task('create-favicon', function (done) {
  // setting create favicons
  realFavicon.generateFavicon(
    {
      masterPicture: source_folder + '/img/favicon.png',
      dest: project_folder + '/img/icons/',
      iconsPath: 'img/icons/',
      design: {
        ios: {
          pictureAspect: 'backgroundAndMargin',
          backgroundColor: '#ffffff',
          margin: '14%',
          assets: {
            ios6AndPriorIcons: false,
            ios7AndLaterIcons: false,
            precomposedIcons: false,
            declareOnlyDefaultIcon: true,
          },
        },
        desktopBrowser: {
          design: 'raw',
        },
        windows: {
          pictureAspect: 'whiteSilhouette',
          backgroundColor: '#2f675c',
          onConflict: 'override',
          assets: {
            windows80Ie10Tile: false,
            windows10Ie11EdgeTiles: {
              small: false,
              medium: true,
              big: false,
              rectangle: false,
            },
          },
        },
        androidChrome: {
          pictureAspect: 'noChange',
          themeColor: '#ffffff',
          manifest: {
            display: 'standalone',
            orientation: 'notSet',
            onConflict: 'override',
            declared: true,
          },
          assets: {
            legacyIcon: false,
            lowResolutionIcons: false,
          },
        },
      },
      settings: {
        scalingAlgorithm: 'Mitchell',
        errorOnImageTooSmall: false,
        readmeFile: false,
        htmlCodeFile: false,
        usePathAsIs: false,
      },
      markupFile: FAVICON_DATA_FILE,
    },
    function () {
      done();
    },
  );
});

gulp.task('inject-favicon', function () {
  // setting favicon inject
  return gulp
    .src(project_folder + '/**/*.html')
    .pipe(
      realFavicon.injectFaviconMarkups(
        JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code,
      ),
    )
    .pipe(gulp.dest(project_folder));
});

gulp.task('watch', function () {
  // setting watch
  gulp.watch([path.watch.html], gulp.parallel('html'));
  gulp.watch([path.watch.css], gulp.parallel('css'));
  gulp.watch([path.watch.js], gulp.parallel('js'));
  gulp.watch([path.watch.img], gulp.parallel('img'));
  gulp.watch([path.watch.svg], gulp.parallel('svg'));
});

// ===========================================================================
// ========================== "gulp build" ===================================

gulp.task(
  'build',
  gulp.series('clean', gulp.parallel('html', 'php', 'js', 'img', 'css', 'fonts', 'svg')),
);
gulp.task('favicon', gulp.series('create-favicon', 'inject-favicon'));

// ===========================================================================
// =============== default function, after command "gulp" ====================

gulp.task('default', gulp.parallel('build', 'watch', 'browser-sync'));

// ===========================================================================
