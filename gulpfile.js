/*******************************************************************************
1. DEPENDENCIES
*******************************************************************************/

var gulp = require('gulp');                             // gulp core
    sass = require('gulp-sass'),                        // sass compiler
    sourcemaps = require('gulp-sourcemaps'),            // gulp sourcemaps
    uglify = require('gulp-uglify'),                    // uglifies the js
    jshint = require('gulp-jshint'),                    // check if js is ok
    rename = require("gulp-rename");                    // rename files
    concat = require('gulp-concat'),                    // concatinate js
    notify = require('gulp-notify'),                    // send notifications to osx
    plumber = require('gulp-plumber'),                  // disable interuption
    stylish = require('jshint-stylish'),                // make errors look good in shell
    cssnano = require('gulp-cssnano'),                  // minify the css files
    newer = require('gulp-newer'),                      // passing through only those source files that are newer than corresponding destination files
    autoprefixer = require('gulp-autoprefixer'),        // sets missing browserprefixes
    filter = require('gulp-filter'),                    // bower additions -filter
    mainBowerFiles = require('main-bower-files');       // bower aadditions - main bower files


// ... variables
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

/*******************************************************************************
2. FILE DESTINATIONS (RELATIVE TO ASSETS FOLDER)
*******************************************************************************/

var target = {
    sass_src : 'app/assets/sass/**/*.scss',             // all sass files

    css_dest : 'app/css',                        // where to put minified css
    css_dest_dist : 'app/dist/css',                        // dist css

    js_lint_src : [                                     // all js files that should be linted
        'app/assets/js/src/**/*.js'
    ],
    js_uglify_src : [                                   // all js files that should not be concatinated
        'app/js/src/modernizr-custom.js'
    ],
    js_concat_src : [                                   // all js files that should be concatinated
        'app/assets/js/src/**/*.js'
    ],
    js_dest : 'app/js',                          // sample minified js
    js_dest_dist : 'app/dist/js'                        // dist minified js
};


/*******************************************************************************
3. SASS TASK
*******************************************************************************/

gulp.task('sass', function() {
    gulp.src(target.sass_src)                                       // get the files
        .pipe(sourcemaps.init())                                    //init sourcemaps
        .pipe(plumber())                                            // make sure gulp keeps running on errors
        .pipe(sass())                                               // compile all sass
        .pipe(autoprefixer(autoprefixerOptions))                    // complete css with correct vendor prefixes
        .pipe(cssnano({discardComments: {removeAll: true}}))        // minify css
        //.pipe(gulp.dest(target.css_dest_dist))                      // css dist file

        .pipe(sourcemaps.write('.'))                                //sourcemaps
        .pipe(gulp.dest(target.css_dest))                           // css sample file
        
        .pipe(notify({message: 'SCSS processed!'}));                // notify when done

});






/*******************************************************************************
4. BOWER TASK - FILES
*******************************************************************************/

gulp.task('bower', function() {
    // move JS files
    gulp.src(mainBowerFiles('**/*.js'))
        .pipe(concat('plugins.js'))
        .pipe(uglify())
        .pipe(gulp.dest(target.js_dest))
        //.pipe(gulp.dest(target.js_dest_dist)) 
        .pipe(notify({ message: 'Bower JS task complete' }));

    // move CSS files
    gulp.src(mainBowerFiles('**/*.css'))
        .pipe(autoprefixer(autoprefixerOptions))                    // complete css with correct vendor prefixes
        .pipe(concat('plugins.css'))
        .pipe(cssnano({discardComments: {removeAll: true}}))        // minify css
        .pipe(gulp.dest('app/css'))
        //.pipe(gulp.dest('app/dist/css'))
        .pipe(notify({ message: 'Bower CSS task complete' }));

    // move font files
    //gulp.src(mainBowerFiles(['**/font-awesome/fonts/**.*']))
    //    .pipe(gulp.dest('app/fonts'))
    //    .pipe(gulp.dest('app/dist/fonts'))
    //    .pipe(notify({ message: 'Bower icon font moved' }));


    // move SWF files
    gulp.src(mainBowerFiles('**/*.swf'))
        .pipe(gulp.dest('app/js/swf'))
        //.pipe(gulp.dest('app/dist/js/swf'))
        .pipe(notify({ message: 'Bower swf files moved' }));

});





/*******************************************************************************
5. JS TASKS
*******************************************************************************/

// lint my custom js
gulp.task('js-lint', function() {
    gulp.src(target.js_lint_src)                        // get the files
        .pipe(jshint())                                 // lint the files
        .pipe(jshint.reporter(stylish))                 // present the results in a beautiful way
});

// minify all js files that should not be concatinated
gulp.task('js-uglify', function() {
    gulp.src(target.js_uglify_src)                      // get the files
        .pipe(uglify())                                 // uglify the files                   
        .pipe(rename(function (path) {                  // give the files a min suffix
            path.basename += "-min";
        }))
        .pipe(gulp.dest(target.js_dest)) 
        .pipe(gulp.dest(target.js_dest_dist)) 
        .pipe(notify({ message: 'JS processed!'}));     // notify when done
});

// minify & concatinate all other js
gulp.task('js-concat', function() {
    gulp.src(target.js_concat_src)                      // get the files
        .pipe(uglify())                                 // uglify the files
        .pipe(concat('scripts.js'))                     // concatinate to one file
        .pipe(gulp.dest(target.js_dest))                // where to put the files
        //.pipe(gulp.dest(target.js_dest_dist)) 
        .pipe(notify({message: 'JS processed!'}));      // notify when done
});















/*******************************************************************************
7. GULP MAIN TASK
*******************************************************************************/

gulp.task('default', ['sass','js-lint', 'js-uglify', 'js-concat', 'bower'], function () {
    gulp.watch(target.sass_src, ['sass']);
    gulp.watch(target.js_lint_src, ['js-lint']);
    gulp.watch(target.js_minify_src, ['js-uglify']);
    gulp.watch(target.js_concat_src, ['js-concat']);

});


















