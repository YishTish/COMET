/*
In oreder to run the app you should install all dependencies:

npm isntall
bower install

When running Ubuntu - install nodejs and add symling to node: sud ln -s /usr/bin/nodejs /usr/bin
*/


var browserify = require('browserify');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('browserify', function() {
  var b = browserify({
    entries: './js/app.js',
    debug: true
  });

  var stream = b.bundle()
      .pipe(source('bundle.js')) // gives streaming vinyl file object
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build'));

  return stream;
});

gulp.task('default', ['browserify'], function () {

  console.log('Gulp and running lintech_software!');
  startExpress();
  startLivereload();
  gulp.watch(['*.html', 'build/*.js', 'css/*.css', 'tpl/*.html'], notifyLiveReload);
  gulp.watch(['js/**/*.js'], ['browserify']);
});

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
    host: 'lintechhq.com',
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
