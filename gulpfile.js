const {series, watch, src, dest, parallel} = require('gulp');
const pump = require('pump');

// gulp plugins and utils
var livereload = require('gulp-livereload');
var postcss = require('gulp-postcss');
var zip = require('gulp-zip');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify-es').default;
var beeper = require('beeper');

// postcss plugins
var autoprefixer = require('autoprefixer');
var colorFunction = require('postcss-color-mod-function');
var cssnano = require('cssnano');
var easyimport = require('postcss-easy-import');

function serve(done) {
    livereload.listen();
    done();
}

const handleError = (done) => {
    return function (err) {
        if (err) {
            beeper();
        }
        return done(err);
    };
};

function hbs(done) {
    pump([
        src(['*.hbs', '**/**/*.hbs', '!node_modules/**/*.hbs']),
        livereload()
    ], handleError(done));
}

function css(done) {
    var processors = [
        easyimport,
        colorFunction(),
        autoprefixer(),
        cssnano()
    ];

    pump([
        src('assets/css/lib/slick/ajax-loader.gif'),
        dest('assets/built/'),
    ], handleError(done));
    pump([
        src('assets/css/screen.css', {sourcemaps: true}),
        postcss(processors),
        dest('assets/built/', {sourcemaps: '.'}),
        livereload()
    ], handleError(done));
}

function js(done) {
	pump([
		src([
			'assets/js/lib/jquery.min.js',
			'assets/js/lib/*.js',
			'assets/js/utils/*.js',
		], {sourcemaps: true}),
		concat('libs.js'),
		uglify(),
		dest('assets/built/', {sourcemaps: '.'}),
		livereload()
	], handleError(done));
	pump([
		src([
			'assets/js/lib/post/*.js',
		], {sourcemaps: true}),
		concat('postlibs.js'),
		uglify(),
		dest('assets/built/', {sourcemaps: '.'}),
		livereload()
	], handleError(done));
	pump([
		src([
			'assets/js/lib/page/*.js',
		], {sourcemaps: true}),
		concat('pagelibs.js'),
		uglify(),
		dest('assets/built/', {sourcemaps: '.'}),
		livereload()
	], handleError(done));
	pump([
		src([
			'assets/js/*.js'
		], {sourcemaps: true}),
		uglify(),
		dest('assets/built/', {sourcemaps: '.'}),
		livereload()
	], handleError(done));
}

function zipper(done) {
    var targetDir = 'dist/';
    var themeName = require('./package.json').name;
    var filename = themeName + '.zip';

    pump([
        src([
            '**',
            '!node_modules', '!node_modules/**',
            '!dist', '!dist/**'
        ]),
        zip(filename),
        dest(targetDir)
    ], handleError(done));
}

const cssWatcher = () => watch('assets/css/**', css);
const hbsWatcher = () => watch(['*.hbs', '**/**/*.hbs', '!node_modules/**/*.hbs'], hbs);
const jsWatcher = () => watch(['assets/js/utils/*.js', 'assets/js/lib/*.js', 'assets/js/lib/post/*.js', 'assets/js/lib/page/*.js', 'assets/js/*.js'], js);
const watcher = parallel(cssWatcher, hbsWatcher, jsWatcher);
const build = series(css, js);
const dev = series(build, serve, watcher);

exports.build = build;
exports.zip = series(build, zipper);
exports.default = dev;
