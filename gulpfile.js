/* gulp dependencies */
const gulp 			= require('gulp');  
const sass 			= require('gulp-sass');
const uglify 		= require('gulp-uglify');
const rename 		= require('gulp-rename');
const concat 		= require('gulp-concat');
const plumber 		= require('gulp-plumber');
const browserSync 	= require('browser-sync');
const postcss 		= require('gulp-postcss');
const autoprefixer 	= require('autoprefixer');
const cssnano 		= require('cssnano');
const combineMq 	= require('gulp-combine-mq');
const sourcemaps    = require('gulp-sourcemaps');
const reload 		= browserSync.reload;

/* scripts task */
gulp.task('scripts', function() {
	return gulp.src([
		//'node_modules/jquery/dist/jquery.js',
		'src/js/*.js'
	])
	.pipe(sourcemaps.init())
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest('dist/js'))
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('dist/js'));
});


/* sass task */
let postcssPlugins = [
	autoprefixer({browsers: 'last 2 versions'}),
	cssnano()
];

gulp.task('sass', function() {
	gulp.src('src/scss/*.scss')
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(gulp.dest('dist/css'))
		
		/* postcss/cssnano task */
		.pipe(postcss(postcssPlugins))
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/css'))
		.pipe(reload({stream: true}))
});


/* reload task */
gulp.task('bs-reload', function() {
	browserSync.reload();
});


/* Combine media query */
gulp.task('cmq', function() {
	gulp.src('dist/css/styles.css')
		.pipe(combineMq({
			beautify: false //minified
		}))
		.pipe(rename('cmq.styles.min.css'))
		.pipe(gulp.dest('dist/css/'))
});


/* browser-sync for localhost */
gulp.task('browser-sync', function() {
	browserSync.init(['dist/css/*.css', 'dist/js/*.js'], {
		proxy: "localhost:8888/menu_git/"
	});
});


/* watch scss, css, js and html files, doing different things with each. */
gulp.task('default', ['sass', 'scripts', 'browser-sync', 'cmq'], function() {
	/* watch .scss files, run the sass task on change. */
	gulp.watch(['src/scss/*.scss', 'src/scss/**/*.scss'], ['sass']);
	/* watch style.css, run the combine media query (cmq) task on change. */
	gulp.watch(['dist/css/styles.css'], ['cmq']);
	/* watch .js files, run the scripts task on change. */
	gulp.watch(['src/js/*.js'], ['scripts']);
	/* watch .html files, run the bs-reload task on change. */
	gulp.watch(['*.html'], ['bs-reload']);
});