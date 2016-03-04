window.jQuery = window.$ = require('jquery');
require('angular');
require('lodash');
require('angular-modal-service');
require('angucomplete-alt');
require('angular-bootstrap');

var config = require('./config');

var app = angular.module('COMET', ['angularModalService', "angucomplete-alt", 'ui.bootstrap']);

require('./services.js');
require('./services/spinner');


app.controller('appCtrl', ['$scope', 'ajaxServices', 'jsonServices', function ($scope, ajaxServices, jsonServices) {

	var curForm = "WRX2002";
	var resId = "12404";
	var url = "/comet.icsp?MGWLPN=iCOMET&COMETMode=JS&SERVICE=DATAFORM&REQUEST="+curForm+"&STAGE=REQUEST&COMETSID="+self.sessionId+"&ID="+resId;

	$scope.loadPath = url;
	

	$scope.menu = {};
}]);

require('./modalInstanceCtrl.js');

require('./directives/glyphSpinner');
require('./directives.js');
require('./directives/cometMenu');

window.plugin_path = 'assets/plugins/';
require('wb02dsn1b');


// .config(function($mdThemingProvider) {
//   // $mdThemingProvider.theme('altTheme')
//   //   .primaryPalette('purple')
// });
