var app = angular.module('COMET', ['ngMaterial', 'angularModalService', "angucomplete-alt"]);

app.controller('appCtrl', ['$scope', '$mdSidenav', 'ajaxServices', 'jsonServices', function ($scope, $mdSidenav, ajaxServices, jsonServices) {
	

// 	$http.get("json_src/pilot.json").then(function fileLoaded(res){
// 		$scope.formData = res.data;
// //		$scope.parseJson($scope.formData);
// 	});

	var self = this;
	
	$scope.toggleSidenav = function(menuId){
		$mdSidenav(menuId).toggle();
	}
	$scope.title = "COMET Form Generator";
	//$scope.files = ["Order15-000252", "Json_order14-524", "pilot" ];
	
	// $scope.getSignInForm = function(){
	// 	$scope.showLoadingMessage = true;
	// 	$scope.formData="";
	// 	var url="/comet.icsp?MGWLPN=iCOMET&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WSY1001&STAGE=REQUEST";
	// 	ajaxServices.httpPromise(url).then(function(res){
	// 		$scope.formData = jsonServices.parseJson(res);
	// 		$scope.showLoadingMessage = false;
	// 	})
	// };

	$scope.init = function(){
	//	$scope.prepareData($scope.files[0]);
	$scope.formTitle = "Sign In:"
	$scope.getSignInForm();
	};

	//$scope.init();

	
}])

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('altTheme')
    .primaryPalette('purple')
});
