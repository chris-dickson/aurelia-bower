/**
 Copyright 2016 Uncharted Software Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const filter = require('gulp-filter');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const bower = require('main-bower-files');
const runSequence = require('run-sequence');


gulp.task('dependencies', () => {
    return gulp.src( bower() )
        .pipe( filter('**/*.js') ) // filter js files
        .pipe( concat('extern.js') )
        .pipe( gulp.dest( './dist' ) );
});

gulp.task('babelify', () => {
    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [ 'es2015-loose', 'stage-1'],
            plugins: [
                'syntax-flow',
                'transform-decorators-legacy',
                'transform-flow-strip-types',
                'transform-es2015-modules-amd'
            ]
        }))
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', (done) => {
    runSequence('dependencies','babelify', done);
});