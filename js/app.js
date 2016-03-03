require('jquery');
require('angular');
var _ = require('lodash');
require('angular-modal-service');
require('angucomplete-alt');
require('angular-ui-bootstrap')

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

require('./directives/glyphSpinner');
require('./directives.js');
require('./directives/cometMenu');



// .config(function($mdThemingProvider) {
//   // $mdThemingProvider.theme('altTheme')
//   //   .primaryPalette('purple')
// });
