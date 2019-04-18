// GULP PACKAGES
// Most packages are lazy loaded
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    browserSync = require('browser-sync').create(),
    filter = require('gulp-filter'),
	touch = require('gulp-touch-cmd'),
	rename = require('gulp-rename'),
    plugin = require('gulp-load-plugins')();


// GULP VARIABLES
// Modify these variables to match your project needs

// Set local URL if using Browser-Sync
const LOCAL_URL = 'http://jointswp.local/';

// Set path to Foundation files
const FOUNDATION = 'node_modules/foundation-sites';
const FOUNDATION_DATEPICKER = 'node_modules/foundation-datepicker';
const FONT_AWESOME = 'node_modules/@fortawesome/fontawesome-free';
const INTL_TEL_INPUT = 'node_modules/intl-tel-input';
const OWL_CAROUSEL = 'node_modules/owl.carousel';

// Select Foundation components, remove components project will not use
const SOURCE = {
	scripts: [
		// Lets grab what-input first
	    'node_modules/what-input/dist/what-input.js',

		// Foundation core - needed if you want to use any of the components below
		FOUNDATION + '/dist/js/plugins/foundation.core.js',
		FOUNDATION + '/dist/js/plugins/foundation.util.*.js',

		// Pick the components you need in your project
		FOUNDATION + '/dist/js/plugins/foundation.abide.js',
		FOUNDATION + '/dist/js/plugins/foundation.accordion.js',
		FOUNDATION + '/dist/js/plugins/foundation.accordionMenu.js',
		FOUNDATION + '/dist/js/plugins/foundation.drilldown.js',
		FOUNDATION + '/dist/js/plugins/foundation.dropdown.js',
		FOUNDATION + '/dist/js/plugins/foundation.dropdownMenu.js',
		FOUNDATION + '/dist/js/plugins/foundation.interchange.js',
		FOUNDATION + '/dist/js/plugins/foundation.offcanvas.js',
		FOUNDATION + '/dist/js/plugins/foundation.orbit.js',
		FOUNDATION + '/dist/js/plugins/foundation.responsiveMenu.js',
		FOUNDATION + '/dist/js/plugins/foundation.responsiveToggle.js',
		FOUNDATION + '/dist/js/plugins/foundation.reveal.js',
		FOUNDATION + '/dist/js/plugins/foundation.slider.js',
		FOUNDATION + '/dist/js/plugins/foundation.smoothScroll.js',
		FOUNDATION + '/dist/js/plugins/foundation.magellan.js',
		FOUNDATION + '/dist/js/plugins/foundation.sticky.js',
		FOUNDATION + '/dist/js/plugins/foundation.tabs.js',
		FOUNDATION + '/dist/js/plugins/foundation.toggler.js',
		FOUNDATION + '/dist/js/plugins/foundation.tooltip.js',

		FOUNDATION + '/dist/js/plugins/foundation.equalizer.js',
		FOUNDATION + '/dist/js/plugins/foundation.responsiveAccordionTabs.js',

		// FOUNDATION DATEPICKER
		FOUNDATION_DATEPICKER + '/js/foundation-datepicker.min.js',

		// OWL CAROUSEL JS
		OWL_CAROUSEL + '/dist/owl.carousel.js',

		// INTL-TEL-INPUT JS
		INTL_TEL_INPUT + '/build/js/intlTelInput.js',

		// Place custom JS here, files will be concantonated, minified if ran with --production
		'assets/scripts/js/**/*.js',
    ],

	// Scss files will be concantonated, minified if ran with --production
	styles: 'assets/styles/scss/**/*.scss',

	// Images placed here will be optimized
	images: 'assets/images/src/**/*',

	php: '**/*.php'
};

const ASSETS = {
	styles: 'assets/styles/',
	scripts: 'assets/scripts/',
	images: 'assets/images/',
	all: 'assets/'
};

const JSHINT_CONFIG = {
	"node": true,
	"globals": {
		"document": true,
		"window": true,
		"jQuery": true,
		"$": true,
		"Foundation": true
	}
};

