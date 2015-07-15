var app = angular.module('COMET', ['ngMaterial', 'ngMessages']);

app.controller('appCtrl', ['$scope', '$mdSidenav', '$http', 'jsonServices', function ($scope, $mdSidenav, $http, jsonServices) {
	$http.get("json_src/pilot.json").then(function fileLoaded(res){
		$scope.formData = res.data;
		$scope.parseJson($scope.formData);
	});
	$scope.toggleSidenav = function(menuId){
		$mdSidenav(menuId).toggle();
	}
	$scope.title = "COMET Form Generator";
	$scope.files = ["Json_order14-524","pilot"];

	$scope.loadFile = function(fileName){
		jsonServices.loadFile(fileName, $scope);
	};

	$scope.parseJson = function(jsonData){
		return jsonServices.parseJson(jsonData);
	};

	
}])

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('altTheme')
    .primaryPalette('purple')
});