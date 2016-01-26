var app = angular.module('COMET', ['angularModalService', "angucomplete-alt" ,'angularSpinners', 'ui.bootstrap','mega-menu']);

app.controller('appCtrl', ['$scope', 'ajaxServices', 'jsonServices', function ($scope, ajaxServices, jsonServices) {

	var curForm = "WRX2002";
	var resId = "12404";
	var url = "/comet.icsp?MGWLPN=iCOMET&COMETMode=JS&SERVICE=DATAFORM&REQUEST="+curForm+"&STAGE=REQUEST&COMETSID="+self.sessionId+"&ID="+resId;

	$scope.loadPath = url;
	
}]);

// .config(function($mdThemingProvider) {
//   // $mdThemingProvider.theme('altTheme')
//   //   .primaryPalette('purple')
// });
