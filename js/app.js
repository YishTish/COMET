var app = angular.module('COMET', ['ngMaterial', 'ngMessages']);

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
	$scope.files = ["Json_order14-524", "pilot", "Order15-000252"];
	
	$scope.prepareData = function(fileName){
		$scope.showLoadingMessage = true;
		$scope.formData="";
		var url = "json_src/"+fileName+".json";
		ajaxServices.httpPromise(url).then(function(res){
			$scope.formData = jsonServices.parseJson(res);
			$scope.showLoadingMessage = false;
		})
	};

	$scope.parseJson = function(jsonData){
		return jsonServices.parseJson(jsonData);
	};

	$scope.init = function(){
		$scope.prepareData($scope.files[0]);
	};

	$scope.init();

	
}])

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('altTheme')
    .primaryPalette('purple')
});