var app = angular.module('COMET', ['ngMaterial', 'angularModalService', "angucomplete-alt" ,'angularSpinners']);

app.controller('appCtrl', ['$scope', '$mdSidenav', 'ajaxServices', 'jsonServices', function ($scope, $mdSidenav, ajaxServices, jsonServices) {

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

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('altTheme')
    .primaryPalette('purple')
});
