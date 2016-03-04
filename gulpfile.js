/*
Dependencies:

npm install gulp
npm install express
npm install connect-livereload
npm install tiny-lr
When running Ubuntu - install nodejs and add symling to node: sud ln -s /usr/bin/nodejs /usr/bin
*/


var _ = require('lodash');
var fs = require('fs');
var nodeResolve = require('resolve');
var bowerResolve = require('bower-resolve');
var browserify = require('browserify');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('browserify', function() {
  return browserify()
    .require(require.resolve('./js/app.js'), { 
      entry: true, 
      debug: true  
    })
    .bundle()
    .pipe(source('bundle.js')) // gives streaming vinyl file object
    .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
    .pipe(uglify()) // now gulp-uglify works 
    .pipe(gulp.dest('./build'));
});

var production = false;

gulp.task('build-vendor', function () {

  var b = browserify({
    // generate source maps in non-production environment
    debug: !production
  });

  // get all bower components ids and use 'bower-resolve' to resolve
  // the ids to their full path, which we need for require()
  getBowerPackageIds().forEach(function (id) {

    var resolvedPath = bowerResolve.fastReadSync(id);

    if (resolvedPath.slice(-2) !== "js") return;
    b.require(resolvedPath, {

      // exposes the package id, so that we can require() from our code.
      // for eg:
      // require('./vendor/angular/angular.js', {expose: 'angular'}) enables require('angular');
      // for more information: https://github.com/substack/node-browserify#brequirefile-opts
      expose: id

    });
  });

  // do the similar thing, but for npm-managed modules.
  // resolve path using 'resolve' module
  getNPMPackageIds().forEach(function (id) {
    b.require(nodeResolve.sync(id), { expose: id });
  });

  var stream = b
    .bundle()
    .on('error', function(err){
      // print the error (can replace with gulp-util)
      console.log(err.message);
      // end this stream
      this.emit('end');
    })
    .pipe(source('vendor.js'));

  // pipe additional tasks here (for eg: minifying / uglifying, etc)
  // remember to turn off name-mangling if needed when uglifying
  stream
  // .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
  // .pipe(uglify())
    .pipe(gulp.dest('./build'));

  return stream;
});

gulp.task('build-app', function () {

  var b = browserify('./js/app.js', {
    // generate source maps in non-production environment
    debug: !production
  });

  // mark vendor libraries defined in bower.json as an external library,
  // so that it does not get bundled with app.js.
  // instead, we will load vendor libraries from vendor.js bundle
  getBowerPackageIds().forEach(function (lib) {
    b.external(lib);
  });


  // do the similar thing, but for npm-managed modules.
  // resolve path using 'resolve' module
  /*
  getNPMPackageIds().forEach(function (id) {
    b.external(id);
  });
*/

  var stream = b.bundle().pipe(source('bundle.js'));

  // pipe additional tasks here (for eg: minifying / uglifying, etc)
  // remember to turn off name-mangling if needed when uglifying

  stream.pipe(gulp.dest('./build'));

  return stream;

});


function getBowerPackageIds() {
  // read bower.json and get dependencies' package ids
  var bowerManifest = {};
  try {
    bowerManifest = require('./bower.json');
  } catch (e) {
    // does not have a bower.json manifest
  }
  return _.keys(bowerManifest.dependencies) || [];

}

function getNPMPackageIds() {
  // read package.json and get dependencies' package ids
  var packageManifest = {};
  try {
    packageManifest = require('./package.json');
  } catch (e) {
    // does not have a package.json manifest
  }
  return _.keys(packageManifest.dependencies) || [];

}

// `gulp.task()` defines task that can be run calling `gulp xyz` from the command line
// The `default` task gets called when no task name is provided to Gulp
var EXPRESS_PORT = 5000;
var EXPRESS_ROOT = __dirname;
var LIVERELOAD_PORT = 35729;

function startExpress() {
 
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')());
  app.use(express.static(__dirname));
  app.listen(EXPRESS_PORT);
  app.get('/comet.icsp',function(req,res){
      curlGet(req, res, function(resToPublish){
                          res.send(resToPublish);
                        });
  });
}


function curlGet(req, res, callback){
  var http =  require('http');
  var queryString = "/comet.icsp?"
  for(key in req.query){
    queryString = queryString + key+"="+req.query[key]+"&";
  }
  console.log(queryString);
  queryString = encodeURI(queryString);
  var options = {
    host: '75.99.167.66',
    method: 'GET',
    path: queryString,
    port: "3757"
  };
  var serverResponse = http.request(options, function(res){
    console.log("response: "+res);
    console.log("code: "+res.statusCode);
    var serverOutput = "";

    res.on('data',function(d){
      serverOutput += d;
    });

    res.on('error', function(e){
      callback("Got an error. fixing");
    });

    res.on('end',function(){
      callback(serverOutput);
    })

  });
  serverResponse.end();       
    serverResponse.on('error',function(e){
      console.error(e);
    });
}

var lr;
function startLivereload() {
  lr = require('tiny-lr')();
  lr.listen(LIVERELOAD_PORT);
}


function notifyLiveReload(event){
	var fileName = require('path').relative(EXPRESS_ROOT, event.path);

	console.log(event);

	lr.changed({
		body: { 
			files: [fileName]
		}
	});
}

gulp.task('default', ['build-vendor', 'build-app'], function () {
  
  console.log('Gulp and running lintech_software!');
  startExpress();
  startLivereload();
  gulp.watch(['*.html', 'js/**/*.js', 'css/*.css', 'tpl/*.html'], notifyLiveReload);
  gulp.watch(['js/**/*.js'], ['build-app']);
});