// some external libs doesn't support node modules
window.jQuery = window.$ = require('jquery');

// required libs
require('angular');
require('angular-modal-service');
require('angucomplete-alt');
require('angular-ui-bootstrap');
require('angular-bootstrap-contextmenu');
require('lodash');


// configuration file
var config = require('./config');

// initialize the anglur
var app = angular.module('COMET', ['angularModalService', "angucomplete-alt", 
        'ui.bootstrap', "ui.bootstrap.contextMenu"]);

// add services
require('./services/jsonServices');
require('./services/ajaxServices');
require('./services/cometServices');
require('./services/autoCompleteServices');
require('./services/afterFieldServices');
require('./services/menuServices');
//require('./services/routingService');
require('./services/spinner');

// add controllers
require('./controllers/appCtrl');
require('./controllers/modalInstanceCtrl');

// add derictives
require('./directives/glyphSpinner');
require('./directives/cometForm');
require('./directives/cometField');
require('./directives/showErrors');
require('./directives/validateText');
require('./directives/cometCheckbox');
require('./directives/modalFormButton');
require('./directives/submitButton');
require('./directives/hideEmpty');
require('./directives/cometMenu');
require('./directives/summaryScreen');
require('./directives/cometFooter');
require('./directives/scrollingArea');


// this variable should be set before loading the plugin
window.plugin_path = 'assets/plugins/';
// load bootstarp template
require('wb02dsn1b');


// .config(function($mdThemingProvider) {
//   // $mdThemingProvider.theme('altTheme')
//   //   .primaryPalette('purple')
// });
