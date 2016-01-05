var app = angular.module('COMET', ['angularModalService', "angucomplete-alt" ,'angularSpinners', 'ui.bootstrap']);

app.controller('appCtrl', ['$scope', 'ajaxServices', 'jsonServices', function ($scope, ajaxServices, jsonServices) {

	var curForm = "WRX2002";
	var resId = "12404";
	var url = "/comet.icsp?MGWLPN=iCOMET&COMETMode=JS&SERVICE=DATAFORM&REQUEST="+curForm+"&STAGE=REQUEST&COMETSID="+self.sessionId+"&ID="+resId;

	$scope.loadPath = url;
	// var self = this;
	
	// $scope.toggleSidenav = function(menuId){
	// 	$mdSidenav(menuId).toggle();
	// }
	// $scope.title = "COMET Form Generator";
	
	// $scope.init = function(){
	// 	$scope.formTitle = "Sign In:"
	// 	$scope.getSignInForm();
	// };
}])

// .config(function($mdThemingProvider) {
//   // $mdThemingProvider.theme('altTheme')
//   //   .primaryPalette('purple')
// });
