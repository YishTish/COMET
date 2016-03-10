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
var app = angular.module('COMET', ['angularModalService', "angucomplete-alt",
        'ui.bootstrap']);

// add services
require('./services/jsonServices');
require('./services/ajaxServices');
require('./services/cometServices');
require('./services/autoCompleteServices');
require('./services/afterFieldServices');
require('./services/menuServices');
require('./services/formService');
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

require('./plugins/form.masked/jquery.maskedinput');


// this variable should be set before loading the plugin
window.plugin_path = 'assets/plugins/';
// load bootstarp template
require('wb02dsn1b');


// .config(function($mdThemingProvider) {
//   // $mdThemingProvider.theme('altTheme')
//   //   .primaryPalette('purple')
// });