// GULP FUNCTIONS
// JSHint, concat, and minify JavaScript
gulp.task('scripts', function() {

	// Use a custom filter so we only lint custom JS
	const CUSTOMFILTER = filter(ASSETS.scripts + 'js/**/*.js', {restore: true});

	return gulp.src(SOURCE.scripts)
		.pipe(plugin.plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
        }))
		.pipe(plugin.sourcemaps.init())
		.pipe(plugin.babel({
			presets: ['es2015'],
			compact: true,
			ignore: ['what-input.js']
		}))
		.pipe(CUSTOMFILTER)
			.pipe(plugin.jshint(JSHINT_CONFIG))
			.pipe(plugin.jshint.reporter('jshint-stylish'))
			.pipe(CUSTOMFILTER.restore)
		.pipe(plugin.concat('scripts.js'))
		.pipe(plugin.uglify())
		.pipe(plugin.sourcemaps.write('.')) // Creates sourcemap for minified JS
		.pipe(gulp.dest(ASSETS.scripts))
		.pipe(touch());
});

// Compile Sass, Autoprefix and minify
gulp.task('styles', function() {
	return gulp.src(SOURCE.styles)
		.pipe(plugin.plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
        }))
		.pipe(plugin.sourcemaps.init())
		.pipe(plugin.sass())
		.pipe(plugin.autoprefixer({
		    browsers: [
		    	'last 2 versions',
		    	'ie >= 9',
				'ios >= 7'
		    ],
		    cascade: false
		}))
		.pipe(plugin.cssnano({safe: true, minifyFontValues: {removeQuotes: false}}))
		.pipe(plugin.sourcemaps.write('.'))
		.pipe(gulp.dest(ASSETS.styles))
		.pipe(touch());
});

// Optimize images, move into assets directory
gulp.task('images', function() {
	return gulp.src(SOURCE.images)
		.pipe(plugin.imagemin())
		.pipe(gulp.dest(ASSETS.images))
		.pipe(touch());
});

 gulp.task( 'translate', function () {
     return gulp.src( SOURCE.php )
         .pipe(plugin.wpPot( {
             domain: 'jointswp',
             package: 'Example project'
         } ))
        .pipe(gulp.dest('file.pot'));
 });

// Browser-Sync watch files and inject changes
gulp.task('browsersync', function() {

    // Watch these files
    var files = [
    	SOURCE.php,
    ];

    browserSync.init(files, {
	    proxy: LOCAL_URL,
    });

    gulp.watch(SOURCE.styles, gulp.parallel('styles')).on('change', browserSync.reload);
    gulp.watch(SOURCE.scripts, gulp.parallel('scripts')).on('change', browserSync.reload);
    gulp.watch(SOURCE.images, gulp.parallel('images')).on('change', browserSync.reload);

});

// COPY FONT-AWESOME FONTS
gulp.task('fontAwesomeCopy', function() {
	var fontAwesomeSource = [ FONT_AWESOME + '/webfonts/*' ];
	var fontAwesomeDestination = 'assets/fonts/font-awesome';

	return gulp
			.src(fontAwesomeSource)
			.pipe(gulp.dest(fontAwesomeDestination));
});

// COPY INTL-TEL-INPUT FLAGS
gulp.task('intlTelInputImageCopy', function() {
	var intlTelInputImageSource = [ INTL_TEL_INPUT + '/build/img/*' ];
	var intlTelInputImageDestination = 'assets/images/intl-tel-input';

	return	gulp
			.src(intlTelInputImageSource)
			.pipe(gulp.dest(intlTelInputImageDestination));
});

// COPY INTL-TEL-INPUT UTIL
gulp.task('intlTelInputUtilCopy', function() {

	var intlTelInputUtilSource = [ INTL_TEL_INPUT + '/build/js/utils.js' ];
	var intlTelInputUtilDestination = 'assets/scripts/';

	return  gulp
			.src(intlTelInputUtilSource)
			.pipe(rename('intl-tel-input-utility.js'))
			.pipe(gulp.dest(intlTelInputUtilDestination));
});

// Watch files for changes (without Browser-Sync)
gulp.task('watch', function() {

	// Watch .scss files
	gulp.watch(SOURCE.styles, gulp.parallel('styles'));

	// Watch scripts files
	gulp.watch(SOURCE.scripts, gulp.parallel('scripts'));

	// Watch images files
	gulp.watch(SOURCE.images, gulp.parallel('images'));

});

// Run styles, scripts and foundation-js
gulp.task('default', gulp.parallel('styles', 'scripts', 'images', 'fontAwesomeCopy', 'intlTelInputImageCopy', 'intlTelInputUtilCopy'));
gulp.task('production', gulp.parallel('styles', 'scripts'));
