var gulp        = require('gulp'),
		sass        = require('gulp-sass'),
		browserSync = require('browser-sync'),
		concat      = require('gulp-concat'),
		uglify      = require('gulp-uglifyjs'),
		cssnano     = require('gulp-cssnano'),
		rename      = require('gulp-rename'),
		del         = require('del'),
		imagemin    = require('gulp-imagemin'),
		pngquant    = require('imagemin-pngquant'),
		cache       = require('gulp-cache'),
		autoprefixer= require('gulp-autoprefixer');
		release = require('gulp-github-release');




gulp.task('sass', function() {
	return gulp.src('app/sass/*.scss')
		.pipe(sass())
		.pipe(autoprefixer(['last 15 versions', '>1%', 'ie 8', 'ie 7'], {cascade: true}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});


gulp.task('scripts', function(){
	return gulp.src([
			'app/libs/jquery/dist/jquery.min.js',
			'app/libs/wow/dist/wow.min.js',
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest("app/js/"))
});


gulp.task('css-min', ['sass'], function(){
	return gulp.src(['app/css/main.css', 'app/css/libs.css',])
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css'));
});


gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});


gulp.task('clean', function() {
	return del.sync('dist');
});


gulp.task('clear', function() {
	return cache.clearAll();
});

gulp.task('img', function() {
	return gulp.src('app/src/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist/src/'));
});




gulp.task('watch',['browser-sync', 'css-min', 'scripts'], function() {
	gulp.watch('app/sass/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build',['clean','img', 'sass', 'scripts'], function(){

	var buildCss = gulp.src(['app/css/main.min.css', 'app/css/libs.min.css'])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/font/**/*')
	.pipe(gulp.dest('dist/font'));

	var buildJS = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'));

	var buildHTML = gulp.src('app/*.html')
	.pipe(gulp.dest('dist/'));
});
gulp.task('release', function(){
  gulp.src('./dist/css/libs.min.css')
    .pipe(release({
      token: '9a4a2f07c5d61b7a82d06a62311607f1ad95726a',                     // or you can set an env var called GITHUB_TOKEN instead
      owner: 'aVozgrin',                    // if missing, it will be extracted from manifest (the repository.url field)
      repo: 'newPSD',            // if missing, it will be extracted from manifest (the repository.url field)
      tag: 'v1.0.0',                      // if missing, the version will be extracted from manifest and prepended by a 'v'
      name: 'publish-release v1.0.0',     // if missing, it will be the same as the tag
      notes: 'very good!',                // if missing it will be left undefined
      draft: false,                       // if missing it's false
      prerelease: false,                  // if missing it's false
      manifest: require('./package.json') // package.json from which default values will be extracted if they're missing
    }));
});