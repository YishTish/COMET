// some external libs doesn't support node modules
window.jQuery = window.$ = require('jquery');

// required libs 
require('angular');
require('angular-modal-service');
require('angucomplete-alt');
require('angular-ui-bootstrap');
require('lodash');

// configuration file
var config = require('./config');

// initialize the anglur
var app = angular.module('COMET', ['angularModalService', "angucomplete-alt", 'ui.bootstrap']);

// add services
require('./services.js');
require('./services/spinner');

// add controllers
require('./controllers/appCtrl');
require('./controllers/modalInstanceCtrl.js');

// add derictives
require('./directives/glyphSpinner');
require('./directives.js');
require('./directives/cometMenu');


// this variable should be set before loading the plugin
window.plugin_path = 'assets/plugins/';
// load bootstarp template
require('wb02dsn1b');


// .config(function($mdThemingProvider) {
//   // $mdThemingProvider.theme('altTheme')
//   //   .primaryPalette('purple')
// });
